// Shared by the home city map and the /trips/ route map: the Leaflet setup,
// vector basemap, pins, and the numbered bubbles overlapping pins fold into.
// items: [{ id, at: [lat, lng], label (HTML), title, name, labelZoom, rank }]
//   name: the short name used in bubble tooltips.
//   labelZoom (optional): from this zoom the label shows without hovering, when
//   it fits. rank: lower places its label first. Items without labelZoom only
//   show their label on hover, focus or selection.
// opts: { onSelect: function (id), maxZoom }
(function () {
  window.createAtlas = function (el, items, opts) {
    var narrow = window.matchMedia("(max-width: 720px)");
    // Touch screens get a 44px tap target around each pin (the dot itself is
    // drawn by CSS), and pins merge sooner so those targets don't overlap.
    var touch = window.matchMedia("(pointer: coarse)").matches;
    var HIT = touch ? 44 : 18;
    var GROUP_PX = HIT + 4;
    var CLUSTER = touch ? 44 : 30;
    // On phones, keep fitted pins clear of the zoom buttons and attribution
    // in the bottom-right corner, where a pin can't be tapped.
    var PHONE_BR = [70, 110];

    var map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false,
      minZoom: narrow.matches ? 0.5 : 2,
      maxZoom: opts.maxZoom || 6,
      zoomSnap: 0.25,
      maxBounds: [[-60, -200], [85, 200]],
      attributionControl: false
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.control.attribution({ prefix: false, position: "bottomright" })
      .addAttribution('Map data: <a href="https://www.naturalearthdata.com/">Natural Earth</a>')
      .addTo(map);

    // Vector basemap: Natural Earth 1:50m countries, colored by the site's CSS
    // tokens (see .land in _home.scss), so it follows light/dark mode with no
    // tile service or API key.
    map.createPane("land").style.zIndex = 200;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then(function (r) { return r.json(); })
      .then(function (topo) {
        var world = topojson.feature(topo, topo.objects.countries);
        // Drop Antarctica, and unwrap rings that straddle the antimeridian
        // (Russia, Fiji, the Aleutians) so they don't smear across the map.
        world.features = world.features.filter(function (f) { return f.id !== "010"; });
        world.features.forEach(function (f) {
          var polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
          polys.forEach(function (poly) {
            poly.forEach(function (ring) {
              var east = ring.some(function (c) { return c[0] > 160; });
              var west = ring.some(function (c) { return c[0] < -160; });
              if (east && west) ring.forEach(function (c) { if (c[0] < 0) c[0] += 360; });
            });
          });
        });
        L.geoJSON(world, {
          pane: "land",
          interactive: false,
          style: { className: "land", weight: 0.6 }
        }).addTo(map);
      });

    var pins = {};
    var active = null;

    // labelled: false, "right" or "left" (see relabel()).
    function pinIcon(item, on, labelled) {
      return L.divIcon({
        className: "trip-pin" + (on ? " is-active" : "") + (labelled ? " is-labelled" : "") +
          (labelled === "left" ? " is-labelled-left" : ""),
        html: '<span class="trip-pin__dot"></span><span class="trip-pin__label">' + item.label + "</span>",
        iconSize: [HIT, HIT],
        iconAnchor: [HIT / 2, HIT / 2]
      });
    }

    // Set the view before adding markers: Leaflet defers layers added to a map
    // with no view, and regroup() can't remove a marker that isn't placed yet.
    var bounds = L.latLngBounds(items.map(function (i) { return i.at; }));
    function home() {
      // Leave room on the left for the intro panel on wide screens.
      map.fitBounds(bounds, narrow.matches
        ? { paddingTopLeft: [20, 20], paddingBottomRight: [PHONE_BR[0] - 30, PHONE_BR[1] - 50], maxZoom: 4 }
        : { paddingTopLeft: [400, 50], paddingBottomRight: [50, 50], maxZoom: 4 });
    }
    home();

    // Leaflet only turns Enter into a click on markers that have a popup.
    function onEnter(action) {
      return function (e) { if (e.originalEvent.key === "Enter") action(); };
    }

    items.forEach(function (item) {
      function selectItem() { opts.onSelect(item.id); }
      var m = L.marker(item.at, { icon: pinIcon(item, false), title: item.title, keyboard: true, riseOnHover: true })
        .addTo(map)
        .on("click", selectItem)
        .on("keypress", onEnter(selectItem));
      pins[item.id] = { marker: m, item: item };
    });

    // Pins that land on top of each other (London and Paris at world zoom)
    // fold into a numbered bubble; tapping it zooms in until they separate.
    var groups = L.layerGroup().addTo(map);
    // Tap targets are squares, so compare the larger of the x and y gaps:
    // straight-line distance lets two squares overlap on the diagonal.
    function tooClose(a, b) {
      return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y)) < GROUP_PX;
    }
    function point(p) { return map.latLngToContainerPoint(p.item.at); }
    function regroup() {
      groups.clearLayers();
      var left = Object.keys(pins).map(function (k) { return pins[k]; });
      left.forEach(function (p) { if (!map.hasLayer(p.marker)) p.marker.addTo(map); });
      // A bubble at maximum zoom could never open, so leave those pins separate.
      if (map.getZoom() >= map.getMaxZoom()) return;
      while (left.length) {
        var head = left.shift();
        var hp = point(head);
        var near = left.filter(function (p) { return tooClose(hp, point(p)); });
        if (!near.length) continue;
        left = left.filter(function (p) { return near.indexOf(p) < 0; });
        var members = [head].concat(near);
        // The bubble sits at the group's center, which can land on a pin that
        // wasn't close to the first member; pull those in until nothing is.
        for (var grew = true; grew;) {
          var c = map.latLngToContainerPoint(L.latLngBounds(members.map(function (p) { return p.item.at; })).getCenter());
          var more = left.filter(function (p) { return tooClose(c, point(p)); });
          grew = more.length > 0;
          members = members.concat(more);
          left = left.filter(function (p) { return more.indexOf(p) < 0; });
        }
        if (members.some(function (p) { return p.item.id === active; })) continue;
        members.forEach(function (p) { map.removeLayer(p.marker); });
        addGroup(members);
      }
    }

    function addGroup(members) {
      var b = L.latLngBounds(members.map(function (p) { return p.item.at; }));
      function zoomToGroup() {
        var fitOpts = narrow.matches
          ? { paddingTopLeft: [50, 50], paddingBottomRight: PHONE_BR, duration: 0.6 }
          : { paddingTopLeft: [420, 80], paddingBottomRight: [80, 80], duration: 0.6 };
        // Always zoom in at least a step, or a group that re-forms at the
        // fitted zoom would never come apart.
        var fitZoom = map.getBoundsZoom(b, false, L.point(narrow.matches ? 140 : 500, 160));
        if (fitZoom > map.getZoom() + 0.5) {
          map.flyToBounds(b, fitOpts);
        } else {
          map.flyTo(b.getCenter(), Math.min(map.getZoom() + 1.5, map.getMaxZoom()), { duration: 0.6 });
        }
      }
      L.marker(b.getCenter(), {
        icon: L.divIcon({ className: "trip-cluster", html: "<span>" + members.length + "</span>", iconSize: [CLUSTER, CLUSTER] }),
        title: members.map(function (p) { return p.item.name; }).join(", "),
        keyboard: true,
        zIndexOffset: 500
      }).on("click", zoomToGroup)
        .on("keypress", onEnter(zoomToGroup))
        .addTo(groups);
    }
    // Permanent labels: from its labelZoom a pin shows its name without
    // hovering, unless the label would overlap a label placed before it (in
    // rank order), a bubble, or another pin's dot. A label blocked on the right
    // tries the mirror position on the left of its pin. Labels sit at fixed
    // offsets from their pins, so panning keeps every overlap as it was and
    // only zooming needs this. p.labelled is false, "right" or "left".
    var labelled = items.filter(function (i) { return i.labelZoom != null; })
      .sort(function (a, b) { return (a.rank || 0) - (b.rank || 0); })
      .map(function (i) { return pins[i.id]; });
    function overlaps(a, b) {
      return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    }
    // The label's rect on one side of its pin's dot. The left position mirrors
    // the right one about the dot's centre (see .is-labelled-left in _home.scss),
    // so both come from one measurement, whichever side the label is on now.
    function labelRects(el, dot) {
      var r = el.querySelector(".trip-pin__label").getBoundingClientRect();
      var twice = dot.left + dot.right;
      var other = { left: twice - r.right, right: twice - r.left, top: r.top, bottom: r.bottom };
      return el.classList.contains("is-labelled-left") ? { right: other, left: r } : { right: r, left: other };
    }
    function setSide(el, side) {
      el.classList.toggle("is-labelled", !!side);
      el.classList.toggle("is-labelled-left", side === "left");
    }
    function relabel() {
      if (!labelled.length) return;
      var zoom = map.getZoom();
      // Measure everything first, then write, so the browser lays out once.
      // A hidden label is still laid out (opacity 0), so it can be measured.
      var taken = [];
      groups.eachLayer(function (g) { taken.push(g.getElement().getBoundingClientRect()); });
      var dots = {};
      Object.keys(pins).forEach(function (id) {
        if (map.hasLayer(pins[id].marker)) dots[id] = pins[id].marker.getElement().querySelector(".trip-pin__dot").getBoundingClientRect();
      });
      function clear(r, id) {
        if (taken.some(function (t) { return overlaps(r, t); })) return false;
        return !Object.keys(dots).some(function (k) { return k !== id && overlaps(r, dots[k]); });
      }
      // The selected pin's label always shows, on the side it already has:
      // keep others clear of it.
      var act = active && pins[active] && dots[active] ? pins[active] : null;
      if (act) taken.push(labelRects(act.marker.getElement(), dots[active])[act.labelled || "right"]);
      var sides = labelled.map(function (p) {
        var id = p.item.id;
        if (!dots[id] || zoom < p.item.labelZoom) return false;
        if (p === act) return p.labelled || "right";
        var rects = labelRects(p.marker.getElement(), dots[id]);
        var side = clear(rects.right, id) ? "right" : clear(rects.left, id) ? "left" : false;
        if (side) taken.push(rects[side]);
        return side;
      });
      labelled.forEach(function (p, i) {
        p.labelled = sides[i];
        var el = p.marker.getElement();
        if (el) setSide(el, sides[i]);
      });
    }

    function refresh() {
      regroup();
      relabel();
    }
    map.on("zoomend", refresh);
    refresh();
    // Label widths change once the web font arrives.
    if (document.fonts) document.fonts.ready.then(relabel);

    function setActive(id) {
      // Keep the label and its side across the icon swap so a labelled pin
      // doesn't blink or jump.
      if (active && pins[active]) pins[active].marker.setIcon(pinIcon(pins[active].item, false, pins[active].labelled));
      active = id;
      if (id && pins[id]) pins[id].marker.setIcon(pinIcon(pins[id].item, true, pins[id].labelled));
      // The active pin stays out of bubbles, so fold it back in once released.
      if (id === null) refresh(); else relabel();
    }

    return {
      map: map,
      narrow: narrow,
      PHONE_BR: PHONE_BR,
      pins: pins,
      home: home,
      setActive: setActive,
      active: function () { return active; }
    };
  };
})();

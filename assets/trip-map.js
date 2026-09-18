// Home page trip map. Reads the recap list from #trip-data (rendered by
// _layouts/home.html from _data/trips.yml) and draws one pin per trip.
// Selecting a pin shows the trip card and traces its route.
(function () {
  var el = document.getElementById("trip-map");
  var dataEl = document.getElementById("trip-data");
  if (!el || !dataEl || !window.L) return;

  var trips = JSON.parse(dataEl.textContent).filter(function (t) { return t.pin; });
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
    maxZoom: 6,
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
  var route = L.layerGroup().addTo(map);
  var card = document.getElementById("trip-card");
  var atlas = el.closest(".atlas");
  var active = null;

  function pinIcon(t, on) {
    return L.divIcon({
      className: "trip-pin" + (on ? " is-active" : ""),
      html: '<span class="trip-pin__dot"></span><span class="trip-pin__label">' + t.label + " <b>" + t.year + "</b></span>",
      iconSize: [HIT, HIT],
      iconAnchor: [HIT / 2, HIT / 2]
    });
  }

  // Set the view before adding markers: Leaflet defers layers added to a map
  // with no view, and regroup() can't remove a marker that isn't placed yet.
  var bounds = L.latLngBounds(trips.map(function (t) { return t.pin; }));
  var home = function () {
    // Leave room on the left for the intro panel on wide screens.
    map.fitBounds(bounds, narrow.matches
      ? { paddingTopLeft: [20, 20], paddingBottomRight: [PHONE_BR[0] - 30, PHONE_BR[1] - 50], maxZoom: 4 }
      : { paddingTopLeft: [400, 50], paddingBottomRight: [50, 50], maxZoom: 4 });
  };
  home();

  trips.forEach(function (t) {
    var m = L.marker(t.pin, { icon: pinIcon(t, false), title: t.title, keyboard: true, riseOnHover: true })
      .addTo(map)
      .on("click", function () { select(t.slug); });
    pins[t.slug] = { marker: m, trip: t };
  });

  // Pins that land on top of each other (London and Paris at world zoom)
  // fold into a numbered bubble; tapping it zooms in until they separate.
  var groups = L.layerGroup().addTo(map);
  // Tap targets are squares, so compare the larger of the x and y gaps:
  // straight-line distance lets two squares overlap on the diagonal.
  function tooClose(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y)) < GROUP_PX;
  }
  function regroup() {
    groups.clearLayers();
    var left = Object.keys(pins).map(function (k) { return pins[k]; });
    left.forEach(function (p) { if (!map.hasLayer(p.marker)) p.marker.addTo(map); });
    while (left.length) {
      var head = left.shift();
      var hp = map.latLngToContainerPoint(head.trip.pin);
      var near = left.filter(function (p) { return tooClose(hp, map.latLngToContainerPoint(p.trip.pin)); });
      if (!near.length) continue;
      left = left.filter(function (p) { return near.indexOf(p) < 0; });
      var members = [head].concat(near);
      // The bubble sits at the group's center, which can land on a pin that
      // wasn't close to the first member; pull those in until nothing is.
      for (var grew = true; grew;) {
        var c = map.latLngToContainerPoint(L.latLngBounds(members.map(function (p) { return p.trip.pin; })).getCenter());
        var more = left.filter(function (p) { return tooClose(c, map.latLngToContainerPoint(p.trip.pin)); });
        grew = more.length > 0;
        members = members.concat(more);
        left = left.filter(function (p) { return more.indexOf(p) < 0; });
      }
      if (members.some(function (p) { return p.trip.slug === active; })) continue;
      members.forEach(function (p) { map.removeLayer(p.marker); });
      addGroup(members);
    }
  }

  function addGroup(members) {
    var b = L.latLngBounds(members.map(function (p) { return p.trip.pin; }));
    L.marker(b.getCenter(), {
      icon: L.divIcon({ className: "trip-cluster", html: "<span>" + members.length + "</span>", iconSize: [CLUSTER, CLUSTER] }),
      title: members.map(function (p) { return p.trip.label; }).join(", "),
      keyboard: true,
      zIndexOffset: 500
    }).on("click", function () {
      var opts = narrow.matches
        ? { paddingTopLeft: [50, 50], paddingBottomRight: PHONE_BR, duration: 0.6 }
        : { paddingTopLeft: [420, 80], paddingBottomRight: [80, 80], duration: 0.6 };
      // Always zoom in at least a step, or a group that re-forms at the
      // fitted zoom would never come apart.
      var fitZoom = map.getBoundsZoom(b, false, L.point(narrow.matches ? 140 : 500, 160));
      if (fitZoom > map.getZoom() + 0.5) {
        map.flyToBounds(b, opts);
      } else {
        map.flyTo(b.getCenter(), Math.min(map.getZoom() + 1.5, map.getMaxZoom()), { duration: 0.6 });
      }
    }).addTo(groups);
  }
  map.on("zoomend", regroup);
  regroup();

  function select(slug) {
    var p = pins[slug];
    if (!p) return;
    if (active) pins[active].marker.setIcon(pinIcon(pins[active].trip, false));
    active = slug;
    p.marker.setIcon(pinIcon(p.trip, true));

    route.clearLayers();
    var pts = p.trip.stops.map(function (s) { return [s[1], s[2]]; });
    for (var i = 1; i < pts.length; i++) {
      L.polyline(arc(pts[i - 1], pts[i]), { className: "trip-route", weight: 2, dashArray: "4 6", interactive: false }).addTo(route);
    }
    p.trip.stops.forEach(function (s) {
      L.circleMarker([s[1], s[2]], { className: "trip-stop", radius: 4, weight: 2, interactive: true })
        .bindTooltip(s[0], { direction: "top", offset: [0, -4], className: "trip-tip" })
        .addTo(route);
    });

    var fit = pts.length ? L.latLngBounds(pts) : L.latLngBounds([p.trip.pin]);
    map.flyToBounds(fit, {
      paddingTopLeft: narrow.matches ? [30, 30] : [420, 60],
      paddingBottomRight: narrow.matches ? PHONE_BR : [60, 60],
      maxZoom: 6,
      duration: 0.8
    });

    showCard(p.trip);
  }

  // A gentle curve between two stops (quadratic Bézier bowed to one side),
  // which reads as travel rather than a straight line over land.
  function arc(a, b) {
    var dLat = b[0] - a[0], dLng = b[1] - a[1];
    var ctrl = [(a[0] + b[0]) / 2 + dLng * 0.18, (a[1] + b[1]) / 2 - dLat * 0.18];
    var out = [];
    for (var s = 0; s <= 20; s++) {
      var u = s / 20, v = 1 - u;
      out.push([v * v * a[0] + 2 * v * u * ctrl[0] + u * u * b[0], v * v * a[1] + 2 * v * u * ctrl[1] + u * u * b[1]]);
    }
    return out;
  }

  function showCard(t) {
    var img = card.querySelector("img");
    card.querySelector(".atlas__card-link").href = t.url;
    card.querySelector(".kicker").textContent = t.year;
    card.querySelector("h2").textContent = t.title;
    card.querySelector(".atlas__card-sub").textContent = t.subtitle || "";
    if (t.image) { img.src = t.image; img.hidden = false; } else { img.hidden = true; }
    card.hidden = false;
    atlas.classList.add("is-selected");
  }

  function clear() {
    if (active) pins[active].marker.setIcon(pinIcon(pins[active].trip, false));
    active = null;
    route.clearLayers();
    card.hidden = true;
    atlas.classList.remove("is-selected");
    home();
  }

  card.querySelector(".atlas__close").addEventListener("click", clear);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && active) clear(); });

  // Hovering a trip in the grid below lifts its pin on the map.
  document.querySelectorAll(".trip-card[data-trip]").forEach(function (a) {
    var slug = a.getAttribute("data-trip");
    if (!pins[slug]) return;
    // getElement() is null while the pin is folded into a group.
    a.addEventListener("mouseenter", function () { var e = pins[slug].marker.getElement(); if (e) e.classList.add("is-hover"); });
    a.addEventListener("mouseleave", function () { var e = pins[slug].marker.getElement(); if (e) e.classList.remove("is-hover"); });
  });
})();

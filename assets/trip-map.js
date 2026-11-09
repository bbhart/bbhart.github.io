// /trips/ route map. Reads the recap list from #trip-data (rendered by
// _layouts/trips.html from _data/trips.yml) and draws one pin per trip.
// Selecting a pin shows the trip card and traces its route.
(function () {
  var el = document.getElementById("trip-map");
  var dataEl = document.getElementById("trip-data");
  if (!el || !dataEl || !window.L || !window.createAtlas) return;

  var trips = JSON.parse(dataEl.textContent).filter(function (t) { return t.pin; });
  var bySlug = {};
  trips.forEach(function (t) { bySlug[t.slug] = t; });

  var atlas = window.createAtlas(el, trips.map(function (t) {
    return { id: t.slug, at: t.pin, label: t.label + " <b>" + t.year + "</b>", title: t.title };
  }), { onSelect: select });
  var map = atlas.map;
  var narrow = atlas.narrow;

  var route = L.layerGroup().addTo(map);
  var card = document.getElementById("trip-card");
  var box = el.closest(".atlas");

  function select(slug) {
    var trip = bySlug[slug];
    if (!trip) return;
    atlas.setActive(slug);

    route.clearLayers();
    var pts = trip.stops.map(function (s) { return [s[1], s[2]]; });
    for (var i = 1; i < pts.length; i++) {
      L.polyline(arc(pts[i - 1], pts[i]), { className: "trip-route", weight: 2, dashArray: "4 6", interactive: false }).addTo(route);
    }
    trip.stops.forEach(function (s) {
      L.circleMarker([s[1], s[2]], { className: "trip-stop", radius: 4, weight: 2, interactive: true })
        .bindTooltip(s[0], { direction: "top", offset: [0, -4], className: "trip-tip" })
        .addTo(route);
    });

    var fit = pts.length ? L.latLngBounds(pts) : L.latLngBounds([trip.pin]);
    map.flyToBounds(fit, {
      paddingTopLeft: narrow.matches ? [30, 30] : [420, 60],
      paddingBottomRight: narrow.matches ? atlas.PHONE_BR : [60, 60],
      maxZoom: 6,
      duration: 0.8
    });

    showCard(trip);
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
    box.classList.add("is-selected");
  }

  function clear() {
    atlas.setActive(null);
    route.clearLayers();
    card.hidden = true;
    box.classList.remove("is-selected");
    atlas.home();
  }

  card.querySelector(".atlas__close").addEventListener("click", clear);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && atlas.active()) clear(); });

  // Hovering a trip in the grid below lifts its pin on the map.
  document.querySelectorAll(".trip-card[data-trip]").forEach(function (a) {
    var slug = a.getAttribute("data-trip");
    if (!atlas.pins[slug]) return;
    // getElement() is null while the pin is folded into a group.
    a.addEventListener("mouseenter", function () { var e = atlas.pins[slug].marker.getElement(); if (e) e.classList.add("is-hover"); });
    a.addEventListener("mouseleave", function () { var e = atlas.pins[slug].marker.getElement(); if (e) e.classList.remove("is-hover"); });
  });
})();

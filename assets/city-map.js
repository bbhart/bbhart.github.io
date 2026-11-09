// Home page city map. Reads #city-data (rendered by _includes/city_index.html)
// and draws one pin per city. Selecting a pin lists one card per trip there.
(function () {
  var el = document.getElementById("city-map");
  var dataEl = document.getElementById("city-data");
  if (!el || !dataEl || !window.L || !window.createAtlas) return;

  var cities = JSON.parse(dataEl.textContent);
  var byName = {};
  cities.forEach(function (c) { byName[c.name] = c; });

  // Zoom further than the route map: towns a few kilometres apart can't
  // separate at zoom 6, and would be stuck inside a bubble.
  var atlas = window.createAtlas(el, cities.map(function (c) {
    return { id: c.name, at: c.coords, label: c.name, title: c.name, name: c.name };
  }), { onSelect: select, maxZoom: 12 });

  var panel = document.getElementById("city-card");
  var list = panel.querySelector(".city-cards");
  var box = el.closest(".atlas");
  var selected = null;

  function text(tag, className, value) {
    var node = document.createElement(tag);
    node.className = className;
    node.textContent = value;
    return node;
  }

  function nightsSuffix(n) {
    if (n >= 2) return " · " + n + " nights";
    if (n === 1) return " · 1 night";
    return "";
  }

  function cardItem(card) {
    var link = document.createElement("a");
    link.className = "trip-card";
    link.href = card.url;
    if (card.image) {
      var img = document.createElement("img");
      img.alt = "";
      img.src = card.image;
      link.appendChild(img);
    } else {
      var blank = text("span", "trip-card__blank", card.trip);
      blank.setAttribute("aria-hidden", "true");
      link.appendChild(blank);
    }
    link.appendChild(text("span", "trip-card__year", card.dateLabel + nightsSuffix(card.nights)));
    link.appendChild(text("span", "trip-card__title", card.trip));
    var li = document.createElement("li");
    li.appendChild(link);
    return li;
  }

  function select(name) {
    var city = byName[name];
    if (!city) return;
    selected = name;
    atlas.setActive(name);
    atlas.map.panInside(city.coords, atlas.narrow.matches
      ? { padding: [30, 30] }
      : { paddingTopLeft: [420, 60], paddingBottomRight: [60, 60] });

    panel.querySelector("h2").textContent = city.name;
    var newest = city.cards.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    list.replaceChildren.apply(list, newest.map(cardItem));
    panel.hidden = false;
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
    box.classList.add("is-selected");
    // On phones the panel sits below the map, possibly off screen.
    if (atlas.narrow.matches) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clear() {
    atlas.setActive(null);
    panel.hidden = true;
    box.classList.remove("is-selected");
    // After setActive: it regroups, and getElement() is null if the pin folded.
    var pin = selected && atlas.pins[selected].marker.getElement();
    if (pin) pin.focus();
    selected = null;
  }

  panel.querySelector(".atlas__close").addEventListener("click", clear);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && atlas.active()) clear(); });
})();

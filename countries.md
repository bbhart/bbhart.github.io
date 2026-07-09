---
layout: page
title: Countries
permalink: /countries/
background: '/assets/20230611-vista-bg.jpg'
description: Cities outside the US where I've slept at least one night
---

A running list of the places **outside the US** where I've spent at least one
night — grouped by country, then city. "Slept a night" means an overnight on
land (hotel, guesthouse, Airbnb, or someone's home). Cruise port-of-call stops,
where the night was actually spent aboard the ship, are not counted here — those
live over in the [cruise journal](https://serentistravel.com/journal).

**11 countries · 39 cities** and counting.

---

## Switzerland

- **Appenzell** — Adler Hotel (2025)
- **Basel** — Hotel Märthof, 3 nights (2023)
- **Bettmeralp** — Hotel Waldhaus (2024)
- **Brig** — Hotel de Londres (2024)
- **Geneva** (Carouge) — ibis Styles Genève Carouge (2019; again 2023)
- **Interlaken** — Hotel Lötschberg (2019)
- **Lucerne** — Hotel Drei Könige, 1 night (2023)
- **Thun** — Hotel Krone Thun (2024)
- **Wengen** — Hotel Alpenrose (2023); Hotel Alpenruhe (2024); Hotel Bären (2025)
- **Zermatt** — Hotel Tannenhof (2024); Hotel Albatros (2025)
- **Zurich** — Hotel City Zürich (2024)

## France

- **Chamonix** — Hôtel Mercure Les Bossons, then Heliopic Hotel (2019; Chamonix is in France, near the Swiss border)
- **Saint-Nazaire** — 6-week stay building the Celebrity Millennium cruise ship

## Iceland

- **Húsafell** — Húsafell Cottage, Airbnb (2023)
- **Laugarvatn area** — Birna's Cottage, Airbnb (2023)
- **Reykjavik** — Old Reykjavik Charm apartment (two different visits)
- **Steinar / South Coast** — Airbnb (Sept 2024)

## Japan

- **Kamakura** — Hotel Metropolitan Kamakura, 3 nights (2024)
- **Kyoto** — Hotel Granvia Kyoto, 2 nights (2024)
- **Tokyo** (Asakusa) — Asakusa View Hotel Annex Rokku, ~4 nights (2024)

## Norway

- **Balestrand** — Kviknes Hotel (2025)
- **Bergen** — Hotel Park (2025)
- **Oslo** — Clarion Hotel Oslo (2025)
- **Voss** — Scandic Voss (2025)

## Denmark

- **Copenhagen** — Copenhagen Strand (2025)

## Germany

- **Freiburg im Breisgau** — Courtyard Freiburg, 3 nights (2023)
- **Füssen** — Best Western Plus Hotel Füssen (2025) — wouldn't recommend
- **Garmisch-Partenkirchen** — Hyperion Hotel Garmisch-Partenkirchen (2025)
- **Munich** — Mercure Hotel München Altstadt, then Hilton Munich Airport (2025)

## Italy

- **Mestre** — 6-week stay (mainland Venice) building the Disney Wonder cruise ship
- **Rome** — Hotel Campo de' Fiori, 3 nights (2026)
- **Venice** — Aqua Palace, 3 nights (2023)

## United Arab Emirates

- **Dubai** — overnight extended layover, Airbnb (Jan 2019, en route to India)

## India

- **Bengaluru (Bangalore)** — The Oberoi (1 visit), The Leela Palace (2 visits)

## Canada

- **Halifax** — Halifax Marriott Harbourfront; The Westin Nova Scotian
- **Montreal** — Downtown Montreal (don't recall the hotel)
- **Toronto** — ~8 visits; The Fairmont Royal York (1 visit), Yonge & Eglinton area (the rest, with my now-wife)
- **Vancouver** — one night before an Alaska cruise
- **Whistler** — 2 visits; a hostel on Alta Lake, then Pan Pacific Whistler Village Centre

<!-- Keep the countries in the ItemList below in sync with the ## headings above. -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": {{ page.title | jsonify }},
  "url": "{{ page.url | absolute_url }}",
  "description": {{ page.description | jsonify }},
  "author": { "@type": "Person", "@id": "{{ site.url }}{{ site.baseurl }}/#person" },
  "about": {
    "@type": "ItemList",
    "name": "Countries where I have spent at least one night",
    "itemListElement": [
      { "@type": "ListItem", "position": 1,  "item": { "@type": "Country", "name": "Switzerland", "sameAs": "https://www.wikidata.org/wiki/Q39" } },
      { "@type": "ListItem", "position": 2,  "item": { "@type": "Country", "name": "France", "sameAs": "https://www.wikidata.org/wiki/Q142" } },
      { "@type": "ListItem", "position": 3,  "item": { "@type": "Country", "name": "Iceland", "sameAs": "https://www.wikidata.org/wiki/Q189" } },
      { "@type": "ListItem", "position": 4,  "item": { "@type": "Country", "name": "Japan", "sameAs": "https://www.wikidata.org/wiki/Q17" } },
      { "@type": "ListItem", "position": 5,  "item": { "@type": "Country", "name": "Norway", "sameAs": "https://www.wikidata.org/wiki/Q20" } },
      { "@type": "ListItem", "position": 6,  "item": { "@type": "Country", "name": "Denmark", "sameAs": "https://www.wikidata.org/wiki/Q35" } },
      { "@type": "ListItem", "position": 7,  "item": { "@type": "Country", "name": "Germany", "sameAs": "https://www.wikidata.org/wiki/Q183" } },
      { "@type": "ListItem", "position": 8,  "item": { "@type": "Country", "name": "Italy", "sameAs": "https://www.wikidata.org/wiki/Q38" } },
      { "@type": "ListItem", "position": 9,  "item": { "@type": "Country", "name": "United Arab Emirates", "sameAs": "https://www.wikidata.org/wiki/Q878" } },
      { "@type": "ListItem", "position": 10, "item": { "@type": "Country", "name": "India", "sameAs": "https://www.wikidata.org/wiki/Q668" } },
      { "@type": "ListItem", "position": 11, "item": { "@type": "Country", "name": "Canada", "sameAs": "https://www.wikidata.org/wiki/Q16" } }
    ]
  }
}
</script>

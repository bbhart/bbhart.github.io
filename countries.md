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

- **Appenzell** — [Adler Hotel](https://www.adlerhotel.ch/en/home/) (2025)
- **Basel** — [Hotel Märthof](https://www.hotel-maerthof-basel.ch/en.html), 3 nights (2023)
- **Bettmeralp** — [Hotel Waldhaus](https://www.waldhaus-bettmeralp.ch/en/) (2024)
- **Brig** — [Hotel de Londres](https://www.hotel-delondres.ch/en-us) (2024)
- **Geneva** (Carouge) — [ibis Styles Genève Carouge](https://all.accor.com/hotel/6863/index.en.shtml) (2019; again 2023)
- **Interlaken** — [Hotel Lötschberg](https://www.lotschberg.ch/en) (2019)
- **Lucerne** — [Hotel Drei Könige](https://www.drei-koenige.ch/en), 1 night (2023)
- **Thun** — [Hotel Krone Thun](https://en.krone-thun.ch/) (2024)
- **Wengen** — [Hotel Alpenrose](https://www.alpenrose.ch/en) (2023); [Hotel Alpenruhe](https://www.alpenruhe-wengen.ch/) (2024); [Hotel Bären](https://www.baeren-wengen.ch/en/) (2025)
- **Zermatt** — [Hotel Tannenhof](https://tannenhofzermatt.ch/) (2024); [Hotel Albatros](https://hotel-albatros.ch/) (2025)
- **Zurich** — [Hotel City Zürich](https://hotelcity.ch/en/) (2024)

## France

- **Chamonix** — [Big Sky Hotel & Spa Chamonix](https://mercure-les-bossons.hotelsbookingchamonix.com/en/), then [Heliopic Hotel](https://www.heliopic.com/en) (2019; Chamonix is in France, near the Swiss border)
- **Saint-Nazaire** — 6-week stay building the Celebrity Millennium cruise ship

## Iceland

- **Húsafell** — Húsafell Cottage, Airbnb (2023)
- **Laugarvatn area** — Birna's Cottage, Airbnb (2023)
- **Reykjavik** — [Old Reykjavik Charm](https://oldreykjavik.is/) apartment (two different visits)
- **Steinar / South Coast** — Airbnb (Sept 2024)

## Japan

- **Kamakura** — [Hotel Metropolitan Kamakura](https://kamakura.hotel-metropolitan.com/), 3 nights (2024)
- **Kyoto** — [Hotel Granvia Kyoto](https://www.granviakyoto.com/en/), 2 nights (2024)
- **Tokyo** (Asakusa) — [Asakusa View Hotel Annex Rokku](https://www.viewhotels.jp/asakusa-annex/), ~4 nights (2024)

## Norway

- **Balestrand** — [Kviknes Hotel](https://en.kviknes.no/) (2025)
- **Bergen** — [Hotel Park](https://www.hotelpark.no/) (2025)
- **Oslo** — [Clarion Hotel Oslo](https://www.strawberryhotels.com/hotels/norway/oslo/clarion-hotel-oslo/) (2025)
- **Voss** — [Scandic Voss](https://www.scandichotels.com/en/hotels/scandic-voss) (2025)

## Denmark

- **Copenhagen** — [Copenhagen Strand](https://www.copenhagenstrand.com/) (2025)

## Germany

- **Freiburg im Breisgau** — [Courtyard Freiburg](https://www.marriott.com/en-us/hotels/bslfr-courtyard-freiburg/overview/), 3 nights (2023)
- **Füssen** — [Best Western Plus Hotel Füssen](https://www.bestwestern.de/en/hotels/Fuessen/Best-Western-Hotel-Fuessen/hotel) (2025) — wouldn't recommend
- **Garmisch-Partenkirchen** — [Hyperion Hotel Garmisch-Partenkirchen](https://www.h-hotels.com/en/hyperion/hotels/hyperion-hotel-garmisch-partenkirchen) (2025)
- **Munich** — [Mercure Hotel München Altstadt](https://all.accor.com/hotel/3709/index.en.shtml), then [Hilton Munich Airport](https://www.hilton.com/en/hotels/muctmhi-hilton-munich-airport/) (2025)

## Italy

- **Mestre** — 6-week stay (mainland Venice) building the Disney Wonder cruise ship
- **Rome** — [Hotel Campo de' Fiori](https://www.hotelcampodefiori.com/en/), 3 nights (2026)
- **Venice** — [Aqua Palace](https://www.aquapalace.it/), 3 nights (2023)

## United Arab Emirates

- **Dubai** — overnight extended layover, Airbnb (Jan 2019, en route to India)

## India

- **Bengaluru (Bangalore)** — [The Oberoi](https://www.oberoihotels.com/hotels-in-bengaluru/) (1 visit), [The Leela Palace](https://www.theleela.com/the-leela-palace-bengaluru) (2 visits)

## Canada

- **Halifax** — [Halifax Marriott Harbourfront](https://www.marriott.com/en-us/hotels/yhzmc-halifax-marriott-harbourfront-hotel/overview/); [The Westin Nova Scotian](https://www.marriott.com/en-us/hotels/yhzwi-the-westin-nova-scotian/overview/)
- **Montreal** — Downtown Montreal (don't recall the hotel)
- **Toronto** — ~8 visits; [The Fairmont Royal York](https://www.thefairmontroyalyork.com/) (1 visit), Yonge & Eglinton area (the rest, with my now-wife)
- **Vancouver** — [Pan Pacific Vancouver](https://www.panpacific.com/en/hotels-and-resorts/pp-vancouver.html), one night before an Alaska cruise
- **Whistler** — 2 visits; a hostel on Alta Lake, then [Pan Pacific Whistler Village Centre](https://www.panpacific.com/en/hotels-and-resorts/pp-whistler-village-centre.html)

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

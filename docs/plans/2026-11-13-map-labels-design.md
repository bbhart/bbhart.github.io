# Zoom-dependent labels on the home map

Approved 2026-11-13.

## Goal

City names on the home map appear without hovering once the map is zoomed in
far enough, with more important places labeled sooner. The /trips/ map is
unchanged.

## Default label zoom

Computed at build time from the city's `stays` in `_data/cities.yml`, counting
only trips with published posts (the same visits the map's cards use):

| Rule | Label from zoom |
|---|---|
| 5+ nights in total, or 3+ trips | 4 |
| 2+ nights in total, or 2 trips | 6 |
| Any overnight | 8 |
| Cruise ports and shore excursions only | 10 |

An optional `label_zoom:` on a city's entry overrides the default. New cities
need nothing. Day-trip-only entries aren't on the map and are unaffected.

## Rank

Labels are placed in rank order: lower label zoom first, then more total
nights, then more trips, then name. A label that would overlap an
already-placed label, or a bubble, is hidden. Hover, keyboard focus and the
selected pin show a label regardless.

## Mechanics

- `#city-data` gains `labelZoom` and `rank` (or the inputs to compute it) per
  city.
- `assets/map-base.js` accepts optional `labelZoom` and `rank` on items. After
  every regroup (zoomend), it resets permanent labels, then walks unbundled
  pins in rank order, shows each eligible label, and keeps it only if its
  rectangle doesn't intersect a kept label or a bubble.
- A class on the marker turns the label on; same style as the hover label.
- The /trips/ map passes no `labelZoom`, so its behaviour is unchanged.

## Verification

Scratchpad builds only. A script checks each city's `labelZoom` against the
rule or its override. A browser test at several zooms, desktop and phone,
confirms eligible labels appear, none overlap, hover still works, and /trips/
is unchanged. Screenshots for review, and the full default list for Brian to
adjust.

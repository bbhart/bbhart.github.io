# City map on the home page, route map on /trips/

Approved 2026-11-09.

## Goal

Move the per-voyage route map to a new `/trips/` page. Replace it on the home
page with a map that has one pin per city Brian has written about. Clicking a
pin shows one card per trip to that city, with the post's header image and
date. Clicking a card opens the post.

## Decisions

| Question | Decision |
|---|---|
| What a card represents | One card per trip, not per post |
| Which places get pins | Cities, towns and villages, including cruise ports. Not airports, stations, seas, venues or natural sites |
| `/trips/` versus `/recaps/` | `/trips/` replaces `/recaps/`, which redirects to it |
| How the index is built | `_data/cities.yml` plus Liquid at build time, because GitHub Pages does not run this repo's plugins |

## Pages

**Home (`/`)**

- The route map becomes a city map on the same Natural Earth basemap.
- The "Where I've been" intro panel stays. Its count becomes trips and cities.
- The Trip recaps grid moves to `/trips/`.
- The Technology/Life bands and Latest posts stay.

**Trips (`/trips/`)**

- Holds the existing route map and photo grid, including grid hover lifting pins.
- The nav item "Trip Recaps" becomes "Trips".
- `recaps.markdown` is removed. `/recaps/` redirects through `redirect_from`.

## Data

New `_data/cities.yml`, one entry per city:

```yaml
Zurich:
  coords: [47.377, 8.541]
  aliases: ["Zurich, Switzerland"]
```

Only a key or an alias counts as a match, so seas and restaurants never match.
Airports and stations are not aliased: `Zurich Airport` alone is not a visit to
Zurich. Coordinates reuse `_data/trips.yml` stops where they exist.

## Card selection

For each city:

1. Find published posts whose `locations` or `locations_visited` match the city.
   Entries may be strings or hashes with a `name`.
2. Group by trip key: the post's `rollup_key`, else the `rollup_key` of its entry
   in `_data/trips.yml`, else the post itself as a one-post group.
3. Each group makes one card, linked to its earliest non-recap post. If only the
   recap is tagged, the card links to the recap.
4. Sort cards newest first.

Recaps are posts with the `rollup` category. They carry no `rollup_key` of their
own, and adding one would list each recap inside its own day-by-day index, so
each `_data/trips.yml` entry gains a `rollup_key` field. That field also supplies
the card's trip label. Two label-only entries are added, with no pin or stops:
`switzerland-2024`, whose recap is not in the `rollup` category, and
`Transatlantic-Crossing-recap`, which is unpublished.

Zurich is the reference case: two cards, 2024 and 2025.

**Images.** Use the linked post's `background`, then the trip recap's
`background`, then the text-only tile the trip grid already uses.

**Trip label.** The `_data/trips.yml` label and year, else the post title.

**Dates.** The card shows the linked post's date, which may be a travel day.

A city with no matching posts gets no pin.

## Interaction

**Pins.** Same dot as today, with the city name on hover or keyboard focus.
Overlapping pins fold into a numbered bubble, and clicking a bubble zooms in
until they separate. The city map's maximum zoom is 12, not the route map's 6,
because towns a few kilometres apart cannot separate at 6. Grouping switches off
at maximum zoom, so every pin stays reachable.

**Selecting a pin.** The pin is highlighted and the map pans only as far as
needed to clear the panel, without changing zoom. The panel takes the existing card position: replacing the intro
panel on wide screens, and below or over the map on phones. It shows the city
name and one card per trip.

**Cards.** Header image, visit date (for example "Jul 12, 2024") and a small trip
label (for example "Switzerland 2024"). The whole card is one link. Cards stack
vertically, and the panel scrolls when a city has many trips.

**Closing.** The close button or Escape closes the panel, restores the intro and
leaves the map where it is. Selecting another pin swaps the panel contents.

## Code

- `assets/city-map.js`: city pins and the card panel.
- `assets/map-base.js`: basemap and bubble logic shared by both maps, moved out
  of `assets/trip-map.js`.
- City data is rendered inline as JSON, like `#trip-data` today.
- Card images load only when a pin is selected.
- If the basemap fetch fails, pins still display on a blank background.

## Verification

The repo has no test suite.

**Data.** A throwaway script lists every post location tag not matched by
`cities.yml`. Brian reviews the final city list, watching for duplicates such as
`Vik` and `Vík`, and ambiguous places such as `Reykholt`.

**Build**, always into a scratchpad directory, never `_site`:

- Zurich renders exactly two cards, linking to the expected posts.
- A build without `--unpublished` produces no pins or cards from drafts.
- The JSON parses, every card URL resolves, and every image path exists.
- `/recaps/` redirects to `/trips/`, and no internal links use the old path.

**Browser**, with Playwright at desktop and phone widths, light and dark:

- Home: pins and bubbles render, Zurich's panel shows two cards, a card
  navigates to its post, and the close button and Escape work.
- Trips: selecting a trip draws its route, and grid hover lifts pins.
- No console errors on either page.

## Rollout

Work happens on the `city-map` branch. Nothing merges to `main` or is pushed
until Brian has reviewed it locally. `api/travel-data.json` does not need
regenerating, because no post content changes.

## Upkeep

A post tagged with a new city shows no pin until that city is added to
`cities.yml`. The file's header comment says so, as `trips.yml` does for recaps.

## Amendment: who gets a pin

This narrows "Which places get pins" and "Card selection" above.

**The rule.** On land trips, a town gets a pin if Brian slept there at least one
night. On cruises, every port gets a pin, plus shore excursion towns with real
narrative in the post; both are recorded as 0 nights. Day trips on land, transit
and layovers, and home towns get no pin.

**Format.** Each entry in `_data/cities.yml` carries `stays`, a map of trip key to
nights:

```yaml
Reykjavik:
  coords: [64.146, -21.942]
  stays: {2023iceland: 2, 2024icelandcruise: 0, 2024icelandonland: 1}
```

A post counts for a city only if its trip key is in that city's `stays`, so a new
stay needs a line there. Each card carries `nights`, shown on its date line.
`_data/trips.yml` stops take an optional 4th element for nights.

Zurich has one card under this rule, 2024. The 2025 trip only passed through its
airport and station.

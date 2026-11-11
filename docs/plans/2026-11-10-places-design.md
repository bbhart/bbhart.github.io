# Places page

Approved 2026-11-10.

## Goal

Replace the Destinations index with a Places page: every town Brian visited and
wrote about, grouped by country, with one link per trip. It captures cruise ports
and day trips that the Countries page (overnight stays outside the US, written
by hand) leaves out.

## Decisions

| Question | Decision |
|---|---|
| Which places | The home map's cities (land overnights, cruise ports, shore excursion towns) plus land day trips. Not train changes, airport layovers or home towns |
| Destinations | Places takes its nav slot; `/destinations/` redirects to `/places/`. The six country hub pages stay where they are, and Places' country headings link to them |
| Entry format | Place name, then one link per trip: trip label and year, plus nights, port, shore excursion or day trip |
| Grouping | Includes the US. Territories get their own heading: Puerto Rico, Bermuda, Greenland, Gibraltar, Aruba, Curaçao, Bonaire |
| Data | Extend `_data/cities.yml`; build in Liquid. No second data file |

## Data: `_data/cities.yml`

New fields per entry:

- `country`: heading name, e.g. `Switzerland`, `Puerto Rico`.
- `day_trips`: list of trip keys where the town was a land day trip.
- `excursion: true`: the `0` in `stays` was a shore excursion, not a port call.

```yaml
Vík:
  coords: [63.419, -19.006]
  country: Iceland
  day_trips: [2024icelandonland]
```

The home map reads only `stays`, so a day-trip-only entry gets no pin.

## Visit labels

| Data | Label |
|---|---|
| `stays` ≥ 2 | `(N nights)` |
| `stays` 1 | `(1 night)` |
| `stays` 0 | `(port)`, or `(shore excursion)` with `excursion: true` |
| `day_trips` | `(day trip)` |

Each link goes to the trip's earliest non-recap post tagging the place, falling
back to the recap, the same rule as the home map cards. Visits whose only posts
are unpublished don't appear, and a place with no visits doesn't appear.

## Shared logic

The card selection in `_includes/city_index.html` moves into an include that both
the home map and Places call, taking the set of trip keys to consider.

## Page

- `places.md` at `/places/`, `redirect_from: /destinations/`.
- Intro, `N countries · M places`, link to Countries.
- Countries alphabetical; places alphabetical within each.
- A country heading links to the hub page whose `dest_name` matches.
- JSON-LD `CollectionPage` with an `ItemList` of countries.
- `destinations/index.md` is removed. Nav, `head.html` breadcrumb and related
  link, `hub_body.html` breadcrumb, and `llms.txt` point to Places.

## Verification

Scratchpad builds only. Checks: every `cities.yml` visit with a published post
renders exactly once under the right country; labels match the data; links are
built; `/destinations/` redirects; the home map is unchanged from `main`
(same `#city-data`). Then a browser look.

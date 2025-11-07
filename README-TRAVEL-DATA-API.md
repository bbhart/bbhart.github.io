# Travel Data API

## Overview

This Jekyll site automatically generates a structured JSON API of all travel blog posts at `/api/travel-data.json`. This allows LLMs and other tools to query your travel history with structured questions like:

- "List all cities Brian visited in Switzerland"
- "What activities did Brian do in Japan?"
- "Show me all the accommodations from the 2023 Iceland trip"

## How It Works

### 1. Jekyll Plugin (`_plugins/travel_data_generator.rb`)

The Ruby plugin runs automatically during every Jekyll build:
- Parses all markdown files in `_posts/`
- Extracts YAML frontmatter metadata
- Aggregates data into a structured JSON file
- Outputs to `/api/travel-data.json`

### 2. Automatic Rebuild

Since your site uses GitHub Pages with GitHub Actions:
- Every `git push` triggers a rebuild
- Jekyll runs the plugin during build
- The JSON file is regenerated with latest data
- Published to `https://bbhart.com/api/travel-data.json`

**No manual intervention required!**

### 3. Rich Metadata Schema

The plugin looks for these frontmatter fields:

```yaml
---
layout: post
title: Trip Day Title
date: 2023-06-11
categories: travel iceland
rollup_key: 2023iceland        # Groups posts by trip
trip_day: 1
location_start: City, Country
location_end: City, Country
locations_visited:
  - Location 1
  - Location 2
transport:
  - type: air
    route: Origin to Destination
    carrier: Airline Name
accommodation:
  name: Hotel/Cottage Name
  location: City
  amenities: [list, of, amenities]
activities:
  - Activity 1
  - Activity 2
dining:
  - location: Restaurant
    type: cuisine
notable_experiences:
  - Experience 1
weather: Description
---
```

## JSON Structure

The generated file contains:

```json
{
  "generated_at": "2025-11-07T13:53:57Z",
  "total_posts": 79,
  "trips": [
    {
      "rollup_key": "2023iceland",
      "posts": [ /* array of posts */ ]
    }
  ],
  "all_locations": [ /* unique locations across all trips */ ],
  "all_activities": [ /* unique activities across all trips */ ],
  "timeline": [ /* all posts sorted by date */ ]
}
```

## Usage Examples

### For LLMs (Claude, ChatGPT, etc.)

Users can share this URL with LLMs:
```
https://bbhart.com/api/travel-data.json
```

The LLM can fetch and query the structured data to answer questions like:
- "Show me all locations Brian visited in Switzerland"
- "What were Brian's accommodations in Iceland?"
- "List all activities from the Japan trip"

### For Developers

```bash
# Fetch the data
curl https://bbhart.com/api/travel-data.json

# Query with jq
curl -s https://bbhart.com/api/travel-data.json | \
  jq '.trips[] | select(.rollup_key == "2023iceland")'
```

### For Yourself (Local)

When adding metadata to posts, use the slash command:
```bash
/bh-add-jekyll-metadata 2023-06-*
```

This will analyze your posts and add rich metadata fields.

## Adding Metadata to Existing Posts

Currently, most of your older posts don't have the rich metadata (locations_visited, activities, etc.). To get the most value from this API, you should:

1. Run `/bh-add-jekyll-metadata` on trip folders
2. Or manually add metadata to key posts
3. Commit and push
4. GitHub Actions will rebuild and update the API

## Testing Locally

To test the plugin without building the full site:

```bash
ruby test_travel_data.rb
```

This generates `travel-data-test.json` with a preview of what will be published.

## Benefits

✅ **Structured queries**: LLMs can answer specific questions about your travels
✅ **Automatic updates**: New posts automatically appear in the API
✅ **Zero maintenance**: No server to manage, just static JSON
✅ **Backward compatible**: Old posts without metadata still work
✅ **Flexible**: Add new metadata fields anytime by updating the plugin

## Future Enhancements

Potential additions:
- Country-level grouping
- Photo galleries per location
- Map coordinates for locations
- Cost/budget information
- Travel companions metadata

#!/usr/bin/env ruby
# Regenerates api/travel-data.json by aggregating frontmatter from _posts/.
# Mirrors the Jekyll plugin at _plugins/travel_data_generator.rb so the
# committed JSON stays in sync without needing a full Jekyll build.

require 'json'
require 'yaml'
require 'time'
require 'fileutils'

travel_data = {
  generated_at: Time.now.utc.iso8601,
  total_posts: 0,
  trips: {},
  all_locations: [],
  all_activities: [],
  timeline: []
}

Dir.glob('_posts/*.markdown').each do |file|
  content = File.read(file)

  next unless content =~ /\A---\s*\n(.*?)\n---\s*\n/m
  frontmatter = YAML.safe_load($1, permitted_classes: [Date, Time])

  next unless frontmatter['categories']&.include?('travel') || frontmatter['rollup_key']

  travel_data[:total_posts] += 1

  post_entry = {
    title: frontmatter['title'],
    date: frontmatter['date']&.to_s,
    subtitle: frontmatter['subtitle'],
    categories: frontmatter['categories'],
    tags: frontmatter['tags'],
    rollup_key: frontmatter['rollup_key']
  }

  # Explicit allow-list of rich travel metadata fields.
  # Keep in sync with _plugins/travel_data_generator.rb.
  %w[
    trip_day
    day_number
    day_type
    trip_stage
    trip_type
    trip_duration
    trip_duration_days
    location_start
    location_end
    start_location
    end_location
    location
    locations
    locations_visited
    countries_visited
    days_at_location
    accommodation
    accommodations
    hotels
    venues
    points_of_interest
    nearby_attractions_mentioned
    transport
    flights
    next_day_logistics
    walking_distance
    activities
    dining
    highlights
    notable_experiences
    notable_events
    notable_mentions
    challenges
    weather
    companions
    travel_companions
    travelers
    travel_sentiment
    cultural_references
    references
    skipped
  ].each do |field|
    post_entry[field] = frontmatter[field] if frontmatter[field]
  end

  travel_data[:timeline] << post_entry

  if frontmatter['rollup_key']
    rollup_key = frontmatter['rollup_key']
    travel_data[:trips][rollup_key] ||= { rollup_key: rollup_key, posts: [] }
    travel_data[:trips][rollup_key][:posts] << post_entry
  end

  # Collect unique location names (entries may be strings or hashes)
  %w[locations locations_visited].each do |loc_field|
    next unless frontmatter[loc_field]

    entries = frontmatter[loc_field].is_a?(Array) ? frontmatter[loc_field] : [frontmatter[loc_field]]
    entries.each do |entry|
      name = entry.is_a?(Hash) ? (entry['name'] || entry['location'] || entry['place']) : entry
      travel_data[:all_locations] << name if name
    end
  end

  if frontmatter['activities']
    activities = frontmatter['activities'].is_a?(Array) ? frontmatter['activities'] : [frontmatter['activities']]
    travel_data[:all_activities].concat(activities)
  end
end

locations_strings = travel_data[:all_locations].flatten.compact.map { |loc| loc.is_a?(String) ? loc : loc.to_s }
travel_data[:all_locations] = locations_strings.uniq.sort

activities_strings = travel_data[:all_activities].flatten.compact.map { |act| act.is_a?(String) ? act : act.to_s }
travel_data[:all_activities] = activities_strings.uniq.sort

travel_data[:timeline].sort_by! { |post| post[:date].to_s }
travel_data[:trips] = travel_data[:trips].values

FileUtils.mkdir_p('api')
output_path = 'api/travel-data.json'
File.write(output_path, JSON.pretty_generate(travel_data))

puts "✓ Wrote #{output_path} (#{travel_data[:total_posts]} posts, #{travel_data[:trips].length} trips)"

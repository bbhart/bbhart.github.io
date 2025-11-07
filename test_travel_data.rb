#!/usr/bin/env ruby
# Test script to simulate the travel data generator plugin

require 'json'
require 'yaml'
require 'time'

travel_data = {
  generated_at: Time.now.utc.iso8601,
  total_posts: 0,
  trips: {},
  all_locations: [],
  all_activities: [],
  timeline: []
}

# Process all markdown files in _posts
Dir.glob('_posts/*.markdown').each do |file|
  content = File.read(file)

  # Extract YAML frontmatter
  if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
    frontmatter = YAML.safe_load($1, permitted_classes: [Date, Time])

    # Only process posts with travel category or rollup_key
    next unless frontmatter['categories']&.include?('travel') || frontmatter['rollup_key']

    travel_data[:total_posts] += 1

    # Build post entry
    post_entry = {
      title: frontmatter['title'],
      date: frontmatter['date']&.to_s,
      subtitle: frontmatter['subtitle'],
      categories: frontmatter['categories'],
      tags: frontmatter['tags'],
      rollup_key: frontmatter['rollup_key']
    }

    # Add all the rich metadata fields
    [
      'trip_day',
      'location_start',
      'location_end',
      'locations_visited',
      'transport',
      'accommodation',
      'activities',
      'dining',
      'notable_experiences',
      'weather'
    ].each do |field|
      post_entry[field] = frontmatter[field] if frontmatter[field]
    end

    # Add to timeline
    travel_data[:timeline] << post_entry

    # Group by trip (rollup_key)
    if frontmatter['rollup_key']
      rollup_key = frontmatter['rollup_key']
      travel_data[:trips][rollup_key] ||= {
        rollup_key: rollup_key,
        posts: []
      }
      travel_data[:trips][rollup_key][:posts] << post_entry
    end

    # Collect unique locations
    if frontmatter['locations_visited']
      locations = frontmatter['locations_visited'].is_a?(Array) ? frontmatter['locations_visited'] : [frontmatter['locations_visited']]
      travel_data[:all_locations].concat(locations)
    end

    # Collect unique activities
    if frontmatter['activities']
      activities = frontmatter['activities'].is_a?(Array) ? frontmatter['activities'] : [frontmatter['activities']]
      travel_data[:all_activities].concat(activities)
    end
  end
end

# Deduplicate and sort
# Locations can be strings or hashes, so we need to handle both
locations_strings = travel_data[:all_locations].flatten.compact.map { |loc| loc.is_a?(String) ? loc : loc.to_s }
travel_data[:all_locations] = locations_strings.uniq.sort

# Activities are typically strings
activities_strings = travel_data[:all_activities].flatten.compact.map { |act| act.is_a?(String) ? act : act.to_s }
travel_data[:all_activities] = activities_strings.uniq.sort

travel_data[:timeline].sort_by! { |post| post[:date].to_s }

# Convert trips hash to array
travel_data[:trips] = travel_data[:trips].values

# Write the JSON file
output_path = 'travel-data-test.json'
File.write(output_path, JSON.pretty_generate(travel_data))

puts "✓ Generated #{output_path} with #{travel_data[:total_posts]} posts"
puts "✓ Found #{travel_data[:trips].length} trips"
puts "✓ Found #{travel_data[:all_locations].length} unique locations"
puts "✓ Found #{travel_data[:all_activities].length} unique activities"

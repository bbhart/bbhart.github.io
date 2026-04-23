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

  %w[
    trip_day
    location_start
    location_end
    locations_visited
    transport
    accommodation
    activities
    dining
    notable_experiences
    weather
  ].each do |field|
    post_entry[field] = frontmatter[field] if frontmatter[field]
  end

  travel_data[:timeline] << post_entry

  if frontmatter['rollup_key']
    rollup_key = frontmatter['rollup_key']
    travel_data[:trips][rollup_key] ||= { rollup_key: rollup_key, posts: [] }
    travel_data[:trips][rollup_key][:posts] << post_entry
  end

  if frontmatter['locations_visited']
    locations = frontmatter['locations_visited'].is_a?(Array) ? frontmatter['locations_visited'] : [frontmatter['locations_visited']]
    travel_data[:all_locations].concat(locations)
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

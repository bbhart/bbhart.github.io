# frozen_string_literal: true

# Travel Data Generator Plugin
# Automatically generates /api/travel-data.json during Jekyll build
# Aggregates all travel post metadata for structured querying by LLMs

require 'json'
require 'yaml'

module TravelDataGenerator
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      travel_data = {
        generated_at: Time.now.utc.iso8601,
        total_posts: 0,
        trips: {},
        all_locations: [],
        all_activities: [],
        timeline: []
      }

      # Process all posts
      site.posts.docs.each do |post|
        data = post.data

        # Only process posts with travel-related categories or rollup_key
        next unless data['categories']&.include?('travel') || data['rollup_key']

        travel_data[:total_posts] += 1

        # Build post entry
        post_entry = {
          title: data['title'],
          date: data['date']&.to_s,
          url: post.url,
          subtitle: data['subtitle'],
          categories: data['categories'],
          tags: data['tags'],
          rollup_key: data['rollup_key']
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
          post_entry[field] = data[field] if data[field]
        end

        # Add to timeline
        travel_data[:timeline] << post_entry

        # Group by trip (rollup_key)
        if data['rollup_key']
          rollup_key = data['rollup_key']
          travel_data[:trips][rollup_key] ||= {
            rollup_key: rollup_key,
            posts: []
          }
          travel_data[:trips][rollup_key][:posts] << post_entry
        end

        # Collect unique locations
        if data['locations_visited']
          locations = data['locations_visited'].is_a?(Array) ? data['locations_visited'] : [data['locations_visited']]
          travel_data[:all_locations].concat(locations)
        end

        # Collect unique activities
        if data['activities']
          activities = data['activities'].is_a?(Array) ? data['activities'] : [data['activities']]
          travel_data[:all_activities].concat(activities)
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

      # Write JSON to source directory so it gets committed to git
      # GitHub Pages doesn't support custom plugins, so we commit the generated file
      api_dir = File.join(site.source, 'api')
      FileUtils.mkdir_p(api_dir)

      output_path = File.join(api_dir, 'travel-data.json')
      File.write(output_path, JSON.pretty_generate(travel_data))

      Jekyll.logger.info "Travel Data:", "Wrote #{output_path}"

      # Also create a Jekyll page so it's included in the build
      page = Jekyll::PageWithoutAFile.new(site, site.source, 'api', 'travel-data.json')
      page.content = JSON.pretty_generate(travel_data)
      page.data['layout'] = nil
      site.pages << page

      Jekyll.logger.info "Travel Data:", "Generated travel-data.json with #{travel_data[:total_posts]} posts"
    end
  end
end

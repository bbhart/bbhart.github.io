puts "🔍 TEST PLUGIN LOADED"

module TestPlugin
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      puts "✅ TEST PLUGIN GENERATE METHOD CALLED"
      Jekyll.logger.info "Test Plugin:", "I am running!"
    end
  end
end

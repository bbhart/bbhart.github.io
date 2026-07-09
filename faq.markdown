---
layout: page
title: Travel FAQ
permalink: /faq/
published: false
background: '/assets/20230611-vista-bg.jpg'
description: Practical answers to common questions about the destinations and trips I write about.
# DRAFT — published:false keeps this out of the built site (no page, not in the
# sitemap) until you flip it to true. Answers below are starter stubs: edit them
# in your own voice, then set published: true to go live. Both the visible page
# and the FAQPage structured data render from the `faqs` list, so add/edit Q&A
# in one place.
faqs:
  - q: How many days do you need in Iceland?
    a: >-
      DRAFT ANSWER — replace with your take. A rough starting point: 5–7 days to
      pair Reykjavík and the Golden Circle with the south coast; 8–10+ if you want
      the west (Snæfellsnes, Borgarfjörður) or a fuller Ring Road loop.
  - q: Is the Swiss Alps region worth it by train, or do you need a car?
    a: >-
      DRAFT ANSWER — replace with your take. Switzerland's rail and mountain-railway
      network reaches most alpine villages (Wengen, Zermatt, Mürren are car-free),
      so a car is rarely needed; a rail pass usually beats driving here.
  - q: What is a repositioning cruise, and why take one?
    a: >-
      DRAFT ANSWER — replace with your take. A repositioning cruise moves a ship
      between seasonal regions (e.g., a transatlantic crossing), often with more
      sea days and lower fares than a standard round-trip itinerary.
  - q: How do you handle cell data and connectivity on a cruise?
    a: >-
      DRAFT ANSWER — replace with your take. Summarize your approach to ship Wi‑Fi
      packages vs. port SIMs/eSIMs and airplane mode. (See your Celebrity cruise
      connectivity post for the detailed version.)
---

Practical answers to questions I get about the places I travel. These build on the
firsthand trip journals collected under [Destinations]({{ '/destinations/' | relative_url }}).

{% for item in page.faqs %}
### {{ item.q }}

{{ item.a }}
{% endfor %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "url": "{{ page.url | absolute_url }}",
  "author": { "@type": "Person", "@id": "{{ site.url }}{{ site.baseurl }}/#person" },
  "mainEntity": [
    {% for item in page.faqs %}
    {
      "@type": "Question",
      "name": {{ item.q | jsonify }},
      "acceptedAnswer": { "@type": "Answer", "text": {{ item.a | strip_newlines | jsonify }} }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

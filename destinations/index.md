---
layout: page
title: Destinations
permalink: /destinations/
background: '/assets/20230611-vista-bg.jpg'
description: Firsthand travel journals grouped by destination.
---

Browse my travel writing by destination. Each hub collects every post and trip
recap for that place — day-by-day journals, practical notes, and photography from
trips I've actually taken.

{% assign hubs = site.pages | where: "hub", true | sort: "dest_name" %}
<ul>
{% for hub in hubs %}
  <li><strong><a href="{{ hub.url }}">{{ hub.dest_name }}</a></strong>{% if hub.description %} — {{ hub.description }}{% endif %}</li>
{% endfor %}
</ul>

<p>Looking for the complete trip journals instead? See <a href="{{ '/recaps/' | relative_url }}">Trip Recaps</a>,
or the <a href="{{ '/countries/' | relative_url }}">Countries</a> I've slept in.</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Destinations",
  "url": "{{ page.url | absolute_url }}",
  "description": {{ page.description | jsonify }},
  "author": { "@type": "Person", "@id": "{{ site.url }}{{ site.baseurl }}/#person" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {% assign hubs2 = site.pages | where: "hub", true | sort: "dest_name" %}
      {% for hub in hubs2 %}
      {
        "@type": "ListItem",
        "position": {{ forloop.index }},
        "url": "{{ hub.url | absolute_url }}",
        "name": {{ hub.dest_name | jsonify }}
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  }
}
</script>

---
layout: post
title: Iceland post-cruise visit 2024
subtitle: Our four days on land in Iceland after disembarking our cruise in Reykjavik
date:  2024-09-23
categories: travel rollup
destination: iceland
background: '/assets/20240816-vik-black-sand-beach-bg.jpg'
trip_type: rollup
trip_duration: August 16-19, 2024
trip_duration_days: 4
countries_visited:
  - Iceland
locations_visited:
  - Reykjavik, Iceland
  - Selfoss, Iceland
  - Steinar, South Iceland
  - Vík, Iceland
transport:
  - Tesla Model Y rental car
  - flight home (Iceland to Raleigh-Durham)
---

After our cruise from New York ended in Reykjavik, we picked up a rental car and spent four days on land: two nights at an Airbnb on the south coast between Seljalandsfoss and Vík, then a final night in Reykjavik before flying home. COVID worked its way through the family along the way, so the pace was slower than planned.

{% assign sorted_posts = site.posts | where: "rollup_key", "2024icelandonland" | sort: 'date' %}

<h2>Contents</h2>
<ul>
{% for post in sorted_posts %}
<li><strong><a href="{{ post.url }}">{{ post.title }}</a></strong> ({{ post.date | date: "%D" }}): {{ post.subtitle }}</li>
{% endfor %}
</ul>

<p></p>

{% for post in sorted_posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <strong>{{ post.subtitle }}</strong>
  {{ post.content }}
{% endfor %}

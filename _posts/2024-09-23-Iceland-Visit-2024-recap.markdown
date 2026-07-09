---
layout: post
title: Iceland post-cruise visit 2024
subtitle: Our four days on land in Iceland after disembarking our cruise in Reykjavik
date:  2024-09-23
categories: travel rollup
background:
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

{% assign sorted_posts = site.posts | where: "rollup_key", "2024icelandonland" | sort: 'date' %}

<h2>Contents</h2>
<ul>
{% for post in sorted_posts %}
<li/><strong><a href="{{ post.url }}">{{ post.title }}</a></strong> ({{ post.date | date: "%D" }}): {{ post.subtitle }}
{% endfor %}
</ul>

<p/>

{% for post in sorted_posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <strong>{{ post.subtitle }}</strong>
  {{ post.content }}
{% endfor %}

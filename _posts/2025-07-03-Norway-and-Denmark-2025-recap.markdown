---
layout: post
title: Norway and Denmark in 2025
subtitle: Exploring Bergen, Balestrand, Voss, Oslo, and Copenhagen
date:  2025-07-03
categories: travel rollup
background: '/assets/20250512-hike7-bg.jpeg'
trip_type: rollup
trip_duration: May 8-19, 2025
trip_duration_days: 12
countries_visited:
  - Norway
  - Denmark
locations_visited:
  - Bergen, Norway
  - Balestrand, Norway
  - Voss, Norway
  - Oslo, Norway
  - Copenhagen, Denmark
transport:
  - transatlantic flights
  - DFDS Nordic Crown ferry (Oslo to Copenhagen)
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2025norway" | sort: 'date' %}

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

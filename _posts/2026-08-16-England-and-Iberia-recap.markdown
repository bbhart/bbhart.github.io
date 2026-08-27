---
layout: post
title: England and Iberia in 2026
subtitle: Three days in London, then a 14-night round-trip cruise from Southampton through Portugal and Spain
date:  2026-08-16
published: true
categories: travel rollup
destination: england
background: '/assets/20260731-st-pauls-cathedral-dome-bg.jpg'
trip_type: rollup
trip_duration: July 29 - August 15, 2026
trip_duration_days: 18
countries_visited:
  - England
  - Portugal
  - Spain
locations_visited:
  - London, England
  - Southampton, England
  - Porto (Leixões), Portugal
  - Matosinhos, Portugal
  - Lisbon, Portugal
  - Palma de Mallorca, Spain
  - Barcelona, Spain
  - Ibiza, Spain
  - Málaga, Spain
  - La Coruña, Spain
  - Bilbao, Spain
travel_companions:
  - Sherri
  - Siena
  - Rowan
transport:
  - transatlantic flights (Delta)
  - Celebrity Apex cruise
  - Elizabeth line, Thameslink, and London Underground
  - South Western Railway
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2026iberia" | sort: 'date' %}

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

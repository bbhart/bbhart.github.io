---
layout: post
title: Our cruise voyage from New York to Iceland in 2024
subtitle: A rugged, chilly vacation sailing from New York to Iceland via Canada and Greenland
date:  2024-08-31
categories: travel rollup
background: '/assets/20240831-stjohns-coast.jpg'
redirect_from:
- /travel/batchpost/2024/08/31/Iceland-Cruise-2024-recap.html
trip_type: rollup
trip_duration: August 4-16, 2024
trip_duration_days: 12
countries_visited:
  - USA
  - Canada
  - Greenland
  - Iceland
locations_visited:
  - Bayonne, New Jersey, USA
  - Halifax, Nova Scotia, Canada
  - St. John's, Newfoundland, Canada
  - Qaqortoq, Greenland
  - Akureyri, Iceland
  - Ísafjörður, Iceland
  - Reykjavik, Iceland
transport:
  - Celebrity Eclipse cruise ship (Bayonne, NJ to Reykjavik, Iceland)
  - flights (Raleigh-Durham to the New York area)
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2024icelandcruise" | sort: 'date' %}

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

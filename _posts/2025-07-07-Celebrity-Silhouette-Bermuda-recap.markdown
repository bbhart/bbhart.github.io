---
layout: post
title: Celebrity Silhouette Bermuda in 2025
subtitle: Two nights docked at Bermuda's Royal Naval Dockyard aboard the Celebrity Silhouette, with my parents along
date:  2025-07-07
categories: travel rollup
background: '/assets/20250703-dockyard-ferry-terminal-bg.jpg'
destination: bermuda
trip_type: cruise
trip_duration: June 28 - July 6, 2025
trip_duration_days: 9
companions:
  - wife
  - son
  - daughter
  - parents
countries_visited:
  - United States
  - Bermuda
locations_visited:
  - Elizabeth, New Jersey, USA
  - Bayonne, New Jersey, USA
  - Royal Naval Dockyard, Bermuda
  - Hamilton, Bermuda
transport:
  - United flights
  - Celebrity Silhouette cruise
---

We took three generations of Harts on a seven-night Bermuda cruise aboard the Celebrity Silhouette, sailing round-trip from Cape Liberty in Bayonne, New Jersey, after a very delayed United flight up to Newark. We spent two nights docked at the Royal Naval Dockyard, took the ferry over to Hamilton to see Sherri's uncle Bobby, toured the National Museum of Bermuda, and sailed home on the Fourth of July.

{% assign sorted_posts = site.posts | where: "rollup_key", "2025silhouettebermuda" | sort: 'date' %}

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

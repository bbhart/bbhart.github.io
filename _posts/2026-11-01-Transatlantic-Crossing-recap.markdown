---
layout: post
title: Transatlantic Crossing in 2026
subtitle: England, Spain, Portugal and Bermuda, and an Atlantic crossing
date:  2026-11-01
published: true
categories: travel rollup
background: '/assets/20261030-at-sea-sunset-ocean-rail-bg.jpg'
destination: england
trip_type: rollup
trip_duration: October 15 - October 31, 2026
trip_duration_days: 17
countries_visited:
  - England
  - Spain
  - Portugal
  - Bermuda
locations_visited:
  - Southampton, England
  - Vigo, Spain
  - Lisbon, Portugal
  - Ponta Delgada, Azores, Portugal
  - Royal Naval Dockyard, Bermuda
  - Port Canaveral, Florida
travel_companions:
  - solo
transport:
  - Delta flights
  - National Express coach
  - Celebrity Apex cruise
---

A last-minute cruise booking that had me exploring Southampton, England, for two nights, before boarding the Celebrity Apex for a transatlantic trip with stops in Vigo (Spain), Lisbon, the Azores, and Bermuda. 

{% assign sorted_posts = site.posts | where: "rollup_key", "2026transatlantic" | sort: 'date' %}

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

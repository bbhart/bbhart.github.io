---
layout: post
title: Celebrity Apex Caribbean in 2026
subtitle: Puerto Plata, San Juan and St. Kitts aboard the Celebrity Apex, with a few extra days in Tampa
date:  2026-01-27
published: false
categories: travel rollup
destination: caribbean
trip_type: cruise
trip_duration: January 16 - January 26, 2026
trip_duration_days: 11
companions:
  - wife
  - son
  - daughter
countries_visited:
  - United States
  - Dominican Republic
  - Puerto Rico
  - Saint Kitts and Nevis
locations_visited:
  - Yulee, Florida
  - Port Canaveral, Florida
  - Puerto Plata, Dominican Republic
  - San Juan, Puerto Rico
  - Basseterre, Saint Kitts and Nevis
  - Celebration, Florida
  - Tampa, Florida
transport:
  - Car
  - Celebrity Apex cruise
---

A family drive down to Port Canaveral for a seven-night Eastern Caribbean cruise on the Celebrity Apex, with stops in Puerto Plata, San Juan and St. Kitts. Winter weather back home kept us in Florida for two more nights in Tampa before the drive north.

{% assign sorted_posts = site.posts | where: "rollup_key", "2026apexcaribbean" | sort: 'date' %}

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

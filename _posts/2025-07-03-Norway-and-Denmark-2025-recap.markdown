---
layout: post
title: Norway and Denmark 2025
subtitle: Rollup of Bergen, Balestrand, Voss, Oslo, and Copenhagen 2025
date:  2025-07-03
categories: travel rollup
background: '/assets/20250512-hike7-bg.jpeg'
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

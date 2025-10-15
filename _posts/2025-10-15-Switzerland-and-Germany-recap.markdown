---
layout: post
title: Switzerland and Germany 2025
subtitle: A summer 2025 trip to Switzerland and Germany with my 16 year old son
date:  2025-10-15
categories: travel rollup
background: /assets/20250804-appenzell-bg.jpg
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2025chde" | sort: 'date' %}

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

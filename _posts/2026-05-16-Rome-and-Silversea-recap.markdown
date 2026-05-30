---
layout: post
title: Rome and Silversea in 2026
subtitle: Exploring Rome, Livorno, València, Cartagena, Portimão, and Lisbon
date:  2026-05-16
categories: travel rollup
background: '/assets/bg-silversea-riviera-sunset.jpg'
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2026romesilversea" | sort: 'date' %}

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

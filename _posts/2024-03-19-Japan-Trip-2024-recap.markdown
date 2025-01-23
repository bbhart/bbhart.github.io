---
layout: post
title: Brian's first trip to Japan
subtitle: Rollup of Tokyo, Kamakura, and Kyoto
date:  2024-03-19
categories: travel rollup
background: '/assets/20240206-kamakura-sugimoto.jpg'
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2024japan" | sort: 'date' %}

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

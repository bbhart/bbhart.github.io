---
layout: post
title: Our cruise voyage from New York to Iceland in 2024
subtitle: A rugged, chilly vacation sailing from New York to Iceland via Canada and Greenland
date:  2024-08-31
categories: travel rollup
background: '/assets/20240831-stjohns-coast.jpg'
redirect_from:
- /travel/batchpost/2024/08/31/Iceland-Cruise-2024-recap.html
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

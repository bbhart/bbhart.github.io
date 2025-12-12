---
layout: post
title: Iceland post-cruise visit 2024
subtitle: Our four days on land in Iceland after disembarking our cruise in Reykjavik
date:  2024-09-23
categories: travel rollup
background: 
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2024icelandonland" | sort: 'date' %}

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

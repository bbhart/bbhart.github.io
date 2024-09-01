---
layout: post
title: Our cruise voyage from New York to Iceland
subtitle: A rugged, chilly vacation
date:  2024-08-31
categories: travel batchpost
background: '/assets/20240831-stjohns-coast.jpg'
---

{% assign sorted_posts = site.categories.2024icelandcruise | sort: 'date' %}

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

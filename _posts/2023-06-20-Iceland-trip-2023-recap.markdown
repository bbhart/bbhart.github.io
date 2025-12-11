---
layout: post
title: Iceland 2023 - our first family trip to Iceland
subtitle: Our first trip to Iceland and the kids' first real trip to Europe
date:  2023-06-30
categories: travel rollup
background: /assets/20230620-iceland-recap-banner.jpg

---

This post recaps our first family trip to Iceland in 2023. During this visit we stayed in Reykholt (the one near Gullfoss and Geysir), Húsafell, and Reykjavik. 

Here we go!

{% assign sorted_posts = site.posts | where: "rollup_key", "2023iceland" | sort: 'date' %}

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

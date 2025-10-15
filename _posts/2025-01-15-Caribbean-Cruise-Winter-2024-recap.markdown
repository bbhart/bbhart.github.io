---
layout: post
title: Celebrity Eclipse Southern Caribbean in Winter 2024
subtitle: A family trip to the Cayman Islands, Aruba, Curaçoa, Bonaire, Puerto Rico, and the DR aboard the Celebrity Eclipse
date:  2025-01-15
categories: travel rollup
background: '/assets/20241231-lazyriver.jpg'
---

{% assign sorted_posts = site.posts | where: "rollup_key", "2024wintercaribbean" | sort: 'date' %}

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

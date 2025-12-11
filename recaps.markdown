---
layout: page
title: Trip Recaps
permalink: /recaps/
background: '/assets/20250804-appenzell-bg.jpg'
---

Here are the complete journals for my trips, all in one place. 

{% assign recap_posts = site.posts | where_exp: "post", "post.categories contains 'rollup'" | sort: 'date' | reverse %}

{% for post in recap_posts %}
* **[{{ post.title }}]({{ post.url }})**: {{ post.subtitle }}


{% endfor %}


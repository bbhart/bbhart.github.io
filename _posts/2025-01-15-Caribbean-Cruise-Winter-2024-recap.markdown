---
layout: post
title: Celebrity Eclipse Southern Caribbean in Winter 2024
subtitle: A family trip to the Cayman Islands, Aruba, Curaçoa, Bonaire, Puerto Rico, and the DR aboard the Celebrity Eclipse
date:  2025-01-15
categories: travel rollup
background: '/assets/20241231-lazyriver.jpg'
trip_type: cruise
companions:
  - wife
  - son
  - daughter
countries_visited:
  - United States
  - Cayman Islands
  - Aruba
  - Curaçao
  - Bonaire
  - Dominican Republic
locations_visited:
  - name: Fort Lauderdale
    type: city
    country: United States
    notes: Embarkation port for the Celebrity Eclipse
  - name: George Town
    type: city
    country: Cayman Islands
    notes: Tendered port stop on Grand Cayman
  - name: Oranjestad
    type: city
    country: Aruba
    notes: First of the ABC Islands
  - name: Willemstad
    type: city
    country: Curaçao
    notes: Capital city, second of the ABC Islands
  - name: Kralendijk
    type: town
    country: Bonaire
    notes: Last of the ABC Islands
  - name: San Juan
    type: city
    country: Puerto Rico (United States)
    notes: Port stop in Puerto Rico
  - name: Puerto Plata
    type: city
    country: Dominican Republic
    notes: Last port stop of the cruise
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

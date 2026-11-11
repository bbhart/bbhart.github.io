---
layout: page
title: Places
permalink: /places/
redirect_from:
  - /destinations/
background: '/assets/20230611-vista-bg.jpg'
description: Every town I've visited and written about, by country, with a link to each trip's journal
---

{%- comment -%}
  Built from _data/cities.yml (country, stays, day_trips, excursion) and the
  shared visit selection in _includes/city_visits.html. One row per place:
  "<sort key>|~|<country>|~|<name>|~|<visits html>", sorted by country then
  name, accents folded so Ísafjörður sorts under I. An entry with no country
  goes under Other, last.
{%- endcomment -%}
{%- assign nothing = "" | split: "" -%}
{%- assign place_rows = nothing -%}
{%- for entry in site.data.cities -%}
  {%- include city_visits.html entry=entry kinds="stays,day_trips" -%}
  {%- if visit_count == 0 -%}{%- continue -%}{%- endif -%}
  {%- assign country = entry[1].country | default: "Other" -%}
  {%- if country == "Other" -%}
    {%- assign country_key = "~" -%}
  {%- else -%}
    {%- assign country_key = country | slugify: "latin" -%}
  {%- endif -%}
  {%- capture visits_html -%}
    {%- for post in visit_posts -%}
      {%- assign i = forloop.index0 -%}
      {%- assign nights = visit_nights[i] -%}
      {%- if visit_kinds[i] == "day_trips" -%}
        {%- assign visit_label = "day trip" -%}
      {%- elsif nights == 0 -%}
        {%- if entry[1].excursion -%}{%- assign visit_label = "shore excursion" -%}{%- else -%}{%- assign visit_label = "port" -%}{%- endif -%}
      {%- elsif nights == 1 -%}
        {%- assign visit_label = "1 night" -%}
      {%- else -%}
        {%- capture visit_label -%}{{ nights }} nights{%- endcapture -%}
      {%- endif -%}
      {%- unless forloop.first %} · {% endunless -%}
      <a href="{{ post.url | relative_url }}">{{ visit_trips[i] | escape }} ({{ visit_label }})</a>
    {%- endfor -%}
  {%- endcapture -%}
  {%- capture row -%}{{ country_key }} {{ entry[0] | slugify: "latin" }}|~|{{ country }}|~|{{ entry[0] }}|~|{{ visits_html }}{%- endcapture -%}
  {%- assign place_rows = place_rows | push: row -%}
{%- endfor -%}
{%- assign place_rows = place_rows | sort -%}

{%- assign countries = nothing -%}
{%- for row in place_rows -%}
  {%- assign parts = row | split: "|~|" -%}
  {%- unless countries contains parts[1] -%}{%- assign countries = countries | push: parts[1] -%}{%- endunless -%}
{%- endfor -%}
{%- assign hubs = site.pages | where: "hub", true -%}
{%- assign country_count = countries.size -%}
{%- if countries contains "Other" -%}{%- assign country_count = country_count | minus: 1 -%}{%- endif %}

Every town I've visited and written about, grouped by country: overnight stays,
cruise ports, shore excursions and day trips, each linked to that trip's
journal. For just the places outside the US where I've slept at least one
night, see [Countries]({{ '/countries/' | relative_url }}).

**{{ country_count }} countries · {{ place_rows.size }} places** and counting.

---

<div class="places">
{%- assign current = "" -%}
{%- for row in place_rows -%}
  {%- assign parts = row | split: "|~|" -%}
  {%- if parts[1] != current -%}
    {%- unless current == "" %}
</ul>
{%- endunless -%}
    {%- assign current = parts[1] -%}
    {%- assign hub = hubs | where: "dest_name", current | first %}
<h2 id="{{ current | slugify: 'latin' }}">{% if hub %}<a href="{{ hub.url | relative_url }}">{{ current | escape }}</a>{% else %}{{ current | escape }}{% endif %}</h2>
<ul>
  {%- endif %}
  <li><strong>{{ parts[2] | escape }}</strong> — {{ parts[3] }}</li>
{%- endfor -%}
{%- unless current == "" %}
</ul>
{%- endunless %}
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": {{ page.title | jsonify }},
  "url": "{{ page.url | absolute_url }}",
  "description": {{ page.description | jsonify }},
  "author": { "@type": "Person", "@id": "{{ site.url }}{{ site.baseurl }}/#person" },
  "about": {
    "@type": "ItemList",
    "name": "Countries I have visited and written about",
    "itemListElement": [
      {%- assign position = 0 -%}
      {%- for country in countries -%}
      {%- if country == "Other" -%}{%- continue -%}{%- endif -%}
      {%- assign position = position | plus: 1 -%}
      {%- unless position == 1 -%},{%- endunless %}
      { "@type": "ListItem", "position": {{ position }}, "item": { "@type": "Country", "name": {{ country | jsonify }} } }
      {%- endfor %}
    ]
  }
}
</script>

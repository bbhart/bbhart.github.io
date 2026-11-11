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
  "<sort key>|~|<country>|~|<name>|~|<list item html>", sorted by country then
  name, accents folded so Ísafjörður sorts under I. An entry with no country
  goes under Other, last.

  A place where some trip has two or more day posts also gets a toggle button
  and a list of every trip's day posts (ul.place-days). The list is in the
  HTML so it shows without JavaScript; the script at the bottom hides it,
  shows the button, and wires the button up.
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
  {%- assign has_days = false -%}
  {%- for n in visit_day_counts -%}{%- if n >= 2 -%}{%- assign has_days = true -%}{%- endif -%}{%- endfor -%}
  {%- assign place_slug = entry[0] | slugify: "latin" -%}
  {%- capture item_html -%}
    {%- if has_days -%}
      <button type="button" class="place-toggle" aria-expanded="false" aria-controls="days-{{ place_slug }}" hidden><span class="place-toggle-icon" aria-hidden="true">▸</span><span class="visually-hidden">Show days in {{ entry[0] | escape }}</span></button>
    {%- endif -%}
    <strong>{{ entry[0] | escape }}</strong> — <span class="place-visits">{{ visits_html }}</span>
    {%- if has_days -%}
      <ul class="place-days" id="days-{{ place_slug }}">
      {%- for post in visit_posts -%}
        {%- assign i = forloop.index0 -%}
        {%- if visit_day_counts[i] == 0 -%}
          <li><a class="place-days-trip" href="{{ post.url | relative_url }}">{{ visit_trips[i] | escape }}</a></li>
          {%- continue -%}
        {%- endif -%}
        <li><span class="place-days-trip">{{ visit_trips[i] | escape }}</span><ul>
        {%- for day in day_posts -%}
          {%- if day_visits[forloop.index0] == i -%}
            <li><a href="{{ day.url | relative_url }}">{{ day.title | escape }}</a> <span class="place-days-date">· {{ day.date | date: "%b %-d, %Y" }}</span></li>
          {%- endif -%}
        {%- endfor -%}
        </ul></li>
      {%- endfor -%}
      </ul>
    {%- endif -%}
  {%- endcapture -%}
  {%- capture row -%}{{ country_key }} {{ place_slug }}|~|{{ country }}|~|{{ entry[0] }}|~|{{ item_html }}{%- endcapture -%}
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
  <li class="place">{{ parts[3] }}</li>
{%- endfor -%}
{%- unless current == "" %}
</ul>
{%- endunless %}
</div>

<script>
// Collapse each place's day list and show its toggle (both start in the open
// state so the lists read without JavaScript).
document.querySelectorAll(".place-toggle").forEach(function (button) {
  var list = document.getElementById(button.getAttribute("aria-controls"));
  if (!list) return;
  var icon = button.querySelector(".place-toggle-icon");
  list.hidden = true;
  button.hidden = false;
  button.addEventListener("click", function () {
    var open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", open ? "true" : "false");
    list.hidden = !open;
    icon.textContent = open ? "▾" : "▸";
  });
});
</script>

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

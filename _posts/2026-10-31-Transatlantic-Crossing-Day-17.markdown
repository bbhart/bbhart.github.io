---
layout: post
title: Transatlantic Crossing Day 17
subtitle: TODO
date:  2026-10-31
published: false
categories: travel england spain portugal bermuda
rollup_key: 2026transatlantic
tags: [october2026]
locations:
  - name: Port Canaveral
    type: port
    country: United States
  - name: Orlando International Airport
    type: airport
    country: United States
transport:
  - type: shuttle
    provider: GoPort
    route: Port Canaveral → MCO
  - type: flight
    carrier: Delta
    route: MCO → ATL
    departure_time: 1:05pm
  - type: flight
    carrier: Delta
    route: ATL → RDU
    departure_time: 3:37pm
trip_stage: disembarkation
companions:
  - solo
---

- **Start of day:** Port Canaveral, Florida
- **End of day:** Home in North Carolina

{% assign ta_recap = site.posts | where_exp: "p", "p.path contains 'Transatlantic-Crossing-recap'" | first %}{% if ta_recap %}*Part of the [Transatlantic Crossing 2026 trip]({{ ta_recap.url }}).*{% endif %}

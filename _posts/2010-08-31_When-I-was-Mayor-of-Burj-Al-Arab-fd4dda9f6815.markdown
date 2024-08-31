---
layout: post
title: When I was Mayor of Burj Al Arab
description: >-
  This is the Burj Al Arab hotel, arguably one of the finest in the world.
  Located in Dubai, United Arab Emirates, the Burj is notable for…
date: '2010-08-31T14:44:18.000Z'
categories: []
keywords: []
slug: /@bbhart_ca/when-i-was-mayor-of-burj-al-arab-fd4dda9f6815
---

![](/assets/0__VLImEXD0GFdypCbj.jpg)

This is the [Burj Al Arab](http://en.wikipedia.org/wiki/Burj_Al_Arab) hotel, arguably one of the finest in the world. Located in Dubai, United Arab Emirates, the Burj is notable for its height, opulence, and architecture. Oh, and its mayor on [Foursquare](http://www.foursquare.com/): [me](http://foursquare.com/venue/409315).

![](/assets/0__xaICOHR9trsZ5pHX.png)

The issue is, I’ve never been to the Burj Al Arab. The closest I’ve ever been is probably Venice, Italy, which is still a ways off. So how is this possible?

The Foursquare API doesn’t do any validation of check-ins. If you pass along a venue code (409315), approximate latitude and longitude (25.14134,55.18546), your user ID and password, and pretend you’re doing it from an iPhone, Foursquare will check you in there. It’s not hard to do… it just takes a few lines of scripting. This isn’t a new issue ([see here, for example](http://techcrunch.com/2010/02/16/foursquare-cheating/)), but what’s not clear is what’s being done about it. Since Foursquare and their partners provide certain perks to venue mayors, the potential for mischief is obvious. Dollar beers for the mayor of Moe’s? Give me the venue details, a cron job, and a few days or weeks, and unless someone else is also subverting the system, I will be mayor.

What’s the fix? Not sure, honestly. The API could require the lat & long are validated as true somehow, perhaps using some sort of digital signature, but that opens up a host of other problems when you’re dealing with devices from different vendors. Since location validation wasn’t designed in from the beginning, either, it means there’d be a period of time where you’d need to accept signed and unsigned updates until everyone updates their client. A big job, to be sure.

For now, I won’t be checking into the Burj Al Arab anymore… we’ll let nature take its course again. I wonder what Easter Island is like this time of year. Hmmm…

_Originally published at_ [_bbhart.com_](https://bbhart.com/burj-al-arab-f7cdbdb465be) _on August 31, 2010._

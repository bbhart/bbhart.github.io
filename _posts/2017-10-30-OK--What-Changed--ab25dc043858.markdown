---
layout: post
title: 'OK, What Changed?'
description: Or how diligent Change Management keeps LinkedIn up.
date: '2017-10-30T16:23:10.448Z'
categories: []
keywords: []
slug: /@bbhart_ca/ok-what-changed-ab25dc043858
---

_Or how diligent Change Management keeps LinkedIn up._

The group I manage at LinkedIn is responsible for making a lot of changes. On the Systems side of things, we roll out new software packages and server configuration changes many times a day. In Mail Operations, we frequently modify rules for how mail is handled. For Storage, we’re in a constant state of flux, uplifting hardware, patching operating systems, and adding capacity for our customers.

_Almost all_ of these changes work flawlessly. When a change does go wrong, however, the impact can be very wide. With the amount of infrastructure needed to support 500 million members, we rely heavily on automation. This automation gives us the leverage to roll good (or bad!) changes to our entire fleet of servers within minutes. _“With great power…”_ and all that.

As mentioned, the vast majority of these changes are made without a hitch. If that _wasn’t_ the case, I don’t expect we’d have jobs for long. But humans being humans, sometimes a change is pushed out with unforeseen or unintended consequences, and the impact may not be readily apparent to the person making the change. At that moment, when you’re not sure _why_ something is broken, being able to quickly answer that key question “**OK, what changed?**” can significantly cut down on the time to resolve. And the best way to quickly answer that question is to have a robust change management process in place _before_ the sky is on fire.

At LinkedIn, we have a Change Management project in JIRA (our ticket tracking system) that is accessible by all of Engineering. For planned changes, the entire org is expected to treat this as the canonical repository of information about changes that may impact production. A well-formed CM request will include:

*   High-level summary of the proposed change
*   Estimated and actual start and end times for the change
*   Step-by-step instructions for rolling a change forward
*   Step-by-step instructions for rolling a change back
*   Evidence the change has been peer-reviewed
*   List of services that may be impacted

There are a few other fields, and I’ve simplified away some details like how we differentiate between minor and major changes, but these are the essential fields for efficiently highlighting what changed and what may have been impacted.

_Prior to a change_, a CM is evidence we’ve done our due diligence in ensuring a successful change, and that possible impact to other teams has been considered and mitigated. A CM gives those teams who may be affected a chance to understand what is proposed, and either offer feedback or give their assent.

_After a change_, when a service starts to show problems, having CM information readily available to SiteOps engineers cuts down the time needed to get the right people engaged to fix the problem. Flipped around: **not** having this information means SiteOps may need to engage oncall engineers from several groups (who may be sleeping or working on another issue) before they find the responsible team.

Remember when I said most of our changes go as planned and don’t cause issues? That’s great, but it can make engineers resistant to the perceived overhead of change management. It can feel like wasted time, or managers exercising [CYA](https://en.wikipedia.org/wiki/Cover_your_ass). The truth is, all the extra work easily pays for itself if we can bring a vital service back online sooner; at this scale, minutes definitely matter. But change management needs to be ingrained in the culture, and engineers need to see it practiced and enforced up and down the org chart.

There are many different ways to practice change management, so what works for us might not work for you. [The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business-ebook/dp/B00AZRBLHO) book does a good job of “novelizing” the case for change management (while also being entertaining). CM can be as simple as Post-Its to as complex as a dedicated enterprise-grade software product. You’ll need to find the balance between fast and safe that makes sense for your organization when making changes.

_Originally published at_ [_medium.com_](https://medium.com/@bbhart/ok-what-changed-815bdc2a0b9f) _on October 30, 2017._

---
title: "Context-Relevant Term Search :mag_right:"
layout: post
date: 2017-12-05 00:00
tag: 
- research
- Information Retrieval
- NPL
image: /assets/images/projects/context_search/thumbnail.png
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Research done for Information Retrieval Course."
category: project
author: danielchoi
externalLink: false
---

## Summary

This was a research project done during the course of CS4501, Information Retrieval in Fall of 2017 with Eric McCord Snook. The purpose of this research was to develop a system for retrieving context-relavant definitions of a term given the context. 

![Markdown Image][1]
<figcaption class="caption">Example use case of the context-relevant term search</figcaption>

---

## Research

The developed system was able to perform significnatly, in that the proper definition was listed within the first two in average. The Jelinek-Mercer smoothed language model was used as the main system, and others like Apache OpenNPL library's Part of Speech tagging to increase the accuracy of the system. The detailed research paper can be found on the bottom of the page.

![Markdown Image][2]
<figcaption class="caption">Graph showing performance of the system</figcaption>

![Markdown Image][3]
<figcaption class="caption">Table showing performance of the system</figcaption>

## [Research Paper](/assets/docs/Context-Relevant Term Search.pdf)
The Downloadable pdf contains more detail on the research

[1]:/assets/images/projects/context_search/1.png
[2]:/assets/images/projects/context_search/2.png
[3]:/assets/images/projects/context_search/3.png
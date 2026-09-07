---
title: "SSLSniff"
date: 2017-08-30
description: "Short research conducted on SSLSniff, a tool that breaks SSL Connection"
tags:
  - "research"
---

## Summary

Worked on a short research with SSL Sniff, a tool that exploits SSL, to see if it is still usable and whether if it could be used in a Network Security Class to provide better understanding of how vulnerable SSL could be and demonstrate Man-in-the-Middle Attack.

![Markdown Image][1]
<figcaption class="caption">Diagram showing how SSL Sniff Works</figcaption>

---

## SSL Sniff

[SSL Sniff](https://moxie.org/software/sslsniff/) is a tool developed by Moxie Marlinspike to demonstrate how vulnerable SSL System was around 10 years ago. It shows a great example of how a seemingly through security could be easily broken, mainly through unexpected components of the system. The video below is a great presentation given by Moxie Marlinespike on how it all works.

<iframe width="560" height="310" src="https://www.youtube.com/embed/5dhSN9aEljg" frameborder="0" allowfullscreen></iframe>

## Research

Using the tool provided, we were able to demonstrate part of the process, successfully retrieving the username and the password of a user that was connected to the same network (This was on a private network)

![Markdown Image][3]
<figcaption class="caption">The tool running to get the Username and Password</figcaption>

This also worked as we were able to generate a certificate of the website the user was logging into on the fly, although as you can see, the "issued by" field is pretty obvious.

![Markdown Image][2]
<figcaption class="caption">Fake Certificate created for mobile.twitter.com</figcaption>

## [Documentation](/docs/SSLSniff_Documentation.pdf)
The Documentation shows the step by step process of what we were able to get running

[1]:/images/projects/sslsniff/1.png
[2]:/images/projects/sslsniff/2.png
[3]:/images/projects/sslsniff/3.png

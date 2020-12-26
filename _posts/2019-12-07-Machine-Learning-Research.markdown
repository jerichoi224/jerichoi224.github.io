---
title: "ML Research Reproduction :page_facing_up:"
layout: post
date: 2019-12-07 00:00
tag: 
- Machine Learning
- Research
- Tensorflow
image: 
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Reproduction of previous Machine Learning Research"
category: project
author: danielchoi
externalLink: false
---

## Summary

A reproduction of a cutting-edge machine learning paper was done through the Machine Learning Course during Fall of 2019. Our team worked on the reproduction of the research paper: [Escaping Saddles with Stochastic Gradients](http://proceedings.mlr.press/v80/daneshmand18a.html)

## Research

The research had the purpose of escaping a saddle point when training a machine learning model. There have been several methods of escaping a saddle point when training a model. Most previous methods, however, involve using some sort of noise when using gradient descent so the model doesn't get stuck in a local minimal point.

The authors of the paper attempted to solve the issue of escaping a saddle point using stochastic gradient descent. Instead of using a random noise value after every gradient descent to escape a saddle point, which may end up with a vector in a wronge direction, they added a stochastic gradient step in order to make sure the additional vector is pointing to a minimum direction for one of the data points. 

Below is a graph they have used to demonstrate the new algorithm. ISO-PGD is the algorithm where an isotropic noise is added after each gradient descent step, which is the general approach made by previous researches. CNC-PGD is the algorithm the authors proposed where they add a stochastic gradient descent step to each gradient descent step under the CNC (Correlated Negative Curvature) assumption.

![Markdown Image][1]
<figcaption class="caption">Graph provided in the research paper</figcaption>

---

## Reproduction

While the research paper covers much more details, proofs and lemmas, we focused on reproducing the performance comparison of the existing and newly proposed algorithms. While we didn't have much details for a exact reproduction, we followed the paper in using MNIST datasets, and modified tensorflow optimizers to match the description. While there are some variations for every runs, we found that in many cases it does indeed follow the result described in the paper. A reproduced graph is shown below.

![Markdown Image][2]
<figcaption class="caption">Graph reproduced</figcaption>


## Reproduction Code

You can view the source code for reproduction below

[Jupyter Notebook](https://drive.google.com/file/d/1mso5-k7VRLqeODa1-Uc3YzsKbHaKNqHF/view?usp=sharing)

[1]:/assets/images/projects/ml_research/1.png
[2]:/assets/images/projects/ml_research/2.png

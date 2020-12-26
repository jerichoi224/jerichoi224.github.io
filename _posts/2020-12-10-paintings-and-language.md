---
title: "Paintings and Language :art:"
layout: post
date: 2020-12-10 00:00
tag: 
- Machine Learning
- Research
- Deep Learning
- Pytorch
image: 
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Project in my Vision and Language Course."
category: project
author: danielchoi
externalLink: false
---
## Summary

This was a project done in my Vision and Language Course (CS6501) during Fall of 2020. with Austin Cheng and Ben Barret. The purpose of this project was to build multiple models for image-label pair generation and comparing them.

![Markdown Image][1]
<figcaption class="caption">Examples of image-label pair generation</figcaption>

---

## Research
While we attempted to have two different models, a sequential model containing a GAN paired with LSTM and a multimodal GAN that generates both the image and text simultaneously, the multimodal GAN did not perform sufficiently, likely due to the architecture. 

For the Data, we used a Kaggle Dataset from wikiart and the The Metropolitan Museum of Art(MET) dataset, and used the Fréchet inception distance (FID) score to measure the performance of GAN. A DCGAN was used.

![Markdown Image][2]
<figcaption class="caption">Images from the dataset</figcaption>

![Markdown Image][3]
<figcaption class="caption">Images generated using GAN</figcaption>

## Abstract

The generation of images using GANs or text using RNNs/transformers has seen significant progress in recent years, leading to the creation of photorealistic media popularly known as DeepFakes. While several methods for exclusively generating images or exclusively generating text have been published, there has been little research on generating image-text pairs, such as captioned photos. In this project, we explore two methods for generating new imagetext pairs of paintings and their titles using a publicly provided Kaggle paintings dataset (sourced from WikiArt) and a new MET Paintings dataset. Painting titles are more abstract and therefore less semantically grounded than captioned photos, and we believe that capturing this behavior in a generative model would be interesting. We attempt two methods in creating a synthetic painting along with an appropriate title: sequential and parallel. The sequential method is treated as an image generation task using a GAN directly followed by an image captioning task using an RNN, while the parallel method uses a multimodal GAN to generate both the image and text simultaneously. We find that the simpler sequential model generates some reasonable titled paintings.

## [Github Repository (Paper)](https://github.com/jerichoi224/Paintings-and-Language)
The repository contains the notebook files used in this project, as well as the research paper, along with the presentation video

[1]:/assets/images/projects/painting_language/1.png
[2]:/assets/images/projects/painting_language/2.png
[3]:/assets/images/projects/painting_language/3.png
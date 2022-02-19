---
title: 'Store of the Future'
description: "Several interactive applications for Unilever's Store of the Future their CiiC center"
date: 2014-02-02
template: page
slug: projects/unilever-store-of-the-future
cardImage: './unilever-store-of-the-future-card.jpg'
role: CTO, Nerdiacs
categories:
  - Projects
  - Nerdiacs
tags:
  - Unity3D
---

Worked closely with Barrows Global to realise Unilever's vision on store of the future for their customer innovation center. Created a suite of apps in Unity3D that worked on 60 inch touch screen TVs and interacted with Arduinos for an immersive visual experience.

To allow full artistic control over animations, an Adobe script was created to export animations from After Effects into Unity3D (similar to the [Lottie](http://airbnb.io/lottie/#/) which was developed later by Airbnb). Transformation and masking keys were exported in a format parsed and loaded by a Unity script.

This allowed very rapid iterations and gave full creative freedom to artists to create interactive animations. Animation sequences were created which were triggered/controlled by input from a touch screen or arduino.

## Interactive Table

An interactive guiding experience to the unilever exhibition space with interactive graphs showing realtime data of how many visitors had been in the exhibition space. 

Created a custom Adobe script to export map marker locations automatically from Adobe Photoshop to allow rapid changes to store layout even till the day of deploying the project.

import interactive_table_poster from "./interactive-table-poster.webp"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/d002a1c1-31d0-4a7d-89a2-f26fd12bc89b/play_720p.mp4" poster={interactive_table_poster} autoPlay={false} controls={true} preload="none"/>

## Street Window

Interactive shopping experience to allow customers to shop from a store window using a touch screen display and a click and collect system.

import street_window_poster from "./street-window-poster.webp"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/8180cb0b-543b-4e2e-99ef-4d065bf71ed0/play_720p.mp4" poster={street_window_poster} autoPlay={false} controls={true} preload="none"/>

## Aisle Leader

An interactive system to guide shoppers through different products in the store. Highly fluid animation connected to dynamic data source in the background to update items and promotions in realtime.

import aisle_leader_poster from "./aisle-leader-poster.webp"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/3b7d3706-afd3-49e1-a383-1b2a1c29696a/play_720p.mp4" poster={aisle_leader_poster} autoPlay={false} controls={true} preload="none"/>

## Transparent Fridge

Detected human presence using LDR and ultra sonic sensors connected to an arduino, which triggered a set of animations.

import transparent_fridge_poster from "./transparent-fridge-poster.webp"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/2671892d-ee82-4c4b-8176-26478f2f1774/play_720p.mp4" poster={transparent_fridge_poster} autoPlay={false} controls={true} preload="none"/>

## Summary

* Sole Programmer responsible for end to end development
* Created custom Adobe scripts to ensure highly fluid animations and rapid iterations
* Mostly custom made components (e.g Carousal, dynamic lists and tabs) to fulfil creative vision
* Custom library for reliable communication with Arduino's connected to the system
* 5 Unity3D programs, 1 Android application and supported development in several backend and embedded systems
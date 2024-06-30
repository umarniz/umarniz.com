---
title: 'SlashUX'
description: 'A prototype product for automatically creating mobile app layouts from Photoshop'
date: 2015-11-01
template: "page"
slug: projects/slashux
cardImage: './slashux-card.jpg' 
role: CTO, Nerdiacs
categories:
  - Projects
  - Nerdiacs
  - Products
tags:
  - Product
---

A product prototype that can automatically generate native mobile layouts directly from Photoshop. The idea of the product came from Ebad Ali an engineer at Nerdiacs. Me and Ebad developed the product which included a mobile app to see design changes in realtime, a QT desktop app to communicate in realtime with Photoshop and visualise the layouts and a Photoshop script to label individual components from inside Photoshop.

A prototype of the concept was developed and used when developing an app for a fixed mobile device. Relative layouts i.e layouts that resize automatically for different platforms was not finished before we stopped development on the product.

The product was selected for incubation in NestIO (Pakistan) and was also presented in Rockstart Answers (Netherlands). Development on the product was stopped before it was released for public use.

import slashux_demo_poster from "./slashux-demo-poster.jpg"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/eaefd0c3-7f27-4c9a-b3d6-ee95f6c0b655/play_720p.mp4" poster={slashux_demo_poster} autoPlay={false} controls={true} preload="none"/>

## Technical Details

A Photoshop generator script was made with a NodeJS server to emmit all actions performed in a Photoshop document to a QT desktop app. Another Photoshop script was built to show a UI in Photoshop that could be used to label individual layers or groups directly from within Photoshop. If a user marked a Photoshop layer to be a text label, this information was stored within the Photoshop document using metadata information in the PSD.

Once an element was labelled in Photsohop, the QT desktop app would gather all data on the element (including image data, opacity, masking) and generate a corresponding Android component for it. A standardised data object was then submitted in realtime to mobile apps running SlashUX client, which would show how the product would look on the mobile device in realtime.

The QT program would then pass this internal data model for the layout and relevant image and font data to a backend python service which would automatically resize all images to their appropriate assets and generate Android and iOS native projects.

SlashUX also kept a link between the android project and the Photoshop file to ensure that all changes done in the Photoshop file are automatically visible in the Android project if selected (i.e automatically generate new layout based on changes performed in Photoshop).

The program was significantly challenging due to the very different nature of how some components such as text are rendered in an image editing software and rendered on actual mobile phones. This included automatically copying and converting font files to send in realtime to the mobile clients and taking into consideration all the complexities of font rendering (e.g variable spacing, fixed width fonts, kerning, line height, alignment, etc) and ensuring these mapped correctly from Photoshop to the android project.

Flexible layout support was under development when the project was stopped which included a whole suite of new challenges.
## Summary

* Used Adobe Generator API + Node JS server to pull data and send on websockets.
* Panel for Photoshop made with Angular JS that would communicate with the core app made in QT C++
* Custom font/image rendering in QT for desktop emulation
* Web app using python that would create the android project + Image Magick to convert resources for multiple platforms
* Android app that would communicate to QT app via websockets to show the layout in real-time
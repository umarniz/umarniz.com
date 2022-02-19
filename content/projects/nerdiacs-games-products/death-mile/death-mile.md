---
title: 'Death Mile'
description: 'Mobile co-op multiplayer game where you blast your way through Mars'
date: 2013-08-19
template: page
slug: projects/death-mile
cardImage: './death-mile-card.jpg' 
role: CTO, Nerdiacs
categories:
  - Projects
  - Featured
  - Nerdiacs
  - Games
  - Products
tags:
  - Android
  - iOS
  - Game
---

A co-op racing and shooting game, released only for iOS.

I designed the game with the co-founder of Nerdiacs (Faizan Naqvi) and was responsible for all operations and lead the engineering of the game (including design, development, operations and marketing). Hired and led a team of 2 artists to help develop the game. Was the core programmer with additional support by another engineer on backend development and native plugins. Leading the company and the game, I also focussed heavily on marketing the game by creating promotional material, press releases and talking to reviewers.

The game was released on iOS only as a free to play game with in-app purchases. The game was #1 in Turkey on the iOS app store for the first 3 days of launch and received over 15.000 downloads in the first week of release. The game was reviewed by high profile reviewers but did received a very average rating. The game did not received subsequent traction and did not generate any significant revenue. 

import deathmile_gameplay_poster from "./death-mile-gameplay-poster.jpg"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/ba64d9ae-7b59-453a-bf71-e902dc0092ac/play_720p.mp4" poster={deathmile_gameplay_poster} autoPlay={false} controls={true} preload="none" caption="Video courtesy TouchGameplay on Youtube" />

### Technical Details

The game was initially built in C++ using the Marmalde engine with a custom procedural generation engine on top of the technology built for our first title [BLAZ3D](/projects/blaz3d/). The development in this line was later dropped as Unity3D had by this time become a significantly better alternative.

The game was built in Unity3D with a suite of custom editors and tools to allow the 3d artists full creative control and freedom while ensuring the performance impact of changes was visible to the artists. To ensure high quality assets, created a technical flow for the 3d artists that allowed exporting assets from Zbrush to Maya with mapping using XNormal. Automatic texture mapping and rigging tools were used to speedup the workflow.

Implemented cutting edge graphics techniques for high quality visuals such as creating a custom shader to store Ambient Occlusion and GI data inside vertex colors. Recreated the BRDF LUT technique developed by the best-in-class game of the time (ShadowGun ©). Custom fill-rate optimised imaging effects were created to render screen space fog with limited performance impact on iPhones and iPads.

A custom ray-traced car physics framework was built to create a natural driving feel.

Realtime multiplayer support was added using Unity Master Server with a custom implementation to allow match making with Facebook friends. This allowed sending invites to other Facebook users even if they didn't have the game to download and join matches. A suite of native plugins were created for integrating with Facebook, Flurry Analytics and Game Center. These components were made by Faizan Naqvi and I was in a helping role for these components.

## Summary 
* Lead and trained a team of 2 artists and the sole programmer for the entire game
* Created in Unity 3D with lots of custom editor tools for a custom artist workflow
* Acted as technical artist for the art team handling ZBrush to Maya model mapping using XNormal
* Integrated a BRDF LUT based on ShadowGun © 
* Created mobile shaders using vertex colors to store AO/GI (Radiosity baked into vertex colors)
* Custom fill-rate optimized image effects for screen space fog
* Realtime multiplayer using Unity Master Server (custom implementation to allow matchmaking with Facebook friends and send invite/push notifications using Facebook)
* Custom plugins for native integrations for Facebook, Flurry, Game Center.
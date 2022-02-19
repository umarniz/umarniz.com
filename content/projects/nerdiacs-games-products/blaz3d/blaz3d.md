---
title: 'BLAZ3D'
description: 'A mobile racing game for Symbian, Android and iOS'
date: 2011-12-20
template: page
slug: projects/blaz3d
cardImage: './blaz3d-card.jpg'
role: CTO, Nerdiacs
categories:
  - Projects
  - Nerdiacs
  - Games
  - Products
tags:
  - Android
  - iOS
  - Symbian
  - Game
---

A 3D racing game for mobile phones for Symbian, Android and iOS phones. 

I designed the game with the co-founder of Nerdiacs (Faizan Naqvi) and was responsible for all operations and engineering of the game (including design, development, operations and marketing). Hired and led artists to help develop the game, being the sole programmer developed the entire technical stack and helped market the game with marketing content and videos.

The game was released as a paid game on iOS and Android by ourselves and published on Symbian and Blackberry Tablet OS by Marmalade Studios. The game received generally positive reviews and was downloaded a significant times (specially the Symbian edition) but did not generate any significant revenues.

import blaz3d_trailer_poster from "./blaz3d-trailer-poster.jpg"

<VideoPlayer mp4="https://vz-33746591-537.b-cdn.net/92caca79-6e93-4b74-8233-cd69ab8db942/play_480p.mp4" poster={blaz3d_trailer_poster} autoPlay={false} controls={true} preload="none"/>

### Technical Details

The game was created in C++ with a custom built 3D rendering pipeline that was optimised for mobile devices. An array of custom shaders were built to achieve high quality visuals on symbian phones with very limited GPUs.

A custom cache-aligned binary file format was created to ensure object data would fit the limited RAM of Symbian devices. A 3D Studio Max script was created to export data directly from studio max to the binary game format.

All object data was stored in fixed point integers to optimise GPU bandwidth and to speed up transformations on CPUs without FPUs. VFP optimised math routines were used to leverage better performance on ARM CPUs that supported it.

AI waypoints were created in studio max and exported similar to object data which was used by an AI system that chose between a series of waypoints. AI characters were given personalities (aggression, chase potential, speed, etc).

UDP based multiplayer system was built that allowed playing the game with other players over LAN with buit-in support for discovering other players on network. The physics of the game was ensured to be reproducible with compressed snapshots of the physics state sent to further correct issues occurring due to difference between CPUs with FPU and cPUs without FPUs. A prediction and error correction system was built to minimise effects of latency over several hundred miliseconds.

## Summary
* Sole programmer for the entire game
* C++ (Edge Lib Engine) with a custom GLES 1.0 renderer
* Custom 3D Studio Max export pipeline using Max Script
* Custom mesh packer to parse text data into binary packed cache-line aligned data structures
* Waypoint AI + behavior trees for enemy AI

* Optimized core maths for ARM processors using VFP routines
* Fixed point maths and scaled mesh data to integers to optimize GPU data transfer
* Online multiplayer using UDP sockets and on LAN using broadcast discovery
* Compressed physics snapshots + prediction for smooth movement upto several hundred ms network latency
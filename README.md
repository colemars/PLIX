
#### PLIX

#### By Cole Marsteller

## Description

WIP HTML5/JS Game

#### Or see it yourself:
https://plix-8befd.firebaseapp.com/

#### Usage:

[coming soon]

## Setup/Installation Requirements

* In the command line, clone this repository
```
$ git clone <url-of-this-repo>
```

* To open the application in Chrome, use command
```
$ npm install
$ npm run start
```
* Bash will tell you what your localhost://<port-goes-here> is

## Known Issues

[Just UI]

## Project’s Purpose

“build a world" survival game

## List the absolute minimum features the project requires to meet this purpose or goal:

* player will be able to build a game world (probably using matrices) using a limited number of blocks
* player will be able to navigate their game world
* Enemies will spawn in the game world
* Enemies will interact with the player - chasing them and causing damage
* Points will accumulate based on how long the player survives
* react leaderboard hooked up to firebase

## What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is specific to your track, and your language) will you use to create this MVP? List them all here. Be specific.

* Javascript
* React
* Firebase
* p5.js
* open source game art and music

## If you finish developing the minimum viable product (MVP) with time to spare, what will you work on next? Describe these features here: Be specific.

* Ability to destroy enemies with a charged ability (maybe charged by collecting falling orbs)
* level up/increased difficulty
* specialty blocks (super bounce, super fast, elevator, traps, etc…)
* On level completion player can upgrade blocks or buy new ones

## Support and contact details

If you have any questions or issues, please contact marstellercole@knights.ucf.edu. Or, feel free to contribute to the code.

## Technologies Used

Javascript, react, pixiJS, redux, pixi-react, react-redux

## Static Repo

https://github.com/colemars/staticPLIX

## Overview

* Components Tree
![Components Tree](https://github.com/colemars/PLIX/blob/master/public/assets/images/components.png)
* State Representation
![State Representation](https://github.com/colemars/PLIX/blob/master/public/assets/images/state.png)
* UI
![UI](https://github.com/colemars/PLIX/blob/master/public/assets/images/UI.png)

## State Slices

* buttonClicked
* gameStarted
* gamePaused
* gameState


### License

This software is licensed under the MIT license.

Copyright (c) 2019 **Cole Marsteller**

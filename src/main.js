// Samuel Spivey 
// Created: 6/2/2025
// Phaser: 3.70.0
//
// DOORS
//
// 
"use strict"

// game config
let config = {
  parent: 'phaser-game',
  type: Phaser.AUTO,
  render: {
    pixelArt: true  // prevent pixel art from getting blurred when scaled
  },
  fps: { forceSetTimeOut: true, target: 60 },   // ensure consistent timing across machines
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [TitleScreen, Load, Room0, Room1, Room2, Room3, Room4, Room5, Room6, Room7, Room8, Room9, DEATH]
}
const game = new Phaser.Game(config);

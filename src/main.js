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
  type: Phaser.CANVAS,
  render: {
    pixelArt: true  // prevent pixel art from getting blurred when scaled
  },
  fps: { forceSetTimeOut: true, target: 60 },   // ensure consistent timing across machines
  width: 800,
  height: 600,
  scene: [Load, Room0]
}
const game = new Phaser.Game(config);

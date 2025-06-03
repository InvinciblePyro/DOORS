class Room0 extends Phaser.Scene {
  constructor() {
    super("room0");
  }

  init() {
    
  }

  create() {
    //background image
    this.add.image(0,0,"Room0bg").setOrigin(0,0);

    //Dark overlay
    //this.darkness = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 1).setOrigin(0, 0);



    //door functionality 
    let door = this.add.rectangle(0, 140, 130, 330)
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log("Button Clicked");
        //this.scene.start("room1");
      })
      .setStrokeStyle(2, 0x00ff00) 

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });
  }

  update() {
    
  }

  lighter(){

  }
  shotgun(){

  }
  
}
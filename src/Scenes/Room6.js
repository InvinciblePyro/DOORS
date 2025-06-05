class Room6 extends Phaser.Scene {
  constructor() {
    super("room6");
  }

  create() {
    // Add the background image
    let Room0bg = this.add.image(0, 0, "Room6bg").setOrigin(0, 0);
    Room0bg.setScale(0.3)

    //hide cursor icon
    this.input.setDefaultCursor('none');

    // L I G H T E R   H E  L L v v v v v v v v v v v v v v v v v  
    //lighter key
    this.flashlightEnabled = false;
    this.input.keyboard.on('keydown-ONE', () => {
      this.flashlightEnabled = !this.flashlightEnabled;
    });
    // Create the dark overlay that covers the screen
    this.darkOverlay = this.add.graphics();
    this.darkOverlay.fillStyle(0x000000, 1); // nearly full black
    this.darkOverlay.fillRect(0, 0, this.scale.width, this.scale.height);
    // Create the spotlight graphics (not shown directly)
    this.spotlight = this.make.graphics({ x: 0, y: 0, add: false });
    // Create a mask from the spotlight graphics
    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true; // White area = hole (i.e. flashlight)
    // Apply the mask to the dark overlay
    this.darkOverlay.setMask(mask);
        // L I G H T E R   H E  L L ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

    //door functionality 
    let door = this.add.rectangle(260, 462, 135, 160)
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: false })
      .on('pointerdown', () => {
        if(this.flashlightEnabled){
          console.log("Button Clicked");
          this.scene.start("room7");
        }
      })
      //.setStrokeStyle(2, 0x00ff00) 

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });

  }

  update() {
    const pointer = this.input.activePointer;

    // Flickering effect radius
    let baseRadius = 100;
    let flicker = Math.sin(this.time.now * 0.002) * 5; // subtle flicker
    let radius = baseRadius + flicker;

    // Redraw spotlight
    this.spotlight.clear();

    if (this.flashlightEnabled) {
      this.spotlight.fillStyle(0xffffff, 1);
      this.spotlight.fillCircle(pointer.x, pointer.y, radius);
    }
  }
}

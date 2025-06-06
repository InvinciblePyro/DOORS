class Room0 extends Phaser.Scene {
  constructor() {
    super("room0");
  }

  create() {
    // === Fade-Out Overlay (used when leaving) ===
    this.fadeOutOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDepth(1000); // Make sure it's on top of everything

    // === Fade-In Overlay (used when entering) ===
    this.fadeInOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setDepth(1000);

    this.tweens.add({
      targets: this.fadeInOverlay,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.fadeInOverlay.destroy();
      }
    });

    //SFX creation
    this.SFX_DoorOpen = this.sound.add("SFX-DoorOpen");

    // Add the background image
    let Room0bg = this.add.image(0, 0, "Room0bg").setOrigin(0, 0);
    Room0bg.setScale(0.2)

    //lighter image
    this.lighterCursor = this.add.image(0, 0, 'lighter')
      .setScale(1)
      .setVisible(false)
      .setDepth(999); // Make sure it's above other elements


    //hide cursor icon
    this.input.setDefaultCursor('none');

    //OST Ambience
    let globalMusic = this.sound.add("OST", {
      loop: true,
      volume: 1,
      rate: 1,
    });
    globalMusic.play();


    // L I G H T E R   H E  L L v v v v v v v v v v v v v v v v v  
    //lighter key
    this.flashlightEnabled = false;
    this.spotlightFadeAlpha = 1;

    this.input.keyboard.on('keydown-ONE', () => {
      this.flashlightEnabled = !this.flashlightEnabled;
      this.lighterCursor.setVisible(this.flashlightEnabled);
    
      this.tweens.add({
        targets: this,
        spotlightFadeAlpha: this.flashlightEnabled ? 0 : 1,
        duration: 400, // duration of fade (ms)
        ease: 'Sine.easeInOut'
      });
    });
    
    // Create the dark overlay that covers the screen
    this.darkOverlay = this.add.graphics();
    this.darkOverlay.fillStyle(0x000000, 1); // full black
    this.darkOverlay.fillRect(0, 0, this.scale.width, this.scale.height);
    // Create the spotlight graphics (not shown directly)
    this.spotlight = this.make.graphics({ x: 0, y: 0, add: false });
    // Create a mask from the spotlight graphics
    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true; // White area = hole (i.e. flashlight)
    // Apply the mask to the dark overlay
    this.darkOverlay.setMask(mask);
    // L I G H T E R   H E  L L ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

    this.spotlightFade = this.add.graphics().setDepth(998);


    //door functionality v v v v v v v v v v v v v v v v v 
    let debugDoorOutline = 0;
    //array of doors
    this.doors = [];

    //door0
    const door0 = this.add.rectangle(175, 310, 90, 120)
      .setOrigin(0, 0)
      .setInteractive()
            .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();

          this.tweens.add({
            targets: this.fadeOutOverlay,
            alpha: 1,
            duration: 1000, // fade over 1 second
            onComplete: () => {
              this.scene.start("room1");
            }
          });
        }
      })
      .setStrokeStyle(debugDoorOutline, 0x00ff00) 

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });

    //door1
    const door1 = this.add.rectangle(320, 300, 25, 135)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();
          this.scene.start("room1");
        }
      })
      .setStrokeStyle(debugDoorOutline, 0x00ff00)

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });

    //door2
    const door2 = this.add.rectangle(490, 230, 105, 300)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();
          this.scene.start("room1");
        }
      })
      .setStrokeStyle(debugDoorOutline, 0x00ff00)

    //push doors to array
    this.doors.push(door0, door1, door2);
    //door functionality ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });

  }

  update() {
    const pointer = this.input.activePointer;

    // Spotlight flicker effect
    const flicker = Math.sin(this.time.now * 0.002) * 5;
    const radius = 100 + flicker;

    // Clear previous spotlight
    this.spotlight.clear();
    this.spotlightFade.clear();

    if (this.flashlightEnabled || this.spotlightFadeAlpha > 0) {
      // White circle cutout
      this.spotlight.fillStyle(0xffffff, 1);
      this.spotlight.fillCircle(pointer.x, pointer.y, radius);

      // Black overlay fade
      if (this.spotlightFadeAlpha > 0) {
        this.spotlightFade.fillStyle(0x000000, this.spotlightFadeAlpha);
        this.spotlightFade.fillCircle(pointer.x, pointer.y, radius);
      }
    }

    // Update lighter position
    if (this.flashlightEnabled && this.lighterCursor.visible) {
      this.lighterCursor.setPosition(pointer.x - 25, pointer.y + 50);
    }

  }
}

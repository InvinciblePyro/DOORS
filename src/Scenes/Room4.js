class Room4 extends Phaser.Scene {
  constructor() {
    super("room4");
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
    let Room0bg = this.add.image(0, 0, "Room4bg").setOrigin(0, 0);
    Room0bg.setScale(0.23)

    //hide cursor icon
    //this.input.setDefaultCursor('none');

    // L I G H T E R   H E  L L v v v v v v v v v v v v v v v v v  
    //lighter key
    this.flashlightEnabled = true;
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

    //door functionality v v v v v v v v v v v v v v v v v 
    let debugDoorOutline = 0;
    //array of doors
    this.doors = [];

    //door0
    const door0 = this.add.rectangle(0, 173, 230, 450)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();
  
          this.tweens.add({
            targets: this.fadeOutOverlay,
            alpha: 1,
            duration: 1000, // 1 second fade out
            onComplete: () => {
              this.scene.start("room5");
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
    const door1 = this.add.rectangle(465, 270, 30, 170)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();
  
          this.tweens.add({
            targets: this.fadeOutOverlay,
            alpha: 1,
            duration: 1000, // 1 second fade out
            onComplete: () => {
              this.scene.start("room5");
            }
          });
        }
      }) 
      .setStrokeStyle(debugDoorOutline, 0x00ff00)

    //Debug: gives pointer coords when you click
    this.input.on('pointerdown', (pointer) => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });

    //door2
    const door2 = this.add.rectangle(540, 285, 20, 120)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.flashlightEnabled) {
          console.log("Button Clicked");
          this.SFX_DoorOpen.play();
  
          this.tweens.add({
            targets: this.fadeOutOverlay,
            alpha: 1,
            duration: 1000, // 1 second fade out
            onComplete: () => {
              this.scene.start("room5");
            }
          });
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

    // Cursor changes to pointer icon when hovering over a door
    let cursorIsOverDoor = false;
    for (const door of this.doors) {
      if (door.input && door.input.enabled && door.getBounds().contains(pointer.x, pointer.y)) {
        cursorIsOverDoor = true;
        break;
      }
    }
    this.input.setDefaultCursor(cursorIsOverDoor && this.flashlightEnabled ? 'pointer' : 'none');

  }
}

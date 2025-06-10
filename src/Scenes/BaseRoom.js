class BaseRoom extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data){
    this.lighterFuel = data?.lighterFuel ?? 100;
  }

  createBaseRoom(bgKey, scale, lighterFuel, doorConfigs = []) {
    // === Background ===
    const bg = this.add.image(0, 0, bgKey).setOrigin(0, 0).setScale(scale);

    // === Fade overlays ===
    this.fadeOutOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDepth(1000);

    this.fadeInOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setDepth(1000);

    this.tweens.add({
      targets: this.fadeInOverlay,
      alpha: 0,
      duration: 1000,
      onComplete: () => this.fadeInOverlay.destroy()
    });

    // === Audio ===
    if (!this.OST) {
      this.OST = this.sound.add("OST", { loop: true, volume: 1 });
      this.OST.play();
    }
    this.SFX_DoorOpen = this.sound.add("SFX-DoorOpen");
    this.SFX_Lighter = this.sound.add("SFX-Lighter", { volume: 0.2 });
    this.SFX_lighterFluid_Pickup = this.sound.add("SFX-lighterFluid-Pickup", { volume: 1.5 });

    // === Flashlight ===
    this.flashlightEnabled = false;
    this.spotlightFadeAlpha = 1;
    this.input.setDefaultCursor("none");

    this.lighterCursor = this.add.image(0, 0, "lighter")
      .setScale(0.15)
      .setVisible(false)
      .setDepth(999);
    this.spotlightFade = this.add.graphics().setDepth(998);
    
    // === Lighter Fluid Pickup ===
    this.lighterFluidGroup = this.add.group();
    // chance to spawn lighter fluid
    if (Phaser.Math.Between(1, 100) <= 100) {
      const x = Phaser.Math.Between(50, bg.displayWidth - 50);
      const y = Phaser.Math.Between(50, bg.displayHeight - 50);

      const fluid = this.add.image(x, y, "lighterFluid")
        .setScale(0.1)
        .setInteractive();

      fluid.on("pointerdown", () => {
        if(this.flashlightEnabled){
          this.collectLighterFluid(fluid);
        }
      });

      this.lighterFluidGroup.add(fluid);
    }


    // Create the darkness overlay
    this.darkOverlay = this.add.graphics();
    this.darkOverlay.fillStyle(0x000000, 1);
    this.darkOverlay.fillRect(0, 0, this.scale.width, this.scale.height);

    // Create spotlight + mask
    this.spotlight = this.make.graphics({ x: 0, y: 0, add: false });
    const mask = this.spotlight.createGeometryMask();
    mask.invertAlpha = true;
    this.darkOverlay.setMask(mask);

    // Lighter toggle key
    this.input.keyboard.on("keydown-ONE", () => {
      if (this.lighterFuel > 0) {
        this.flashlightEnabled = !this.flashlightEnabled;
        this.SFX_Lighter.play();
        this.lighterCursor.setVisible(this.flashlightEnabled);

        this.tweens.add({
          targets: this,
          spotlightFadeAlpha: this.flashlightEnabled ? 0 : 1,
          duration: 400,
          ease: "Sine.easeInOut"
        });
      }
    });
    
  
    // === Doors ===
    this.doors = [];
    for (const { x, y, w, h, target } of doorConfigs) {
      const door = this.add.rectangle(x, y, w, h)
        .setOrigin(0, 0)
        .setInteractive()
        .setStrokeStyle(0, 0x00ff00) 
        .on("pointerdown", () => {
          if (this.flashlightEnabled) {
            this.SFX_DoorOpen.play();
            this.tweens.add({
              targets: this.fadeOutOverlay,
              alpha: 1,
              duration: 1000,
              onComplete: () => this.scene.start(target, { lighterFuel: this.lighterFuel})
            });
          }
        });
      this.doors.push(door);
    }

    // Pointer debug
    this.input.on("pointerdown", pointer => {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`);
    });
  }

  collectLighterFluid(fluid) {
    fluid.destroy();
    console.log("Lighter fluid collected!");
    this.SFX_lighterFluid_Pickup.play();

    // Example logic: increase lighterFuel (if you have it)
    if (this.lighterFuel !== undefined) {
      this.lighterFuel = 100; // refresh lighter fuel
      console.log("Lighter fuel: " + Math.round(this.lighterFuel));
    }
  }
  

  update() {
    const pointer = this.input.activePointer;

    // Clear previous spotlight graphics
    this.spotlight.clear();
    this.spotlightFade.clear();

    const flicker = Math.sin(this.time.now * 0.002) * 5;
    const radius = 100 + flicker;

    if (this.flashlightEnabled || this.spotlightFadeAlpha > 0) {
      // Draw white spotlight hole for the mask
      this.spotlight.fillStyle(0xffffff, 1);
      this.spotlight.fillCircle(pointer.x, pointer.y, radius);

      // If fading out, draw a black circle on top (soft fade)
      if (this.spotlightFadeAlpha > 0) {
        this.spotlightFade.fillStyle(0x000000, this.spotlightFadeAlpha);
        this.spotlightFade.fillCircle(pointer.x, pointer.y, radius);
      }
    }

    //drain lighter fuel
    if (this.flashlightEnabled) {
      this.lighterFuel -= 0.025; // Adjust as needed
      console.log(Math.round(this.lighterFuel));
      if (this.lighterFuel <= 0) {
        this.lighterFuel = 0;
        this.flashlightEnabled = false;
        this.lighterCursor.setVisible(false);
      }
    }
    
    // Move lighter image
    if (this.flashlightEnabled && this.lighterCursor.visible) {
      this.lighterCursor.setPosition(pointer.x - 6, pointer.y + 25);
    }
  }
  
}

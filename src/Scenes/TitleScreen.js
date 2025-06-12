class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {
    this.load.image("bg", "./Assets/Visual/RoomsBg/Room3bg.jpeg"); 

  }

  create() {
    // === fade in overlay === 
    this.fadeInOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setDepth(1000);

    this.tweens.add({
      targets: this.fadeInOverlay,
      alpha: 0,
      duration: 2000,
      onComplete: () => this.fadeInOverlay.destroy()
    });


    this.add.image(330, 300, "bg").setScale(0.55); // background

    this.add.text(10, 70, "DOORS", { fontSize: '64px', fill: '#ffffff' });
    this.add.text(10, 160, "Look for fuel.", { fontSize: '32px', fill: '#ffffff' });
    this.add.text(10, 190, "Click on its door when you hear it.", { fontSize: '32px', fill: '#ffffff' });
    this.add.text(10, 290, "Press space to begin.", { fontSize: '32px', fill: '#ffffff' });

    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // === Fade out overlay ===
    this.fadeOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDepth(1000);

    this.started = false; // prevent multiple triggers
  }

  update() {
    if (!this.started && Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.started = true;

      this.tweens.add({
        targets: this.fadeOverlay,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
          this.scene.start("loadScene");
        }
      });
    }
  }
}

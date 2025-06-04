class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    this.load.setPath("./Assets/");
    this.load.image("Room0bg", "Visual/RoomsBg/Initial-Photos/Room0bg.jpg");
  }

  create() {
    
    // Move to the next scene
    this.scene.start("room0");
  }
}

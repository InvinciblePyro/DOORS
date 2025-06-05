class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    this.load.setPath("./Assets/");

    for (let i=0; i<=9; i++){
      this.load.image("Room" + i + "bg", "Visual/RoomsBg/Room"+i+"bg.jpeg");
    }


  }

  create() {
    // Move to the next scene
    this.scene.start("room0");
  }
}

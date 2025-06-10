class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    this.load.setPath("./Assets/");

    //load room backgrounds
    for (let i=0; i<=9; i++){
      this.load.image("Room" + i + "bg", "Visual/RoomsBg/Room"+i+"bg.jpeg");
    }

    //lighter png
    this.load.image("lighter", "Visual/lighter.png");

    //load ambience
    this.load.audio("OST", "Auditory/NoiseAmbience.wav");

    //SFX

    //door sfx
    this.load.audio("SFX-DoorOpen", "Auditory/DoorOpen.wav");
    //lighter sfx
    this.load.audio("SFX-Lighter", "Auditory/Lighter.wav");
    


  }

  create() {
    // Move to the next scene
    this.scene.start("room0");
  }
}

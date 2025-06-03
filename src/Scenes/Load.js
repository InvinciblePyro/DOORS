class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    this.load.setPath("./Assets/");
    this.load.image("Room0bg", "Visual/Room0bg.jpg");
  }

  create() {
    // Get image dimensions
    const img = this.textures.get("Room0bg").getSourceImage();
    const width = img.width;
    const height = img.height;

    console.log(`Resizing to ${width}x${height}`);

    // Resize Phaser's internal canvas
    this.scale.resize(width, height);

    // Also resize the actual DOM canvas so it reflects the new size visually
    const canvas = this.sys.game.canvas;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Move to the next scene
    this.scene.start("room0");
  }
}

class Room9 extends BaseRoom {
  constructor() {
    super("room9");
  }

  create() {
    this.createBaseRoom("Room9bg", 0.8, this.lighterFuel, [
      { x: 380, y: 162, w: 195, h: 350, target: "room0" },
    ]);
  }
}
class Room7 extends BaseRoom {
  constructor() {
    super("room7");
  }

  create() {
    this.createBaseRoom("Room7bg", 0.17, this.lighterFuel, [
      { x: 620, y: 392, w: 110, h: 300, target: "room8" },
    ]);
  }
}
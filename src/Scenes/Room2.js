class Room2 extends BaseRoom {
  constructor() {
    super("room2");
  }

  create() {
    this.createBaseRoom("Room2bg", 0.42, this.lighterFuel, [
      { x: 309, y: 275, w: 55, h: 130, target: "room3" },
    ]);
  }
}
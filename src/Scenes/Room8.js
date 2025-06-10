class Room8 extends BaseRoom {
  constructor() {
    super("room8");
  }

  create() {
    this.createBaseRoom("Room8bg", 0.23, this.lighterFuel, [
      { x: 515, y: 180, w: 115, h: 330, target: "room9" },
    ]);
  }
}
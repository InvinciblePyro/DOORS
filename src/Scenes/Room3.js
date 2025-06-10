class Room3 extends BaseRoom {
  constructor() {
    super("room3");
  }

  create() {
    this.createBaseRoom("Room3bg", 0.45, [
      { x: 313, y: 240, w: 85, h: 190, target: "room4" },
    ]);
  }
}
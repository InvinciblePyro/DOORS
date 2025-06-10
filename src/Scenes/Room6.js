class Room6 extends BaseRoom {
  constructor() {
    super("room6");
  }

  create() {
    this.createBaseRoom("Room6bg", 0.5, [
      { x: 275, y: 290, w: 90, h: 210, target: "room7" },
    ]);
  }
}
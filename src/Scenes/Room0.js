class Room0 extends BaseRoom {
  constructor() {
    super("room0");
  }

  create() {
    this.createBaseRoom("Room0bg", [
      { x: 175, y: 310, w: 90, h: 120, target: "room1" },
      { x: 320, y: 300, w: 25, h: 135, target: "room1" },
      { x: 490, y: 230, w: 105, h: 300, target: "room1" }
    ]);
  }
}

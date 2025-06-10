class Room4 extends BaseRoom {
  constructor() {
    super("room4");
  }

  create() {
    this.createBaseRoom("Room4bg", 0.23, [
      { x: 0, y: 173, w: 230, h: 450, target: "room5" },
      { x: 465, y: 270, w: 30, h: 170, target: "room5" },
      { x: 540, y: 285, w: 20, h: 120, target: "room5" }
    ]);
  }
}
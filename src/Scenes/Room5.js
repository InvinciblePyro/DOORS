class Room5 extends BaseRoom {
  constructor() {
    super("room5");
  }

  create() {
    this.createBaseRoom("Room5bg", 0.44, [
      { x: 190, y: 95, w: 190, h: 590, target: "room6" },
    ]);
  }
}
class Room1 extends BaseRoom {
  constructor() {
    super("room1");
  }

  create() {
    this.createBaseRoom("Room1bg", 0.44, this.lighterFuel,[
      { x: 224, y: 246, w: 100, h: 180, target: "room2" },
    ]);
  }
}
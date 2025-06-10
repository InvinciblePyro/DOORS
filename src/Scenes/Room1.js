class Room1 extends BaseRoom {
  constructor() {
    super("room1");
  }

  create() {
    let Room0bg = this.add.image(0, 0, "Room1bg").setOrigin(0, 0);
    Room0bg.setScale(0.4)

    this.createBaseRoom("Room1bg", 0.4,[
      { x: 209, y: 227, w: 85, h: 160, target: "room2" },
    ]);
  }
}
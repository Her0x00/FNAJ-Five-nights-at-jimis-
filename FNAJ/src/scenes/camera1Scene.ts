import Phaser  from "phaser";

export class Camera1Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Camera1Scene" });
    }

    create() {
        this.add.text(100, 100, "Camera 1 View", { fontSize: "20px", color: "#fff" });
    }
}
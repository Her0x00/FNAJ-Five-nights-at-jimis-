import Phaser from "phaser";

export class OfficeScene extends Phaser.Scene {
    constructor() {
        super({ key: "OfficeScene" });
    }

    create() {
        this.add.text(100, 100, "Office View - Press C to Check Cameras", { fontSize: "20px", color: "#fff" });

        this.input.keyboard.once("keydown-C", () => {
            this.scene.start("CameraScene");
        });
    }
}

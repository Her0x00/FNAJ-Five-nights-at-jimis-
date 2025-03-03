import Phaser from "phaser";

export class CameraScene extends Phaser.Scene {
    constructor() {
        super({ key: "CameraScene" });
    }

    create() {
        this.add.text(100, 100, "Camera View - Press X to Return", { fontSize: "20px", color: "#fff" });

        this.input.keyboard.once("keydown-X", () => {
            this.scene.start("OfficeScene");
        });
    }
}

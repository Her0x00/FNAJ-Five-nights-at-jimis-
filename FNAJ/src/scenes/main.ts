import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.add.text(100, 100, "Main Menu - Press SPACE to Start", { fontSize: "20px", color: "#fff" });

        this.input.keyboard!.once("keydown-SPACE", () => {
            this.scene.start("OfficeScene");
        });
    }
}

import Phaser from "phaser";

export class CameraScene extends Phaser.Scene {
    constructor() {
        super({ key: "CameraScene" });
    }

    preload() {
        this.load.image("cameraOverlay", "assets/cameraOverlay.png");

        this.load.image("cam1", "assets/cam1.png");
        this.load.image("cam2", "assets/cam2.png");
        this.load.image("cam3", "assets/cam3.png");
        this.load.image("cam4", "assets/cam4.png");
        this.load.image("cam5", "assets/cam5.png");
        
    }

    create() {
        this.add.text(100, 100, "Camera View - Press X to Return", { fontSize: "20px", color: "#fff" });
        
        let img = this.add.image(500, 500, "cameraOverlay");

        this.input.keyboard.once("keydown-X", () => {
            this.scene.start("OfficeScene");
        });

        this.registry.set("activeCamera", {camIndex: 1, imgSrc: "cam1"});

        for (let i = 1; i < 6; i++) {
            this.registry.set(`camera${i}`, {index: i, imgSrc: `cam${i}.png`});
        }
    }

    update() {

    }
}

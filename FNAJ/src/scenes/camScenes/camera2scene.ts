import Phaser  from "phaser";

export class Camera2Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Camera2Scene" });
    }

    preload() {
        this.load.image("cam2", "assets/cam2.png")
    }

    create() {

        const {width, height } = this.scale
        let cam2 = this.add.image(width / 2, height / 2, "cam2")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height)
        this.add.text(100, 100, "Camera 2 View", { fontSize: "20px", color: "#gray " });
        this.add.text(100, 150, "Press X to Return", { fontSize: "20px", color: "#777777" });


        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("CameraScene");
        });



       

    }
}
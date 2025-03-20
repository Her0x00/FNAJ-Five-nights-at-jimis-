import Phaser  from "phaser";

export class Camera4Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Camera4Scene" });
    }

    preload(){
        this.load.image("cam4", "assets/cam4.png")
    }

    create() {
        const {width, height } = this.scale
        let cam4 = this.add.image(width / 2, height / 2, "cam4")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height)
        this.add.text(100, 100, "Camera 4 View", { fontSize: "20px", color: "#999999" });
        this.add.text(100, 150, "Press X to get back to office", { fontSize: "20px", color: "#999999" });
        this.add.text(100, 150, "Press X to Return", { fontSize: "20px", color: "#777777" });


        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("CameraScene");
        });


        

    }
}
import Phaser  from "phaser";

export class Camera1Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Camera1Scene" });
    }

    preload(){
        this.load.image("cam1", "assets/cam1.png");
    }

    create() {

        const {width, height } = this.scale
        let cam1 = this.add.image(width / 2, height / 2, "cam1")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height) 
        this.add.text(100, 100, "Camera 1 View", { fontSize: "20px", color: "#777777" });
        this.add.text(100, 150, "Press X to Return", { fontSize: "20px", color: "#777777" });


        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("CameraScene");
        });



    }
}
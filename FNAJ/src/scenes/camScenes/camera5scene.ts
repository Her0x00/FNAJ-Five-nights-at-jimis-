import Phaser  from "phaser";

export class Camera5Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Camera5Scene" });
    }

    preload(){
        this.load.image("cam5", "assets/cam5.png")
    }

    create() {
        const {width, height } = this.scale
        let cam5 = this.add.image(width / 2, height / 2, "cam5")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height)
        this.add.text(100, 100, "Camera 5 View", { fontSize: "20px", color: "#999999" });
        this.add.text(100, 150, "Press X to get back to office", { fontSize: "20px", color: "#999999" });
        this.add.text(100, 150, "Press X to Return", { fontSize: "20px", color: "#777777" });


        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("CameraScene");
        });



        

    }
}
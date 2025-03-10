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
        this.add.text(100, 150   , "Click (1, 2, 3, 4, 5) to choose camera", { fontSize: "20px", color: "#fff"})
        
        this.add.image(500, 500, "cameraOverlay");

        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("OfficeScene");
        });

        for(let i = 1; i <= 5; i++){
            this.input.keyboard!.on(`keydown-1`, () => {
                this.scene.start(`camera1Scene`)
            }) 
        }

        this.input.keyboard.on("keydown", (event) => {
            console.log(`Key pressed: ${event.key}`);
        });
        

        // this.registry.set("activeCamera", {camIndex: 1, imgSrc: "cam1"});

        // for (let i = 1; i < 6; i++) {
        //     this.registry.set(`camera${i}`, {index: i, imgSrc: `cam${i}.png`});
        // }
    }

    update() {

    }
}

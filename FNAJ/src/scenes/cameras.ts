import Phaser from "phaser";
import GameState from "../gameState";
import { pos } from "./util";

/* I orginalla fnaf speli så funkar 

*/
export class CameraScene extends Phaser.Scene {
    state?: GameState;
    CameraPos: Array<pos>;

    
    MapOverlay?: Phaser.GameObjects.Image;

    CameraSizeButtonW: number = 50;
    CameraSizeButtonH: number = 25;
    
    constructor() {
        super({ key: "CameraScene" });
    
        this.CameraPos = [];

    }

    preload() {
        this.load.image("cameraOverlay", "assets/cameraOverlay.png");

        this.load.image("cam1", "assets/cam1.png");
        this.load.image("cam2", "assets/cam2.png");
        this.load.image("cam3", "assets/cam3.png");
        this.load.image("cam4", "assets/cam4.png");
        this.load.image("cam5", "assets/cam5.png");

        this.load.image("ButtonBG", "assets/CameraButtonBG.png");

        this.state = this.registry.get("GameState");


        // var camera knappan man byter med komber vara relativt till map overlayn
        // btw varenda camera knapp har lika stor dimensioner

        // godamn dehär skitin to typ en timma ti hitt manuellt
        this.CameraPos = [
            {x: 1140, y: 448},
            {x: 1112, y: 521},
            {x: 1072, y: 625},
            {x: 1140, y: 778},
            {x: 1140, y: 832},
            {x: 1028, y: 755},
            {x: 1280, y: 778},
            {x: 1280, y: 832},
            {x: 975, y: 557},
            {x: 1420, y: 557},
            {x: 1410, y: 731},
        ];
    }

    create() {
        this.add.text(100, 100, " Camera View - Press X to Return", {  fontFamily: 'fnaf', fontSize: "20px", color: "#fff" });
        
        /* Place holder
         * Spelarn kmr kunna bara manuelt click på map cameror för att byt cam
        */
        //this.add.text(100, 150   , "Click (1, 2, 3, 4, 5) to choose camera", { fontSize: "20px", color: "#fff"})
        
        this.MapOverlay = this.add.image(1200, 650 , "cameraOverlay").setScale(1.2);

        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("OfficeScene");
        });

        for (let i = 0; i < this.CameraPos.length; i++) {
            this.state?.cameras.push({
                buttonSprite: 
                    this.add.sprite(
                        this.CameraPos[i].x,
                        this.CameraPos[i].y,
                        "ButtonBG").setScale(0.89, 1).setInteractive().on("pointerdown", () => { this.changeCam(i)}),
                
                buttonText: 
                    this.add.text(
                        this.CameraPos[i].x - 20,
                        this.CameraPos[i].y - 15,
                        `CAM\n${i}`, {  fontFamily: 'fnaf', fontWeight: 'bolder', fontSize: "20px", color: "#fff" })
                        
            })

        }

        

        // this.registry.set("activeCamera", {camIndex: 1, imgSrc: "cam1"});

        // for (let i = 1; i < 6; i++) {
        //     this.registry.set(`camera${i}`, {index: i, imgSrc: `cam${i}.png`});
        // }
    }


    changeCam(index: number) {
        console.log(index);
    }

    update(time: number, delta: number): void {
        this.state?.tick(delta);
    }
}

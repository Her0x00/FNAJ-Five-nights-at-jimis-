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

    activeCamera: number = 0;

    CameraImage?: Phaser.GameObjects.Image;
    
    TVstatic: Phaser.GameObjects.Image;
    
    constructor() {
        super({ key: "CameraScene" });
    
        this.CameraPos = [];
    }

    preload() {
        this.load.image("cameraOverlay", "assets/cameraOverlay.png");

        this.load.image("cam1", "assets/Cameras/1-STAGE.png");
        this.load.image("cam1-all", "assets/Cameras/1-STAGE_ALL.png");
        this.load.image("cam1-bonnie", "assets/Cameras/1-STAGE_BONNIE.png");

        this.load.image("cam2", "assets/Cameras/2-DINING_AREA.png");
        this.load.image("cam2-bonnie-pos1", "assets/Cameras/2-DINING_AREA_BONNIE.png");
        this.load.image("cam2-bonnie-pos2", "assets/Cameras/2-DINING_AREA_BONNIE_2.0.png");
        

        this.load.image("ButtonBG", "assets/CameraButtonBG.png");

        this.load.image('static1', 'assets/static/1.png');
        this.load.image('static2', 'assets/static/2.png');
        this.load.image('static3', 'assets/static/3.png');
        this.load.image('static4', 'assets/static/4.png');
        this.load.image('static5', 'assets/static/5.png');
        this.load.image('static6', 'assets/static/6.png');
        this.load.image('static7', 'assets/static/7.png');

        this.load.image("WhiteBar1", "FNAJ/public/assets/Camerasx/whiteBars/1.png");
        
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
        
        this.anims.create({
            key: 'staticAnim',
            frames: [
                { key: 'static1' },
                { key: 'static2' },
                { key: 'static3' },
                { key: 'static4' },
                { key: 'static5' },
                { key: 'static6' },
                { key: 'static7' }
            ],
            frameRate: 30, // Adjust for speed
            repeat: -1 // Infinite loop
        });

        this.TVstatic = this.add.sprite(800, 450, "static1").setDepth(1).setScale(1.25).setAlpha(0.5);
        this.TVstatic.play("staticAnim");

        this.TVstatic.setBlendMode(Phaser.BlendModes.SCREEN);
        

        this.add.text(100, 100, " Camera View - Press X to Return", {  fontFamily: 'fnaf', fontSize: "20px", color: "#fff" });
        
        /* Place holder
         * Spelarn kmr kunna bara manuelt click på map cameror för att byt cam
        */
        //this.add.text(100, 150   , "Click (1, 2, 3, 4, 5) to choose camera", { fontSize: "20px", color: "#fff"})
        
        this.MapOverlay = this.add.image(1200, 650 , "cameraOverlay").setScale(1.2).setDepth(2).setTint(0xffffff);

        this.input.keyboard!.on(`keydown-X`, () => {
            this.scene.start("OfficeScene");
        });

        for (let i = 0; i < this.CameraPos.length; i++) {
            this.state?.cameras.push({
                buttonSprite: 
                    this.add.sprite(
                        this.CameraPos[i].x,
                        this.CameraPos[i].y,
                        "ButtonBG").setScale(0.89, 1).setDepth(3).setInteractive().on("pointerdown", () => { this.changeCam(i)}),
                
                buttonText: 
                    this.add.text(
                        this.CameraPos[i].x - 20,
                        this.CameraPos[i].y - 15,
                        `CAM\n${i}`, {  fontFamily: 'fnaf', fontWeight: 'bolder', fontSize: "20px", color: "#fff" }).setDepth(4)
                        
            })

            this.changeCam(0);
        }

        

        // this.registry.set("activeCamera", {camIndex: 1, imgSrc: "cam1"});

        // for (let i = 1; i < 6; i++) {
        //     this.registry.set(`camera${i}`, {index: i, imgSrc: `cam${i}.png`});
        // }
    }


    changeCam(index: number) {
        if (this.activeCamera != index) {
            this.activeCamera = index;
        
            this.RenderCam();
        }
    }

    AddCamImg(path: string) {
        let scale = 900 / 720;

        let w = 1600 * scale; // 2k px
        let h = 900;

        this.CameraImage?.destroy();
        this.CameraImage = this.add.image(w / 2, h / 2 , path).setScale(scale).setDepth(0);

        this.tweens.add({
            targets: this.CameraImage,  // The image to move
            x: 600,                // Move to X = 600
            duration: 5000,        // Move over 5 seconds
            yoyo: true,            // Move back to start
            repeat: -1,            // Loop forever
            ease: 'Linear'     // Smooth easing
        });
    }

    // vis animatronics som finns på varje kamera
    RenderCam() {
        console.log(`rendercam ${this.activeCamera}`);
        let AnimatronicsPresent = [];

        for (let i = 0; i < this.state?.enemies.length; i++) {
            if (this.state?.enemies[i].AttackState == this.activeCamera) {
                AnimatronicsPresent.push(this.state.enemies[i].name);
            }
        }


        // Poopy dookey men her snabb att släng ihop
        // Basically ba hit rätt bild att lägg på rätt cam
        // varje bild har samma upplösning av 1600x720 så man skalar upp an sedan så flyttar
        // man bilding vänster sedan höger för att repliker spelis cctv cameror som flyttar automatiskt

        // btw speli använder en 7 frame statisk svart och vit animation med va jag antar är en chroma key effekt
        // elo na för att göra he meir animera ig å så he sir bättre ut som man kan add seinari
        
        let scale = 900 / 720;

        let w = 1600 * scale; // 2k px
        let h = 900;

        switch(this.activeCamera) {
            case 0:

                this.AddCamImg("cam1");
                
                break;
            case 1:

                this.AddCamImg("cam2")
                break;

            case 2:
                break;
            
            case 3:
                break;
            case 4:
                break;
    
            case 5:
                break;
        
        
            case 6:
                break;
            case 7:
                break;

            case 8:
                break;
            
            case 9:

                break;
            case 10:
                
                break;
    
            case 11:

                break;
        }
    }

    update(time: number, delta: number): void {
        this.state?.tick(delta);
    }
}

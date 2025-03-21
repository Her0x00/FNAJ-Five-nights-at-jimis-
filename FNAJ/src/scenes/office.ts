import Phaser from "phaser";
import GameState from "../gameState";

export class OfficeScene extends Phaser.Scene {
    state: GameState;
    leftDoor!: Phaser.GameObjects.Rectangle;  // Left door
    rightDoor!: Phaser.GameObjects.Rectangle; // Right door
    leftDoorClosed: boolean = false;  
    rightDoorClosed: boolean = false;  

    constructor() {
        super({ key: "OfficeScene" });
    }

    preload() {
        this.registry.set("GameState", new GameState());
        this.state = this.registry.get("GameState");

        this.load.image("officeBg", "assets/office.png"); 
        //this.load.image("button", "assets/button.png"); // Load button image
    
        this.load.image("MonitorAnim1", "assets/monitorAnimation/1.png");
        this.load.image("MonitorAnim2", "assets/monitorAnimation/2.png");
        this.load.image("MonitorAnim3", "assets/monitorAnimation/3.png");
        this.load.image("MonitorAnim4", "assets/monitorAnimation/4.png");
        this.load.image("MonitorAnim5", "assets/monitorAnimation/5.png");
        this.load.image("MonitorAnim6", "assets/monitorAnimation/6.png");
        this.load.image("MonitorAnim7", "assets/monitorAnimation/7.png");
        this.load.image("MonitorAnim8", "assets/monitorAnimation/8.png");
        this.load.image("MonitorAnim9", "assets/monitorAnimation/9.png");
        this.load.image("MonitorAnim10", "assets/monitorAnimation/10.png");
        this.load.image("MonitorAnim11", "assets/monitorAnimation/11.png"); 
   
    }

    create() {
        const { width, height } = this.scale;

        // Adjust the width of the office scene (for example, make it 50% wider)
        const newWidth = width * 1.2;

        // Background
        const officeBg = this.add.image(newWidth / 2, height / 2, "officeBg")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(newWidth, height);

        this.add.text(100, 100, "Office View - Press C to Check Cameras", { fontSize: "20px", color: "#fff" });


            //gör så att bakgrunding far fram å tibak som i dömde ader cams
        this.tweens.add({
            targets: officeBg,
            x: { from: width / 2 - 120, to: width / 2 + 120 }, // far 100px från höge ti vänste
            duration: 3500, // tidn 
            ease: "Sine.easeInOut", // Smooth movement
            yoyo: true, // far framåtibak
            repeat: -1 // Loop forever
        });

        this.input.keyboard!.once("keydown-C", () => {
            this.scene.start("CameraScene");
        });

        // höger Door
        this.rightDoor = this.add.rectangle(this.scale.width - 250, 0, 100, this.scale.height, 0x888888)
        .setOrigin(0.5, 0)
        .setAlpha(0.8);

        // vänster Door
        this.leftDoor = this.add.rectangle(250, 0, 100, this.scale.height, 0x888888)
            .setOrigin(0.5, 0)
            .setAlpha(0.8);

        // höger knapp
        const rightButton = this.add.image(width - 250, height - 100, "button")
            .setInteractive()
            .setScale(5);
        rightButton.on("pointerdown", () => {
            this.toggleDoor(this.rightDoor, "right");
        });

        // vänsterx
        const leftButton = this.add.image(150, height - 100, "button")
            .setInteractive()
            .setScale(5);

        leftButton.on("pointerdown", () => {
            this.toggleDoor(this.leftDoor, "left");
        });
    }
    //kod för att öpin dörra höger ele vänster (((thank you gpt )))
    toggleDoor(door: Phaser.GameObjects.Rectangle, side: "left" | "right") {
        const isRight = side === "right";
        const doorClosed = isRight ? this.rightDoorClosed : this.leftDoorClosed;
    
        this.tweens.add({
            targets: door,
            y: doorClosed ? 0 : -this.scale.height + 10, // Moves down further when closing
            duration: 500,
            ease: "Power2"
        });
    
        if (isRight) {
            this.rightDoorClosed = !this.rightDoorClosed;
        } else {
            this.leftDoorClosed = !this.leftDoorClosed;
        }
    }
    
    
    

        // koll om bonnie eller nain ader väntar på att du ska lägg ner kamera för att grape ein
    

    update(time: number, delta: number): void {
        this.state.tick(delta);
        
    }
}

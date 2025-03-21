import Phaser from "phaser";
import GameState from "../gameState";

export class OfficeScene extends Phaser.Scene {
    state: GameState;
    leftDoor!: Phaser.GameObjects.Rectangle;  // Left door
    rightDoor!: Phaser.GameObjects.Rectangle; // Right door
    leftDoorClosed: boolean = false;  
    rightDoorClosed: boolean = false;  
    leftLightOn: boolean = false
    rightLightOn: boolean = false

    officeBg!: Phaser.GameObjects.Image;  // Reference to the background

    constructor() {
        super({ key: "OfficeScene" });
    }

    preload() {
        this.registry.set("GameState", new GameState());
        this.state = this.registry.get("GameState");

        this.load.image("officeBg", "assets/office/1-OFFICE.png"); 
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

        this.load.image("LeftDoor", "assets/office/DOORS/LEFT/14.png")
        this.load.image("RightDoor", "assets/office/DOORS/RIGHT/14.png")
        
        this.load.image("OfficeLeftLight", "assets/office/LEFT_LIGHT.png")
        this.load.image("OfficeRightLight", "assets/office/RIGHT_LIGHT.png")
    }

    create() {
        const { width, height } = this.scale;

        // lagar imaging brejadri men fan jävla 250p)
        const newWidth = width * 1;

        // Background
        const officeBg = this.add.image(newWidth / 2, height / 2, "officeBg")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(newWidth, height);

        this.add.text(100, 100, "Office View - Press C to Check Cameras", { fontSize: "20px", color: "#fff" });

        const lightButton = this.add.image(200, height - 100, "button")
        .setInteractive()
        .setScale(5);
    
        lightButton.on("pointerdown", () => {
            this.toggleLights();
        });

        this.input.keyboard!.once("keydown-C", () => {
            this.scene.start("CameraScene");
        });

        // höger Door
        this.rightDoor = this.add.image(this.scale.width - 250, 0, "RightDoor")
        .setOrigin(0.5, 0)
        .setAlpha(0.8)
        .setDisplaySize(250, this.scale.height)

        // vänster Door
        
        this.leftDoor = this.add.image(200, 0, "LeftDoor")
            .setOrigin(0.5, 0)
            .setAlpha(0.8)
            .setDisplaySize(250, this.scale.height)

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

        //lights
        const leftLightButton = this.add.image(400, height - 50, "button")
            .setInteractive()
            .setScale(5);
        
        leftLightButton.on("pointerdown", () => {
            this.toggleLeftLight();
        });

        // Button to toggle the right light on/off
        const rightLightButton = this.add.image(width - 200, height - 100, "button")
            .setInteractive()
            .setScale(5);
        
        rightLightButton.on("pointerdown", () => {
            this.toggleRightLight();
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
    toggleRightLight() {
        this.rightLightOn = !this.rightLightOn;

        if (this.leftLightOn && this.rightLightOn) {
            // Both lights on
            this.officeBg.setTexture("OfficeRightLight");
        } else if (this.rightLightOn) {
            // Only right light on
            this.officeBg.setTexture("officeRightLight");
        } else if (this.leftLightOn) {
            // Only left light on
            this.officeBg.setTexture("officeLeftLight");
        } else {
            // Both lights off
            this.officeBg.setTexture("officeBg");
        }
    }

    
    

        // koll om bonnie eller nain ader väntar på att du ska lägg ner kamera för att grape ein
    

    update(time: number, delta: number): void {
        this.state.tick(delta);
        
    }
}

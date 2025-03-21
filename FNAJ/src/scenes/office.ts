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
        this.load.image("button", "assets/button.png"); // Load button image
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, "officeBg")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(width, height);

        this.add.text(100, 100, "Office View - Press C to Check Cameras", { fontSize: "20px", color: "#fff" });

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
            y: doorClosed ? 0 : this.scale.height - 10, // Moves down further when closing
            duration: 500,
            ease: "Power2"
        });
    
        if (isRight) {
            this.rightDoorClosed = !this.rightDoorClosed;
        } else {
            this.leftDoorClosed = !this.leftDoorClosed;
        }
    }
    
    
    

    update(time: number, delta: number): void {
        this.state.tick(delta);
    }
}

import Phaser  from "phaser";
import GameState from "../gameState";

export class OfficeScene extends Phaser.Scene {
    state: GameState;

    constructor() {
        super({ key: "OfficeScene" });

    }

    preload() {
        this.registry.set("GameState", new GameState());
        this.state = this.registry.get("GameState");
        this.load.image("officeBg", "assets/office.png");
    }
    create() {
        const {width, height } = this.scale
        let officeBg = this.add.image(width / 2, height / 2, "officeBg")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height)

        this.add.text(100, 100, "Office View - Press C to Check Cameras", { fontSize: "20px", color: "#fff" });

        this.input.keyboard!.once("keydown-C", () => {
            this.scene.start("CameraScene");
        });
    }

    update(time: number, delta: number): void {
        this.state.tick(delta);
    }
}
import "./style.css";
import Phaser from "phaser";
import { MainScene } from "./scenes/main.ts";
import { OfficeScene } from "./scenes/office.ts";
import { CameraScene } from "./scenes/cameras.ts";
import { Camera1Scene } from "./scenes/camera1Scene.ts";

// Select the #app div
const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
    app.innerHTML = `<div id="game-container"></div>`;
}

// Phaser Game Config
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent: "game-container",
    backgroundColor: "#444",
    scene: [MainScene, OfficeScene, CameraScene, Camera1Scene], // Load all scenes
};

// Initialize the game
new Phaser.Game(config);
console.log("hello world");
import "./style.css";
import Phaser from "phaser";
import { MainScene } from "./scenes/main.ts";
import { OfficeScene } from "./scenes/office.ts";
import { CameraScene } from "./scenes/cameras.ts";

// Select the #app div
const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
    app.innerHTML = `<div id="game-container"></div>`;
}

// Phaser Game Config
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    backgroundColor: "#222",
    scene: [MainScene, OfficeScene, CameraScene], // Load all scenes
};

// Initialize the game
new Phaser.Game(config);
console.log("hello world");
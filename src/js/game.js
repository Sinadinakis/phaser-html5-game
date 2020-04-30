import { GameScene } from './Scenes/GameScene'; 
import { MenuScene } from "./Scenes/MenuScene.js";

const width = 800;
const height = 600;

const config = {
    type: Phaser.AUTO,
    width,
    height,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [
		MenuScene, GameScene
    ],
    pixelArt: true,
	roundPixels: true
};

export const game = new Phaser.Game(config);
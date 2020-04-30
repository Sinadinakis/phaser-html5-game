import options from "../../assets/buttons/options.png";
import play from "../../assets/buttons/play.png";
import background from "../../assets/background.png";

// Global variables
let playButton;
let optionsButton;
let topScore;
let sfx;

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene"
        })
    }

    init() {
        topScore = localStorage.getItem("highScore");
    }

    preload() {
        this.load.image("play", play);
        this.load.image("option", options);
        this.load.image("sky" , background);

        this.load.audio("sndButton", "/src/assets/audio/sndBtn.wav");
    }

    create() {      
        this.add.image(0, 0, "sky");
        playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play").setDepth(1);

        playButton.setInteractive();
        playButton.on("pointerup", () => {
            this.sound.add("sndButton").play();
            this.scene.start('GameScene');
        })
    }
}
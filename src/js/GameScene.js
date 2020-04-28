
//Import Assets
import logoImg from "../assets/logo.png";
import spaceCraft from "../assets/spaceCraft.png";
import background from "../assets/background.png";
import platform from "../assets/platform.png";
import star from '../assets/star.png';
import user from '../assets/player.png'
import ground from '../assets/ground.png';
import enemy from '../assets/enemy.png';

// Import Entities
import { Environment } from './Entity';
const width = 800;
const height = 600;

// global variables
let platforms;
let cursors;
let stars;
let player;
let highScore, highScoreText;
let dragon;
let dragonMove;
let lives, livesText;
const stylesText = { font: '30px Pixeltype', fill: '#fff' }

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    init() {
        highScore = 0;
        highScoreText;
        dragonMove = 1;
        lives = 3;
    };


    preload() {
        // Preload some images
        this.load.image("sky", background);
        this.load.image("ground", ground);
        this.load.image("platform", platform);
        this.load.image("star", star);
        this.load.spritesheet("player", user, {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image('dragon', enemy);
    };

    create() {
        platforms = this.physics.add.staticGroup();
        // Enable cursors
        cursors = this.input.keyboard.createCursorKeys();

        this.createEnviroment()
        this.createPlayer()
        this.createMonster();
        this.initCollisionWithObjects()
    }

    update() {
        this.updatePlayerMovement();
        localStorage.highScore = highScore;
        this.updateEnemyMovements();
        if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), dragon.getBounds())) {
            lives--;
            livesText.setText("Lives: " + lives);
            this.end();
        }
    }


    end() {
        if (lives <= 0) {
            this.scene.restart();
        } else {
            this.create();
        }
    };

    // Helper Function (Optimal seperate in another file)
    createEnviroment() {
        this.add.image(0, 0, "sky");

        // Platform elements
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'platform');
        platforms.create(100, 400, 'platform');
        platforms.create(320, 250, 'platform');
        platforms.create(800, 250, 'platform');
        platforms.create(650, 100, 'platform');
        platforms.create(10, 120, 'platform');

        // Stars
        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // High Score
        highScore = localStorage.highScore;
        console.log(highScore);
        if (typeof (Storage) !== "undefined") {
            if (localStorage.highScore === undefined)
                localStorage.setItem('highScore', 0);

            highScoreText = this.add.text(10, 0, 'High Score: ' + localStorage.highScore, stylesText);
            highScoreText.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
        }

        // Lives
        livesText = this.add.text(width - 150, 0, 'Lives: ' + lives, { ...stylesText, fill: 'red' });
        livesText.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
    };

    createPlayer() {
        player = this.physics.add.sprite(100, 450, 'player');
        player.setBounce(0.5);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);

        // Initialize Player Animcation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
    };

    createMonster() {
        // add monster
        dragon = this.add.sprite(350, 150, 'dragon');
        dragon.setScale(0.2);
    }

    updatePlayerMovement() {
        if (cursors.left.isDown) {
            player.body.setVelocityX(-200); // move left
            player.anims.play("left", true);
        }
        else if (cursors.right.isDown) {
            player.body.setVelocityX(200); // move right
            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);
            player.anims.play("turn");
        }
        if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
            player.body.setVelocityY(-500); // jump up
        }
    }

    updateEnemyMovements() {
        if (dragon.x >= 500) {
            // Go up
            dragonMove = -(Math.floor(Math.random() * 4) + 1);;
        } else if (dragon.x <= 100) {
            // Go down
            dragonMove = Math.floor(Math.random() * 4) + 1;
        }

        dragon.x += dragonMove;
    }

    initCollisionWithObjects() {
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, this.collectStars, null, this);
        this.physics.add.overlap(player, dragon, this.loseLives, null, this);
    }

    collectStars(player, star) {
        star.disableBody(true, true);
        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }

        highScore = parseInt(highScore) + 10;
        highScoreText.setText('HighScore: ' + highScore);
    }

    loseLives() {
        lives--;
        liveText.setText("Lives: " + lives);
        this.end();
    }
}

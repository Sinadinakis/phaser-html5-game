export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.setBounce(0.5);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
    }
}

export class AddText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);
        scene.sys.displayList.add(this);
        this.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
    }
}
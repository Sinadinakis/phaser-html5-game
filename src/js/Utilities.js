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

export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
      super(scene, x, y, text, style);
      scene.sys.displayList.add(this);
      this.setShadow(1, 1, 'rgba(0,0,0,1)', 1);
      this.setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() )
        .on('pointerdown', () => this.enterButtonActiveState() )
        .on('pointerup', () => {
          this.enterButtonHoverState();
          callback();
        });
    }
  
    enterButtonHoverState() {
      this.setStyle({ fill: '#ff0'});
    }
  
    enterButtonRestState() {
      this.setStyle({ fill: '#0f0'});
    }
  
    enterButtonActiveState() {
      this.setStyle({ fill: '#0ff' });
    }
  }
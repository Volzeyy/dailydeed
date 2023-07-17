import Phaser from "phaser";

// Goal - create 2D platformer

export default class Game extends Phaser.Scene {
    tileset = [
    ];
    center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2, 
    };
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors;

    constructor() {
        super("game")

        for (let i = 0; i < 13; i++) {
            const blockCount = 54;
            let tempRow = [];

            for (let j = 0; j < blockCount; j++) {
                tempRow.push("x")
            }

            this.tileset.push(tempRow);
        }
    }

    preload() {
        this.load.image("background", "assets/sky_background.png");
        this.load.image("block", "assets/ice_block.png");
        this.load.image("player", "assets/arms_dealer.png")

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.add.image(this.center.x, this.center.y, "background").setScale(1.5).setScrollFactor(0.1, 0.1);

        this.blocks = this.physics.add.staticGroup()

        for (let row = 0; row < this.tileset.length; row++) 
        {
            for (let tile = 0; tile < this.tileset[row].length; tile++) 
            {
                if (this.tileset[row][tile] === "x") {
                    const block = this.blocks.create(this.center.x + (tile * 32) - (this.tileset[0].length * 16), this.center.y + (row * 32), "block").setScale(2);
                    const body = block.body;
                    body.updateFromGameObject();
                }
            }
        }

        this.player = this.physics.add.image(this.center.x, this.center.y - 64, "player").setScale(2)
        this.physics.add.collider(this.blocks, this.player);

        this.cameras.main.startFollow(this.player);
    }

    update() {
        const isTouchingDown = this.player.body.touching.down;

        // xddd
        if (this.cursors.space.isDown && isTouchingDown) {
            this.player.setVelocityY(-400);
        }
        
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else {
            this.player.setVelocityX(0);
        }

    }
}
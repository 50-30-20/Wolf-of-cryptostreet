import Phaser from 'phaser';

export default class USDTKey extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.anims.play('usdtKey-idle')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)
    }

    handleTileCollision(go, tile) {
        if (go !== this) {
            return
        }

        // console.log('collided');
    }
}
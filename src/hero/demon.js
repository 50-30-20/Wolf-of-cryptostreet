import Phaser from 'phaser';

var UP = 'UP'
var DOWN = 'DOWN'
var LEFT = 'LEFT'
var RIGHT = 'RIGHT'
var direction = DOWN
var newDirection


const changeToRandomPath =  () => {
    setInterval( function() { 
        let randomNumber = Phaser.Math.Between(0, 3)
        // console.log(1);

        if (randomNumber === 0) {
            // console.log('true up')
            direction = 'UP'
        }
    
        if (randomNumber === 1) {
            // console.log('true down')
            direction = 'DOWN'
            // console.log(true, 'DOWN');
        } 
    
        if (randomNumber === 2) {
            // console.log('true left')
            direction = 'LEFT'
            // console.log(true, 'LEFT');
        }
    
        if (randomNumber === 3) {
            //console.log('true right')
            direction = 'RIGHT'
            // console.log(true, "RIGHT");
        }

    }, 2000);
}



export default class demon extends Phaser.Physics.Arcade.Sprite { 
    
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.anims.play('demon-run')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)
        changeToRandomPath()
    }

    destroy (fromScene) {
        changeToRandomPath()

        super.destroy(fromScene)
    }

    handleTileCollision(go, tile) {
        if(go !== this) {
            return
        }

        // console.log('collided');
    }

    // handleDamagedemon(obj1, obj2){
    //     const demnObj2 = obj2
    //     const dx = faune.x - demnObj2.x
    //     const dy = faune.y - demonObj.y
    //     const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(200)

    // }
    

    preUpdate(t,dt) {
        super.preUpdate(t, dt)        
        const speed = 0

        switch (direction) {
            case UP:
                this.setVelocity(0, -speed)
                break

            case DOWN:
                this.setVelocity(0, speed)
                break

            case LEFT:
                this.setVelocity(-speed, 0)
                break
            
            case RIGHT:
                this.setVelocity(speed, 0)
                break
        }
    }
}
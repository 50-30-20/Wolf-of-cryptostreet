import Phaser from 'phaser';
// map and tile
import officetile from './assets/officetile.png'
import officemap from './assets/officemap.json'

//sprites
import heroJson from './assets/boy.json'
import heroPng from './assets/boy.png'

import bossJson from './assets/boss.json'
import bossPng from './assets/boss.png'

//animations
import { createCharacterAnims } from './Animations/boyAnims'


var boy;
var boss;
var boss2;
var cursors;

let hit = 0
let count = 0;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('tile', officetile)
        this.load.tilemapTiledJSON('office', officemap)

        this.load.atlas('boy', heroPng, heroJson)
        this.load.atlas('boss', bossPng, bossJson)

        cursors = this.input.keyboard.createCursorKeys();
       
    }
      
    create ()
    {

        createCharacterAnims(this.anims)

        const map = this.make.tilemap({ key: 'office'})
        const tileset = map.addTilesetImage('officeroom', 'tile')

        map.createLayer('Tile Layer 1', [tileset])
        const computers = map.createLayer('computers', [tileset])

        computers.setCollisionByProperty({ collides: true });

        boy = this.physics.add.sprite(300, 300, 'boy')
        boss = this.physics.add.sprite(500, 300, 'boss').setImmovable();

        boss2 = this.physics.add.sprite(700, 300, 'boss').setImmovable();

        // boss = this.physics.add.sprite(100, 450, 'boss');
        this.physics.add.collider(boy, computers)
        this.physics.add.collider(boy, boss)

        this.physics.add.collider(boy, boss2)

        this.physics.add.collider(boy, boss, this.handleBoyBossCollider, undefined, this)
        this.physics.add.collider(boy, boss2, this.handleBoyBoss2Collider, undefined, this)

    
    }

    handleBoyBossCollider(obj1, obj2){
        const bossObj = obj2

        const dx = boy.x - bossObj.x
        const dy = boy.y - bossObj.y
        const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250)
        console.log("dx", dir)

        hit = 1
        if(hit == 1){
        count = count + 1}
            if(hit == 1){
                count = 1
            }
        console.log("hit", hit)
        console.log("count", count)
    } 

    handleBoyBoss2Collider(obj1, obj2){
         boy = obj1
         boss = obj2

        const dx = boy.x - boss.x
        const dy = boy.y - boss.y
        const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250)
        console.log("dx", dir)


        hit = 1
        if(hit == 1){
        count = count - 1}
            if(count == -1){
                count = 0
                hit = 0
            }
        console.log("hitdeduct", hit)
        console.log("countdeduct", count)
    }
   

    update(){       

        if (cursors.left.isDown){
            boy.setVelocity(-200, 0);
            boy.anims.play('boy-run-left', true)
        } 
        else if (cursors.right.isDown){
            boy.setVelocity(200, 0);
            boy.anims.play('boy-run-right', true)
        }
        else if (cursors.up.isDown){
            boy.setVelocity(0, -200);
            boy.anims.play('boy-run-up', true)
        }
        else if (cursors.down.isDown){
            boy.setVelocity(0, 200);
            boy.anims.play('boy-run-down', true)
        }
        else {
            boy.setVelocity(0, 0);
            boy.anims.stop();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 900,
    scene: MyGame,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);

import Phaser, { Actions } from 'phaser';
const _ = require('underscore')
// map and tile
import officetile from './assets/officetile.png'
import officemap from './assets/officemap.json'

//sprites
import Sbtn from './assets/startBTN.png'
import heroJson from './assets/boy.json'
import heroPng from './assets/boy.png'
import bossJson from './assets/boss.json'
import bossPng from './assets/boss.png'

import dkeyJson from './assets/dogeKey.json'
import dkeyPng from './assets/dogeKey.png'

import ekeyJson from './assets/EthKey.json'
import ekeyPng from './assets/EthKEey.png'

import ukeyJson from './assets/unikey.json'
import ukeyPng from './assets/unikey.png'

import UsdtKeyJson from './assets/USDTkey.json'
import UsdtKeyPng from './assets/USDTkey.png'

import DogeKey from './hero/dogeKey';
import EthKey from './hero/ethkey';
import UniKey from './hero/Unikey';
import USDTKey from './hero/usdtkey';

//animations
import { createCharacterAnims } from './Animations/boyAnims'
import { createDogekeyAnims } from './Animations/DogekeyAnims'
import { createUnikeyAnims } from './Animations/unikeyAnims'
import { createUSDTkeyAnims } from'./Animations/usdtAnims'
import { createETHkeyAnims } from './Animations/ethkeyAnims';
import { first, shuffle } from 'underscore';

let speed = 200
var boy
var boss
var boss2
var boss3
var boss4
var boss5
var cursors;

let hit = 0
var dogekeys
var ethkeys
var unikeys
var usdtkeys
let keyDoge = 0
let keyEth = 0
let keyUni = 0
let keyUSDT = 0

let win

let playerArr = []
let finalArr = ['eth', 'doge', 'uni', 'usdt']
let newWin = ['eth', 'doge', 'uni', 'usdt']
var gameover = false

let firstArr = []


var loose
var Sbutton

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

        this.load.image('button', Sbtn, 193, 71)

        this.load.atlas('boy', heroPng, heroJson)
        this.load.atlas('boss', bossPng, bossJson)

        this.load.atlas('dogeKey', dkeyPng, dkeyJson)
        this.load.atlas('ethKey', ekeyPng, ekeyJson)
        this.load.atlas('uniKey', ukeyPng, ukeyJson)
        this.load.atlas('usdtKey', UsdtKeyPng, UsdtKeyJson)

        dogekeys = this.physics.add.group({
            classType: DogeKey,
            createCallback: (go) => {

                /* @type {demon} */
                const keyh = go;
                keyh.body.onCollide = true;
            }
        })

        ethkeys = this.physics.add.group({
            classType: EthKey,
            createCallback: (go) => {

                /* @type {demon} */
                const keyh = go;
                keyh.body.onCollide = true;
            }
        })

        unikeys = this.physics.add.group({
            classType: UniKey,
            createCallback: (go) => {

                /* @type {demon} */
                const keyh = go;
                keyh.body.onCollide = true;
            }
        })

        usdtkeys = this.physics.add.group({
            classType: USDTKey,
            createCallback: (go) => {

                /* @type {demon} */
                const keyh = go;
                keyh.body.onCollide = true;
            }
        })

        // finalArr = ['doge', 'eth', 'uni', 'usdt']
        // console.log('fiAR', finalArr)
<<<<<<< HEAD
        setInterval(()=>{
            finalArr.sort(()=>Math.random() - 0.5);
            shuffle(finalArr)
=======

        // setInterval(()=>{
        //     finalArr.sort(()=>Math.random() - 0.5);
        //     shuffle(finalArr)
>>>>>>> 4b49aa5b0aacd662c1229d16135e9743047025c2
            
            
            this.arrayText = this.add.text(25, 160, finalArr, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
            this.arrayText.setStroke('#000', 6);
            
            setInterval(()=>{
                this.arrayText.destroy()
            }, 7000)
            console.log('fiAR', finalArr)  
        }, 30000)

<<<<<<< HEAD
        // setInterval(()=>{
        //     if(win == true){
        //         playerArr = []
        //         win = false
        //     }
        // }, 32000)
=======
        firstArr = ['doge', 'eth']
        console.log('firstArr', firstArr)
>>>>>>> 4b49aa5b0aacd662c1229d16135e9743047025c2
    
        cursors = this.input.keyboard.createCursorKeys();
    }



    gamee(){
        finalArr.sort(()=>Math.random() - 0.5);
        shuffle(finalArr)
        
        this.arrayText = this.add.text(25, 160, finalArr, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        this.arrayText.setStroke('#000', 6);
        
        setInterval(()=>{
            this.arrayText.destroy()
        }, 4000)
        console.log('fiAR', finalArr) 
       }  
      
    create ()
    {
        createCharacterAnims(this.anims)
        createDogekeyAnims(this.anims)
        createETHkeyAnims(this.anims)
        createUnikeyAnims(this.anims)
        createUSDTkeyAnims(this.anims)
        
        const map = this.make.tilemap({ key: 'office'})
        const tileset = map.addTilesetImage('officeroom', 'tile')

        map.createLayer('Tile Layer 1', [tileset])
        const computers = map.createLayer('computers', [tileset])

        computers.setCollisionByProperty({ collides: true });

        Sbutton = this.add.image(600, 520, 'button')
        Sbutton.setScale(.2)
        Sbutton.setInteractive();
        
        Sbutton.on('pointerdown', ()=> this.restartGame())
        Sbutton.visible = false

        boy = this.physics.add.sprite(200, 300, 'boy')
        boy.body.setSize(boy.width * 1.2, boy.height * 1.1)
       
        boss = this.physics.add.sprite(386, 220, 'boss').setImmovable(true);
        boss.body.setSize(boss.width * 1.2, boss.height * 1.2)
        var stroke = this.bossText = this.add.text(348, 153, "DOGE", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        this.bossText.setStroke('#000', 6);
        
        boss2 = this.physics.add.sprite(690, 220, 'boss').setImmovable();
        this.boss2Text = this.add.text(620, 153, "ETHEREUM", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        this.boss2Text.setStroke('#000', 6);
        
        boss3 = this.physics.add.sprite(386, 665, 'boss').setImmovable();
        boss3.body.setSize(boss3.width * 1.2, boss3.height * 1.3)
        this.boss3Text = this.add.text(330, 600, "UNISWAP", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        this.boss3Text.setStroke('#000', 6);

        boss4 = this.physics.add.sprite(925, 665, 'boss').setImmovable();
        boss4.body.setSize(boss4.width * 1.2, boss4.height * 1.3)
        this.boss4Text = this.add.text(892, 600, "USDT", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        this.boss4Text.setStroke('#000', 6);

        boss5 = this.physics.add.sprite(925, 220, 'boss').setImmovable();
        boss5.body.setSize(boss5.width * 1.2, boss5.height * 1.3)
        this.boss5Text = this.add.text(880, 150, "BROKER", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        this.boss5Text.setStroke('#000', 6);

        var style = { font: "65px Arial", fontweight: 600, fill: "#000000", align: "center" };
        this.gameOverText = this.add.text(600, 420, 'GAME OVER', style)
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        // this.dogeText = this.add.text(20, 20, "Doge Coin:" + dogeCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        // this.dogeText.setStroke('#000', 6);

        // this.ethText = this.add.text(20, 60, "Ethereum Coin:" + etherumCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        // this.ethText.setStroke('#000', 6);

        // this.uniText = this.add.text(20, 100, "Uniswap Coin:" + UniSwapCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        // this.uniText.setStroke('#000', 6);
        
        // this.USDTText = this.add.text(20, 140, "USDT Coi n:" + USDTCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        // this.USDTText.setStroke('#000', 6);

        this.physics.world.setBounds(0, 0, 2000, 2000)
        this.cameras.main.setBounds(0, 0, 2000, 2000)
        this.cameras.main.startFollow(boy, true, 0.5, 0.5);

        this.physics.add.collider(boy, computers)
    
        this.physics.add.collider(boy, boss)
        this.physics.add.collider(boy, boss2)
        this.physics.add.collider(boy, boss3)
        this.physics.add.collider(boy, boss4)
        this.physics.add.collider(boy, boss5)

        this.physics.add.collider(boy, boss, this.handleBoyBossCollider, undefined, this)
        this.physics.add.collider(boy, boss2, this.handleBoyBoss2Collider, undefined, this)
        this.physics.add.collider(boy, boss3, this.handlePlayerBoss3UNICollider, undefined, this)
        this.physics.add.collider(boy, boss4, this.handleBoyUSDTCollider, undefined, this)
        this.physics.add.collider(boy, boss5, this.handleBoyBoss5Collide, undefined, this)

        this.physics.add.collider(boy, ethkeys, this.handlePlayerkeyEthCollide, undefined, this)
        this.physics.add.collider(boy, dogekeys, this.handleBoyKeyCollide, undefined, this)
        this.physics.add.collider(boy, unikeys, this.handlePlayerUniKeyCollide, undefined, this)
        this.physics.add.collider(boy, usdtkeys, this.handlePlayerUSDTkeyCollide, undefined, this)

        setTimeout(()=>{
            this.gamee();
        }, 3000)
    }

    restartGame(){
        this.input.on('pointerdown', ()=> location.reload()) 
        console.log('game restarted')
    }
  
    
    handleBoyBossCollider(obj1, obj2){ 
        hit = hit + 1
        console.log('hit: 276', hit)
        dogekeys.get(obj2.x + 32, obj2.y + 48, 'dogekey').setImmovable();    
    }   

    handleBoyKeyCollide(obj1, obj2){
        if(keyDoge == 0){
            keyDoge = keyDoge + 1
            playerArr.push('doge')
        }
        console.log("keyDoge", keyDoge)
        console.log("playerArD", playerArr)

        if(keyDoge === 1){
            obj2.destroy();
        }
    }

    handleBoyBoss2Collider(obj1, obj2){
        hit
        console.log("hit", hit)
        ethkeys.get(obj2.x + 28, obj2.y + 48, 'ethKey').setImmovable();     
    }
   
    handlePlayerkeyEthCollide(obj1, obj2){
        if(keyEth == 0){
            keyEth = keyEth + 1
            playerArr.push('eth')
            obj2.visible = true
            console.log("keyEth", keyEth)
            console.log("playArrEth", playerArr)
        }
        if(keyEth === 1){
            obj2.destroy();
        }
    }


    handlePlayerBoss3UNICollider(obj1, obj2){
        hit
        console.log("hit", hit)
        unikeys.get(obj2.x + 28, obj2.y + 48, 'uniKey').setImmovable();
    }

    handlePlayerUniKeyCollide(obj1, obj2){
        if(keyUni == 0){
            keyUni = keyUni + 1
            playerArr.push('uni')
            obj2.visible = true
            console.log("keyuni", keyUni)
            console.log("playArruni", playerArr)
        }
        if(keyUni === 1){
            obj2.destroy();
        }
    }

    handleBoyUSDTCollider(obj1, obj2){
        hit 
        console.log("hit", hit)
        usdtkeys.get(obj2.x + 28, obj2.y + 48, 'usdtKey').setImmovable();
    }

    handlePlayerUSDTkeyCollide(obj1, obj2){
        if(keyUSDT == 0){
            keyUSDT = keyUSDT + 1
            playerArr.push('usdt')
            obj2.visible = true
            console.log("keyusdt", keyUSDT)
            console.log("playArrusdt", playerArr)
        }
        if(keyUSDT == 1){
            obj2.destroy();
        }
    }

    handleBoyBoss5Collide(obj1, obj2){
        if(keyDoge == 1){
            keyDoge = keyDoge - 1
        }
        if(keyEth == 1){
            keyEth = keyEth - 1
        }
        if(keyUni == 1){
            keyUni = keyUni - 1
        }
        console.log('keyminusD', keyDoge)
  
        const arr = _.isEqual(playerArr, finalArr)
        console.log("nice", arr)
        if(arr == true){
            setTimeout(()=>{
                this.gamee();
                playerArr = []
            }, 3000)
            
            console.log("win first array")
        }else{
            this.physics.pause();
            this.gameOverText.visible = true
            Sbutton.visible = true
            this.registry.destroy();
            console.log("losse first arr")
        }
        

        // const arr = _.isEqual(playerArr, finalArr)
        // console.log('arr', arr)

        // if(arr === true){
        //     win = true
        //     playerArr = []
        //     gamee();
        //     console.log('win')
        //     console.log('playerArr', playerArr) 
        // }

        // if(arr === false){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     Sbutton.visible = true
        //     this.registry.destroy();
        //     console.log('losser')
        // }
    }

    // check(){
    //     setTimeout(()=>{
    //         const win = () =>{
    //             if(arr == true){
    //                 win = true
    //                 setTimeout(()=>{
    //                     this.gamee();
    //                     playerArr = []
    //                 }, 3000)
                    
    //                 console.log("win first array")
    //             }else{
    //                 this.physics.pause();
    //                 this.gameOverText.visible = true
    //                 Sbutton.visible = true
    //                 this.registry.destroy();
    //                 console.log("losse first arr")
    //             }
    //         }
    //         setInterval(()=>{
    //             win();
    //         }, 4000)
    //     }, 4000)
    // }
    
    update(){   
        
        if (cursors.left.isDown){
            boy.setVelocity(-speed, 0);
            boy.anims.play('boy-run-left', true)
        } 
        else if (cursors.right.isDown){
            boy.setVelocity(speed, 0);
            boy.anims.play('boy-run-right', true)
        }
        else if (cursors.up.isDown){
            boy.setVelocity(0, -speed);
            boy.anims.play('boy-run-up', true)
        }
        else if (cursors.down.isDown){
            boy.setVelocity(0, speed);
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

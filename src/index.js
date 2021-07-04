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
var boss3;
var boss4;
var cursors;

var timeoutDoge;
var timeoutEth;
var timeoutUNI;
var timeoutUSDT;


// 
var doge = false
console.log("intiDOGE", doge)
var eth = false
console.log("intiETH", eth)
var uniswap = false
console.log("intiUNI", uniswap)
var USDT = false
console.log("intiUSDT", USDT )

let hit = 0
let count = 0;

let dogeCoin = 0;
let etherumCoin = 0;
let UniSwapCoin = 0;
let USDTCoin = 0;

var Random = 300;

let collide = false;

// do not touch
const d = 5
const e = 10

const u = 15
const usdt = 20

const coin1 = 21
const coin2 = 22
//

let dogeCount = 0
let coins = ['doge', 'eth', 'uni', 'usdt']
let marketArr = []

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

       

        timeoutDoge = () =>{
            console.log("doge")
        };

        timeoutEth = () =>{
            // etherumCoin = 0
            console.log("ETH")
        }

        timeoutUNI = () =>{
            // UniSwapCoin = 0
            console.log("uniswapcoin", UniSwapCoin)
        }

        timeoutUSDT = () =>{
            // USDTCoin = 0
            console.log("USDTCoin", USDTCoin)
        }
  

        const NB = function some(){
            var UUSDT = Math.round(Math.random(u, usdt))
            if(UUSDT == 1){
                timeoutUNI();
                alert("UniSwap that boii!!")
                uniswap = true

                doge = false
                eth = false
                USDT = false
            }

            if(UUSDT == 0){
                timeoutUSDT();
                alert("USDT matafaka")
                USDT = true

                doge = false
                eth = false
                uniswap = false
            }
        }

        const SA = function saak(){
            var ED = Math.round(Math.random(d, e));
            if(ED == 1){
                // timeoutDoge();
                alert("doge is on FIRE!!!")
                
                doge = true
                eth = false
                USDT = false
                uniswap = false      
            }
            
            if(ED == 0){
                // timeoutEth();
                alert("ETH is the WAY!!")
        
                eth = true
                doge = false
                USDT = false
                uniswap = false
            }
           
            //let crypto =  Math.random(timeoutDoge(), timeoutEth()
        }

        setInterval(()=>{
            const crypto = function crpto(){
                var COINS = coins[Math.floor(Math.random() * coins.length)]
                marketArr.push(COINS);
                console.log('arr', marketArr)
                console.log('COINS', COINS)
            }
            crypto();
        }, 4000)

        setInterval(()=>{
            var mainSelector = Math.round(Math.random(coin1, coin2));
            
            if(mainSelector == 0){
                NB();
            }else{
            //     mainSelector == 1
                 SA();}
            //  }
           
            console.log("mainselector", mainSelector)
        }, 15000)

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

        boy = this.physics.add.sprite(200, 300, 'boy')
        boy.body.setSize(boy.width * 1.2, boy.height * 1.1)

        boss = this.physics.add.sprite(386, 220, 'boss').setImmovable();
        boss.body.setSize(boss.width * 1.2, boss.height * 1.2)
        var stroke = this.bossText = this.add.text(348, 153, "DOGE", {fontSize: "28px",fontweight:"bold", fill: "#fff"})
        

        boss2 = this.physics.add.sprite(690, 220, 'boss').setImmovable();
        
        

        boss3 = this.physics.add.sprite(386, 665, 'boss').setImmovable();
        boss3.body.setSize(boss3.width * 1.2, boss3.height * 1.3)

        boss4 = this.physics.add.sprite(925, 665, 'boss').setImmovable();
        boss4.body.setSize(boss4.width * 1.2, boss4.height * 1.3)


        var style = { font: "65px Arial", fontweight: 600, fill: "#000000", align: "center" };
        this.gameOverText = this.add.text(600, 420, 'GAME OVER', style)
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        this.dogeText = this.add.text(20, 20, "Doge Coin:" + dogeCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        this.dogeText.setStroke('#000', 6);

        this.ethText = this.add.text(20, 60, "Ethereum Coin:" + etherumCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        this.ethText.setStroke('#000', 6);

        this.uniText = this.add.text(20, 100, "Uniswap Coin:" + UniSwapCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        this.uniText.setStroke('#000', 6);
        
        this.USDTText = this.add.text(20, 140, "USDT Coin:" + USDTCoin, {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        this.USDTText.setStroke('#000', 6);

        this.animText = this.add.text(20, 180, 'DOGE', {fontSize: '32px', fontweight: 'bold', fill: '#fff'})
        
        this.animText.setStroke('#000', 6);



        this.physics.add.collider(boy, computers)
        this.physics.add.collider(boy, boss)
        


        this.physics.add.collider(boy, boss2)
        this.physics.add.collider(boy, boss3)
        this.physics.add.collider(boy, boss4)

        this.physics.add.collider(boy, boss, this.handleBoyBossCollider, undefined, this)
        this.physics.add.collider(boy, boss2, this.handleBoyBoss2Collider, undefined, this)
        this.physics.add.collider(boy, boss3, this.handlePlayerBoss3UNICollider, undefined, this)
        this.physics.add.collider(boy, boss4, this.handleBoyUSDTCollider, undefined, this)
        
       
        // timeoutDoge();
        // timeoutEth();
    }
    
    handleBoyBossCollider(obj1, obj2){        
        hit
    
        console.log('hit', hit)

        if(doge == true){
            dogeCoin = dogeCoin + 1
            this.dogeText.setText("doge:" + dogeCoin)
            
            console.log("doge+", dogeCoin)   
        }
       
        if(eth == true){
            this.physics.pause();
            this.gameOverText.visible = true

            dogeCoin = dogeCoin - 1
            console.log("eth_tr_!doge", dogeCoin)
            
        }

        if(uniswap == true){
            this.physics.pause();
            this.gameOverText.visible = true
            dogeCoin = dogeCoin - 1
            console.log("uniswap_tr_!doge", dogeCoin)
        }

        if(USDT == true){
            this.physics.pause();
            this.gameOverText.visible = true
            dogeCoin = dogeCoin - 1
            console.log("USDT_tr_!doge", dogeCoin)
        }
    } 

    handleBoyBoss2Collider(obj1, obj2){

        hit
        console.log("hit", hit)

        if(eth == true){
            etherumCoin = etherumCoin + 1
            this.ethText.setText("Ethereum coin:" + etherumCoin)
            console.log("ethcoin", etherumCoin)
            
        }

        if(doge == true){
            this.physics.pause();
            this.gameOverText.visible = true
            etherumCoin = etherumCoin - 1
            console.log("doge_tr_!eth", etherumCoin)
        }

        if(uniswap == true){
            this.physics.pause();
            this.gameOverText.visible = true
            etherumCoin = etherumCoin - 1
            console.log("uniswap_tr_!eth", etherumCoin)
        }

        if(USDT == true){
            this.physics.pause();
            this.gameOverText.visible = true
            etherumCoin = etherumCoin - 1
            console.log("USDT_tr_!eth", etherumCoin)
        }
    }

    handlePlayerBoss3UNICollider(obj1, obj2){
        hit
        console.log("hit", hit)

        if(uniswap == true){
            UniSwapCoin = UniSwapCoin + 1
            this.uniText.setText("Uniswap coin:" + UniSwapCoin)
            console.log("uniswap coin", UniSwapCoin)
        }

        if(doge == true){
            this.physics.pause();
            this.gameOverText.visible = true
           UniSwapCoin = UniSwapCoin - 1
            console.log("doge_tr_!uniswap",UniSwapCoin)
        }

        if(eth == true){
            this.physics.pause();
            this.gameOverText.visible = true
            UniSwapCoin = UniSwapCoin - 1
            console.log("eth_tr_!uniswap", UniSwapCoin)
        }

        if(USDT == true){
            this.physics.pause();
            this.gameOverText.visible = true
            UniSwapCoin = UniSwapCoin - 1
            console.log("USDT_tr_!uniswap", UniSwapCoin)
        }
    }

    handleBoyUSDTCollider(obj1, obj2){
        hit 
        console.log("hit", hit)

        if(USDT == true){
           
            USDTCoin = USDTCoin + 1
            this.USDTText.setText("USDT coin:" + USDTCoin)
            console.log("USDTcoin", USDTCoin)
        }

        if(doge == true){
            this.physics.pause();
            this.gameOverText.visible = true
            USDTCoin = USDTCoin - 1
            console.log("doge_tr_!USDT",USDTCoin)
        }

        if(eth == true){
            this.physics.pause();
            this.gameOverText.visible = true
            USDTCoin = USDTCoin - 1
            console.log("eth_tr_!USDT", USDTCoin)
        }

        if(uniswap == true){
            this.physics.pause();
            this.gameOverText.visible = true
            USDTCoin = USDTCoin - 1
            console.log("uniswap_tr_!USDT", USDTCoin)
        }

    }

    strokeCheck(){
        setInterval(()=>{
            if(doge == true){
                this.bossText.setStroke('#000', 6);
            }
            if(doge == false){
                this.bossText.setStroke('#000', 0);
            }
             
        },15000)
    }

   

    update(){   
        this.strokeCheck(); 

        
        
        if(collide === true){
            collide = false
        }

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
// setInterval(()=>{
//     console.log("fiDOGE", doge)
//     console.log("fiETH", eth)
// }, 3000)


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

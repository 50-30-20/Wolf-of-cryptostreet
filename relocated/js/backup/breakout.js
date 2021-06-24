
var cursors;
var _health = 3
var boy;
var boss;
var bman;
let speed = 150;

var simon; 
var item;

var N = 1;
var userCount = 0;
var currentCount = 0;
var sequenceCount = 16;
var sequenceList = [];
var simonSez = false;
var timeCheck;
var litSquare;
var winner;
var loser;
var intro;
var tween;

let coin = 0;
console.log('coin', coin)

let doge = Phaser.Math.Between(10, 20);
console.log('doge', doge)

var Breakout = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Breakout ()
    {
        Phaser.Scene.call(this, { key: 'breakout' });
        
        // this.bricks;
        // this.paddle;
        // this.ball;
    },

// class Breakout extends Phaser.Scene{
//     constructor(){
//         super();
//     }


    preload()
    {
        this.load.image('assets', 'assets/officetile.png')
        this.load.tilemapTiledJSON('office', 'assets/officemap.json')

        this.load.atlas('boy', 'assets/boy.png', 'assets/boy.json')
        this.load.atlas('boss', 'assets/boss.png', 'assets/boss.json')

        this.load.image('bman', 'assets/businessman_anims_f1 (1).png')
        this.load.image('bman6', 'assets/bmwg_anims_f0 (2).png')
        
        this.load.spritesheet('item', 'assets/number-buttons.png',{ frameWidth: 160, frameHeight: 145});
        
        // this.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json');
    },

    create()
    {
        const map = this.make.tilemap({ key: 'office'})
        const tileset = map.addTilesetImage('officeroom','assets')
        //  Enable world bounds, but disable the floor
        //this.physics.world.setBoundsCollision(true, true, true, false);
        map.createLayer('Tile Layer 1',[tileset])
        const computers = map.createLayer('computers',[tileset])

        computers.setCollisionByProperty({ collides: true });

        simon = this.add.group();
        simon.alpha = 0;
        // var item;
    
        for (var i = 0; i < 3; i++){
            item = simon.create(150 + 168 * i, 150, 'item', i).setInteractive();
            item.alpha = 0;
            item.inputEnabled = true;
            item.on('pointerdown', function (pointer) {
                this.setTint(0xff0000);
            });

            item.on('pointerup', function (pointer) {
                this.clearTint();
            });


            var style = {font: "64px", fill: "#ff0044"}
            var text = this.add.text(200, 200, "phaser 3 rox", style)
            text.alpha = 0.1;
            this.tweens.add({targets: text, scaleX: 1, scaleY: 1, alpha: 1, duration: 6000, flipX: true})

            this.tweens.add({targets: item, alpha: 1, duration: 6000})


            // this.add.tween(simon).to({alpha:1}, 2000, "Linear", true);

            // var flashing = this.add.tween(simon.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
            // var final = this.add.tween(simon.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);
        
            // flashing.chain(final);
            // flashing.start()

            // tween = this.tweens.add({targets: simon, alpha: 1, ease: 'Linear', duration: 1000, yoyo: false})


            // text = game.add.text(250, 16, '', {
            //     fill: '#ffffff'});
            // item.events.onInputDown.add(listener, this);
            // item.input.start(0, true);
            // item.events.onInputDown.add(select);
            // item.events.onInputUp.add(release);
            // item.events.onInputOut.add(moveOff);
            // simon.getAt(i).alpha = 0;
        }

        for (var i = 0; i < 3; i++){
            item = simon.create(150 + 168 * i, 318, 'item', i + 3);
        }

        // introTween();
        // Setup();
        // setTimeout(function(){simonSequence(); intro = false;}, 6000);


        this.boy = this.physics.add.sprite(40, 330, 'boy')
        this.boy.alpha = 0.5;
        this.bman = this.physics.add.image(140, 210, 'bman')
        this.bman4 = this.physics.add.image(220, 450, 'bman6')

        this.boss = this.physics.add.sprite(300, 300, 'boss').setImmovable()

        // this.simon = this.physics.add.sprite(500, 1000, 'item')
        // this.simon.body.setSize(this.simon.width * 20, this.simon.height * 20)

        this.physics.add.collider(this.boy, computers)
        this.physics.add.collider(this.boy, this.boss)
        this.physics.add.collider(this.boy, this.boss, this.handlePlayerBossCollision, undefined, this)
        
        cursors = this.input.keyboard.createCursorKeys();

        const createCharacterAnims = (anims) => {
            anims.create({
                key: 'boy-run-down',
                frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_f', suffix: '.png' }),
                repeat: -1,
                frameRate: 8
            })
        
            anims.create({
                key: 'boy-run-up',
                frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_up_f', suffix: '.png' }),
                repeat: -1,
                frameRate: 8
            })
        
            anims.create({
                key: 'boy-run-left',
                frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_left_f', suffix: '.png' }),
                repeat: -1,
                frameRate: 8
            })
        
            anims.create({
                key: 'boy-run-right',
                frames: anims.generateFrameNames('boy', { start: 0, end: 3, prefix: 'boy_anims_right_f', suffix: '.png' }),
                repeat: -1,
                frameRate: 8
            })
        }

        createCharacterAnims(this.anims)

        //  Create the bricks in a 10x6 grid
        // this.bricks = this.physics.add.staticGroup({
        //     key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
        //     frameQuantity: 10,
        //     gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        // });

    //     this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
    //     this.ball.setData('onPaddle', true);

    //     this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();

    //     //  Our colliders
    //     this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    //     this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        //  Input events
        // this.input.on('pointermove', function (pointer) {

        //     //  Keep the paddle within the game
        //     this.boy.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        //     this.boy.anims.play('boy-run-up', true)

        //     // if (this.boy.getData('onPaddle'))
        //     // {
        //     //     this.boy.x = this.boy.x;
        //     // }

        // }, this);

        // this.input.on('pointermove', function (pointer) {

        //     this.boy.y = Phaser.Math.Clamp(pointer.y, 52, 748);

        //     // if (_health > 0) {
        //     //     speed
        //     //     if (pointer) {
        //             this.boy.anims.play('boy-run-left', true)
                //     this.boy.setVelocity(-speed, 0)
    
                //     this.boy.scaleX = -1
                //     this.boy.body.offset.x = 24
                // }}

            // if (this.ball.getData('onPaddle'))
            // {
            //     this.ball.setVelocity(-75, -300);
            //     this.ball.setData('onPaddle', false);
            // }

        // }, this);
    // },

    // hitBrick: function (ball, brick)
    // {
    //     brick.disableBody(true, true);

    //     if (this.bricks.countActive() === 0)
    //     {
    //         this.resetLevel();
    //     }
    // },

    // resetBall: function ()
    // {
    //     this.ball.setVelocity(0);
    //     this.ball.setPosition(this.paddle.x, 500);
    //     this.ball.setData('onPaddle', true);
    // },

    // resetLevel: function ()
    // {
    //     this.resetBall();

    //     this.bricks.children.each(function (brick) {

    //         brick.enableBody(false, 0, 0, true, true);

    //     });
    // },

    // hitPaddle: function (ball, paddle)
    // {
    //     var diff = 0;

    //     if (ball.x < paddle.x)
    //     {
    //         //  Ball is on the left-hand side of the paddle
    //         diff = paddle.x - ball.x;
    //         ball.setVelocityX(-10 * diff);
    //     }
    //     else if (ball.x > paddle.x)
    //     {
        //     //  Ball is on the right-hand side of the paddle
        //     diff = ball.x -paddle.x;
        //     ball.setVelocityX(10 * diff);
        // }
        // else
        // {
        //     //  Ball is perfectly in the middle
        //     //  Add a little random X to stop it bouncing straight up!
        //     ball.setVelocityX(2 + Math.random() * 8);
        // }
        this.physics.world.setBounds(0, 0, 2000, 2000)
        this.cameras.main.setBounds(0, 0, 2000, 2000)
        this.cameras.main.startFollow(this.boy, true, 0.5, 0.5)

    },

    handlePlayerBossCollision(obj1, obj2){
        boss = obj2

        const dx = this.boy.x - boss.x
        const dy = this.boy.y - boss.y
        const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(250)

        this.boy.setVelocity(dir.y, dir.x)
        this.boy.setTint(0xff0000)

        if(coin == 0){
            coin += 1;
            return
            
        }
        console.log("coin", coin)
    },

    

    update()
    {   
        if (cursors.left.isDown){
            this.boy.setVelocity(-200, 0);
            this.boy.anims.play('boy-run-left', true)
        } 
        else if (cursors.right.isDown){
            this.boy.setVelocity(200, 0);
            this.boy.anims.play('boy-run-right', true)
        }
        else if (cursors.up.isDown){
            this.boy.setVelocity(0, -200);
            this.boy.anims.play('boy-run-up', true)
        }
        else if (cursors.down.isDown){
            this.boy.setVelocity(0, 200);
            this.boy.anims.play('boy-run-down', true)
        }
        else {
            this.boy.setVelocity(0);
            this.boy.anims.stop();
        } 
    }    
});

var config = {
    type: Phaser.WEBGL,
    width: 1700,
    height: 1100,
    parent: 'phaser-example',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);

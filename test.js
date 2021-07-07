// let coins = ['doge', 'eth', 'uni', 'usdt']
// let marketArr = []
// let win = 0

// const main = async (userAns) =>{
//     const random = coins[Math.floor(Math.random() * coins.length)];
//     marketArr.push(random);
//     if(userAns === "doge"){
//         const random2 =  coins[Math.floor(Math.random() * coins.length)];
//         marketArr.push(random2)
//         console.log('rand2', marketArr)
//     }
//     console.log('random', random)
// }

// main('doge');
////////////////////////////////////////
var coins = ['doge', 'eth', 'uniswap', 'USDT']
marketArr = []
newArr = []
let level = 0;

setInterval(()=>{
    const main = async (userAns) =>{
        const random = coins[Math.floor(Math.random() * coins.length)];
        marketArr.push(random);
        
            if(userAns === "doge"){
                const random2 =  coins[Math.floor(Math.random() * coins.length)];
                marketArr.push(random2)
                console.log('rand2', marketArr)
            }

            console.log('random', random)
        }
        main('doge');
}, 5000)
//////////////////////////////////////////





   // const NB = function some(){
        //     var UUSDT = Math.round(Math.random(u, usdt))
        //     if(UUSDT == 1){
        //         timeoutUNI();
        //         alert("UniSwap that boii!!")
        //         uniswap = true

        //         doge = false
        //         eth = false
        //         USDT = false
        //     }

        //     if(UUSDT == 0){
        //         timeoutUSDT();
        //         alert("USDT matafaka")
        //         USDT = true

        //         doge = false
        //         eth = false
        //         uniswap = false
        //     }
        // }

        // const SA = function saak(){
        //     var ED = Math.round(Math.random(d, e));
        //     if(ED == 1){
        //         // timeoutDoge();
        //         alert("doge is on FIRE!!!")
                
        //         doge = true
        //         eth = false
        //         USDT = false
        //         uniswap = false      
        //     }
            
        //     if(ED == 0){
        //         // timeoutEth();
        //         alert("ETH is the WAY!!")
        
        //         eth = true
        //         doge = false
        //         USDT = false
        //         uniswap = false
        //     }
           
        //     //let crypto =  Math.random(timeoutDoge(), timeoutEth()
        // }

        
   // setInterval(()=>{
        //     var mainSelector = Math.round(Math.random(coin1, coin2));
            
        //     if(mainSelector == 0){
        //         NB();
        //     }else{
        //     //     mainSelector == 1
        //          SA();}
        //     //  }
           
        //     console.log("mainselector", mainSelector)
        // }, 15000)


        ///////////////////////////////////////////
        // if(doge == true){
        //     dogeCoin = dogeCoin + 1
        //     // this.dogeText.setText("doge:" + dogeCoin)
   
        //     console.log("doge+", dogeCoin)   
        // }
       
        // if(eth == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     gameover = true
        //     console.log('game over', gameover)

        //     dogeCoin = dogeCoin - 1
        //     console.log("eth_tr_!doge", dogeCoin)
            
        // }

        // if(uniswap == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     dogeCoin = dogeCoin - 1
        //     console.log("uniswap_tr_!doge", dogeCoin)
        // }

        // if(USDT == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     dogeCoin = dogeCoin - 1
        //     console.log("USDT_tr_!doge", dogeCoin)
        // }

        ///////////////////////////////////////////////////////////////

        // if(eth == true){
        //     etherumCoin = etherumCoin + 1
        //     // this.ethText.setText("Ethereum coin:" + etherumCoin)
        //     console.log("ethcoin", etherumCoin)
        // }

        // if(doge == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     etherumCoin = etherumCoin - 1
        //     console.log("doge_tr_!eth", etherumCoin)
        // }

        // if(uniswap == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     etherumCoin = etherumCoin - 1
        //     console.log("uniswap_tr_!eth", etherumCoin)
        // }

        // if(USDT == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     etherumCoin = etherumCoin - 1
        //     console.log("USDT_tr_!eth", etherumCoin)
        // }

        /////////////////////////////////////////////////////////////////////

        // if(uniswap == true){
        //     UniSwapCoin = UniSwapCoin + 1
        //     // this.uniText.setText("Uniswap coin:" + UniSwapCoin)
        //     console.log("uniswap coin", UniSwapCoin)
        // }

        // if(doge == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //    UniSwapCoin = UniSwapCoin - 1
        //     console.log("doge_tr_!uniswap",UniSwapCoin)
        // }

        // if(eth == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     UniSwapCoin = UniSwapCoin - 1
        //     console.log("eth_tr_!uniswap", UniSwapCoin)
        // }

        // if(USDT == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     UniSwapCoin = UniSwapCoin - 1
        //     console.log("USDT_tr_!uniswap", UniSwapCoin)
        // }

        ////////////////////////////////////////////////////////////////////////////

        // if(USDT == true){
           
        //     USDTCoin = USDTCoin + 1
        //     // this.USDTText.setText("USDT coin:" + USDTCoin)
        //     console.log("USDTcoin", USDTCoin)
        // }

        // if(doge == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     USDTCoin = USDTCoin - 1
        //     console.log("doge_tr_!USDT",USDTCoin)
        // }

        // if(eth == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     USDTCoin = USDTCoin - 1
        //     console.log("eth_tr_!USDT", USDTCoin)
        // }

        // if(uniswap == true){
        //     this.physics.pause();
        //     this.gameOverText.visible = true
        //     USDTCoin = USDTCoin - 1
        //     console.log("uniswap_tr_!USDT", USDTCoin)
        // }

        /////////////////////////////////////////////////////////////////////

        // strokeCheck(){
            //     setInterval(()=>{
            //         if(doge == true){
            //             this.bossText.setStroke('#000', 6);
            //             this.animText.visible = true;
            //         }
            //         if(doge == false){
            //             this.bossText.setStroke('#000', 0);
                        
            //         }
        
            //         if(eth == true){
            //             this.boss2Text.setStroke('#000', 6)
            //         }
            //         if(eth == false){
            //             this.boss2Text.setStroke('#000', 0);
            //         }
        
            //         if(uniswap == true){
            //             this.boss3Text.setStroke('#000', 6)
            //         }
            //         if(uniswap == false){
            //             this.boss3Text.setStroke('#000', 0);
            //         }
        
            //         if(USDT == true){
            //             this.boss4Text.setStroke('#000', 6)
            //         }
            //         if(USDT == false){
            //             this.boss4Text.setStroke('#000', 0);
            //         }
            //     },15)  
            // }
        
            // gameRestart(){
            //     if(gameover == true){
        
            //     }
            // }

////////////////////////////////////////////////////////////////////////////////////////////////////
            // setInterval(()=>{
        //     const crypto = function crpto(){

        //         // const sequence = function sequencee(){
        //         //     COINS = coins[Math.floor(Math.random() * coins.length)]
        //         //     marketArr.push(COINS);
    
        //         //     randomCoinarr = random.push(marketArr)
        //         //     console.log('random', random)
        //         //     console.log('random', randomCoinarr)
    
        //         //     newCoinArr = random[Math.floor(Math.random()) * random.length]
        //         //     console.log('newcoinARRAY', newCoinArr)
        //         // }
        //         // sequence();



        //         // if(COINS == 'doge'){
        //         //     doge = true
        //         //     eth = false
        //         //     uniswap = false
        //         //     USDT = false
        //         // }

        //         // if(COINS == 'eth'){
        //         //     eth = true
        //         //     doge = false
        //         //     uniswap = false
        //         //     USDT = false
        //         // }
                
        //         // if(COINS == 'uni'){
        //         //     uniswap = true
        //         //     eth = false
        //         //     doge = false
        //         //     USDT = false
        //         // }

        //         // if(COINS == 'usdt'){
        //         //     USDT = true
        //         //     uniswap = false
        //         //     eth = false
        //         //     doge = false
        //         // }
        //         // console.log('marketarr', marketArr)
        //         // console.log('COINS', COINS)
        //     }
            
        //     crypto();
        // }, 10000)
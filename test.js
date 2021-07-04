let coins = ['doge', 'eth', 'uni', 'usdt']
let marketArr = []
let win = 0

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
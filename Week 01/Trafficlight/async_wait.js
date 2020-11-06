let red = document.getElementById("red")
let yellow = document.getElementById("yellow")
let green = document.getElementById("green")
let lightArray = ["red", "yellow", "green"]

function changeLightByColor(color){
    for (v of lightArray){
        if (v !== color){
           if(window[v]) {
               window[v].classList.remove(v)
           }
        }
    }
    window[color].classList.add(color)
    console.log(`change ${color}`)
}

let lightTimeMap = new Map();
lightTimeMap.set('red', 1000)
lightTimeMap.set('yellow', 2000)
lightTimeMap.set('green', 3000)

// callback 时间不好控制
    // red

function sleep(t){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, t);
    })
}

function happen(element, eventName){
    return new Promise(((resolve, reject) => {
        element.addEventListener(eventName, resolve)
    }))
}
// async 的版本对promise sleep的封装没有任何变化

// 给函数添加async关键字
async function go(){
   while(true){
       changeLightByColor('green');
       //await 等待一个promise 的结束
       //本质上是语法糖，async await 支持了用同步的逻辑来写异步的代码
       //所有的aync 函数逐级调用到最内层一定 会有一个 Promise函数
       await sleep(1000);
       changeLightByColor('yellow');
       await sleep(200);
       changeLightByColor('red');
       await sleep(500);
   }
}
//sleep 函数替换为happen函数
async function go(){
    while(true){
        changeLightByColor('green');
        //await 等待一个promise 的结束
        //本质上是语法糖，async await 支持了用同步的逻辑来写异步的代码
        //所有的aync 函数逐级调用到最内层一定 会有一个 Promise函数
        // once:true 可能支持也可能不支持，但是这里用once:true 并没有作用吧，
        await happen(document.getElementById('next'), "click");
        changeLightByColor('yellow');
        await happen(document.getElementById('next'), "click");
        changeLightByColor('red');
        await happen(document.getElementById('next'), "click");
    }
}
go()

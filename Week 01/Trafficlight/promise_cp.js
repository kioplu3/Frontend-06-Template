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
// 会有层级嵌套的问题 callback-hell

//promise
function sleep(t){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, t);
    })
}


function go(){
    changeLightByColor('green')
    // then()函数里面可以return 另外一个promise, promise可以用链式表达的用then去执行
    // 这里的sleep 就便于理解了
    // promise.all 可以等待多个再执行？ 这个没理解，课程也没讲清楚
    sleep(1000).then(()=>{
        changeLightByColor('yellow')
        return sleep(200);
    }).then(()=>{
        changeLightByColor('red')
        return sleep(500);
    }).then(go)
}

go()




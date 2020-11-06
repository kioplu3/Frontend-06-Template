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

//早前没有async的情况下，会用generator模拟 aync

function sleep(t){
    return new Promise(((resolve, reject) => {
        setTimeout(resolve, t)
    }))
}
// 现在这种写法已经不推荐了
//*生成器
function *go(){
    while(true){
        changeLightByColor('green');
        yield sleep(1000);
        changeLightByColor('yellow');
        yield sleep(200);
        changeLightByColor('red');
        yield sleep(500);
    }
}

// 需要一个run逻辑来 run生成器
function run(iterator){
    let {value, done} = iterator.next();
    if(done)
        return ;
    if(value instanceof Promise)
        value.then(()=>{
            run(iterator)
        })
}


function co(generaotr){
    return function(){
        return run(generaotr());
    }
}

// 模仿著名的框架CO
go = co(go);

async function* counter(){
    let i = 0;
    while(true){
        await sleep(1000);
        yield i++;
    }
}

// async 对象是可以执行的，是一个方法，当然也是一个对象
(async function(){
    for await (let v of counter()){
        console.log(v);
    }
})();


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
function mainloop() {
    setTimeout(function(){
        changeLightByColor('yellow')
    }, lightTimeMap.get('red'))

    setTimeout(function(){
        changeLightByColor('green')
    }, lightTimeMap.get('yellow') + 1000)

    setTimeout(function(){
        changeLightByColor('red')
    }, lightTimeMap.get('green') + 3000)
  // red 的持续时间是1秒

    setTimeout(mainloop, 6000)
}
mainloop()


//promise

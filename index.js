const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000/60

function init(){
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvas.width * dpr;
    canvas.height = canvas.height * dpr;
    ctx.scale(dpr, dpr)
}

function render(){
    let now, delta;
    let then = Date.now();
    const frame = () => {
        requestAnimationFrame(frame)
        now = Date.now();
        delta = now - then;
        if (delta < interval) return
        //write code here

        ctx.fillStyle = 'red'
        ctx.fillRect(200,200,50,50)

        then = now - (delta % interval)
    }
    requestAnimationFrame(frame);
}

window.addEventListener('load',function(){
    init()
    render()
})
window.addEventListener('resize',function(){
    init()
})
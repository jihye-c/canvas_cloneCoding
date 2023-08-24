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
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr)
}

function render(){
    let now, delta;
    let then = Date.now();

    const x = innerWidth/2;
    let y = innerHeight/2;
    let widthAlpha = 0
    let heightAlpha = 0;
    const width = 50;
    const height = 50;
    let deg = 0.1;

    const frame = () => {
        requestAnimationFrame(frame)
        now = Date.now();
        delta = now - then;
        if (delta < interval) return
        //write code here

        ctx.clearRect(0,0,canvasWidth,canvasHeight)

        widthAlpha += 0.1
        heightAlpha += 0.1
        deg += 0.1;
        y += 1
        
        ctx.translate(x, y + height)
        ctx.rotate(deg)
        ctx.translate(-x,-y - height)

        ctx.fillStyle = 'white'
        ctx.fillRect(x,y,width * Math.cos(widthAlpha),height * Math.sin(heightAlpha))
        // ctx.fillRect(x,y,width, height)

        ctx.resetTransform();
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
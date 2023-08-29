import Particle from "./js/Particle.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000/60

const particles = []

function init(){
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
}
function confetti({x,y,count,deg,colors}){
    for (let i = 0; i < count; i++){
        particles.push(new Particle(x,y,deg,colors));
    }
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
        ctx.clearRect(0,0,canvasWidth,canvasHeight)
        //write code here

        for (let i = particles.length - 1 ; i >= 0; i --){
            particles[i].update();
            particles[i].draw(ctx);
            if(particles[i].opacity < 0) particles.splice(i,1)
        }

        
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
window.addEventListener('click',(e)=>{
    confetti({
        x : e.clientX,
        y : e.clientY,
        count : 30,
        deg : -50,
        colors : ['#ff0000']
    });
});
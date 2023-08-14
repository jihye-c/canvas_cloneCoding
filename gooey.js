const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// console.log(ctx);
const dpr = window.devicePixelRatio;
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

//css size - drawn in html
canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';

//canvas origin size
//some monitors have a device pixel ratio value of 2. multiply by dpr to improve resolution.
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr

// if the canvas size is smaller than css size, 
// the resolution is reduced because the canvas size is increased to css size.

//dpr 사이즈가 2라면 canvas 사이즈 아니고 canvas에 그린 object 사이즈도 2배 해줘야한다.
ctx.scale(dpr, dpr);
// ctx.fillRect(10,10,50,50);

class Particle {
    constructor(x,y,radius,vy){
        this.x = x
        this.y = y
        this.radius = radius
        this.vy = vy
        this.acc = 1.035; //acceleration = 양수, friction = 음수
    }
    update(){
        this.y *= this.acc;
        this.y += this.vy;
    }
    draw(){
        ctx.beginPath(); //i'll draw path
        // X , Y, radius(반지름), startAngle, endAngle, counterclockwise (시계방향, 반시계방향)
        //counterclockwise's Default is false(clockwise), true is counter-clockwise (반시계방향)
        ctx.arc(this.x,this.y,this.radius,0,Math.PI / 180 * 360); 
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x,y,radius);
const total = 30;
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}
let particles = [];

for(let i = 0; i < total; i ++){
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1,5);
    const particle  = new Particle(x, y, radius, vy);
    particles.push(particle);
}
// console.log(particles);

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate(){

    //매 프레임마다 하나 실행 후 다시 animate 불러와서 실행
    window.requestAnimationFrame(animate); //화면 주사율기준 (144hz라면 1초에 144번 실행) 
    now = Date.now();
    delta = now - then;
    if (delta < interval) return

    ctx.clearRect(0,0,canvasWidth,canvasHeight); //화면 지워줌

    particles.forEach(particle => {
        particle.update();
        particle.draw();

        if(particle.y - particle.radius > canvas.height){
            particle.y = -particle.radius;
            particle.x = randomNumBetween(0, canvasWidth);
            particle.radius = randomNumBetween(50, 100);
            particle.vy = randomNumBetween(1,5);
        }
    })
    then = now - (delta % interval);
    
}
animate();
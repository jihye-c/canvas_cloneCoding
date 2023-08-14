const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
let canvasWidth 
let canvasHeight
let particles

function init(){
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr, dpr);

    particles = [];
    const total = canvasWidth/20;

    for(let i = 0; i < total; i++){
        const x = randomNumBetween(0, canvasWidth);
        const y = randomNumBetween(0, canvasHeight);
        const radius = randomNumBetween(20, 50);
        const vy = randomNumBetween(1,5);
        const particle  = new Particle(x, y, radius, vy);
        particles.push(particle);
    }
}

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');
const controls = new function(){
    this.blurValue = 40;
    this.alphaChannel = 100;
    this.alphaOffset = -32;   
    this.acc = 1.03;
}

let gui = new dat.GUI();
const f1 = gui.addFolder('Gooey Effect');
f1.open();
const f2 = gui.addFolder('Particle Property')
f2.open();
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
    feGaussianBlur.setAttribute('stdDeviation', value);
});
f1.add(controls, 'alphaChannel',1,300).onChange(value => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`);
});
f1.add(controls, 'alphaOffset', -50, 50).onChange(value => {
    feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`);
});
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value => {
    particles.forEach(particle => particle.acc = value);
})

class Particle {
    constructor(x,y,radius,vy){
        this.x = x
        this.y = y
        this.radius = radius
        this.vy = vy
        this.acc = 1.035; //acceleration = 양수, friction = 음수
    }
    update(){
        this.vy *= this.acc;
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
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

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
        if(particle.y - particle.radius > canvasHeight){
            particle.y = -particle.radius;
            particle.x = randomNumBetween(0, canvasWidth);
            particle.radius = randomNumBetween(20, 50);
            particle.vy = randomNumBetween(1,5);
        }
        
    })
    then = now - (delta % interval);
    
}
window.addEventListener('load',()=>{
    init();
    animate();
});

window.addEventListener('resize',()=>{
    init();
})
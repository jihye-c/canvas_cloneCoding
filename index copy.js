//화면설정
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;
canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr, dpr);

//particle 클래스
class Particle {
    constructor(x,y,radius,vy){
        this.x = x
        this.y = y
        this.radius = radius
        this.vy = vy
    }
    update(){
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

//minmax 사이에서 랜덤 뽑기
const randomNumBetween = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

//particles 배열에 particle 넣어주기
const total = 30;
let particles = [];//
for(let i = 0; i < total; i ++){
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1,5);
    const particle  = new Particle(x, y, radius, vy);
    particles.push(particle);
}

//애니메이션 변수 설정
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

//애니메이션 함수
function animate(){

    window.requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;

    if (delta < interval) return

    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    particles.forEach(particle => {

        particle.update();
        particle.draw();
        if(particle.y- particle.radius > canvas.height){
            particle.y = -particle.radius;
            particle.x = randomNumBetween(0, canvasWidth);
            particle.radius = randomNumBetween(50, 100);
            particle.vy = randomNumBetween(1,5);
        }
    })
    then = now - (delta % interval);
    
}
// animate();
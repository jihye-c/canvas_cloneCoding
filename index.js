

class Canvas extends CanvasOption{
    constructor(){
        super();
    }
    init(){
        this.canvasWidth = innerWidth;
        this.canvasHeight = innerHeight;
        this.width = canvasWidth*dpr;
        this.height = canvasHeight*dpr;
        this.ctx.scale(dpr, dpr);
        this.style.width = canvasWidth+'px';
        this.style.height = canvasHeight+'px';
    }
    render(){
        let now, delta;
        let then = Date.now();

        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
        
            if(delta < this.interval) return;
        
            this.ctx.fillRect(100, 100, 200, 200);
        
            then = now - (delta % this.interval);
        }
        requestAnimationFrame(frame);
    }
}

let canvasWidth, canvasHeight;
window.addEventListener('load', ()=>{
    canvas.init()
    canvas.render()
});

window.addEventListener('resize',()=>{
    canvas.init();
});

const canvas = new Canvas();
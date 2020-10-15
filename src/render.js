//Setup
const canvas = document.getElementById('canvas-1')
const ctx1 = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('canvas-2')
const ctx2 = canvas2.getContext('2d')
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas-3')
const ctx3 = canvas3.getContext('2d')
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas-4')
const ctx4 = canvas4.getContext('2d')
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas-5')
const ctx5 = canvas5.getContext('2d')
canvas5.width = 600;
canvas5.height = 600;

//global variables
const grid = 80
let keys = []
let score = 0;
let collisiunsCount = 0;
let frame = 0
let gameSpeed = 1;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = []
const carsArray = []
const logsArray = []


//Frogger
class Froggger{
    constructor(){
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5;
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }

    draw(){
        ctx3.fillStyle = 'green';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }

    jump(){
        
    }

    update(){
        //moving up
        if(keys['ArrowUp']){
            if(this.moving === false){
                this.y -= grid;
                this.moving = true;
            }
        }
        //down
        if(keys['ArrowDown']){
            if(this.y < canvas.height - this.height * 2 && this.moving === false){
                this.y += grid;
                this.moving = true;
            }
        }
        //Left
        if(keys['ArrowLeft']){
            if(this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
            }
        }
        //right
        if(keys['ArrowRight']){
            if(this.moving === false && this.x < canvas.width - this.width * 2){
                this.x += grid;
                this.moving = true;
            }
        }

        //scored
        if(this.y < 0) scored()
    }
}

const frogger = new Froggger()

//utilities
function animate(){
    ctx3.clearRect(0, 0, canvas.width, canvas.height)
    frogger.draw()
    frogger.update()
    requestAnimationFrame(animate);
}

animate()

function scored(){
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
}

//Keys listenners
window.addEventListener('keydown', (e) => {
    keys = []

    keys[e.key] = true;

    if(keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']){
        frogger.jump()
    }
})

window.addEventListener('keyup', (e) => {
    delete keys[e.key]

    frogger.moving = false;
})
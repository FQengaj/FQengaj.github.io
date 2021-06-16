const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');
const backgroundcolor = "Black";

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

const Circ = {
    xScale: 0.5,
    yScale: 0.5,
    r: 20, // radius
    c: 'red' // color
}

const FPS = 1000/61;

docReady()

function docReady() {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(start, 1);
    } else {
        document.addEventListener("DOMContentLoaded", start);
        canvas.addEventListener("mousedown", click); 
    }
}

function click(params) {
    let xClick = params.clientX;
    let yClick = params.clientY;

    let xCirc = Circ.xScale * wWidth;
    let yCirc = Circ.yScale * wHeight;

    let dx = xClick - xCirc;
    let dy = yClick - yCirc;

    let dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

    if (dist < Circ.r){
        // create new Circle
        Circ.xScale = parseFloat((Math.random()).toFixed(2));
        Circ.yScale = parseFloat((Math.random()).toFixed(2));
        renderUI();
    }

    //console.log(`pressed @ (${params.clientX}/${params.clientY})`);
}


function start(){
    setDims();
    renderUI();
    console.log("start()")
    
    /*
    setDims();
    
    setInterval(() => {
        renderUI();
    }, FPS);
    */
}

function setDims() {
    wHeight = window.innerHeight;
    wWidth = window.innerWidth;
    canvas.height = wHeight;
    canvas.width = wWidth;
}


window.onresize = () =>{
    setDims();
    console.log(`width: ${wWidth}  ---  height: ${wHeight}`);
    renderUI();
}

function renderUI() {
    drawBackground();
    drawCircle();
}

function drawBackground() {
    ctx.fillStyle = backgroundcolor;
    ctx.fillRect(0,0,wWidth, wHeight);
}

function drawCircle() {
    // get circ x and y
    // x and y are % of the Display
    // scale it to the Width of the Screen
    // draw it with radius

    let x = Circ.xScale * wWidth;
    let y = Circ.yScale * wHeight;

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green';
    ctx.beginPath();

    // ctx.arc(centerX, centerY, radius, startAngle, endAngle [,counterclockwise]);
    ctx.arc(x,y, Circ.r, 0, Math.PI*2, false);
    ctx.fill();
}
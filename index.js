const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');
const backgroundcolor = "Black";

const totalClicks = document.getElementById('totalClicks');
const corClicks = document.getElementById('corClickCnt');
const missClicks = document.getElementById('missClickCnt');
const clickAcc = document.getElementById('clickAcc');
const timeDt = document.getElementById('timeDt');

const stats = {
    totalClicks: 0,
    corClicks: 0,
    missClicks: 0,
    clickAcc: 0,
    timeDt: 0.00
};


//clickCounter.innerHTML = "hallo welt :)";
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

const Circ = {
    xScale: 0.5,
    yScale: 0.5,
    r: 40, // radius
    c: 'red' // color
};

const FPS = 1000/61;

docReady()

function docReady() {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(start, 1);
    } else {
        document.addEventListener("DOMContentLoaded", start);
        window.addEventListener("mousedown", click); 
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
        let rxScale = (Circ.r / wWidth);
        let ryScale = (Circ.r / wHeight); 
        Circ.xScale = parseFloat((getRandomArbitrary(0+rxScale, 1-rxScale)).toFixed(4));
        Circ.yScale = parseFloat((getRandomArbitrary(0+ryScale, 1-ryScale)).toFixed(4));

        console.log(`circ @ (${Circ.xScale}/${Circ.yScale})`);

        stats.corClicks += 1;
        renderUI();
    }else{
        stats.missClicks += 1;
    }
    stats.totalClicks += 1;
    if (stats.totalClicks == 0){
        stats.clickAcc = 1.0;
    }else{
        stats.clickAcc = stats.corClicks / stats.totalClicks;
    }
    stats.clickAcc = parseFloat((stats.clickAcc * 100).toFixed(2));
    
    updateStatsUI();

    //console.log(`pressed @ (${params.clientX}/${params.clientY})`);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

function updateStatsUI() {
    totalClicks.innerHTML = "Total Clicks: " + stats.totalClicks;
    corClicks.innerHTML = "Circil Clicks: " + stats.corClicks;
    missClicks.innerHTML = "Missed Clicks: " + stats.missClicks;
    clickAcc.innerHTML = "Hit accuracy: " + stats.clickAcc + "%";
    timeDt.innerHTML = "Mean ms between Hits: " + stats.timeDt;
    // best time between hits
    // worst time beween hits
    // 

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

    var isRed = true;
    for (var i = Circ.r; i > 1; i -= 10){
        if (isRed){
            ctx.fillStyle = 'red';
        }else{
            ctx.fillStyle = 'white';
        }
        isRed = !isRed;
        ctx.beginPath();
        ctx.arc(x,y, i, 0, Math.PI*2, false);
        ctx.fill();
    }

    // ctx.arc(centerX, centerY, radius, startAngle, endAngle [,counterclockwise]);
}
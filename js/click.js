var clickArea = document.getElementById("click-area");
var statClick = document.getElementById("stat-clicks");
var statCPS = document.getElementById("stat-cps");
var statDBC = document.getElementById("stat-dbc");

var clicks = 0;
var cps = 0;
var dbc = 0;

var lastClick = undefined;
var timer = undefined;
var time = 1;

clickArea.addEventListener("click", (ev) => {
    clicks++;
    if (timer == undefined) {
        timer = startTimer();
    }
    updateStat();
})

function tick() {
    time++;
    updateStat();
}

function updateStat() {
    statClick.innerText = clicks;
    statCPS.innerText = Math.round((clicks / time) * 100) / 100;;
    statDBC.innerText = dbc;
}

function startTimer() {
    return setInterval(() => tick(), 1000);
}

function stopTimer(timer) {
    clearInterval(timer);
} 
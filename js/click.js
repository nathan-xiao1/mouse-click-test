var clickArea = document.getElementById("click-area");
var statClick = document.getElementById("stat-clicks");
var statCPS = document.getElementById("stat-cps");
var statDBC = document.getElementById("stat-dbc");
var statTime = document.getElementById("stat-time");

var clicks = 0;
var dClicks = 0;

var lastClick = 0;
var currentClick = 0;
var timer = undefined;
var time = 0;

// Default 500ms for double clicks
var dClickThreshold = 500;

clickArea.addEventListener("click", (ev) => {
    if (timer == undefined) {
        timer = startTimer();
    }
    clicks++;
    currentClick = Date.now();
    if (currentClick - lastClick <= dClickThreshold) {
        dClicks++;
        lastClick = 0;
    } else {
        lastClick = currentClick;
    }
    updateStat();
})

function tick() {
    time++;
    updateStat();
}

function updateStat() {
    statClick.innerText = clicks;
    statCPS.innerText = Math.round((clicks / (time == 0 ? 1 : time)) * 100) / 100;
    statDBC.innerText = dClicks;
    statTime.innerText = time + "s";
}

function startTimer() {
    return setInterval(() => tick(), 1000);
}

function stopTimer(timer) {
    clearInterval(timer);
} 
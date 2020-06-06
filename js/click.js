var clickArea = document.getElementById("click-area");
var statClick = document.getElementById("stat-clicks");
var statCPS = document.getElementById("stat-cps");
var statDBC = document.getElementById("stat-dbc");
var statTime = document.getElementById("stat-time");

var thresholdControl = document.getElementById("threshold-control");
var thresholdDisplay = document.getElementById("threshold-display");

var consecutiveCheckbox = document.getElementById("consecutive-checkbox");

var clickResetBtn = document.getElementById("click-reset-btn");

var timerStartBtn = document.getElementById("timer-start-btn");
var timerResetBtn = document.getElementById("timer-reset-btn");

var clicks = 0;
var clicksTimer = 0;
var dClicks = 0;

var lastClick = 0;
var currentClick = 0;
var timer = undefined;
var time = 0;

// Default 100ms for double clicks
var dClickThreshold = localStorage.getItem('dClickThreshold');
if (dClickThreshold == null) {
    dClickThreshold = 100;
}
thresholdControl.value = dClickThreshold;
thresholdDisplay.innerText = dClickThreshold;

// Setup Allow Consecutive Double Click
var allowConsecutiveDClicks = localStorage.getItem('allowConsecutiveDClicks');
if (allowConsecutiveDClicks == null) {
    allowConsecutiveDClicks = false
}
consecutiveCheckbox.checked = allowConsecutiveDClicks;

// Event Listener for click area
clickArea.addEventListener("click", () => {
    if (timer == undefined) {
        timer = startTimer();
    }
    clicks++;
    clicksTimer++;
    currentClick = Date.now();
    if (currentClick - lastClick <= dClickThreshold) {
        dClicks++;
        lastClick = 0;
        if (allowConsecutiveDClicks) lastClick = currentClick;
    } else {
        lastClick = currentClick;
    }
    updateStat();
})

// Event Listener for threshold range control
thresholdControl.addEventListener("input", () => {
    dClickThreshold = thresholdControl.value;
    thresholdDisplay.innerText = thresholdControl.value;
    localStorage.setItem("dClickThreshold", dClickThreshold);
})

// Event Listener for consecutive double click checkbox
consecutiveCheckbox.addEventListener("input", () => {
    allowConsecutiveDClicks = consecutiveCheckbox.checked;
    localStorage.setItem("allowConsecutiveDClicks", allowConsecutiveDClicks);
})

// Event Listener for click reset button
clickResetBtn.addEventListener('click', () => {
    clicks = 0;
    clicksTimer = 0;
    dClicks = 0;
})

// Event Listener for timer start button
timerStartBtn.addEventListener('click', () => {
    if (timer == undefined) {
        timer = startTimer();
    }
})

// Event Listener for timer reset button
timerResetBtn.addEventListener('click', () => {
    if (timer != undefined) {
        timer = stopTimer(timer);
    }
})


function tick() {
    time++;
    updateStat();
}

function updateStat() {
    statClick.innerText = clicks;
    statCPS.innerText = Math.round((clicksTimer / (time == 0 ? 1 : time)) * 100) / 100;
    statDBC.innerText = dClicks;
    statTime.innerText = time + "s";
}

function startTimer() {
    return setInterval(() => tick(), 1000);
}

function stopTimer(timer) {
    clearInterval(timer);
    time = 0;
    clicksTimer = 0;
    statCPS.innerText = clicksTimer;
    statTime.innerText = time + "s";
}
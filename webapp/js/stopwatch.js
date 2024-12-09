let timer;
let running = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('time');

// Συνάρτηση για να ξεκινήσει/σταματήσει το stopwatch
function startStop() {
    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
}

// Συνάρτηση για να ενημερώνει τον χρόνο κάθε δευτερόλεπτο
function updateTime() {
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    // Ενημέρωση της εμφάνισης του χρόνου
    timeDisplay.textContent = formatTime(hours, minutes, seconds);
}

// Συνάρτηση για να μορφοποιεί τον χρόνο σε "HH:MM:SS"
function formatTime(h, m, s) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// Συνάρτηση για να προσθέτει μηδενικά πριν από μονοψήφιους αριθμούς
function pad(number) {
    return number < 10 ? `0${number}` : number;
}

// Συνάρτηση για να επαναφέρει τον χρόνο
function reset() {
    clearInterval(timer);
    running = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timeDisplay.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
}

// Αντιστοίχιση των γεγονότων στα κουμπιά
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

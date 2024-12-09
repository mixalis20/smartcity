let timer;
let running = false;
let startTime = 0; // Αρχική ώρα για μέτρηση
let elapsedTime = 0; // Χρόνος που έχει περάσει
let currentTime = 0; // Τρέχουσα ώρα

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('time');

// Συνάρτηση για να ξεκινήσει/σταματήσει το stopwatch
function startStop() {
    if (running) {
        cancelAnimationFrame(timer); // Σταματάμε το animation frame αν είναι ενεργό
        startStopBtn.textContent = 'Start';
        resetBtn.disabled = false; // Ενεργοποιούμε το κουμπί Reset όταν το stopwatch σταματήσει
    } else {
        startTime = performance.now() - elapsedTime; // Επαναφορά του startTime αν συνεχίζουμε
        requestAnimationFrame(updateTime); // Ξεκινάμε το animation
        startStopBtn.textContent = 'Stop';
        resetBtn.disabled = true; // Απενεργοποιούμε το κουμπί Reset όσο το stopwatch λειτουργεί
    }
    running = !running;
}

// Συνάρτηση για να ενημερώνει τον χρόνο κάθε frame
function updateTime() {
    if (running) {
        currentTime = performance.now(); // Παίρνουμε την τρέχουσα ώρα με υψηλή ακρίβεια
        elapsedTime = currentTime - startTime; // Υπολογισμός του χρόνου που έχει περάσει

        // Αν έχει περάσει 1 δευτερόλεπτο (1000ms)
        if (elapsedTime >= 1000) {
            let seconds = Math.floor(elapsedTime / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);

            seconds = seconds % 60;
            minutes = minutes % 60;

            // Ενημέρωση της εμφάνισης του χρόνου
            timeDisplay.textContent = formatTime(hours, minutes, seconds);
        }

        requestAnimationFrame(updateTime); // Καλέστε ξανά την requestAnimationFrame αν ο χρονοδιακόπτης είναι ενεργός
    }
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
    cancelAnimationFrame(timer); // Σταματάμε το animation αν είναι ενεργό
    running = false;
    elapsedTime = 0; // Μηδενίζουμε τον χρόνο
    timeDisplay.textContent = '00:00:00'; // Επαναφορά της εμφάνισης
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true; // Απενεργοποιούμε το κουμπί Reset όταν το stopwatch είναι επαναφερμένο
}

// Αντιστοίχιση των γεγονότων στα κουμπιά
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

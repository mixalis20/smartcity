const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Function to update the calendar
function updateCalendar() {
    // Get the first day of the month and the number of days in the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Update the month and year in the header
    monthYear.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

    // Clear previous days
    daysContainer.innerHTML = '';

    // Create empty divs for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day', 'empty');
        daysContainer.appendChild(emptyDiv);
    }

    // Create the day elements for the current month
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // Highlight the current day
        if (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            dayDiv.classList.add('current-day');
        }

        daysContainer.appendChild(dayDiv);
    }
}

// Function to get the name of the month
function getMonthName(month) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
}

// Event listeners for the previous and next month buttons
prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateCalendar();
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateCalendar();
});

// Initialize the calendar
updateCalendar();

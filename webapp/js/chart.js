// Δεδομένα για το γράφημα (Θερμοκρασία, Αέρας, Υγρασία, Διοξείδιο του Άνθρακα)
const data = {
    dates: ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"],
    temperatures: [18, 20, 25, 22, 19, 21, 23],
    air: [10, 12, 9, 14, 11, 13, 10],          // Δεδομένα για τον αέρα
    humidity: [60, 65, 70, 75, 68, 63, 66],   // Δεδομένα για την υγρασία
    co2: [400, 420, 410, 430, 450, 440, 460] // Δεδομένα για το διοξείδιο του άνθρακα
};

// Δημιουργία των γραφημάτων για Θερμοκρασία, Αέρα, Υγρασία και Διοξείδιο του Άνθρακα
const temperatureChart = new Chart(document.getElementById('temperatureChart'), {
    type: 'line',
    data: {
        labels: data.dates,
        datasets: [{
            label: 'Θερμοκρασία (°C)',
            data: data.temperatures,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 10,
                max: 35
            }
        }
    }
});

const airChart = new Chart(document.getElementById('airChart'), {
    type: 'line',
    data: {
        labels: data.dates,
        datasets: [{
            label: 'Αέρας (m/s)',
            data: data.air,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 5,
                max: 15
            }
        }
    }
});

const humidityChart = new Chart(document.getElementById('humidityChart'), {
    type: 'line',
    data: {
        labels: data.dates,
        datasets: [{
            label: 'Υγρασία (%)',
            data: data.humidity,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 50,
                max: 80
            }
        }
    }
});

const co2Chart = new Chart(document.getElementById('co2Chart'), {
    type: 'line',
    data: {
        labels: data.dates,
        datasets: [{
            label: 'Διοξείδιο του Άνθρακα (ppm)',
            data: data.co2,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                min: 380,
                max: 470
            }
        }
    }
});


// Άνοιγμα / Κλείσιμο του ημερολογίου όταν πατηθεί το κουμπί
const calendarBtn = document.getElementById('calendarBtn');
const datepicker = document.getElementById('datepicker');

// Ενεργοποιούμε το ημερολόγιο με flatpickr
flatpickr("#datepicker", {
    enableTime: false,  // Εάν δεν θέλουμε ώρα
    dateFormat: "Y-m-d", // Μορφή ημερομηνίας
    onChange: function(selectedDates, dateStr, instance) {
        // Όταν επιλέγεται μια ημερομηνία, κάνουμε κάτι (π.χ. εμφανίζουμε την ημερομηνία)
        alert("Επιλέξατε την ημερομηνία: " + dateStr);
    }
});

// Άνοιγμα / Κλείσιμο του ημερολογίου όταν πατηθεί το κουμπί
calendarBtn.addEventListener('click', function() {
    console.log("Το κουμπί πατήθηκε"); // Για να ελέγξουμε αν εκτελείται το event
    if (datepicker.style.display === 'none' || datepicker.style.display === '') {
        datepicker.style.display = 'block';  // Εμφάνιση του ημερολογίου
        console.log("Το ημερολόγιο εμφανίστηκε");
    } else {
        datepicker.style.display = 'none';   // Απόκρυψη του ημερολογίου
        console.log("Το ημερολόγιο κρύφτηκε");
    }
});





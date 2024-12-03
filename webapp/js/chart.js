document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('myChart');
    
    if (ctx) {
        ctx = ctx.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',  // Επιλέξαμε πίτα για καλύτερη απεικόνιση ποσοστών
            data: {
                labels: ['Oxygen (O₂)', 'Nitrogen (N₂)', 'Carbon Dioxide (CO₂)', 'Argon (Ar)', 'Water Vapor (H₂O)'],
                datasets: [{
                    label: 'Atmospheric Gases',
                    data: [21.0, 78.09, 0.04, 0.93, 0.03], // Εκτιμώμενα ποσοστά αερίων στην ατμόσφαιρα
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',  // Οξυγόνο
                        'rgba(54, 162, 235, 0.2)',  // Άζωτο
                        'rgba(255, 206, 86, 0.2)',  // Διοξείδιο του άνθρακα
                        'rgba(75, 192, 192, 0.2)',  // Αργό
                        'rgba(153, 102, 255, 0.2)'  // Υγρασία
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',  // Οξυγόνο
                        'rgba(54, 162, 235, 1)',  // Άζωτο
                        'rgba(255, 206, 86, 1)',  // Διοξείδιο του άνθρακα
                        'rgba(75, 192, 192, 1)',  // Αργό
                        'rgba(153, 102, 255, 1)'  // Υγρασία
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Το γράφημα προσαρμόζεται στο μέγεθος της οθόνης
                plugins: {
                    legend: {
                        position: 'top',  // Θέση του πίνακα της υπόδειξης
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                // Εμφανίζει τα δεδομένα με πιο φιλικό τρόπο
                                return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error("Το στοιχείο canvas με id 'myChart' δεν βρέθηκε.");
    }
});



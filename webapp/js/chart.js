fetch('/webapp/json/chart.json')  // Διαδρομή προς το chart.json
    .then(response => response.json())
    .then(data => {
        const windData = data.wind;
        const temperatureData = data.temperature;
        const humidityData = data.humidity;
        const co2Data = data.co2;

        // Γράφημα Ανέμου
        const windCtx = document.getElementById('windChart').getContext('2d');
        new Chart(windCtx, {
            type: 'line',
            data: {
                labels: windData.labels,
                datasets: [{
                    label: 'Ταχύτητα Ανέμου (km/h)',
                    data: windData.data,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ταχύτητα (km/h)'
                        }
                    }
                }
            }
        });

        // Γράφημα Θερμοκρασίας
        const tempCtx = document.getElementById('temperatureChart').getContext('2d');
        new Chart(tempCtx, {
            type: 'bar',
            data: {
                labels: temperatureData.labels,
                datasets: [{
                    label: 'Θερμοκρασία (°C)',
                    data: temperatureData.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Θερμοκρασία (°C)'
                        }
                    }
                }
            }
        });

        // Γράφημα Υγρασίας
        const humidityCtx = document.getElementById('humidityChart').getContext('2d');
        new Chart(humidityCtx, {
            type: 'line',
            data: {
                labels: humidityData.labels,
                datasets: [{
                    label: 'Υγρασία (%)',
                    data: humidityData.data,
                    fill: false,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Υγρασία (%)'
                        }
                    }
                }
            }
        });

        // Γράφημα Διοξειδίου του Άνθρακα (CO₂)
        const co2Ctx = document.getElementById('co2Chart').getContext('2d');
        new Chart(co2Ctx, {
            type: 'line',
            data: {
                labels: co2Data.labels,
                datasets: [{
                    label: 'Διοξείδιο του Άνθρακα (ppm)',
                    data: co2Data.data,
                    fill: false,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'CO₂ (ppm)'
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Σφάλμα κατά τη φόρτωση των δεδομένων:', error);
    });

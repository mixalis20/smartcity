
function getRandomFromList(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}


fetch('/webapp/json/chart.json')
    .then(response => response.json())
    .then(data => {
        
        const temperatureList = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45];  // Θερμοκρασίες σε °C
        const humidityList = [0, 20, 40, 60, 80, 100];  // Υγρασία σε ποσοστά (%)
        const co2List = [300, 400, 500, 600, 700, 800];  // CO2 σε ppm
        const airList = [0, 50, 100, 150];  // Αέρας σε τυχαίες μονάδες

        const temperatureRandomData = data.dates.map(() => getRandomFromList(temperatureList));
        const humidityRandomData = data.dates.map(() => getRandomFromList(humidityList));
        const co2RandomData = data.dates.map(() => getRandomFromList(co2List));
        const airRandomData = data.dates.map(() => getRandomFromList(airList));

        
        const airData = {
            labels: data.dates,
            datasets: [{
                label: 'Αέρας',
                data: airRandomData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            }]
        };

        
        const temperatureData = {
            labels: data.dates,
            datasets: [{
                label: 'Θερμοκρασία (°C)',
                data: temperatureRandomData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            }]
        };

        
        const humidityData = {
            labels: data.dates,
            datasets: [{
                label: 'Υγρασία (%)',
                data: humidityRandomData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            }]
        };

       
        const co2Data = {
            labels: data.dates,
            datasets: [{
                label: 'Διοξείδιο του Άνθρακα (ppm)',
                data: co2RandomData,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            }]
        };

        
        const commonOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#444',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Ημέρα',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        color: '#333',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Τιμές',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        color: '#333',
                    }
                }
            }
        };

        
        const airChart = new Chart(document.getElementById('airChart'), {
            type: 'line',
            data: airData,
            options: commonOptions
        });

        const temperatureChart = new Chart(document.getElementById('temperatureChart'), {
            type: 'line',
            data: temperatureData,
            options: commonOptions
        });

        const humidityChart = new Chart(document.getElementById('humidityChart'), {
            type: 'line',
            data: humidityData,
            options: commonOptions
        });

        const co2Chart = new Chart(document.getElementById('co2Chart'), {
            type: 'line',
            data: co2Data,
            options: commonOptions
        });
    })
    .catch(error => {
        console.error("Σφάλμα κατά την φόρτωση του JSON:", error);
    });


fetch('/webapp/json/dashboard.json')
    .then(response => response.json())
    .then(data => {
        
        const dates = data.dates;
        const temperatures = data.temperatures;
        const humidity = data.humidity;
        const co2 = data.co2;
        const air = data.air;

      
        const temperatureCardsContainer = document.querySelector('.temperature-cards');

        
        dates.forEach((day, index) => {
            const temp = temperatures[index];
            const hum = humidity[index];
            const co2Value = co2[index];
            const airValue = air[index];

            const card = document.createElement('div');
            card.classList.add('temperature-card');

      
            card.innerHTML = `
                <div class="day">${day}</div>
                <div class="temp">${temp}°C</div>
                <div class="humidity">${hum}% Υγρασία</div>
                <div class="co2">CO2: ${co2Value} ppm</div>
                <div class="air">Αέρας: ${airValue} km/h</div>
            `;

            
            temperatureCardsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Σφάλμα κατά τη φόρτωση των δεδομένων:", error);
    });

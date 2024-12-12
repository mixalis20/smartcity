// Το API key σου από το OpenWeatherMap
const apiKey = 'ab1bb8942c19a355d0744cbc078f6648'; // Αντικατέστησε με το δικό σου API key

// Δημιουργία του χάρτη
const map = L.map('map').setView([37.9838, 23.7275], 5); // Κέντρο στον χάρτη της Ευρώπης (μπορείς να αλλάξεις)

// Προσθήκη χάρτη μέσω tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Φόρτωση των σημείων από το JSON αρχείο
fetch('../json/weather-data.json')  // Αιτούμενο αρχείο JSON
  .then(response => response.json())
  .then(cities => {
    // Προσθήκη markers για κάθε πόλη από το JSON
    cities.forEach(city => {
       const customIcon = L.icon({
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Green_circle.svg',  // Εδώ βάζεις τη δική σου εικόνα
            iconSize: [32, 32],  // Μέγεθος της εικόνας
            iconAnchor: [16, 32],  // Κέντρο της εικόνας
            popupAnchor: [0, -32]  // Το σημείο του popup πάνω από τον marker
        });
        
  
        const marker = L.marker([city.lat, city.lon]).addTo(map);
        marker.bindPopup(`<b>${city.name}</b>`);

        // Όταν ο χρήστης κάνει κλικ σε έναν marker, εμφανίζεται το widget με τον καιρό
        marker.on('click', function() {
            displayWeather(city.lat, city.lon, city.name);
        });
    });
  })
  .catch(error => {
    console.error('Δεν ήταν δυνατή η φόρτωση του αρχείου JSON:', error);
  });

// Συνάρτηση για την εμφάνιση του widget με τα δεδομένα καιρού
function displayWeather(lat, lon, cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // Αίτηση στο OpenWeatherMap API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Ενημέρωση του widget με τα δεδομένα καιρού
            document.getElementById('weather-city').textContent = cityName;
            const temperature = data.main.temp;
            document.getElementById('weather-temp').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById('weather-humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('weather-wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Προσθήκη εικόνας καιρού
            const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById('weather-icon').src = weatherIconUrl;

            // Ενημέρωση του χρώματος του widget ανάλογα με τη θερμοκρασία
            updateWidgetColor(temperature);

            // Εμφάνιση του widget με τα δεδομένα
            document.getElementById('weather-widget').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Συνάρτηση για την αλλαγή του χρώματος του widget
function updateWidgetColor(temperature) {
    const widget = document.getElementById('weather-widget');
    
    if (temperature > 15) {
        // Κόκκινο χρώμα για θερμοκρασία πάνω από 15°C
        widget.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
        widget.style.borderColor = 'rgba(255, 0, 0, 0.5)'  // Κόκκινο
    } else if (temperature < 5) {
        // Μπλε-μοβ χρώματα για θερμοκρασία κάτω από 5°C
        widget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';  // Μπλε
        widget.style.borderColor = 'rgba(128, 0, 128, 0.5)'; // Μωβ
    } else {
        // Σαφή εμφάνιση για ενδιάμεσες θερμοκρασίες
        widget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Λευκό
        widget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; // Μαύρο
    }
}


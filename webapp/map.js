// Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
var map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Χρησιμοποιούμε τον tile layer του OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Συνάρτηση για να φορτώσουμε τα δεδομένα από το αρχείο JSON
async function loadPlaces() {
    try {
        let response = await fetch("./md.json"); // Φόρτωση του αρχείου JSON
        let places = await response.json(); // Ανάγνωση του JSON δεδομένου
        console.log(places); // Εμφάνιση των δεδομένων στον κονσόλα

        // Προσθήκη σημείων στον χάρτη από το JSON
        places.forEach(function(place) {
            // Δημιουργία του περιεχομένου του Popup
            var popupContent = "<b>" + place.title + "</b><br>" + place.description;
            
            // Προσθήκη κουμπιού για ανακατεύθυνση στη φωτογραφία
            popupContent += '<br><a href="gallery.html#sight' + place.id + '" class="btn btn-primary">Δες το στην Γκαλερί</a>';
            
            // Δημιουργία του marker και προσθήκη του στον χάρτη
            L.marker([place.lat, place.lon]).addTo(map)
                .bindPopup(popupContent); // Σύνδεση του περιεχομένου στο popup
        });

    } catch (error) {
        console.log("Σφάλμα κατά τη φόρτωση των δεδομένων:", error);
    }
}

// Κλήση της συνάρτησης για να φορτωθούν τα δεδομένα και να προστεθούν στον χάρτη
loadPlaces();

// Εικονίδια για Wi-Fi, Πάρκινγκ, Φαρμακεία, και ΑΤΜ
var wifiIcon = L.icon({
    iconUrl: 'wifi-icon.webp', // Αντικατέστησε με την εικόνα για Wi-Fi
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var parkingIcon = L.icon({
    iconUrl: 'parking-icon.png', // Αντικατέστησε με την εικόνα για Πάρκινγκ
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var pharmacyIcon = L.icon({
    iconUrl: 'pharmacy.png', // Εικονίδιο για τα φαρμακεία
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var atmIcon = L.icon({
    iconUrl: 'atm.webp', // Εικονίδιο ΑΤΜ
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Φόρτωση δεδομένων από JSON για Wi-Fi, Πάρκινγκ, Φαρμακεία, και ΑΤΜ
function loadMarkers(jsonFile, icon) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(places => {
            places.forEach(function(place) {
                var marker = L.marker([place.lat, place.lon]).addTo(map)
                    .bindPopup("<b>" + place.title + "</b><br>" + place.description);
                
                marker.setIcon(icon);
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
}

// Φόρτωση των σημείων από τα δεδομένα
loadMarkers('data.json', wifiIcon);
loadMarkers('data2.json', pharmacyIcon);
loadMarkers('data3.json', atmIcon);
loadMarkers('data4.json', parkingIcon); // Φόρτωμα και των markers για πάρκινγκ

// Προσθήκη του Legend για τα εικονίδια
var legend = L.control({ position: 'topright' });
legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-control-layers');
    div.innerHTML = '<strong>Σημεία Χάρτη:</strong><br>'
       + '<span><img src="atm.webp" style="width: 20px; height: 20px; margin-right: 10px;" /> ATM</span><br>'
       + '<span><img src="pharmacy.png" style="width: 20px; height: 20px; margin-right: 10px;" /> Φαρμακεια</span><br>'
       + '<span><img src="wifi-icon.webp" style="width: 20px; height: 20px; margin-right: 10px;" /> Δημοσιο Wifi</span><br>'
       + '<span><img src="parking-icon.png" style="width: 20px; height: 20px; margin-right: 10px;" /> Δημοσιο Παρκινγκ</span><br>';
    return div;
};
legend.addTo(map);

// Light και Dark Tile Layers
var lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>'
});

// Προσθήκη του Light Layer αρχικά
lightLayer.addTo(map);

// Δημιουργία του κουμπιού για την αλλαγή του θέματος
var button = document.getElementById('theme-toggle');
var isLight = true; // Αρχικά το theme είναι Light

button.onclick = function() {
    if (isLight) {
        map.removeLayer(lightLayer);
        darkLayer.addTo(map);
    } else {
        map.removeLayer(darkLayer);
        lightLayer.addTo(map);
    }
    isLight = !isLight;
};

// Σημείο εκκίνησης για την αλλαγή θεμάτων (θερμοκρασία και άνεμος)
var isTemperatureVisible = false;
var isWindVisible = false;

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        }, function(error) {
            console.error("Σφάλμα κατά την απόκτηση της θέσης του χρήστη: " + error.message);
        });
    } else {
        console.log("Η γεωτοποθέτηση δεν υποστηρίζεται από τον browser.");
    }
}

function fetchWeatherData(lat, lon) {
    var apiKey =  "f334ce4f82114807a7d72742242811";
    var url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=el`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var temperature = data.current.temp_c;
            var windSpeed = data.current.wind_kph;
            var windDirection = data.current.wind_dir;
            var cityName = data.location.name;

            var tempText = ` ${cityName}${temperature}°C.`;
            var windText = ` ${windSpeed}${windDirection}.`;

            var tempButton = document.getElementById('temperature-toggle');
            var windButton = document.getElementById('wind-toggle');

            tempButton.onclick = function() {
                if (isTemperatureVisible) {
                    tempButton.textContent = "Θερμοκρασία";
                } else {
                    tempButton.textContent = tempText;
                }
                isTemperatureVisible = !isTemperatureVisible;
            };

            windButton.onclick = function() {
                if (isWindVisible) {
                    windButton.textContent = "Άνεμος";
                } else {
                    windButton.textContent = windText;
                }
                isWindVisible = !isWindVisible;
            };
        })
        .catch(error => {
            console.error('Σφάλμα κατά την απόκτηση των δεδομένων θερμοκρασίας και ανέμου:', error);
        });
}

// Κουμπί για τη λήψη θέσης και εμφάνιση θερμοκρασίας
document.getElementById('temperature-toggle').onclick = getUserLocation;
document.getElementById('wind-toggle').onclick = getUserLocation;

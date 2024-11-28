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

// Εικονίδια για Wi-Fi και Πάρκινγκ
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



// Φόρτωση των δεδομένων από το αρχείο JSON
fetch('data.json')
    .then(response => response.json())
    .then(places => {
        // Προσθήκη σημείων στον χάρτη
        places.forEach(function(place) {
            // Προσθήκη marker για κάθε τοποθεσία
            var marker = L.marker([place.lat, place.lon]).addTo(map)
                .bindPopup("<b>" + place.title + "</b><br>" + place.description);

            // Επιλογή διαφορετικού εικονιδίου ανάλογα με τον τύπο ("wifi" ή "parking")
            if (place.type === "wifi") {
                marker.setIcon(wifiIcon); // Σημεία Wi-Fi
            } else if (place.type === "parking") {
                marker.setIcon(parkingIcon); // Σημεία Πάρκινγκ
            }
        });
    })
    .catch(error => console.error('Error loading the JSON data:', error));


    fetch('data2.json')
    .then(response => response.json())
    .then(places => {
        // Προσθήκη σημείων στον χάρτη
        places.forEach(function(place) {
            // Προσθήκη marker για κάθε τοποθεσία
            var marker = L.marker([place.lat, place.lon]).addTo(map)
                .bindPopup("<b>" + place.title + "</b><br>" + place.description);

            // Επιλογή διαφορετικού εικονιδίου ανάλογα με τον τύπο ("pharmacy")
            if (place.type === "pharmacy") {
                marker.setIcon(pharmacyIcon); // Σημεία φαρμακείων
            }
        });
    })
    .catch(error => console.error('Error loading the JSON data:', error));
    var pharmacyIcon = L.icon({
        iconUrl: 'pharmacy.png', // Εικονίδιο για τα φαρμακεία
        iconSize: [32, 32], // Μέγεθος εικονιδίου
        iconAnchor: [16, 32], // Σημείο του εικονιδίου
        popupAnchor: [0, -32] // Σημείο για το popup
    });


    // Φόρτωση των δεδομένων από το αρχείο JSON
fetch('data3.json')
.then(response => response.json())
.then(places => {
    // Προσθήκη σημείων στον χάρτη
    places.forEach(function(place) {
        // Προσθήκη marker για κάθε τοποθεσία
        var marker = L.marker([place.lat, place.lon]).addTo(map)
            .bindPopup("<b>" + place.title + "</b><br>" + place.description);

        // Επιλογή διαφορετικού εικονιδίου ανάλογα με τον τύπο ("atm")
        if (place.type === "atm") {
            marker.setIcon(atmIcon); // Σημεία ΑΤΜ
        }
    });
})
.catch(error => console.error('Error loading the JSON data:', error));
var atmIcon = L.icon({
    iconUrl: 'atm.webp', // Εικονίδιο ΑΤΜ
    iconSize: [32, 32], // Μέγεθος εικονιδίου
    iconAnchor: [16, 32], // Σημείο του εικονιδίου
    popupAnchor: [0, -32] // Σημείο για το popup
});

var legend = L.control({ position: 'topright' });

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-control-layers');
    div.innerHTML = '<strong>Σημεία Χάρτη:</strong><br>'
       + '<span><img src="atm.webp" style="width: 20px; height: 20px; margin-right: 10px;" /> ATM</span><br>'
        + '<span><img src="pharmacy.png" style="width: 20px; height: 20px; margin-right: 10px;" /> Φαρμακεια</span><br>'
         + '<span><img src="wifi-icon.webp" style="width: 20px; height: 20px; margin-right: 10px;" /> Δημοσιο Wifi</span><br>'
          + '<span><img src="parking-icon.png" style="width: 20px; height: 20px; margin-right: 10px;" /> Δημοσιο Παρκινγκ</span><br>'
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
        map.removeLayer(lightLayer);  // Αφαίρεση του Light Layer
        darkLayer.addTo(map);         // Προσθήκη του Dark Layer
    } else {
        map.removeLayer(darkLayer);   // Αφαίρεση του Dark Layer
        lightLayer.addTo(map);        // Προσθήκη του Light Layer
    }
    isLight = !isLight; // Αλλάζει το flag
};


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            fetchWeatherData(lat, lon);  // Κλήση συνάρτησης για λήψη δεδομένων θερμοκρασίας
        }, function(error) {
            console.error("Δεν ήταν δυνατή η απόκτηση της θέσης του χρήστη: " + error.message);
        });
    } else {
        console.log("Η γεωτοποθέτηση δεν υποστηρίζεται από τον browser.");
    }
}

function fetchWeatherData(lat, lon) {
    var apiKey = "f334ce4f82114807a7d72742242811"
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=el`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var temperature = data.main.temp;  // Θερμοκρασία σε °C
            var cityName = data.name;  // Όνομα πόλης
            var tempText = `Η τρέχουσα θερμοκρασία στην ${cityName} είναι ${temperature}°C.`;

            // Εμφάνιση της θερμοκρασίας σε ένα κουμπί ή οποιοδήποτε άλλο στοιχείο στον HTML
            var tempButton = document.getElementById('temperature-toggle');
            tempButton.textContent = tempText;
        })
        .catch(error => {
            console.error('Σφάλμα κατά την απόκτηση των δεδομένων θερμοκρασίας:', error);
        });
}
var tempButton = document.getElementById('temperature-toggle');
tempButton.onclick = function() {
    getUserLocation();
};


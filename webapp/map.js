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

// Αρχικό heatmap layer (θα φορτωθεί αργότερα)
var heatLayer;

// Συνάρτηση για να φορτώσουμε τις περιοχές από το JSON αρχείο
async function loadAreasFromJSON() {
    try {
        let response = await fetch('locations.json'); // Φόρτωση του αρχείου JSON
        let areas = await response.json(); // Ανάγνωση του JSON δεδομένου
        console.log(areas); // Εμφάνιση των περιοχών στον κονσόλα
        
        // Φόρτωση των δεδομένων του καιρού για τις περιοχές και δημιουργία heatmap
        await loadTemperatureData(areas); // Περνάμε τις περιοχές στο loadTemperatureData
    } catch (error) {
        console.log("Σφάλμα κατά τη φόρτωση των περιοχών:", error);
    }
}

// Συνάρτηση για να φορτώσουμε τα δεδομένα από την API του καιρού για τις περιοχές
async function loadTemperatureData(areas) {
    var heatData = [];

    // Κλείσιμο των αιτήσεων ταυτόχρονα για τις περιοχές γύρω από τη Θεσσαλονίκη
    var requests = areas.map(async function(area) {
        var apiKey = "f334ce4f82114807a7d72742242811"; // Αντικαταστήστε με το δικό σας API key
        var url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${area.lat},${area.lon}&lang=el`;
        
        try {
            let response = await fetch(url);
            let data = await response.json();
            
            var temperature = data.current.temp_c; // Θερμοκρασία
            var lat = data.location.lat;
            var lon = data.location.lon;

            // Προσθέτουμε τα δεδομένα στην array για το heatmap
            heatData.push([lat, lon, temperature]);
        } catch (error) {
            console.log(`Σφάλμα κατά την απόκτηση δεδομένων για την περιοχή: ${area.name}`);
        }
    });

    // Περιμένουμε όλες τις αιτήσεις να ολοκληρωθούν
    await Promise.all(requests);

    // Δημιουργία του Heatmap Layer με τα δεδομένα θερμοκρασίας
    if (heatData.length > 0) {
        heatLayer = L.heatLayer(heatData, {
            radius: 40,       // Ακτίνα του σημείου στο heatmap
            blur: 15,         // Θολούρα του heatmap
            maxZoom: 5,      // Μέγιστο zoom
            gradient: {       // Χρωματική κλίμακα για θερμοκρασία
                0.0: "blue",  // Ψυχρές θερμοκρασίες
                0.5: "yellow",// Μεσαίες θερμοκρασίες
                1.0: "red"    // Ζεστές θερμοκρασίες
            }
        }).addTo(map);
    }
}

// Φόρτωση των περιοχών και του heatmap
loadAreasFromJSON();

document.getElementById('heatmap-btn').addEventListener('click', function() {
    if (heatLayer) {
        if (map.hasLayer(heatLayer)) {
            map.removeLayer(heatLayer); // Αφαίρεση heatmap από τον χάρτη
        } else {
            map.addLayer(heatLayer); // Προσθήκη heatmap στον χάρτη
        }
    }
});

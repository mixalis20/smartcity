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
    iconUrl: 'wifi-icon.png', // Αντικατέστησε με την εικόνα για Wi-Fi
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
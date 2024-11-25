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
            L.marker([place.lat, place.lon]).addTo(map)
                .bindPopup("<b>" + place.title + "</b><br>" + place.description);
        });

    } catch (error) {
        console.log("Σφάλμα κατά τη φόρτωση των δεδομένων:", error);
    }
}

// Κλήση της συνάρτησης για να φορτωθούν τα δεδομένα και να προστεθούν στον χάρτη
loadPlaces();

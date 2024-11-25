// Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
var map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Χρησιμοποιούμε τον tile layer του OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var places = [
    {
        "title": "Λευκός Πύργος",
        "description": "Ο Λευκός Πύργος είναι το πιο διάσημο μνημείο της Θεσσαλονίκης και σημείο αναφοράς της πόλης.",
        "lat": 40.6407,
        "lon": 22.9490
    },
    {
        "title": "Ροτόντα",
        "description": "Η Ροτόντα είναι ένας από τους αρχαιότερους και πιο εμβληματικούς χώρους της Θεσσαλονίκης.",
        "lat": 40.6403,
        "lon": 22.9446
    },
    {
        "title": "Αγ. Δημήτριος",
        "description": "Ο ναός του Αγίου Δημητρίου είναι ο μεγαλύτερος και πιο σημαντικός ναός της Θεσσαλονίκης.",
        "lat": 40.6401,
        "lon": 22.9444
    }
];

// Προσθήκη σημείων στον χάρτη από το JSON
places.forEach(function(place) {
    L.marker([place.lat, place.lon]).addTo(map)
        .bindPopup("<b>" + place.title + "</b><br>" + place.description);
});
// Δημιουργία χάρτη
var map = L.map('map').setView([40.6401, 22.9444], 12); // Συντεταγμένες για Θεσσαλονίκη

// Προσθήκη του χάρτη OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Προσθήκη marker στη Θεσσαλονίκη
L.marker([40.6401, 22.9444]).addTo(map)
    .bindPopup('Θεσσαλονίκη')
    .openPopup();
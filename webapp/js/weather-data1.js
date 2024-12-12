
const map = L.map('map').setView([40.8456, 25.8741], 13);  // [latitude, longitude], zoom level

// Προσθήκη επιπέδου χάρτη από το OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

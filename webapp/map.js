// Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
var map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Χρησιμοποιούμε τον tile layer του OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Συντεταγμένες για τον Λευκό Πύργο και τη Ροτόντα
var rotunda = L.marker([40.633233, 22.953213]).addTo(map)
    .bindPopup("<b>Ροτοντα</b>");

var whiteTower = L.marker([40.626238, 22.949157]).addTo(map)
    .bindPopup("<b>Λευκός Πύργος</b>");

var rotunda = L.marker([40.624082, 22.950343]).addTo(map)
    .bindPopup("<b>ΑΓΑΛΜΑ ΜΕΓΑΛΟΥ ΑΛΕΞΑΝΔΡΟΥ</b>");
var rotunda = L.marker([40.638244, 22.959717]).addTo(map)
    .bindPopup("<b>ΚΗΠΟΙ ΤΟΥ ΠΑΣΑ</b>");
var rotunda = L.marker([40.632152, 22.951896]).addTo(map)
    .bindPopup("<b>ΑΨΙΔΑ ΤΟΥ ΓΑΛΕΡΙΟΥ</b>");

 // Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
var map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Χρησιμοποιούμε τον tile layer του OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Συντεταγμένες για τον Λευκό Πύργο και τη Ροτόντα
var whiteTower = L.marker([40.6407, 22.9490]).addTo(map)
    .bindPopup("<b>Λευκός Πύργος</b>")
    .openPopup();

var rotunda = L.marker([40.6403, 22.9446]).addTo(map)
    .bindPopup("<b>Ροτόντα</b>");

// Όταν κάνετε κλικ στις μαρκάδες, ανακατευθύνει στο gallery.html με την περιγραφή ως παράμετρο
whiteTower.on('click', function () {
    window.location.href = 'gallery.html?location=img-sights3'; // Ανακατεύθυνση με παράμετρο
});

rotunda.on('click', function () {
    window.location.href = 'gallery.html?location=Ροτόντα'; // Ανακατεύθυνση με παράμετρο
});
   

fetch('md.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
            console.log(`Τίτλος: ${location.title}`);
            console.log(`Περιγραφή: ${location.description}`);
            console.log(`Συντεταγμένες: ${location.lat}, ${location.lon}`);
        });
    })
    .catch(error => console.log('Σφάλμα φόρτωσης:', error));
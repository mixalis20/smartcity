// import places from "./md.json" assert{type:"json"};
// Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
var map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Χρησιμοποιούμε τον tile layer του OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const places =[]
async function test(){
    let data = await fetch("./md.json").then((res)=>{return res.json()}).catch((e)=>{console.log(e)})
    console.log(data)
}   

test()
 
console.log(places)
// Προσθήκη σημείων στον χάρτη από το JSON
places.length>0 && places.forEach(function(place) {
    L.marker([place.lat, place.lon]).addTo(map)
        .bindPopup("<b>" + place.title + "</b><br>" + place.description);
});
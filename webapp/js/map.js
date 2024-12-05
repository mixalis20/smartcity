// Δημιουργία χάρτη με OpenStreetMap μέσω του Leaflet.js
const map = L.map('map').setView([40.6401, 22.9444], 13); // Θεσσαλονίκη, Ελλάδα

// Tile Layers: Light και Dark
const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>'
});

// Προσθήκη του Light Layer αρχικά
lightLayer.addTo(map);

// Κουμπί για αλλαγή θέματος (Light/Dark)
const themeToggleBtn = document.getElementById('theme-toggle');
let isLightTheme = true;

themeToggleBtn?.addEventListener('click', () => {
    if (isLightTheme) {
        map.removeLayer(lightLayer);
        darkLayer.addTo(map);
    } else {
        map.removeLayer(darkLayer);
        lightLayer.addTo(map);
    }
    isLightTheme = !isLightTheme;
});

// Δημιουργία προσαρμοσμένων εικονιδίων
const createIcon = (iconUrl) => L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const icons = {
    wifi: createIcon('/webapp/images/wifi-icon.webp'),
    parking: createIcon('/webapp/images/parking-icon.png'),
    pharmacy: createIcon('/webapp/images/pharmacy.png'),
    atm: createIcon('/webapp/images/atm.webp'),
    landmark: createIcon('/webapp/images/landmark.png')
};

// Συνάρτηση για φόρτωση JSON δεδομένων και δημιουργία markers
async function loadMarkers(jsonFile, icon) {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error(`Σφάλμα φόρτωσης αρχείου ${jsonFile}`);
        
        const places = await response.json();
        places.forEach(place => {
            L.marker([place.lat, place.lon], { icon })
                .addTo(map)
                .bindPopup(`
                    <b>${place.title}</b><br>${place.description || ''}
                `);
        });
    } catch (error) {
        console.error(`Σφάλμα κατά τη φόρτωση των δεδομένων από ${jsonFile}:`, error);
    }
}

// Φόρτωση δεδομένων από αρχεία JSON
loadMarkers('/webapp/json/data.json', icons.wifi);
loadMarkers('/webapp/json/data2.json', icons.pharmacy);
loadMarkers('/webapp/json/data3.json', icons.atm);
loadMarkers('/webapp/json/data4.json', icons.parking);

// Προσθήκη legend για τα εικονίδια
const legend = L.control({ position: 'topright' });
legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'leaflet-control-layers');
    div.innerHTML = `
        <strong>Σημεία Χάρτη:</strong><br>
        <span><img src="/webapp/images/atm.webp" alt="ATM" style="width: 20px; margin-right: 5px;"> ATM</span><br>
        <span><img src="/webapp/images/pharmacy.png" alt="Pharmacy" style="width: 20px; margin-right: 5px;"> Φαρμακεία</span><br>
        <span><img src="/webapp/images/wifi-icon.webp" alt="Wi-Fi" style="width: 20px; margin-right: 5px;"> Wi-Fi</span><br>
        <span><img src="/webapp/images/parking-icon.png" alt="Parking" style="width: 20px; margin-right: 5px;"> Πάρκινγκ</span><br>
    `;
    return div;
};
legend.addTo(map);

// Heatmap για δεδομένα θερμοκρασίας
let heatLayer; // Αρχικοποίηση χωρίς τιμή για να ελέγχεται αν είναι ενεργό

async function loadHeatmapData() {
    try {
        const response = await fetch('locations.json');
        if (!response.ok) throw new Error("Σφάλμα φόρτωσης αρχείου locations.json");
        
        const areas = await response.json();
        const heatData = await fetchTemperatureData(areas);

        if (heatData.length > 0) {
            heatLayer = L.heatLayer(heatData, {
                radius: 40,
                blur: 15,
                maxZoom: 5,
                gradient: {
                    0.0: "blue",
                    0.5: "yellow",
                    1.0: "red"
                }
            });

            console.log("Heatmap δεδομένα φορτώθηκαν.");
        }
    } catch (error) {
        console.error("Σφάλμα φόρτωσης heatmap:", error);
    }
}

async function fetchTemperatureData(areas) {
    const apiKey = "f334ce4f82114807a7d72742242811"; // Αντικαταστήστε με το δικό σας API key
    const heatData = [];

    const requests = areas.map(async (area) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${area.lat},${area.lon}&lang=el`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Σφάλμα API για ${area.name}`);
            
            const data = await response.json();
            heatData.push([data.location.lat, data.location.lon, data.current.temp_c]);
        } catch (error) {
            console.error(`Σφάλμα δεδομένων για ${area.name}:`, error);
        }
    });

    await Promise.all(requests);
    return heatData;
}

// Κουμπί για ενεργοποίηση/απενεργοποίηση του Heatmap
const heatmapButton = document.getElementById('temperature-radio');

heatmapButton?.addEventListener('click', () => {
    if (!heatLayer) {
        console.log("Φόρτωση δεδομένων Heatmap...");
        loadHeatmapData().then(() => {
            if (heatLayer) {
                map.addLayer(heatLayer); // Προσθήκη Heatmap στον χάρτη
                console.log("Heatmap ενεργοποιήθηκε.");
            }
        });
    } else {
        if (map.hasLayer(heatLayer)) {
            map.removeLayer(heatLayer); // Αφαίρεση Heatmap από τον χάρτη
            console.log("Heatmap απενεργοποιήθηκε.");
        } else {
            map.addLayer(heatLayer); // Προσθήκη Heatmap στον χάρτη
            console.log("Heatmap ενεργοποιήθηκε.");
        }
    }
});

// Διορθώσεις για τα θέματα Light και Dark
const lightThemeCheckbox = document.getElementById('light-theme');
const darkThemeCheckbox = document.getElementById('dark-theme');

lightThemeCheckbox.addEventListener('change', () => {
    if (lightThemeCheckbox.checked) {
        document.body.classList.remove('dark-theme'); 
        map.removeLayer(darkLayer); 
        lightLayer.addTo(map); 
        darkThemeCheckbox.checked = false; 
    }
});

darkThemeCheckbox.addEventListener('change', () => {
    if (darkThemeCheckbox.checked) {
        document.body.classList.add('dark-theme');
        map.removeLayer(lightLayer); 
        darkLayer.addTo(map); 
        lightThemeCheckbox.checked = false;
    }
});

// Συνάρτηση για φόρτωση δεδομένων από το JSON αρχείο και προσθήκη markers
async function loadPointsOfInterest() {
    try {
        const response = await fetch('/webapp/json/md.json');  // Φόρτωση του JSON αρχείου
        if (!response.ok) throw new Error('Σφάλμα φόρτωσης σημείων ενδιαφέροντος');

        const points = await response.json();  // Μετατροπή του JSON σε αντικείμενα

        points.forEach(point => {
            const marker = L.marker([point.lat, point.lon]).addTo(map);
            marker.bindPopup(`
                <h3>${point.title}</h3>
                <img src="${point.image}" alt="${point.title}" style="width: 100px; height: auto;"/>
                <p>${point.description}</p>
                <a href="gallery.html" target="_blank" style="color: blue; text-decoration: underline;">Δες στην γκαλερί</a>
            `);
        });
    } catch (error) {
        console.error("Σφάλμα φόρτωσης των σημείων ενδιαφέροντος:", error);
    }
}

// Φόρτωση των σημείων ενδιαφέροντος από το JSON
loadPointsOfInterest();


// Μεταβλητές για τα δεδομένα του ανέμου και για το layer του ανέμου
let windData = [];
let windMarkers = [];  // Μεταβλητή για να αποθηκεύουμε τα markers

// Δημιουργία περισσότερων δεδομένων για πυκνότερη κάλυψη
function generateDenseWindData() {
  let denseData = [];
  
  // Δημιουργία πιο πυκνών σημείων γύρω από τη Θεσσαλονίκη
  for (let i = 0; i < 100; i++) {
    let latOffset = (Math.random() - 0.5) * 0.05; // Δημιουργεί διαφορά 0.05 στον γεωγραφικό πλάτος
    let lonOffset = (Math.random() - 0.5) * 0.05; // Δημιουργεί διαφορά 0.05 στον γεωγραφικό μήκος

    denseData.push({
      lat: 40.6401 + latOffset,
      lon: 22.9444 + lonOffset,
      windSpeed: Math.random() * 10, // Τυχαία ταχύτητα ανέμου από 0 έως 10 m/s
      windDeg: Math.random() * 360, // Τυχαία κατεύθυνση ανέμου από 0 έως 360 μοίρες
    });
  }
  return denseData;
}

// Φόρτωση των δεδομένων
function loadWindData() {
  // Αντί για δεδομένα JSON, θα χρησιμοποιήσουμε τεχνητά πυκνότερα δεδομένα
  windData = generateDenseWindData();

  // Αφαίρεση προηγούμενων markers
  windMarkers.forEach(marker => marker.remove());
  windMarkers = [];  // Επαναφορά της λίστας με τα markers

  // Προσθήκη των νέων δεδομένων του ανέμου στον χάρτη
  windData.forEach(function(wind) {
    // Δημιουργία του εικονιδίου του ανέμου (βέλος)
    const windDirection = wind.windDeg; // Κατεύθυνση του ανέμου
    const windIcon = L.divIcon({
      className: 'wind-arrow',
      html: `<i style="transform: rotate(${windDirection}deg); font-size: 24px;">&#8595;</i>`,  // Ένα απλό βέλος
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    // Τοποθέτηση των βελών στον χάρτη
    const marker = L.marker([wind.lat, wind.lon], { icon: windIcon }).addTo(map);
    windMarkers.push(marker);  // Αποθήκευση του marker στη λίστα
  });
}

// Όταν πατηθεί το κουμπί, να εμφανιστεί ο άνεμος
document.getElementById('wind-radio').addEventListener('click', function() {
  loadWindData();  // Φορτώνει και εμφανίζει τα δεδομένα του ανέμου
});

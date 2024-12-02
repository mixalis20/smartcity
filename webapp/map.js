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
    wifi: createIcon('wifi-icon.webp'),
    parking: createIcon('parking-icon.png'),
    pharmacy: createIcon('pharmacy.png'),
    atm: createIcon('atm.webp'),
    landmark: createIcon('landmark.png') 
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
loadMarkers('data.json', icons.wifi);
loadMarkers('data2.json', icons.pharmacy);
loadMarkers('data3.json', icons.atm);
loadMarkers('data4.json', icons.parking);
loadMarkers('mdjsaon');

// Προσθήκη legend για τα εικονίδια
const legend = L.control({ position: 'topright' });
legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'leaflet-control-layers');
    div.innerHTML = `
        <strong>Σημεία Χάρτη:</strong><br>
        <span><img src="atm.webp" alt="ATM" style="width: 20px; margin-right: 5px;"> ATM</span><br>
        <span><img src="pharmacy.png" alt="Pharmacy" style="width: 20px; margin-right: 5px;"> Φαρμακεία</span><br>
        <span><img src="wifi-icon.webp" alt="Wi-Fi" style="width: 20px; margin-right: 5px;"> Wi-Fi</span><br>
        <span><img src="parking-icon.png" alt="Parking" style="width: 20px; margin-right: 5px;"> Πάρκινγκ</span><br>
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
        // Ενεργοποιούμε το Dark Theme
        document.body.classList.add('dark-theme'); // Προσθέτουμε την κλάση dark-theme στο body
        map.removeLayer(lightLayer); // Αφαιρούμε το lightLayer από τον χάρτη
        darkLayer.addTo(map); // Προσθέτουμε το darkLayer στον χάρτη
        lightThemeCheckbox.checked = false; // Απενεργοποιούμε το Light Theme checkbox
    }
});



// Συνάρτηση για φόρτωση δεδομένων από το JSON αρχείο και προσθήκη markers
async function loadPointsOfInterest() {
    try {
        const response = await fetch('md.json');  // Φόρτωση του JSON αρχείου
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

// Προσθέτουμε στυλ στο popup μέσω του Leaflet
marker.on('popupopen', function() {
    const popupContent = marker.getPopup().getContent();
    const popupElement = popupContent.querySelector('.leaflet-popup-content');
    popupElement.style.width = '250px'; // Μικρότερο μέγεθος
    popupElement.style.fontSize = '14px'; // Μικρότερο μέγεθος γραμματοσειράς
});




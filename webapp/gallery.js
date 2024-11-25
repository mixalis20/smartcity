// Λήψη της παράμετρου από το URL
const urlParams = new URLSearchParams(window.location.search);
const location = urlParams.get('location');

// Εμφάνιση της περιγραφής της τοποθεσίας
if (location) {
    document.getElementById('location-description').innerHTML = `<p>Επιλέξατε: ${location}</p>`;
} else {
    document.getElementById('location-description').innerHTML = '<p>Δεν επιλέξατε καμία τοποθεσία.</p>';
}
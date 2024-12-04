// Συνάρτηση για να φορτώσουμε τα δεδομένα από το αρχείο JSON
fetch('/webapp/json/dashboard.json')
    .then(response => response.json())
    .then(data => {
        // Αναφορά των στοιχείων που θέλουμε να εμφανίσουμε
        const dates = data.dates;
        const temperatures = data.temperatures;

        // Στοιχείο του dashboard που θα περιέχει τις κάρτες
        const temperatureCardsContainer = document.querySelector('.temperature-cards');

        // Για κάθε ημέρα και θερμοκρασία, δημιουργούμε μια κάρτα
        dates.forEach((day, index) => {
            const temp = temperatures[index];

            // Δημιουργία της κάρτας
            const card = document.createElement('div');
            card.classList.add('temperature-card');

            // Περιεχόμενο για την κάρτα
            card.innerHTML = `
                <div class="day">${day}</div>
                <div class="temp">${temp}°C</div>
                <div class="unit">Θερμοκρασία</div>
            `;

            // Προσθήκη της κάρτας στο container
            temperatureCardsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Σφάλμα κατά τη φόρτωση των δεδομένων:", error);
    });

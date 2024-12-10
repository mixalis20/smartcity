const greyHart = document.querySelector('.grey-hart');
const redHart = document.querySelector('.red-hart');

// Ελέγξτε αν οι επιλογείς λειτουργούν σωστά
console.log(greyHart);  // Θα εμφανιστεί το στοιχείο της γκρίζας καρδιάς
console.log(redHart);   // Θα εμφανιστεί το στοιχείο της κόκκινης καρδιάς

// Προσθήκη του event listener για το κλικ στη γκρίζα καρδιά
greyHart.addEventListener('click', () => {
    console.log("Κλικ στο κουμπί!"); // Ελέγξτε αν εκτελείται το event listener

    // Κάνει την καρδιά ορατή
    redHart.style.opacity = '1';
    console.log("Η κόκκινη καρδιά έγινε ορατή");

    // Προσθήκη της κλάσης για να ξεκινήσει το animation
    redHart.classList.add('animation');

    // Επαναφορά της καρδιάς στην αόρατη κατάσταση μετά το animation
    setTimeout(() => {
        redHart.classList.remove('animation');
        redHart.style.opacity = '0'; // Επαναφέρει την αόρατη κατάσταση
        console.log("Η καρδιά επανήλθε στην αρχική κατάσταση");
    }, 900); // Η διάρκεια του animation
});

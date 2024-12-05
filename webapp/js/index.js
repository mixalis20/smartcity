 // Εφέ κύλισης για το μενού
 window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Εφέ καλωσορίσματος
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.querySelector('.container h1');
    setTimeout(() => {
        welcomeMessage.style.animation = 'fadeInUp 1s forwards';
    }, 500);
});
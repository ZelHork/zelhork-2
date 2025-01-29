document.addEventListener('DOMContentLoaded', () => {
    // Sidebar functionality
    const sideNav = document.getElementById('sideNav');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const mainContent = document.getElementById('mainContent');

    openBtn.addEventListener('click', () => {
        sideNav.classList.add('active');
        mainContent.style.marginLeft = "280px";
    });

    closeBtn.addEventListener('click', () => {
        sideNav.classList.remove('active');
        mainContent.style.marginLeft = "0";
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !openBtn.contains(e.target)) {
            sideNav.classList.remove('active');
            mainContent.style.marginLeft = "0";
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Close sidebar on nav link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            sideNav.classList.remove('active');
            mainContent.style.marginLeft = "0";
        });
    });
});
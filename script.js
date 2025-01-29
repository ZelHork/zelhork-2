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

// Email validation function
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const formMessages = document.getElementById('formMessages');
    
    // Reset messages
    emailError.style.display = 'none';
    formMessages.style.display = 'none';

    // Validate email format
    if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        return;
    }

    // Submit form using Formspree
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessages.textContent = 'Message sent successfully! 🚀';
            formMessages.className = 'form-messages success';
            this.reset();
        } else {
            formMessages.textContent = 'Oops! There was a problem. Please try again.';
            formMessages.className = 'form-messages error';
        }
        formMessages.style.display = 'block';
    })
    .catch(error => {
        formMessages.textContent = 'Oops! There was a network error.';
        formMessages.className = 'form-messages error';
        formMessages.style.display = 'block';
    });
});

// Real-time email validation
document.getElementById('emailInput').addEventListener('input', function() {
    const emailError = document.getElementById('emailError');
    if (!isValidEmail(this.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }
});

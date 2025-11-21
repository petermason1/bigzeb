// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ownership form submission
const ownershipForm = document.getElementById('ownership-form');
if (ownershipForm) {
    ownershipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you soon about racehorse ownership opportunities.');
        ownershipForm.reset();
    });
}

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all hero sections
document.querySelectorAll('.hero-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// CTA button interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load random racing silk from JSON file
async function loadRacingSilk() {
    try {
        const response = await fetch('2025-11-21-racecards.scored.json');
        const data = await response.json();
        
        // Collect all available silks from the JSON
        const allSilks = [];
        
        if (data.racecards && Array.isArray(data.racecards)) {
            data.racecards.forEach(racecard => {
                if (racecard.runners && Array.isArray(racecard.runners)) {
                    racecard.runners.forEach(runner => {
                        if (runner.silk_url && runner.silk_url.trim()) {
                            allSilks.push(runner.silk_url);
                        }
                    });
                }
            });
        }
        
        // Get a random silk
        let silkUrl = null;
        if (allSilks.length > 0) {
            const randomIndex = Math.floor(Math.random() * allSilks.length);
            silkUrl = allSilks[randomIndex];
        }
        
        // Set the silk image
        const silkImg = document.getElementById('racing-silk');
        if (silkImg && silkUrl) {
            silkImg.src = silkUrl;
            silkImg.style.display = 'block';
        } else if (silkImg) {
            // Fallback if no silks found
            silkImg.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading racing silk:', error);
        const silkImg = document.getElementById('racing-silk');
        if (silkImg) {
            silkImg.style.display = 'none';
        }
    }
}

// Load silk on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRacingSilk);
} else {
    loadRacingSilk();
}

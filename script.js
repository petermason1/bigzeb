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
        const formData = new FormData(ownershipForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your interest! We will contact you soon about racehorse ownership opportunities.');
        ownershipForm.reset();
    });
}

// Donation functionality
const donationButtons = document.querySelectorAll('.donation-btn');
const customDonationInput = document.querySelector('.donation-box input[type="number"]');
const donateNowButton = document.querySelector('.donation-box .cta-button');

donationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active state from all buttons
        donationButtons.forEach(btn => {
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
            btn.style.color = 'white';
        });
        
        // Set active state
        button.style.background = 'white';
        button.style.color = 'var(--text-primary)';
        
        // Set custom input value
        if (customDonationInput) {
            customDonationInput.value = button.textContent.replace('£', '');
        }
    });
});

if (donateNowButton) {
    donateNowButton.addEventListener('click', () => {
        const amount = customDonationInput?.value || 'selected amount';
        alert(`Thank you for your donation of £${amount}! Your contribution helps protect red squirrels.`);
        if (customDonationInput) {
            customDonationInput.value = '';
        }
        donationButtons.forEach(btn => {
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
            btn.style.color = 'white';
        });
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

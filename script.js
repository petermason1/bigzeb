// Counter functionality
let counter = 0;
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

function updateCounter() {
    counterValue.textContent = counter;
    counterValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 200);
}

// Theme color functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const root = document.documentElement;

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        const color = getComputedStyle(button).backgroundColor;
        
        // Remove active class from all buttons
        themeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update CSS variable
        root.style.setProperty('--primary-color', color);
    });
});

// Set default theme (blue)
document.querySelector('.theme-btn[data-theme="blue"]').classList.add('active');

// Message display functionality
const messageInput = document.getElementById('message-input');
const displayBtn = document.getElementById('display-btn');
const messageDisplay = document.getElementById('message-display');

displayBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        messageDisplay.textContent = message;
        messageDisplay.classList.add('has-message');
    } else {
        messageDisplay.textContent = 'No message entered';
        messageDisplay.classList.remove('has-message');
    }
});

// Allow Enter key to submit message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        displayBtn.click();
    }
});

// Add smooth animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});


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

// Music player functionality
const musicFileInput = document.getElementById('music-file');
const audioPlayer = document.getElementById('audio-player');
const musicStatus = document.getElementById('music-status');

musicFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        audioPlayer.style.display = 'block';
        musicStatus.textContent = `Now playing: ${file.name}`;
        musicStatus.style.color = 'var(--primary-color)';
    }
});

// Kno What A Mean Counter
let knoCounter = 0;
const knoCounterValue = document.getElementById('kno-counter-value');
const knoBtn = document.getElementById('kno-btn');

knoBtn.addEventListener('click', () => {
    knoCounter++;
    knoCounterValue.textContent = knoCounter;
    knoCounterValue.style.transform = 'scale(1.3)';
    knoCounterValue.style.color = '#ef4444';
    setTimeout(() => {
        knoCounterValue.style.transform = 'scale(1)';
        knoCounterValue.style.color = 'var(--primary-color)';
    }, 300);
});

// Rogers Proafanersaurus Generator
const wiganSayings = [
    "chuffed to bits",
    "proper mint",
    "dead good",
    "sound as a pound",
    "bobbins",
    "mithering",
    "gobsmacked",
    "champion",
    "cracking",
    "brilliant",
    "mega",
    "boss",
    "ace",
    "smashing",
    "belter"
];

const geordieSayings = [
    "canny",
    "divvent",
    "gan",
    "hinny",
    "pet",
    "whey aye",
    "howay",
    "bairn",
    "gadgie",
    "clarts",
    "bait",
    "netty",
    "cushdy",
    "radge",
    "belta"
];

const manUtdReferences = [
    "like Man Utd winning the league",
    "better than watching the Red Devils",
    "proper Man Utd that",
    "as good as a Ronaldo goal",
    "champion like Fergie",
    "red through and through",
    "Old Trafford quality",
    "United way"
];

const rogersTemplates = [
    "That's {wigan} {geordie}, {manutd}, kno what a mean?",
    "Whey aye, that's {wigan} {geordie} that, {manutd}!",
    "{geordie} {wigan}, {manutd}, kno what a mean?",
    "Howay man, that's {wigan} {geordie}, {manutd}!",
    "{wigan} {geordie} that, {manutd}, kno what a mean?",
    "Canny {wigan} {geordie}, {manutd}!",
    "{geordie} {wigan} that, {manutd}, kno what a mean?",
    "That's {wigan} {geordie}, {manutd}, hinny!"
];

const generateRogersBtn = document.getElementById('generate-rogers-btn');
const rogersSaying = document.getElementById('rogers-saying');

generateRogersBtn.addEventListener('click', () => {
    const wigan = wiganSayings[Math.floor(Math.random() * wiganSayings.length)];
    const geordie = geordieSayings[Math.floor(Math.random() * geordieSayings.length)];
    const manutd = manUtdReferences[Math.floor(Math.random() * manUtdReferences.length)];
    const template = rogersTemplates[Math.floor(Math.random() * rogersTemplates.length)];
    
    let saying = template
        .replace('{wigan}', wigan)
        .replace('{geordie}', geordie)
        .replace('{manutd}', manutd);
    
    rogersSaying.textContent = saying;
    rogersSaying.style.opacity = '0';
    rogersSaying.style.transform = 'translateY(10px)';
    setTimeout(() => {
        rogersSaying.style.transition = 'opacity 0.3s, transform 0.3s';
        rogersSaying.style.opacity = '1';
        rogersSaying.style.transform = 'translateY(0)';
    }, 10);
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

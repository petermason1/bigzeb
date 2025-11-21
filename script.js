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

// Diet card selection
document.querySelectorAll('.diet-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.diet-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const diet = card.getAttribute('data-diet');
        document.getElementById('diet-select').value = diet;
    });
});

// Meal Plan Generator
const mealDatabase = {
    keto: {
        breakfast: [
            { name: "Keto Scrambled Eggs", items: ["3 eggs", "2 tbsp butter", "2 oz cheddar cheese", "2 slices bacon", "1/2 avocado"] },
            { name: "Keto Smoothie", items: ["1 cup unsweetened almond milk", "2 tbsp MCT oil", "1 scoop protein powder", "1/4 cup berries", "1 tbsp almond butter"] },
            { name: "Keto Pancakes", items: ["4 eggs", "4 oz cream cheese", "2 tbsp almond flour", "1 tsp vanilla", "Butter for cooking"] },
            { name: "Bacon & Eggs", items: ["4 slices bacon", "2 fried eggs", "1/2 avocado", "Spinach sautéed in butter"] }
        ],
        lunch: [
            { name: "Keto Salad", items: ["Mixed greens", "Grilled chicken breast", "Avocado", "Olive oil dressing", "Nuts"] },
            { name: "Keto Burger", items: ["Beef patty", "Lettuce wrap", "Cheese", "Bacon", "Mayo", "Pickles"] },
            { name: "Salmon & Vegetables", items: ["6 oz salmon", "Broccoli", "Cauliflower", "Butter", "Lemon"] },
            { name: "Keto Taco Bowl", items: ["Ground beef", "Lettuce", "Cheese", "Sour cream", "Avocado", "Salsa"] }
        ],
        dinner: [
            { name: "Steak & Asparagus", items: ["8 oz ribeye", "Asparagus with butter", "Mushrooms", "Cauliflower mash"] },
            { name: "Keto Pizza", items: ["Fathead dough", "Pepperoni", "Mozzarella", "Olives", "Bell peppers"] },
            { name: "Chicken Thighs", items: ["4 chicken thighs", "Zucchini noodles", "Alfredo sauce", "Parmesan"] },
            { name: "Keto Chili", items: ["Ground beef", "Bell peppers", "Onion", "Tomatoes", "Cheese", "Sour cream"] }
        ],
        snacks: [
            { name: "Cheese & Nuts", items: ["String cheese", "Almonds"] },
            { name: "Keto Fat Bombs", items: ["Coconut oil", "Cocoa powder", "Stevia"] },
            { name: "Pork Rinds", items: ["Pork rinds", "Guacamole"] }
        ]
    },
    mediterranean: {
        breakfast: [
            { name: "Greek Yogurt Bowl", items: ["Greek yogurt", "Honey", "Berries", "Nuts", "Granola"] },
            { name: "Mediterranean Omelet", items: ["3 eggs", "Feta cheese", "Tomatoes", "Olives", "Spinach"] },
            { name: "Whole Grain Toast", items: ["Whole grain bread", "Avocado", "Olive oil", "Tomatoes", "Feta"] },
            { name: "Oatmeal", items: ["Steel-cut oats", "Berries", "Nuts", "Honey", "Greek yogurt"] }
        ],
        lunch: [
            { name: "Mediterranean Salad", items: ["Mixed greens", "Grilled chicken", "Feta", "Olives", "Cucumber", "Olive oil"] },
            { name: "Hummus Wrap", items: ["Whole grain wrap", "Hummus", "Vegetables", "Feta", "Olive oil"] },
            { name: "Quinoa Bowl", items: ["Quinoa", "Chickpeas", "Vegetables", "Feta", "Lemon dressing"] },
            { name: "Grilled Fish", items: ["White fish", "Lemon", "Herbs", "Roasted vegetables", "Olive oil"] }
        ],
        dinner: [
            { name: "Mediterranean Pasta", items: ["Whole grain pasta", "Olive oil", "Garlic", "Tomatoes", "Basil", "Parmesan"] },
            { name: "Greek Chicken", items: ["Chicken breast", "Lemon", "Oregano", "Roasted vegetables", "Feta"] },
            { name: "Stuffed Peppers", items: ["Bell peppers", "Quinoa", "Ground turkey", "Tomatoes", "Herbs"] },
            { name: "Mediterranean Stew", items: ["Chickpeas", "Vegetables", "Tomatoes", "Herbs", "Olive oil"] }
        ],
        snacks: [
            { name: "Hummus & Veggies", items: ["Hummus", "Carrots", "Cucumber", "Bell peppers"] },
            { name: "Nuts & Dried Fruit", items: ["Almonds", "Walnuts", "Dates"] },
            { name: "Greek Yogurt", items: ["Greek yogurt", "Honey", "Nuts"] }
        ]
    },
    paleo: {
        breakfast: [
            { name: "Paleo Scramble", items: ["3 eggs", "Bacon", "Sweet potato", "Spinach", "Avocado"] },
            { name: "Paleo Smoothie", items: ["Coconut milk", "Berries", "Banana", "Almond butter", "Spinach"] },
            { name: "Sweet Potato Hash", items: ["Sweet potato", "Ground turkey", "Bell peppers", "Onion", "Eggs"] },
            { name: "Paleo Pancakes", items: ["Banana", "Eggs", "Almond flour", "Coconut oil"] }
        ],
        lunch: [
            { name: "Paleo Salad", items: ["Mixed greens", "Grilled chicken", "Nuts", "Olive oil", "Lemon"] },
            { name: "Paleo Burger", items: ["Beef patty", "Lettuce wrap", "Bacon", "Avocado", "Tomato"] },
            { name: "Chicken & Vegetables", items: ["Chicken breast", "Roasted vegetables", "Sweet potato"] },
            { name: "Paleo Bowl", items: ["Ground beef", "Cauliflower rice", "Vegetables", "Avocado"] }
        ],
        dinner: [
            { name: "Grilled Steak", items: ["Ribeye", "Roasted vegetables", "Sweet potato"] },
            { name: "Paleo Chili", items: ["Ground beef", "Bell peppers", "Onion", "Tomatoes", "Spices"] },
            { name: "Salmon & Veggies", items: ["Salmon fillet", "Asparagus", "Sweet potato", "Lemon"] },
            { name: "Paleo Stir Fry", items: ["Chicken", "Vegetables", "Coconut aminos", "Nuts"] }
        ],
        snacks: [
            { name: "Nuts & Seeds", items: ["Almonds", "Walnuts", "Pumpkin seeds"] },
            { name: "Fruit & Nut Butter", items: ["Apple", "Almond butter"] },
            { name: "Hard Boiled Eggs", items: ["2 eggs"] }
        ]
    },
    vegan: {
        breakfast: [
            { name: "Vegan Smoothie Bowl", items: ["Banana", "Berries", "Plant milk", "Granola", "Nuts", "Seeds"] },
            { name: "Avocado Toast", items: ["Whole grain bread", "Avocado", "Tomatoes", "Sprouts", "Lemon"] },
            { name: "Overnight Oats", items: ["Oats", "Plant milk", "Berries", "Nuts", "Chia seeds"] },
            { name: "Tofu Scramble", items: ["Tofu", "Turmeric", "Vegetables", "Whole grain toast"] }
        ],
        lunch: [
            { name: "Vegan Buddha Bowl", items: ["Quinoa", "Chickpeas", "Vegetables", "Tahini dressing", "Nuts"] },
            { name: "Lentil Soup", items: ["Lentils", "Vegetables", "Herbs", "Whole grain bread"] },
            { name: "Vegan Wrap", items: ["Whole grain wrap", "Hummus", "Vegetables", "Avocado", "Sprouts"] },
            { name: "Chickpea Salad", items: ["Chickpeas", "Vegetables", "Olive oil", "Lemon", "Herbs"] }
        ],
        dinner: [
            { name: "Vegan Pasta", items: ["Whole grain pasta", "Marinara", "Vegetables", "Nutritional yeast"] },
            { name: "Vegan Curry", items: ["Chickpeas", "Coconut milk", "Vegetables", "Rice", "Spices"] },
            { name: "Stuffed Bell Peppers", items: ["Bell peppers", "Quinoa", "Black beans", "Vegetables", "Spices"] },
            { name: "Vegan Tacos", items: ["Lentils", "Corn tortillas", "Vegetables", "Avocado", "Salsa"] }
        ],
        snacks: [
            { name: "Hummus & Veggies", items: ["Hummus", "Carrots", "Cucumber", "Bell peppers"] },
            { name: "Nuts & Dried Fruit", items: ["Almonds", "Dates", "Raisins"] },
            { name: "Vegan Energy Balls", items: ["Dates", "Nuts", "Cocoa powder", "Coconut"] }
        ]
    },
    lowcarb: {
        breakfast: [
            { name: "Low-Carb Scramble", items: ["3 eggs", "Cheese", "Bacon", "Spinach", "Mushrooms"] },
            { name: "Greek Yogurt Bowl", items: ["Greek yogurt", "Berries", "Nuts", "Seeds"] },
            { name: "Low-Carb Smoothie", items: ["Protein powder", "Almond milk", "Berries", "Spinach", "Almond butter"] },
            { name: "Egg Muffins", items: ["Eggs", "Cheese", "Vegetables", "Bacon"] }
        ],
        lunch: [
            { name: "Low-Carb Salad", items: ["Mixed greens", "Grilled chicken", "Cheese", "Nuts", "Olive oil"] },
            { name: "Lettuce Wraps", items: ["Ground turkey", "Lettuce", "Vegetables", "Sauce"] },
            { name: "Zucchini Noodles", items: ["Zucchini", "Pesto", "Chicken", "Parmesan"] },
            { name: "Cauliflower Rice Bowl", items: ["Cauliflower rice", "Protein", "Vegetables", "Sauce"] }
        ],
        dinner: [
            { name: "Grilled Protein", items: ["Chicken/Beef/Fish", "Roasted vegetables", "Cauliflower mash"] },
            { name: "Low-Carb Pizza", items: ["Cauliflower crust", "Cheese", "Meat", "Vegetables"] },
            { name: "Stir Fry", items: ["Protein", "Vegetables", "Low-carb sauce", "Cauliflower rice"] },
            { name: "Casserole", items: ["Ground meat", "Cheese", "Vegetables", "Cream"] }
        ],
        snacks: [
            { name: "Cheese & Nuts", items: ["String cheese", "Almonds"] },
            { name: "Veggies & Dip", items: ["Celery", "Cucumber", "Ranch dip"] },
            { name: "Protein Shake", items: ["Protein powder", "Almond milk"] }
        ]
    },
    carnivore: {
        breakfast: [
            { name: "Steak & Eggs", items: ["6 oz steak", "3 eggs", "Butter"] },
            { name: "Bacon & Eggs", items: ["6 slices bacon", "4 eggs", "Butter"] },
            { name: "Ribeye", items: ["8 oz ribeye", "Butter"] },
            { name: "Ground Beef Scramble", items: ["8 oz ground beef", "3 eggs", "Butter"] }
        ],
        lunch: [
            { name: "Beef Patties", items: ["12 oz ground beef", "Butter", "Salt"] },
            { name: "Chicken Thighs", items: ["6 chicken thighs", "Butter"] },
            { name: "Pork Chops", items: ["2 pork chops", "Butter"] },
            { name: "Lamb Chops", items: ["4 lamb chops", "Butter"] }
        ],
        dinner: [
            { name: "Ribeye Steak", items: ["12 oz ribeye", "Butter", "Salt"] },
            { name: "Salmon", items: ["8 oz salmon", "Butter"] },
            { name: "Beef Roast", items: ["8 oz beef roast", "Butter"] },
            { name: "Liver & Eggs", items: ["4 oz liver", "3 eggs", "Butter"] }
        ],
        snacks: [
            { name: "Beef Jerky", items: ["Beef jerky"] },
            { name: "Hard Boiled Eggs", items: ["3 eggs"] },
            { name: "Pork Rinds", items: ["Pork rinds"] }
        ]
    },
    intermittent: {
        breakfast: [
            { name: "Breaking Fast Meal", items: ["Protein smoothie", "Eggs", "Avocado", "Whole grain toast"] },
            { name: "High Protein Breakfast", items: ["Greek yogurt", "Berries", "Nuts", "Protein powder"] },
            { name: "Balanced Meal", items: ["Oatmeal", "Protein", "Fruits", "Nuts"] },
            { name: "Hearty Breakfast", items: ["Eggs", "Bacon", "Sweet potato", "Vegetables"] }
        ],
        lunch: [
            { name: "Protein & Veggies", items: ["Grilled chicken", "Quinoa", "Roasted vegetables", "Olive oil"] },
            { name: "Balanced Bowl", items: ["Protein", "Grains", "Vegetables", "Healthy fats"] },
            { name: "Salad Bowl", items: ["Mixed greens", "Protein", "Nuts", "Olive oil dressing"] },
            { name: "Wrap", items: ["Whole grain wrap", "Protein", "Vegetables", "Hummus"] }
        ],
        dinner: [
            { name: "Complete Meal", items: ["Protein", "Complex carbs", "Vegetables", "Healthy fats"] },
            { name: "Balanced Plate", items: ["Fish", "Brown rice", "Vegetables", "Olive oil"] },
            { name: "Hearty Dinner", items: ["Steak", "Sweet potato", "Vegetables", "Butter"] },
            { name: "Nutritious Meal", items: ["Chicken", "Quinoa", "Vegetables", "Nuts"] }
        ],
        snacks: [
            { name: "Protein Snack", items: ["Greek yogurt", "Nuts"] },
            { name: "Fruit & Nut Butter", items: ["Apple", "Almond butter"] },
            { name: "Trail Mix", items: ["Nuts", "Dried fruit", "Seeds"] }
        ]
    },
    dash: {
        breakfast: [
            { name: "Oatmeal Bowl", items: ["Steel-cut oats", "Berries", "Nuts", "Low-fat milk"] },
            { name: "Whole Grain Toast", items: ["Whole grain bread", "Avocado", "Tomatoes", "Low-fat cheese"] },
            { name: "Greek Yogurt", items: ["Greek yogurt", "Berries", "Granola", "Nuts"] },
            { name: "Egg White Scramble", items: ["Egg whites", "Vegetables", "Whole grain toast"] }
        ],
        lunch: [
            { name: "DASH Salad", items: ["Mixed greens", "Grilled chicken", "Vegetables", "Olive oil"] },
            { name: "Whole Grain Wrap", items: ["Whole grain wrap", "Turkey", "Vegetables", "Hummus"] },
            { name: "Quinoa Bowl", items: ["Quinoa", "Chickpeas", "Vegetables", "Lemon dressing"] },
            { name: "Grilled Fish", items: ["White fish", "Brown rice", "Vegetables", "Herbs"] }
        ],
        dinner: [
            { name: "DASH Plate", items: ["Lean protein", "Whole grains", "Vegetables", "Fruits"] },
            { name: "Chicken & Rice", items: ["Chicken breast", "Brown rice", "Vegetables", "Herbs"] },
            { name: "Mediterranean Style", items: ["Fish", "Whole grain pasta", "Vegetables", "Olive oil"] },
            { name: "Stuffed Vegetables", items: ["Bell peppers", "Lean ground turkey", "Brown rice", "Vegetables"] }
        ],
        snacks: [
            { name: "Fruits & Nuts", items: ["Apple", "Almonds"] },
            { name: "Veggies & Hummus", items: ["Carrots", "Cucumber", "Hummus"] },
            { name: "Greek Yogurt", items: ["Greek yogurt", "Berries"] }
        ]
    }
};

function getRandomMeal(meals) {
    return meals[Math.floor(Math.random() * meals.length)];
}

function calculateMealCalories(totalCalories, mealsPerDay, mealType) {
    const mealRatios = {
        breakfast: 0.3,
        lunch: 0.35,
        dinner: 0.35,
        snacks: 0.1
    };
    return Math.round(totalCalories * mealRatios[mealType] / (mealsPerDay > 3 ? 1 : 1));
}

function generateMealPlan() {
    const diet = document.getElementById('diet-select').value;
    const calories = parseInt(document.getElementById('calories').value) || 2000;
    const mealsPerDay = parseInt(document.getElementById('meals-per-day').value) || 3;
    const days = parseInt(document.getElementById('plan-days').value) || 7;
    const restrictions = document.getElementById('dietary-restrictions').value;

    if (!diet) {
        alert('Please select a diet first!');
        return;
    }

    const output = document.getElementById('meal-plan-output');
    output.innerHTML = '';
    output.classList.add('active');

    const dietData = mealDatabase[diet];
    if (!dietData) {
        output.innerHTML = '<p>Diet data not available.</p>';
        return;
    }

    for (let day = 1; day <= days; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'meal-plan-day';
        dayDiv.innerHTML = `<h4>Day ${day}</h4>`;

        // Breakfast
        if (mealsPerDay >= 3) {
            const breakfast = getRandomMeal(dietData.breakfast);
            const breakfastDiv = document.createElement('div');
            breakfastDiv.className = 'meal-item';
            breakfastDiv.innerHTML = `
                <h5>Breakfast (~${calculateMealCalories(calories, mealsPerDay, 'breakfast')} cal)</h5>
                <p><strong>${breakfast.name}</strong></p>
                <ul>
                    ${breakfast.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            dayDiv.appendChild(breakfastDiv);
        }

        // Lunch
        if (mealsPerDay >= 2) {
            const lunch = getRandomMeal(dietData.lunch);
            const lunchDiv = document.createElement('div');
            lunchDiv.className = 'meal-item';
            lunchDiv.innerHTML = `
                <h5>Lunch (~${calculateMealCalories(calories, mealsPerDay, 'lunch')} cal)</h5>
                <p><strong>${lunch.name}</strong></p>
                <ul>
                    ${lunch.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            dayDiv.appendChild(lunchDiv);
        }

        // Dinner
        const dinner = getRandomMeal(dietData.dinner);
        const dinnerDiv = document.createElement('div');
        dinnerDiv.className = 'meal-item';
        dinnerDiv.innerHTML = `
            <h5>Dinner (~${calculateMealCalories(calories, mealsPerDay, 'dinner')} cal)</h5>
            <p><strong>${dinner.name}</strong></p>
            <ul>
                ${dinner.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        dayDiv.appendChild(dinnerDiv);

        // Snacks (if 4+ meals)
        if (mealsPerDay >= 4) {
            const snack = getRandomMeal(dietData.snacks);
            const snackDiv = document.createElement('div');
            snackDiv.className = 'meal-item';
            snackDiv.innerHTML = `
                <h5>Snack (~${calculateMealCalories(calories, mealsPerDay, 'snacks')} cal)</h5>
                <p><strong>${snack.name}</strong></p>
                <ul>
                    ${snack.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            dayDiv.appendChild(snackDiv);
        }

        if (restrictions) {
            const restrictionNote = document.createElement('p');
            restrictionNote.style.marginTop = '1rem';
            restrictionNote.style.fontStyle = 'italic';
            restrictionNote.style.opacity = '0.9';
            restrictionNote.textContent = `Note: Adjust meals based on your restrictions: ${restrictions}`;
            dayDiv.appendChild(restrictionNote);
        }

        output.appendChild(dayDiv);
    }

    const summary = document.createElement('div');
    summary.className = 'meal-plan-summary';
    summary.innerHTML = `
        <p>Total Daily Calories: ~${calories} | Meals per Day: ${mealsPerDay} | Diet: ${document.getElementById('diet-select').selectedOptions[0].text}</p>
    `;
    output.appendChild(summary);

    // Scroll to output
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('generate-meal-plan').addEventListener('click', generateMealPlan);

// Business form submission
const businessForm = document.getElementById('business-form');
if (businessForm) {
    businessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you soon about growing your business.');
        businessForm.reset();
    });
}

// Golf notify form
const golfNotifyForm = document.getElementById('golf-notify-form');
if (golfNotifyForm) {
    golfNotifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will notify you when our golf services launch.');
        golfNotifyForm.reset();
    });
}

// Advert form submission
const advertForm = document.getElementById('advert-form');
if (advertForm) {
    advertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you with a quote soon.');
        advertForm.reset();
    });
}

// Rogers Profanersaurus Generator
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

if (generateRogersBtn && rogersSaying) {
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
}

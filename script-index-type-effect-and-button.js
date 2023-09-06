const continueButton = document.getElementById('continue-button');
const welcome = document.querySelector('.welcome');
const dinoperson = document.querySelector('.dinoperson');

// Delay the blend-in effect and typing animation
setTimeout(() => {
    const continueButton = document.getElementById('continue-button');
    continueButton.classList.add('blend-in');
}, 3500); // Adjust the delay as needed

continueButton.addEventListener('click', (event) => {
    // Add the slide-up class to initiate the animation
    welcome.classList.add('slide-up');
    dinoperson.classList.add('slide-up');
    // Listen for the end of the animation
    dinoperson.addEventListener('animationend', () => {
        // After the animation, navigate to another page
        window.location.href = 'sections.html';
    });

    // Prevent the default button click behavior
    event.preventDefault();
});

const text = "Hello, I am Abhirup Chakravarty*.\nWelcome to my portfolio.";
const typingElement = document.getElementById("welcome-content");
let headerText = ""; // Initialize an empty string to accumulate header text
let paragraphText = ""; // Initialize an empty string to accumulate paragraph text
let isHeader = true;
let remainingText = text;
function typeText() {
    const char = remainingText.charAt(0);
    remainingText = remainingText.substring(1);
    
    if (char === "\n") {
        isHeader = false;
    }

    if (isHeader) {
        headerText += char; // Accumulate header text
    } else {
        paragraphText += char; // Accumulate paragraph text
    }

    typingElement.innerHTML = `<h1>${headerText}</h1><p>${paragraphText}</p>`;

    if (remainingText.length > 0) {
        setTimeout(typeText, 50); // Adjust the delay to control typing speed
    }
}
typeText();


// JavaScript for typing effect
const typedText = document.querySelector('.typed-text');
const textArray = ["Abhirup Chakravarty"];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typedText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Adjust typing speed here (milliseconds)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(type, 1000); // Start typing after a delay (milliseconds)
});

// JavaScript for button action (slide up to portfolio)
const openPortfolioButton = document.getElementById('open-portfolio');
const portfolioSection = document.querySelector('.portfolio');

openPortfolioButton.addEventListener('click', function () {
    portfolioSection.scrollIntoView({ behavior: 'smooth' });
});

const continueButton = document.getElementById('continue-button');
const welcome = document.querySelector('.welcome');

continueButton.addEventListener('click', () => {
    // Slide up animation
    welcome.style.transform = 'translateY(-100%)';
    // Show the section links
    setTimeout(() => {
        window.location.href = 'sections.html';
    }, 500); // Adjust the delay as needed for the animation
});

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

const text = "Hello, I am Abhirup Chakravarty.\nWelcome to my portfolio.";
    const typingElement = document.getElementById("welcome-content");
    let isHeader = true;

    function typeText() {
      const char = text.charAt(0);
      text = text.substring(1);
      if (char === "\n") {
        isHeader = false;
      }

      if (isHeader) {
        typingElement.innerHTML += `<span class="header">${char}</span>`;
      } else {
        typingElement.innerHTML += `<span class="paragraph">${char}</span>`;
      }

      if (text.length > 0) {
        setTimeout(typeText, 50); // Adjust the delay to control typing speed
      }
    }

    typeText();




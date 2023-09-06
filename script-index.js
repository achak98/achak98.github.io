const continueButton = document.getElementById('continue-button');
const welcome = document.querySelector('.welcome');

// Delay the blend-in effect and typing animation
setTimeout(() => {
    const continueButton = document.getElementById('continue-button');
    continueButton.classList.add('blend-in');
    typeText(); // Start the typing animation
}, 3500); // Adjust the delay as needed

continueButton.addEventListener('click', (event) => {
    // Add the slide-up class to initiate the animation
    welcome.classList.add('slide-up');

    // Listen for the end of the animation
    welcome.addEventListener('animationend', () => {
        // After the animation, navigate to another page
        window.location.href = 'sections.html';
    });

    // Prevent the default button click behavior
    event.preventDefault();
});

const text = "Hello, I am Abhirup Chakravarty.\nWelcome to my portfolio.";
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

const person = document.querySelector('.person');
const trex = document.querySelector('.trex');
const person_gif = document.getElementById('person_gif');
const trex_gif = document.getElementById('trex_gif');
// Define cases and corresponding GIF URLs
const cases_person = {
    'walk': 'elements/person/walk.gif',
    'run': 'elements/person/run.gif',
    'idle': 'elements/person/idle.gif',
    default: 'default.gif', // Fallback GIF
};

const cases_trex = {
    'walk': 'elements/dino/walk.gif',
    'run': 'elements/dino/run.gif',
    'idle': 'elements/dino/idle.gif',
    default: 'default.gif', // Fallback GIF
};

// Function to change the GIF based on the case
function changeGIFPerson(caseName) {
    const gifURL = cases_person[caseName] || cases.default;
    person_gif.src = gifURL;
}
function changeGIFTrex(caseName) {
    const gifURL = cases_trex[caseName] || cases.default;
    trex_gif.src = gifURL;
}

let personPosition = 10; // 10% from the left
let trexPosition = 90; // 90% from the left
let isChasing = false;
let personDirection = 1; // 1 represents running to the right, -1 represents running to the left
let trexDirection = -1;
let personDirectionChanged = false
let trexFlipped = false
let personFlipped = false
let personIdleAlready = false
let personWaiting = false
trex.style.transform = 'scaleX(-1)';
function animateChase() {
    if(isChasing){
        trexPosition += 0.19*trexDirection; // Move the T-Rex to the left (faster)
    }else if(!personWaiting){
        changeGIFPerson('walk');
        changeGIFTrex('idle');
    }
    const randomNumber = Math.random(); 
    if(!personIdleAlready & !isChasing & Math.abs(personPosition-trexPosition) >40 & randomNumber>0.5 & (personPosition < 80 & personPosition > 20)){
        personWaiting = true
        personIdleAlready = true
        changeGIFPerson('idle')
        console.log('setting person to idle, should wait 2 secs. started waiting at position: ', personPosition)
        setTimeout(function() {
            changeGIFPerson('walk');
            personWaiting = false
        }, 400);   
    }
    if (!personDirectionChanged & (personPosition < 100 || personPosition > 0) & Math.abs(personPosition-trexPosition) <20){
        console.log("direction flipped because they are too close")
        personDirection*=-1
        if(!personFlipped){
            person.style.transform = 'scaleX(-1)';
            personFlipped = true
        }else{
            person.style.transform = 'scaleX(1)';
            personFlipped = false
        }
        personDirectionChanged = true
    }
    if (!isChasing & Math.abs(personPosition-trexPosition) < 40){
        isChasing = true
        if (personPosition-trexPosition < 0){
            trexDirection = -1
            console.log("trex moving left")
            trex.style.transform = 'scaleX(-1)';
            trexFlipped = false
        }else{
            trexDirection = 1
            console.log("trex moving right")
            trex.style.transform = 'scaleX(1)';
            trexFlipped = true
        }
        setTimeout(function() {
            changeGIFPerson('run');
        }, 400);   
        changeGIFTrex('run');
    }
    if(!personWaiting){
        personPosition += 0.22 * personDirection; // Move the person in their current direction 
    }else{
        console.log('person waiting')
    }
    
    // Check if the person is out of view on the left or right
    if (isChasing & (personPosition >= 100 || personPosition <= 0)) {
        isChasing = false
        personDirectionChanged = false
         // Change the person's running direction
        if (personPosition>=100){
            personPosition = -10
            personDirection = 1;
        }else{
            personPosition = 110
            personDirection = -1;
        }
        personIdleAlready = false
    }
   

    person.style.left = personPosition + '%';
    trex.style.left = trexPosition + '%';

    requestAnimationFrame(animateChase);
}

animateChase();
const person = document.querySelector('.person');
const trex = document.querySelector('.trex');
const deadlines = document.querySelector('.deadlines');
const me = document.querySelector('.me');
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
const States = {
    IDLE: "idle",
    WALK: "walk",
    RUN: "run",
};
let personPosition = -20; // 10% from the left
let trexPosition = 101; // 90% from the left
let isChasing = false;
let personDirection = 1; // 1 represents running to the right, -1 represents running to the left
let trexDirection = -1;
let personDirectionChanged = false
let trexFlipped = false
let personFlipped = false
let personIdleAlready = false
let personState = States.WALK
let trexState = States.IDLE
trex.style.transform = 'scaleX(-1)';
function animateChase() {
    if(isChasing){
        trexPosition += 0.29*trexDirection; // Move the T-Rex to the left (faster)
    }else if(personState!=States.IDLE & personState!=States.WALK & trexState != States.IDLE){
        changeGIFPerson('walk');
        changeGIFTrex('idle');
        personState=States.WALK
        trexState = States.IDLE
    }
    const randomNumber = Math.random(); 
    if(!personIdleAlready & !isChasing & Math.abs(personPosition-trexPosition) >40 & randomNumber>0.7 & (personPosition < 80 & personPosition > 10)){
        personState = States.IDLE
        personIdleAlready = true
        changeGIFPerson('idle')
        setTimeout(function() {
            changeGIFPerson('walk');
            personState=States.WALK
        }, 1500);   
    }
    if (!personDirectionChanged & (personPosition < 100 || personPosition > 0) & Math.abs(personPosition-trexPosition) <12){
        personDirection*=-1

        changeGIFPerson('run');
        personState=States.RUN

        if(!personFlipped){
            person.style.transform = 'scaleX(-1)';
            personFlipped = true
        }else{
            person.style.transform = 'scaleX(1)';
            personFlipped = false
        }
        personDirectionChanged = true
    }
    if (!isChasing & Math.abs(personPosition-trexPosition) < 60){
        isChasing = true
        if (personPosition-trexPosition < 0){
            trexDirection = -1
            trex.style.transform = 'scaleX(-1)';
            trexFlipped = false
        }else{
            trexDirection = 1
            trex.style.transform = 'scaleX(1)';
            trexFlipped = true
        } 
        changeGIFTrex('run');
        trexState=States.RUN
    }
    if(personState!=States.IDLE){
        if (personState == States.WALK){
            personPosition += 0.07 * personDirection; // Move the person in their current direction 
        }else if (personState == States.RUN){
            personPosition += 0.30 * personDirection; // Move the person in their current direction 
        }
        
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
    me.style.left = personPosition + '%';
    deadlines.style.left = (trexPosition +3) + '%';

    requestAnimationFrame(animateChase);
}

requestAnimationFrame(animateChase);
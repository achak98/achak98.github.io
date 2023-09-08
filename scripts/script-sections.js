const circleLayout = document.getElementById('circle-layout');

const text = "These are the five chakras of my life, and God, oh God, am I trying to align them...";
const typingElement = document.getElementById("joke");
let paragraphText = ""; // Initialize an empty string to accumulate paragraph text
let remainingText = text;
function typeText() {
    const char = remainingText.charAt(0);
    remainingText = remainingText.substring(1);
    
    paragraphText += char; // Accumulate paragraph text

    typingElement.innerHTML = `<p>${paragraphText}</p>`;

    if (remainingText.length > 0) {
        setTimeout(typeText, 50); // Adjust the delay to control typing speed
    }
}

// After a short delay, remove the 'hidden' class to trigger the fade-in effect
setTimeout(() => {
    circleLayout.classList.add('blend-in');;
}, 100); // Adjust the delay as needed

// Select all circle elements with class .circle
const circles = document.querySelectorAll('.circle');


window.onload = function() {
    circles.forEach((circle) => {
        // Add a delay of 1000 milliseconds (1 second) before applying the transformation
        setTimeout(() => {
            // Apply the desired transformation
            circle.style.setProperty('--transform' ,'rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)))');
            circle.style.setProperty('--after-opacity' ,1);
        }, 500);
    });
};
setTimeout(() => {
    typeText();
}, 1500); // Adjust the delay as needed

circles.forEach((circle) => {
    circle.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();
        
        // Get the original background color as an RGB string (e.g., "rgb(255, 0, 0)")
        const originalOpacity = getComputedStyle(circle).getPropertyValue('--after-opacity');
        const targetOpacity = 0
        steps = 4

        // Calculate the opacity increment for each component
        const increment = (targetOpacity-originalOpacity)/steps
        let currentOpacity = Number(originalOpacity)
        // Create a function to update the opacity in each step
        function updateColor() {
            currentOpacity += increment;
            // Limit the opacity values to be within the valid range (0-255)
            currentOpacity = Math.min(1, Math.max(0, currentOpacity));

            // Set the opacity
            circle.style.setProperty('--after-opacity', currentOpacity);

            // Check if we've reached the target color
            if (currentOpacity > 0) {
                requestAnimationFrame(updateColor);
            }
        }

        // Start the color incrementation
        requestAnimationFrame(updateColor);

        // Toggle the "active" class on the clicked circle
        circle.classList.toggle('active');

        if (circle.classList.contains('active')) {
            circle.style.zIndex = 10000;
            // Define the desired final width and height (e.g., 100%)
            const finalWidth = 7000;
            const finalHeight = 7000;

            // Get the current width and height
            let currentWidth = parseFloat(circle.style.width) || 0;
            let currentHeight = parseFloat(circle.style.paddingTop) || 0;

            // Calculate the increment (e.g., 1%)
            let increment = 1;

            // Define the interval duration (in milliseconds)
            const intervalDuration = 10; // Adjust as needed for the desired animation speed

            // Calculate the total number of steps needed
            const totalSteps = (finalWidth - currentWidth) / increment;

            // Use setInterval to gradually increase the width and height
            const finalScale = 40; // Define the final scaling factor
            let scale_increment = 0.1; // Define the increment for each step
            const scale_intervalDuration = 10; // Adjust the interval duration as needed
            let hover_rad_decrement = 0.1;
            let currentScale = 1.2; // Initialize the current scale factor
            let hoverRadius = parseFloat(getComputedStyle(circle).getPropertyValue('--hover-radius'));
            console.log('original: ',hoverRadius)
            const intervalScale = setInterval(() => {
                // Incrementally increase the scale factor
                currentScale += scale_increment;
                scale_increment+=scale_increment/100;
                hoverRadius -= hover_rad_decrement
                console.log('after decrement: ',hoverRadius)
                hoverRadius = Math.max(2, hoverRadius)
                console.log('before assigning: ',hoverRadius)
                hover_rad_decrement += hover_rad_decrement/100
                circle.style.setProperty('--hover-radius', (hoverRadius + 'vw'));
                // Apply the updated scale using the transform property
                circle.style.transform = `scale(${currentScale}) rotate(var(--angle)) translate(var(--hover-radius)) rotate(calc(-1 * var(--angle)))`;

                // Check if the final scale has been reached
                if (currentScale >= finalScale) {
                    clearInterval(intervalScale); // Stop the interval when done
                    
                    const parentElement = circle.parentNode;

                    // Loop through the children of the parent element to find the index of the child
                    let childIndex = -1; // Default value if the child is not found
                    for (let i = 0; i < parentElement.children.length; i++) {
                        if (parentElement.children[i] === circle) {
                            childIndex = i;
                            break;
                        }
                    }
                    switch (childIndex) {
                        case 0:
                            window.location.href = 'background.html';    
                            break;
                        case 1:
                            window.location.href = 'work-experience.html';
                            break;
                        case 2:
                            window.location.href = 'extracurriculars.html';
                            break;
                        case 3:
                            window.location.href = 'projects.html';
                            break;
                        case 4:
                            window.location.href = 'achievements.html';
                            break;
                        default:
                      }
                    
                }
            }, scale_intervalDuration);
        } else {
            // Reset the width and height
            circle.style.width = '';
            circle.style.paddingTop = '';
        }
    });
});

function toggleMenu() {
    console.log("called")
    y = document.querySelector(".header__hamburger");
    downloadbuttons = document.querySelector(".openDownloadWindowDiv");
    y.classList.toggle("click");
    downloadbuttons.classList.toggle("click");
  }
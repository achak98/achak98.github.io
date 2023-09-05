const circleLayout = document.getElementById('circle-layout');

// After a short delay, remove the 'hidden' class to trigger the fade-in effect
setTimeout(() => {
    circleLayout.classList.add('blend-in');;
}, 100); // Adjust the delay as needed

// Select all circle elements with class .circle
const circles = document.querySelectorAll('.circle');

// Loop through each circle element
circles.forEach((circle, index) => {
    // Get the computed transform property for the current circle
    const transformMatrix = getComputedStyle(circle).getPropertyValue('transform');
    
    // Parse the matrix string into an array of values
    const matrixValues = transformMatrix.match(/[-0-9.]+/g);
    
    // Extract the second-to-last value (transformedTop) and last value (transformedLeft)
    const transformedTop = parseFloat(matrixValues[matrixValues.length - 2]);
    const transformedLeft = parseFloat(matrixValues[matrixValues.length - 1]);
    
    console.log(`Transformed Top for Circle ${index + 1}:`, transformedTop);
    console.log(`Transformed Left for Circle ${index + 1}:`, transformedLeft);
    circle.style.setProperty('--transformed-top', `${transformedTop}px`);
    circle.style.setProperty('--transformed-left', `${transformedLeft}px`);
});

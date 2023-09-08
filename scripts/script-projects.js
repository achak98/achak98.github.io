const paragraph = document.querySelector('.paragraph.selected-paragraph');
setTimeout(() => {
  const paragraph = document.querySelector('.paragraph.selected-paragraph');
  paragraph.classList.remove('blend-in');
}, 1500); // Adjust the delay as needed

document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here, including the event listener for 'cross-button'
    const crossButton = document.getElementById('cross-button');
    const logoContainer = document.getElementById('logo-container');
    const circleBar = document.querySelector('.circle-bar');
    let paragraph = document.querySelector('.paragraph.selected-paragraph');
    const iris = document.getElementById('iris');
    const body = document.querySelector('body');

    crossButton.addEventListener('click', (event) => {
        // Add the slide-up class to initiate the animation
        $('div#iris').addClass('collapse');
        
        // Listen for the end of the animation
        iris.addEventListener('animationend', () => {
            // After the animation, navigate to another page
            paragraph = document.querySelector('.paragraph.selected-paragraph');
            paragraph.classList.add('closing');
            crossButton.classList.add('closing');
            circleBar.classList.add('closing')
            logoContainer.classList.add('closing');
            document.body.style.backgroundColor = '#4f646f';
            window.location.href = 'sections.html';
        });
        // Prevent the default button click behavior
        event.preventDefault();
    });
});


// style-projects.js
function selectParagraph(index) {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, i) => {
      console.log('i: ', i);
      if (i === index - 1) {
        circle.classList.add('selected');
      }else{
        circle.classList.remove('selected');
      }
    });
  
  
    const paragraphs = document.querySelectorAll('.paragraph');
    paragraphs.forEach((paragraph, i) => {
      console.log('i: ', i);
      if (i === index - 1) {
        paragraph.classList.remove('never-shown');
        if (paragraph.classList.contains('unselected-paragraph-down')) {
          paragraph.style.animationName = 'slideUpIntoFrame';
        } else if(paragraph.classList.contains('unselected-paragraph-up')) {
          paragraph.style.animationName = 'slideDownIntoFrame';
        }
        paragraph.classList.remove('unselected-paragraph-up');
        paragraph.classList.remove('unselected-paragraph-down');
        paragraph.classList.add('selected-paragraph');
      } else if (i < index - 1) {
        paragraph.classList.remove('never-shown');
        paragraph.classList.remove('selected-paragraph');
        paragraph.classList.remove('unselected-paragraph-down');
        paragraph.classList.add('unselected-paragraph-up');
        paragraph.style.animationName = 'slideUpOutOfFrame';
      } else {
        paragraph.classList.remove('never-shown');
        paragraph.classList.remove('selected-paragraph');
        paragraph.classList.remove('unselected-paragraph-up');
        paragraph.classList.add('unselected-paragraph-down');
        paragraph.style.animationName = 'slideDownOutOfFrame';
      }
    });
  }
  

  function toggleMenu() {
    console.log("called")
    y = document.querySelector(".header__hamburger");
    downloadbuttons = document.querySelector(".openDownloadWindowDiv");
    y.classList.toggle("click");
    downloadbuttons.classList.toggle("click");
  }
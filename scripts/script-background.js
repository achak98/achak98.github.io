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
    if (i === index - 1) {
      circle.classList.add('selected');
    } else {
      circle.classList.remove('selected');
    }
  });


  const paragraphs = document.querySelectorAll('.paragraph');
  paragraphs.forEach((paragraph, i) => {
    // console.log('i: ', i);
    if (i === index - 1) {
      let animation_dir = ""
      paragraph.classList.remove('never-shown');
      if (paragraph.classList.contains('unselected-paragraph-down') ||
        paragraph.classList.contains('unselected-paragraph-down-oof')) {
        animation_dir = "up";
      } else if (paragraph.classList.contains('unselected-paragraph-up') ||
        paragraph.classList.contains('unselected-paragraph-up-oof')) {
        animation_dir = "down";
      }
      paragraph.classList.remove('unselected-paragraph-up');
      paragraph.classList.remove('unselected-paragraph-down');
      paragraph.classList.remove('unselected-paragraph-down-oof');
      paragraph.classList.remove('unselected-paragraph-up-oof');
      paragraph.classList.add('selected-paragraph');
      if (animation_dir == "up") {
        paragraph.style.animationName = 'slideUpIntoFrame';
      } else {
        paragraph.style.animationName = 'slideDownIntoFrame';
      }
    } else if (i < index - 1) {
      let selected = paragraph.classList.contains('selected-paragraph');
      paragraph.classList.remove('never-shown');
      paragraph.classList.remove('selected-paragraph');
      paragraph.classList.remove('unselected-paragraph-down');
      paragraph.classList.remove('unselected-paragraph-down-oof');
      if (selected) {
        paragraph.classList.remove('unselected-paragraph-up-oof');
        paragraph.classList.add('unselected-paragraph-up');
        paragraph.style.animationName = 'slideUpOutOfFrame';
      } else {
        paragraph.classList.remove('unselected-paragraph-up');
        paragraph.classList.add('unselected-paragraph-up-oof');
        paragraph.style.animationName = 'none';
      }
    } else {
      let selected = paragraph.classList.contains('selected-paragraph');
      paragraph.classList.remove('never-shown');
      paragraph.classList.remove('selected-paragraph');
      paragraph.classList.remove('unselected-paragraph-up');
      paragraph.classList.remove('unselected-paragraph-up-oof');
      if (selected) {
        paragraph.classList.remove('unselected-paragraph-down-oof');
        paragraph.classList.add('unselected-paragraph-down');
        paragraph.style.animationName = 'slideDownOutOfFrame';
      } else {
        paragraph.classList.remove('unselected-paragraph-down');
        paragraph.classList.add('unselected-paragraph-down-oof');
        paragraph.style.animationName = 'none';
      }
    }
  });
}


function toggleMenu() {
  console.log("called")
  y = document.querySelector(".header__hamburger");
  downloadbuttons = document.querySelector(".openDownloadWindowDiv");
  y.classList.toggle("click");
  downloadbuttons.classList.toggle("click");
  console.log(window.getComputedStyle(downloadbuttons).getPropertyValue("opacity"));
  setTimeout(() => {
    downloadbuttons.classList.toggle("blend-in")
    console.log(window.getComputedStyle(downloadbuttons).getPropertyValue("opacity"));
  }, 100);
}

// Get all the paragraphs
function handleWheelEvent(event) {
  let paragraphs = document.querySelectorAll('.paragraph');
  let currentIndex = 1;

  paragraphs.forEach((paragraph, i) => {
    if (paragraph.classList.contains('selected-paragraph')) {
      currentIndex = i + 1;
    }
  });
  console.log('currentIndex: ', currentIndex);
  // Initial selection
  const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
  console.log(scrollDirection);

  if (scrollDirection === 'up') {
    // Scroll up (select the previous paragraph)
    console.log('now selected Index: ', currentIndex - 1);
    selectParagraph(Math.max(1, currentIndex - 1));
  } else {
    // Scroll down (select the next paragraph)
    console.log('now selected Index: ', currentIndex + 1);
    selectParagraph(Math.min(paragraphs.length, currentIndex + 1));
  }

}

// function throttle(func, wait) {
//   let isThrottled = false;
//   return function () {
//     if (!isThrottled) {
//       func.apply(this, arguments);
//       isThrottled = true;
//       setTimeout(() => {
//         isThrottled = false;
//       }, wait);
//     }
//   };
// }


// document.addEventListener('wheel', throttle(handleWheelEvent, 1000), { passive: true });


// console.log("isActive: ", isActive);

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let lastScrollTime = 0;
let isActive = true;

document.addEventListener('wheel', function(event) {
  const currentTime = Date.now();
  const timeSinceLastScroll = currentTime - lastScrollTime;
  if (timeSinceLastScroll >= 40) {
    handleWheelEvent(event);
  }
  lastScrollTime = Date.now();
}, { passive: false });

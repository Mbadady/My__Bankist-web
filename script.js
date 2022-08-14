'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinkEl = document.querySelectorAll('.nav__link');
const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section"); // this returns a node list of all the elements with class section

console.log(btnsOpenModal);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener("click",openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Smooth Scrolling


const section1 = document.querySelector("#section--1")

console.log(window.pageXOffset, window.pageYOffset);

console.log(section1.getBoundingClientRect().top);

btnScrollTo.addEventListener("click", function(e){
  console.log(e.target.getBoundingClientRect()); // this gets the the cordinates of the click element. X position and Y position relative to the viewport
  console.log(window.pageXOffset, window.pageYOffset); // this gets the width position and the height position of the scroll respectively. When you scroll it gives the position of the scroll
console.log("height and width of viewport respectively", document.documentElement.clientHeight, document.documentElement.clientWidth); //specifies the height and width of the current viewport

const s1coords = section1.getBoundingClientRect();
console.log(s1coords); // gets the cordinates of the section 1 relative to the view port. When the viewport changes, the cordinates changes

// Old way of implementing smooth scrolling
// window.scrollTo({
//   left: s1coords.left + window.pagrXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });
// console.log(s1coords.top);
// console.log(window.pageYOffset);

// console.log(s1coords.top + window.pageYOffset);

// modern way of implementing smooth scrolling

section1.scrollIntoView({behavior: "smooth"})
})

const imgScrollToFooter = document.querySelector('.nav__logo-link');
const footer = document.querySelector('#footer');

console.log(imgScrollToFooter);
console.log(footer);

imgScrollToFooter.addEventListener("click", function(e){
  e.preventDefault()
  footer.scrollIntoView({behavior: "smooth",})
})


// Event Delegation: Implementing page navigation

document.querySelector(".nav__links").addEventListener("click",function(e){
  e.preventDefault()
  console.log(e.target); // this is the element where the click is generated
  // matching strategy
  if(e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute('href'); // When the button is clicked we want to get the href which is #section--1 and which will be the id of where you will want it to scroll to
    // console.log(id);
    if(id.startsWith("#") && id === "#") return
    const sectionsToScrollTo = document.querySelector(id); //this is selecting the element to scroll to and the id now gives it ID selector in #section--1, #section--2, and #section--3

    sectionsToScrollTo.scrollIntoView({
      behavior: 'smooth',
    });
  }
  
})

// Dom Traversing

// Tabbed Component

const tabsContainer = document.querySelector(".operations__tab-container")
const tabs = document.querySelectorAll(".operations__tab")
const tabsContent = document.querySelectorAll(".operations__content")

// // Selecting the tabbed components but not yet displaying the different components. Not efficient way of doing it
// tabs.forEach(t=>t.addEventListener("click", function(e){
//   // console.log(this);
//   const clicked = this
//   console.log(clicked);
//   // clicked.classList.remove('operations__tab--active');
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   clicked.classList.add('operations__tab--active');
// }))

// Using the DOM delegation and DOM traversing to select the tabbed components which is the most efficient way

tabsContainer.addEventListener("click", function(e){
  const clicked = e.target.closest('.operations__tab'); //e.target - selects the element clicked and not the element the event handler is attached, .closest helps to select the closest parents of the clicked element which in this case is itself(.operations__tab) and this was done because the button has a child element(span)
  // console.log(clicked.dataset.tab);

  console.log(clicked);

  if(clicked === null) return // clicking on the parents element due to DOM delegation, tabsContainer will not work with the condition of closest for clicked

  // above can be written as if(!clicked)return

  // Remove Active class of all the element
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // we need to remove it

  clicked.classList.add('operations__tab--active');

  // Activate content area

  // Remove Active class of all the element
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Add active class on the tab clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  /* we are selecting the element where we want the class to be added. if we hard code it by putting .operations__content--1, then whenever the button is clicked only the content number one will be displaying. using template string and programmatically adding the numbers by using (clicked.dataset.tab), this adds the number based on the elements clicked. If button 1 is clicked which has data-tab="1" attribute in the html; it will return 1 and so the content 1 will be displayed */
})

// 1st way of Refactoring 
// refactoring the event handler function
// const handleOver = function(e,opacity){
// if (e.target.classList.contains('nav__link')) {
//   const link = e.target;
//   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//   const logo = link.closest('.nav').querySelector('img');

//   siblings.forEach(el => {
//     if (el !== link) el.style.opacity = opacity;
//   });
//   logo.style.opacity = opacity;
// }
// }
// // menu fade animation
// /* mouseover bubbles but mouseenter does not bubble. opposite of mouseenter is mouseleave */
// nav.addEventListener("mouseover", function(e){
//   // opposite of mouseover is mouseout
//   // 1. first way of calling the function. you cannot call it like handleOver(e, 0.5) because event handlers expects a function and not a value, so we can call it inside the function(e) like function(e){handleOver(e,0.5)}
//   handleOver(e,0.5) //use opacity as a parameter in the handleOver function above
// })

// nav.addEventListener("mouseout", function(e){
//   // opposite of mouseover is mouseout
//   // 1. first way of calling the function. you cannot call it like handleOver(e, 1) because event handlers expects a function and not a value, so we can call it inside the function(e) like function(e){handleOver(e, 1)}
//   handleOver(e, 1) //use opacity as a parameter in the handleOver function above
// })

// 2nd way of Refactoring 
// refactoring the event handler function

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5)
// 2. second way of calling the function is by using bind. Bind method sets a new function and the first argument is the object in which the *this* keyword is called on; using it like this will work. handleOver.bind(0.5). the this keyword in here will now point to 0.5. see below. we will now set the opacity argument to *this* on the handleOver function above
)

nav.addEventListener('mouseout', handleHover.bind(1)
  // 2. second way of calling the function is by using bind. Bind method sets a new function and the first argument is the object in which the *this* keyword is called on; using it like this will work. handleOver.bind(1). the this keyword in here will now point to 1. see below. we will now set the opacity argument to *this* on the handleOver function above
)
/* the above is the most efficient way because a handler function expects only one arguement and which is (e) other arguments can now be passed in the bind method */


// Using intersection API to Implement sticky navigation

/* 
intersection API takes in two arguments
1. a callback function. the callback function occurs whenever the observed/target element is intercepting the root element, in this case is the viewport at the threshold we defined
2. an option which is an object(it has root, threshold, rootmargin)
*/
const obsFunction = function(entries, observer){
// console.log(entries);
entries.forEach(entry=>{
  console.log(entry);
})
}
const obsOptions = {
root: null,
threshold: [0,0.2],
}
const observer = new IntersectionObserver(obsFunction, obsOptions)

observer.observe(section1)

// for the above, entries from the obsFunction is referring to the threshold which is an array of entries  and that is why a forEach method is used on it. Each entry now will refer to 0 and 0.2, when entry is 0 it means that section1 have moved out completely from the viewport and when it is 0.2 it means that the section1 is 20% in the viewport
const navHeight = nav.getBoundingClientRect().height
console.log(navHeight);

const stickyNav = function(entries){
const [entry] = entries //note that entries is threshold and is always an array no matter what the threshold is 
if(entry.isIntersecting === false){
  nav.classList.add("sticky")
}else{
  nav.classList.remove('sticky');
}
}

const headerScroll = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: "-90px", // this looks at the height of the nav. it is like a 90px margin before the end of the header. +90px is like 90px margin after the header
  // hardcoding the value is not advised because if the site is responsive, the 90px will keep adjusting, so we will not hardcode it
  rootMargin: `-${navHeight}px`
})
headerScroll.observe(header)

// Revealing elements on scroll. the section is defined in html

const sectionObsCallBack = function(entries, observer){
  const [entry] = entries
  if(entry.isIntersecting === false) return
  else{
    entry.target.classList.remove("section--hidden")
  }
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(sectionObsCallBack, {
root: null,
threshold: 0.15,
})
allSections.forEach(function(sections){
sectionObserver.observe(sections)
sections.classList.add("section--hidden")
})

////////////////////////////
// Lazy loading images
const allImagesForLazyLoading = document.querySelectorAll("img[data-src]")

const imgTargetsCallBack = function(entries, observer){
  const [entry] = entries;

  // Replacing src images with data-src

// The condition is because the high resolution image for the credit card is unavailable



  if (entry.target.alt === 'Credit card') {
    entry.target.src = entry.target.src;

    /* before you remove the lazy-image class which is the blur, allow the image to load first, i have good internet connection and i am using a good pc that is why it loads immediately and displays the high resolution image. if not, i would need to see the low resolution image and later see the high resolution. Solution to this is to listen to laod event before removing the class */
    entry.target.addEventListener("load",function(){
      entry.target.classList.remove('lazy-img');
    })
    // observer.unobserve(entry.target);
  }
else{
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
}
observer.unobserve(entry.target);
}

const imgTargets = new IntersectionObserver(imgTargetsCallBack, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
})

allImagesForLazyLoading.forEach(img=>{imgTargets.observe(img)
img.classList.add("lazy-img")})



// IMPLEMENTING THE SLIDER COMPONENT

const slider = function(){const slides = document.querySelectorAll(".slide")
const btnArrowRight = document.querySelector('.slider__btn--right');
const btnArrowLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length

/////////////////////////////////
// functions
// refactoring the code

const goToSlide = function(slide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`; //since the initial state is 0%, 100%, 200% and 300%, after the click the next initial condition should be -100%, 0%, 100%, 200%, after another click the initial condition should be -200%, -100%, 0%, 100% and so on
  });
}


const nextSlide = function(){
if (curSlide === maxSlide - 1) {
  curSlide = 0;
} else {
  curSlide++;
}
goToSlide(curSlide);
activateDots(curSlide)
}

const prevSlide = function(){
if (curSlide === 0) {
  curSlide = maxSlide - 1;
} else {
  curSlide--;
}
goToSlide(curSlide);
activateDots(curSlide)
}

// adding the dots

const createDots = function(){
  slides.forEach((_, i)=>{
dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide = "${i}"></button>`)
  })
}


const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot=>{
    dot.classList.remove("dots__dot--active");
  }); //removing the active class from all the dots and now putting it back to the one active below
  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add("dots__dot--active")
}

const init = function () {
  goToSlide(0); //this is to line it up one after another. The first iteration will give it (100*0),2nd (100*1),3rd (100*2), 4th (100*3). width of the slides is 100%. the initial conditions
  createDots();
  activateDots(0); //intitally activates the dots
  // Using Event Delegation to add an event handler to the dots
};;
init()


btnArrowRight.addEventListener("click", nextSlide)
btnArrowLeft.addEventListener("click", prevSlide)


// implementing the Arrow keys to move the slides
document.addEventListener("keydown", function(e){
  // console.log(e.key);
  e.key === 'ArrowRight' && nextSlide(); // short circuiting. can be written as if(e.key === "ArrowRight") nextSlide()
  e.key === 'ArrowLeft' && prevSlide(); // short circuiting. can be written as if(e.key === "ArrowLeft") prevSlide()
})


dotContainer.addEventListener("click", function(e){
  if (e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide
    console.log(slide);
    goToSlide(slide)
    activateDots(slide)
  };
})
}

slider()


// DOM LIFECYCLE (the point the user opens the page till the point the user leaves the page)

// 1. DOM content loaded fires when the HTML and Script is loaded and they are converted to a DOM tree
document.addEventListener("DOMContentLoaded", function(e){
  console.log("HTML Parsed and DOM tree built", e);
})

// 2. LOADED => this fires in the window and it fires the entire content of the page both the HTML, script and the external contents such as CSS and images

window.addEventListener("load", function(e){
  console.log("Page fully loaded", e);
})

// 3. beforeunload => this fires when the user is about leaving the page

// window.addEventListener("beforeunload", function(e){
//   e.preventDefault() // this is for some browsers
//   console.log(e);
//   e.returnValue = ""; // this gives a leaving message
// })

// Mobile Navigation

const btnNavOpen = document.querySelector(".btn-mobile-nav")

btnNavOpen.addEventListener("click",function(e){
  e.preventDefault()
  header.classList.toggle("nav-open")
})


const burger = document.querySelector(".nav-burger");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");
const header = document.querySelector("header");

const lightMode = document.querySelector(".lightmode-container i");

const sections = document.querySelectorAll("section");

const projectBx = document.querySelectorAll(".project-box");

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

// --------ACTIVATING BURGER MENU
burger.addEventListener("click", function () {
  if (
    burger.style.animation == "0.5s ease 0s 1 normal none running burger-anim"
  ) {
    burger.style.animation = "burger-anim2 0.5s";
  } else {
    burger.style.animation = "burger-anim 0.5s";
  }
  navLinks.classList.toggle("nav-active");
});

// ----------DEACTIVATING BURGER MENU
for (let i = 0; navLink.length > i; i++) {
  navLink[i].addEventListener("click", function () {
    navLinks.classList.toggle("nav-active");
  });
}

// Sticky header on scroll
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky-header", window.scrollY > 0);
});

// -----------TOGGLE LIGHTMODE
lightMode.addEventListener("click", () => {
  if (lightMode.classList.contains("bx-sun")) {
    lightMode.className = "bx bx-moon";
    lightMode.parentElement.style.background = "var(--accent-color)";
  } else {
    lightMode.className = "bx bx-sun";
    lightMode.parentElement.style.background = "var(--light-color)";
  }
  document.querySelector(":root").classList.toggle("darkmode");
});

// -----------ON LOAD ANIMATION OF TITLE BOX
const navChild = header.childNodes[1].children;
for (let i = 0; i < navChild.length; i++) {
  navChild[i].style.animation =
    "anim-onload-header 1.2s ease-in-out 0.5s backwards";
}

// ----------ON SCROLL EVENTS
window.addEventListener("scroll", () => {
  // --------CURRENT PAGE
  let currentPage = "";
  const pageOffset = pageYOffset;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageOffset >= sectionTop - 250) {
      currentPage = section.getAttribute("id");
    }
  });
  navLink.forEach((link) => {
    link.classList.remove("nav-current");
    if (link.classList.contains(currentPage)) {
      link.classList.add("nav-current");
    }
  });

  // ----------PROJECTBOX ANIMATION
  projectBx.forEach((box) => {
    boxTop = box.offsetTop;
    box.classList.remove("projectBx-reveal");
    if (pageOffset + window.innerHeight > boxTop + box.clientHeight / 2) {
      box.classList.add("projectBx-reveal");
    }
  });
});

// ----------MINHEIGHT
sections.forEach((section) => {
  section.style.minHeight = `${innerHeight}px`;
});

//   ------------TYPED.JS
var typed = new Typed("#name-title", {
  stringsElement: "#typed-strings",
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// ----------TESTIMONIAL SLIDER
const slideContainer = document.querySelector(".testimonial-slide");
const slideContent = document.querySelectorAll(".testimonial-content");
const slideContentWidth = slideContent[0].offsetWidth;
const spaceBetween = 15;

const radioIndex = document.querySelectorAll(".index-radio i");

// for space between content
slideContent.forEach((content) => {
  content.style.marginRight = `${spaceBetween}px`;
});

let index = 0;

let posX1;
let posX2;
let initialPos;
let finalPos;
let isDragging = false;

// bug for clicking multiple times
let canISlide = true;

const cloneFirstSlide = slideContent[0].cloneNode(true);
const cloneLastSlide = slideContent[slideContent.length - 1].cloneNode(true);

slideContainer.appendChild(cloneFirstSlide);
slideContainer.insertBefore(cloneLastSlide, slideContent[0]);

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

// NEXT AND PREVIOUS BUTTON
next.addEventListener("click", () => switchSlide("next"));
prev.addEventListener("click", () => switchSlide("prev"));

// CLICKING ON RADIO INDEX
for (let i = 0; radioIndex.length > i; i++) {
  radioIndex[i].addEventListener("click", () => switchSlide(i));
}

// DRAGGING SLIDES
slideContainer.addEventListener("mousedown", dragStart);
slideContainer.addEventListener("touchstart", dragStart);

slideContainer.addEventListener("mouseup", dragEnd);
slideContainer.addEventListener("touchend", dragEnd);

slideContainer.addEventListener("mousemove", dragMove);
slideContainer.addEventListener("touchmove", dragMove);

slideContainer.addEventListener("transitionend", checkIndex);

function switchSlide(arg) {
  slideContainer.classList.add("slide-transition");
  if (canISlide) {
    if (arg == "next") {
      slideContainer.style.left = `${
        slideContainer.offsetLeft - slideContentWidth - spaceBetween
      }px`;
      index++;
    } else if (arg == "prev") {
      slideContainer.style.left = `${
        slideContainer.offsetLeft + slideContentWidth + spaceBetween
      }px`;
      index--;
    } else {
      let i = arg;
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * i + 255
      }px`;
      index = i;
    }
  }
  canISlide = false;
}

function dragStart(e) {
  e.preventDefault();
  isDragging = true;
  slideContainer.style.cursor = "grabbing";
  initialPos = slideContainer.offsetLeft;
  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;
  }
}

function dragEnd(e) {
  isDragging = false;
  slideContainer.style.cursor = "grab";
  slideContainer.classList.add("slide-transition");
  if (e.type == "touchend") {
    posX2 = e.touches[0].clientX;
    finalPos = slideContainer.offsetLeft;
    let i = finalPos - initialPos;
    if (i < -130) {
      x = Math.floor((-i - 130) / 255) + 1;
      index += x;
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    } else if (i > 130) {
      x = -Math.floor((i - 130) / 255) - 1;
      index += x;
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    } else {
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    }
  } else {
    posX2 = e.clientX;
    finalPos = slideContainer.offsetLeft;
    let i = finalPos - initialPos;
    if (i < -130) {
      x = Math.floor((-i - 130) / 255) + 1;
      index += x;
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    } else if (i > 130) {
      x = -Math.floor((i - 130) / 255) - 1;
      index += x;
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    } else {
      slideContainer.style.left = `-${
        (slideContentWidth + spaceBetween) * index + 255
      }px`;
    }
  }
  initialPos = slideContainer.offsetLeft;
  checkIndex();
}

function dragMove(e) {
  if (!isDragging) return;
  slideContainer.style.cursor = "grabbing";
  if (e.type == "touchmove") {
    posX2 = e.touches[0].clientX;
    slideContainer.style.left = `${initialPos + (posX2 - posX1)}px`;
  } else {
    posX2 = e.clientX;
    slideContainer.style.left = `${initialPos + (posX2 - posX1)}px`;
  }
}

function checkIndex() {
  slideContainer.classList.remove("slide-transition");
  if (index <= -1) {
    slideContainer.style.left = `-${
      slideContent.length * (slideContentWidth + spaceBetween)
    }px`;
    index = slideContent.length - 1;
  } else if (index >= slideContent.length) {
    slideContainer.style.left = `-${slideContentWidth + spaceBetween}px`;
    index = 0;
  }
  //   Radio index active
  radioIndex.forEach((radio) => {
    radio.classList.remove("index-active");
  });
  radioIndex[index].classList.add("index-active");

  //   Slide content active
  slideContent.forEach((content) => {
    content.classList.remove("testi-active");
  });
  slideContent[index].classList.add("testi-active");

  // remove the animation on clone node
  cloneFirstSlide.classList.remove("testi-active");

  canISlide = true;
}

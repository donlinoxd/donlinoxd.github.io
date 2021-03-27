const burger = document.querySelector(".nav-burger");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");
const header = document.querySelector("header");
const lightMode = document.querySelector(".lightmode-container i");
const sections = document.querySelectorAll("section");
const projectBx = document.querySelectorAll(".project-box");

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

// -----------ON LOAD ANIMATION
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
    if (pageOffset + window.innerHeight > boxTop + box.clientHeight / 1.5) {
      box.classList.add("projectBx-reveal");
    }
  });
});

(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var navList = document.getElementById("siteNav");
  var mobileNav = document.querySelector(".mobile-nav");
  var skipLink = document.querySelector(".skip-link");

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      body.classList.toggle("mobile-menu-open");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile nav on link click
  if (navList) {
    var navLinks = navList.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("mobile-menu-open");
        navToggle.classList.remove("active");
      });
    });
  }

  // Skip link focus
  if (skipLink) {
    skipLink.addEventListener("focus", function () {
      this.removeAttribute("style");
    });
  }

  // Header scroll behavior
  var lastScroll = 0;
  var ticking = false;

  function handleScroll() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (currentScroll > 100) {
          header.classList.add("affixed");
        } else {
          header.classList.remove("affixed");
        }
        ticking = false;
      });
      ticking = true;
    }
    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    var revealPoint = 150;

    reveals.forEach(function (element) {
      var elementTop = element.getBoundingClientRect().top;
      var isVisible = elementTop < windowHeight - revealPoint;

      if (isVisible) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        var headerOffset = header ? header.offsetHeight : 0;
        var elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Year update
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
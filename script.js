document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");


  /* =========================================
     STICKY HEADER
     Adds a background/shadow when scrolling
  ========================================= */

  const updateHeader = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =========================================
     MOBILE MENU
  ========================================= */

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );


      const bars = menuToggle.querySelectorAll("span");


      if (isOpen) {

        // Hamburger → X animation
        if (bars[0]) {
          bars[0].style.transform =
            "translateY(6px) rotate(45deg)";
        }

        if (bars[1]) {
          bars[1].style.opacity = "0";
        }

        if (bars[2]) {
          bars[2].style.transform =
            "translateY(-6px) rotate(-45deg)";
        }

      } else {

        // X → Hamburger
        if (bars[0]) {
          bars[0].style.transform = "";
        }

        if (bars[1]) {
          bars[1].style.opacity = "";
        }

        if (bars[2]) {
          bars[2].style.transform = "";
        }

      }

    });

  }


  /* =========================================
     CLOSE MOBILE MENU AFTER CLICKING A LINK
  ========================================= */

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (mobileMenu) {
        mobileMenu.classList.remove("open");
      }

      document.body.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        const bars =
          menuToggle.querySelectorAll("span");

        if (bars[0]) {
          bars[0].style.transform = "";
        }

        if (bars[1]) {
          bars[1].style.opacity = "";
        }

        if (bars[2]) {
          bars[2].style.transform = "";
        }
      }

    });

  });


  /* =========================================
     SCROLL REVEAL ANIMATION
  ========================================= */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(

        (entries, obs) => {

          entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

              entry.target.style.transitionDelay =
                `${Math.min(index * 40, 180)}ms`;

              entry.target.classList.add("visible");

              obs.unobserve(entry.target);

            }

          });

        },

        {
          threshold: 0.12,
          rootMargin: "0px 0px -35px 0px"
        }

      );


    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    // Fallback for older browsers
    revealItems.forEach(item => {
      item.classList.add("visible");
    });

  }


  /* =========================================
     SMOOTH ANCHOR NAVIGATION
     Accounts for the fixed header
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", event => {

        const targetId =
          anchor.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (target) {

          event.preventDefault();


          const headerHeight =
            header ? header.offsetHeight : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            12;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }

      });

    });


  /* =========================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ========================================= */

  document.addEventListener("click", event => {

    if (!mobileMenu || !menuToggle) {
      return;
    }


    const clickedInsideMenu =
      mobileMenu.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);


    if (
      mobileMenu.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {

      mobileMenu.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      const bars =
        menuToggle.querySelectorAll("span");


      if (bars[0]) {
        bars[0].style.transform = "";
      }

      if (bars[1]) {
        bars[1].style.opacity = "";
      }

      if (bars[2]) {
        bars[2].style.transform = "";
      }

    }

  });


  /* =========================================
     ESC KEY CLOSES MOBILE MENU
  ========================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") {
      return;
    }


    if (
      mobileMenu &&
      mobileMenu.classList.contains("open")
    ) {

      mobileMenu.classList.remove("open");

      document.body.classList.remove(
        "menu-open"
      );


      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );


        const bars =
          menuToggle.querySelectorAll("span");


        if (bars[0]) {
          bars[0].style.transform = "";
        }

        if (bars[1]) {
          bars[1].style.opacity = "";
        }

        if (bars[2]) {
          bars[2].style.transform = "";
        }

      }

    }

  });


  /* =========================================
     IMAGE FALLBACK
     Prevents broken-image appearance
  ========================================= */

  const images =
    document.querySelectorAll("img");


  images.forEach(img => {

    img.addEventListener("error", () => {

      // Keep layout clean if the image path
      // has not been added yet.
      img.style.background =
        "linear-gradient(135deg,#F1F5F9,#E9E3FF)";

      img.style.objectFit = "cover";

    });

  });


  /* =========================================
     CURRENT YEAR — OPTIONAL FOOTER SUPPORT
     Works when an element with #year exists
  ========================================= */

  const yearElement =
    document.querySelector("#year");


  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }

});
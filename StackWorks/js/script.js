/* =========================================================
   STACKWORKS — VANILLA JAVASCRIPT
   Education Works Together.

   Handles:
   - Mobile navigation
   - Footer year
   - Typewriter
   - Smooth internal navigation
   - Header scroll state
   - Active navigation
   - Scroll reveal
   - StackWorks namespace
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const header =
    document.querySelector(".site-header");

  const navToggle =
    document.getElementById("navToggle");

  const mobileNav =
    document.getElementById("mobileNav");

  const typeTarget =
    document.getElementById("typeTarget");

  const yearTarget =
    document.getElementById("year");


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  if (yearTarget) {

    yearTarget.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  function setMobileNav(open) {

    if (!header || !navToggle) {
      return;
    }


    header.classList.toggle(
      "nav-open",
      open
    );


    navToggle.setAttribute(
      "aria-expanded",
      String(open)
    );


    navToggle.setAttribute(
      "aria-label",
      open
        ? "Close navigation"
        : "Open navigation"
    );


    if (mobileNav) {

      mobileNav.setAttribute(
        "aria-hidden",
        String(!open)
      );

    }

  }


  /* ---------- Toggle menu ---------- */

  if (navToggle) {

    navToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          header?.classList.contains(
            "nav-open"
          );

        setMobileNav(!isOpen);

      }
    );

  }


  /* =========================================================
     CLOSE MOBILE NAV AFTER CLICK
     ========================================================= */

  if (mobileNav) {

    mobileNav
      .querySelectorAll("a[href^='#']")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            setMobileNav(false);

          }
        );

      });

  }


  /* =========================================================
     CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
     ========================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !header ||
        !header.classList.contains(
          "nav-open"
        )
      ) {
        return;
      }


      const target =
        event.target;


      if (
        !(target instanceof Node)
      ) {
        return;
      }


      if (
        !header.contains(target)
      ) {

        setMobileNav(false);

      }

    }
  );


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        setMobileNav(false);

      }

    }
  );


  /* =========================================================
     RESET MOBILE NAV ON DESKTOP
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth >= 768
      ) {

        setMobileNav(false);

      }

    }
  );


  /* =========================================================
     TYPEWRITER
     ========================================================= */

  /*
   * StackWorks brand messages.
   *
   * The final message reinforces
   * the platform's core positioning.
   */

  const typeMessages = [

    "StackWorks_",

    "Manage. Teach. Learn._",

    "Education works together._"

  ];


  let messageIndex = 0;

  let characterIndex = 0;

  let deleting = false;

  let typeTimer = null;


  function typewriterStep() {

    if (!typeTarget) {
      return;
    }


    const message =
      typeMessages[messageIndex];


    /* ---------- Typing ---------- */

    if (!deleting) {

      characterIndex += 1;


      typeTarget.textContent =
        message.slice(
          0,
          characterIndex
        );


      /*
       * Finished typing the message.
       */

      if (
        characterIndex >=
        message.length
      ) {

        deleting = true;


        typeTimer =
          window.setTimeout(
            typewriterStep,
            1800
          );


        return;

      }


      typeTimer =
        window.setTimeout(
          typewriterStep,
          75
        );


      return;

    }


    /* ---------- Deleting ---------- */

    characterIndex -= 1;


    typeTarget.textContent =
      message.slice(
        0,
        characterIndex
      );


    /*
     * Finished deleting.
     */

    if (
      characterIndex <= 0
    ) {

      deleting = false;


      messageIndex =
        (
          messageIndex + 1
        ) %
        typeMessages.length;


      typeTimer =
        window.setTimeout(
          typewriterStep,
          350
        );


      return;

    }


    typeTimer =
      window.setTimeout(
        typewriterStep,
        42
      );

  }


  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  const prefersReducedMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (typeTarget) {

    if (prefersReducedMotion) {

      typeTarget.textContent =
        typeMessages[0];

    } else {

      typeTarget.textContent =
        "";


      typeTimer =
        window.setTimeout(
          typewriterStep,
          500
        );

    }

  }


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
     ========================================================= */

  document
    .querySelectorAll("a[href^='#']")
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");


          /*
           * Ignore empty or placeholder links.
           */

          if (
            !href ||
            href === "#"
          ) {

            if (
              href === "#"
            ) {

              event.preventDefault();

            }

            return;

          }


          const target =
            document.querySelector(
              href
            );


          /*
           * If the target doesn't exist,
           * allow normal browser behavior.
           */

          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth",

            block: "start"

          });


          /*
           * Keep the section in the URL.
           */

          try {

            history.pushState(
              null,
              "",
              href
            );

          } catch (error) {

            /*
             * Navigation still works even if
             * history manipulation is unavailable.
             */

          }

        }
      );

    });


  /* =========================================================
     HEADER SCROLL STATE
     ========================================================= */

  function updateHeaderOnScroll() {

    if (!header) {
      return;
    }


    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 12
    );

  }


  updateHeaderOnScroll();


  window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    {
      passive: true
    }
  );


  /* =========================================================
     ACTIVE DESKTOP NAVIGATION
     ========================================================= */

  const desktopNavLinks =
    Array.from(
      document.querySelectorAll(
        ".desktop-nav a[href^='#']"
      )
    );


  const observedSections =
    desktopNavLinks
      .map((link) => {

        const href =
          link.getAttribute("href");


        const section =
          href
            ? document.querySelector(
                href
              )
            : null;


        return section
          ? {
              link,
              section
            }
          : null;

      })
      .filter(Boolean);


  if (
    "IntersectionObserver" in window &&
    observedSections.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              /*
               * Remove active state
               * from every navigation item.
               */

              observedSections.forEach(
                ({ link }) => {

                  link.classList.remove(
                    "is-active"
                  );

                }
              );


              /*
               * Find the navigation link
               * associated with this section.
               */

              const current =
                observedSections.find(
                  ({ section }) =>
                    section ===
                    entry.target
                );


              if (current) {

                current.link.classList.add(
                  "is-active"
                );

              }

            }
          );

        },
        {

          root: null,

          rootMargin:
            "-25% 0px -60% 0px",

          threshold: 0

        }
      );


    observedSections.forEach(
      ({ section }) => {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealItems =
    document.querySelectorAll(
      ".audience-card, " +
      ".mini-feature, " +
      ".learning-step, " +
      ".connection-node, " +
      ".dashboard-preview, " +
      ".benefit-card, " +
      ".path-card"
    );


  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window &&
    revealItems.length
  ) {


    /*
     * Prepare elements for reveal animation.
     */

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "reveal-ready"
        );

      }
    );


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "is-visible"
              );


              /*
               * Once visible, stop observing
               * the element.
               */

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {

          root: null,

          rootMargin:
            "0px 0px -8% 0px",

          threshold: 0.08

        }
      );


    revealItems.forEach(
      (item) => {

        revealObserver.observe(
          item
        );

      }
    );

  }


  /* =========================================================
     STACKWORKS GLOBAL NAMESPACE
     ========================================================= */

  /*
   * Expose a small namespace for future
   * StackWorks functionality.
   *
   * This gives us a clean place to add:
   *
   * - API functionality
   * - Authentication
   * - Institution onboarding
   * - Student features
   * - Educator features
   * - Dashboard functionality
   * - Notifications
   *
   * later without creating random
   * global variables.
   */

  window.StackWorks =
    window.StackWorks || {};


  /* =========================================================
     DESTROY / CLEANUP
     ========================================================= */

  window.StackWorks.destroy =
    () => {

      if (typeTimer) {

        window.clearTimeout(
          typeTimer
        );

        typeTimer = null;

      }

    };


});
/* =========================================================
   STACKWORKS — LOGIN
   Education Works Together.

   Handles:
   - User type selection
   - Validation
   - Role-based routing to dashboards
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const form =
    document.getElementById("loginForm");

  const userTypeOptions =
    document.querySelectorAll(
      'input[name="userType"]'
    );

  const roleHint =
    document.getElementById("roleHint");

  const emailInput =
    document.getElementById("loginEmail");

  const passwordInput =
    document.getElementById("loginPassword");

  const yearTarget =
    document.getElementById("year");


  /* =========================================================
     ROLE ROUTES
     =========================================================
     A single login page routes every user to their
     dedicated workspace dashboard.
     ========================================================= */

  const roleRoutes = {

    "chairman":         "chairman/dashboard.html",

    "dean":             "dean/dashboard.html",

    "department-head":  "department/dashboard.html",

    "faculty":          "faculty/dashboard.html",

    "staff":            "staff/dashboard.html",

    "student":          "student/dashboard.html",

    "parent":           "parent/dashboard.html"

  };


  const roleNames = {

    "chairman":         "Chairman",

    "dean":             "Dean of Academics",

    "department-head":  "Department Head",

    "faculty":          "Faculty",

    "staff":            "Staff",

    "student":          "Student",

    "parent":           "Parent"

  };


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  if (yearTarget) {

    yearTarget.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     USER TYPE SELECTION
     ========================================================= */

  userTypeOptions.forEach((option) => {

    option.addEventListener("change", () => {

      const selected = option.value;

      /* Keep role available to the dashboard. */

      sessionStorage.setItem(
        "stackworksUserRole",
        selected
      );


      if (roleHint) {

        roleHint.textContent =
          "You are signing in as " +
          roleNames[selected] +
          ".";

        roleHint.classList.add(
          "is-selected"
        );

      }

      emailInput?.focus();

    });

  });


  /* =========================================================
     FORM SUBMISSION
     ========================================================= */

  if (form) {

    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const selected =
          document.querySelector(
            'input[name="userType"]:checked'
          );


        let valid = true;


        /* ---------- Role ---------- */

        if (!selected) {

          if (roleHint) {

            roleHint.textContent =
              "Please select your user type.";

            roleHint.classList.remove(
              "is-selected"
            );

          }

          valid = false;

        }


        /* ---------- Email ---------- */

        if (
          emailInput &&
          (
            !emailInput.value ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              emailInput.value
            )
          )
        ) {

          emailInput.classList.add(
            "is-invalid"
          );

          valid = false;

        } else {

          emailInput?.classList.remove(
            "is-invalid"
          );

        }


        /* ---------- Password ---------- */

        if (
          passwordInput &&
          passwordInput.value.length < 6
        ) {

          passwordInput.classList.add(
            "is-invalid"
          );

          valid = false;

        } else {

          passwordInput?.classList.remove(
            "is-invalid"
          );

        }


        if (!valid) {
          return;
        }


        /* ---------- Save session ---------- */

        sessionStorage.setItem(
          "stackworksUserRole",
          selected.value
        );

        sessionStorage.setItem(
          "stackworksUserEmail",
          emailInput.value.trim()
        );


        /* ---------- Route to dashboard ---------- */

        const route =
          roleRoutes[selected.value];

        if (route) {

          window.location.href =
            route;

        }

      }
    );

  }


  /* =========================================================
     LIVE VALIDATION CLEAR
     ========================================================= */

  [emailInput, passwordInput].forEach(
    (input) => {

      input?.addEventListener(
        "input",
        () => {

          input.classList.remove(
            "is-invalid"
          );

        }
      );

    }
  );


});
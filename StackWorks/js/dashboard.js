/* =========================================================
   STACKWORKS — DASHBOARD (shared across all roles)
   Education Works Together.

   Handles:
   - Sidebar mobile toggle
   - Logout
   - Session guard (redirect to login if no role stored)
   - Footer year
   - Welcome message
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================================
     SESSION GUARD
     ========================================================= */

  const userRole =
    sessionStorage.getItem(
      "stackworksUserRole"
    );

  const userEmail =
    sessionStorage.getItem(
      "stackworksUserEmail"
    );


  if (!userRole) {

    window.location.href = "../login.html";

    return;

  }


  /* Verify this page belongs to the logged-in role.
     If someone navigates directly to the wrong dashboard,
     send them to the correct one. */

  const allowedRole =
    document.body.dataset.role;


  if (
    allowedRole &&
    userRole !== allowedRole
  ) {

    const roleRoutes = {

      "chairman":         "../chairman/dashboard.html",

      "dean":             "../dean/dashboard.html",

      "department-head":  "../department/dashboard.html",

      "faculty":          "../faculty/dashboard.html",

      "staff":            "../staff/dashboard.html",

      "student":          "../student/dashboard.html",

      "parent":           "../parent/dashboard.html"

    };


    const correctPath =
      roleRoutes[userRole];


    if (correctPath) {

      window.location.href = correctPath;

    } else {

      window.location.href = "../login.html";

    }

    return;

  }


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const layout =
    document.querySelector(".dash-layout");

  const sidebarOverlay =
    document.querySelector(
      ".dash-sidebar-overlay"
    );

  const sidebarToggle =
    document.querySelector(
      ".dash-mobile-toggle"
    );

  const logoutBtn =
    document.querySelector(".dash-logout");

  const yearTarget =
    document.getElementById("year");

  const welcomeName =
    document.getElementById("welcomeName");

  const welcomeRole =
    document.getElementById("welcomeRole");

  const userAvatar =
    document.getElementById("userAvatar");

  const userNameSidebar =
    document.getElementById("userNameSidebar");

  const userRoleSidebar =
    document.getElementById("userRoleSidebar");


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  if (yearTarget) {

    yearTarget.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     WELCOME / USER INFO
     ========================================================= */

  const displayName =
    userEmail
      ? userEmail.split("@")[0]
      : "User";


  const roleLabels = {

    "chairman":         "Chairman",

    "dean":             "Dean of Academics",

    "department-head":  "Department Head",

    "faculty":          "Faculty",

    "staff":            "Staff",

    "student":          "Student",

    "parent":           "Parent"

  };


  const roleLabel =
    roleLabels[userRole] || userRole;


  if (welcomeName) {

    welcomeName.textContent =
      displayName.charAt(0).toUpperCase() +
      displayName.slice(1);

  }


  if (welcomeRole) {

    welcomeRole.textContent = roleLabel;

  }


  if (userAvatar) {

    userAvatar.textContent =
      displayName.charAt(0).toUpperCase();

  }


  if (userNameSidebar) {

    userNameSidebar.textContent =
      displayName.charAt(0).toUpperCase() +
      displayName.slice(1);

  }


  if (userRoleSidebar) {

    userRoleSidebar.textContent = roleLabel;

  }


  /* =========================================================
     SIDEBAR MOBILE TOGGLE
     ========================================================= */

  function toggleSidebar(open) {

    if (!layout) return;

    layout.classList.toggle(
      "sidebar-open",
      open
    );

  }


  if (sidebarToggle) {

    sidebarToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          layout?.classList.contains(
            "sidebar-open"
          );

        toggleSidebar(!isOpen);

      }
    );

  }


  if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
      "click",
      () => toggleSidebar(false)
    );

  }


  /* Close sidebar on Escape */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        toggleSidebar(false);

      }

    }
  );


  /* =========================================================
     LOGOUT
     ========================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      () => {

        sessionStorage.clear();

        window.location.href = "../login.html";

      }
    );

  }


  /* =========================================================
     ACTIVE NAV LINK
     ========================================================= */

  const currentPage =
    window.location.pathname.split("/").pop();


  document
    .querySelectorAll(
      ".dash-nav a[href]"
    )
    .forEach((link) => {

      const linkPage =
        link
          .getAttribute("href")
          .split("/")
          .pop();


      if (linkPage === currentPage) {

        link.classList.add("active");

      }

    });


});
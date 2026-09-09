/* =========================================================
   STACKWORKS — INSTITUTION ONBOARDING
   Screen 0: Introduction
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* -------------------------------------------------------
       ELEMENTS
       ------------------------------------------------------- */

    const beginApplication =
        document.getElementById("beginApplication");

    const checkApplicationStatus =
        document.getElementById("checkApplicationStatus");

    const currentYear =
        document.getElementById("currentYear");


    /* -------------------------------------------------------
       FOOTER YEAR
       ------------------------------------------------------- */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* -------------------------------------------------------
       BEGIN INSTITUTION APPLICATION
       ------------------------------------------------------- */

    if (beginApplication) {

        beginApplication.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.location.href =
                    "application.html";
            }
        );


        /* Keyboard accessibility */

        beginApplication.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    beginApplication.click();
                }
            }
        );
    }


    /* -------------------------------------------------------
       CHECK APPLICATION STATUS
       ------------------------------------------------------- */

    if (checkApplicationStatus) {

        checkApplicationStatus.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                /*
                 * Status functionality will be connected
                 * when the institution application system
                 * is implemented.
                 */

                console.log(
                    "StackWorks application status"
                );
            }
        );
    }


    /* -------------------------------------------------------
       STACKWORKS NAMESPACE
       ------------------------------------------------------- */

    window.StackWorks =
        window.StackWorks || {};


    window.StackWorks.Onboarding = {

        currentStep: 1,


        /* Begin application */

        begin() {

            window.location.href =
                "application.html";
        },


        /* Return current onboarding step */

        getCurrentStep() {

            return this.currentStep;
        }
    };

});
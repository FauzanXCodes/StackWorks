/* =========================================================
   STACKWORKS — INSTITUTION APPLICATION
   Step 01: Institution Type
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* -------------------------------------------------------
       ELEMENTS
       ------------------------------------------------------- */

    const form =
        document.getElementById("institutionTypeForm");

    const institutionOptions =
        document.querySelectorAll(
            'input[name="institutionType"]'
        );

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
       INSTITUTION TYPE SELECTION
       ------------------------------------------------------- */

    institutionOptions.forEach((option) => {

        option.addEventListener("change", () => {

            /*
             * Keep the selected institution type available
             * to the next application step.
             */

            const selectedType =
                option.value;

            sessionStorage.setItem(
                "stackworksInstitutionType",
                selectedType
            );

        });

    });


    /* -------------------------------------------------------
       FORM SUBMISSION
       ------------------------------------------------------- */

    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const selected =
                    document.querySelector(
                        'input[name="institutionType"]:checked'
                    );


                /* ---------------------------------------------
                   Validation
                   --------------------------------------------- */

                if (!selected) {

                    form.reportValidity();

                    return;
                }


                /* ---------------------------------------------
                   Save institution type
                   --------------------------------------------- */

                sessionStorage.setItem(
                    "stackworksInstitutionType",
                    selected.value
                );


                /* ---------------------------------------------
                   Continue to Step 2
                   --------------------------------------------- */

                window.location.href =
                    "application-details.html";

            }
        );

    }


    /* -------------------------------------------------------
       BACK BUTTON
       ------------------------------------------------------- */

    const backButton =
        document.querySelector(
            ".form-actions .btn-secondary"
        );

    if (backButton) {

        backButton.addEventListener(
            "click",
            (event) => {

                /*
                 * The HTML already contains the correct
                 * destination, so we allow normal navigation.
                 */

                return;
            }
        );

    }


    /* -------------------------------------------------------
       STACKWORKS APPLICATION STATE
       ------------------------------------------------------- */

    window.StackWorks =
        window.StackWorks || {};

    window.StackWorks.Application = {

        currentStep: 1,


        getInstitutionType() {

            return sessionStorage.getItem(
                "stackworksInstitutionType"
            );

        },


        setInstitutionType(type) {

            sessionStorage.setItem(
                "stackworksInstitutionType",
                type
            );

        },


        nextStep() {

            window.location.href =
                "application-details.html";

        }

    };

});
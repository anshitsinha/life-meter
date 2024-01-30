// Execute when the document is fully loaded
$(document).ready(function () {
    // Handle click event for the submit button
    $("#submit").click(function (e) {
        e.preventDefault(); // Prevent form submission
        
        // Get the input value (date of birth)
        const input = $("#dob-input").val();
        const dob = new Date(input); // Convert input to date object
        saveDateOfBirth(dob); // Save date of birth to local storage
        renderAgeLoop(); // Render age loop
    });

    // Function to save date of birth to local storage
    function saveDateOfBirth(dob) {
        localStorage.setItem("dob", dob.getTime()); // Store date as milliseconds
    }

    // Function to load date of birth from local storage
    function loadDateOfBirth() {
        const dob = localStorage.getItem("dob");
        return dob ? new Date(parseInt(dob)) : null; // Parse milliseconds to date object
    }

    // Function to continuously render age
    function renderAgeLoop() {
        const dob = loadDateOfBirth();

        if (dob) {
            hideElement("#choose"); // Hide form
            showElement("#timer"); // Show timer

            // Render age continuously
            function render() {
                const age = calculateAge(dob); // Calculate age
                renderAge(age); // Render age
                requestAnimationFrame(render); // Request next frame
            }

            render(); // Start rendering loop
        } else {
            showElement("#choose"); // Show form to input date of birth
        }
    }

    // Function to render age
    function renderAge(age) {
        $("#age").html(`${age.year}<sup>.${age.ms}</sup>`); // Display age
    }

    // Function to hide an element
    function hideElement(selector) {
        $(selector).css("display", "none");
    }

    // Function to show an element
    function showElement(selector) {
        $(selector).css("display", "block");
    }

    // Function to calculate age
    function calculateAge(dob) {
        const now = new Date();
        const duration = now - dob; // Calculate duration in milliseconds
        const years = duration / 31556900000; // Convert milliseconds to years

        const [year, ms] = years.toFixed(9).toString().split('.'); // Extract year and milliseconds

        return {
            "year": year,
            "ms": ms
        };
    }

    // Main function
    function main() {
        if (loadDateOfBirth()) {
            renderAgeLoop(); // If date of birth is available, start rendering age loop
        } else {
            showElement("#choose"); // Otherwise, show form to input date of birth
        }
    }

    main(); // Execute main function
});
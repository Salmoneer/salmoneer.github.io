// Invariables
const size = 200;

// Variables
let score = 0;
let timer_running = false;
let max_time = 30;
let time_left = max_time;

// Tracking the canvas and image
let canvas, ctx;
let img;
let pos_x, pos_y;

/* Wait for the page to load to be sure that we get the canvas and not `undefined` */
window.addEventListener('load', () => {
    // Store a reference to the canvas and a canvas context for drawing to
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    // Keep a reference to the score element as well
    let score_element = document.getElementById("score");

    // When the canvas is clicked:
    canvas.addEventListener('click', (e) => {
        // Variables used for determining if the target was clicked on or not
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        // If the mouse is on the target image:
        if ((x - pos_x) >= 0 && (x - pos_x) <= size &&
            (y - pos_y) >= 0 && (y - pos_y) <= size &&
            timer_running) {
            score++; // Add to the score
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            new_image(); // Draw a new image
        }
    });

    new_image(); // Create an image when we first load in
});

/* Create a new air purifier image, update the global pos_x and pos_y variables with new random variables, and draw it on the canvas. */
function new_image() {
    img = new Image();
    img.addEventListener('load', () => { // Don't do anything until the image actually loads (when we set the `src` property)
        pos_x = Math.random() * (canvas.width - size); // Set a new random position
        pos_y = Math.random() * (canvas.height - size);
        ctx.drawImage(img, pos_x, pos_y, size, size); // Draw the image on the canvas
    });
    img.src = "images/purifier.png";
}

/* Reset game (used when play button pressed) */
function restart() {
    timer_running = true;
    time_left = max_time;
    score = 0;
}

/* Perform one "tick", every one tenth of a second (game loop) */
(function timer() {
    setTimeout(timer, 100); // In another 100ms, or 1/10 of a second, run the function again.

    let score_element = document.getElementById("score");
    let timer_element = document.getElementById("timer");
    score_element.innerText = `Score: ${score}`; // Update score text
    timer_element.innerText = `Time: ${time_left.toFixed(1)}`; // Update the timer text

    if (timer_running) { // Count down while the timer is still running
        time_left -= 0.1;
    }

    if (time_left <= 0) { // Detect running out of time
        timer_running = false; // Stop this loop running next time
        timer_element.innerText = "Time: 0"; // Update the timer text
    }
})(); // The brackets make the function run automatically. See: https://developer.mozilla.org/en-US/docs/Glossary/IIFE

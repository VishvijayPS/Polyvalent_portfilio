document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkmode-toggle");
  const navLinks = document.querySelectorAll(".nav_link");
  const body = document.body;
  const video = document.getElementById("backgroundVideo");
  const videoSource = document.getElementById("videoSource");

  function toggleTheme() {
    if (toggleButton.checked) {
      navLinks.forEach((link) => {
        link.classList.add("nav_link_dark");
        link.classList.remove("nav_link");
      });
      body.classList.add("dark-mode");

      // Change the video source for dark mode
      videoSource.src = "../video/three.mp4"; // Specify your dark mode video
    } else {
      navLinks.forEach((link) => {
        link.classList.add("nav_link");
        link.classList.remove("nav_link_dark");
      });
      body.classList.remove("dark-mode");

      // Change the video source back to the original for light mode
      videoSource.src = "video1.mp4"; // Specify your light mode video
    }

    video.load(); // Reload the video element to apply the new source
    video.play(); // Start playing the new video
  }

  // Add event listener
  toggleButton.addEventListener("change", toggleTheme);
});

// Get the button
const mybutton = document.getElementById("myBtn");

// Show button when user scrolls down 200px
window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    mybutton.style.display = "flex"; // Display button when scrolling
  } else {
    mybutton.style.display = "none"; // Hide button when at top
  }
};

// Scroll to top smoothly when clicking the button
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

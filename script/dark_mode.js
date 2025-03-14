document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkmode-toggle");
  const backgroundContainer = document.getElementById("background-container");
  const navLinks = document.querySelectorAll(".nav_link");
  const logo = document.querySelectorAll(".menu");
  const body = document.body;

  function toggleTheme() {
    if (toggleButton.checked) {
      backgroundContainer.classList.add("background-container_dark");
      backgroundContainer.classList.remove("background-container");

      navLinks.forEach((link) => {
        link.classList.add("nav_link_dark");
        link.classList.remove("nav_link");
      });
      body.classList.add("dark-mode");
    } else {
      backgroundContainer.classList.add("background-container");
      backgroundContainer.classList.remove("background-container_dark");

      navLinks.forEach((link) => {
        link.classList.add("nav_link");
        link.classList.remove("nav_link_dark");
      });
      body.classList.remove("dark-mode");
    }
  }

  // Add event listener
  toggleButton.addEventListener("change", toggleTheme);
});

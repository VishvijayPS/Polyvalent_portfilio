const texts = ["DESIGNER", "WEB DEVELOPER", "ANDROID DEVELOPER", "CODER"];
let textIndex = 0;
let index = 0;
let isDeleting = false;
const typingSpeed = 150; // Typing speed in ms
const deletingSpeed = 80; // Deleting speed in ms
const pauseTime = 1000; // Pause before deleting

function type() {
  const textElement = document.getElementById("typing-animation");
  const currentText = texts[textIndex];
  let typedText = currentText.slice(0, index);

  textElement.innerHTML = typedText + `<span class="cursor">|</span>`;

  if (!isDeleting) {
    // Typing phase
    if (index < currentText.length) {
      index++;
      setTimeout(type, typingSpeed);
    } else {
      isDeleting = true;
      setTimeout(type, pauseTime); // Pause before deleting
    }
  } else {
    // Deleting phase
    if (index > 0) {
      index--;
      setTimeout(type, deletingSpeed);
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Move to next word
      setTimeout(type, typingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500); // Initial delay
});

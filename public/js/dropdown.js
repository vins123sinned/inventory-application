const button = document.querySelector(".menu-button");
const dropdown = document.querySelector(".header-nav");

button.addEventListener("click", () => {
  const opening = !dropdown.classList.contains("open");

  if (opening) {
    dropdown.classList.toggle("open");
    button.setAttribute("aria-expanded", true);
  } else {
    dropdown.style.opacity = "0";
    dropdown.style.transform = "scaleY(0.95)";

    dropdown.addEventListener("transitionend", function handler() {
      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", false);

      dropdown.style.opacity = "";
      dropdown.style.transform = "";

      dropdown.removeEventListener("transitionend", handler);
    });
  }
});

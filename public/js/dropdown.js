const button = document.querySelector(".menu-button");
const dropdown = document.querySelector(".header-nav");

button.addEventListener("click", () => {
  const isOpen = dropdown.classList.toggle("open");
  button.setAttribute("aria-expanded", isOpen);
});

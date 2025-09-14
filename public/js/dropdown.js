const button = document.querySelector(".menu-button");
const dropdown = document.querySelector(".header-nav");

button.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

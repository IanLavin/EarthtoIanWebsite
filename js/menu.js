export function initMenu({
  containerSelector = ".menu-container",
  toggleSelector = "#menu-toggle",
  openClass = "open",
} = {}) {
  const menuContainer = document.querySelector(containerSelector);
  const menuToggle = document.querySelector(toggleSelector);

  if (!menuContainer || !menuToggle) return;

  function toggleMenu() {
    menuContainer.classList.toggle(openClass);
  }

  function closeMenuOnOutsideClick(event) {
    if (!menuContainer.contains(event.target)) {
      menuContainer.classList.remove(openClass);
    }
  }

  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenuOnOutsideClick);
}


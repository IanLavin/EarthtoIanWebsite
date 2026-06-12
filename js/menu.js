function initSkipLink() {
  const main = document.querySelector("main");
  if (!main) return;

  if (!main.id) main.id = "main-content";
  if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");

  const skipLink = document.createElement("a");
  skipLink.className = "skip-link";
  skipLink.href = `#${main.id}`;
  skipLink.textContent = "Skip to content";
  document.body.insertBefore(skipLink, document.body.firstChild);
}

export function initMenu({
  containerSelector = ".menu-container",
  toggleSelector = "#menu-toggle",
  openClass = "open",
} = {}) {
  initSkipLink();

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


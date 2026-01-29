const headerContent = `
  <div class="header-inner">
    <div class="header-top">
      <div class="header-title">
        <h1>Konstantin Goryagin</h1>
        <p>Modern CV & insights on books, wellness, and personal growth.</p>
      </div>
      <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
        <span class="theme-toggle-icon" aria-hidden="true">🌙</span>
        <span class="theme-toggle-text">Dark</span>
      </button>
    </div>
    <nav>
      <a href="index" data-page="index">Home</a>
      <a href="about" data-page="about">About</a>
      <a href="books" data-page="books">Books</a>
      <a href="health" data-page="health">Health</a>
      <a href="blog" data-page="blog">Blog</a>
      <a href="connect" data-page="connect">Connect</a>
    </nav>
  </div>
`;

const headerTarget = document.querySelector("header[data-site-header]");

if (headerTarget) {
  headerTarget.innerHTML = headerContent;

  const path = window.location.pathname.split("/").pop();
  const normalizedPage = path ? path.replace(".html", "") : "index";
  const activeLink = headerTarget.querySelector(
    `a[data-page="${normalizedPage || "index"}"]`
  );

  if (activeLink) {
    activeLink.setAttribute("aria-current", "page");
  }
}

const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = themeToggle?.querySelector(".theme-toggle-icon");
const themeText = themeToggle?.querySelector(".theme-toggle-text");
const themeRoot = document.documentElement;

const getDefaultTheme = () => {
  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark";
};

const setTheme = (theme) => {
  themeRoot.setAttribute("data-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  }
  if (themeText) {
    themeText.textContent = theme === "dark" ? "Dark" : "Light";
  }
};

setTheme(getDefaultTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      themeRoot.getAttribute("data-theme") || getDefaultTheme();
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

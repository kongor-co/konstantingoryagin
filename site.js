const SITE_NAME = "Konstantin Goryagin";
const headerContent = `
  <div class="header-inner">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="header-top">
      <div class="header-title">
        <a class="site-brand" href="/index.html">${SITE_NAME}</a>
        <p>${SITE_TAGLINE}</p>
      </div>
      <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
        <span class="theme-toggle-icon" aria-hidden="true">\u263E</span>
        <span class="theme-toggle-text">Dark</span>
      </button>
    </div>
    <nav aria-label="Primary">
      <a href="/index.html" data-page="index">Home</a>
      <a href="/about.html" data-page="about">About</a>
      <a href="/books.html" data-page="books">Books</a>
      <a href="/health.html" data-page="health">Health</a>
      <a href="/blog.html" data-page="blog">Blog</a>
      <a href="/connect.html" data-page="connect">Connect</a>
    </nav>
  </div>
`;

const footerContent = `
  <p>&copy; <span data-current-year></span> ${SITE_NAME}. All rights reserved.</p>
`;

const themeRoot = document.documentElement;
const storageKey = "site-theme";

const getDefaultTheme = () => {
  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark";
};

const getStoredTheme = () => {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const persistTheme = (theme) => {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Ignore storage failures in private browsing or locked-down contexts.
  }
};

const setTheme = (theme) => {
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcon = themeToggle?.querySelector(".theme-toggle-icon");
  const themeText = themeToggle?.querySelector(".theme-toggle-text");
  const isDark = theme === "dark";

  themeRoot.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "\u263E" : "\u2600";
  }

  if (themeText) {
    themeText.textContent = isDark ? "Dark" : "Light";
  }
};

const initializeTheme = () => {
  const preferredTheme = getStoredTheme() || getDefaultTheme();
  setTheme(preferredTheme);

  const themeToggle = document.querySelector("[data-theme-toggle]");
  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = themeRoot.getAttribute("data-theme") || getDefaultTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    persistTheme(nextTheme);
  });
};

const initializeHeader = () => {
  const headerTarget = document.querySelector("header[data-site-header]");
  if (!headerTarget) {
    return;
  }

  headerTarget.innerHTML = headerContent;

  const path = window.location.pathname.split("/").pop();
  const normalizedPage = path ? path.replace(".html", "") : "index";
  const activeLink = headerTarget.querySelector(
    `a[data-page="${normalizedPage || "index"}"]`
  );

  if (activeLink) {
    activeLink.setAttribute("aria-current", "page");
  }
};

const initializeFooter = () => {
  const footerTarget = document.querySelector("footer[data-site-footer]");
  if (!footerTarget) {
    return;
  }

  footerTarget.innerHTML = footerContent;
  const yearTarget = footerTarget.querySelector("[data-current-year]");

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
};

const initializeArticleToggles = () => {
  const toggleButtons = document.querySelectorAll(".article-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) {
        return;
      }

      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isExpanded));
      button.textContent = isExpanded ? "Read full article" : "Collapse article";
      target.hidden = isExpanded;
      button
        .closest(".article-section")
        ?.classList.toggle("is-expanded", !isExpanded);
    });
  });
};

const initializeCopyButtons = () => {
  const copyButtons = document.querySelectorAll("[data-copy-email]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-copy-email");
      const feedbackId = button.getAttribute("data-feedback-target");
      const feedbackTarget = feedbackId
        ? document.getElementById(feedbackId)
        : null;

      if (!email) {
        return;
      }

      try {
        await navigator.clipboard.writeText(email);
        if (feedbackTarget) {
          feedbackTarget.textContent = "Email copied to clipboard.";
        }
      } catch {
        if (feedbackTarget) {
          feedbackTarget.textContent = "Copy failed. Please copy the address manually.";
        }
      }
    });
  });
};

initializeHeader();
initializeFooter();
initializeTheme();
initializeArticleToggles();
initializeCopyButtons();

const headerContent = `
  <div class="header-inner">
    <div class="header-title">
      <h1>Konstantin Goryagin</h1>
      <p>Modern CV & insights on books, wellness, and personal growth.</p>
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

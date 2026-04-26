# konstantingoryagin.com

Static personal website for deployment on GitHub Pages.

## GitHub Pages setup

This repository is structured as a plain static site:

- `index.html` is the homepage.
- `404.html` is the custom not-found page supported by GitHub Pages.
- `CNAME` stays in the publishing root and contains the custom domain only.
- `.nojekyll` tells GitHub Pages to publish the files as-is without Jekyll processing.

The current custom domain in `CNAME` is `www.konstantingoryagin.com`.

## Files

- `site.js`: shared header, footer, theme persistence, blog toggles, and contact actions.
- `styles.css`: global site styles.
- `about.html`, `books.html`, `blog.html`, `health.html`, `connect.html`: top-level pages.
- `assets/`: local SVG assets used by the pages.

## Notes

- The site uses absolute paths like `/about.html`, which are correct for the current custom-domain GitHub Pages setup.
- If you ever move this site to a project Pages URL under a subpath instead of a custom root domain, the asset and navigation paths will need to be adjusted.
- The content placeholders are intentionally still present.

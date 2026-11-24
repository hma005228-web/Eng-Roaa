/* main.js — shared: header, footer, site texts, reveal animations, home page */
(function () {
  "use strict";

  const page = document.body.dataset.page || "";
  const cfg = typeof siteConfig !== "undefined" ? siteConfig : {};
  const list = typeof artworks !== "undefined" ? artworks : [];

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Header / Footer ---------- */
  const links = [
    ["index.html", "Home", "home"],
    ["gallery.html", "Gallery", "gallery"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"]
  ];

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="Home">
          <img src="images/logo/logo.svg" alt="" width="28" height="28">
          <span>${esc(cfg.siteName || "My Art Gallery")}</span>
        </a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
        <nav class="nav-links">
          ${links.map(([href, label, key]) => `<a href="${href}" class="${page === key || (page === "artwork" && key === "gallery") ? "active" : ""}">${label}</a>`).join("")}
        </nav>
      </div>`;
    const toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container footer-inner">
        <span class="footer-brand">${esc(cfg.siteName || "")}</span>
        <span class="footer-note">© ${new Date().getFullYear()} · ${esc(cfg.footerText || "")}</span>
      </div>`;
  }

  /* ---------- Generic helpers (shared by other scripts) ---------- */
  window.GalleryUtil = {
    esc,
    sorted(arr, dir) {
      return [...arr].sort((a, b) => {
        const d = new Date(b.date) - new Date(a.date);
        const r = d !== 0 && !isNaN(d) ? d : b.id - a.id;
        return dir === "oldest" ? -r : r;
      });
    },
    formatDate(str) {
      const d = new Date(str);
      if (isNaN(d)) return str || "";
      return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
    },
    card(art) {
      return `
        <a class="art-card reveal" href="artwork.html?id=${encodeURIComponent(art.id)}" aria-label="${esc(art.title)}">
          <img src="${esc(art.image)}" alt="${esc(art.title)}" loading="lazy" decoding="async">
          <div class="art-card-info">
            <span class="art-card-cat">${esc(art.category)}</span>
            <h3>${esc(art.title)}</h3>
          </div>
        </a>`;
    }
  };

  /* ---------- Scroll reveal ---------- */
  window.observeReveals = function (root) {
    const els = (root || document).querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
  };

  /* ---------- Home page ---------- */
  if (page === "home") {
    const h = cfg.home || {};
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || ""; };
    set("hero-title", h.heroTitle);
    set("hero-subtitle", h.heroSubtitle);
    set("intro-text", h.intro);
    set("featured-title", h.featuredTitle);
    set("featured-subtitle", h.featuredSubtitle);

    const hero = document.getElementById("hero");
    if (hero && h.heroImage) hero.style.backgroundImage = `url("${h.heroImage}")`;

    const featured = GalleryUtil.sorted(list.filter((a) => a.featured === true), "newest");

    const heroArt = document.getElementById("hero-art");
    if (heroArt) {
      const src = h.heroArtwork || (featured[0] || list[0] || {}).image;
      if (src) {
        heroArt.src = src;
        const link = document.getElementById("hero-art-link");
        const match = list.find((a) => a.image === src);
        if (link && match) link.href = `artwork.html?id=${encodeURIComponent(match.id)}`;
      } else {
        heroArt.parentElement.style.display = "none";
      }
    }

    const grid = document.getElementById("featured-grid");
    if (grid) {
      if (featured.length === 0) {
        document.getElementById("featured-section").style.display = "none";
      } else {
        grid.innerHTML = featured.map(GalleryUtil.card).join("");
      }
    }
  }

  /* ---------- About page ---------- */
  if (page === "about" && cfg.about) {
    const a = cfg.about;
    const root = document.getElementById("about-root");
    if (root) {
      const facts = (a.facts || []).map((f) => `
        <div class="fact"><strong>${esc(f.value === "auto" ? list.length : f.value)}</strong><span>${esc(f.label)}</span></div>`).join("");
      root.innerHTML = `
        <div class="about-photo reveal"><img src="${esc(a.photo)}" alt="${esc(a.name)}" loading="lazy"></div>
        <div class="about-text reveal">
          <p class="eyebrow">${esc(a.title)}</p>
          <h1>${esc(a.name)}</h1>
          ${(a.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("")}
          <h2>${esc(a.style?.title || "")}</h2>
          <ul class="style-list">${(a.style?.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
          <div class="facts">${facts}</div>
        </div>`;
    }
  }

  /* ---------- Contact page ---------- */
  if (page === "contact" && cfg.contact) {
    const c = cfg.contact;
    const root = document.getElementById("contact-root");
    if (root) {
      root.innerHTML = `
        <p class="eyebrow">${esc(c.title)}</p>
        <h1>${esc(c.title)}</h1>
        <p class="lead">${esc(c.intro)}</p>
        <div class="contact-grid">
          <a class="contact-item" href="mailto:${esc(c.email)}"><span>Email</span><strong>${esc(c.email)}</strong></a>
          <a class="contact-item" href="tel:${esc(String(c.phone).replace(/\s+/g, ""))}"><span>Phone</span><strong>${esc(c.phone)}</strong></a>
          <div class="contact-item"><span>Location</span><strong>${esc(c.location)}</strong></div>
        </div>
        <div class="socials">
          ${(c.socials || []).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>`).join("")}
        </div>`;
    }
  }

  observeReveals();
})();

/* artwork.js — artwork details, prev/next, fullscreen */
(function () {
  "use strict";

  const root = document.getElementById("artwork-root");
  if (!root) return;

  const ordered = GalleryUtil.sorted(typeof artworks !== "undefined" ? artworks : [], "newest");
  const id = new URLSearchParams(location.search).get("id");
  let index = ordered.findIndex((a) => String(a.id) === String(id));

  if (index === -1) {
    root.innerHTML = `
      <div class="empty-state">
        <h1>Artwork not found</h1>
        <p>This artwork doesn't exist or was removed.</p>
        <a class="btn" href="gallery.html">Back to Gallery</a>
      </div>`;
    return;
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function show() {
    const a = ordered[index];
    const prev = ordered[(index - 1 + ordered.length) % ordered.length];
    const next = ordered[(index + 1) % ordered.length];
    document.title = `${a.title} — ${siteConfig.siteName}`;

    root.innerHTML = `
      <div class="detail">
        <figure class="detail-image">
          <img id="detail-img" src="${GalleryUtil.esc(a.image)}" alt="${GalleryUtil.esc(a.title)}" decoding="async">
          <button type="button" class="fs-btn" id="fs-btn" aria-label="View fullscreen">⤢ Fullscreen</button>
        </figure>
        <div class="detail-info">
          <a class="back-link" href="gallery.html">← Back to Gallery</a>
          <a class="chip" href="gallery.html?category=${encodeURIComponent(a.category)}">${GalleryUtil.esc(a.category)}</a>
          <h1>${GalleryUtil.esc(a.title)}</h1>
          <p class="detail-date">${GalleryUtil.esc(GalleryUtil.formatDate(a.date))}</p>
          <p class="detail-desc">${GalleryUtil.esc(a.description)}</p>
          ${ordered.length > 1 ? `
          <div class="pager">
            <a href="artwork.html?id=${encodeURIComponent(prev.id)}" data-nav="prev">← ${GalleryUtil.esc(prev.title)}</a>
            <a href="artwork.html?id=${encodeURIComponent(next.id)}" data-nav="next">${GalleryUtil.esc(next.title)} →</a>
          </div>` : ""}
        </div>
      </div>`;

    document.getElementById("fs-btn").addEventListener("click", openLightbox);
    document.getElementById("detail-img").addEventListener("click", openLightbox);
    root.querySelectorAll("[data-nav]").forEach((l) =>
      l.addEventListener("click", (e) => { e.preventDefault(); go(l.dataset.nav === "next" ? 1 : -1); })
    );
  }

  function go(step) {
    index = (index + step + ordered.length) % ordered.length;
    try { history.replaceState(null, "", `artwork.html?id=${encodeURIComponent(ordered[index].id)}`); } catch (e) { /* e.g. opened via file:// */ }
    show();
    if (lightbox.classList.contains("open")) syncLightbox();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncLightbox() {
    lightboxImg.src = ordered[index].image;
    lightboxImg.alt = ordered[index].title;
  }
  function openLightbox() {
    syncLightbox();
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
    if (lightbox.requestFullscreen) lightbox.requestFullscreen().catch(() => {});
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  document.getElementById("lb-close").addEventListener("click", closeLightbox);
  document.getElementById("lb-prev").addEventListener("click", () => go(-1));
  document.getElementById("lb-next").addEventListener("click", () => go(1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && lightbox.classList.contains("open")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });

  show();
})();

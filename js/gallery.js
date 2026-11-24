/* gallery.js — filtering and sorting for gallery.html */
(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  const filtersEl = document.getElementById("filters");
  const emptyEl = document.getElementById("empty-state");
  if (!grid) return;

  const all = typeof artworks !== "undefined" ? artworks : [];
  const baseCats = typeof categories !== "undefined" ? categories : ["All"];

  // Any category used by an artwork but missing from categories.js is added automatically
  const cats = [...baseCats];
  all.forEach((a) => { if (a.category && !cats.includes(a.category)) cats.push(a.category); });
  if (!cats.includes("All")) cats.unshift("All");

  // Read initial category from URL (?category=Portrait)
  const params = new URLSearchParams(location.search);
  let activeCat = cats.includes(params.get("category")) ? params.get("category") : "All";

  function renderFilters() {
    filtersEl.innerHTML = cats
      .map((c) => `<button type="button" class="filter-btn ${c === activeCat ? "active" : ""}" data-cat="${GalleryUtil.esc(c)}">${GalleryUtil.esc(c)}</button>`)
      .join("");
  }

  function render() {
    let items = all.filter((a) => (activeCat === "All" || a.category === activeCat));
    items = GalleryUtil.sorted(items, "newest");

    grid.innerHTML = items.map(GalleryUtil.card).join("");
    emptyEl.hidden = items.length > 0;
    observeReveals(grid);
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    activeCat = btn.dataset.cat;
    renderFilters();
    render();
  });

  renderFilters();
  render();
})();

(function () {
  const root = document.documentElement;
  const themeKey = "guia-mfyc-theme";
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function getStoredTheme() {
    try {
      return localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (error) {
      // Storage can be unavailable in private or restricted contexts.
      // Keep the selected theme in the current DOM session instead.
    }
  }

  function normalizeText(value) {
    return (value || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    storeTheme(theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      button.textContent = theme === "dark" ? "Claro" : "Oscuro";
    });
  }

  setTheme(getStoredTheme() || (prefersDark ? "dark" : "light"));

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelectorAll("[data-filter-scope]").forEach((scope) => {
    const targetSelector = scope.getAttribute("data-filter-target");
    const emptySelector = scope.getAttribute("data-empty-target");
    const items = Array.from(document.querySelectorAll(targetSelector)).map((target) => ({
      element: target,
      normalizedSearch: normalizeText(target.getAttribute("data-search") || target.textContent),
    }));
    const input = scope.querySelector("[data-filter-input]");
    const empty = emptySelector ? document.querySelector(emptySelector) : null;
    const filters = {};

    function applyFilters() {
      const query = normalizeText(input ? input.value.trim() : "");
      let visible = 0;

      items.forEach(({ element, normalizedSearch }) => {
        const queryMatch = !query || normalizedSearch.includes(query);
        const buttonMatch = Object.entries(filters).every(([key, value]) => {
          return value === "all" || element.getAttribute(`data-${key}`) === value;
        });
        const show = queryMatch && buttonMatch;
        element.hidden = !show;
        if (show) visible += 1;
      });

      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    scope.querySelectorAll("[data-filter-button]").forEach((button) => {
      const key = button.getAttribute("data-filter-key");
      const value = button.getAttribute("data-filter-value");
      if (!filters[key]) filters[key] = "all";

      button.addEventListener("click", () => {
        filters[key] = value;
        scope.querySelectorAll(`[data-filter-key="${key}"]`).forEach((peer) => {
          peer.classList.toggle("is-active", peer === button);
        });
        applyFilters();
      });
    });

    if (input) input.addEventListener("input", applyFilters);
    applyFilters();
  });

  document.querySelectorAll("input[data-search], textarea[data-search]").forEach((input) => {
    const scopeSelector = input.getAttribute("data-search");
    const scope = scopeSelector ? document.querySelector(scopeSelector) : null;
    if (!scope) return;

    const items = Array.from(scope.querySelectorAll("[data-filter]")).map((element) => ({
      element,
      normalizedSearch: normalizeText(element.getAttribute("data-filter") || element.textContent || ""),
    }));
    const empty = scope.querySelector("[data-empty]");

    function applySimpleSearch() {
      const term = normalizeText(input.value.trim());
      let visible = 0;

      items.forEach(({ element, normalizedSearch }) => {
        const match = !term || normalizedSearch.includes(term);
        element.classList.toggle("hidden-by-search", !match);
        if (match) visible += 1;
      });

      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    input.addEventListener("input", applySimpleSearch);
    applySimpleSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    const active = document.activeElement;
    if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;
    const search = document.querySelector("[data-filter-input], input[data-search], textarea[data-search]");
    if (!search) return;
    event.preventDefault();
    search.focus();
  });

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".module-rail a").forEach((link) => {
    if (link.getAttribute("href") === current) link.classList.add("is-active");
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalizedHref = href.replace(/^\.\.\//, "").replace(/^\.\//, "");
    const path = location.pathname;
    const isHome = normalizedHref === "index.html" && /\/docs\/index\.html$|\/index\.html$/.test(path);
    const moduleMatch = normalizedHref.match(/^([^/]+)\/index\.html$/);
    const isModule = moduleMatch && path.includes(`/${moduleMatch[1]}/`);
    if (isHome || isModule) link.setAttribute("aria-current", "page");
  });
})();

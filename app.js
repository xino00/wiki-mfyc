(function () {
  const root = document.documentElement;
  const themeKey = "guia-mfyc-theme";
  const storedTheme = localStorage.getItem(themeKey);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function normalizeText(value) {
    return (value || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      button.textContent = theme === "dark" ? "Claro" : "Oscuro";
    });
  }

  setTheme(storedTheme || (prefersDark ? "dark" : "light"));

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelectorAll("[data-filter-scope]").forEach((scope) => {
    const targetSelector = scope.getAttribute("data-filter-target");
    const emptySelector = scope.getAttribute("data-empty-target");
    const targets = Array.from(document.querySelectorAll(targetSelector));
    const input = scope.querySelector("[data-filter-input]");
    const empty = emptySelector ? document.querySelector(emptySelector) : null;
    const filters = {};
    const resultCounter = scope.querySelector("[data-filter-results]") || scope.querySelector("[data-result-count]");

    function formatResultCount(visible, total) {
      const itemLabel = total === 1 ? "resultado" : "resultados";
      return `${visible} de ${total} ${itemLabel}`;
    }

    function updateResultCounter(visible) {
      if (!resultCounter) return;
      resultCounter.textContent = formatResultCount(visible, targets.length);
    }

    function applyFilters() {
      const query = normalizeText(input ? input.value.trim() : "");
      let visible = 0;

      targets.forEach((target) => {
        const haystack = normalizeText(target.getAttribute("data-search") || target.textContent);
        const queryMatch = !query || haystack.includes(query);
        const buttonMatch = Object.entries(filters).every(([key, value]) => {
          return value === "all" || target.getAttribute(`data-${key}`) === value;
        });
        const show = queryMatch && buttonMatch;
        target.hidden = !show;
        if (show) visible += 1;
      });

      updateResultCounter(visible);
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    scope.querySelectorAll("[data-filter-button]").forEach((button) => {
      const key = button.getAttribute("data-filter-key");
      const value = button.getAttribute("data-filter-value");
      if (!filters[key]) filters[key] = "all";
      button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));

      button.addEventListener("click", () => {
        filters[key] = value;
        scope.querySelectorAll(`[data-filter-key="${key}"]`).forEach((peer) => {
          const isSelected = peer === button;
          peer.classList.toggle("is-active", isSelected);
          peer.setAttribute("aria-pressed", String(isSelected));
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

    const items = Array.from(scope.querySelectorAll("[data-filter]"));
    const empty = scope.querySelector("[data-empty]");
    const resultCounter = scope.querySelector("[data-search-results]") || scope.querySelector("[data-result-count]");

    function formatSearchResultCount(visible, total) {
      const itemLabel = total === 1 ? "resultado" : "resultados";
      return `${visible} de ${total} ${itemLabel}`;
    }

    function updateSearchResultCounter(visible) {
      if (!resultCounter) return;
      resultCounter.textContent = formatSearchResultCount(visible, items.length);
    }

    function applySimpleSearch() {
      const term = normalizeText(input.value.trim());
      let visible = 0;

      items.forEach((item) => {
        const haystack = normalizeText(item.getAttribute("data-filter") || item.textContent || "");
        const match = !term || haystack.includes(term);
        item.classList.toggle("hidden-by-search", !match);
        if (match) visible += 1;
      });

      updateSearchResultCounter(visible);
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    input.addEventListener("input", applySimpleSearch);
    applySimpleSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    const active = document.activeElement;
    if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;
    if (active && active.isContentEditable) return;
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

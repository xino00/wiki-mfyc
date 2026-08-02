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
    const resultCounter = scope.querySelector("[data-filter-results]") || scope.querySelector("[data-result-count]");

    function formatResultCount(visible, total) {
      const itemLabel = total === 1 ? "resultado" : "resultados";
      return `${visible} de ${total} ${itemLabel}`;
    }

    function updateResultCounter(visible) {
      if (!resultCounter) return;
      resultCounter.textContent = formatResultCount(visible, items.length);
    }

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

    const items = Array.from(scope.querySelectorAll("[data-filter]")).map((element) => ({
      element,
      normalizedSearch: normalizeText(element.getAttribute("data-filter") || element.textContent || ""),
    }));
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

      items.forEach(({ element, normalizedSearch }) => {
        const match = !term || normalizedSearch.includes(term);
        element.classList.toggle("hidden-by-search", !match);
        if (match) visible += 1;
      });

      updateSearchResultCounter(visible);
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    input.addEventListener("input", applySimpleSearch);
    applySimpleSearch();
  });

  // --- Menú móvil (hamburguesa) ---
  const siteBar = document.querySelector(".site-bar");
  const navToggle = document.querySelector("[data-nav-toggle]");
  if (siteBar && navToggle) {
    function setNavOpen(open) {
      siteBar.dataset.navOpen = open ? "true" : "false";
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    }
    navToggle.addEventListener("click", () => {
      setNavOpen(siteBar.dataset.navOpen !== "true");
    });
    // Cerrar el menú al elegir un destino
    siteBar.querySelectorAll(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });
  }

  // Cerrar el desplegable "Módulos" al hacer clic fuera
  document.addEventListener("click", (event) => {
    document.querySelectorAll(".nav-more[open]").forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute("open");
    });
  });

  // --- Búsqueda global (Pagefind, carga perezosa) ---
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  if (searchOpeners.length) {
    const base = (siteBar && siteBar.dataset.base) || "";
    const pagefindAssetPath = `${base}pagefind/`;
    let modal = null;
    let pagefindReady = null;

    function buildModal() {
      modal = document.createElement("div");
      modal.className = "search-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Buscar en la guía");
      modal.innerHTML =
        '<div class="search-modal-panel">' +
        '<div class="search-modal-head"><strong>Buscar en la guía</strong>' +
        '<button class="search-modal-close" type="button" data-search-close aria-label="Cerrar búsqueda">✕</button></div>' +
        '<div id="search-modal-ui"></div>' +
        '<p class="search-modal-hint">Busca en toda la guía. Pulsa <kbd>Esc</kbd> para cerrar.</p>' +
        "</div>";
      document.body.appendChild(modal);
      modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.closest("[data-search-close]")) closeModal();
      });
    }

    function loadPagefind() {
      if (pagefindReady) return pagefindReady;
      pagefindReady = new Promise((resolve, reject) => {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = pagefindAssetPath + "pagefind-ui.css";
        document.head.appendChild(css);
        const script = document.createElement("script");
        script.src = pagefindAssetPath + "pagefind-ui.js";
        script.onload = () => {
          /* global PagefindUI */
          new PagefindUI({
            element: "#search-modal-ui",
            showImages: false,
            showSubResults: true,
            translations: {
              placeholder: "Buscar síntoma, fármaco, síndrome…",
              zero_results: "Sin resultados para «[SEARCH_TERM]»",
            },
          });
          resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });
      return pagefindReady;
    }

    function openModal() {
      if (!modal) buildModal();
      loadPagefind().then(() => {
        const input = modal.querySelector("input");
        if (input) input.focus();
      });
      modal.dataset.open = "true";
      const input = modal.querySelector("input");
      if (input) input.focus();
    }

    function closeModal() {
      if (modal) modal.dataset.open = "false";
    }

    searchOpeners.forEach((btn) => btn.addEventListener("click", openModal));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal && modal.dataset.open === "true") closeModal();
    });

    // El atajo "/" abre la búsqueda global (antes enfocaba solo el filtro local)
    document.addEventListener("keydown", (event) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const active = document.activeElement;
      if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;
      if (active && active.isContentEditable) return;
      event.preventDefault();
      openModal();
    });
  }

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

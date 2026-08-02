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

    const items = Array.from(scope.querySelectorAll("[data-filter]"));
    const empty = scope.querySelector("[data-empty]");

    function applySimpleSearch() {
      const term = normalizeText(input.value.trim());
      let visible = 0;

      items.forEach((item) => {
        const haystack = normalizeText(item.getAttribute("data-filter") || item.textContent || "");
        const match = !term || haystack.includes(term);
        item.classList.toggle("hidden-by-search", !match);
        if (match) visible += 1;
      });

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
        '<p class="search-modal-hint">Busca en las 107 fichas. Pulsa <kbd>Esc</kbd> para cerrar.</p>' +
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

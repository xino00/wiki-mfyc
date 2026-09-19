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

  function formatResultCount(visible, total) {
    return `${visible} de ${total} ${total === 1 ? "resultado" : "resultados"}`;
  }

  function initializeFilter(controller) {
    const targetSelector = controller.getAttribute("data-filter-target");
    const emptySelector = controller.getAttribute("data-empty-target");
    const input = controller.querySelector("[data-filter-input]");
    if (!targetSelector || !emptySelector || !input) return;

    const items = Array.from(document.querySelectorAll(targetSelector)).map((element) => ({
      element,
      normalizedSearch: normalizeText(
        element.getAttribute("data-search") || element.getAttribute("data-filter") || element.textContent
      ),
    }));
    if (!items.length) return;

    const empty = document.querySelector(emptySelector);
    const resultCounter = controller.querySelector("[data-filter-results], [data-result-count]");
    const filters = {};

    function applyFilters() {
      const query = normalizeText(input.value.trim());
      let visible = 0;

      items.forEach(({ element, normalizedSearch }) => {
        const queryMatches = !query || normalizedSearch.includes(query);
        const buttonsMatch = Object.entries(filters).every(([key, value]) => {
          return value === "all" || element.getAttribute(`data-${key}`) === value;
        });
        const show = queryMatches && buttonsMatch;
        element.hidden = !show;
        if (show) visible += 1;
      });

      if (resultCounter) resultCounter.textContent = formatResultCount(visible, items.length);
      if (empty) empty.classList.toggle("is-visible", visible === 0);
      document.querySelectorAll("[data-filter-group]").forEach((group) => {
        const children = items.filter(({ element }) => group.contains(element));
        if (children.length) group.hidden = children.every(({ element }) => element.hidden);
      });
    }

    controller.querySelectorAll("[data-filter-button]").forEach((button) => {
      const key = button.getAttribute("data-filter-key");
      const value = button.getAttribute("data-filter-value");
      if (!key || !value) return;
      if (!(key in filters)) filters[key] = "all";
      if (button.classList.contains("is-active")) filters[key] = value;
      button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));

      button.addEventListener("click", () => {
        filters[key] = value;
        controller.querySelectorAll(`[data-filter-key="${key}"]`).forEach((peer) => {
          const selected = peer === button;
          peer.classList.toggle("is-active", selected);
          peer.setAttribute("aria-pressed", String(selected));
        });
        applyFilters();
      });
    });

    input.addEventListener("input", applyFilters);
    applyFilters();
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

  document.querySelectorAll("[data-filter-scope]").forEach(initializeFilter);

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

  // Cerrar la biblioteca al hacer clic fuera.
  document.addEventListener("click", (event) => {
    document.querySelectorAll(".nav-more[open]").forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute("open");
    });
  });

  // El catálogo orienta hacia tareas; Pagefind busca el texto completo de cada guía.
  const publicRoot = new URL((siteBar && siteBar.dataset.base) || "./", location.href);
  const catalog = window.GUIDE_CATALOG || [];
  const pathKey = (href) => new URL(href, publicRoot).pathname;
  const catalogByPath = new Map(catalog.map((entry) => [pathKey(entry.href), entry]));
  const wordsIn = (text) => normalizeText(text).match(/[\p{L}\p{N}]+/gu) || [];
  const includesWords = (text, words) => {
    const terms = new Set(wordsIn(text));
    return words.length > 0 && words.every((word) => terms.has(word));
  };

  function catalogRelevance(entry, query) {
    const normalized = normalizeText(query);
    const words = wordsIn(query);
    if (normalizeText(entry.title) === normalized) return 100;
    if (entry.aliases.some((alias) => normalizeText(alias) === normalized)) return 90;
    if (includesWords(entry.title, words)) return 80;
    if (entry.aliases.some((alias) => includesWords(alias, words))) return 70;
    if (includesWords([entry.title, ...entry.aliases].join(" "), words)) return 60;
    if (entry.tasks.some((task) => includesWords(task.label, words))) return 40;
    return 0;
  }
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  if (searchOpeners.length) {
    let modal;
    let pagefindReady;
    let engineFailed = false;
    let importAttempt = 0;
    let returnFocus;
    let queryVersion = 0;
    let inputTimer;
    let searchState;

    function element(tag, className, text) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    }

    function buildModal() {
      modal = document.createElement("dialog");
      modal.className = "search-modal";
      modal.setAttribute("aria-labelledby", "search-modal-title");
      modal.innerHTML =
        '<div class="search-modal-panel">' +
        '<div class="search-modal-head"><strong id="search-modal-title">Buscar en la guía</strong>' +
        '<button class="search-modal-close" type="button" data-search-close aria-label="Cerrar búsqueda">✕</button></div>' +
        '<form class="global-query" role="search"><label for="global-query">Problema, fármaco o técnica</label>' +
        '<div class="query-control"><input id="global-query" type="search" data-global-query autocomplete="off" autofocus>' +
        '<button type="submit">Buscar</button></div></form>' +
        '<p class="search-modal-status" role="status" aria-live="polite" data-search-status></p>' +
        '<button type="button" data-search-retry hidden>Reintentar</button>' +
        '<ol class="search-results" data-search-results></ol>' +
        '<button class="search-more" type="button" data-search-more hidden>Más resultados</button>' +
        '<p class="search-modal-hint">Busca en toda la guía. Pulsa <kbd>Esc</kbd> para cerrar.</p></div>';
      document.body.appendChild(modal);
      if (publicRoot.protocol === "file:") {
        modal.querySelector(".search-modal-hint").textContent = "Búsqueda local por títulos y temas. La versión web también busca dentro del texto. Pulsa Esc para cerrar.";
      }
      modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.closest("[data-search-close]")) closeModal();
        const destination = event.target.closest("[data-search-results] a");
        if (destination && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          closeModal();
          // Un enlace a la misma sección no dispara hashchange ni recarga la página.
          if (destination.href === location.href) requestAnimationFrame(revealHashTarget);
        }
      });
      modal.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        clearTimeout(inputTimer);
        runSearch();
      });
      modal.querySelector("input").addEventListener("input", () => {
        clearTimeout(inputTimer);
        // Invalidar también durante la espera evita resultados de la consulta anterior.
        queryVersion += 1;
        inputTimer = setTimeout(runSearch, 150);
      });
      modal.querySelector("[data-search-retry]").addEventListener("click", runSearch);
      modal.querySelector("[data-search-more]").addEventListener("click", async () => {
        const version = queryVersion;
        const state = searchState;
        if (!state) return;
        try {
          await appendPagefindResults(state, version);
        } catch (_) {
          if (state.enginePromise && state.enginePromise === pagefindReady) engineFailed = true;
          if (modal.open && version === queryVersion) showError();
        }
      });
      modal.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          // El input search consume Escape para vaciarse antes del cancel nativo.
          event.preventDefault();
          closeModal();
          return;
        }
        if (event.key !== "Tab") return;
        const controls = [...modal.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")]
          .filter((node) => !node.disabled && node.tabIndex >= 0 && node.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
      modal.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeModal();
      });
    }

    function loadPagefind() {
      if (!pagefindReady) {
        const script = new URL("pagefind/pagefind.js", publicRoot);
        // Los imports fallidos quedan en caché; una URL nueva permite reintentar.
        script.searchParams.set("attempt", String(++importAttempt));
        pagefindReady = import(script.href).then(async (pagefind) => {
          await pagefind.options({ baseUrl: publicRoot.pathname });
          return pagefind;
        }).catch((error) => {
          pagefindReady = null;
          throw error;
        });
      }
      return pagefindReady;
    }

    function appendResult(data, entry, state) {
      const href = new URL(entry ? entry.href : data.url, publicRoot);
      const localFile = publicRoot.protocol === "file:" && href.protocol === "file:" && href.pathname.startsWith(publicRoot.pathname);
      if ((!/^https?:$/.test(href.protocol) && !localFile) || href.origin !== publicRoot.origin) return;
      if (state.shown.has(href.pathname)) return;
      state.shown.add(href.pathname);
      const item = element("li", "search-result");
      if (entry) item.append(element("p", "search-result-context", `${entry.context} · ${entry.kind}`));
      const link = element("a", "search-result-link", entry ? entry.title : data.meta.title);
      link.href = href.href;
      item.append(link);
      if (data && data.excerpt) {
        // Pagefind añade marcas de coincidencia; el extracto se inserta solo como texto.
        const excerpt = new DOMParser().parseFromString(data.excerpt, "text/html").body.textContent;
        item.append(element("p", "search-excerpt", excerpt));
      }
      const tasks = entry ? entry.tasks.slice(0, 3) : (data.sub_results || []).filter((task) => task.url.includes("#")).slice(0, 3);
      if (tasks.length) {
        const links = element("div", "search-result-tasks");
        tasks.forEach((task) => {
          const target = new URL(task.href || task.url, publicRoot);
          if (target.origin !== publicRoot.origin) return;
          const taskLink = element("a", "", task.label || task.title);
          taskLink.href = target.href;
          links.append(taskLink);
        });
        item.append(links);
      }
      modal.querySelector("[data-search-results]").append(item);
    }

    function showError() {
      engineFailed = true;
      modal.querySelector("[data-search-status]").textContent = "No se ha podido cargar el buscador. Comprueba la conexión y vuelve a intentarlo.";
      modal.querySelector("[data-search-retry]").hidden = false;
      modal.querySelector("[data-search-more]").hidden = true;
    }

    async function appendPagefindResults(state, version) {
      const more = modal.querySelector("[data-search-more]");
      more.disabled = true;
      const before = state.shown.size;
      while (state.cursor < state.results.length && state.shown.size - before < 8) {
        const batch = state.results.slice(state.cursor, state.cursor + 12);
        const pages = await Promise.all(batch.map((result) => result.data()));
        if (!modal.open || version !== queryVersion) return;
        state.cursor += batch.length;
        pages.forEach((data) => {
          const path = pathKey(data.url);
          // Los índices siguen accesibles en Biblioteca; aquí se buscan artículos.
          if (path.endsWith("/") || path.endsWith("/index.html")) return;
          appendResult(data, catalogByPath.get(path), state);
        });
      }
      if (!modal.open || version !== queryVersion) return;
      more.disabled = false;
      more.hidden = state.cursor >= state.results.length;
      const count = state.shown.size;
      modal.querySelector("[data-search-status]").textContent = count
        ? `${count} ${count === 1 ? "resultado" : "resultados"}${more.hidden ? "" : " · hay más coincidencias"}${publicRoot.protocol === "file:" ? " · títulos y temas" : ""}`
        : "Sin resultados. Prueba con otro término o consulta la biblioteca por especialidad.";
    }

    async function runSearch() {
      const version = ++queryVersion;
      const query = modal.querySelector("input").value.trim();
      modal.querySelector("[data-search-results]").replaceChildren();
      modal.querySelector("[data-search-retry]").hidden = true;
      modal.querySelector("[data-search-more]").hidden = true;
      modal.querySelector("[data-search-status]").textContent = "Cargando buscador…";
      searchState = { shown: new Set(), results: [], cursor: 0 };
      const state = searchState;
      const matches = catalog.map((entry) => ({ entry, score: query ? catalogRelevance(entry, query) : 1 }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || (b.entry.searchPriority || 0) - (a.entry.searchPriority || 0))
        .map(({ entry }) => entry);
      const catalogResults = (entries) => entries.map((entry) => ({ data: async () => ({ url: entry.href, meta: { title: entry.title } }) }));
      if (publicRoot.protocol === "file:") {
        matches.slice(0, query ? 6 : 5).forEach((entry) => appendResult(null, entry, state));
        if (query) {
          state.results = catalogResults(matches.slice(6));
          await appendPagefindResults(state, version);
          if (!modal.open || version !== queryVersion) return;
        }
        modal.querySelector("[data-search-status]").textContent = query
          ? state.shown.size ? `${state.shown.size} resultados · búsqueda local por títulos y temas` : "Sin coincidencias por título o tema. Prueba otro término o consulta la biblioteca."
          : "Accesos directos. Búsqueda local por títulos y temas.";
        return;
      }
      try {
        if (engineFailed) {
          const previous = pagefindReady;
          pagefindReady = null;
          engineFailed = false;
          const instance = await Promise.resolve(previous).catch(() => null);
          if (instance) await instance.destroy();
          if (!modal.open || version !== queryVersion) return;
        }
        state.enginePromise = loadPagefind();
        const pagefind = await state.enginePromise;
        if (!modal.open || version !== queryVersion) return;
        if (!query) {
          matches.slice(0, 5).forEach((entry) => appendResult(null, entry, state));
          modal.querySelector("[data-search-status]").textContent = "Accesos directos. Escribe para buscar en toda la guía.";
          return;
        }
        const response = await pagefind.search(query);
        if (!modal.open || version !== queryVersion) return;
        matches.slice(0, 6).forEach((entry) => appendResult(null, entry, state));
        // Las coincidencias adicionales por alias también deben poder encontrarse.
        state.results = [
          ...catalogResults(matches.slice(6)),
          ...response.results,
        ];
        await appendPagefindResults(state, version);
      } catch (_) {
        // Un fallo tardío invalida su motor aunque el usuario ya haya cerrado o cambiado la consulta.
        if (state.enginePromise && state.enginePromise === pagefindReady) engineFailed = true;
        if (modal.open && version === queryVersion) showError();
      }
    }

    function openModal(opener = document.activeElement, query) {
      if (!modal) buildModal();
      if (modal.open) return;
      returnFocus = opener;
      if (query !== undefined) modal.querySelector("input").value = query;
      root.classList.add("search-open");
      modal.showModal();
      modal.querySelector("input").focus();
      runSearch();
    }

    function closeModal() {
      if (!modal || !modal.open) return;
      queryVersion += 1;
      clearTimeout(inputTimer);
      modal.close();
      root.classList.remove("search-open");
      // El evento close es diferido; devolver el foco aquí evita pisar la siguiente acción.
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    }

    searchOpeners.forEach((button) => button.addEventListener("click", () => openModal(button)));
    document.querySelectorAll("[data-global-search-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("[data-global-search-input]");
        openModal(input, input.value);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const active = document.activeElement;
      if (active && (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) || active.isContentEditable)) return;
      event.preventDefault();
      openModal();
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const template = document.getElementById(button.dataset.copyTarget);
      const status = button.parentElement.querySelector("[data-copy-status]");
      if (!template || !status) return;
      try {
        await navigator.clipboard.writeText(template.textContent);
        status.textContent = "Plantilla copiada.";
      } catch (_) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(template);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = "No se pudo copiar automáticamente. Texto seleccionado: usa Copiar en tu dispositivo.";
      }
    });
  });

  const article = document.querySelector("article.article");
  if (article) {
    const toolbar = document.createElement("div");
    toolbar.className = "page-tools";
    toolbar.setAttribute("data-pagefind-ignore", "");
    const outline = document.createElement("details");
    outline.className = "page-outline";
    const summary = document.createElement("summary");
    summary.textContent = "En esta página";
    const navigation = document.createElement("nav");
    navigation.setAttribute("aria-label", "Apartados de esta guía");
    const targets = new Set();
    article.querySelectorAll(".article-content h2").forEach((heading) => {
      const id = heading.id || heading.closest("section[id], article[id]")?.id;
      if (!id || targets.has(id)) return;
      targets.add(id);
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.addEventListener("click", () => {
        outline.open = false;
        if (location.hash === link.hash) requestAnimationFrame(revealHashTarget);
      });
      navigation.append(link);
    });
    outline.append(summary, navigation);
    if (targets.size) {
      toolbar.append(outline);
      // El índice HTML queda disponible sin JS; el menú persistente evita duplicarlo al cargar.
      article.querySelectorAll("details.reference-details").forEach((details) => {
        if (details.children.length === 2 && details.children[0].matches("summary") &&
            details.children[1].matches("nav.guide-toc") &&
            [...details.querySelectorAll("a")].every((link) => targets.has(link.getAttribute("href").slice(1)))) details.hidden = true;
      });
    }
    const correction = document.createElement("a");
    correction.textContent = "Sugerir una corrección";
    correction.setAttribute("data-correction-link", "");
    const issue = new URL("https://github.com/xino00/wiki-mfyc/issues/new");
    function updateCorrectionLink() {
      const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;
      issue.searchParams.set("title", `Corrección: ${article.querySelector("h1").textContent}`);
      issue.searchParams.set("body", `Página: ${canonical}${location.hash}\n\nApartado y corrección propuesta:\n\nFuente o documento de apoyo:\n`);
      correction.href = issue.href;
    }
    updateCorrectionLink();
    window.addEventListener("hashchange", updateCorrectionLink);
    toolbar.append(correction);
    const content = article.querySelector(".article-content");
    if (content) content.before(toolbar);
    document.addEventListener("click", (event) => {
      if (!outline.contains(event.target)) outline.open = false;
    });
  }

  function revealHashTarget() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const target = id && document.getElementById(id);
    if (!target) return;
    let ancestor = target;
    while (ancestor) {
      if (ancestor.tagName === "DETAILS") ancestor.open = true;
      ancestor = ancestor.parentElement;
    }
    target.scrollIntoView({ behavior: "instant", block: "start" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", revealHashTarget);
  if (location.hash) requestAnimationFrame(revealHashTarget);

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".module-rail a").forEach((link) => {
    if (link.getAttribute("href") === current) link.classList.add("is-active");
  });

  function updateCurrentNavigation() {
    const pagePath = location.pathname.replace(/\/index\.html$/, "/");
    document.querySelectorAll(".site-nav a").forEach((link) => {
      link.removeAttribute("aria-current");
      const target = new URL(link.href);
      const targetPath = target.pathname.replace(/\/index\.html$/, "/");
      if (target.hash) {
        if (targetPath === pagePath && target.hash === location.hash) link.setAttribute("aria-current", "location");
      } else if (pagePath === targetPath && !location.hash) link.setAttribute("aria-current", "page");
      else if (targetPath !== publicRoot.pathname && pagePath.startsWith(targetPath)) link.setAttribute("aria-current", "location");
    });
  }
  updateCurrentNavigation();
  window.addEventListener("hashchange", updateCurrentNavigation);
})();

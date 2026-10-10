(function () {
  "use strict";
  var D = window.PORTFOLIO;

  var UI = {
    it: {
      skip: "Vai al contenuto",
      navLabel: "Sezioni", langLabel: "Lingua",
      navProjects: "Progetti", navDegree: "Laurea", navContact: "Contatti",
      kicker: "Portfolio tecnico",
      cardTitle: "In sintesi",
      xpLabel: "Crediti di laurea",
      routeTitle: "Percorso",
      strengthsTitle: "Cosa porto in un team",
      featured: "Progetto principale",
      pipelineTitle: "Come funziona",
      expandHint: "Pipeline, risultati e analisi degli errori",
      resultsTitle: "Risultati sullo stesso set di validazione",
      accuracy: "Accuratezza", f1: "Macro F1", latency: "Latenza media", best: "Migliore",
      errorsTitle: "Dove sbaglia",
      whyTitle: "Perché conta",
      otherProjects: "Altri progetti",
      degreeTitle: "Percorso di laurea",
      doneTitle: "Esami superati, per area",
      nextTitle: "Terzo anno, da sostenere",
      contactTitle: "Contatti",
      contactAlt: "Oppure scrivimi direttamente:",
      code: "Codice", cv: "CV (PDF)", viewCode: "Vedi il codice", course: "Corso",
      credits: function (d, t, pct) { return "<strong>" + d + " crediti su " + t + "</strong> (" + pct + "%)"; },
      average: function (m) { return "Media ponderata <strong>" + m + "/100</strong>"; },
      xp: function (d, t) { return d + " / " + t + " crediti"; },
      fiberLabel: function (d, t) { return d + " crediti ECTS conseguiti su " + t; },
      remaining: "Da sostenere",
      grade: "voto", compulsory: "Obbligatorio",
      examsCount: function (n) { return n === 1 ? "1 esame" : n + " esami"; },
      exam: { progetto: "Progetto e colloquio", scritto: "Prova scritta", scrittoColloquio: "Scritto e colloquio", test: "Test a risposta multipla" },
      programLabel: "Programma",
      updated: function (d) { return "Aggiornato il " + d; },
      locale: "it-IT"
    },
    en: {
      skip: "Skip to content",
      navLabel: "Sections", langLabel: "Language",
      navProjects: "Projects", navDegree: "Degree", navContact: "Contact",
      kicker: "Technical portfolio",
      cardTitle: "At a glance",
      xpLabel: "Degree credits",
      routeTitle: "Career path",
      strengthsTitle: "What I bring to a team",
      featured: "Featured project",
      pipelineTitle: "How it works",
      expandHint: "Pipeline, results and error analysis",
      resultsTitle: "Results on the same validation set",
      accuracy: "Accuracy", f1: "Macro F1", latency: "Avg latency", best: "Best",
      errorsTitle: "Where it fails",
      whyTitle: "Why it matters",
      otherProjects: "Other projects",
      degreeTitle: "Degree",
      doneTitle: "Exams passed, by area",
      nextTitle: "Year three, still to take",
      contactTitle: "Contact",
      contactAlt: "Or reach me directly:",
      code: "Code", cv: "CV (PDF, Italian)", viewCode: "View code", course: "Course",
      credits: function (d, t, pct) { return "<strong>" + d + " of " + t + " credits</strong> (" + pct + "%)"; },
      average: function (m) { return "Weighted average <strong>" + m + "/100</strong>"; },
      xp: function (d, t) { return d + " / " + t + " credits"; },
      fiberLabel: function (d, t) { return d + " of " + t + " ECTS credits earned"; },
      remaining: "Still to take",
      grade: "grade", compulsory: "Compulsory",
      examsCount: function (n) { return n === 1 ? "1 exam" : n + " exams"; },
      exam: { progetto: "Project and interview", scritto: "Written exam", scrittoColloquio: "Written exam and interview", test: "Multiple-choice test" },
      programLabel: "Syllabus",
      updated: function (d) { return "Last updated " + d; },
      locale: "en-GB"
    }
  };

  var lang = pickLanguage();

  function pickLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "it" || fromUrl === "en") return fromUrl;
    try {
      var saved = window.localStorage.getItem("portfolio-lang");
      if (saved === "it" || saved === "en") return saved;
    } catch (e) { /* storage not available */ }
    return "it";
  }

  function t(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] != null ? value[lang] : value.it;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function num(n, digits) {
    return n.toLocaleString(UI[lang].locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  // Data values are written Italian-style ("78,9%"); English swaps the decimal comma.
  function localNumber(s) { return lang === "en" ? s.replace(",", ".") : s; }
  function parseNum(s) { return parseFloat(String(s).replace(",", ".")); }

  function $(id) { return document.getElementById(id); }

  function linkRow() {
    var c = D.contatti, u = UI[lang];
    return [
      '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>",
      '<a href="' + esc(c.linkedin) + '" rel="noopener">LinkedIn</a>',
      '<a class="btn" href="' + esc(c.cv) + '" download>' + u.cv + "</a>"
    ].join("");
  }

  function stats() {
    var done = 0, weighted = 0, byArea = {};
    D.esami.forEach(function (e) {
      done += e.ects;
      weighted += e.ects * e.voto;
      byArea[e.area] = (byArea[e.area] || 0) + e.ects;
    });
    return { done: done, avg: done ? weighted / done : 0, byArea: byArea, total: D.laurea.creditiTotali };
  }

  function render() {
    var u = UI[lang], S = stats();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-t]").forEach(function (el) {
      el.textContent = u[el.getAttribute("data-t")];
    });
    document.querySelectorAll("[data-t-aria]").forEach(function (el) {
      el.setAttribute("aria-label", u[el.getAttribute("data-t-aria")]);
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    $("ruolo").textContent = t(D.ruolo);
    $("presentazione").textContent = t(D.presentazione);
    $("link-hero").innerHTML = linkRow();
    $("link-footer").innerHTML = linkRow();

    // Stat card
    $("scheda").innerHTML = D.scheda.map(function (s) {
      return "<div><dt>" + esc(t(s)) + "</dt><dd>" + esc(t(s.valore)) + "</dd></div>";
    }).join("");
    $("xp-valore").textContent = u.xp(S.done, S.total);
    $("xp-riempimento").style.width = (S.done / S.total * 100) + "%";

    // Career route
    $("percorso").innerHTML = D.percorso.map(function (p, i) {
      var last = i === D.percorso.length - 1;
      var current = !p.futuro && (last || D.percorso[i + 1].futuro);
      var cls = "route__stop" + (p.futuro ? " is-future" : "") + (current ? " is-current" : "");
      return '<li class="' + cls + '"' + (current ? ' aria-current="step"' : "") + ">" +
        '<span class="route__node" aria-hidden="true"></span>' +
        '<span class="route__year">' + esc(p.anno) + "</span>" +
        '<span class="route__title">' + esc(t(p.titolo)) + "</span>" +
        '<span class="route__desc">' + esc(t(p)) + "</span></li>";
    }).join("");

    $("punti-forza").innerHTML = D.puntiForza.map(function (p) {
      return '<article class="tile"><h3>' + esc(t(p.titolo)) + "</h3><p>" + esc(t(p)) + "</p></article>";
    }).join("");

    // Featured project
    var P = D.progettoPrincipale;
    $("progetto-titolo").textContent = t(P.titolo);
    $("progetto-intro").textContent = t(P.intro);
    $("pipeline").innerHTML = P.passi.map(function (s, i) {
      return '<li><span class="pipeline__n" aria-hidden="true">' + (i + 1) + '</span><span class="pipeline__name">' + esc(t(s)) + '</span><span class="pipeline__det">' + esc(s.det) + "</span></li>";
    }).join("");

    $("risultati").innerHTML = P.risultati.map(function (r) {
      var acc = parseNum(r.accuratezza), f1 = parseNum(r.f1);
      return '<article class="model' + (r.migliore ? " is-best" : "") + '">' +
        '<h4>' + esc(t(r.modello)) + (r.migliore ? ' <span class="badge">' + u.best + "</span>" : "") + "</h4>" +
        meter(u.accuracy, localNumber(r.accuratezza), acc) +
        meter(u.f1, localNumber(r.f1), f1 * 100) +
        '<p class="model__latency"><span>' + u.latency + "</span><strong>" + esc(t(r.latenza)) + "</strong></p>" +
        "</article>";
    }).join("");
    $("dataset").textContent = t(P.dataset);
    $("errori").innerHTML = P.errori.map(function (e) { return "<li>" + esc(t(e)) + "</li>"; }).join("");
    $("perche").textContent = t(P.perche);
    $("progetto-link").innerHTML = '<span class="muted">' + u.code + ":</span>" + P.link.map(function (l) {
      return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(t(l)) + "</a>";
    }).join("");

    $("altri-progetti").innerHTML = D.altriProgetti.map(function (p) {
      var folder = p.cartella || "";
      var action = p.url
        ? '<a class="btn-ghost" href="' + esc(p.url) + '" rel="noopener">' + u.viewCode + ' <span aria-hidden="true">↗</span></a>'
        : "";
      return '<article class="project-row"><div class="project-row__main">' +
        (folder ? '<p class="project-row__dir" aria-hidden="true">' + esc(folder) + "/</p>" : "") +
        "<h4>" + esc(t(p.titolo)) + "</h4>" +
        "<p>" + esc(t(p.breve)) + "</p>" +
        '<ul class="topics">' + p.tech.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        '<p class="project-row__course"># ' + u.course + ": " + esc(p.corso) + "</p>" +
        "</div>" + action + "</article>";
    }).join("");

    renderDegree(u, S);

    var d = new Date(D.aggiornato + "T12:00:00");
    $("aggiornato").textContent = u.updated(d.toLocaleDateString(u.locale, { day: "numeric", month: "long", year: "numeric" }));
  }

  function meter(label, shown, pct) {
    return '<div class="meter"><div class="meter__head"><span>' + label + "</span><strong>" + esc(shown) + "</strong></div>" +
      '<div class="meter__track" aria-hidden="true"><span style="width:' + pct + '%"></span></div></div>';
  }

  function courseItem(e, u, done) {
    var area = D.aree[e.area];
    var meta = e.ects + " ECTS";
    if (done && D.mostraVoti) meta += '<span class="course__grade" aria-label="' + u.grade + " " + e.voto + '/100">' + e.voto + "</span>";
    if (!done && e.obbligatorio) meta = '<span class="tag">' + u.compulsory + "</span>" + meta;
    var body = (done ? '<p class="muted">' + esc(u.exam[e.prova] || "") + "</p>" : "") +
      (e.programma && e.programma.length ? '<ul class="topics">' + e.programma.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "");
    var head = '<span class="dot" style="background:' + (area ? area.colore : "var(--muted)") + '"></span>' +
      '<span class="course__name">' + esc(t(e.nome)) + '</span><span class="course__meta">' + meta + "</span>";
    if (!body) return '<li><div class="course__row">' + head + "</div></li>";
    return "<li><details><summary>" + head + '</summary><div class="course__body"><span class="visually-hidden">' + u.programLabel + "</span>" + body + "</div></details></li>";
  }

  function renderDegree(u, S) {
    var L = D.laurea, total = S.total;
    var pct = Math.round((S.done / total) * 1000) / 10;

    $("laurea-nome").innerHTML = esc(t(L.nome)) + '<br><span class="muted">' + esc(L.ateneo) + " · " + esc(t(L.dettaglio)) + "</span>";
    $("crediti-sintesi").innerHTML = "<span>" + u.credits(S.done, total, num(pct, pct % 1 ? 1 : 0)) + "</span>" +
      (D.mostraVoti ? "<span>" + u.average(num(S.avg, 1)) + "</span>" : "");

    var order = Object.keys(D.aree);
    var sorted = D.esami.slice().sort(function (a, b) {
      return order.indexOf(a.area) - order.indexOf(b.area) || b.voto - a.voto;
    });

    var fiber = $("fibra");
    fiber.setAttribute("aria-label", u.fiberLabel(S.done, total));
    fiber.innerHTML = sorted.map(function (e) {
      return '<span style="flex-grow:' + e.ects + ";background:" + D.aree[e.area].colore + '" title="' + esc(e.nome) + " · " + e.ects + ' ECTS"></span>';
    }).join("") + '<span class="fiber__rest" style="flex-grow:' + (total - S.done) + '" title="' + esc(u.remaining) + '"></span>';

    $("legenda").innerHTML = order.map(function (k) {
      return '<li><span class="dot" style="background:' + D.aree[k].colore + '"></span>' + esc(t(D.aree[k])) + ' <span class="muted">' + (S.byArea[k] || 0) + " ECTS</span></li>";
    }).join("") + '<li><span class="dot dot--rest"></span>' + esc(u.remaining) + ' <span class="muted">' + (total - S.done) + " ECTS</span></li>";

    $("aree").innerHTML = order.map(function (k) {
      var list = sorted.filter(function (e) { return e.area === k; });
      if (!list.length) return "";
      return '<details class="area panel"><summary class="area__head">' +
        '<span class="dot" style="background:' + D.aree[k].colore + '"></span>' +
        '<span class="area__name">' + esc(t(D.aree[k])) + "</span>" +
        '<span class="area__meta">' + u.examsCount(list.length) + " · " + (S.byArea[k] || 0) + " ECTS</span>" +
        "</summary>" +
        '<ul class="courses">' + list.map(function (e) { return courseItem(e, u, true); }).join("") + "</ul></details>";
    }).join("");

    $("da-sostenere").innerHTML = D.daSostenere.map(function (e) { return courseItem(e, u, false); }).join("");
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      try { window.localStorage.setItem("portfolio-lang", lang); } catch (e) { /* ignore */ }
      render();
    });
  });

  render();
})();

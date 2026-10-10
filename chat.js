/* Demo assistant in the contact section: matches keywords against assistente.js */
(function () {
  "use strict";
  var A = window.ASSISTENTE, D = window.PORTFOLIO;
  var root = document.getElementById("chat");
  if (!A || !root) return;

  var UI = {
    it: { placeholder: "Scrivi una domanda…", send: "Invia", typing: "sta scrivendo", you: "Tu",
          actions: { email: "Scrivimi", linkedin: "LinkedIn", cv: "Scarica il CV", progetto: "Vai al progetto", laurea: "Vai alla laurea" },
          subject: "Contatto dal portfolio", status: "Demo", locale: "it-IT" },
    en: { placeholder: "Type a question…", send: "Send", typing: "is typing", you: "You",
          actions: { email: "Email me", linkedin: "LinkedIn", cv: "Download the CV", progetto: "Go to the project", laurea: "Go to the degree" },
          subject: "Contact from your portfolio", status: "Demo", locale: "en-GB" }
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var log = root.querySelector(".chat__log");
  var chips = root.querySelector(".chat__chips");
  var form = root.querySelector(".chat__form");
  var input = root.querySelector(".chat__input");
  var busy = false;

  function lang() { return document.documentElement.lang === "en" ? "en" : "it"; }
  function t(v) { return v == null ? "" : typeof v === "string" ? v : (v[lang()] != null ? v[lang()] : v.it); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function fill(text) {
    var done = 0, weighted = 0;
    D.esami.forEach(function (e) { done += e.ects; weighted += e.ects * e.voto; });
    var avg = (weighted / done).toLocaleString(UI[lang()].locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return text.replace("{crediti}", done).replace("{totale}", D.laurea.creditiTotali).replace("{media}", avg);
  }

  function actionLink(key) {
    var u = UI[lang()], c = D.contatti;
    var map = {
      email: { href: "mailto:" + c.email + "?subject=" + encodeURIComponent(u.subject) },
      linkedin: { href: c.linkedin, ext: true },
      cv: { href: c.cv, dl: true },
      progetto: { href: "#progetti" },
      laurea: { href: "#laurea" }
    };
    var a = map[key];
    if (!a) return "";
    return '<a class="chat__action" href="' + esc(a.href) + '"' + (a.ext ? ' rel="noopener"' : "") + (a.dl ? " download" : "") + ">" + u.actions[key] + "</a>";
  }

  function addMessage(who, html, actions) {
    var li = document.createElement("li");
    li.className = "chat__msg chat__msg--" + who;
    li.innerHTML = '<div class="chat__bubble">' + html + "</div>" +
      (actions && actions.length ? '<div class="chat__actions">' + actions.map(actionLink).join("") + "</div>" : "");
    log.appendChild(li);
    log.scrollTop = log.scrollHeight;
    return li;
  }

  function words(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
  }

  function findTopic(text) {
    var ws = words(text), joined = " " + ws.join(" ") + " ", best = null, bestScore = 0;
    A.argomenti.forEach(function (arg) {
      var score = 0;
      arg.chiavi.forEach(function (k) {
        if (k.indexOf(" ") >= 0) { if (joined.indexOf(" " + k) >= 0) score += 2; }
        else if (ws.some(function (w) { return w.indexOf(k) === 0; })) score += 1;
      });
      if (score > bestScore) { bestScore = score; best = arg; }
    });
    return best;
  }

  function reply(topic) {
    busy = true;
    var typing = addMessage("bot", '<span class="chat__typing" aria-label="' + esc(t(A.nome)) + " " + UI[lang()].typing + '"><i></i><i></i><i></i></span>');
    setTimeout(function () {
      typing.remove();
      if (topic) addMessage("bot", esc(fill(t(topic.risposta))), topic.azioni);
      else addMessage("bot", esc(t(A.nonCapito)), ["email"]);
      busy = false;
    }, reduceMotion ? 0 : 650);
  }

  function ask(text, topic) {
    if (busy || !text.trim()) return;
    addMessage("user", esc(text.trim()));
    reply(topic || findTopic(text));
  }

  function reset() {
    var u = UI[lang()];
    root.querySelector(".chat__name").textContent = t(A.nome);
    root.querySelector(".chat__status").textContent = u.status;
    root.querySelector(".chat__note").textContent = t(A.nota);
    input.placeholder = u.placeholder;
    input.setAttribute("aria-label", u.placeholder);
    root.querySelector(".chat__send").setAttribute("aria-label", u.send);
    log.innerHTML = "";
    addMessage("bot", esc(t(A.benvenuto)));
    chips.innerHTML = A.argomenti.map(function (arg) {
      return '<li><button type="button" data-topic="' + arg.id + '">' + esc(t(arg.domanda)) + "</button></li>";
    }).join("");
  }

  chips.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-topic]");
    if (!b) return;
    var topic = A.argomenti.filter(function (x) { return x.id === b.getAttribute("data-topic"); })[0];
    ask(b.textContent, topic);
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
    input.value = "";
  });

  new MutationObserver(reset).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  reset();
})();

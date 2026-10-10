/*
  CONOSCENZE DELL'ASSISTENTE
  --------------------------
  Questo file contiene tutto quello che l'assistente nella sezione Contatti sa di te.
  Oggi le risposte sono preimpostate: l'assistente cerca le parole chiave nella domanda
  e risponde con il testo dell'argomento che corrisponde meglio.
  Domani questo stesso file potrà fare da base di conoscenza per un modello AI vero.

  Per aggiungere un argomento: copia un blocco, cambia "id", parole chiave, domanda
  suggerita e risposta (in italiano e inglese). Le parole chiave vanno in minuscolo.
  Nelle risposte puoi usare {crediti}, {totale}, {media}: si riempiono dai dati del portfolio.
*/

window.ASSISTENTE = {
  nome: { it: "Assistente di Simone", en: "Simone's assistant" },
  nota: {
    it: "Versione dimostrativa con risposte preimpostate. Presto con un modello AI.",
    en: "Demo version with preset answers. An AI model is coming soon."
  },
  benvenuto: {
    it: "Ciao! Sono l'assistente di Simone. Posso dirti come contattarlo, che ruoli cerca o raccontarti i suoi progetti. Cosa vuoi sapere?",
    en: "Hi! I'm Simone's assistant. I can tell you how to reach him, what roles he's looking for, or walk you through his projects. What would you like to know?"
  },
  nonCapito: {
    it: "Su questo non ho ancora una risposta. Il modo più rapido è chiederlo direttamente a Simone: s.percossi@gmail.com.",
    en: "I don't have an answer to that yet. The quickest way is to ask Simone directly: s.percossi@gmail.com."
  },

  argomenti: [
    { id: "contatti",
      chiavi: ["contatt", "email", "mail", "scriv", "telefon", "raggiung", "contact", "reach", "write", "phone"],
      domanda: { it: "Come posso contattarti?", en: "How can I reach you?" },
      risposta: {
        it: "Il modo più rapido è l'email: s.percossi@gmail.com. Lo trovi anche su LinkedIn.",
        en: "The quickest way is email: s.percossi@gmail.com. You can also find him on LinkedIn."
      },
      azioni: ["email", "linkedin"] },

    { id: "ruoli",
      chiavi: ["ruol", "cerc", "posizion", "lavoro", "interess", "role", "looking", "position", "job", "opportunit"],
      domanda: { it: "Che ruoli ti interessano?", en: "What roles interest you?" },
      risposta: {
        it: "Ruoli in cui si portano progetti AI dall'idea alla produzione: AI Program o Project Manager, AI Transformation, Technical Program Manager in ambito AI e ruoli Solutions.",
        en: "Roles that take AI projects from idea to production: AI Program or Project Manager, AI Transformation, Technical Program Manager in AI and Solutions roles."
      } },

    { id: "sede",
      chiavi: ["dove", "remot", "sede", "trasfer", "vivi", "citt", "ibrid", "where", "remote", "travel", "based", "live", "hybrid", "office"],
      domanda: { it: "Lavori da remoto?", en: "Do you work remotely?" },
      risposta: {
        it: "Simone vive in provincia di Viterbo, vicino a Roma. Lavora bene da remoto ed è disponibile a trasferte.",
        en: "Simone lives in the province of Viterbo, near Rome. He works well remotely and is happy to travel."
      } },

    { id: "esperienza",
      chiavi: ["esperien", "anni", "open fiber", "carriera", "percorso", "telco", "experience", "years", "career", "background"],
      domanda: { it: "Che esperienza hai?", en: "What's your experience?" },
      risposta: {
        it: "Nove anni in Open Fiber: è partito progettando reti FTTH e oggi è Technical Program Manager sui sistemi BSS/OSS. In mezzo, coordinamento della progettazione e Demand IT. Conosce il mondo telco dalla rete ai sistemi IT.",
        en: "Nine years at Open Fiber: he started designing FTTH networks and is now a Technical Program Manager on BSS/OSS systems, with design coordination and Demand IT in between. He knows telco from the network to the IT systems."
      },
      azioni: ["cv"] },

    { id: "progetto",
      chiavi: ["progett", "ai", "computer vision", "missingpieces", "modell", "machine learning", "project", "model", "vision"],
      domanda: { it: "Raccontami il progetto AI", en: "Tell me about the AI project" },
      risposta: {
        it: "Il progetto principale è una pipeline di computer vision che riconosce un capo d'abbigliamento da una foto fatta in casa e ne estrae il colore. Ha confrontato un approccio classico (60% di accuratezza) con una ResNet18 pre-addestrata (78,9%), analizzando dove il modello sbaglia.",
        en: "The main project is a computer vision pipeline that recognises a garment from a photo taken at home and extracts its colour. He compared a classical approach (60% accuracy) with a pretrained ResNet18 (78.9%) and analysed where the model fails."
      },
      azioni: ["progetto"] },

    { id: "laurea",
      chiavi: ["laure", "univers", "studi", "esam", "epicode", "crediti", "media", "degree", "study", "exam", "credits", "grade"],
      domanda: { it: "A che punto è la laurea?", en: "Where are you with the degree?" },
      risposta: {
        it: "Sta completando la laurea in Computer Engineering & Artificial Intelligence all'EPICODE Institute of Technology: {crediti} crediti su {totale}, media ponderata {media}/100. La laurea è prevista a luglio 2027.",
        en: "He is completing a BSc in Computer Engineering & Artificial Intelligence at EPICODE Institute of Technology: {crediti} of {totale} credits, weighted average {media}/100. Graduation is expected in July 2027."
      },
      azioni: ["laurea"] },

    { id: "lingue",
      chiavi: ["lingu", "ingles", "english", "italian", "language", "speak"],
      domanda: { it: "Che lingue parli?", en: "Which languages do you speak?" },
      risposta: {
        it: "Italiano madrelingua e inglese con certificazione B2. Si sta preparando per il C1.",
        en: "Native Italian and English with a B2 certificate. He is preparing for C1."
      } },

    { id: "cv",
      chiavi: ["cv", "curriculum", "resume", "pdf", "scaric", "download"],
      domanda: { it: "Posso avere il CV?", en: "Can I get your CV?" },
      risposta: {
        it: "Certo, ecco il CV in PDF.",
        en: "Sure, here's the CV as a PDF (in Italian)."
      },
      azioni: ["cv"] }
  ]
};

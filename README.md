# Portfolio di Simone Percossi

Pagina personale con percorso professionale, progetti e laurea. Funziona anche offline: non usa servizi esterni e i font sono nella cartella `fonts`.

## Aprirla sul PC

Doppio clic su `index.html`. Si apre nel browser, anche senza internet.

Per vederla in inglese aggiungi `?lang=en` all'indirizzo, oppure usa il pulsante IT/EN in alto.

## Aggiornare i contenuti

Tutti i testi e i dati sono in `data.js`. Non serve toccare gli altri file.

- **Nuovo esame superato:** togli il corso da `daSostenere` e aggiungilo in `esami` con crediti, voto, area e programma. Crediti completati, percentuale, barra e media si ricalcolano da soli.
- **Nascondere i voti:** imposta `mostraVoti: false`. Restano i crediti, spariscono media e voti dei singoli esami.
- **Nuovo progetto:** aggiungilo in `altriProgetti`, con titolo e testo in italiano e inglese.
- **Data di aggiornamento:** cambia `aggiornato` (formato `AAAA-MM-GG`).
- **CV:** sostituisci `cv/CV-Simone-Percossi.pdf` con la nuova versione, tenendo lo stesso nome.

## Assistente nei contatti

L'assistente in fondo alla pagina risponde usando `assistente.js`: lì trovi gli argomenti, le parole chiave, le domande suggerite e le risposte, in italiano e inglese. Oggi le risposte sono preimpostate; lo stesso file potrà fare da base di conoscenza quando l'assistente userà un modello AI.

## Pubblicarla online (per il link nel CV)

Il codice resta sul PC; GitHub Pages ne pubblica una copia gratis.

1. Crea su GitHub un repository pubblico chiamato `spercossi.github.io`.
2. Carica dentro il contenuto di questa cartella (non la cartella stessa): `index.html` deve stare nella radice del repository.
3. In **Settings → Pages**, alla voce *Source*, scegli il branch `main` e la cartella `/ (root)`.
4. Dopo un paio di minuti la pagina è su `https://spercossi.github.io`.

Per aggiornarla: modifichi i file sul PC, poi fai commit e push. Il sito si aggiorna da solo.

## Struttura

| File | Contenuto |
| --- | --- |
| `index.html` | Struttura della pagina |
| `data.js` | Tutti i testi e i dati, in italiano e inglese |
| `app.js` | Costruisce la pagina a partire da `data.js` |
| `assistente.js` | Cosa sa l'assistente dei contatti |
| `chat.js` | Funzionamento dell'assistente |
| `style.css` | Grafica |
| `fonts/` | Font Instrument Sans (licenza SIL Open Font License) |
| `cv/` | CV in PDF scaricabile dalla pagina |

export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rome Italy 2.0 [EH] | Portale Istituzionale & Cittadino</title>
  <style>
    :root {
      --bg: #06090f;
      --bg-alt: #0b101b;
      --card: #101624;
      --card-hover: #151e30;
      --accent: #e63946;
      --accent-hover: #ff4757;
      --blue: #2563eb;
      --green: #10b981;
      --gold: #f59e0b;
      --purple: #8b5cf6;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
    body { background-color: var(--bg); color: var(--text); line-height: 1.6; scroll-behavior: smooth; }
    
    .tricolore {
      height: 4px;
      background: linear-gradient(90deg, #009246 33.3%, #ffffff 33.3%, #ffffff 66.6%, #ce2b37 66.6%);
      width: 100%;
    }

    /* Barra Annunci Live Staff */
    .announcement-bar {
      background: linear-gradient(90deg, rgba(230, 57, 70, 0.2), rgba(37, 99, 235, 0.2));
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.65rem 5%;
      display: flex; align-items: center; justify-content: center; gap: 0.75rem;
      font-size: 0.88rem; text-align: center; flex-wrap: wrap;
    }
    .ann-tag {
      background: var(--accent); color: #fff; font-weight: 900; font-size: 0.72rem;
      padding: 0.2rem 0.55rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.6px;
    }

    /* Navbar */
    header {
      position: sticky; top: 0; z-index: 100;
      background: rgba(6, 9, 15, 0.94); backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
      padding: 0.95rem 5%; display: flex; justify-content: space-between; align-items: center;
    }
    .logo { font-size: 1.35rem; font-weight: 900; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.5rem; }
    .logo span { color: var(--accent); }
    nav { display: flex; align-items: center; gap: 1.15rem; }
    nav a {
      color: var(--muted); text-decoration: none;
      font-size: 0.88rem; font-weight: 600; transition: color 0.2s;
    }
    nav a:hover { color: var(--text); }
    .nav-staff {
      background: rgba(245, 158, 11, 0.15) !important; color: var(--gold) !important;
      border: 1px solid rgba(245, 158, 11, 0.35) !important;
      padding: 0.42rem 0.85rem; border-radius: 6px; font-size: 0.83rem;
    }
    .nav-btn {
      background: #5865F2; color: #fff !important;
      padding: 0.48rem 0.95rem; border-radius: 6px; font-size: 0.85rem;
    }
    .nav-btn:hover { opacity: 0.9; }

    /* Hero */
    .hero {
      padding: 4.8rem 5% 4.5rem; text-align: center;
      background: radial-gradient(circle at top center, #1a253a 0%, var(--bg) 72%);
      border-bottom: 1px solid var(--border);
    }
    .badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.4rem 1rem; border-radius: 999px;
      background: rgba(230, 57, 70, 0.14); color: #ff7582;
      font-size: 0.8rem; font-weight: 800; letter-spacing: 0.6px;
      margin-bottom: 1.2rem; border: 1px solid rgba(230, 57, 70, 0.35);
    }
    .dot { height: 8px; width: 8px; background: var(--green); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--green); }
    .hero h1 { font-size: clamp(2.1rem, 5vw, 3.7rem); font-weight: 900; max-width: 920px; margin: 0 auto 1.1rem; line-height: 1.1; }
    .hero p { color: var(--muted); max-width: 740px; margin: 0 auto 2.2rem; font-size: 1.1rem; }
    
    /* Box Codice Server & Azioni */
    .action-panel {
      display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem;
      margin-bottom: 3rem;
    }
    .btn {
      padding: 0.9rem 1.75rem; border-radius: 8px; font-weight: 700; font-size: 0.96rem;
      text-decoration: none; transition: all 0.2s; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-discord { background: #5865F2; color: #fff; box-shadow: 0 4px 20px rgba(88, 101, 242, 0.35); }
    .btn-discord:hover { background: #4752C4; }
    .btn-green { background: var(--green); color: #052e16; font-weight: 800; }
    .btn-gold { background: var(--gold); color: #1c1302; font-weight: 800; }
    .btn-purple { background: var(--purple); color: #fff; font-weight: 800; }
    
    .code-box {
      background: var(--card); border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 0.55rem 0.7rem 0.55rem 1.2rem; border-radius: 8px;
      display: inline-flex; align-items: center; gap: 1rem;
    }
    .code-label { font-size: 0.78rem; color: var(--muted); text-transform: uppercase; font-weight: 700; display: block; text-align: left; }
    .code-value { font-family: monospace; font-size: 1.2rem; font-weight: 900; color: #fff; letter-spacing: 1px; }
    .copy-btn {
      background: var(--accent); color: #fff; border: none;
      padding: 0.55rem 1rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem;
      cursor: pointer; transition: background 0.2s;
    }

    /* Barra Statistiche */
    .stats-bar {
      max-width: 1000px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;
      background: rgba(16, 22, 36, 0.8); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.3rem;
    }
    .stat h4 { font-size: 1.45rem; font-weight: 900; color: #fff; }
    .stat span { font-size: 0.83rem; color: var(--muted); font-weight: 600; }

    /* Sezioni Generali */
    section { padding: 4.5rem 5%; max-width: 1220px; margin: 0 auto; }
    .section-header { margin-bottom: 2.3rem; }
    .section-tag { color: var(--accent); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
    .section-title { font-size: 2rem; font-weight: 900; margin: 0.25rem 0 0.5rem; }
    .section-sub { color: var(--muted); max-width: 780px; font-size: 0.98rem; }

    /* Griglie & Card */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(265px, 1fr)); gap: 1.4rem; }
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.65rem; transition: all 0.2s;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .card:hover { border-color: rgba(255, 255, 255, 0.22); background: var(--card-hover); transform: translateY(-3px); }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; gap: 0.5rem; }
    .status-pill {
      font-size: 0.72rem; font-weight: 800; padding: 0.24rem 0.6rem; border-radius: 999px;
      text-transform: uppercase; white-space: nowrap;
    }
    .pill-open { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .pill-select { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .pill-free { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .pill-danger { background: rgba(230, 57, 70, 0.15); color: #ff7582; border: 1px solid rgba(230, 57, 70, 0.3); }
    .card h3 { font-size: 1.2rem; color: #fff; }
    .card p { color: var(--muted); font-size: 0.92rem; margin: 0.55rem 0 1.1rem; }
    .card-footer { font-size: 0.83rem; color: #cbd5e1; font-weight: 600; border-top: 1px solid var(--border); padding-top: 0.75rem; }

    /* TABELLONE QUOTAZIONI BORSA CITTADINA */
    .market-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 1rem;
      margin-bottom: 2rem;
    }
    .ticker-card {
      background: var(--card); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 1.25rem;
    }
    .ticker-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .ticker-code { font-family: monospace; font-weight: 800; font-size: 0.8rem; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 0.2rem 0.5rem; border-radius: 5px; }
    .ticker-trend { font-size: 0.8rem; font-weight: 800; }
    .trend-up { color: #34d399; }
    .trend-down { color: #f87171; }
    .ticker-name { font-weight: 700; font-size: 1rem; margin-bottom: 0.35rem; color: #fff; }
    .ticker-price { font-size: 1.45rem; font-weight: 900; color: #fff; }
    .ticker-yield { font-size: 0.83rem; color: #34d399; font-weight: 700; margin-top: 0.25rem; }

    /* MODULI & CALCOLATORI */
    .split-panel {
      background: linear-gradient(135deg, #0e1525 0%, #10192b 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px; padding: 2.2rem;
      display: grid; grid-template-columns: 1fr 1.15fr; gap: 2.2rem; align-items: start;
    }
    .form-box {
      background: var(--bg); border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px; padding: 1.7rem;
    }
    .form-box h3 { font-size: 1.25rem; margin-bottom: 1rem; }
    .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
    .form-group { margin-bottom: 0.95rem; }
    .form-group label { display: block; font-size: 0.82rem; color: var(--muted); font-weight: 700; margin-bottom: 0.35rem; }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; padding: 0.72rem 0.85rem; border-radius: 8px;
      background: var(--card); border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff; font-size: 0.92rem; font-weight: 600;
    }
    .form-group textarea { resize: vertical; min-height: 75px; }

    .selected-rate-banner {
      background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 0.9rem;
      display: flex; justify-content: space-between; align-items: center;
    }
    .selected-rate-banner span { font-size: 0.85rem; color: #bae6fd; font-weight: 600; }
    .selected-rate-banner strong { font-size: 1.15rem; color: #38bdf8; font-weight: 900; }

    .min-warning {
      color: #ff7582; font-size: 0.82rem; font-weight: 700; margin-top: 0.35rem; display: none;
    }

    .payout-box {
      background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 10px; padding: 1rem; margin: 0.9rem 0;
      display: flex; justify-content: space-between; align-items: center;
    }
    .payout-box span { font-size: 0.84rem; color: #a7f3d0; font-weight: 600; }
    .payout-box strong { font-size: 1.35rem; color: #34d399; font-weight: 900; }
    .cmd-preview {
      background: #04060a; border: 1px dashed rgba(255,255,255,0.22);
      padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.82rem;
      color: #38bdf8; margin-top: 0.85rem; word-break: break-all;
    }

    /* Tabs Azienda / Gang */
    .org-tabs { display: flex; gap: 0.7rem; margin-bottom: 1.2rem; }
    .org-tab {
      flex: 1; padding: 0.7rem; border-radius: 8px; font-weight: 800; font-size: 0.9rem;
      border: 1px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer;
    }
    .org-tab.active-biz { background: rgba(37, 99, 235, 0.2); border-color: var(--blue); color: #60a5fa; }
    .org-tab.active-gang { background: rgba(230, 57, 70, 0.2); border-color: var(--accent); color: #ff7582; }

    /* Regole */
    .rules-list { display: grid; gap: 0.95rem; }
    .rule-item {
      background: var(--card); border-left: 4px solid var(--accent);
      padding: 1.2rem 1.5rem; border-radius: 8px; border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .rule-item strong { display: block; margin-bottom: 0.25rem; font-size: 1.05rem; color: #fff; }
    .rule-item span { color: var(--muted); font-size: 0.93rem; }

    /* AREA STAFF PROTETTA */
    .staff-lock-box {
      background: linear-gradient(135deg, #161311 0%, #1f1914 100%);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 16px; padding: 2.5rem; text-align: center; max-width: 550px; margin: 0 auto;
    }
    .staff-lock-box h3 { font-size: 1.45rem; color: var(--gold); margin-bottom: 0.5rem; }
    .staff-lock-box p { color: var(--muted); font-size: 0.94rem; margin-bottom: 1.4rem; }
    .staff-login-row { display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; }
    .staff-login-row input {
      padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.4);
      background: #0b0e14; color: #fff; font-weight: 700; min-width: 220px; text-align: center;
    }
    .error-msg { color: #ff6b78; font-size: 0.88rem; margin-top: 0.8rem; font-weight: 700; display: none; }

    .staff-dashboard {
      display: none;
      background: #0c111d; border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 16px; padding: 2.2rem;
    }
    .staff-dash-header {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
      border-bottom: 1px solid var(--border); padding-bottom: 1.2rem; margin-bottom: 1.8rem;
    }
    .staff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 1.4rem; }
    .staff-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 1.45rem;
    }
    .staff-card h4 { color: var(--gold); margin-bottom: 0.75rem; font-size: 1.1rem; }
    
    .quote-editor-row {
      background: rgba(0,0,0,0.35); border: 1px solid var(--border); border-radius: 8px;
      padding: 0.7rem; margin-bottom: 0.65rem;
    }
    .quote-editor-title { font-weight: 700; font-size: 0.88rem; margin-bottom: 0.4rem; color: #fff; display: flex; justify-content: space-between; }
    .quote-inputs { display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.45rem; align-items: center; }
    .quote-inputs input {
      width: 100%; padding: 0.42rem 0.6rem; border-radius: 6px;
      background: #080b10; border: 1px solid rgba(255,255,255,0.18); color: #fff; font-size: 0.84rem; font-weight: 700;
    }

    .req-item {
      background: rgba(0,0,0,0.38); border: 1px solid var(--border); border-radius: 8px;
      padding: 0.95rem; margin-bottom: 0.8rem; font-size: 0.88rem;
    }
    .req-actions { display: flex; gap: 0.5rem; margin-top: 0.7rem; }
    .btn-sm { padding: 0.45rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; }
    .btn-approve { background: var(--green); color: #052e16; }
    .btn-reject { background: var(--accent); color: #fff; }

    /* Founder */
    .founder-box {
      background: linear-gradient(135deg, #101624 0%, #182136 100%);
      border: 1px solid var(--border); border-radius: 14px;
      padding: 2.2rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem;
    }
    .founder-badge {
      display: inline-block; background: rgba(245, 158, 11, 0.15); color: var(--gold);
      border: 1px solid rgba(245, 158, 11, 0.35); font-size: 0.78rem; font-weight: 800;
      padding: 0.2rem 0.6rem; border-radius: 6px; margin-bottom: 0.5rem;
    }

    /* Footer */
    footer {
      text-align: center; padding: 2.8rem 5%; border-top: 1px solid var(--border);
      color: var(--muted); font-size: 0.9rem; margin-top: 2rem; background: var(--bg-alt);
    }
    .footer-links { margin-bottom: 1rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
    .footer-links a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
    .footer-links a:hover { color: var(--accent); }

    @media (max-width: 860px) {
      nav a:not(.nav-btn):not(.nav-staff) { display: none; }
      .split-panel { grid-template-columns: 1fr; }
      .form-row-2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="tricolore"></div>

  <!-- BACHECA ANNUNCI LIVE GESTIBILE DALLO STAFF -->
  <div class="announcement-bar" id="liveAnnBar">
    <span class="ann-tag" id="liveAnnTag">COMUNICATO UFFICIALE</span>
    <span id="liveAnnText">Benvenuti su Rome Italy 2.0 [EH]! Bandi aperti per Carabinieri, Polizia di Stato, Aziende e Organizzazioni.</span>
  </div>

  <header>
    <div class="logo">ROME ITALY <span>2.0 [EH]</span></div>
    <nav>
      <a href="#quartieri">La Città</a>
      <a href="#fazioni">Fazioni</a>
      <a href="#investimenti">Borsa & Investimenti</a>
      <a href="#organizzazioni">Aziende & Gang</a>
      <a href="#regolamento">Regolamento</a>
      <a href="#area-staff" class="nav-staff">Area Staff</a>
      <a href="https://discord.gg/BdAQwqss4K" target="_blank" class="nav-btn discord-link-target">Discord</a>
    </nav>
  </header>

  <div class="hero">
    <div class="badge"><span class="dot"></span> SERVER PRIVATO ATTIVO • EMERGENCY HAMBURG ITALIANO</div>
    <h1>Il Più Realistico Server Roleplay Italiano su Emergency Hamburg</h1>
    <p>Un ecosistema completo dove ogni azione conta su <strong>Roblox</strong> e su <strong>Discord</strong>: pattugliamenti istituzionali, Borsa cittadina con quotazioni reali, fondazione di aziende o organizzazioni criminali e trasferimenti automatici tramite Bot.</p>
    
    <div class="action-panel">
      <a href="https://discord.gg/BdAQwqss4K" target="_blank" class="btn btn-discord discord-link-target">
        Entra nel Discord Ufficiale
      </a>
      <div class="code-box">
        <div>
          <span class="code-label">Codice Server Roblox</span>
          <span class="code-value" id="serverCode">ijisma95</span>
        </div>
        <button class="copy-btn" id="copyBtn" onclick="copyCode()">Copia Codice</button>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat">
        <h4 id="statCode">ijisma95</h4>
        <span>Codice Privato EH</span>
      </div>
      <div class="stat">
        <h4>Minimo 10.000 €</h4>
        <span>Investimenti & Resa Auto</span>
      </div>
      <div class="stat">
        <h4>Discord + Roblox</h4>
        <span>Aziende, Gang & Conti</span>
      </div>
      <div class="stat">
        <h4>Online 24/7</h4>
        <span>Pattuglie & Eventi Giornalieri</span>
      </div>
    </div>
  </div>

  <!-- QUARTIERI & MAPPA OPERATIVA -->
  <section id="quartieri">
    <div class="section-header">
      <span class="section-tag">Territorio & Lore</span>
      <h2 class="section-title">Zone Operative della Città</h2>
      <p class="section-sub">Conosci le aree principali in cui si svolgono i pattugliamenti, gli affari commerciali e le operazioni tattiche.</p>
    </div>
    <div class="grid">
      <div class="card">
        <div>
          <div class="card-top">
            <h3>Centro Direzionale EUR</h3>
            <span class="status-pill pill-open">Alta Sicurezza</span>
          </div>
          <p>Cuore finanziario e istituzionale. Sede delle banche, degli uffici aziendali e dei posti di controllo principali delle Forze dell'Ordine.</p>
        </div>
        <div class="card-footer">Pattugliamento: Costante (Carabinieri & Polizia)</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Quartiere Mostacciano</h3>
            <span class="status-pill pill-free">Zona Residenziale</span>
          </div>
          <p>Area residenziale e commerciale molto frequentata dai cittadini, ideale per aprire attività locali e punti di ritrovo.</p>
        </div>
        <div class="card-footer">Attività: Commercio & Vita Cittadina</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Area Industriale & Porto</h3>
            <span class="status-pill pill-danger">Zona Calda</span>
          </div>
          <p>Snodo logistico per i trasporti merci ma anche punto sensibile per traffici illeciti, corse clandestine e interventi dei reparti speciali.</p>
        </div>
        <div class="card-footer">Rischio: Elevato (Intervento NOCS / GIS)</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Comando Centrale & Tribunale</h3>
            <span class="status-pill pill-select">Zona Istituzionale</span>
          </div>
          <p>Quartier generale delle forze di polizia, centrale operativa radio, gestione fermi, interrogatori e scorte ufficiali.</p>
        </div>
        <div class="card-footer">Accesso: Riservato al Personale Autorizzato</div>
      </div>
    </div>
  </section>

  <!-- FAZIONI -->
  <section id="fazioni">
    <div class="section-header">
      <span class="section-tag">Carriere Istituzionali</span>
      <h2 class="section-title">Fazioni & Reparti Operativi</h2>
      <p class="section-sub">Scegli il tuo percorso: difendi lo Stato in divisa con stipendio automatico oppure costruisci il tuo impero economico.</p>
    </div>
    <div class="grid">
      <div class="card">
        <div>
          <div class="card-top">
            <h3>Arma dei Carabinieri</h3>
            <span class="status-pill pill-open">Bandi Aperti</span>
          </div>
          <p>Controllo costante del territorio, posti di blocco strategici, pattugliamento urbano e interventi rapidi su tutto il perimetro cittadino.</p>
        </div>
        <div class="card-footer">Stipendio: Automatico su Turno Bot</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Polizia di Stato</h3>
            <span class="status-pill pill-open">Bandi Aperti</span>
          </div>
          <p>Squadra Volante, inseguimenti ad alta velocità, prevenzione crimini e supporto coordinato alle operazioni stradali.</p>
        </div>
        <div class="card-footer">Stipendio: Automatico su Turno Bot</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Reparti Speciali (NOCS / GIS)</h3>
            <span class="status-pill pill-select">Su Selezione</span>
          </div>
          <p>Unità tattiche d'élite per situazioni ad alto rischio, liberazione ostaggi, irruzioni coordinate e scorte istituzionali.</p>
        </div>
        <div class="card-footer">Stipendio: Indennità Operativa Extra</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Civili, Imprenditori & Clan</h3>
            <span class="status-pill pill-free">Accesso Libero</span>
          </div>
          <p>Investi in Borsa (minimo 10.000 €), fonda una tua azienda registrata oppure crea un'organizzazione criminale rispettando il regolamento RP.</p>
        </div>
        <div class="card-footer">Economia: Borsa, Aziende & Conti Bot</div>
      </div>
    </div>
  </section>

  <!-- SEZIONE BORSA & INVESTIMENTI COLLEGATI AL BOT -->
  <section id="investimenti">
    <div class="section-header">
      <span class="section-tag">Borsa & Sistema Bancario Automatizzato (Discord + Roblox + Bot)</span>
      <h2 class="section-title">Mercati, Quotazioni & Investimenti Bot</h2>
      <p class="section-sub">Inserisci Nome Discord e Roblox, scegli un titolo tra quelli disponibili, visualizza la percentuale settimanale e imposta il tuo investimento (minimo <strong>10.000 €</strong>): il sito calcola subito quanto ti arriverà ogni settimana sul conto appena accettato.</p>
    </div>

    <div class="market-grid" id="marketTickerGrid"></div>

    <div class="split-panel">
      <div>
        <span class="status-pill pill-open" style="margin-bottom:0.8rem; display:inline-block;">● CALCOLO AUTOMATICO SETTIMANALE BOT</span>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.7rem;">Come funziona l'investimento (Minimo 10.000 €)</h3>
        <p style="color: var(--muted); font-size: 0.95rem; margin-bottom: 1.2rem;">Scegli il titolo, guarda subito la sua percentuale settimanale e inserisci quanto vuoi investire (minimo <strong>10.000 €</strong>). Appena lo Staff accetta la richiesta, il Bot ti trasferisce automaticamente ogni settimana l'importo calcolato sul conto.</p>
        <div class="rules-list">
          <div class="rule-item" style="border-left-color: var(--green);">
            <strong>1. Nome Discord, Roblox & Scelta Titolo</strong>
            <span>Inserisci i tuoi dati ufficiali e scegli il titolo d'investimento: vedrai subito la percentuale settimanale assegnata.</span>
          </div>
          <div class="rule-item" style="border-left-color: var(--green);">
            <strong>2. Importo Minimo 10.000 € (10k)</strong>
            <span>Inserisci quanto vuoi investire (almeno 10.000 €): il sistema calcola in tempo reale quanto ti spetta ogni settimana.</span>
          </div>
          <div class="rule-item" style="border-left-color: var(--green);">
            <strong>3. Trasferimento Settimanale sul Conto</strong>
            <span>Una volta accettato dallo Staff, il Bot invia automaticamente ogni settimana la somma calcolata sul tuo conto.</span>
          </div>
        </div>
      </div>

      <div class="form-box">
        <h3>Simulatore & Richiesta Investimento (Min. 10.000 €)</h3>
        <div class="form-row-2">
          <div class="form-group">
            <label>Nome Discord Ufficiale *</label>
            <input type="text" id="invDiscord" placeholder="es. pietro_official" oninput="updateInvest()" />
          </div>
          <div class="form-group">
            <label>Username Roblox Ufficiale *</label>
            <input type="text" id="invRoblox" placeholder="es. arditoattila" oninput="updateInvest()" />
          </div>
        </div>

        <div class="form-group">
          <label>Titolo dell'Investimento (Scelta tra quelli disponibili) *</label>
          <select id="invAssetSelect" onchange="updateInvest()"></select>
        </div>

        <div class="selected-rate-banner">
          <span>Percentuale del titolo scelto:</span>
          <strong id="selectedRateDisplay">+14% a settimana</strong>
        </div>

        <div class="form-group">
          <label>Quanto vuoi investire? (Minimo 10.000 €) *</label>
          <input type="number" id="invAmount" value="10000" min="10000" step="500" oninput="updateInvest()" />
          <div class="min-warning" id="minInvestWarning">⚠ L'investimento minimo è di 10.000 €! Inserisci almeno 10.000 €.</div>
        </div>

        <div class="payout-box">
          <div>
            <span>Ti arriva ogni settimana sul conto (Bot):</span>
            <div style="font-size: 0.78rem; color: var(--muted);">Calcolo automatico appena accettato</div>
          </div>
          <strong id="weeklyReturn">+1.400 € / sett.</strong>
        </div>

        <button class="btn btn-green" style="width: 100%; justify-content: center;" onclick="submitInvestment()">
          Invia Richiesta & Copia Comando Bot
        </button>

        <div class="cmd-preview" id="botCmdPreview"></div>
        <p id="invConfirmMsg" style="font-size: 0.83rem; color: #34d399; margin-top: 0.6rem; display: none; font-weight: 700;">
          ✓ Richiesta inviata allo Staff e comando copiato! Se accettata, riceverai ogni settimana l'importo calcolato sul conto dal Bot.
        </p>
      </div>
    </div>
  </section>

  <!-- SEZIONE CREA AZIENDA O GANG / MAFIA (COMPLETA DISCORD + ROBLOX + BOT) -->
  <section id="organizzazioni">
    <div class="section-header">
      <span class="section-tag">Imprenditoria & Malavita • Pacchetto Completo Discord + Roblox + Bot</span>
      <h2 class="section-title">Fonda un'Azienda o un'Organizzazione (Gang / Mafia)</h2>
      <p class="section-sub">Ogni azienda o gang/mafia registrata include sia il ruolo/struttura su <strong>Discord</strong> (canali, gradi, conto aziendale/clan sul Bot) sia l'attività operativa su <strong>Roblox (Emergency Hamburg)</strong>.</p>
    </div>

    <div class="split-panel">
      <div>
        <div class="grid" style="grid-template-columns: 1fr; gap: 1rem;">
          <div class="card" style="border-left: 4px solid var(--blue);">
            <div>
              <div class="card-top">
                <h3>Azienda Completa (Discord + Roblox + Bot)</h3>
                <span class="status-pill pill-free">Conto & Ruoli Discord</span>
              </div>
              <p>Apri Concessionaria, Officina, Sicurezza Privata, Trasporti o Locale. Ricevi <strong>ruoli dedicati su Discord</strong>, <strong>canali riservati</strong>, <strong>conto aziendale gestito dal Bot</strong> per stipendi/incassi e attività RP in città su Roblox.</p>
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--accent);">
            <div>
              <div class="card-top">
                <h3>Gang / Mafia Completa (Discord + Roblox + Bot)</h3>
                <span class="status-pill pill-danger">Territorio, Clan & Bot</span>
              </div>
              <p>Fonda la tua Famiglia, Clan o Organizzazione Criminale. Ottieni <strong>struttura gerarchica su Discord</strong>, <strong>canali privati del clan</strong>, <strong>cassa/conto sul Bot</strong> e zona operativa in città su Roblox rispettando il regolamento.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="form-box">
        <div class="org-tabs">
          <button class="org-tab active-biz" id="tabBiz" onclick="switchOrgType('AZIENDA')">Registra Azienda</button>
          <button class="org-tab" id="tabGang" onclick="switchOrgType('GANG / MAFIA')">Fonda Gang / Mafia</button>
        </div>

        <h3 id="orgFormTitle">Modulo Apertura Azienda (Discord + Roblox + Bot)</h3>

        <div class="form-row-2">
          <div class="form-group">
            <label>Nome Discord Ufficiale (Capo) *</label>
            <input type="text" id="orgDiscord" placeholder="es. marco_rp" oninput="updateOrgCmd()" />
          </div>
          <div class="form-group">
            <label>Username Roblox Ufficiale *</label>
            <input type="text" id="orgRoblox" placeholder="es. MarcoITA_99" oninput="updateOrgCmd()" />
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label id="orgNameLabel">Nome dell'Azienda *</label>
            <input type="text" id="orgName" placeholder="es. Roma Luxury Motors" oninput="updateOrgCmd()" />
          </div>
          <div class="form-group">
            <label id="orgSectorLabel">Settore / Zona su Roblox *</label>
            <input type="text" id="orgSector" placeholder="es. Concessionaria - EUR" oninput="updateOrgCmd()" />
          </div>
        </div>

        <div class="form-group">
          <label id="orgDiscordSetupLabel">Setup Discord & Bot (Ruoli, Canali, Conto Aziendale) *</label>
          <input type="text" id="orgDiscordSetup" placeholder="es. Ruoli CEO/Dipendenti, canali privati, conto aziendale Bot" oninput="updateOrgCmd()" />
        </div>

        <div class="form-group">
          <label>Attività su Roblox, Numero Membri & Descrizione *</label>
          <textarea id="orgDesc" placeholder="Descrivi membri, attività in città su Roblox, gestione su Discord e obiettivi..." oninput="updateOrgCmd()"></textarea>
        </div>

        <button class="btn btn-discord" id="orgSubmitBtn" style="width: 100%; justify-content: center;" onclick="submitOrganization()">
          Invia Richiesta Completa & Copia Comando Bot
        </button>

        <div class="cmd-preview" id="orgCmdPreview"></div>
        <p id="orgConfirmMsg" style="font-size: 0.83rem; color: #34d399; margin-top: 0.6rem; display: none; font-weight: 700;">
          ✓ Richiesta completa (Discord + Roblox + Bot) inviata all'Area Staff e comando copiato!
        </p>
      </div>
    </div>
  </section>

  <!-- REGOLAMENTO -->
  <section id="regolamento">
    <div class="section-header">
      <span class="section-tag">Norme della Community</span>
      <h2 class="section-title">Regolamento Fondamentale del Server</h2>
      <p class="section-sub">Il rispetto di queste regole garantisce un'esperienza seria e coinvolgente per tutti i giocatori.</p>
    </div>
    <div class="rules-list">
      <div class="rule-item">
        <strong>1. Realismo & Serietà (No FailRP)</strong>
        <span>Comportati in gioco come faresti nella vita reale. Non compiere azioni assurde, non ignorare gli incidenti gravi e simula sempre le conseguenze.</span>
      </div>
      <div class="rule-item">
        <strong>2. Divieto di RDM e VDM</strong>
        <span>È severamente vietato uccidere o investire altri giocatori senza una valida motivazione Roleplay ben costruita in precedenza.</span>
      </div>
      <div class="rule-item">
        <strong>3. Regole Aziende, Gang & Mafie (Discord + Roblox)</strong>
        <span>Ogni organizzazione deve essere registrata con dati Discord e Roblox reali e approvata dallo Staff. Vietato fare guerre tra clan senza motivi RP validi.</span>
      </div>
      <div class="rule-item">
        <strong>4. Investimenti (Minimo 10.000 €) & Bot</strong>
        <span>L'investimento minimo è di 10.000 €. Le rendite settimanali automatiche del Bot vengono attivate solo su investimenti accettati dallo Staff.</span>
      </div>
      <div class="rule-item">
        <strong>5. Rispetto verso Staff e Giocatori</strong>
        <span>Nessun insulto fuori dal contesto RP, niente spam, niente uso di cheat. Le decisioni dello Staff vanno sempre rispettate.</span>
      </div>
    </div>
  </section>

  <!-- AREA STAFF PROTETTA DA PASSWORD -->
  <section id="area-staff">
    <div class="section-header">
      <span class="section-tag" style="color: var(--gold);">Accesso Riservato</span>
      <h2 class="section-title">Area Gestione Staff</h2>
      <p class="section-sub">Pannello di controllo per Amministratori e Moderatori: pubblica annunci, modifica i codici Roblox/Discord, aggiorna le quotazioni di Borsa e approva investimenti, aziende e gang.</p>
    </div>

    <div class="staff-lock-box" id="staffLockBox">
      <h3>Area Protetta da Password</h3>
      <p>Inserisci la password di servizio per sbloccare tutti gli strumenti di gestione del server.</p>
      <div class="staff-login-row">
        <input type="password" id="staffPassInput" placeholder="Password Staff..." onkeypress="if(event.key==='Enter') checkStaffPass()" />
        <button class="btn btn-gold" onclick="checkStaffPass()">Sblocca Pannello</button>
      </div>
      <div class="error-msg" id="staffError">Password errata. Accesso negato.</div>
    </div>

    <div class="staff-dashboard" id="staffDashboard">
      <div class="staff-dash-header">
        <div>
          <span class="founder-badge" style="margin-bottom: 0.2rem;">ACCESSO AUTORIZZATO</span>
          <h3 style="font-size: 1.4rem;">Centrale Operativa Staff — Rome Italy 2.0 [EH]</h3>
        </div>
        <button class="btn-sm btn-reject" onclick="lockStaff()">Blocca & Esci</button>
      </div>

      <div class="staff-grid">
        <!-- 1. Gestione Annunci & Codici Server -->
        <div class="staff-card">
          <h4>Annunci Live & Codici Server (Game / Discord)</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Aggiorna l'annuncio in cima al sito oppure cambia il codice privato Roblox e il link Discord:</p>
          
          <div class="form-group">
            <label>Etichetta Annuncio</label>
            <input type="text" id="staffAnnTagInput" value="COMUNICATO UFFICIALE" />
          </div>
          <div class="form-group">
            <label>Testo Annuncio in Cima al Sito</label>
            <input type="text" id="staffAnnTextInput" value="Benvenuti su Rome Italy 2.0 [EH]! Bandi aperti per Carabinieri, Polizia di Stato, Aziende e Organizzazioni." />
          </div>
          <div class="form-row-2">
            <div class="form-group">
              <label>Codice Server Roblox</label>
              <input type="text" id="staffGameCodeInput" value="ijisma95" />
            </div>
            <div class="form-group">
              <label>Link Invito Discord</label>
              <input type="text" id="staffDiscordInput" value="https://discord.gg/BdAQwqss4K" />
            </div>
          </div>
          <button class="btn-sm btn-approve" style="width: 100%; padding: 0.65rem;" onclick="saveSiteSettings()">
            Pubblica Annuncio & Aggiorna Codici
          </button>
          <p id="settingsSavedMsg" style="font-size: 0.82rem; color: #34d399; margin-top: 0.5rem; display: none; font-weight: 700;">
            ✓ Annuncio e codici aggiornati su tutto il sito!
          </p>
        </div>

        <!-- 2. Modifica Quotazioni di Borsa -->
        <div class="staff-card">
          <h4>Modifica Quotazioni & Percentuali Borsa</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Modifica il prezzo (€) e la percentuale settimanale (%) dei titoli disponibili:</p>
          <div id="staffQuotesEditor"></div>
          <button class="btn-sm btn-approve" style="width: 100%; padding: 0.65rem; margin-top: 0.5rem;" onclick="saveMarketChanges()">
            Salva & Aggiorna Titoli Borsa
          </button>
          <p id="marketSavedMsg" style="font-size: 0.82rem; color: #34d399; margin-top: 0.5rem; display: none; font-weight: 700;">
            ✓ Titoli e percentuali aggiornati!
          </p>
        </div>

        <!-- 3. Approvazione Investimenti Bot -->
        <div class="staff-card">
          <h4>Accetta Investimenti & Accrediti Settimanali Bot</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Appena accetti, il Bot invia automaticamente ogni settimana la somma calcolata sul conto:</p>
          <div id="pendingInvestmentsList">
            <div class="req-item" id="sampleReq1">
              <strong>Discord: @Alex_Roma | Roblox: AlexITA09</strong>
              <div style="font-size: 0.83rem; color: #cbd5e1; margin-top:0.2rem;">Titolo: Immobiliare EUR & Centro (+14%) • Investito: 20.000 €</div>
              <div style="font-size: 0.83rem; color: #34d399;">Arriva ogni settimana sul conto: +2.800 € / sett.</div>
              <div class="req-actions">
                <button class="btn-sm btn-approve" onclick="approveReq('sampleReq1', '@Alex_Roma (AlexITA09)', 2800)">Accetta & Attiva Bot</button>
                <button class="btn-sm btn-reject" onclick="rejectReq('sampleReq1')">Rifiuta</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Approvazione Aziende & Gang/Mafie -->
        <div class="staff-card">
          <h4>Richieste Aziende & Gang / Mafie (Discord + Roblox + Bot)</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Gestisci le registrazioni complete inviate dai giocatori:</p>
          <div id="pendingOrgsList">
            <div class="req-item" id="sampleOrg1">
              <span class="status-pill pill-free" style="margin-bottom:0.3rem; display:inline-block;">AZIENDA</span>
              <div><strong>Roma Luxury Motors</strong> (Settore: EUR)</div>
              <div style="font-size: 0.82rem; color: #cbd5e1;">Discord: @Luca_Boss | Roblox: LucaGamer_RM</div>
              <div style="font-size: 0.82rem; color: #38bdf8;">Setup Discord/Bot: Ruoli Staff/Venditori, categoria privata, conto aziendale Bot</div>
              <div style="font-size: 0.8rem; color: var(--muted); margin-top:0.2rem;">Concessionaria auto sportive su Roblox con 5 membri.</div>
              <div class="req-actions">
                <button class="btn-sm btn-approve" onclick="approveOrg('sampleOrg1', 'Roma Luxury Motors', '@Luca_Boss')">Approva Pacchetto Completo</button>
                <button class="btn-sm btn-reject" onclick="rejectReq('sampleOrg1')">Rifiuta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOUNDER -->
  <section id="staff">
    <div class="section-header">
      <span class="section-tag">Gestione Ufficiale</span>
      <h2 class="section-title">Direzione & Fondazione</h2>
    </div>
    <div class="founder-box">
      <div class="founder-info">
        <span class="founder-badge">FOUNDER & DIRETTORE GENERALE</span>
        <h3>Pietro — Fondatore Rome Italy 2.0 [EH]</h3>
        <p>Ideatore del progetto, responsabile del coordinamento generale delle fazioni istituzionali, del sistema economico automatizzato e della gestione della community.</p>
      </div>
      <a href="https://discord.gg/BdAQwqss4K" target="_blank" class="btn btn-discord discord-link-target">Unisciti alla Community</a>
    </div>
  </section>

  <footer>
    <div class="footer-links">
      <a href="#quartieri">La Città</a>
      <a href="#fazioni">Fazioni</a>
      <a href="#investimenti">Borsa & Investimenti</a>
      <a href="#organizzazioni">Aziende & Gang</a>
      <a href="#regolamento">Regolamento</a>
      <a href="#area-staff">Area Staff</a>
    </div>
    <p>&copy; 2026 Rome Italy 2.0 [EH] — Fondato da Pietro. Tutti i diritti riservati.</p>
    <p style="font-size: 0.8rem; margin-top: 0.4rem; opacity: 0.7;">Codice Server Roblox: <span id="footerGameCode">ijisma95</span> • Non affiliato ufficialmente a Roblox Corporation.</p>
  </footer>

  <script>
    const MIN_INVESTMENT = 10000;

    // Impostazioni Sito (Annunci & Codici)
    const defaultSettings = {
      annTag: 'COMUNICATO UFFICIALE',
      annText: 'Benvenuti su Rome Italy 2.0 [EH]! Bandi aperti per Carabinieri, Polizia di Stato, Aziende e Organizzazioni.',
      gameCode: 'ijisma95',
      discordUrl: 'https://discord.gg/BdAQwqss4K'
    };
    let siteSettings = JSON.parse(localStorage.getItem('rome_italy_settings')) || defaultSettings;

    function applySiteSettings() {
      document.getElementById('liveAnnTag').innerText = siteSettings.annTag;
      document.getElementById('liveAnnText').innerText = siteSettings.annText;
      document.getElementById('serverCode').innerText = siteSettings.gameCode;
      document.getElementById('statCode').innerText = siteSettings.gameCode;
      document.getElementById('footerGameCode').innerText = siteSettings.gameCode;

      document.getElementById('staffAnnTagInput').value = siteSettings.annTag;
      document.getElementById('staffAnnTextInput').value = siteSettings.annText;
      document.getElementById('staffGameCodeInput').value = siteSettings.gameCode;
      document.getElementById('staffDiscordInput').value = siteSettings.discordUrl;

      document.querySelectorAll('.discord-link-target').forEach(el => {
        el.href = siteSettings.discordUrl;
      });
    }

    function saveSiteSettings() {
      siteSettings.annTag = document.getElementById('staffAnnTagInput').value.trim() || 'AVVISO';
      siteSettings.annText = document.getElementById('staffAnnTextInput').value.trim() || 'Server Attivo!';
      siteSettings.gameCode = document.getElementById('staffGameCodeInput').value.trim() || 'ijisma95';
      siteSettings.discordUrl = document.getElementById('staffDiscordInput').value.trim() || 'https://discord.gg/BdAQwqss4K';

      localStorage.setItem('rome_italy_settings', JSON.stringify(siteSettings));
      applySiteSettings();
      const msg = document.getElementById('settingsSavedMsg');
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }

    // Titoli d'investimento disponibili con percentuale settimanale
    const defaultAssets = [
      { id: 'BTP-RM', name: 'Titoli di Stato Roma', price: 100, rate: 8, trend: '+1.2%', up: true },
      { id: 'EUR-IMM', name: 'Immobiliare EUR & Centro', price: 250, rate: 14, trend: '+3.8%', up: true },
      { id: 'LOG-EH', name: 'Logistica & Trasporti', price: 180, rate: 12, trend: '-0.9%', up: false },
      { id: 'TECH-IT', name: 'Aziende Tech & Sicurezza', price: 420, rate: 20, trend: '+5.4%', up: true },
      { id: 'ORO-RES', name: 'Lingotti Oro & Riserve', price: 650, rate: 16, trend: '+2.1%', up: true }
    ];
    let assets = JSON.parse(localStorage.getItem('rome_italy_assets')) || defaultAssets;

    function renderMarket() {
      const grid = document.getElementById('marketTickerGrid');
      const select = document.getElementById('invAssetSelect');
      const staffEditor = document.getElementById('staffQuotesEditor');
      const currentSelected = select.value;

      grid.innerHTML = '';
      select.innerHTML = '';
      staffEditor.innerHTML = '';

      assets.forEach((item, index) => {
        const trendClass = item.up ? 'trend-up' : 'trend-down';
        grid.innerHTML += \`
          <div class="ticker-card">
            <div class="ticker-head">
              <span class="ticker-code">\${item.id}</span>
              <span class="ticker-trend \${trendClass}">\${item.trend}</span>
            </div>
            <div class="ticker-name">\${item.name}</div>
            <div class="ticker-price">\${item.price.toLocaleString('it-IT')} € <span style="font-size:0.75rem; color:var(--muted); font-weight:600;">/ quota</span></div>
            <div class="ticker-yield">Percentuale Bot: +\${item.rate}% / sett.</div>
          </div>
        \`;

        const opt = document.createElement('option');
        opt.value = index;
        opt.text = \`\${item.name} (\${item.id}) — +\${item.rate}% a settimana\`;
        select.appendChild(opt);

        staffEditor.innerHTML += \`
          <div class="quote-editor-row">
            <div class="quote-editor-title">
              <span>\${item.name} (\${item.id})</span>
              <span style="color:#38bdf8; font-size:0.8rem;">Quota € / Resa %</span>
            </div>
            <div class="quote-inputs">
              <input type="number" id="edit_price_\${index}" value="\${item.price}" min="1" />
              <input type="number" id="edit_rate_\${index}" value="\${item.rate}" min="1" max="100" />
              <span style="font-size:0.8rem; color:var(--muted);">€ / %</span>
            </div>
          </div>
        \`;
      });

      if (currentSelected !== '' && select.options[currentSelected]) {
        select.value = currentSelected;
      }
      updateInvest();
    }

    function saveMarketChanges() {
      assets.forEach((item, index) => {
        const newPrice = parseFloat(document.getElementById('edit_price_' + index).value) || item.price;
        const newRate = parseFloat(document.getElementById('edit_rate_' + index).value) || item.rate;
        if (newPrice > item.price) {
          item.trend = '+' + (((newPrice - item.price) / item.price) * 100).toFixed(1) + '%';
          item.up = true;
        } else if (newPrice < item.price) {
          item.trend = '-' + (((item.price - newPrice) / item.price) * 100).toFixed(1) + '%';
          item.up = false;
        }
        item.price = newPrice;
        item.rate = newRate;
      });
      localStorage.setItem('rome_italy_assets', JSON.stringify(assets));
      renderMarket();
      const msg = document.getElementById('marketSavedMsg');
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 3000);
    }

    function updateInvest() {
      const discord = document.getElementById('invDiscord').value.trim() || 'NomeDiscord';
      const roblox = document.getElementById('invRoblox').value.trim() || 'NomeRoblox';
      const idx = document.getElementById('invAssetSelect').value || 0;
      const asset = assets[idx];
      const amount = parseFloat(document.getElementById('invAmount').value) || 0;
      const warnEl = document.getElementById('minInvestWarning');

      document.getElementById('selectedRateDisplay').innerText = \`+\${asset.rate}% a settimana\`;

      if (amount < MIN_INVESTMENT) {
        warnEl.style.display = 'block';
        document.getElementById('weeklyReturn').innerText = 'Min. 10.000 €';
        document.getElementById('botCmdPreview').innerText = 'Inserisci almeno 10.000 € per calcolare la rendita settimanale.';
        return;
      } else {
        warnEl.style.display = 'none';
      }

      const weekly = Math.round(amount * (asset.rate / 100));
      document.getElementById('weeklyReturn').innerText = '+' + weekly.toLocaleString('it-IT') + ' € / sett.';
      document.getElementById('botCmdPreview').innerText = \`/investimento richiedi discord:@\${discord} roblox:\${roblox} titolo:\${asset.id} perc:\${asset.rate}% importo:\${amount} settimanale:\${weekly}\`;
    }

    function submitInvestment() {
      const discord = document.getElementById('invDiscord').value.trim();
      const roblox = document.getElementById('invRoblox').value.trim();
      const idx = document.getElementById('invAssetSelect').value || 0;
      const asset = assets[idx];
      const amount = parseFloat(document.getElementById('invAmount').value) || 0;

      if (!discord || !roblox) {
        alert('Inserisci obbligatoriamente il tuo Nome Discord Ufficiale e il tuo Username Roblox!');
        return;
      }
      if (amount < MIN_INVESTMENT) {
        alert("L'importo minimo per investire è di 10.000 €!");
        return;
      }

      const weekly = Math.round(amount * (asset.rate / 100));
      const cmd = document.getElementById('botCmdPreview').innerText;

      navigator.clipboard.writeText(cmd);
      document.getElementById('invConfirmMsg').style.display = 'block';

      const list = document.getElementById('pendingInvestmentsList');
      const reqId = 'req_' + Date.now();
      const item = document.createElement('div');
      item.className = 'req-item';
      item.id = reqId;
      item.innerHTML = \`
        <strong>Discord: @\${discord} | Roblox: \${roblox}</strong>
        <div style="font-size: 0.83rem; color: #cbd5e1; margin-top:0.2rem;">Titolo: \${asset.name} (+\${asset.rate}%) • Investito: \${amount.toLocaleString('it-IT')} €</div>
        <div style="font-size: 0.83rem; color: #34d399;">Arriva ogni settimana sul conto: +\${weekly.toLocaleString('it-IT')} € / sett.</div>
        <div class="req-actions">
          <button class="btn-sm btn-approve" onclick="approveReq('\${reqId}', '@\${discord} (\${roblox})', \${weekly})">Accetta & Attiva Bot</button>
          <button class="btn-sm btn-reject" onclick="rejectReq('\${reqId}')">Rifiuta</button>
        </div>
      \`;
      list.prepend(item);
    }

    // Gestione Aziende & Gang/Mafia (Discord + Roblox + Bot)
    let currentOrgType = 'AZIENDA';

    function switchOrgType(type) {
      currentOrgType = type;
      const tabBiz = document.getElementById('tabBiz');
      const tabGang = document.getElementById('tabGang');
      const title = document.getElementById('orgFormTitle');
      const nameLabel = document.getElementById('orgNameLabel');
      const sectorLabel = document.getElementById('orgSectorLabel');
      const discordSetupLabel = document.getElementById('orgDiscordSetupLabel');
      const btn = document.getElementById('orgSubmitBtn');

      if (type === 'AZIENDA') {
        tabBiz.className = 'org-tab active-biz';
        tabGang.className = 'org-tab';
        title.innerText = 'Modulo Apertura Azienda (Discord + Roblox + Bot)';
        nameLabel.innerText = "Nome dell'Azienda *";
        document.getElementById('orgName').placeholder = 'es. Roma Luxury Motors';
        sectorLabel.innerText = 'Settore / Zona su Roblox *';
        document.getElementById('orgSector').placeholder = 'es. Concessionaria - EUR';
        discordSetupLabel.innerText = 'Setup Discord & Bot (Ruoli, Canali, Conto Aziendale) *';
        document.getElementById('orgDiscordSetup').placeholder = 'es. Ruoli CEO/Dipendenti, canali privati, conto aziendale Bot';
        btn.className = 'btn btn-discord';
      } else {
        tabBiz.className = 'org-tab';
        tabGang.className = 'org-tab active-gang';
        title.innerText = 'Modulo Fondazione Gang / Mafia (Discord + Roblox + Bot)';
        nameLabel.innerText = 'Nome Gang / Famiglia / Clan *';
        document.getElementById('orgName').placeholder = 'es. Banda della Magliana / Clan EUR';
        sectorLabel.innerText = 'Territorio / Zona su Roblox *';
        document.getElementById('orgSector').placeholder = 'es. Area Industriale & Porto';
        discordSetupLabel.innerText = 'Setup Discord & Bot (Gradi Clan, Canali, Cassa Bot) *';
        document.getElementById('orgDiscordSetup').placeholder = 'es. Gradi Boss/Soldati, chat vocale/testo clan, cassa Bot';
        btn.className = 'btn btn-purple';
      }
      updateOrgCmd();
    }

    function updateOrgCmd() {
      const discord = document.getElementById('orgDiscord').value.trim() || 'NomeDiscord';
      const roblox = document.getElementById('orgRoblox').value.trim() || 'NomeRoblox';
      const name = document.getElementById('orgName').value.trim() || 'NomeProgetto';
      const sector = document.getElementById('orgSector').value.trim() || 'Zona';
      const setup = document.getElementById('orgDiscordSetup').value.trim() || 'Ruoli+Canali+ContoBot';
      document.getElementById('orgCmdPreview').innerText = \`/registra-org tipo:"\${currentOrgType}" nome:"\${name}" zona:"\${sector}" discord_bot:"\${setup}" capo_discord:@\${discord} capo_roblox:\${roblox}\`;
    }

    function submitOrganization() {
      const discord = document.getElementById('orgDiscord').value.trim();
      const roblox = document.getElementById('orgRoblox').value.trim();
      const name = document.getElementById('orgName').value.trim();
      const sector = document.getElementById('orgSector').value.trim();
      const setup = document.getElementById('orgDiscordSetup').value.trim();
      const desc = document.getElementById('orgDesc').value.trim();

      if (!discord || !roblox || !name || !sector || !setup) {
        alert('Compila tutti i campi obbligatori (Discord Ufficiale, Username Roblox, Nome, Zona e Setup Discord & Bot)!');
        return;
      }

      const cmd = document.getElementById('orgCmdPreview').innerText;
      navigator.clipboard.writeText(cmd);
      document.getElementById('orgConfirmMsg').style.display = 'block';

      const list = document.getElementById('pendingOrgsList');
      const orgId = 'org_' + Date.now();
      const pillClass = currentOrgType === 'AZIENDA' ? 'pill-free' : 'pill-danger';
      const item = document.createElement('div');
      item.className = 'req-item';
      item.id = orgId;
      item.innerHTML = \`
        <span class="status-pill \${pillClass}" style="margin-bottom:0.3rem; display:inline-block;">\${currentOrgType} • FULL</span>
        <div><strong>\${name}</strong> (Roblox/Zona: \${sector})</div>
        <div style="font-size: 0.82rem; color: #cbd5e1;">Discord: @\${discord} | Roblox: \${roblox}</div>
        <div style="font-size: 0.82rem; color: #38bdf8;">Discord & Bot: \${setup}</div>
        <div style="font-size: 0.8rem; color: var(--muted); margin-top:0.2rem;">\${desc || 'Nessuna descrizione aggiuntiva.'}</div>
        <div class="req-actions">
          <button class="btn-sm btn-approve" onclick="approveOrg('\${orgId}', '\${name}', '@\${discord}')">Approva Pacchetto Completo</button>
          <button class="btn-sm btn-reject" onclick="rejectReq('\${orgId}')">Rifiuta</button>
        </div>
      \`;
      list.prepend(item);
    }

    function copyCode() {
      const code = document.getElementById('serverCode').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.innerText = 'Copiato!';
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.innerText = 'Copia Codice';
          btn.style.background = '#e63946';
        }, 2000);
      });
    }

    function checkStaffPass() {
      const pass = document.getElementById('staffPassInput').value;
      if (pass === 'STAFF26ROME') {
        document.getElementById('staffLockBox').style.display = 'none';
        document.getElementById('staffDashboard').style.display = 'block';
        document.getElementById('staffError').style.display = 'none';
      } else {
        document.getElementById('staffError').style.display = 'block';
      }
    }

    function lockStaff() {
      document.getElementById('staffPassInput').value = '';
      document.getElementById('staffLockBox').style.display = 'block';
      document.getElementById('staffDashboard').style.display = 'none';
    }

    function approveReq(id, user, weekly) {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = \`<strong style="color:#34d399;">✓ ACCETTATO: \${user}</strong>\` +
          \`<div style="font-size: 0.82rem; color: #34d399;">Trasferimento automatico Bot attivo: +\${weekly.toLocaleString('it-IT')} € ogni 7 giorni sul conto.</div>\`;
      }
    }

    function approveOrg(id, orgName, leader) {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = \`<strong style="color:#34d399;">✓ APPROVATO: \${orgName}</strong>\` +
          \`<div style="font-size: 0.82rem; color: var(--muted);">Attivato per \${leader}: ruoli & canali Discord, conto/cassa Bot e attività Roblox.</div>\`;
      }
    }

    function rejectReq(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }

    applySiteSettings();
    renderMarket();
    updateOrgCmd();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

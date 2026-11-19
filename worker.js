const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1571477781844594741/kOgNfCJ3QsdUWEyYYfyQ2tuvj71ZLS2bMbYN6gGzO7GP9SdZG4CFx3TmGhczLnQf61FH";
const BOT_API_URL = "https://rome-italy-2-0-6foi.onrender.com/api/approva";
const BOT_SECRET_KEY = "STAFF26ROME";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // =========================================================================
    // API INTERNA: RICEVE RICHIESTE DAL SITO E LE MANDA AL WEBHOOK DISCORD
    // =========================================================================
    if (request.method === "POST" && url.pathname === "/api/richiesta") {
      try {
        const data = await request.json();

        let embed;
        if (data.tipo === "INVESTIMENTO") {
          embed = {
            title: "Nuova Richiesta di Investimento (Borsa)",
            color: 1096065,
            fields: [
              { name: "Discord", value: `@${data.discord}`, inline: true },
              { name: "Roblox", value: data.roblox, inline: true },
              { name: "Requisito Conto Discord", value: "✓ Conto aperto confermato (min. 10.000 € sul conto)", inline: false },
              { name: "Titolo Scelto", value: `${data.titoloNome} (${data.titoloId})`, inline: false },
              { name: "Capitale Investito", value: `${Number(data.importo).toLocaleString("it-IT")} €`, inline: true },
              { name: "Percentuale", value: `+${data.perc}% / sett.`, inline: true },
              { name: "Accredito Settimanale Bot", value: `**+${Number(data.settimanale).toLocaleString("it-IT")} € / settimana**`, inline: false }
            ],
            footer: { text: "Rome Italy 2.0 [EH] • In attesa di approvazione nell'Area Staff" },
            timestamp: new Date().toISOString()
          };
        } else {
          embed = {
            title: `Nuova Richiesta ${data.orgTipo} (Discord + Roblox + Bot)`,
            color: data.orgTipo === "AZIENDA" ? 2450155 : 15087942,
            fields: [
              { name: "Capo Discord", value: `@${data.discord}`, inline: true },
              { name: "Capo Roblox", value: data.roblox, inline: true },
              { name: "Nome Attività / Clan", value: data.nome, inline: false },
              { name: "Zona / Settore Roblox", value: data.zona, inline: true },
              { name: "Setup Discord & Bot", value: data.setup, inline: false },
              { name: "Descrizione", value: data.desc || "Nessuna descrizione aggiuntiva.", inline: false }
            ],
            footer: { text: "Rome Italy 2.0 [EH] • Gestione Organizzazioni" },
            timestamp: new Date().toISOString()
          };
        }

        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Rome Italy 2.0 [EH] • Sistema",
            embeds: [embed]
          })
        });

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // =========================================================================
    // API INTERNA: APPROVAZIONE STAFF -> INVIO DIRETTO AL BOT SU RENDER + DISCORD
    // =========================================================================
    if (request.method === "POST" && url.pathname === "/api/approva") {
      try {
        const body = await request.json();
        if (body.staffPassword !== BOT_SECRET_KEY) {
          return new Response(JSON.stringify({ ok: false, error: "Password Staff non valida" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }

        let botOk = false;
        let botMessage = "";
        try {
          const botRes = await fetch(BOT_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": BOT_SECRET_KEY
            },
            body: JSON.stringify(body.payload)
          });
          botOk = botRes.ok;
          const botJson = await botRes.json().catch(() => ({}));
          botMessage = botJson.message || "";
        } catch (e) {
          botMessage = "Bot su Render non raggiungibile al momento: " + e.message;
        }

        const confirmText = body.payload.azione === "ATTIVA_INVESTIMENTO"
          ? `✅ **INVESTIMENTO APPROVATO DALLO STAFF**\nUtente: **@${body.payload.discord}** (Roblox: \`${body.payload.roblox}\`)\nTitolo: **${body.payload.titolo}** • Accredito settimanale automatico: **+${Number(body.payload.settimanale).toLocaleString("it-IT")} € / settimana**`
          : `✅ **ORGANIZZAZIONE APPROVATA DALLO STAFF**\nNome: **${body.payload.nome}** • Capo: **@${body.payload.discord}** (Roblox: \`${body.payload.roblox}\`)`;

        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Rome Italy 2.0 [EH] • Centrale Staff",
            content: confirmText
          })
        });

        return new Response(JSON.stringify({ ok: true, botOk, botMessage }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // =========================================================================
    // PAGINA WEB PRINCIPALE (HTML + CSS + JS)
    // =========================================================================
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
      --cyan: #38bdf8;
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

    header {
      position: sticky; top: 0; z-index: 100;
      background: rgba(6, 9, 15, 0.94); backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
      padding: 0.95rem 5%; display: flex; justify-content: space-between; align-items: center; gap: 1rem;
    }
    .logo { font-size: 1.3rem; font-weight: 900; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
    .logo span { color: var(--accent); }
    nav { display: flex; align-items: center; gap: 0.95rem; flex-wrap: wrap; justify-content: flex-end; }
    nav a {
      color: var(--muted); text-decoration: none;
      font-size: 0.84rem; font-weight: 600; transition: color 0.2s;
    }
    nav a:hover { color: var(--text); }
    .nav-staff {
      background: rgba(245, 158, 11, 0.15) !important; color: var(--gold) !important;
      border: 1px solid rgba(245, 158, 11, 0.35) !important;
      padding: 0.38rem 0.8rem; border-radius: 6px; font-size: 0.82rem;
    }
    .nav-btn {
      background: #5865F2; color: #fff !important;
      padding: 0.44rem 0.9rem; border-radius: 6px; font-size: 0.83rem;
    }

    .hero {
      padding: 4.5rem 5% 4.2rem; text-align: center;
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
    .hero h1 { font-size: clamp(2.1rem, 5vw, 3.6rem); font-weight: 900; max-width: 920px; margin: 0 auto 1.1rem; line-height: 1.1; }
    .hero p { color: var(--muted); max-width: 760px; margin: 0 auto 2.1rem; font-size: 1.08rem; }
    
    .action-panel {
      display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem;
      margin-bottom: 2.8rem;
    }
    .btn {
      padding: 0.88rem 1.7rem; border-radius: 8px; font-weight: 700; font-size: 0.95rem;
      text-decoration: none; transition: all 0.2s; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-discord { background: #5865F2; color: #fff; box-shadow: 0 4px 20px rgba(88, 101, 242, 0.35); }
    .btn-green { background: var(--green); color: #052e16; font-weight: 800; }
    .btn-gold { background: var(--gold); color: #1c1302; font-weight: 800; }
    .btn-purple { background: var(--purple); color: #fff; font-weight: 800; }
    
    .code-box {
      background: var(--card); border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 0.55rem 0.7rem 0.55rem 1.2rem; border-radius: 8px;
      display: inline-flex; align-items: center; gap: 1rem;
    }
    .code-label { font-size: 0.76rem; color: var(--muted); text-transform: uppercase; font-weight: 700; display: block; text-align: left; }
    .code-value { font-family: monospace; font-size: 1.2rem; font-weight: 900; color: #fff; letter-spacing: 1px; }
    .copy-btn {
      background: var(--accent); color: #fff; border: none;
      padding: 0.55rem 1rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem;
      cursor: pointer; transition: background 0.2s;
    }

    .stats-bar {
      max-width: 1040px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;
      background: rgba(16, 22, 36, 0.85); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.3rem;
    }
    .stat h4 { font-size: 1.4rem; font-weight: 900; color: #fff; }
    .stat span { font-size: 0.83rem; color: var(--muted); font-weight: 600; }

    section { padding: 4.2rem 5%; max-width: 1220px; margin: 0 auto; }
    section:nth-child(even) { background: rgba(11, 16, 27, 0.45); border-radius: 20px; }
    .section-header { margin-bottom: 2.1rem; }
    .section-tag { color: var(--accent); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
    .section-title { font-size: 1.95rem; font-weight: 900; margin: 0.25rem 0 0.5rem; }
    .section-sub { color: var(--muted); max-width: 800px; font-size: 0.97rem; }

    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(265px, 1fr)); gap: 1.35rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.35rem; }
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 12px; padding: 1.6rem; transition: all 0.2s;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .card:hover { border-color: rgba(255, 255, 255, 0.22); background: var(--card-hover); transform: translateY(-3px); }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; gap: 0.5rem; }
    .status-pill {
      font-size: 0.72rem; font-weight: 800; padding: 0.24rem 0.6rem; border-radius: 999px;
      text-transform: uppercase; white-space: nowrap;
    }
    .pill-open { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .pill-select { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .pill-free { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .pill-danger { background: rgba(230, 57, 70, 0.15); color: #ff7582; border: 1px solid rgba(230, 57, 70, 0.3); }
    .pill-cyan { background: rgba(56, 189, 248, 0.15); color: var(--cyan); border: 1px solid rgba(56, 189, 248, 0.3); }
    .card h3 { font-size: 1.18rem; color: #fff; }
    .card p { color: var(--muted); font-size: 0.91rem; margin: 0.5rem 0 1rem; }
    .card-footer { font-size: 0.82rem; color: #cbd5e1; font-weight: 600; border-top: 1px solid var(--border); padding-top: 0.7rem; }

    .table-wrap { overflow-x: auto; background: var(--card); border: 1px solid var(--border); border-radius: 12px; }
    table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
    th, td { padding: 0.95rem 1.15rem; border-bottom: 1px solid var(--border); }
    th { background: rgba(255, 255, 255, 0.03); color: #fff; font-weight: 800; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; }
    td { color: var(--muted); }
    td strong { color: #fff; }
    .code-badge { font-family: monospace; background: rgba(56, 189, 248, 0.14); color: var(--cyan); padding: 0.2rem 0.5rem; border-radius: 5px; font-weight: 800; }

    .market-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(215px, 1fr)); gap: 1rem;
      margin-bottom: 2rem;
    }
    .ticker-card {
      background: var(--card); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 1.25rem;
    }
    .ticker-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .ticker-code { font-family: monospace; font-weight: 800; font-size: 0.8rem; color: var(--cyan); background: rgba(56, 189, 248, 0.12); padding: 0.2rem 0.5rem; border-radius: 5px; }
    .ticker-trend { font-size: 0.8rem; font-weight: 800; }
    .trend-up { color: #34d399; }
    .trend-down { color: #f87171; }
    .ticker-name { font-weight: 700; font-size: 1rem; margin-bottom: 0.35rem; color: #fff; }
    .ticker-price { font-size: 1.45rem; font-weight: 900; color: #fff; }
    .ticker-yield { font-size: 0.83rem; color: #34d399; font-weight: 700; margin-top: 0.25rem; }

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

    .checkbox-req {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 10px;
      padding: 0.85rem 1rem;
      margin-bottom: 0.95rem;
      display: flex;
      align-items: flex-start;
      gap: 0.65rem;
    }
    .checkbox-req input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin-top: 0.15rem;
      accent-color: var(--gold);
      cursor: pointer;
      flex-shrink: 0;
    }
    .checkbox-req label {
      font-size: 0.84rem;
      color: #fde68a;
      font-weight: 700;
      cursor: pointer;
      line-height: 1.4;
      margin: 0;
    }

    .selected-rate-banner {
      background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 0.9rem;
      display: flex; justify-content: space-between; align-items: center;
    }
    .selected-rate-banner span { font-size: 0.85rem; color: #bae6fd; font-weight: 600; }
    .selected-rate-banner strong { font-size: 1.15rem; color: var(--cyan); font-weight: 900; }

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

    .org-tabs { display: flex; gap: 0.7rem; margin-bottom: 1.2rem; }
    .org-tab {
      flex: 1; padding: 0.7rem; border-radius: 8px; font-weight: 800; font-size: 0.9rem;
      border: 1px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer;
    }
    .org-tab.active-biz { background: rgba(37, 99, 235, 0.2); border-color: var(--blue); color: #60a5fa; }
    .org-tab.active-gang { background: rgba(230, 57, 70, 0.2); border-color: var(--accent); color: #ff7582; }

    .rules-list { display: grid; gap: 0.9rem; }
    .rule-item {
      background: var(--card); border-left: 4px solid var(--accent);
      padding: 1.15rem 1.45rem; border-radius: 8px; border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .rule-item strong { display: block; margin-bottom: 0.25rem; font-size: 1.03rem; color: #fff; }
    .rule-item span { color: var(--muted); font-size: 0.92rem; }

    .faq-item {
      background: var(--card); border: 1px solid var(--border); border-radius: 10px;
      margin-bottom: 0.8rem; overflow: hidden;
    }
    .faq-q {
      width: 100%; background: transparent; border: none; color: #fff;
      padding: 1.1rem 1.35rem; text-align: left; font-size: 0.98rem; font-weight: 700;
      cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    }
    .faq-q:hover { background: rgba(255, 255, 255, 0.03); }
    .faq-a {
      display: none; padding: 0 1.35rem 1.15rem; color: var(--muted); font-size: 0.92rem;
      border-top: 1px solid var(--border); padding-top: 0.85rem;
    }

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

    footer {
      text-align: center; padding: 2.8rem 5%; border-top: 1px solid var(--border);
      color: var(--muted); font-size: 0.9rem; margin-top: 2rem; background: var(--bg-alt);
    }
    .footer-links { margin-bottom: 1rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
    .footer-links a { color: #cbd5e1; text-decoration: none; font-weight: 600; }
    .footer-links a:hover { color: var(--accent); }

    @media (max-width: 900px) {
      nav a:not(.nav-btn):not(.nav-staff) { display: none; }
      .split-panel { grid-template-columns: 1fr; }
      .form-row-2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="tricolore"></div>

  <div class="announcement-bar" id="liveAnnBar">
    <span class="ann-tag" id="liveAnnTag">COMUNICATO UFFICIALE</span>
    <span id="liveAnnText">Benvenuti su Rome Italy 2.0 [EH]! Bandi aperti per Carabinieri, Polizia di Stato, Aziende e Organizzazioni.</span>
  </div>

  <header>
    <div class="logo">ROME ITALY <span>2.0 [EH]</span></div>
    <nav>
      <a href="#quartieri">Quartieri</a>
      <a href="#fazioni">Fazioni</a>
      <a href="#servizi">Servizi RP</a>
      <a href="#radio">Codici Radio</a>
      <a href="#investimenti">Borsa</a>
      <a href="#organizzazioni">Aziende & Gang</a>
      <a href="#regolamento">Regole</a>
      <a href="#faq">FAQ</a>
      <a href="#area-staff" class="nav-staff">Area Staff</a>
      <a href="https://discord.gg/BdAQwqss4K" target="_blank" class="nav-btn discord-link-target">Discord</a>
    </nav>
  </header>

  <div class="hero">
    <div class="badge"><span class="dot"></span> SERVER PRIVATO ATTIVO • EMERGENCY HAMBURG ITALIANO</div>
    <h1>Il Più Realistico Server Roleplay Italiano su Emergency Hamburg</h1>
    <p>Un ecosistema completo dove ogni azione conta su <strong>Roblox</strong> e su <strong>Discord</strong>: pattugliamenti istituzionali, servizi anagrafici e bancari, Borsa cittadina con rendite settimanali sul Bot, fondazione di aziende o gang/mafie e codici operativi.</p>
    
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
        <h4>Conto + Min. 10.000 €</h4>
        <span>Obbligatorio per Investire</span>
      </div>
      <div class="stat">
        <h4>7.000 € / 13.000 €</h4>
        <span>Bonus Conto & Busta Paga</span>
      </div>
      <div class="stat">
        <h4>Online 24/7</h4>
        <span>Pattuglie & Eventi Giornalieri</span>
      </div>
    </div>
  </div>

  <!-- QUARTIERI -->
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
      <p class="section-sub">Scegli il tuo percorso: difendi lo Stato in divisa oppure costruisci il tuo impero economico e criminale.</p>
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
        <div class="card-footer">Stipendio: Busta Paga 13.000 € / 7gg</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Polizia di Stato</h3>
            <span class="status-pill pill-open">Bandi Aperti</span>
          </div>
          <p>Squadra Volante, inseguimenti ad alta velocità, prevenzione crimini e supporto coordinato alle operazioni stradali.</p>
        </div>
        <div class="card-footer">Stipendio: Busta Paga 13.000 € / 7gg</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Reparti Speciali (NOCS / GIS)</h3>
            <span class="status-pill pill-select">Su Selezione</span>
          </div>
          <p>Unità tattiche d'élite per situazioni ad alto rischio, liberazione ostaggi, irruzioni coordinate e scorte istituzionali.</p>
        </div>
        <div class="card-footer">Reparto: Intervento Alto Rischio</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Civili, Imprenditori & Clan</h3>
            <span class="status-pill pill-free">Accesso Libero</span>
          </div>
          <p>Investi in Borsa (conto Discord aperto + almeno 10.000 €), fonda una tua azienda registrata oppure crea un'organizzazione criminale rispettando il regolamento RP.</p>
        </div>
        <div class="card-footer">Economia: Borsa, Aziende & Conti Bot</div>
      </div>
    </div>
  </section>

  <!-- SERVIZI CITTADINI & BUROCRAZIA RP -->
  <section id="servizi">
    <div class="section-header">
      <span class="section-tag">Sportelli & Sistema Bot Discord</span>
      <h2 class="section-title">Servizi Cittadini, Banche & Documenti</h2>
      <p class="section-sub">Tutto quello che puoi attivare tramite i pannelli del Bot sul server Discord di Rome Italy 2.0 [EH].</p>
    </div>
    <div class="grid-3">
      <div class="card">
        <div>
          <div class="card-top">
            <h3>Conti Bancari & Economia</h3>
            <span class="status-pill pill-open">Bonus 7.000 €</span>
          </div>
          <p>Apri il conto su Banca Sella, Poste Italiane o Intesa Sanpaolo. Gestisci saldo, depositi, prelievi, busta paga settimanale (<strong>13.000 €</strong>) e tasse (<strong>800 €</strong> ogni 7 giorni).</p>
        </div>
        <div class="card-footer">Comandi: /conto • /deposita • /preleva</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Patenti & PRA Veicoli</h3>
            <span class="status-pill pill-select">30 Punti Iniziali</span>
          </div>
          <p>Richiedi la patente (<strong>A = Moto</strong>, <strong>B = Veicoli</strong>, <strong>C / D</strong>) e immatricola il tuo mezzo con targa ufficiale per guidare in regola evitando sanzioni.</p>
        </div>
        <div class="card-footer">Comando: /patente</div>
      </div>

      <div class="card">
        <div>
          <div class="card-top">
            <h3>Cittadinanza & Porto d'Armi</h3>
            <span class="status-pill pill-cyan">Anagrafe RP</span>
          </div>
          <p>Registra la tua identità RP (Nome, Cognome, Data di nascita, Sesso e Roblox) e invia richiesta motivata per il porto d'armi legale.</p>
        </div>
        <div class="card-footer">Approvazione: Gestita dallo Staff</div>
      </div>
    </div>
  </section>

  <!-- CODICI RADIO & PROCEDURE OPERATIVE -->
  <section id="radio">
    <div class="section-header">
      <span class="section-tag">Comunicazioni & Ordine Pubblico</span>
      <h2 class="section-title">Codici Radio & Procedure RP</h2>
      <p class="section-sub">Linguaggio operativo rapido per comunicazioni chiare tra pattuglie, centrale e reparti.</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Codice / Termine</th>
            <th>Significato Operativo</th>
            <th>Uso Consigliato</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="code-badge">10-4</span></td>
            <td><strong>Ricevuto / Confermato</strong></td>
            <td>Conferma rapida di un ordine o messaggio radio.</td>
          </tr>
          <tr>
            <td><span class="code-badge">10-20</span></td>
            <td><strong>Posizione Attuale</strong></td>
            <td>Indicare il quartiere o la strada in cui ci si trova (es. EUR, Mostacciano).</td>
          </tr>
          <tr>
            <td><span class="code-badge">10-80</span></td>
            <td><strong>Inseguimento in Corso</strong></td>
            <td>Segnalare un veicolo che non si ferma all'alt per richiedere supporto.</td>
          </tr>
          <tr>
            <td><span class="code-badge">CODICE 3</span></td>
            <td><strong>Emergenza con Sirene</strong></td>
            <td>Intervento urgente su rapina, sparatoria o incidente grave.</td>
          </tr>
          <tr>
            <td><span class="code-badge">ALT / FERMO</span></td>
            <td><strong>Controllo Documenti & Veicolo</strong></td>
            <td>Verifica patente, immatricolazione e comportamento RP del cittadino.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- SEZIONE BORSA & INVESTIMENTI -->
  <section id="investimenti">
    <div class="section-header">
      <span class="section-tag">Collegamento Diretto Discord + Bot Economia</span>
      <h2 class="section-title">Mercati, Quotazioni & Investimenti Bot</h2>
      <p class="section-sub">Per investire è <strong>obbligatorio avere un conto aperto sul server Discord</strong> e avere <strong>almeno 10.000 € sul conto</strong>. Scegli un titolo, visualizza la percentuale settimanale e invia la richiesta: appena accettata dallo Staff, il Bot ti accredita ogni settimana l'importo nel conto.</p>
    </div>

    <div class="market-grid" id="marketTickerGrid"></div>

    <div class="split-panel">
      <div>
        <span class="status-pill pill-open" style="margin-bottom:0.8rem; display:inline-block;">● COLLEGATO AL BOT SU RENDER</span>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.7rem;">Requisiti Obbligatori per Investire</h3>
        <p style="color: var(--muted); font-size: 0.95rem; margin-bottom: 1.2rem;">Prima di inviare la richiesta dal modulo, devi avere il conto attivo sul server Discord e almeno <strong>10.000 €</strong> disponibili sul tuo conto.</p>
        <div class="rules-list">
          <div class="rule-item" style="border-left-color: var(--gold);">
            <strong>1. Conto Aperto su Discord Obbligatorio</strong>
            <span>Devi aver già aperto un conto sul server Discord ufficiale tramite il Bot prima di richiedere qualsiasi investimento.</span>
          </div>
          <div class="rule-item" style="border-left-color: var(--gold);">
            <strong>2. Almeno 10.000 € sul Conto & Investimento</strong>
            <span>È obbligatorio avere almeno <strong>10.000 €</strong> sul conto e investire almeno <strong>10.000 €</strong> sul titolo scelto.</span>
          </div>
          <div class="rule-item" style="border-left-color: var(--green);">
            <strong>3. Invio Automatico a Discord & Bot</strong>
            <span>Con un clic la richiesta parte verso il server Discord e, una volta accettata dallo Staff, attiva l'accredito settimanale sul tuo conto.</span>
          </div>
        </div>
      </div>

      <div class="form-box">
        <h3>Modulo Investimento Diretto (Conto Discord + Min. 10.000 €)</h3>
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

        <div class="checkbox-req">
          <input type="checkbox" id="invAccountCheck" />
          <label for="invAccountCheck">Dichiaro di avere un <strong>conto aperto sul server Discord</strong> e di avere <strong>almeno 10.000 € sul conto</strong> per coprire l'investimento (obbligatorio).</label>
        </div>

        <div class="payout-box">
          <div>
            <span>Ti arriva ogni settimana sul conto (Bot):</span>
            <div style="font-size: 0.78rem; color: var(--muted);">Calcolo automatico appena accettato</div>
          </div>
          <strong id="weeklyReturn">+1.400 € / sett.</strong>
        </div>

        <button class="btn btn-green" id="invSubmitBtn" style="width: 100%; justify-content: center;" onclick="submitInvestment()">
          Invia Richiesta al Server & Bot
        </button>

        <p id="invConfirmMsg" style="font-size: 0.85rem; color: #34d399; margin-top: 0.75rem; display: none; font-weight: 700;">
          ✓ Richiesta inviata in automatico al canale Discord dello Staff! Appena approvata, il Bot attiverà l'accredito settimanale sul tuo conto.
        </p>
      </div>
    </div>
  </section>

  <!-- SEZIONE CREA AZIENDA O GANG / MAFIA -->
  <section id="organizzazioni">
    <div class="section-header">
      <span class="section-tag">Imprenditoria & Malavita • Pacchetto Completo Discord + Roblox + Bot</span>
      <h2 class="section-title">Fonda un'Azienda o un'Organizzazione (Gang / Mafia)</h2>
      <p class="section-sub">Ogni richiesta inviata arriva direttamente sul server Discord dello Staff per l'attivazione di ruoli, canali, conto/cassa sul Bot e zona su Roblox.</p>
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
            <input type="text" id="orgDiscord" placeholder="es. marco_rp" />
          </div>
          <div class="form-group">
            <label>Username Roblox Ufficiale *</label>
            <input type="text" id="orgRoblox" placeholder="es. MarcoITA_99" />
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label id="orgNameLabel">Nome dell'Azienda *</label>
            <input type="text" id="orgName" placeholder="es. Roma Luxury Motors" />
          </div>
          <div class="form-group">
            <label id="orgSectorLabel">Settore / Zona su Roblox *</label>
            <input type="text" id="orgSector" placeholder="es. Concessionaria - EUR" />
          </div>
        </div>

        <div class="form-group">
          <label id="orgDiscordSetupLabel">Setup Discord & Bot (Ruoli, Canali, Conto Aziendale) *</label>
          <input type="text" id="orgDiscordSetup" placeholder="es. Ruoli CEO/Dipendenti, canali privati, conto aziendale Bot" />
        </div>

        <div class="form-group">
          <label>Attività su Roblox, Numero Membri & Descrizione *</label>
          <textarea id="orgDesc" placeholder="Descrivi membri, attività in città su Roblox, gestione su Discord e obiettivi..."></textarea>
        </div>

        <button class="btn btn-discord" id="orgSubmitBtn" style="width: 100%; justify-content: center;" onclick="submitOrganization()">
          Invia Richiesta Diretta a Discord & Staff
        </button>

        <p id="orgConfirmMsg" style="font-size: 0.85rem; color: #34d399; margin-top: 0.75rem; display: none; font-weight: 700;">
          ✓ Richiesta inviata in automatico sul canale Discord dello Staff!
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
        <strong>4. Investimenti: Conto Discord Aperto & Minimo 10.000 €</strong>
        <span>È obbligatorio avere un conto aperto sul server Discord e avere almeno <strong>10.000 €</strong> sul conto (investimento minimo 10.000 €). Le rendite settimanali automatiche del Bot vengono attivate solo su investimenti accettati dallo Staff.</span>
      </div>
      <div class="rule-item">
        <strong>5. Rispetto verso Staff e Giocatori</strong>
        <span>Nessun insulto fuori dal contesto RP, niente spam, niente uso di cheat. Le decisioni dello Staff vanno sempre rispettate.</span>
      </div>
    </div>
  </section>

  <!-- FAQ RAPIDE -->
  <section id="faq">
    <div class="section-header">
      <span class="section-tag">Centro Assistenza</span>
      <h2 class="section-title">Domande Frequenti (FAQ)</h2>
      <p class="section-sub">Chiarimenti rapidi su accesso al server privato, economia, Bot e organizzazioni.</p>
    </div>

    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">
        <span>Come entro nel server privato di Emergency Hamburg?</span>
        <span>+</span>
      </button>
      <div class="faq-a">
        Copia il codice del server nella parte alta del sito (es. <strong>ijisma95</strong>), apri Emergency Hamburg su Roblox, entra nella sezione dei server privati e inserisci il codice. Ricordati di unirti anche al Discord ufficiale per ruoli, bandi e comandi.
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">
        <span>Cosa serve per investire e come funziona il pagamento settimanale?</span>
        <span>+</span>
      </button>
      <div class="faq-a">
        È obbligatorio avere un <strong>conto aperto sul server Discord</strong> e avere <strong>almeno 10.000 € sul conto</strong> (investimento minimo 10.000 €). Scegli il titolo, controlla la percentuale settimanale e invia la richiesta: quando viene approvata dallo Staff, il Bot attiva l'accredito settimanale sul tuo conto.
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-q" onclick="toggleFaq(this)">
        <span>Posso creare sia un'Azienda che una Gang o Mafia?</span>
        <span>+</span>
      </button>
      <div class="faq-a">
        Sì, nella sezione <strong>Aziende & Gang</strong> puoi scegliere il tab dedicato, compilare i dati Discord e Roblox, indicare il setup di ruoli/canali/conto sul Bot e inviare la richiesta per l'approvazione dello Staff.
      </div>
    </div>
  </section>

  <!-- AREA STAFF -->
  <section id="area-staff">
    <div class="section-header">
      <span class="section-tag" style="color: var(--gold);">Accesso Riservato</span>
      <h2 class="section-title">Area Gestione Staff</h2>
      <p class="section-sub">Pannello di controllo collegato al Bot su Render e al Webhook Discord.</p>
    </div>

    <div class="staff-lock-box" id="staffLockBox">
      <h3>Area Protetta da Password</h3>
      <p>Inserisci la password di servizio per sbloccare gli strumenti di gestione e approvazione automatica verso il Bot.</p>
      <div class="staff-login-row">
        <input type="password" id="staffPassInput" placeholder="Password Staff..." onkeypress="if(event.key==='Enter') checkStaffPass()" />
        <button class="btn btn-gold" onclick="checkStaffPass()">Sblocca Pannello</button>
      </div>
      <div class="error-msg" id="staffError">Password errata. Accesso negato.</div>
    </div>

    <div class="staff-dashboard" id="staffDashboard">
      <div class="staff-dash-header">
        <div>
          <span class="founder-badge" style="margin-bottom: 0.2rem;">ACCESSO AUTORIZZATO • BOT COLLEGATO</span>
          <h3 style="font-size: 1.4rem;">Centrale Operativa Staff — Rome Italy 2.0 [EH]</h3>
        </div>
        <button class="btn-sm btn-reject" onclick="lockStaff()">Blocca & Esci</button>
      </div>

      <div class="staff-grid">
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

        <div class="staff-card">
          <h4>Accetta Investimenti (Invia Ordine al Bot Render)</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Cliccando "Accetta & Attiva Bot", il sito manda l'ordine a Render e la conferma su Discord:</p>
          <div id="pendingInvestmentsList"></div>
        </div>

        <div class="staff-card">
          <h4>Richieste Aziende & Gang / Mafie</h4>
          <p style="font-size: 0.83rem; color: var(--muted); margin-bottom: 0.9rem;">Approva le registrazioni inviate dai giocatori:</p>
          <div id="pendingOrgsList"></div>
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
      <a href="#quartieri">Quartieri</a>
      <a href="#fazioni">Fazioni</a>
      <a href="#servizi">Servizi RP</a>
      <a href="#radio">Codici Radio</a>
      <a href="#investimenti">Borsa</a>
      <a href="#organizzazioni">Aziende & Gang</a>
      <a href="#faq">FAQ</a>
      <a href="#area-staff">Area Staff</a>
    </div>
    <p>&copy; 2026 Rome Italy 2.0 [EH] — Fondato da Pietro. Tutti i diritti riservati.</p>
    <p style="font-size: 0.8rem; margin-top: 0.4rem; opacity: 0.7;">Codice Server Roblox: <span id="footerGameCode">ijisma95</span> • Non affiliato ufficialmente a Roblox Corporation.</p>
  </footer>

  <script>
    const MIN_INVESTMENT = 10000;
    let currentStaffPassword = '';

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
      const idx = document.getElementById('invAssetSelect').value || 0;
      const asset = assets[idx];
      const amount = parseFloat(document.getElementById('invAmount').value) || 0;
      const warnEl = document.getElementById('minInvestWarning');

      document.getElementById('selectedRateDisplay').innerText = \`+\${asset.rate}% a settimana\`;

      if (amount < MIN_INVESTMENT) {
        warnEl.style.display = 'block';
        document.getElementById('weeklyReturn').innerText = 'Min. 10.000 €';
        return;
      } else {
        warnEl.style.display = 'none';
      }

      const weekly = Math.round(amount * (asset.rate / 100));
      document.getElementById('weeklyReturn').innerText = '+' + weekly.toLocaleString('it-IT') + ' € / sett.';
    }

    async function submitInvestment() {
      const discord = document.getElementById('invDiscord').value.trim();
      const roblox = document.getElementById('invRoblox').value.trim();
      const idx = document.getElementById('invAssetSelect').value || 0;
      const asset = assets[idx];
      const amount = Math.round(parseFloat(document.getElementById('invAmount').value) || 0);
      const hasAccount = document.getElementById('invAccountCheck').checked;

      if (!discord || !roblox) {
        alert('Inserisci obbligatoriamente il tuo Nome Discord Ufficiale e il tuo Username Roblox!');
        return;
      }
      if (!hasAccount) {
        alert('È obbligatorio avere un conto aperto sul server Discord e avere almeno 10.000 € sul conto per investire!');
        return;
      }
      if (amount < MIN_INVESTMENT) {
        alert("L'importo minimo per investire e avere sul conto è di 10.000 €!");
        return;
      }

      const btn = document.getElementById('invSubmitBtn');
      btn.disabled = true;
      btn.innerText = 'Invio in corso a Discord...';

      const weekly = Math.round(amount * (asset.rate / 100));

      try {
        await fetch('/api/richiesta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: 'INVESTIMENTO',
            discord,
            roblox,
            titoloId: asset.id,
            titoloNome: asset.name,
            perc: asset.rate,
            importo: amount,
            settimanale: weekly
          })
        });

        document.getElementById('invConfirmMsg').style.display = 'block';

        const list = document.getElementById('pendingInvestmentsList');
        const reqId = 'req_' + Date.now();
        const item = document.createElement('div');
        item.className = 'req-item';
        item.id = reqId;
        item.innerHTML = \`
          <strong>Discord: @\${discord} | Roblox: \${roblox}</strong>
          <div style="font-size: 0.8rem; color: #fde68a;">✓ Conto Discord confermato (min. 10.000 € sul conto)</div>
          <div style="font-size: 0.83rem; color: #cbd5e1; margin-top:0.2rem;">Titolo: \${asset.name} (+\${asset.rate}%) • Investito: \${amount.toLocaleString('it-IT')} €</div>
          <div style="font-size: 0.83rem; color: #34d399;">Arriva ogni settimana sul conto: +\${weekly.toLocaleString('it-IT')} € / sett.</div>
          <div class="req-actions">
            <button class="btn-sm btn-approve" onclick="approveReq('\${reqId}', '\${discord}', '\${roblox}', '\${asset.name}', \${amount}, \${weekly})">Accetta & Attiva Bot</button>
            <button class="btn-sm btn-reject" onclick="rejectReq('\${reqId}')">Rifiuta</button>
          </div>
        \`;
        list.prepend(item);
      } catch (e) {
        alert('Errore durante invio a Discord: ' + e.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Invia Richiesta al Server & Bot';
      }
    }

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
    }

    async function submitOrganization() {
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

      const btn = document.getElementById('orgSubmitBtn');
      btn.disabled = true;
      btn.innerText = 'Invio a Discord in corso...';

      try {
        await fetch('/api/richiesta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: 'ORGANIZZAZIONE',
            orgTipo: currentOrgType,
            discord,
            roblox,
            nome: name,
            zona: sector,
            setup,
            desc
          })
        });

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
            <button class="btn-sm btn-approve" onclick="approveOrg('\${orgId}', '\${name}', '\${discord}', '\${roblox}')">Approva & Invia al Bot</button>
            <button class="btn-sm btn-reject" onclick="rejectReq('\${orgId}')">Rifiuta</button>
          </div>
        \`;
        list.prepend(item);
      } catch (e) {
        alert('Errore durante invio: ' + e.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Invia Richiesta Diretta a Discord & Staff';
      }
    }

    function toggleFaq(btn) {
      const answer = btn.nextElementSibling;
      const sign = btn.querySelector('span:last-child');
      const isOpen = answer.style.display === 'block';
      answer.style.display = isOpen ? 'none' : 'block';
      sign.innerText = isOpen ? '+' : '-';
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
        currentStaffPassword = pass;
        document.getElementById('staffLockBox').style.display = 'none';
        document.getElementById('staffDashboard').style.display = 'block';
        document.getElementById('staffError').style.display = 'none';
      } else {
        document.getElementById('staffError').style.display = 'block';
      }
    }

    function lockStaff() {
      currentStaffPassword = '';
      document.getElementById('staffPassInput').value = '';
      document.getElementById('staffLockBox').style.display = 'block';
      document.getElementById('staffDashboard').style.display = 'none';
    }

    async function approveReq(id, discord, roblox, titolo, importo, weekly) {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '<span style="color:#fbbf24;">Invio comando di accredito settimanale al Bot su Render...</span>';

      const res = await fetch('/api/approva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffPassword: currentStaffPassword,
          payload: {
            azione: 'ATTIVA_INVESTIMENTO',
            discord,
            roblox,
            titolo,
            importo,
            settimanale: weekly
          }
        })
      });
      const data = await res.json();
      const botStatus = data.botOk
        ? \`<span style="color:#34d399;">✓ Bot Render sincronizzato</span>\`
        : \`<span style="color:#fbbf24;">⚠ Conferma inviata su Discord (\${data.botMessage || 'verifica bot Render'})</span>\`;

      el.innerHTML = \`<strong style="color:#34d399;">✓ ACCETTATO: @\${discord} (\${roblox})</strong>\` +
        \`<div style="font-size: 0.82rem; color: #34d399;">Accredito settimanale attivo: +\${weekly.toLocaleString('it-IT')} € ogni 7 giorni.</div>\` +
        \`<div style="font-size: 0.78rem; margin-top:0.25rem;">\${botStatus}</div>\`;
    }

    async function approveOrg(id, orgName, discord, roblox) {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '<span style="color:#fbbf24;">Invio conferma a Discord & Bot...</span>';

      await fetch('/api/approva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffPassword: currentStaffPassword,
          payload: {
            azione: 'ATTIVA_ORGANIZZAZIONE',
            nome: orgName,
            discord,
            roblox
          }
        })
      });

      el.innerHTML = \`<strong style="color:#34d399;">✓ APPROVATO: \${orgName}</strong>\` +
        \`<div style="font-size: 0.82rem; color: var(--muted);">Conferma inviata a Discord & Bot per @\${discord} (\${roblox}).</div>\`;
    }

    function rejectReq(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }

    applySiteSettings();
    renderMarket();
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

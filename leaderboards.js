/* ===========================================================
   DietCokeMan Challenge: shared leaderboard UI + validation.

   Reads scores from Firestore (boards/{board}/entries). Ranking:
   higher score first, then faster time (seconds). Depends on
   account.js calling setFirebase(fb) once Firebase is ready.
   =========================================================== */

const DISPLAY_MAX = 20;
const DISPLAY_MIN = 3;

/** @type {null | Record<string, unknown>} */
let fb = null;

export function setFirebase(f) {
  fb = f;
}

export function boardIdFromQuiz(q, mode) {
  return (q.scoreKey || q.slug) + '-' + mode;
}

/* ---------- validation ---------- */
const BLOCKED = new Set([
  'ass', 'asshole', 'bastard', 'bitch', 'bullshit', 'crap', 'damn', 'dick', 'fag', 'fuck',
  'fucker', 'fucking', 'nigger', 'nigga', 'piss', 'pussy', 'shit', 'slut', 'twat', 'whore',
  'cunt', 'retard', 'rape', 'nazi', 'hitler'
]);

export function cleanDisplay(raw) {
  return String(raw || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, DISPLAY_MAX);
}

export function displayProblem(name) {
  const n = cleanDisplay(name);
  if (n.length < DISPLAY_MIN) return `At least ${DISPLAY_MIN} characters.`;
  if (n.length > DISPLAY_MAX) return `${DISPLAY_MAX} characters at most.`;
  if (!/^[\w][\w .'-]*[\w]$|^[\w]{1,2}$/i.test(n)) {
    return 'Letters, numbers, spaces, . \' - only; no leading or trailing spaces.';
  }
  if (/(.)\1{5,}/i.test(n.replace(/\s/g, ''))) return 'Pick a more recognizable name.';
  if (/https?:|www\.|\.com\b|@everyone/i.test(n)) return 'That name is not allowed.';
  const norm = n.toLowerCase().replace(/[^a-z0-9]+/g, '');
  for (const w of BLOCKED) {
    if (norm.includes(w.replace(/[^a-z0-9]/g, ''))) return 'That name is not allowed.';
  }
  if (/^(test|asdf|qwerty|guest|player|user|aaa|xxx)(\d*)$/i.test(norm)) return 'Pick a name people can tell apart.';
  return '';
}

const SUBMIT_KEY = 'dcm-lb-submit';
const SUBMIT_GAP_MS = 45_000;

export function submitCooldownLeft() {
  try {
    const t = parseInt(localStorage.getItem(SUBMIT_KEY) || '0', 10) || 0;
    return Math.max(0, SUBMIT_GAP_MS - (Date.now() - t));
  } catch (e) {
    return 0;
  }
}

export function markSubmitted() {
  try { localStorage.setItem(SUBMIT_KEY, String(Date.now())); } catch (e) {}
}

/* ---------- formatting ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function fmtElapsed(sec) {
  const s = Math.max(0, Math.round(sec || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m ? `${m}:${String(r).padStart(2, '0')}` : `${s}s`;
}

export function fmtWhen(at) {
  if (!at) return '';
  let d;
  if (typeof at.toDate === 'function') d = at.toDate();
  else if (at.seconds) d = new Date(at.seconds * 1000);
  else d = new Date(at);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/* ---------- fetch + rank ---------- */
export function rankRows(rows) {
  return rows.slice().sort((a, b) => {
    const sb = (b.best || 0) - (a.best || 0);
    if (sb !== 0) return sb;
    const ta = a.seconds != null ? a.seconds : 1e9;
    const tb = b.seconds != null ? b.seconds : 1e9;
    if (ta !== tb) return ta - tb;
    const aa = a.at && a.at.seconds ? a.at.seconds : 0;
    const ba = b.at && b.at.seconds ? b.at.seconds : 0;
    return ba - aa;
  });
}

export async function fetchBoard(board, limit = 25) {
  if (!fb) return [];
  const q = fb.query(fb.collection(fb.db, 'boards', board, 'entries'), fb.limit(Math.min(limit * 3, 100)));
  const snap = await fb.getDocs(q);
  const rows = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
  return rankRows(rows).slice(0, limit);
}

export function rowName(row) {
  if (row.username && row.guest !== true) return '@' + row.username;
  if (row.name) return row.name;
  if (row.username) return '@' + row.username;
  return 'Player';
}

export function nameHtml(row, meUid, opts = {}) {
  const label = esc(rowName(row));
  const mine = meUid && row.uid === meUid;
  if (!opts.plainNames && row.username && row.guest !== true) {
    return `<a class="lb-nm${mine ? ' me' : ''}" href="profile.html?u=${encodeURIComponent(row.username)}">${label}</a>`;
  }
  return `<span class="lb-nm${mine ? ' me' : ''}">${label}</span>`;
}

/* ---------- render ---------- */
export function renderPodium(rows, meUid, opts = {}) {
  const top = rows.slice(0, 3);
  if (!top.length) {
    return `<p class="lb-empty">Be the first on the board. Finish a quiz and post your score.</p>`;
  }
  const order = [1, 0, 2];
  const medals = ['🥇', '🥈', '🥉'];
  const blocks = order.map((i) => {
    const row = top[i];
    if (!row) return '<div class="podium-slot empty" aria-hidden="true"></div>';
    const h = i === 0 ? 'podium-first' : 'podium-side';
    return `<div class="podium-slot ${h}${meUid && row.uid === meUid ? ' me' : ''}">
      <span class="podium-medal" aria-hidden="true">${medals[i]}</span>
      ${nameHtml(row, meUid, opts)}
      <span class="podium-sc">${row.best}<small>/${row.total}</small></span>
      <span class="podium-meta">${row.seconds != null ? fmtElapsed(row.seconds) : ''}${row.seconds != null && fmtWhen(row.at) ? ' · ' : ''}${fmtWhen(row.at)}</span>
    </div>`;
  }).join('');
  return `<div class="podium" data-n="${top.length}" role="list" aria-label="Top three">${blocks}</div>`;
}

export function renderTable(rows, meUid, startRank = 4, opts = {}) {
  const rest = rows.slice(3);
  if (!rest.length && rows.length <= 3) return '';
  const body = rest.length ? rest.map((row, i) => {
    const rk = startRank + i;
    return `<li class="${meUid && row.uid === meUid ? 'me' : ''}">
      <span class="lb-rk">${rk}</span>
      ${nameHtml(row, meUid, opts)}
      <span class="lb-time">${row.seconds != null ? fmtElapsed(row.seconds) : '—'}</span>
      <span class="lb-sc">${row.best}<small>/${row.total}</small></span>
      <span class="lb-date">${fmtWhen(row.at)}</span>
    </li>`;
  }).join('') : (rows.length ? '' : '');
  if (!body && rows.length) return '';
  const head = rows.length > 3 ? `<div class="lb-colhead" aria-hidden="true">
    <span class="lb-rk">#</span><span>Name</span><span>Time</span><span>Score</span><span>When</span>
  </div>` : '';
  return `${head}<ol class="lb-list" start="${startRank}">${body}</ol>`;
}

export function renderLeaderboardPanel(rows, opts = {}) {
  const meUid = opts.meUid || null;
  const modeLabel = opts.mode === 'timed' ? 'Timed' : opts.mode === 'chill' ? 'No pressure' : (opts.modeLabel || '');
  const ui = { plainNames: !!opts.plainNames };
  let header = '';
  if (!opts.compactQuiz) {
    header = `<header class="lb-h">
      <span class="lb-heading">${esc(opts.heading || 'Leaderboard')}</span>
      ${modeLabel ? `<span class="lb-mode">${modeLabel}</span>` : ''}
    </header>`;
  }
  let sub = '';
  if (opts.sub === false || opts.compactQuiz) {
    sub = '';
  } else if (opts.sub === '' || opts.sub == null) {
    sub = `<p class="lb-sub">${esc('Higher score first. Same score: faster time wins.')}</p>`;
  } else {
    sub = `<p class="lb-sub">${esc(opts.sub)}</p>`;
  }
  return `<div class="lb-panel${opts.compactQuiz ? ' lb-panel-compact' : ''}">
    ${header}${sub}
    ${rows.length ? renderPodium(rows, meUid, ui) : renderPodium([], meUid, ui)}
    ${renderTable(rows, meUid, 4, ui)}
  </div>`;
}

/* ---------- page wiring ---------- */
async function paintQuizPage() {
  const root = document.getElementById('quizLb');
  if (!root || !fb) return;
  const slug = new URLSearchParams(location.search).get('q');
  const all = window.QUIZZES || [];
  let Q = all.find((x) => x.slug === slug)
    || (slug && slug.startsWith('line-game') && all.find((x) => x.type === 'lines'))
    || null;
  if (!Q) return;

  const modes = Q.modes || ['timed', 'chill'];
  let mode = Q.mode && modes.includes(Q.mode) ? Q.mode : modes[0];
  const modesEl = document.getElementById('lbModes');
  const body = document.getElementById('quizLbBody');

  const drawModes = () => {
    if (!modesEl || modes.length < 2) {
      if (modesEl) modesEl.hidden = true;
      return;
    }
    modesEl.hidden = false;
    modesEl.innerHTML = modes.map((m) =>
      `<button type="button" class="lb-tab" data-m="${m}" aria-pressed="${m === mode}">${m === 'timed' ? 'Timed' : 'No pressure'}</button>`
    ).join('');
    modesEl.querySelectorAll('.lb-tab').forEach((btn) => {
      btn.onclick = () => {
        mode = btn.dataset.m;
        modesEl.querySelectorAll('.lb-tab').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mode)));
        load();
      };
    });
  };

  const syncTitle = () => {
    const h = document.getElementById('quizLbTitle');
    if (!h) return;
    if (modes.length < 2) {
      h.textContent = mode === 'timed' ? 'Leaderboard · Timed' : 'Leaderboard · No pressure';
    } else {
      h.textContent = 'Leaderboard';
    }
  };

  const load = async () => {
    if (!body) return;
    syncTitle();
    body.innerHTML = '<p class="lb-loading">Loading…</p>';
    try {
      const id = boardIdFromQuiz(Q, mode);
      const rows = await fetchBoard(id, 15);
      const meUid = fb.auth?.currentUser?.uid || null;
      body.innerHTML = renderLeaderboardPanel(rows, {
        compactQuiz: true,
        mode: modes.length < 2 ? mode : undefined,
        meUid,
        sub: false
      });
    } catch (e) {
      console.warn(e);
      body.innerHTML = '<p class="lb-empty">Leaderboard is not available right now.</p>';
    }
  };

  drawModes();
  await load();
  document.addEventListener('dcm:lb-refresh', load);
}

async function paintHubPreview() {
  const root = document.getElementById('hubLb');
  if (!root || !fb) return;
  const picks = (window.QUIZZES || []).filter((q) => q.featured || q.pin).slice(0, 3);
  if (!picks.length) {
    root.hidden = true;
    return;
  }
  root.hidden = false;
  const cards = await Promise.all(picks.map(async (q) => {
    const mode = (q.modes || ['timed']).includes('timed') ? 'timed' : (q.modes || ['chill'])[0];
    try {
      const rows = await fetchBoard(boardIdFromQuiz(q, mode), 5);
      return `<div class="hub-lb-card">
        ${renderLeaderboardPanel(rows, { heading: q.title, mode, plainNames: true })}
        <a class="ghost hub-lb-play" href="play.html?q=${encodeURIComponent(q.slug)}#quizLb">Play this quiz</a>
      </div>`;
    } catch (e) {
      console.warn(e);
      return '';
    }
  }));
  const html = cards.filter(Boolean);
  root.querySelector('.hub-lb-grid').innerHTML = html.length
    ? html.join('')
    : '<p class="lb-empty">No scores yet. Be the first on the board.</p>';
}

async function paintLeaderboardPage() {
  const root = document.getElementById('allLb');
  if (!root || !fb) return;
  const qs = (window.QUIZZES || []).filter((q) => q.type !== 'lines' || q.slug === 'line-game');
  root.innerHTML = '<p class="lb-loading">Loading leaderboards…</p>';
  const chunks = await Promise.all(qs.map(async (q) => {
    const mode = (q.modes || ['timed']).includes('timed') ? 'timed' : (q.modes || ['chill'])[0];
    try {
      const rows = await fetchBoard(boardIdFromQuiz(q, mode), 10);
      return `<div class="hub-lb-card">
        ${renderLeaderboardPanel(rows, { heading: q.title, mode, plainNames: true })}
        <a class="ghost hub-lb-play" href="play.html?q=${encodeURIComponent(q.slug)}#quizLb">Play this quiz</a>
      </div>`;
    } catch (e) {
      return '';
    }
  }));
  const html = chunks.filter(Boolean);
  root.innerHTML = html.length
    ? `<div class="hub-lb-grid">${html.join('')}</div>`
    : '<p class="lb-empty">No scores yet. Play a quiz and post your name.</p>';
}

export function initPages() {
  if (!fb) return;
  if (document.getElementById('quizLb')) paintQuizPage();
  if (document.getElementById('hubLb')) paintHubPreview();
  if (document.getElementById('allLb')) paintLeaderboardPage();
}

export function refreshQuizLeaderboard() {
  document.dispatchEvent(new CustomEvent('dcm:lb-refresh'));
}
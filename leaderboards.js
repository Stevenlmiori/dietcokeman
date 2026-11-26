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

/* Homepage: the overall top players, two short lists (Steven, 2026-11-26:
   "most Golds, and most podiums"). Same counting as the Leaderboards page
   (buildStandings: a gold is a #1 finish on a quiz, best placing across modes).
   It reads every board, so it waits until the section is near the screen. */
async function paintHubPreview() {
  const root = document.getElementById('hubLb');
  if (!root || !fb) return;
  const go = async () => {
    const boards = await loadEverything(window.QUIZZES || []);
    const standings = buildStandings(boards);
    if (!standings.length) { root.hidden = true; return; }
    const me = fb.auth && fb.auth.currentUser ? fb.auth.currentUser.uid : null;
    const list = (key, other, label) => {
      const rows = standings.filter((p) => p[key] > 0)
        .sort((x, y) => y[key] - x[key] || y[other] - x[other] || x.name.localeCompare(y.name))
        .slice(0, 5);
      return `<div class="hub-lb-col"><h3>${label}</h3><ol>${rows.map((p, i) => `<li>
        <span class="rk">${i + 1}</span>${playerLink(p, me)}<b>${p[key]}</b></li>`).join('')
        || '<li class="none">Nobody yet</li>'}</ol></div>`;
    };
    root.querySelector('.hub-lb-list').innerHTML = list('crowns', 'podiums', '🥇 Most golds') + list('podiums', 'crowns', '🏅 Most podiums');
    root.hidden = false;
  };
  root.hidden = false;
  if (!('IntersectionObserver' in window)) { go(); return; }
  const io = new IntersectionObserver((ents) => {
    if (ents.some((e) => e.isIntersecting)) { io.disconnect(); go(); }
  }, { rootMargin: '600px 0px' });
  io.observe(root);
}

/* ---------- leaderboard page (overall + every quiz) ---------- */
const MODE_NAME = { timed: 'Timed', chill: 'No pressure' };
const MEDAL = ['🥇', '🥈', '🥉'];

function relTime(at) {
  if (!at) return '';
  const t = typeof at.toDate === 'function' ? at.toDate().getTime()
    : at.seconds ? at.seconds * 1000 : new Date(at).getTime();
  if (!t || Number.isNaN(t)) return '';
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return fmtWhen(at);
}
const atMs = (at) => (at && at.seconds ? at.seconds * 1000 : 0);

function playerLink(p, meUid) {
  const label = esc(p.name);
  const cls = `lbx-who${meUid && p.uid === meUid ? ' me' : ''}`;
  return p.username && !p.guest
    ? `<a class="${cls}" href="profile.html?u=${encodeURIComponent(p.username)}">${label}</a>`
    : `<span class="${cls}">${label}</span>`;
}

const plural = (n, w) => `${n} ${n === 1 ? w : (w === 'quiz' ? 'quizzes' : w + 's')}`;

async function loadEverything(quizzes) {
  const jobs = [];
  quizzes.forEach((q) => ['timed', 'chill'].forEach((mode) => {
    jobs.push(fetchBoard(boardIdFromQuiz(q, mode), 100)
      .then((rows) => ({ q, mode, rows }))
      .catch(() => ({ q, mode, rows: [] })));
  }));
  const res = await Promise.all(jobs);
  return quizzes.map((q) => {
    const byMode = {};
    res.filter((r) => r.q === q).forEach((r) => { byMode[r.mode] = r.rows; });
    const modes = ['timed', 'chill'].filter((m) => byMode[m] && byMode[m].length);
    const main = modes.slice().sort((a, b) => byMode[b].length - byMode[a].length)[0] || null;
    const uids = new Set();
    modes.forEach((m) => byMode[m].forEach((r) => uids.add(r.uid)));
    return { q, byMode, modes, main, players: uids.size };
  });
}

function buildStandings(boards) {
  const P = new Map();
  const touch = (row) => {
    let p = P.get(row.uid);
    if (!p) {
      p = { uid: row.uid, name: rowName(row), username: row.username, guest: row.guest === true,
        crowns: 0, podiums: 0, quizzes: 0, pct: 0, lastAt: 0 };
      P.set(row.uid, p);
    }
    const t = atMs(row.at);
    if (t >= p.lastAt) {
      p.lastAt = t; p.name = rowName(row); p.username = row.username; p.guest = row.guest === true;
    }
    return p;
  };
  boards.forEach((b) => {
    const bestRank = new Map(); // uid -> best placing on this quiz across modes
    const bestPct = new Map();
    b.modes.forEach((m) => b.byMode[m].forEach((row, i) => {
      touch(row);
      if (!bestRank.has(row.uid) || i < bestRank.get(row.uid)) bestRank.set(row.uid, i);
      const pct = row.total ? row.best / row.total : 0;
      bestPct.set(row.uid, Math.max(bestPct.get(row.uid) || 0, pct));
    }));
    bestRank.forEach((rk, uid) => {
      const p = P.get(uid);
      p.quizzes += 1;
      p.pct += bestPct.get(uid) || 0;
      if (rk === 0) p.crowns += 1;
      if (rk < 3) p.podiums += 1;
    });
  });
  return [...P.values()]
    .map((p) => ({ ...p, avg: p.quizzes ? p.pct / p.quizzes : 0 }))
    .sort((a, b) => b.crowns - a.crowns || b.podiums - a.podiums
      || b.quizzes - a.quizzes || b.avg - a.avg || a.name.localeCompare(b.name));
}

function renderOverall(list, meUid, showAll) {
  if (!list.length) {
    return '<p class="lbx-empty">No scores yet. Play any quiz and post your name to get on the board.</p>';
  }
  const top = list.slice(0, 3);
  const order = top.length === 3 ? [1, 0, 2] : top.length === 2 ? [1, 0] : [0];
  const podium = `<ol class="lbx-podium" data-n="${top.length}">${order.map((i) => {
    const p = top[i];
    return `<li class="lbx-step lbx-step-${i + 1}${meUid && p.uid === meUid ? ' me' : ''}">
      <span class="lbx-medal" aria-label="Rank ${i + 1}">${MEDAL[i]}</span>
      ${playerLink(p, meUid)}
      <span class="lbx-big">${p.crowns}<small>${p.crowns === 1 ? 'crown' : 'crowns'}</small></span>
      <span class="lbx-fine"><span>${plural(p.podiums, 'podium')}</span><span>${plural(p.quizzes, 'quiz')}</span></span>
    </li>`;
  }).join('')}</ol>`;
  const rest = list.slice(3, showAll ? list.length : 10);
  const rows = rest.length ? `<div class="lbx-table">
    <div class="lbx-thead" aria-hidden="true"><span>#</span><span>Player</span><span title="#1 finishes">👑</span><span title="Top-3 finishes">Top 3</span><span>Quizzes</span></div>
    <ol class="lbx-rows" start="4">${rest.map((p, i) => `<li class="${meUid && p.uid === meUid ? 'me' : ''}">
      <span class="lbx-rk">${i + 4}</span>${playerLink(p, meUid)}
      <span class="lbx-n${p.crowns ? '' : ' zero'}">${p.crowns}</span>
      <span class="lbx-n${p.podiums ? '' : ' zero'}">${p.podiums}</span>
      <span class="lbx-n">${p.quizzes}</span></li>`).join('')}</ol>
  </div>` : '';
  const more = list.length > 10
    ? `<button type="button" class="lbx-more" data-act="all">${showAll ? 'Show top 10' : `Show all ${list.length} players`}</button>` : '';
  let mine = '';
  const myIdx = meUid ? list.findIndex((p) => p.uid === meUid) : -1;
  if (myIdx >= 10 && !showAll) {
    const p = list[myIdx];
    mine = `<p class="lbx-you">You're <b>#${myIdx + 1}</b> overall · ${plural(p.crowns, 'crown')}, ${plural(p.quizzes, 'quiz')} played</p>`;
  }
  return podium + rows + mine + more;
}

function renderRecent(boards, meUid) {
  const all = [];
  boards.forEach((b) => b.modes.forEach((m) => b.byMode[m].forEach((row, i) => {
    all.push({ row, rank: i + 1, b, m });
  })));
  all.sort((a, b) => atMs(b.row.at) - atMs(a.row.at));
  const items = all.slice(0, 7);
  if (!items.length) return '<p class="lbx-empty">Nothing yet.</p>';
  return `<ul class="lbx-feed">${items.map(({ row, rank, b }) => {
    const p = { uid: row.uid, name: rowName(row), username: row.username, guest: row.guest === true };
    return `<li>
      <div class="lbx-feed-top">${playerLink(p, meUid)}<span class="lbx-score">${rank <= 3 ? `<i class="lbx-fm" title="#${rank} on this quiz">${MEDAL[rank - 1]}</i>` : ''}<b>${row.best}</b>/${row.total}</span></div>
      <div class="lbx-feed-sub"><a href="play.html?q=${encodeURIComponent(b.q.slug)}">${esc(b.q.title)}</a><span class="lbx-when">${relTime(row.at)}</span></div>
    </li>`;
  }).join('')}</ul>`;
}

function renderBoardDetail(b, mode, meUid) {
  const rows = (b.byMode[mode] || []).slice(0, 10);
  const tabs = b.modes.length > 1 ? `<div class="lbx-tabs" role="tablist">${b.modes.map((m) =>
    `<button type="button" role="tab" class="lbx-tabb" data-act="mode" data-m="${m}" aria-selected="${m === mode}">${MODE_NAME[m]}</button>`
  ).join('')}</div>` : `<div class="lbx-tabs"><span class="lbx-modename">${MODE_NAME[mode]}</span></div>`;
  const list = `<ol class="lbx-ranks">${rows.map((row, i) => {
    const p = { uid: row.uid, name: rowName(row), username: row.username, guest: row.guest === true };
    return `<li class="${meUid && row.uid === meUid ? 'me' : ''}">
      <span class="lbx-rk">${i < 3 ? MEDAL[i] : i + 1}</span>${playerLink(p, meUid)}
      <span class="lbx-time">${row.seconds != null ? fmtElapsed(row.seconds) : ''}</span>
      <span class="lbx-score"><b>${row.best}</b>/${row.total}</span>
    </li>`;
  }).join('')}</ol>`;
  const n = (b.byMode[mode] || []).length;
  return `${tabs}${list}<div class="lbx-detail-foot">
    <span>${n > 10 ? `Top 10 of ${n}` : ''}</span>
    <a class="lbx-play" href="play.html?q=${encodeURIComponent(b.q.slug)}#quizLb">Play this quiz →</a>
  </div>`;
}

function renderBoardRow(b, meUid, open, mode) {
  const lead = b.byMode[b.main][0];
  const p = { uid: lead.uid, name: rowName(lead), username: lead.username, guest: lead.guest === true };
  const mine = meUid && b.modes.some((m) => b.byMode[m].some((r) => r.uid === meUid));
  return `<li class="lbx-board${open ? ' open' : ''}" data-slug="${esc(b.q.slug)}">
    <button type="button" class="lbx-bhead" data-act="toggle" aria-expanded="${open}">
      <span class="lbx-btitle"><b>${esc(b.q.title)}</b><small>${esc(b.q.category || '')}${mine ? ' · <em>You’re on it</em>' : ''}</small></span>
      <span class="lbx-blead"><span class="lbx-crown" aria-hidden="true">👑</span><span class="lbx-who-plain${meUid && lead.uid === meUid ? ' me' : ''}">${esc(p.name)}</span><span class="lbx-score"><b>${lead.best}</b>/${lead.total}</span></span>
      <span class="lbx-bplayers">${plural(b.players, 'player')}</span>
      <svg class="lbx-chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    ${open ? `<div class="lbx-detail">${renderBoardDetail(b, mode, meUid)}</div>` : ''}
  </li>`;
}

async function paintLeaderboardPage() {
  const root = document.getElementById('allLb');
  if (!root || !fb) return;
  const quizzes = (window.QUIZZES || []).filter((q) => q.type !== 'lines' || q.slug === 'line-game');
  const boards = await loadEverything(quizzes);
  const state = { showAll: false, open: new Map(), cat: 'All', term: '' };
  const meUid = () => fb.auth?.currentUser?.uid || null;

  const played = boards.filter((b) => b.modes.length);
  const empty = boards.filter((b) => !b.modes.length);
  played.sort((a, b) => b.players - a.players || a.q.title.localeCompare(b.q.title));
  const cats = {};
  boards.forEach((b) => { const c = b.q.category || 'Other'; cats[c] = (cats[c] || 0) + 1; });
  const catList = ['All', ...Object.keys(cats).sort((a, b) => cats[b] - cats[a] || a.localeCompare(b))];

  const stats = { players: 0, scores: 0 };
  {
    const u = new Set();
    played.forEach((b) => b.modes.forEach((m) => b.byMode[m].forEach((r) => { u.add(r.uid); stats.scores += 1; })));
    stats.players = u.size;
  }

  root.innerHTML = `
    <div class="lbx-stats">
      <div><b>${stats.players}</b><span>players</span></div>
      <div><b>${stats.scores}</b><span>scores posted</span></div>
      <div><b>${played.length}<small>/${boards.length}</small></b><span>quizzes claimed</span></div>
    </div>
    <div class="lbx-grid">
      <section class="lbx-card lbx-overall" aria-labelledby="lbxOverallH">
        <header class="lbx-h"><h2 id="lbxOverallH">Overall</h2><p>Ranked by #1 finishes, then top-3s, then quizzes played.</p></header>
        <div id="lbxOverall"></div>
      </section>
      <section class="lbx-card lbx-recent" aria-labelledby="lbxRecentH">
        <header class="lbx-h"><h2 id="lbxRecentH">Latest scores</h2></header>
        <div id="lbxRecent"></div>
      </section>
    </div>
    <section class="lbx-all" aria-labelledby="lbxAllH">
      <header class="lbx-h lbx-h-row"><h2 id="lbxAllH">Every quiz</h2><p>Higher score wins. Same score, faster time wins. Tap a quiz for its top 10.</p></header>
      <div class="lbx-tools">
        <input class="find lbx-find" type="search" placeholder="Search quizzes" aria-label="Search quizzes" autocomplete="off">
        <div class="lbx-cats">${catList.map((c) => `<button type="button" class="facet" data-cat="${esc(c)}" aria-pressed="${c === 'All'}">${esc(c)}</button>`).join('')}</div>
      </div>
      <ul class="lbx-boards" id="lbxBoards"></ul>
      <div id="lbxEmpty"></div>
    </section>`;

  const $ = (id) => document.getElementById(id);
  const match = (b) => (state.cat === 'All' || (b.q.category || 'Other') === state.cat)
    && (!state.term || b.q.title.toLowerCase().includes(state.term));

  const drawOverall = () => { $('lbxOverall').innerHTML = renderOverall(buildStandings(played), meUid(), state.showAll); };
  const drawRecent = () => { $('lbxRecent').innerHTML = renderRecent(played, meUid()); };
  const drawBoards = () => {
    const me = meUid();
    const shown = played.filter(match);
    const unclaimed = empty.filter(match);
    $('lbxBoards').innerHTML = shown.map((b) =>
      renderBoardRow(b, me, state.open.has(b.q.slug), state.open.get(b.q.slug) || b.main)).join('');
    $('lbxEmpty').innerHTML = unclaimed.length ? `<div class="lbx-unclaimed">
        <h3>Up for grabs <span>No scores yet — be the first</span></h3>
        <div class="lbx-chips">${unclaimed.map((b) => `<a href="play.html?q=${encodeURIComponent(b.q.slug)}">${esc(b.q.title)}</a>`).join('')}</div>
      </div>` : '';
    if (!shown.length && !unclaimed.length) $('lbxBoards').innerHTML = '<li class="lbx-empty">No quizzes match.</li>';
  };
  const drawAll = () => { drawOverall(); drawRecent(); drawBoards(); };

  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act],[data-cat]');
    if (!t || !root.contains(t)) return;
    if (t.dataset.cat) {
      state.cat = t.dataset.cat;
      root.querySelectorAll('.lbx-cats .facet').forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.cat === state.cat)));
      drawBoards();
      return;
    }
    const act = t.dataset.act;
    if (act === 'all') { state.showAll = !state.showAll; drawOverall(); return; }
    const li = t.closest('.lbx-board');
    const slug = li && li.dataset.slug;
    const b = slug && played.find((x) => x.q.slug === slug);
    if (!b) return;
    if (act === 'toggle') {
      if (state.open.has(slug)) state.open.delete(slug); else state.open.set(slug, b.main);
    } else if (act === 'mode') {
      state.open.set(slug, t.dataset.m);
    }
    li.outerHTML = renderBoardRow(b, meUid(), state.open.has(slug), state.open.get(slug) || b.main);
  });
  root.querySelector('.lbx-find').addEventListener('input', (e) => {
    state.term = e.target.value.trim().toLowerCase();
    drawBoards();
  });
  if (fb.onAuthStateChanged) fb.onAuthStateChanged(fb.auth, drawAll);
  drawAll();
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
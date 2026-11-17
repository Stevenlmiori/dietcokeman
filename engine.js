/* ===========================================================
   DietCokeMan Challenge — quiz engine
   =========================================================== */
(function () {
'use strict';

const $ = (id) => document.getElementById(id);
const SUFFIX = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);
const NOISE  = new Set(['the', 'a', 'an', 'of', 'and']);

/* ---------- text normalising ---------- */
// "Amon-Ra St. Brown" -> "amonrastbrown"
function norm(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '');
}
// "Amon-Ra St. Brown" -> ["amonra","st","brown"]  (hyphens stay inside a word)
function words(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z0-9]+/g, '')).filter(Boolean);
}

/* Every spelling we will accept for one answer.

   Length floors matter here. An earlier version accepted *any* word of a
   multi-word answer, which meant "st" alone unlocked Amon-Ra St. Brown and
   "me" unlocked Dont Tread On Me. Particles and connectors only count as part
   of a larger key now; a bare word has to be long enough to be a real guess. */
function keysFor(item) {
  const keys = new Set();
  const add = (s, min) => { const k = norm(s); if (k.length >= (min || 2)) keys.add(k); };

  add(item.a);                                        // exactly as written, suffix included
  const core = words(item.a).filter(x => !SUFFIX.has(x));
  const real = core.filter(x => !NOISE.has(x));       // drop "the", "of", "and"...

  if (core.length) add(core.join(''));                // full name, suffix dropped
  if (real.length) {
    add(real.join(''));                               // "The Goods" -> "goods"
    add(real[0]);                                     // first name / first word
    if (real.length > 1) {
      add(real.slice(1).join(''));                    // surname, compounds kept whole
      add(real[real.length - 1], 3);                  // final word alone, if it isn't a particle
      real.forEach(x => add(x, 4));                   // any other word, only if it stands on its own
    }
  }
  (item.alias || []).forEach(a => add(a));
  return keys;
}

/* ---------- fuzzy ---------- */
function lev(a, b, cap) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const c = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      cur[j] = c;
      if (c < best) best = c;
    }
    if (best > cap) return cap + 1;
    prev = cur;
  }
  return prev[b.length];
}
// forgiving, but tightens up on short words so "bass" can't become "base"
function close(guess, key) {
  if (guess === key) return true;
  if (guess.length < 5 || key.length < 5) return false;
  const cap = guess.length >= 8 ? 2 : 1;
  if (Math.abs(guess.length - key.length) > cap) return false;
  return lev(guess, key, cap) <= cap;
}

/* ---------- state ---------- */
let Q = null, items = [], mode = 'timed', total = 0;
let filled = new Set(), wrong = 0, left = 0, timer = null, running = false, startedAt = 0;

function bestKey() { return 'dcm-best-' + Q.slug + '-' + mode; }
function getBest() { try { return parseInt(localStorage.getItem(bestKey()) || '0', 10) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(bestKey(), String(v)); } catch (e) {} }

function fmt(sec) {
  sec = Math.max(0, Math.ceil(sec));
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
}

/* ---------- board ---------- */
function buildBoard() {
  const board = $('board');
  board.className = 'board' + (Q.cols === 'single' ? ' single' : '') + (Q.hideSub ? ' hidesub' : '');
  board.innerHTML = Q.groups.map((g, gi) => {
    const rows = g.items.map((it) => {
      const i = it._i;
      return `<div class="row" id="row-${i}">
        <span class="rk">${esc(it.rk != null ? it.rk : String(it._n))}</span>
        <span class="nm blank" id="nm-${i}">${esc(it.a)}</span>
        ${it.sub ? `<span class="sub2">${esc(it.sub)}</span>` : ''}
        ${it.hint ? `<span class="hintv">${esc(it.hint)}</span>` : ''}
      </div>`;
    }).join('');
    return `<section class="grp"><h4>${esc(g.name)}${g.note ? `<em>${esc(g.note)}</em>` : ''}</h4>${rows}</section>`;
  }).join('');
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- matching ---------- */
/* An exact key always beats a fuzzy one. Without this, typing the whole name
   "Jim Brown" came back ambiguous because "timbrown" is a single edit away, and
   "payton" pulled in Peyton Manning alongside Walter Payton. Fuzzy is only
   consulted when nothing matched exactly. */
function findMatches(raw) {
  const g = norm(raw);
  if (g.length < 2) return { hits: [], already: false };
  const exact = [], fuzzy = [];
  let exactDone = false, fuzzyDone = false;
  for (const it of items) {
    let ex = false, fz = false;
    for (const k of it._keys) {
      if (g === k) { ex = true; break; }
      if (!fz && close(g, k)) fz = true;
    }
    if (!ex && !fz) continue;
    if (filled.has(it._i)) { if (ex) exactDone = true; else fuzzyDone = true; continue; }
    (ex ? exact : fuzzy).push(it);
  }
  if (exact.length || exactDone) return { hits: exact, already: exactDone };
  return { hits: fuzzy, already: fuzzyDone };
}

function reveal(it, how) {
  filled.add(it._i);
  const row = $('row-' + it._i), nm = $('nm-' + it._i);
  if (row) { row.classList.add('got'); if (how !== 'quiet') row.classList.add('just'); }
  if (nm) nm.classList.remove('blank');
  updateStats();
  if (filled.size === total) end('swept');
}

function toast(msg, cls) {
  const t = $('toast');
  t.textContent = msg || '';
  t.className = 'toast' + (cls ? ' ' + cls : '');
}

/* ---------- input ---------- */
function onInput() {
  if (!running) return;
  const box = $('guess');
  const { hits, already } = findMatches(box.value);
  // One name sweeps everyone who shares it, across every section of the board:
  // "Manning" takes Peyton and Eli, "Brown" takes Jim and Tim.
  if (hits.length) {
    hits.forEach(reveal);
    box.value = '';
    box.classList.remove('bad'); box.classList.add('good');
    setTimeout(() => box.classList.remove('good'), 420);
    toast(hits.length === 1
      ? 'Got it — ' + hits[0].a
      : 'Got ' + hits.length + ' — ' + hits.map(h => h.a).join(' + '), 'ok');
    return;
  }
  if (already && norm(box.value).length > 3) { toast('Already on the board', 'hint'); return; }
  toast('');
}

function onSubmit(e) {
  if (e) e.preventDefault();
  if (!running) return;
  const box = $('guess');
  const raw = box.value.trim();
  if (!raw) return;
  const { hits, already } = findMatches(raw);
  if (hits.length) { onInput(); return; }
  if (already) { toast('Already on the board', 'hint'); box.value = ''; return; }

  // a genuine miss
  wrong++;
  box.classList.remove('good'); box.classList.add('bad');
  setTimeout(() => box.classList.remove('bad'), 360);
  box.value = '';
  toast('“' + raw + '” isn’t on the board', 'no');
  updateStats();
  if (mode === 'lives' && wrong >= Q.lives) end('out');
}

/* ---------- stats ---------- */
function updateStats() {
  $('sc').textContent = filled.size;
  $('scTot').textContent = '/' + total;
  const pct = total ? (filled.size / total) * 100 : 0;
  $('pbar').style.width = pct + '%';

  const box = $('statRight');
  if (mode === 'lives') {
    const rem = Math.max(0, Q.lives - wrong);
    box.innerHTML = `<b>${rem}</b><small>Lives</small>`;
    box.classList.toggle('danger', rem <= 2);
  } else if (mode === 'timed') {
    box.innerHTML = `<b>${fmt(left)}</b><small>Time</small>`;
    box.classList.toggle('danger', left <= 30);
  } else {
    box.innerHTML = `<b>${wrong}</b><small>Misses</small>`;
  }
}

/* ---------- lifecycle ---------- */
function start() {
  filled = new Set(); wrong = 0; left = Q.time; running = true; startedAt = Date.now();
  $('pre').hidden = true;
  $('live').hidden = false;
  $('giveup').hidden = false;
  buildBoard();                      // clears anything a previous run revealed
  updateStats();
  toast('');
  const gu = $('giveup');
  gu.textContent = 'Give up & reveal';
  delete gu.dataset.done;
  const box = $('guess');
  box.value = '';
  box.disabled = false;
  // a tick of delay keeps iOS from fighting the keyboard
  setTimeout(() => box.focus({ preventScroll: true }), 60);
  if (mode === 'timed') {
    clearInterval(timer);
    timer = setInterval(() => {
      left -= 1;
      updateStats();
      if (left <= 0) end('time');
    }, 1000);
  }
}

/* Back to "pick a mode and press play", with the board blank again. */
function reset() {
  running = false;
  clearInterval(timer);
  filled = new Set(); wrong = 0; left = Q.time;
  $('pre').hidden = false;
  $('live').hidden = true;
  const gu = $('giveup');
  gu.hidden = true;
  gu.textContent = 'Give up & reveal';
  delete gu.dataset.done;
  const box = $('guess');
  box.value = ''; box.disabled = false;
  buildBoard();
  updateStats();
  toast('');
  showBest();
}

function end(reason) {
  if (!running) return;
  running = false;
  clearInterval(timer);
  $('guess').disabled = true;

  const elapsed = Math.round((Date.now() - startedAt) / 1000);
  items.forEach(it => {
    if (!filled.has(it._i)) {
      const row = $('row-' + it._i), nm = $('nm-' + it._i);
      if (row) row.classList.add('miss');
      if (nm) nm.classList.remove('blank');
    }
  });

  const score = filled.size;
  const prevBest = getBest();
  const isBest = score > prevBest;
  if (isBest) setBest(score);

  const heads = {
    swept: ['Perfect run.', 'You cleared the whole board. Ice cold.'],
    time:  ['Time!', 'The clock got you.'],
    out:   ['Out of lives.', 'Ten strikes and it’s over.'],
    gave:  ['Called it.', 'Here’s everything you missed.']
  };
  const h = heads[reason] || heads.gave;
  $('mTitle').textContent = h[0];
  $('mVerdict').textContent = h[1];
  $('mScore').innerHTML = score + '<small>/' + total + '</small>';
  $('mPct').textContent = Math.round((score / total) * 100) + '% of the board'
    + (isBest ? ' · new personal best' : prevBest ? ' · your best is ' + prevBest : '');

  const bits = [];
  if (mode === 'timed') bits.push(`<span class="pill">${reason === 'time' ? 'Full ' + fmt(Q.time) : fmt(elapsed) + ' used'}</span>`);
  if (mode === 'lives') bits.push(`<span class="pill">${wrong} miss${wrong === 1 ? '' : 'es'}</span>`);
  if (mode === 'chill') bits.push(`<span class="pill">${fmt(elapsed)}</span>`, `<span class="pill">${wrong} miss${wrong === 1 ? '' : 'es'}</span>`);
  if (isBest) bits.push('<span class="pill">Personal best</span>');
  $('mStats').innerHTML = bits.join('');

  window._share = `DietCokeMan Challenge — ${Q.title}\n${score}/${total} (${Math.round((score / total) * 100)}%)` +
    (mode === 'timed' ? ` in ${fmt(elapsed)}` : mode === 'lives' ? ` · ${wrong} misses` : '') +
    `\n${location.origin}${location.pathname}?q=${Q.slug}`;

  const gu = $('giveup');
  gu.textContent = 'Show results';
  gu.dataset.done = '1';
  $('scrim').classList.add('on');
}

/* ---------- boot ---------- */
function boot() {
  const slug = new URLSearchParams(location.search).get('q');
  Q = (window.QUIZZES || []).find(x => x.slug === slug) || (window.QUIZZES || [])[0];
  if (!Q) { document.body.innerHTML = '<p style="padding:40px;text-align:center">No quiz found.</p>'; return; }

  // flatten + index
  let n = 0;
  items = [];
  Q.groups.forEach(g => g.items.forEach(it => {
    it._i = items.length;
    it._n = (++n);
    it._keys = keysFor(it);
    items.push(it);
  }));
  // restart per-group numbering when the board is split into groups
  if (Q.cols !== 'single') { Q.groups.forEach(g => g.items.forEach((it, k) => { it._n = k + 1; })); }
  total = items.length;

  document.title = Q.title + ' · DietCokeMan Challenge';
  $('qTitle').textContent = Q.title;
  $('qSub').textContent = Q.blurb || Q.sub;
  $('mTime').textContent = fmt(Q.time);
  $('mLives').textContent = Q.lives;

  // A quiz can offer only some modes — survival makes no sense on a 60-answer list.
  const allowed = Q.modes || ['timed', 'lives', 'chill'];
  mode = allowed.includes(Q.mode) ? Q.mode : allowed[0];
  document.querySelectorAll('.mode').forEach(b => {
    b.hidden = !allowed.includes(b.dataset.m);
    b.setAttribute('aria-pressed', String(b.dataset.m === mode));
    b.addEventListener('click', () => {
      if (running) return;
      mode = b.dataset.m;
      document.querySelectorAll('.mode').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      updateStats();                 // the right-hand chip follows the chosen mode
      showBest();
    });
  });

  // The whole point: the board is on screen before anything is pressed, with the
  // score and the clock already reading their starting values.
  left = Q.time;
  buildBoard();
  updateStats();
  showBest();

  $('go').addEventListener('click', start);
  $('live').addEventListener('submit', onSubmit);
  $('guess').addEventListener('input', onInput);
  $('giveup').addEventListener('click', () => {
    if (running) end('gave');
    else if ($('giveup').dataset.done) $('scrim').classList.add('on');   // bring the card back
  });
  // The result card sits on top of the very board it is talking about, so there has
  // to be a way past it: the X, the review button, the backdrop and Escape all step
  // aside and leave the revealed answers on screen.
  const closeModal = (scrollToMiss) => {
    $('scrim').classList.remove('on');
    if (scrollToMiss) {
      const first = document.querySelector('.row.miss');
      if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };
  $('mclose').addEventListener('click', () => closeModal(false));
  $('review').addEventListener('click', () => closeModal(true));
  $('scrim').addEventListener('click', (e) => { if (e.target === $('scrim')) closeModal(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('scrim').classList.contains('on')) closeModal(false);
  });
  $('again').addEventListener('click', () => {
    $('scrim').classList.remove('on');
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window._share || '');
      $('copy').textContent = 'Copied!';
      setTimeout(() => { $('copy').textContent = 'Copy my result'; }, 1600);
    } catch (e) {
      $('copy').textContent = 'Press ⌘C';
    }
  });
  // tapping the board refocuses the box so phone keyboards stay handy
  $('board').addEventListener('click', () => { if (running) $('guess').focus({ preventScroll: true }); });
}

function showBest() {
  const b = getBest();
  $('bestLine').textContent = b ? `Your best in this mode: ${b}/${total}` : '';
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

/* exposed for the console test harness */
window._dcm = {
  get state() { return { total, filled: filled.size, wrong, left, running, mode }; },
  findMatches, norm, keysFor, close,
  start,
  guess(s) { const b = $('guess'); b.value = s; onInput(); return { filled: filled.size, wrong }; },
  submit(s) { const b = $('guess'); b.value = s; onSubmit(); return { filled: filled.size, wrong }; },
  setMode(m) { mode = m; },
  items: () => items
};
})();

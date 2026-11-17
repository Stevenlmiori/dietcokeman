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
/* Optimal string alignment: Levenshtein, except that swapping two neighbouring
   letters costs one edit instead of two. "mccaffery" for "mccaffrey" is the
   typo people actually make, and plain Levenshtein scores it the same as two
   unrelated mistakes. */
function lev(a, b, cap) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev2 = null;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      let c = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        c = Math.min(c, prev2[j - 2] + 1);         // transposition
      }
      cur[j] = c;
      if (c < best) best = c;
    }
    if (best > cap) return cap + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

/* Deliberately mean, and only ever consulted when you press Enter.

   The old rules allowed one edit from five characters up and ran on every
   keystroke, which meant typing "Brock P" on the way to Brock Purdy silently
   handed you Brock Bowers — "brockp" and "brockb" are one edit apart. Credit
   for a player you were not even thinking of is worse than having to spell one
   correctly, so:

     - both strings at least 6 characters
     - the first letter has to be right (typos land in the middle, not the start)
     - lengths within one of each other
     - one edit below ten characters, two at ten and above

   A transposition counts as one edit, so the genuinely common slips still land
   while near-identical surnames no longer collide. */
function close(guess, key) {
  if (guess === key) return true;
  if (guess.length < 6 || key.length < 6) return false;
  if (guess[0] !== key[0]) return false;
  if (Math.abs(guess.length - key.length) > 1) return false;
  const cap = guess.length >= 10 ? 2 : 1;
  return lev(guess, key, cap) <= cap;
}

/* ---------- state ---------- */
let Q = null, items = [], allKeys = [], mode = 'timed', total = 0;
let filled = new Set(), wrong = 0, left = 0, spent = 0, timer = null, running = false, startedAt = 0;

/* ---------- line game ----------
   `type: 'lines'` quizzes do not use the name matcher at all. Each game gets a
   pair of favourite buttons and a spread box; nothing is graded until the
   player locks in (or the clock runs out). A guess is right when it lands
   within one point of the real line, measured from the home side, so picking
   the wrong favourite only survives on a game that is close to a pick'em. */
let picks = {}, graded = false, lockArmed = false;
const isLines = () => !!(Q && Q.type === 'lines');

function parsePts(raw) {
  const s = String(raw || '').trim().toLowerCase();
  if (!s) return null;
  if (s === 'pk' || s === 'pick' || s === 'pickem') return 0;
  const n = parseFloat(s.replace(/^[+-]/, ''));
  return isNaN(n) ? null : Math.abs(n);
}
function isPicked(i) {
  const p = picks[i];
  return !!(p && p.pts != null && (p.pts === 0 || p.fav));
}
function pickedCount() { return items.filter(it => isPicked(it._i)).length; }
// home-side spread: negative = home favoured
function guessLine(it) {
  const p = picks[it._i];
  if (p.pts === 0) return 0;
  return p.fav === it.hm ? -p.pts : p.pts;
}
function fmtLine(it, homeLine) {
  if (homeLine === 0) return 'PK';
  const n = String(Math.abs(homeLine));
  return homeLine < 0 ? it.hm + ' -' + n : it.aw + ' -' + n;
}
function lineRight(it) {
  return isPicked(it._i) && Math.abs(guessLine(it) - it.line) <= 1 + 1e-9;
}
function setLocked(locked) {
  document.querySelectorAll('#board .fv, #board .pts').forEach(el => { el.disabled = locked; });
}
function buildLinesBoard() {
  const board = $('board');
  board.className = 'board single lines';
  board.innerHTML = Q.groups.map(g => {
    const rows = g.items.map(it => {
      const i = it._i;
      return `<div class="row lrow" id="row-${i}">
        <span class="rk">${esc(String(it._n))}</span>
        <span class="nm mu">${esc(it.away)} <i>@</i> ${esc(it.home)}${it.where ? `<small class="where">${esc(it.where)}</small>` : ''}</span>
        <span class="lctl">
          <span class="fav" role="group" aria-label="Who is favored?">
            <button type="button" class="fv" data-i="${i}" data-t="${esc(it.aw)}" aria-pressed="false">${esc(it.aw)}</button>
            <button type="button" class="fv" data-i="${i}" data-t="${esc(it.hm)}" aria-pressed="false">${esc(it.hm)}</button>
          </span>
          <input class="pts" id="pts-${i}" data-i="${i}" type="text" inputmode="decimal" placeholder="pts"
                 maxlength="5" autocomplete="off" aria-label="Spread for ${esc(it.a)}">
        </span>
        <span class="actual" id="act-${i}"></span>
      </div>`;
    }).join('');
    return `<section class="grp"><h4>${esc(g.name)}${g.note ? `<em>${esc(g.note)}</em>` : ''}</h4>${rows}</section>`;
  }).join('');
  setLocked(!running);
}
function wireLinesBoard() {
  const board = $('board');
  board.addEventListener('click', (e) => {
    const b = e.target.closest('.fv');
    if (!b || !running) return;
    const i = +b.dataset.i;
    const p = picks[i] || (picks[i] = { fav: null, pts: null });
    p.fav = p.fav === b.dataset.t ? null : b.dataset.t;
    b.parentNode.querySelectorAll('.fv').forEach(o => o.setAttribute('aria-pressed', String(o.dataset.t === p.fav)));
    lockArmed = false;
    updateStats();
  });
  board.addEventListener('input', (e) => {
    const box = e.target.closest('.pts');
    if (!box || !running) return;
    const i = +box.dataset.i;
    const p = picks[i] || (picks[i] = { fav: null, pts: null });
    p.pts = parsePts(box.value);
    lockArmed = false;
    updateStats();
  });
  // Enter jumps to the next game's box, so a whole slate can be typed straight down
  board.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !e.target.classList.contains('pts')) return;
    e.preventDefault();
    const all = [...document.querySelectorAll('#board .pts')];
    const next = all[all.indexOf(e.target) + 1];
    if (next) next.focus(); else e.target.blur();
  });
}
function lockIn() {
  if (!running) return;
  const blank = total - pickedCount();
  if (blank && !lockArmed) {
    lockArmed = true;
    toast(blank + (blank === 1 ? ' game is' : ' games are') + ' missing a favorite or a number. Tap Lock in again to grade anyway.', 'hint');
    return;
  }
  end('locked');
}

function bestKey() { return 'dcm-best-' + Q.slug + '-' + mode; }
function getBest() { try { return parseInt(localStorage.getItem(bestKey()) || '0', 10) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(bestKey(), String(v)); } catch (e) {} }

function fmt(sec) {
  sec = Math.max(0, Math.ceil(sec));
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
}

/* ---------- board ---------- */
function buildBoard() {
  if (isLines()) { buildLinesBoard(); return; }
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
/* Is this the beginning of a longer answer? Someone five letters into a name
   is typing, not misspelling, so they get no fuzzy credit for it. */
function midWord(g) {
  return allKeys.some(k => k.length > g.length && k.startsWith(g));
}

/* An exact key always beats a fuzzy one. Without this, typing the whole name
   "Jim Brown" came back ambiguous because "timbrown" is a single edit away, and
   "payton" pulled in Peyton Manning alongside Walter Payton.

   `allowFuzzy` is off while you type and on when you press Enter — see the note
   above `close()` for why. */
function findMatches(raw, allowFuzzy) {
  const g = norm(raw);
  if (g.length < 2) return { hits: [], already: false, how: 'exact' };

  const exact = [];
  let exactDone = false;
  for (const it of items) {
    if (!it._keys.has(g)) continue;
    if (filled.has(it._i)) exactDone = true; else exact.push(it);
  }
  if (exact.length || exactDone) return { hits: exact, already: exactDone, how: 'exact' };

  if (!allowFuzzy || midWord(g)) return { hits: [], already: false, how: 'exact' };

  const fuzzy = [];
  let fuzzyDone = false;
  for (const it of items) {
    let fz = false;
    for (const k of it._keys) if (close(g, k)) { fz = true; break; }
    if (!fz) continue;
    if (filled.has(it._i)) fuzzyDone = true; else fuzzy.push(it);
  }
  return { hits: fuzzy, already: fuzzyDone, how: 'fuzzy' };
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
// One name sweeps everyone who shares it, across every section of the board:
// "Manning" takes Peyton and Eli, "Brown" takes Jim and Tim.
function land(hits, how) {
  const box = $('guess');
  hits.forEach(reveal);
  box.value = '';
  box.classList.remove('bad'); box.classList.add('good');
  setTimeout(() => box.classList.remove('good'), 420);
  const lead = how === 'fuzzy' ? 'Close enough — ' : 'Got it — ';
  toast(hits.length === 1
    ? lead + hits[0].a
    : 'Got ' + hits.length + ' — ' + hits.map(h => h.a).join(' + '), 'ok');
}

// Typing only ever fills an answer you have actually spelled.
function onInput() {
  if (!running) return;
  const box = $('guess');
  const { hits, already } = findMatches(box.value);
  if (hits.length) { land(hits, 'exact'); return; }
  if (already && norm(box.value).length > 3) { toast('Already on the board', 'hint'); return; }
  toast('');
}

// Enter is where a near-miss gets the benefit of the doubt, and it costs
// nothing when it lands.
function onSubmit(e) {
  if (e) e.preventDefault();
  if (isLines()) { lockIn(); return; }
  if (!running) return;
  const box = $('guess');
  const raw = box.value.trim();
  if (!raw) return;
  const { hits, already, how } = findMatches(raw, true);
  if (hits.length) { land(hits, how); return; }
  if (already) { toast('Already on the board', 'hint'); box.value = ''; return; }

  // a genuine miss
  wrong++;
  box.classList.remove('good'); box.classList.add('bad');
  setTimeout(() => box.classList.remove('bad'), 360);
  box.value = '';
  toast('“' + raw + '” isn’t on the board', 'no');
  updateStats();
}

/* ---------- stats ---------- */
function updateStats() {
  const shown = isLines() && !graded ? pickedCount() : filled.size;
  $('sc').textContent = shown;
  $('scTot').textContent = '/' + total;
  $('scLbl').textContent = isLines() ? (graded ? 'Right' : 'Picked') : 'Found';
  const pct = total ? (shown / total) * 100 : 0;
  $('pbar').style.width = pct + '%';

  const box = $('statRight');
  if (mode === 'timed') {
    box.innerHTML = `<b>${fmt(left)}</b><small>Time</small>`;
    box.classList.toggle('danger', left <= 30);
  } else {
    // No pressure still earns a clock, just one that counts the other way.
    box.innerHTML = `<b>${fmt(spent)}</b><small>Time</small>`;
    box.classList.remove('danger');
  }
}

/* ---------- lifecycle ---------- */
function start() {
  filled = new Set(); wrong = 0; left = Q.time; spent = 0; running = true; startedAt = Date.now();
  picks = {}; graded = false; lockArmed = false;
  $('pre').hidden = true;
  $('live').hidden = false;
  $('giveup').hidden = isLines();      // the line game finishes with Lock in, not Give up
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
  if (!isLines()) setTimeout(() => box.focus({ preventScroll: true }), 60);
  clearInterval(timer);
  timer = setInterval(() => {
    spent += 1;
    if (mode === 'timed') left -= 1;
    updateStats();
    if (mode === 'timed' && left <= 0) end('time');
  }, 1000);
}

/* Back to "pick a mode and press play", with the board blank again. */
function reset() {
  running = false;
  clearInterval(timer);
  filled = new Set(); wrong = 0; left = Q.time; spent = 0;
  picks = {}; graded = false; lockArmed = false;
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
  if (isLines()) {
    setLocked(true);
    $('live').hidden = true;
    items.forEach(it => {
      const ok = lineRight(it);
      if (ok) filled.add(it._i);
      $('row-' + it._i).classList.add(ok ? 'got' : 'miss');
      $('act-' + it._i).textContent = 'Line ' + fmtLine(it, it.line) +
        (isPicked(it._i) ? '' : ' · no pick');
    });
    graded = true;
    $('giveup').hidden = false;
    updateStats();
  }
  items.forEach(it => {
    if (!isLines() && !filled.has(it._i)) {
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
    locked: score === total ? ['Sharp.', 'Every line within a point. Vegas should hire you.']
                            : ['Lines locked.', 'Here’s how close you were.'],
    swept: ['Perfect run.', 'You cleared the whole board. Ice cold.'],
    time:  ['Time!', 'The clock got you.'],
    gave:  ['Called it.', 'Here’s everything you missed.']
  };
  const h = heads[reason] || heads.gave;
  $('mTitle').textContent = h[0];
  $('mVerdict').textContent = h[1];
  $('mScore').innerHTML = score + '<small>/' + total + '</small>';
  $('mPct').textContent = Math.round((score / total) * 100) + (isLines() ? '% within a point' : '% of the board')
    + (isBest ? ' · new personal best' : prevBest ? ' · your best is ' + prevBest : '');

  const bits = [];
  bits.push(`<span class="pill">${mode === 'timed' && reason === 'time'
    ? 'Full ' + fmt(Q.time) : fmt(elapsed) + ' used'}</span>`);
  if (isBest) bits.push('<span class="pill">Personal best</span>');
  $('mStats').innerHTML = bits.join('');

  window._share = `DietCokeMan Challenge — ${Q.title}\n${score}/${total} (${Math.round((score / total) * 100)}%)` +
    ` in ${fmt(elapsed)}` +
    (isLines() ? '\n\n' + items.map(it =>
      `${it.aw} @ ${it.hm}: ${isPicked(it._i) ? fmtLine(it, guessLine(it)) : 'no pick'}` +
      ` (line ${fmtLine(it, it.line)}) ${filled.has(it._i) ? '✓' : '✗'}`).join('\n') + '\n' : '') +
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
  // one flat list, for the "are they still mid-word?" test
  allKeys = [...new Set(items.flatMap(it => [...it._keys]))];
  // restart per-group numbering when the board is split into groups
  if (Q.cols !== 'single') { Q.groups.forEach(g => g.items.forEach((it, k) => { it._n = k + 1; })); }
  total = items.length;

  document.title = Q.title + ' · DietCokeMan Challenge';
  $('qTitle').textContent = Q.title;
  $('qSub').textContent = Q.blurb || Q.sub;
  $('mTime').textContent = fmt(Q.time);
  if (isLines()) {
    $('guess').hidden = true;
    $('lock').hidden = false;
    $('fine').textContent = 'Pick the favorite, then type the spread · within one point of the real line counts, ' +
      'exactly one off included · type 0 for a pick’em · lines are a snapshot and will move before kickoff';
    wireLinesBoard();
  }

  const allowed = Q.modes || ['timed', 'chill'];
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
  $('board').addEventListener('click', () => { if (running && !isLines()) $('guess').focus({ preventScroll: true }); });
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
  findMatches, norm, keysFor, close, lev,
  start,
  guess(s) { const b = $('guess'); b.value = s; onInput(); return { filled: filled.size, wrong }; },
  submit(s) { const b = $('guess'); b.value = s; onSubmit(); return { filled: filled.size, wrong }; },
  setMode(m) { mode = m; },
  pick(i, fav, pts) { picks[i] = { fav, pts }; updateStats(); },
  lineRight: (i) => lineRight(items[i]),
  lockIn,
  items: () => items
};
})();

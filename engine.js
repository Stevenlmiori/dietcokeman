/* ===========================================================
   DietCokeMan Challenge — quiz engine
   =========================================================== */
(function () {
'use strict';

const $ = (id) => document.getElementById(id);
const SUFFIX = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);
const NOISE  = new Set(['the', 'a', 'an', 'of', 'and']);

/* First names that are too common to count on their own. Anything NOT on this
   list (Puka, Brock, Luka, Yao, Amon-Ra, CeeDee, Kareem, Dirk) is accepted by
   itself, because only someone who knows the player would type it. Anything
   on it (tom, tim, john, jim, james...) needs the last name, or else typing a
   list of ordinary first names fills the board. Steven asked for both halves:
   first-name spraying was "getting right answers they didn't earn", but
   "unique first names and even nicknames should be accepted". Nicknames
   (Shaq, Penny, Magic) can't be derived from the name, so they go in `alias`.
   When in doubt, put a name on this list: a missed unusual name costs the
   player one extra word; a missed common name hands out free answers. */
const COMMON_FIRST = new Set((
  'aaron adam adrian al alan albert alex alexander alfred allen alvin andre andrew andy angel anthony antonio arthur ' +
  'austin ben benjamin bernard bill billy bob bobby brad bradley brandon brendan brent brett brian bruce bryan bryant ' +
  'buck bud byron calvin cameron carl carlos carlton cedric chad charles charlie chase chester chris christian ' +
  'christopher chuck clarence clark clifford clint clyde cody cole colin corey cory craig curtis dale dan daniel danny ' +
  'darius darnell darrell darren daryl dave david dean dennis derek derrick devin devon dewayne dick don donald ' +
  'donnie donovan doug douglas drew duane dustin dwayne dwight earl ed eddie edward edwin eli elijah elvin emmanuel ' +
  'eric erik ernest ernie eugene evan frank frankie fred freddie gary gene george gerald glen glenn gordon grant ' +
  'greg gregory harold harry henry herman howard hugh ian isaac isaiah jack jackie jacob jake jalen james jamal ' +
  'jamie jared jason jay jayden jeff jeffrey jeremy jermaine jerome jerry jesse jim jimmy joe joel joey john johnny ' +
  'jon jonathan jordan jose joseph josh joshua juan julian julius justin keith kelly ken kenneth kenny kent kevin ' +
  'kirk kurt kyle lamar lance larry lawrence lee leo leon leonard leroy lewis lloyd lonnie louis lou luis luke ' +
  'malcolm marc marcus mario mark marshall martin marvin matt matthew maurice max michael mike miles mitchell ' +
  'morris nate nathan nathaniel neil nicholas nick noah norman oscar patrick paul pete peter phil philip phillip ' +
  'ralph randy ray raymond reggie richard rick ricky rob robert roberto robin rod rodney roger roland ron ronald ' +
  'ronnie roy russ russell ryan sam samuel scott sean shane shawn sidney stan stanley stephen steve steven ' +
  'stuart ted terrance terrell terrence terry theodore thomas tim timothy todd tom tommy tony travis trevor troy ' +
  'tyler tyrone vernon victor vince vincent wade walt walter warren wayne wes wesley will william willie zach ' +
  'zachary dwayne deandre demarcus derek tyrell jaylen marquis tre trey ty cj jj aj tj dj jr ' +
  'barry karl lenny guy rudy theo damian buddy carson dominic jesus moses rich kurt bert norm ' +
  'hank mel sammy rafael miguel jimmie jimmy lee miles roy harry benjamin dexter pierre mohamed sammie deon franklin herbert cam malik bryce caleb cooper cal owen'
).split(' '));

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

/* Every spelling we will accept for one answer: the full name, the last
   name, or an unusual first name (see COMMON_FIRST). Never a common first
   name on its own.

   First names used to count, and they were a free pass: typing tom, tim, john,
   jim, drew, tony... filled 27 of the 60 on NFL All-Time Top 20 without
   knowing a single surname. Steven: "people can start typing tom, tim, john,
   jim and start getting right answers they didn't earn." Unusual first names
   came back on 2026-11-17 behind the COMMON_FIRST list; nicknames go in
   `alias`.

   A quiz with `match: 'full'` drops the last name too: full name (or an
   alias) only.

   Length floors matter here. An earlier version accepted *any* word of a
   multi-word answer, which meant "st" alone unlocked Amon-Ra St. Brown and
   "me" unlocked Dont Tread On Me. Particles and connectors only count as part
   of a larger key now; a bare word has to be long enough to be a real guess. */
function keysFor(item, fullOnly) {
  const keys = new Set();
  // `loose` keys are only fair if no one else on the board shares them; boot() prunes them.
  keys.loose = new Set();
  const add = (s, min, loose) => { const k = norm(s); if (k.length >= (min || 2)) { keys.add(k); if (loose) keys.loose.add(k); } };

  add(item.a);                                        // exactly as written, suffix included
  const core = words(item.a).filter(x => !SUFFIX.has(x));
  const real = core.filter(x => !NOISE.has(x));       // drop "the", "of", "and"...

  const hadSuffix = core.length !== words(item.a).length;   // "Tim Hardaway Jr." -> "Tim Hardaway" is loose
  if (core.length) add(core.join(''), 2, hadSuffix);  // full name, suffix dropped
  // "The Silence of the Lambs" -> "silence of the lambs": a leading article is optional
  if (core.length > 1 && NOISE.has(core[0])) add(core.slice(1).join(''));
  if (real.length) {
    add(real.join(''), 2, hadSuffix);                 // "The Goods" -> "goods"
    if (real.length === 1) add(real[0]);              // a one-word answer is its own full name
    else if (!fullOnly) {
      if (!COMMON_FIRST.has(real[0])) add(real[0], 3, true);   // an unusual first name: Puka, Luka, Yao
      const rest = real.slice(1);
      add(rest.join(''));                             // surname, compounds kept whole
      add(rest[rest.length - 1], 3);                  // final word alone, if it isn't a particle
      // any other later word, if it stands on its own; a middle name that is a common
      // first name doesn't ("henry" is not William Henry Harrison)
      rest.slice(0, -1).forEach(x => { if (!COMMON_FIRST.has(x)) add(x, 4); });
      add(rest[rest.length - 1], 4);
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
let Q = null, items = [], allKeys = [], parts = new Set(), mode = 'timed', total = 0;
let filled = new Set(), wrong = 0, left = 0, spent = 0, timer = null, running = false, startedAt = 0;

/* ---------- line game ----------
   `type: 'lines'` quizzes do not use the name matcher at all. Each game gets a
   pair of favourite buttons, a spread box and a submit check. A game is graded
   the moment it is submitted (the check, or Enter in its box): hit or miss and
   the real line appear on that row, it locks, and focus moves to the next open
   game. The run ends when every game is in, the clock runs out, or Stop.

   A guess is right when it lands within one point of the real line (exactly
   one off counts), measured from the home side, so picking the wrong favourite
   only survives on a game that is close to a pick'em. */
let picks = {}, graded = false;
const isLines = () => !!(Q && Q.type === 'lines');

function parsePts(raw) {
  const s = String(raw || '').trim().toLowerCase();
  if (!s) return null;
  if (s === 'pk' || s === 'pick' || s === 'pickem') return 0;
  const n = parseFloat(s.replace(/^[+-]/, ''));
  return isNaN(n) ? null : Math.abs(n);
}
function pickOf(i) { return picks[i] || (picks[i] = { fav: null, pts: null, done: false }); }
function isPicked(i) {
  const p = picks[i];
  return !!(p && p.pts != null && (p.pts === 0 || p.fav));
}
function doneCount() { return items.filter(it => picks[it._i] && picks[it._i].done).length; }
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
function setRowLocked(i, locked) {
  document.querySelectorAll('#row-' + i + ' .fv, #row-' + i + ' .pts, #row-' + i + ' .lgo')
    .forEach(el => { el.disabled = locked; });
}
function setLocked(locked) {
  items.forEach(it => setRowLocked(it._i, locked || !!(picks[it._i] && picks[it._i].done)));
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
          <input class="pts" id="pts-${i}" name="dcm-spread-${i}" data-i="${i}" type="text" inputmode="decimal" placeholder="pts"
                 maxlength="5" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                 enterkeyhint="go" aria-label="Spread for ${esc(it.a)}"
                 data-form-type="other" data-lpignore="true" data-1p-ignore="true">
          <button type="button" class="lgo" data-i="${i}" aria-label="Submit ${esc(it.a)}" title="Submit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
          </button>
        </span>
        <span class="actual" id="act-${i}"></span>
      </div>`;
    }).join('');
    return `<section class="grp"><h4>${esc(g.name)}${g.note ? `<em>${esc(g.note)}</em>` : ''}</h4>${rows}</section>`;
  }).join('');
  setLocked(!running);
}
function nextOpen(after) {
  const open = items.filter(it => !(picks[it._i] && picks[it._i].done));
  return open.find(it => it._i > after) || open[0];
}
function submitGame(i) {
  if (!running) return;
  const it = items[i], p = pickOf(i), row = $('row-' + i);
  if (p.done) return;
  if (p.pts == null) { toast('Type a spread for ' + it.a + ' first', 'hint'); $('pts-' + i).focus(); return; }
  if (!isPicked(i)) {
    toast('Pick who’s favored in ' + it.a + ' first', 'hint');
    row.classList.remove('nudge'); void row.offsetWidth; row.classList.add('nudge');
    return;
  }
  p.done = true;
  const ok = lineRight(it);
  if (ok) filled.add(i);
  row.classList.add(ok ? 'got' : 'miss'); if (ok) row.classList.add('just');
  setRowLocked(i, true);
  $('act-' + i).textContent = (ok ? 'Hit' : 'Miss') + ' · line ' + fmtLine(it, it.line);
  toast((ok ? 'Hit. ' : 'Miss. ') + it.a + ' line is ' + fmtLine(it, it.line), ok ? 'ok' : 'no');
  updateStats();
  if (doneCount() === total) { setTimeout(() => end('locked'), 700); return; }
  const nx = nextOpen(i);
  if (nx) $('pts-' + nx._i).focus({ preventScroll: false });
}
function wireLinesBoard() {
  const board = $('board');
  board.addEventListener('click', (e) => {
    if (!running) return;
    const go = e.target.closest('.lgo');
    if (go) { submitGame(+go.dataset.i); return; }
    const b = e.target.closest('.fv');
    if (!b) return;
    const i = +b.dataset.i, p = pickOf(i);
    if (p.done) return;
    p.fav = p.fav === b.dataset.t ? null : b.dataset.t;
    b.parentNode.querySelectorAll('.fv').forEach(o => o.setAttribute('aria-pressed', String(o.dataset.t === p.fav)));
  });
  board.addEventListener('input', (e) => {
    const box = e.target.closest('.pts');
    if (!box || !running) return;
    pickOf(+box.dataset.i).pts = parsePts(box.value);
  });
  // Enter in a spread box submits that game
  board.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !e.target.classList.contains('pts')) return;
    e.preventDefault();
    submitGame(+e.target.dataset.i);
  });
}

// `scoreKey` lets a quiz keep one permanent slug (the Line Game's link never
// changes) while each week's best score is stored separately.
function bestKey() { return 'dcm-best-' + (Q.scoreKey || Q.slug) + '-' + mode; }
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
  board.className = 'board' + (Q.cols === 'single' ? ' single' : Q.cols === 'two' ? ' two' : Q.cols === 'four' ? ' four' : '') + (Q.hideSub ? ' hidesub' : '');
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
  /* While typing, hold an exact match that is also the start of a *different*
     unsolved answer. "james" is Edgerrin James's surname, but it is also the
     first five letters of "James Lofton"; filling Edgerrin there hands you a
     player you weren't typing. Same for henry/Henry Ellard and chase/Chase
     McLaughlin. Keep typing and the longer name lands; press Enter and the
     surname does. */
  if (exact.length && !allowFuzzy &&
      items.some(it => !filled.has(it._i) && !exact.includes(it) &&
        [...it._keys].some(k => k.length > g.length && k.startsWith(g)))) {
    return { hits: [], already: false, how: 'exact', held: true };
  }
  if (exact.length || exactDone) return { hits: exact, already: exactDone, how: 'exact' };

  // A common first name is never a typo of a surname ("walter" is not Walker),
  // and a plain word that is part of answers' names is never a typo of a
  // different one ("energy", from Xcel Energy and CMS Energy, is not Entergy).
  if (!allowFuzzy || midWord(g) || COMMON_FIRST.has(g) || parts.has(g)) return { hits: [], already: false, how: 'exact' };

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
  const lead = how === 'fuzzy' ? 'Close enough: ' : 'Got it: ';
  // One player on several lists (LeBron on seven) reads "LeBron James ×7", not his name seven times.
  const count = new Map();
  hits.forEach(h => count.set(h.a, (count.get(h.a) || 0) + 1));
  const named = [...count].map(([a, n]) => n > 1 ? a + ' ×' + n : a);
  toast(count.size === 1 ? lead + named[0] : 'Got ' + hits.length + ': ' + named.join(' + '), 'ok');
}

// Typing only ever fills an answer you have actually spelled.
function onInput() {
  if (!running) return;
  const box = $('guess');
  const { hits, already, held } = findMatches(box.value);
  if (hits.length) { land(hits, 'exact'); return; }
  if (held) { toast('Keep typing, or press Enter', 'hint'); return; }
  if (already && norm(box.value).length > 3) { toast('Already on the board', 'hint'); return; }
  toast('');
}

// Enter is where a near-miss gets the benefit of the doubt, and it costs
// nothing when it lands.
function onSubmit(e) {
  if (e) e.preventDefault();
  if (isLines()) return;
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
  // A quiz can answer particular wrong guesses itself (`nope`, keyed by the
  // normalised guess); everything else gets the standard line.
  const nope = Q.nope && Q.nope[norm(raw)];
  toast(nope || '“' + raw + '” isn’t on the board', 'no');
  updateStats();
}

/* ---------- stats ---------- */
function updateStats() {
  $('sc').textContent = filled.size;
  $('scTot').textContent = '/' + total;
  $('scLbl').textContent = isLines() ? 'Hits' : 'Found';
  if (isLines()) $('lstat').textContent = doneCount() + ' of ' + total + ' games in';
  const pct = total ? ((isLines() ? doneCount() : filled.size) / total) * 100 : 0;
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
  picks = {}; graded = false;
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
  if (isLines()) { gu.textContent = 'Stop & finish'; setTimeout(() => $('pts-0').focus({ preventScroll: true }), 60); }
  else setTimeout(() => box.focus({ preventScroll: true }), 60);
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
  picks = {}; graded = false;
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
    // anything never submitted is a miss, and its real line is shown
    items.forEach(it => {
      if (picks[it._i] && picks[it._i].done) return;
      $('row-' + it._i).classList.add('miss');
      $('act-' + it._i).textContent = 'Not submitted · line ' + fmtLine(it, it.line);
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

  const link = `${location.origin}${location.pathname}?q=${Q.slug}`;
  if (isLines()) {
    // Spoiler-free on purpose: this gets texted to someone who has not played
    // yet, so it shows hit or miss per game and never a pick or a real line.
    const grid = items.map(it => filled.has(it._i) ? '🟩' : '🟥').join('');
    window._share = `${Q.title}\n${score}/${total} within a point\n${grid}\n\nYour turn: ${link}`;
  } else {
    window._share = `DietCokeMan Challenge: ${Q.title}\n${score}/${total} (${Math.round((score / total) * 100)}%)` +
      ` in ${fmt(elapsed)}\n${link}`;
  }

  const gu = $('giveup');
  gu.textContent = 'Show results';
  gu.dataset.done = '1';
  $('scrim').classList.add('on');

  // account.js (optional) listens for this to offer sign-in and save the score.
  window.dispatchEvent(new CustomEvent('dcm:end', { detail: {
    slug: Q.slug, scoreKey: Q.scoreKey || Q.slug, title: Q.title, mode, score, total, seconds: elapsed
  } }));
}

/* ---------- boot ---------- */
function boot() {
  const slug = new URLSearchParams(location.search).get('q');
  const all = window.QUIZZES || [];
  Q = all.find(x => x.slug === slug)
    // an old week-specific Line Game link (line-game-2026-w11) lands on the current week
    || (slug && slug.startsWith('line-game') && all.find(x => x.type === 'lines'))
    || all[0];
  if (!Q) { document.body.innerHTML = '<p style="padding:40px;text-align:center">No quiz found.</p>'; return; }

  // flatten + index
  let n = 0;
  items = [];
  Q.groups.forEach(g => g.items.forEach(it => {
    it._i = items.length;
    it._n = (++n);
    it._keys = keysFor(it, Q.match === 'full');
    items.push(it);
  }));
  /* A loose key that belongs to two different players is a clue to neither.
     "brock" was Brock Purdy's and Brock Bowers's, so typing it filled both and
     handed over Bowers on the way to Purdy. And "Tim Hardaway Jr." minus the
     Jr. is Tim Hardaway, his father, also on the NBA board. Drop the key from
     both; the full names and the last name still work. The same player listed
     in several sections (LeBron in seven) is one player, so his keys stay. */
  const who = new Map();
  const names = new Set(items.map(it => norm(it.a)));
  items.forEach(it => it._keys.loose.forEach(k => { if (!who.has(k)) who.set(k, new Set()); who.get(k).add(norm(it.a)); }));
  items.forEach(it => it._keys.loose.forEach(k => {
    if (who.get(k).size > 1 || (k !== norm(it.a) && names.has(k))) it._keys.delete(k);
  }));
  // one flat list, for the "are they still mid-word?" test
  allKeys = [...new Set(items.flatMap(it => [...it._keys]))];
  // every single word of every answer, for the fuzzy guard in findMatches
  parts = new Set(items.flatMap(it => words(it.a)));
  // restart per-group numbering when the board is split into groups
  if (Q.cols !== 'single') { Q.groups.forEach(g => g.items.forEach((it, k) => { it._n = k + 1; })); }
  total = items.length;

  document.title = Q.title + ' · DietCokeMan Challenge';
  const newBadge = typeof window.quizNewBadge === 'function' ? window.quizNewBadge(Q) : '';
  $('qTitle').innerHTML = `<span class="qtitle-text">${esc(Q.title)}</span>${newBadge}`;
  $('qSub').textContent = Q.blurb || Q.sub;
  $('mTime').textContent = fmt(Q.time);
  if (Q.match === 'full') $('fine').textContent = 'Full names or the names people actually use · answers fill the moment you spell one · ' +
    'press Enter and a near-miss still counts';
  if (isLines()) {
    $('guess').hidden = true;
    $('lstat').hidden = false;
    $('fine').textContent = 'Pick the favorite, type the spread, then hit the check or Enter · each game is graded ' +
      'as you submit it · within one point of the real line counts, exactly one off included · type 0 for a pick’em · ' +
      'lines are a snapshot and will move before kickoff';
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
  pick(i, fav, pts) { picks[i] = { fav, pts, done: false }; },
  submitGame,
  items: () => items
};
})();

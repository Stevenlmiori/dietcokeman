/* ===========================================================
   DietCokeMan Challenge: accounts (optional)

   Playing never needs an account. Signing in only does three things: keeps
   your best score per quiz and mode, puts you on that quiz's leaderboard, and
   gives you a small profile (username + optional bio).

   Firebase: Google sign-in, plus Firestore for the data. Everything is
   checked server-side by firestore.rules; this file is just the UI. If the
   config below is empty, or Firebase fails to load, this whole file quietly
   does nothing and the site behaves exactly as it did before accounts.

   Data
     users/{uid}                    { username, bio, created }
     usernames/{username}           { uid }            one doc per name = unique
     users/{uid}/bests/{board}      { board, slug, title, mode, best, total, at }
     boards/{board}/entries/{uid}   { username, best, total, at }

   `board` is `<scoreKey or slug>-<mode>`, the same key localStorage already
   uses, so each Line Game week and each mode gets its own leaderboard.
   =========================================================== */

// Public by design: a Firebase web config identifies the project, it does not
// grant access. Access is decided by firestore.rules.
const firebaseConfig = {
  apiKey: 'AIzaSyBWx2KzEx2UINGXYY397TZkX7xclQTC1Lw',
  // Our own domain, not dietcokeman-12f1e.firebaseapp.com, so Google's sign-in
  // screen names challenge.dietcokeman.com. The helper it needs is served
  // from /__/auth/ (see __/auth/README.md).
  authDomain: 'challenge.dietcokeman.com',
  projectId: 'dietcokeman-12f1e',
  appId: '1:76413971963:web:3f70772061749d0dc86f5e'
};

const SDK = 'https://www.gstatic.com/firebasejs/13.1.0/';
// Local testing against the Firebase emulators: open any page on localhost
// with ?emu=1 (run `npx firebase-tools emulators:start` first).
const EMU = location.hostname === 'localhost' && new URLSearchParams(location.search).has('emu');

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NAME_RE = /^[a-z0-9_]{3,20}$/;
const BIO_MAX = 160;
const GOOGLE_G = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';

let fb = null;          // { auth, db, ...sdk functions } once loaded
let user = null;        // Firebase user, or null
let profile = null;     // users/{uid} data, or null when signed in without a username yet
let ready = false;      // first auth state has arrived
let pending = null;     // the run waiting to be saved, from the result card
const waiters = [];

/* ---------- boot ---------- */
async function load() {
  const configured = EMU || (firebaseConfig.apiKey && firebaseConfig.projectId);
  if (!configured) return;
  try {
    const [app, auth, fs] = await Promise.all([
      import(SDK + 'firebase-app.js'),
      import(SDK + 'firebase-auth.js'),
      import(SDK + 'firebase-firestore.js')
    ]);
    const cfg = EMU ? { apiKey: 'demo', authDomain: 'localhost', projectId: 'demo-dietcokeman', appId: 'demo' } : firebaseConfig;
    const a = app.initializeApp(cfg);
    fb = { ...auth, ...fs, auth: auth.getAuth(a), db: fs.getFirestore(a) };
    if (EMU) {
      auth.connectAuthEmulator(fb.auth, 'http://localhost:9099', { disableWarnings: true });
      fs.connectFirestoreEmulator(fb.db, 'localhost', 8080);
      // Emulator-only test hook: sign in a fake Google user without the popup.
      window._acct = {
        fb,
        as: (sub, name) => auth.signInWithCredential(fb.auth, auth.GoogleAuthProvider.credential(
          JSON.stringify({ sub, email: sub + '@example.com', email_verified: true, name })))
      };
    }
    document.documentElement.classList.add('has-accounts');
    auth.onAuthStateChanged(fb.auth, async (u) => {
      user = u;
      try { profile = u ? await readProfile(u.uid) : null; }
      catch (e) { profile = null; console.warn(e); }
      ready = true;
      waiters.splice(0).forEach(f => f());
      paintTopbar();
      if (pending) paintSave();
      if ($('profile')) paintProfilePage();
    });
  } catch (e) {
    console.warn('Accounts unavailable:', e);
  }
}
const whenReady = () => new Promise(r => ready ? r() : waiters.push(r));

async function readProfile(uid) {
  const s = await fb.getDoc(fb.doc(fb.db, 'users', uid));
  return s.exists() ? s.data() : null;
}

async function signIn() {
  const p = new fb.GoogleAuthProvider();
  p.setCustomParameters({ prompt: 'select_account' });
  try { await fb.signInWithPopup(fb.auth, p); return true; }
  catch (e) {
    if (e && (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request')) return false;
    throw e;
  }
}

/* ---------- top bar ---------- */
// One quiet link: "Sign in" or your @name. It goes to the profile page.
function paintTopbar() {
  const a = $('acct');
  if (!a) return;
  a.hidden = false;
  a.textContent = user && profile ? '@' + profile.username : 'Sign in';
  a.href = 'profile.html';
}

/* ---------- usernames ---------- */
function cleanName(raw) { return String(raw || '').trim().replace(/^@/, '').toLowerCase(); }
function nameProblem(n) {
  if (n.length < 3) return 'At least 3 characters.';
  if (n.length > 20) return '20 characters at most.';
  if (!NAME_RE.test(n)) return 'Letters, numbers and underscores only.';
  return '';
}

/* Claim a username, or move to a new one. The usernames/{name} doc is what
   makes names unique: creating one that exists fails in the rules. A rename
   also rewrites the name on every leaderboard row in the same batch. */
async function claimName(name, bio) {
  const uid = user.uid;
  const old = profile && profile.username;
  if (old === name) {
    await fb.setDoc(fb.doc(fb.db, 'users', uid), { username: name, bio, created: profile.created });
    profile = { ...profile, bio };
    return;
  }
  const taken = await fb.getDoc(fb.doc(fb.db, 'usernames', name));
  if (taken.exists()) { const err = new Error('taken'); err.code = 'taken'; throw err; }

  const b = fb.writeBatch(fb.db);
  b.set(fb.doc(fb.db, 'usernames', name), { uid });
  if (old) b.delete(fb.doc(fb.db, 'usernames', old));
  const created = profile ? profile.created : fb.serverTimestamp();
  b.set(fb.doc(fb.db, 'users', uid), { username: name, bio: bio || '', created });
  if (old) {
    const bests = await fb.getDocs(fb.collection(fb.db, 'users', uid, 'bests'));
    bests.forEach(d => b.update(fb.doc(fb.db, 'boards', d.id, 'entries', uid), { username: name }));
  }
  await b.commit();
  profile = await readProfile(uid);
}

/* ---------- scores ---------- */
const boardId = (r) => r.scoreKey + '-' + r.mode;

// Keep the higher of what is stored and this run. Returns { best, isNew }.
async function saveRun(r) {
  const uid = user.uid, id = boardId(r);
  const ref = fb.doc(fb.db, 'users', uid, 'bests', id);
  const s = await fb.getDoc(ref);
  const prev = s.exists() ? s.data().best : -1;
  if (r.score <= prev) return { best: prev, isNew: false };
  const at = fb.serverTimestamp();
  const b = fb.writeBatch(fb.db);
  b.set(ref, { board: id, slug: r.slug, title: r.title, mode: r.mode, best: r.score, total: r.total, at });
  b.set(fb.doc(fb.db, 'boards', id, 'entries', uid), { username: profile.username, best: r.score, total: r.total, at });
  await b.commit();
  return { best: r.score, isNew: prev >= 0 };
}

/* Bests earned before signing in live in localStorage. The first time a
   profile is made, carry them up so nothing already won is lost. */
async function importLocalBests() {
  const qs = window.QUIZZES || [];
  for (const q of qs) {
    const total = q.groups.reduce((a, g) => a + g.items.length, 0);
    for (const mode of (q.modes || ['timed', 'chill'])) {
      let v = 0;
      try { v = parseInt(localStorage.getItem('dcm-best-' + (q.scoreKey || q.slug) + '-' + mode) || '0', 10) || 0; } catch (e) {}
      if (v > 0) await saveRun({ slug: q.slug, scoreKey: q.scoreKey || q.slug, title: q.title, mode, score: Math.min(v, total), total });
    }
  }
}

async function topScores(id, n) {
  const q = fb.query(fb.collection(fb.db, 'boards', id, 'entries'), fb.orderBy('best', 'desc'), fb.limit(n));
  const s = await fb.getDocs(q);
  return s.docs.map(d => ({ uid: d.id, ...d.data() }));
}

/* ---------- result card ---------- */
let dismissed = false;   // "Not now" holds for the rest of this visit

window.addEventListener('dcm:end', async (e) => {
  pending = e.detail;
  if (!fb) return;
  await whenReady();
  paintSave();
});

function box() { return $('acctBox'); }

async function paintSave() {
  const el = box();
  if (!el || !pending) return;
  if (!user) {
    if (dismissed) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = `
      <div class="acct-card">
        <h3>Save your score</h3>
        <p>Sign in to keep your bests on any device and see where you rank.</p>
        <button type="button" class="gbtn" id="acctGo">${GOOGLE_G}<span>Continue with Google</span></button>
        <button type="button" class="linkbtn" id="acctNo">Not now</button>
        <p class="acct-err" id="acctErr" hidden></p>
      </div>`;
    $('acctNo').onclick = () => { dismissed = true; el.hidden = true; };
    $('acctGo').onclick = async () => {
      $('acctGo').disabled = true;
      try { await signIn(); }
      catch (err) { showErr('Sign-in didn’t go through. Try again?'); console.warn(err); }
      finally { const g = $('acctGo'); if (g) g.disabled = false; }
    };
    return;
  }
  el.hidden = false;
  if (!profile) { paintPickName(el); return; }
  paintSaved(el);
}

function showErr(msg) {
  const p = $('acctErr');
  if (!p) return;
  p.textContent = msg;
  p.hidden = !msg;
}

function paintPickName(el) {
  el.innerHTML = `
    <form class="acct-card" id="acctName" autocomplete="off">
      <h3>Pick a username</h3>
      <p>It’s how you’ll show up on the leaderboards.</p>
      <label class="at"><span>@</span><input id="acctUser" maxlength="20" placeholder="username"
        autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Username"></label>
      <p class="acct-err" id="acctErr" hidden></p>
      <button class="btn" type="submit" id="acctSave">Save my score</button>
      <button type="button" class="linkbtn" id="acctOut">Use a different account</button>
    </form>`;
  const input = $('acctUser');
  const suggestion = cleanName((user.displayName || '').split(' ')[0]).replace(/[^a-z0-9_]/g, '');
  if (suggestion.length >= 3) input.value = suggestion;
  setTimeout(() => input.focus({ preventScroll: true }), 50);
  input.oninput = () => showErr('');
  $('acctOut').onclick = () => fb.signOut(fb.auth);
  $('acctName').onsubmit = async (e) => {
    e.preventDefault();
    const name = cleanName(input.value);
    const bad = nameProblem(name);
    if (bad) { showErr(bad); return; }
    $('acctSave').disabled = true;
    try {
      await claimName(name, '');
      await importLocalBests();
      paintTopbar();
      paintSaved(el);
    } catch (err) {
      showErr(err.code === 'taken' ? '@' + name + ' is taken. Try another.' : 'Couldn’t save that. Try again?');
      if (err.code !== 'taken') console.warn(err);
      const s = $('acctSave'); if (s) s.disabled = false;
    }
  };
}

async function paintSaved(el) {
  const r = pending;
  el.innerHTML = `<div class="acct-card saved"><p class="acct-line">Saving…</p></div>`;
  try {
    const res = await saveRun(r);
    const rows = await topScores(boardId(r), 10);
    const me = user.uid;
    const line = res.isNew ? `New best for <b>@${esc(profile.username)}</b>`
      : r.score >= res.best ? `Saved to <b>@${esc(profile.username)}</b>`
      : `Saved to <b>@${esc(profile.username)}</b> · your best is ${res.best}`;
    el.innerHTML = `
      <div class="acct-card saved">
        <p class="acct-line">${line}</p>
        <div class="lb">
          <div class="lb-h"><span>Leaderboard</span><span>${r.mode === 'timed' ? 'Timed' : 'No pressure'}</span></div>
          <ol>${rows.map((x, i) => `
            <li class="${x.uid === me ? 'me' : ''}">
              <span class="lb-rk">${i + 1}</span>
              <a class="lb-nm" href="profile.html?u=${encodeURIComponent(x.username)}">@${esc(x.username)}</a>
              <span class="lb-sc">${x.best}<small>/${x.total}</small></span>
            </li>`).join('')}
          </ol>
        </div>
      </div>`;
  } catch (err) {
    console.warn(err);
    el.innerHTML = `<div class="acct-card saved"><p class="acct-line">Couldn’t save this one. Your score is still on this device.</p></div>`;
  }
}

/* ---------- profile page ---------- */
async function paintProfilePage() {
  const root = $('profile');
  const wanted = cleanName(new URLSearchParams(location.search).get('u'));
  if (wanted) return paintPublic(root, wanted);
  if (!user) {
    root.innerHTML = `
      <div class="pf-empty">
        <h1>Your profile</h1>
        <p>Sign in to keep your best scores and show up on the leaderboards.</p>
        <button type="button" class="gbtn" id="pfGo">${GOOGLE_G}<span>Continue with Google</span></button>
        <p class="acct-err" id="acctErr" hidden></p>
      </div>`;
    $('pfGo').onclick = async () => {
      try { await signIn(); } catch (e) { showErr('Sign-in didn’t go through. Try again?'); console.warn(e); }
    };
    return;
  }
  paintEdit(root);
}

async function paintPublic(root, name) {
  root.innerHTML = '<p class="pf-loading">Loading…</p>';
  try {
    const n = await fb.getDoc(fb.doc(fb.db, 'usernames', name));
    if (!n.exists()) { root.innerHTML = `<div class="pf-empty"><h1>@${esc(name)}</h1><p>No one goes by that name.</p></div>`; return; }
    const uid = n.data().uid;
    const [p, bests] = await Promise.all([
      fb.getDoc(fb.doc(fb.db, 'users', uid)),
      fb.getDocs(fb.collection(fb.db, 'users', uid, 'bests'))
    ]);
    const pd = p.data() || {};
    const mine = user && user.uid === uid;
    document.title = '@' + pd.username + ' · DietCokeMan Challenge';
    root.innerHTML = `
      <header class="pf-head">
        <h1>@${esc(pd.username)}</h1>
        ${pd.bio ? `<p class="pf-bio">${esc(pd.bio)}</p>` : ''}
        ${mine ? '<a class="ghost" href="profile.html">Edit profile</a>' : ''}
      </header>
      ${bestsTable(bests)}`;
  } catch (e) {
    console.warn(e);
    root.innerHTML = '<div class="pf-empty"><p>Couldn’t load this profile.</p></div>';
  }
}

function bestsTable(snap) {
  const rows = snap.docs.map(d => d.data()).sort((a, b) => a.title.localeCompare(b.title) || a.mode.localeCompare(b.mode));
  if (!rows.length) return '<p class="pf-none">No scores saved yet.</p>';
  return `<section class="pf-bests"><h2>Best scores</h2><ul>${rows.map(r => `
    <li>
      <a href="play.html?q=${encodeURIComponent(r.slug)}">${esc(r.title)}</a>
      <span class="pf-mode">${r.mode === 'timed' ? 'Timed' : 'No pressure'}</span>
      <span class="pf-sc">${r.best}<small>/${r.total}</small></span>
    </li>`).join('')}</ul></section>`;
}

async function paintEdit(root) {
  const bests = await fb.getDocs(fb.collection(fb.db, 'users', user.uid, 'bests'));
  const p = profile || { username: '', bio: '' };
  root.innerHTML = `
    <form class="pf-edit" id="pfForm" autocomplete="off">
      <h1>${profile ? 'Your profile' : 'Pick a username'}</h1>
      <label class="fld"><span>Username</span>
        <span class="at"><span>@</span><input id="pfUser" maxlength="20" value="${esc(p.username)}"
          autocapitalize="off" autocorrect="off" spellcheck="false"></span></label>
      <label class="fld"><span>Bio <i>optional</i></span>
        <textarea id="pfBio" maxlength="${BIO_MAX}" rows="3" placeholder="A line about you">${esc(p.bio || '')}</textarea>
        <small id="pfCount"></small></label>
      <p class="acct-err" id="acctErr" hidden></p>
      <div class="pf-actions">
        <button class="btn" type="submit" id="pfSave">Save</button>
        ${profile ? `<a class="ghost" href="profile.html?u=${encodeURIComponent(p.username)}">View public profile</a>` : ''}
      </div>
    </form>
    ${profile ? bestsTable(bests) : ''}
    <p class="pf-out"><button type="button" class="linkbtn" id="pfOut">Sign out</button></p>`;
  const bio = $('pfBio'), count = $('pfCount');
  const tick = () => { count.textContent = bio.value.length + '/' + BIO_MAX; };
  bio.oninput = tick; tick();
  $('pfUser').oninput = () => showErr('');
  $('pfOut').onclick = () => fb.signOut(fb.auth);
  $('pfForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = cleanName($('pfUser').value);
    const bad = nameProblem(name);
    if (bad) { showErr(bad); return; }
    const first = !profile;
    $('pfSave').disabled = true;
    try {
      await claimName(name, bio.value.trim().slice(0, BIO_MAX));
      if (first) await importLocalBests();
      paintTopbar();
      const s = $('pfSave');
      s.textContent = 'Saved';
      setTimeout(() => paintEdit(root), 900);
    } catch (err) {
      showErr(err.code === 'taken' ? '@' + name + ' is taken. Try another.' : 'Couldn’t save that. Try again?');
      if (err.code !== 'taken') console.warn(err);
      $('pfSave').disabled = false;
    }
  };
}

load();

# DietCokeMan Challenge — project brief

Read this before changing anything. It explains what the site is, how the pieces
fit, and the handful of decisions that look arbitrary but are not.

**Live:** <https://stevenlmiori.github.io/dietcokeman/>
**Repo:** `Stevenlmiori/dietcokeman` (GitHub Pages, `main` branch, root path)
**Owner:** Steven Miori. The GitHub CLI has two accounts — this repo belongs to
`Stevenlmiori`, so run `gh auth switch -u Stevenlmiori` before any `gh` command.

---

## 1. What this is

A Sporcle-style fill-in-the-blank quiz site Steven sends to friends. You type a
name, it fills itself in. No sign-in, no backend, no build step — five static
files on GitHub Pages.

It is **deliberately separate from the Astroworld fantasy tool**
(`Stevenlmiori/astroworld-keepers`). Do not cross-link them, and do not pull
Astroworld branding in here. Early drafts had a "Draft Room" link in the nav;
it was removed on purpose.

### Files

| File | What it is |
|---|---|
| `index.html` | The hub. Lists every quiz as a card. Reads `QUIZZES` directly. |
| `play.html` | The player shell: intro, sticky bar, board, result modal. |
| `engine.js` | All game logic — matching, scoring, timer, lives, persistence. |
| `quizzes.js` | **The only file you normally touch.** All quiz content. |
| `style.css` | Shared styling for both pages. |

No framework, no bundler, no dependencies. Open `index.html` through a local
server and it runs. `quizzes.js` is a plain `window.QUIZZES = [...]` so there is
no `fetch`, which means no CORS or async failure modes.

`bump.sh` stamps a fresh `?v=<timestamp>` on the `style.css`, `engine.js` and
`quizzes.js` links in both pages. **Run it before every commit that touches one
of those three files.** Steven's browser has served stale copies after a deploy
more than once; the stamp is the fix, not a nicety.

---

## 2. Adding a quiz

Append one object to `QUIZZES` in `quizzes.js`. It appears on the hub
automatically; nothing else needs editing.

```js
{
  slug:  'url-safe-id',          // becomes play.html?q=<slug>
  title: 'Shown everywhere',
  sub:   'one-line subtitle',
  blurb: 'longer line on the start screen',
  tag:   'NFL ALL-TIME',         // small pill on the hub card
  mode:  'timed',                // preselected: 'timed' | 'lives' | 'chill'
  time:  900,                    // seconds, for timed mode
  lives: 10,                     // wrong guesses allowed, for survival
  modes: ['timed','chill'],      // which buttons to offer; omit for all three
  cols:  'multi',                // 'multi' = responsive columns, 'single' = one
  hideSub: true,                 // hide each item's `sub` until that row solves
  groups: [{
    name: 'Group heading',
    note: 'right-side label',
    items: [
      { a:'Correct Answer', hint:'32.13', sub:'CIN', rk:'1.01', alias:['nickname'] }
    ]
  }]
}
```

**Item fields.** `a` is the answer. `hint` is the right-hand clue (points,
yards). `sub` is a small label between the name and the hint. `rk` overrides the
rank badge — use it for pick numbers like `1.01`; otherwise rows number
themselves. `alias` adds spellings the name itself doesn't imply.

### Two rules worth remembering

**Set `hideSub: true` whenever the sub-label would give the answer away.** On
*Top 5 by Position* the `sub` is the NFL team, and "CIN" beside a blank
quarterback is a free answer. On *Round 1 Recall* the `sub` is the drafting
manager, which **is** the clue, so that quiz leaves it visible.

**Use `modes` to drop modes that make no sense.** Survival is hidden on the
60-answer NFL quiz because ten strikes would end it in seconds.

### Source your data, don't recall it

Career and season leaderboards move. The NFL quiz was built by fetching
Wikipedia's maintained lists, not from memory:

* `List_of_NFL_career_passing_yards_leaders`
* `List_of_NFL_career_rushing_yards_leaders`
* `List_of_NFL_career_receiving_yards_leaders`

Pro Football Reference returns **403 to WebFetch** — don't bother. Those
Wikipedia pages carry a "current through Week N" note; record it. Active players
climb, so re-pull before trusting an old list.

---

## 3. How matching works (`engine.js`)

This is the part that makes the site feel good, and the part most likely to
break if you edit carelessly.

### Normalising

`norm()` strips accents, lowercases and removes every non-alphanumeric
character, so `Ka'imi` → `kaimi` and `C.J. Stroud` → `cjstroud`. `words()`
splits on whitespace only, so a hyphenated surname stays one word:
`Smith-Njigba` → `smithnjigba`.

### Which spellings are accepted (`keysFor`)

For each answer it generates: the name exactly as written, the name with any
suffix (`Jr`, `Sr`, `II`–`V`) dropped, the same minus noise words
(`the`, `a`, `an`, `of`, `and`), the first word, the surname group
(everything after the first word, joined), the final word, and any other single
word — **plus every `alias`**.

**Length floors are load-bearing.** A bare final word needs 3 characters, any
other bare middle word needs 4. Without these, `st` alone unlocked
*Amon-Ra St. Brown* and `me` unlocked *Dont Tread On Me*. Particles only count
inside a longer key. Do not relax these.

### Fuzzy tolerance (`close`)

Levenshtein distance: **1 edit at 5–7 characters, 2 at 8+. Under 5 characters
must be exact.** That floor is what stops `base` matching `Bass` and `lam`
matching `Lamb`. It also means `gibs` misses `Gibbs` — accepted trade.

### Exact beats fuzzy (`findMatches`)

If anything matches exactly, fuzzy results are discarded entirely. Without this,
typing the full name `Jim Brown` came back ambiguous because `timbrown` is one
edit away, and `payton` dragged in *Peyton Manning* alongside *Walter Payton*.

### A shared name sweeps every match

`Manning` fills Peyton **and** Eli. `Brown` fills Jim and Tim. `Henry` fills
Derrick Henry and Henry Ellard **across different sections** — `items` is one
flat list spanning all groups. This replaced an earlier "be more specific"
prompt, which Steven found to be friction for no gain. Keep the sweep.

### Typing vs. submitting

* **Every keystroke** runs `onInput()`. A match fills instantly — no Enter. This
  is what makes it feel fast.
* **Enter** runs `onSubmit()`. It only matters when nothing matched, and that is
  the *only* thing that costs a life.
* Re-guessing something already on the board, or any guess that matches nothing
  while under 4 characters, costs nothing.

---

## 4. The quiz page is one page

There is **no separate start screen**. Opening a quiz shows the board straight
away — every row blank — with the score and the clock already reading their
starting values. Steven asked for this explicitly after comparing it to Sporcle:
you should see what you are about to play before you commit to a mode.

The sticky bar has two states and swaps only its left half:

| | Left half | Right half |
|---|---|---|
| Before | `#pre` — the three mode chips, then **Play quiz** | the score and the clock |
| During | `#live` — the guess box | the score and the clock |

`boot()` builds the board and calls `updateStats()`; `start()` hides `#pre`,
shows `#live` and `#giveup`; `reset()` (wired to **Play again**) puts it all
back and rebuilds the board blank. The score and clock chips never move between
states, which is the whole point.

Two things to keep in mind if you touch this:

* **`[hidden]{display:none!important}` is required.** `.pre`, `.live` and
  `.mode` all set `display`, which beats the UA stylesheet's rule for the
  `hidden` attribute. Without it both halves of the bar render at once.
* **The guess box's form is `#live`, not `#form`.** Renaming it once left
  `$('form').addEventListener` throwing inside `boot()`, which silently killed
  every listener registered after it — typing, Enter and Give up all did
  nothing while the page still looked fine. Check the console after any change
  to `boot()`.

## 5. Layout rules that took a few tries

**The blank is an overlay, not a shrunken name.** `.nm` always spans the same
width; `.nm.blank::after` draws the grey bar. Originally the blank had
`max-width:140px`, which let the team and score slide right the moment a row
filled. Both columns must sit at identical x positions solved or not.

**Hiding a sub-label uses `visibility`, never `display`** — for the same reason.

**On phones only the HUD is sticky.** `.topbar` is `position:static` under
640px; two stacked sticky bars ate a third of the screen.

**The guess input must stay at 16px** or iOS zooms the page on focus.

**Sort arrows are not in flow on numeric headers** — this is inherited wisdom
from the sibling Astroworld project; if you add a table here, remember that
`position:relative` on a sticky header silently kills the stickiness.

---

### The result card must be dismissable

It sits on top of the board it is describing, so "Here's everything you missed"
is a lie unless you can get past it. Four ways out — the X, **See what I
missed**, the backdrop and Escape — and `Give up & reveal` becomes
**Show results** afterwards so the card can be brought back. If you touch
`end()` or the modal, keep all of them.

## 6. Testing

Serve the folder — `file://` works but a server matches production:

```
python3 -m http.server 8901
```

`engine.js` exposes `window._dcm` for driving it from the console:

| Call | What it does |
|---|---|
| `_dcm.findMatches('mccaffery')` | **Pure** — does not mutate state. Use this for matcher tests. |
| `_dcm.guess('burrow')` | Simulates typing. Fills on match. |
| `_dcm.submit('wrong')` | Simulates Enter. Can cost a life. |
| `_dcm.state` | `{ total, filled, wrong, left, running, mode }` |
| `_dcm.items()` | Every item, with `_keys` resolved. |

**Test the matcher with `findMatches`, not `guess`.** An early test used `guess`
and looked like it passed with 30/30 — but each guess had filled the answer, so
later variants reported "already got it" rather than actually being checked.

Two checks worth re-running after any matcher change:

1. **Self-lookup** — every `_dcm.items()` entry, searched by its own `a`, must
   return exactly itself.
2. **Leak check** — short particles (`st`, `on`, `me`, `bay`, `the`, `iii`,
   `jr`) must return zero hits.

---

## 7. Deploying

```
./bump.sh && git add -A && git commit -m "..." && git push origin main
```

GitHub Pages serves from `main` at root. It takes 30–60 seconds. Verify with a
cache-busting request rather than trusting the browser:

```
curl -s "https://stevenlmiori.github.io/dietcokeman/quizzes.js?cb=$RANDOM" | grep -c "slug:"
```

Steven's browser has repeatedly served **stale cached copies** after a deploy —
if something looks wrong, confirm the live file with `curl` before debugging.

---

## 8. Branding

Icy chrome and crisp red, evoking a cold soda can. "DietCokeMan" is Steven's own
fantasy-team handle.

**All artwork is original SVG drawn in-repo.** Do not reproduce Coca-Cola's
logo, wordmark or trade dress, and do not imply affiliation. The footer carries
a one-line disclaimer — keep it, especially if real images are ever dropped in.

### Assets

Real photography lives in `assets/`, supplied by Steven (generated with ImageGen):

| File | Used as |
|---|---|
| `hero-ice-desktop.webp` | The hub hero at ≥721px. 1920×640, anchored right, text in its dark left side. |
| `hero-ice-mobile.webp` | The hub hero below 721px. 960×720, a band above the title. |
| `frosted-can-icon.png` | Top-bar mark on both pages, and the favicon. 96×96. |
| `football-ice.jpg` | `og:image` link preview. 1200×630. |
| `frosted-can.webp`, `ice-banner.webp` | Unused since the photo hero landed. Kept in case a quiz wants them. |

**Only one hero image is ever downloaded.** The mobile one lives on `.heroshot`,
which is `display:none` above 721px; the desktop one lives inside the
`min-width:721px` media query. A background image on a hidden element, or inside
an unmatched query, is never fetched. Verify on a *clean* load — revisiting in a
tab that already saw the other size shows a cached revalidation and looks like a
double download when it isn't.

`.hero` bleeds past `.wrap` with `margin-inline: calc(50% - 50vw)` and fades its
bottom into `#070A0E`. If you touch that, re-check
`scrollWidth - clientWidth === 0` at 375px — the bleed is the easiest way to
introduce a horizontal scrollbar.

`.herotext` cannot use a percentage inline padding to line up with the cards: it
sits inside the full-width `.hero`, so `50%` resolves against `100vw` and
collapses to nothing. It mirrors `.wrap`'s own sizing instead
(`width:min(1140px,100% - 32px);margin-inline:auto`).

The can images show a real Diet Coke label. Steven supplied them knowing that;
keep the non-affiliation line in the footer.

Cards deliberately have **no** gradient top border — an earlier version had a
red-to-cyan hairline on each and it read as clutter.

**No multi-coloured pills.** The hub cards once carried a cyan tag chip, a red
answer-count chip and a green best chip; Steven's verdict was "typical AI slop".
A card now shows a muted uppercase tag, the title, the subtitle and one quiet
line of `30 answers · Timed 5:00 · Best 10`. The single `.pill` class that
survives — used only in the result card — is deliberately neutral grey. Don't
reintroduce coloured variants.

---

## 9. Current quizzes

| Slug | Title | Answers | Modes |
|---|---|---|---|
| `top5-by-position` | Top 5 by Position | 30 | Timed 5:00 · Survival · Chill |
| `round-one-recall` | Round 1 Recall | 12 | Survival · Timed · Chill |
| `nfl-all-time-top20` | NFL All-Time Top 20 | 60 | Timed 15:00 · Chill |

The two Astroworld quizzes are snapshots of the 2026 season — the Top 5 figures
are averages through roughly Week 10, and Round 1 is that year's draft. They do
not auto-update. A removed fourth quiz, "Name the League", was cut as too easy.

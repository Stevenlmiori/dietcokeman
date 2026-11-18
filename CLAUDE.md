# DietCokeMan Challenge — project brief

Read this before changing anything. It explains what the site is, how the pieces
fit, and the handful of decisions that look arbitrary but are not.

**Live:** <https://challenge.dietcokeman.com/>
**Repo:** `Stevenlmiori/dietcokeman` (GitHub Pages, `main` branch, root path)
**Domain:** `challenge.dietcokeman.com` — a Cloudflare CNAME (DNS only, grey
cloud) to `stevenlmiori.github.io`, set as the repo's Pages custom domain, with
HTTPS enforced. The old `stevenlmiori.github.io/dietcokeman/` links redirect
here, so links already texted keep working. Keep the `CNAME` file in the repo
root and keep the Cloudflare proxy off — GitHub issues the certificate.
**Owner:** Steven Miori. The GitHub CLI has two accounts — this repo belongs to
`Stevenlmiori`, so run `gh auth switch -u Stevenlmiori` before any `gh` command.

---

## 1. What this is

A Sporcle-style fill-in-the-blank quiz site Steven sends to friends. You type a
name, it fills itself in. No build step — static files on GitHub Pages. Sign-in
is optional (Google, via Firebase) and only saves scores; see §11.

It is **deliberately separate from the Astroworld fantasy tool**
(`Stevenlmiori/astroworld-keepers`). Do not cross-link them, and do not pull
Astroworld branding in here. Early drafts had a "Draft Room" link in the nav;
it was removed on purpose.

### Files

| File | What it is |
|---|---|
| `index.html` | The hub. Lists every quiz as a card, with search and filters once there are enough quizzes. Reads `QUIZZES` and `TAXONOMY` directly. |
| `play.html` | The player shell: intro, sticky bar, board, result modal. |
| `engine.js` | All game logic — matching, scoring, timer, lives, persistence. |
| `quizzes.js` | **The only file you normally touch.** All quiz content. |
| `style.css` | Shared styling for every page. |
| `account.js` | Optional accounts: Google sign-in, profile, saved bests, leaderboards (§11). |
| `profile.html` | Your profile (edit) or anyone's (`?u=name`). |
| `firestore.rules` | The server-side rules for the account data. Paste into the Firebase console when changed. |

No framework, no bundler, no dependencies. Open `index.html` through a local
server and it runs. `quizzes.js` is a plain `window.QUIZZES = [...]` so there is
no `fetch`, which means no CORS or async failure modes.

`bump.sh` stamps a fresh `?v=<timestamp>` on the `style.css`, `engine.js`,
`quizzes.js` and `account.js` links in every page. **Run it before every commit that touches one
of those files.** Steven's browser has served stale copies after a deploy
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
  category: 'Sports',            // required: one of TAXONOMY.categories
  tags:  ['NFL','Football','All-Time'], // required: from TAXONOMY.tags — league, sport, kind
  mode:  'timed',                // preselected: 'timed' | 'chill'
  time:  900,                    // seconds, for timed mode
  modes: ['timed','chill'],      // which buttons to offer; omit for both
  cols:  'multi',                // 'multi' = responsive columns, 'single' = one, 'two'/'four' = fixed columns on desktop
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
quarterback is a free answer. Leave it visible only when the `sub` **is** the
clue (the removed *Round 1 Recall* showed each pick's drafting manager).

**There is no wrong-guess mode, and there must not be one.** A quiz that fills
itself in as you type cannot charge you for a guess, because a *correct* guess
never needs submitting — you could clear a ten-lives game without losing a
single life by simply never pressing Enter. Steven spotted it:

> "as far as guessing wrong it really functionally doesn't make sense right
> now, since as soon as they type something right it gives them the answer"

Survival mode was removed rather than patched. Sporcle has no such mode either,
for exactly this reason. Timed and No pressure are the two modes; `wrong` is
still counted internally so a bad Enter can shake the box, but it is not shown
anywhere and it ends nothing. If you ever want pressure back, it has to be
something the game can observe without asking the player to commit — a shot
clock that resets on every find is the obvious candidate.

**Use `modes` to drop a mode that makes no sense for a quiz.**

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

### Categories and tags (`TAXONOMY`)

Steven: "create a category taxonomy and make sure quizzes get categories and
tags… so that when there's a ton of quizzes someday, search and filtering
works well." The single source of truth is `window.TAXONOMY` at the top of
`quizzes.js`:

* **Categories** (exactly one per quiz): `Sports`, `Movies`, `TV`,
  `Business`, `Food & Drink` — more as the site grows. Add it to the list
  before using it.
* **Tags** (a few per quiz), in three groups, written in this order:
  * league — `NFL`, `NBA`, `MLB`, `NHL`, `NCAA`
  * sport — `Football`, `Basketball`, `Baseball`, `Hockey`
  * market — `S&P 500`, `Companies`
  * topic — `Drinks`, `Restaurants`, `Box Office`, `Oscars`, `Favorites`
  * kind — `All-Time`, `This Season`, `Throwback` (a past season), `Career Leaders`, `Awards`, `Fantasy`, `Betting`

Every quiz must carry a category and tags. The hub warns in the browser
console about a missing or unknown one, so check the console after adding a
quiz. **Don't invent a near-duplicate** ("NBA Basketball", "Alltime"): use the
existing word or add a new one to `TAXONOMY` deliberately. The weekly Line Game
rewrite must keep `category`/`tags`.

**The hub's search and filters** (search box, category row, tag row) are
always shown — Steven chose that over hiding them until the hub grew ("Show it
now"). The category row only appears once two categories are in use. Links
carrying `?q=`, `?category=` or `?tag=` open pre-filtered — e.g. `/?tag=NBA`,
`/?q=mvp`, `/?tag=Football&q=all-time` — and the URL follows the filters, so a
filtered view can be texted. Search matches title, subtitle, blurb, category and tags;
it **never searches answers**, which would reveal who is on the board.
Filters show only values some quiz actually uses. Cards show the title, the
subtitle and **one emoji in the top-right corner** (Steven asked for it), bare,
no tile or border ("lose the border… you just need the icon itself"); it
tilts slightly on hover. The emoji comes from
`TAXONOMY.icons`: a quiz's own `icon` if set, else its first tag with an icon
(Football 🏈, Basketball 🏀, Baseball ⚾, Golf ⛳, Drinks 🥤, Restaurants 🍔,
Oscars 🏆, Box Office 🎬, Stocks 📈…), else its category's (Sports 🏆, Movies
🎬, TV 📺, Business 💼, Food & Drink 🍽️). Add an icon when you add a tag or
category. Still no tag chips on cards (see §8).

## 3. How matching works (`engine.js`)

This is the part that makes the site feel good, and the part most likely to
break if you edit carelessly.

### Normalising

`norm()` strips accents, lowercases and removes every non-alphanumeric
character, so `Ka'imi` → `kaimi` and `C.J. Stroud` → `cjstroud`. `words()`
splits on whitespace only, so a hyphenated surname stays one word:
`Smith-Njigba` → `smithnjigba`.

### Which spellings are accepted (`keysFor`)

**Full name, last name, an unusual first name, or a nickname. Never a common
first name on its own.** For each answer it generates: the name exactly as
written, the name with any suffix (`Jr`, `Sr`, `II`–`V`) dropped, the same
minus noise words, the first name **if it is not on `COMMON_FIRST`**, the
surname group (everything after the first word, joined), the final word, any
later single word — **plus every `alias`**.

The history, because both halves were Steven's asks:

1. First names used to count, and they were a free pass: spraying
   `tom, tim, john, jim, drew, tony…` filled **27 of 60** on NFL All-Time
   Top 20 ("getting right answers they didn't earn"). So first names were cut.
2. Then: "unique first names and even nicknames should be accepted" — Puka,
   Shaq, Luka, Penny, Yao, Brock, Amon-Ra, CeeDee. So an unusual first name
   counts again, gated by **`COMMON_FIRST`** in `engine.js` (~330 ordinary
   first names: tom, james, kevin, barry, karl…). Only names *not* on the list
   count alone. When in doubt, add a name to the list: a missed unusual name
   costs one extra word, a missed common name hands out free answers.
3. **Nicknames are always an `alias`** (shaq, penny, magic, melo, kd, cp3,
   the mailman, big ben, tb12…). They can't be derived from the name. **Add
   them whenever you build a quiz** — this is now a standing rule for every
   quiz, not a nice-to-have.

**A loose key that two different players share is dropped from both**
(`keys.loose`, pruned in `boot()`). Unusual first names and suffix-dropped
names are loose. "brock" is Brock Purdy *and* Brock Bowers on NFL Fantasy
Leaders, so it counts for neither there (it would hand over Bowers on the way
to Purdy); on a board with one Brock it works. "Tim Hardaway Jr." minus the Jr.
is his father, also on the NBA board, so the son needs his Jr. The same player
listed in several sections (LeBron on seven NBA lists) is one player and keeps
his keys.

**`match: 'full'` on a quiz** drops the last-name shortcut too: full name or an
alias only. Every non-person quiz uses it (companies, teams, titles, drinks); the
fine print then reads "Full names or the names people actually use". It is also the next step if surname spraying
(`smith, brown, jones…` still fills ~19 of 60 on All-Time Top 20) turns out to
matter once leaderboards are live. The fine print switches to "Full names
only" automatically.

**Length floors are load-bearing.** A bare final word needs 3 characters, any
other bare later word needs 4. Without these, `st` alone unlocked
*Amon-Ra St. Brown* and `me` unlocked *Dont Tread On Me*. Particles only count
inside a longer key. Do not relax these.

### Fuzzy only happens on Enter

**Typing never fuzzy-matches.** `onInput` fills an answer only when what you
have typed is an exact key; `onSubmit` (Enter) is the only place `close()` is
consulted, and a near-miss that lands there costs nothing.

This is not a tuning preference, it is the fix for a real complaint. Matching
ran on every keystroke, so every half-finished name was tested against the whole
board — typing `Brock P` on the way to Brock Purdy silently handed over **Brock
Bowers**, because `brockp` and `brockb` are one edit apart. Steven's words:
"I find myself getting credit for players I'm not thinking of." Getting credit
for someone you were not thinking of is worse than having to spell a name right,
so typing is strict and Enter is generous.

### Fuzzy tolerance (`close`)

Four guards, all of them needed:

* both strings at least **6 characters** (was 5)
* the **first letter must match** — typos land in the middle, not the start
* lengths within **one** of each other
* **1 edit below 10 characters, 2 at 10+** (was 2 at 8+)

`lev()` is optimal string alignment, not plain Levenshtein: swapping two
neighbouring letters costs **one** edit. `mccaffery` for `mccaffrey` is the slip
people actually make, and plain Levenshtein scores it as two unrelated mistakes,
which would have forced the threshold back open.

`midWord()` is the last guard. If the guess is a strict prefix of any key on the
board, fuzzy is skipped entirely — someone five letters into a name is typing,
not misspelling.

### Exact beats fuzzy (`findMatches`)

If anything matches exactly, fuzzy results are discarded entirely. Without this,
typing the full name `Jim Brown` came back ambiguous because `timbrown` is one
edit away, and `payton` dragged in *Peyton Manning* alongside *Walter Payton*.

### A surname that starts another name waits (`held`)

Some surnames are also the start of another answer's full name: `james`
(Edgerrin James / **James** Lofton), `henry` (Derrick Henry / **Henry**
Ellard), `chase` (Ja'Marr Chase / **Chase** McLaughlin). While typing,
`findMatches` returns `held: true` instead of filling, and the toast says
"Keep typing, or press Enter". Keep typing and the longer name lands alone;
press Enter and the surname lands. Without this, typing "James Lofton" handed
over Edgerrin James on the way — the Brock Purdy bug in a new costume.

### A shared name sweeps every match

`Manning` fills Peyton **and** Eli. `Brown` fills Jim and Tim, **across
different sections** — `items` is one flat list spanning all groups. (`Henry`
used to fill Henry Ellard too; since first names stopped counting it fills only
Derrick Henry.) This replaced an earlier "be more specific"
prompt, which Steven found to be friction for no gain. Keep the sweep.

### Typing vs. submitting

* **Every keystroke** runs `onInput()`. A match fills instantly — no Enter. This
  is what makes it feel fast.
* **Enter** runs `onSubmit()`. It only matters when nothing matched, and that is
  the *only* thing that costs a life.
* Re-guessing something already on the board costs nothing. Nothing costs
  anything any more — see §2 on why the wrong-guess mode is gone. A failed
  Enter shakes the box and says so, and that is all it does.

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

`findMatches` takes a second argument: `findMatches(g)` is what typing does,
`findMatches(g, true)` is what Enter does. Its result carries `how`, either
`'exact'` or `'fuzzy'`.

Six checks worth re-running after any matcher change, on **every** quiz:

1. **Self-lookup** — every `_dcm.items()` entry, searched by its own `a`, must
   return exactly itself.
2. **Leak check** — short particles (`st`, `on`, `me`, `bay`, `the`, `iii`,
   `jr`) must return zero hits.
3. **Typing leak** — for every answer, every prefix of it passed to
   `findMatches(prefix)` must never return a *different* answer. The only
   permitted hits are genuinely shared surnames: `manning` taking Peyton and
   Eli, `brown` taking Jim and Tim. Anything else is the bug above coming back.
5. **First-name spray** — common first names (`tom`, `tim`, `john`, `jim`,
   `drew`, `tony`, `josh`, `justin`…) passed to `findMatches(g, true)` must
   return zero hits, except where the name is also someone's *surname* on
   that board (`james` → LeBron James, `paul` → Chris Paul) — that's legit.
6. **Shared loose keys** — no unusual first name or Jr.-less name may fill two
   different players (`brock`, `tim hardaway`).
4. **Enter fuzz** — every answer and every single word of it, passed to
   `findMatches(g, true)`, must never fuzzy-match a *different* answer. This
   currently returns zero across all three name quizzes; it should stay zero.

---

## 7. Deploying

```
./bump.sh && git add -A && git commit -m "..." && git push origin main
```

GitHub Pages serves from `main` at root. It takes 30–60 seconds. Verify with a
cache-busting request rather than trusting the browser:

```
curl -s "https://challenge.dietcokeman.com/quizzes.js?cb=$RANDOM" | grep -c "slug:"
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
A card now shows the title and the subtitle — nothing else. The muted
all-caps tag above the title went too; Steven: "duplicative ... ALL CAPS AI
slop". Don't add small uppercase labels above headings anywhere on the site. The answer count, mode/time and best score line was cut too ("these
aren't needed"), and so was a "Play →" row: the whole card is the link. The single `.pill` class that
survives — used only in the result card — is deliberately neutral grey. Don't
reintroduce coloured variants.

---

## 9. The Line Game (`type: 'lines'`)

A game Steven and his brother play by text: every game of the coming NFL week
is listed away @ home, and you guess the Vegas spread. Within **one point** of
the real line is right, **exactly one off included**. The player is not told
who is favored; they pick the favorite with a two-button toggle, then type the
number (0 = pick'em).

* `line` on each item is the **home** team's spread: negative = home favored,
  positive = away favored. `aw`/`hm` are the button labels. `where` marks a
  neutral site (Vikings @ 49ers in Mexico City).
* Grading compares guess and line on that one signed scale, so a wrong-favorite
  pick only survives on a game within a point of pick'em.
* **Each game is graded the moment it is submitted** (the red check, or Enter
  in its spread box). Steven asked for this over grading the whole slate at
  the end. The row turns green or red, shows `Hit · line HOU -10.5`, locks,
  and focus jumps to the next open game. A submit with no favorite picked
  nudges the toggle instead of grading.
* The HUD shows Hits and the clock; its left half reads `N of 13 games in`.
  The run ends by itself once all games are in, or on the clock, or with
  **Stop & finish** (the Give up button), which marks unsubmitted games as
  misses and reveals their lines. It then becomes **Show results** as usual.
* The guess box and the name matcher are not used.
* **Copy my result is spoiler-free**: title, `N/13 within a point`, one
  green/red square per game in board order, and the link. It must never show a
  pick or a real line. Steven texts it as a challenge, and an earlier version
  that listed every line gave the whole quiz away.
* **One permanent quiz, replaced weekly.** Slug is always `line-game`, so the
  link Steven texts never changes; `scoreKey` (`line-game-2026-wNN`) keeps each
  week's best score separate. Old week-specific links (`?q=line-game-2026-w11`)
  fall through to the current Line Game. A scheduled task rewrites this entry
  every Tuesday morning for the rest of the season. (As of 2026-11-17 no such
  task exists on this Mac's scheduled tasks or in claude.ai routines; if it
  lives elsewhere, it must keep the entry's `category` and `tags`.)
* Lines are a snapshot. **Use BetMGM, and pull the lines published that same
  day.** Steven caught Week 11 shipping with a day-old page, and most numbers
  had moved. BetMGM posts one page per game at
  `sports.betmgm.com/en/blog/nfl/<away>-<home>-prediction-odds-player-prop-bets-picks-week-N-jaa/`
  (Raiders-Broncos sat under `/blog/article-new/`), each stating "the spread
  sitting at -X" with a timestamp. Yahoo Sports' weekly list is also BetMGM but
  is usually posted Monday morning and goes stale. Note the date in the blurb. For a new week, add a new quiz with
  a new slug rather than overwriting, so old best scores stay meaningful.

`bump.sh` uses macOS `sed -i ''`; on Linux run the same substitution with
`sed -i -E`.

---

## 10. Current quizzes

| Slug | Title | Answers | Modes |
|---|---|---|---|
| `best-drink` | Best Drink of All Time — **always first on the hub** | 1 (Diet Coke) | Timed 0:30 · No pressure |
| `disney-princesses` | Disney Princesses — **for Jamesyn (Steven's daughter, 10)**; 13 official + Anna & Elsa bonus; opens in No pressure | 15 | No pressure · Timed 3:00 |
| `dietcokeman-favorite-movies` | DietCokeMan's Favorite Movies — Steven's own ranked 64, **second on the hub**; years from Wikipedia short descriptions | 64 | Timed 10:00 · No pressure |
| `top5-by-position` | NFL Fantasy Leaders (QB/RB/WR/TE through Week 10, 2026) | 20 | Timed 5:00 · No pressure |
| `nfl-all-time-top20` | NFL All-Time Top 20 | 60 | Timed 15:00 · No pressure |
| `nba-top25-by-category` | NBA Top 25 by Category (8 career stats) | 200 | Timed 15:00 · No pressure |
| `nfl-mvps` | NFL MVPs (AP, 1957–2025, by decade) | 71 | Timed 10:00 · No pressure |
| `nba-mvps` | NBA MVPs (1955-56 – 2025-26, by decade) | 71 | Timed 10:00 · No pressure |
| `mlb-career-hr` | MLB All-Time Home Runs (top 50, through 2026) | 50 | Timed 8:00 · No pressure |
| `sp500-since-1957` | Still in the S&P 500 Since 1957 (52, full names) | 52 | Timed 10:00 · No pressure |
| `nfl-top3-wr-2010` | NFL Top 3 WRs: 2010 — Steven's sheet; one box per team (32), jersey # clue | 96 | Timed 12:00 · No pressure |
| `nfl-first-overall-picks` | No. 1 Overall NFL Draft Picks (1990–2026) | 37 | Timed 6:00 · No pressure |
| `heisman-winners` | Heisman Trophy Winners (1980–2025) | 46 | Timed 8:00 · No pressure |
| `world-series-champions` | World Series Champions (1980–2026, full) | 46 | Timed 6:00 · No pressure |
| `masters-champions` | Masters Champions (1980–2026) | 47 | Timed 6:00 · No pressure |
| `highest-grossing-movies` | Highest-Grossing Movies (top 25, Nov 8 2026, full) | 25 | Timed 6:00 · No pressure |
| `best-picture-winners` | Best Picture Winners (1990–2025, full) | 36 | Timed 7:00 · No pressure |
| `biggest-us-companies` | Biggest US Companies Right Now (Nov 17 2026, full) | 25 | Timed 5:00 · No pressure |
| `best-selling-sodas` | America's Best-Selling Sodas (top 10, full) | 10 | Timed 2:00 · No pressure |
| `biggest-fast-food-chains` | Biggest Fast-Food Chains (QSR 50 2026, full) | 25 | Timed 5:00 · No pressure |
| `line-game` | NFL Line Game: Week 11 (replaced weekly) | 13 games | No pressure · Timed 5:00 |

The slug stays `top5-by-position` even though the title changed, so old links
keep working. Don't rename a slug to match a title. When a quiz's answer set
changes (kickers and defenses cut, 30 → 20), give it a new `scoreKey`
(`top5-by-position-2026-w10`) so old bests don't sit on the new leaderboard,
and delete the old Firestore rows (`boards/<old>-<mode>/entries/*`,
`users/*/bests/<old>-<mode>`) — Steven: "it won't be apples to apples."
That was done for the 30-answer version (one row, @dietcokeman 23/30).

NFL Fantasy Leaders is a snapshot of the 2026 season through Week 10 and does
not auto-update. NBA Top 25 by Category is Basketball-Reference's **NBA-only**
career leaders (not NBA+ABA — Moses Malone's 27,409 points, not 29,580),
pulled 2026-11-17 through games of Nov 16; active players' totals move
nightly, so re-pull (`basketball-reference.com/leaders/<stat>_career.html`,
table `#nba`) before trusting it. Basketball-Reference does answer curl with a
browser user agent; the Wikipedia list pages are redirects. A name fills every
list it is on, and the toast says "LeBron James ×6" rather than repeating it.

**NFL MVPs** is Pro-Football-Reference's AP list (Steven's paste), checked
against Wikipedia's "AP NFL Most Valuable Player". PFR skips **1960**;
Wikipedia lists Norm Van Brocklin, so he is in. Sources disagree on 1958–60
(Gino Marchetti, Charlie Conerly, Joe Schmidt); co-MVPs 1997 (Favre, Sanders)
and 2003 (Manning, McNair) each get a row. PFR returns 403 to curl too.
**NBA MVPs** is Basketball-Reference `/awards/mvp.html` (table `#mvp_NBA`) and
matched Steven's paste exactly; clues are team and points per game. Both use
the year/season as the row badge (`rk`), which is why `.rk` now grows to fit
instead of being a fixed 22px square. A common first name never lands a
forgiven typo on Enter either ("walter" is not Walker).

**MLB All-Time Home Runs** is Baseball-Reference `/leaders/HR_career.shtml`
(table `#leader_standard_HR`, curl works with a browser UA), top 50 through
the 2026 season — a tie at #49 lands it on exactly 50. Ties share a rank.
B-R lists "Henry Aaron"; the quiz shows Hank Aaron (Henry is an alias).
Active players to re-pull next season: Giancarlo Stanton (456).

**Still in the S&P 500 Since 1957** — Wikipedia "List of S&P 500 companies"
(S&P's data), every member whose Date added is 1957-03-04: 52 companies, some
through a predecessor (Altria = Philip Morris, RTX = United Aircraft, S&P
Global = McGraw-Hill, Exelon = Commonwealth Edison, Honeywell = Allied). Next
oldest is Sherwin-Williams (1964). **Company quizzes use `match: 'full'`**:
"general", "energy", "southern" must not count, so the everyday names (coke,
p&g, exxon, ge, big blue, john deere, con ed) are aliases. Re-pull when S&P
drops one of them. Rows are sorted by headquarters within each sector so the
order gives nothing away.

**Kids' quizzes (for Jamesyn, 10).** Tag them `Kids` (+ `Disney` etc.). They
open in **No pressure** (`mode: 'chill'`), use clues that don't give the answer
away (Disney Princesses shows year + sidekick, not the movie title, which
*is* the answer for Mulan, Moana, Raya…), carry generous misspelling aliases
(rapunzle, jasmeen, pocahantas) plus "princess X", and use `nope` for friendly
replies to near-misses (Princess Peach → "Wrong castle! Peach is from Mario.").
Keep all copy kind and simple.

**Best Drink of All Time** — Steven's joke quiz: one answer, Diet Coke, first
on the hub. `match: 'full'` so plain "coke" doesn't land. It uses **`nope`**, a
per-quiz map of normalised wrong guesses to custom replies (pepsi →
"Absolutely not.", coke zero → "The impostor. Try again."). Any quiz can use
`nope`; keep the replies short and without em dashes.

**Batch of nine, 2026-11-17** — sources and what goes stale:
* No. 1 picks, Heisman, World Series, Masters, box office, Best Picture:
  Wikipedia via the API (`action=parse&prop=wikitext`). A reusable table parser
  lives in the session scratchpad pattern: split on `\n|-`, clean templates;
  World Series years are `{{wsy|YYYY}}`, Best Picture winners are the bold
  (`'''''`) row, box-office grosses can be `{{formatnum:{{#expr:...}}}}`
  arithmetic (Wikipedia's corrections to Box Office Mojo) — evaluate it.
  Heisman 2022 (Caleb Williams) failed to parse and was added by hand; Masters
  countries are added by hand (the table is flags).
* **Stale-fast ones:** Biggest US Companies (companiesmarketcap.com, re-pull and
  change the date in the blurb), Highest-Grossing Movies (two 2026 films still
  in release when pulled), Fast-Food (QSR 50, annual each summer), Sodas
  (Beverage Digest, annual each spring; 2025 top 5 confirmed, 6–10 are the
  last fully published order).
* A leading "The" is optional in every answer ("Silence of the Lambs",
  "Lion King", "Odyssey").

**Enter never forgives a typo onto a different answer when the guess is a
word that's part of answers' names** (`parts` in engine.js): "energy" (Xcel
Energy, CMS Energy) is not Entergy. Removed quizzes: "Name the League" (too easy) and "Round 1
Recall" (a test/placeholder, deleted 2026-11-17 along with its saved scores).
An old `?q=` link to a removed quiz falls through to the first quiz, which
is Best Drink of All Time.

---

## 11. Accounts (optional, Firebase)

Steven's call: **playing never needs an account.** Sign-in is offered in one
place, the result card after a quiz ("Save your score" → Continue with Google /
Not now), plus a quiet "Sign in" / `@name` link in the top bar. "Not now" hides
the offer for the rest of that visit. No pop-ups anywhere else.

The top-bar **Sign in signs you in where you are** (popup) and leaves you on
that page — it used to link to the profile page and strand you there (Steven
caught it). Only a brand-new account, which still needs a username, is sent to
`profile.html?next=<page>`, and saving the username sends it back. `next` only
accepts a bare `something.html[?query]` on this site, never a URL.

* **Project:** `dietcokeman-12f1e` (console: console.firebase.google.com/project/dietcokeman-12f1e),
  Spark plan, Firestore `(default)` in nam5, Google provider on, public-facing
  name "DietCokeMan Challenge", `challenge.dietcokeman.com` authorized.
* **Sign-in runs from our own domain.** `authDomain` is
  `challenge.dietcokeman.com`, not `dietcokeman-12f1e.firebaseapp.com` — with
  the default, Google's consent screen said "dietcokeman-12f1e.firebaseapp.com
  wants to access your Google Account" (Steven: not very lovely). Firebase's
  helper is self-hosted in `__/auth/` (copied unmodified from the
  firebaseapp.com domain; `handler`/`iframe` saved as `.html`), `.nojekyll`
  lets Pages serve the underscore folder, and the Google Cloud OAuth client
  "Web client (auto created by Google Service)" lists
  `https://challenge.dietcokeman.com` as an origin and
  `https://challenge.dietcokeman.com/__/auth/handler` as a redirect URI.
  Showing the name **"DietCokeMan Challenge"** instead of the domain needs
  Google brand verification (Google Auth Platform → Branding), not done yet.
* **Owner:** the Firebase project lives on **sylvanmiori@gmail.com** (Steven's
  choice; same account as the Cloudflare DNS), not stevenlmiori.
* **Stack:** Firebase Auth (Google only) + Firestore, loaded from gstatic as ES
  modules (`firebasejs/13.1.0`). Free Spark plan, no card on file, so it can't
  bill. Hosting stays on GitHub Pages. Sign-in uses **popup**, not redirect —
  redirect sign-in breaks in Safari on non-Firebase hosts. If iPhone sign-in
  ever misbehaves, the fix is moving hosting to Firebase Hosting (also free).
* **Live since 2026-11-17.** `firebaseConfig` at the top of `account.js` is
  public by design (rules decide access). If it is emptied, or Firebase fails to
  load, `account.js` does nothing and the site behaves as before.
* **Decoupled from the engine.** `end()` dispatches `dcm:end` with
  `{slug, scoreKey, title, mode, score, total}`; `account.js` listens. The
  engine never imports Firebase.
* **Profile is deliberately tiny:** unique username (`a-z 0-9 _`, 3–20,
  stored lowercase) + optional bio (160). No photos.
* **Data:** `users/{uid}`, `usernames/{name}` (one doc per name = uniqueness),
  `users/{uid}/bests/{board}`, `boards/{board}/entries/{uid}`. `board` is
  `<scoreKey|slug>-<mode>`, the same key localStorage uses, so each Line Game
  week and each mode has its own leaderboard. Bests and leaderboard rows are
  written together in one batch; a rename rewrites the name on every row.
* **First profile imports local bests** from localStorage so nothing already
  earned is lost. On a shared browser that means the device's bests go to
  whoever signs in first — acceptable for friends.
* **Scores are client-reported.** Rules stop the obvious (score > total,
  writing someone else's row, using someone else's name) but a determined
  friend could fake a score. It's bragging rights, not a tournament.
* **UI rules:** the account card's buttons are white (Google's button and
  "Save my score"); red stays reserved for **Play again** below it.

### Testing accounts locally

```
export JAVA_HOME=/opt/homebrew/opt/openjdk PATH=/opt/homebrew/opt/openjdk/bin:$PATH
npx -y firebase-tools emulators:start --project demo-dietcokeman --only auth,firestore
python3 -m http.server 8917        # then open any page with ?emu=1
```

The emulators enforce `firestore.rules` from `firebase.json`. With `?emu=1`,
`window._acct.as('sub', 'Name')` signs in a fake Google user without the popup
(the Claude browser pane can't do popups). Setting `window._emuUser = ['sub',
'Name']` makes the real Sign in buttons use that fake user, and `?emu=1` sticks
for the tab's session so page-to-page redirects stay on the emulator. Remember the emulator assigns its
own random uid; `sub` is not the uid. Re-run the rules checks after any rules
change: steal a taken name, write another user's profile/row, score > total,
row under another name, bio > 160 — all must be denied; claiming a free name,
saving a legit score and a 160-char bio must be allowed.

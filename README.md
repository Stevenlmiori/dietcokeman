# DietCokeMan Challenge

Sporcle-style fill-in-the-blank quizzes. Type a name and it fills itself in.

**Play:** <https://challenge.dietcokeman.com/>

Works on a phone, no sign-in needed. Scores stay on the player's own device;
signing in with Google (optional) saves bests to an account and puts them on
each quiz's leaderboard. Static files on GitHub Pages, no build step.

Opening a quiz drops you straight onto the board — every answer blank, the clock
and the score already set. Pick a mode in the bar at the top and press play.

| Quiz | Answers | Modes |
|---|---|---|
| Best Drink of All Time | 1 | Timed 0:30 · No pressure |
| DietCokeMan's Favorite Movies | 64 | Timed 10:00 · No pressure |
| Disney Princesses | 15 | No pressure · Timed 3:00 |
| Minecraft Mobs | 88 | No pressure · Timed 10:00 |
| NFL Fantasy Leaders | 20 | Timed 5:00 · No pressure |
| NFL All-Time Top 20 | 60 | Timed 15:00 · No pressure |
| NBA Top 25 by Category | 200 | Timed 15:00 · No pressure |
| NFL MVPs | 71 | Timed 10:00 · No pressure |
| NBA MVPs | 71 | Timed 10:00 · No pressure |
| MLB All-Time Home Runs | 50 | Timed 8:00 · No pressure |
| Still in the S&P 500 Since 1957 | 52 | Timed 10:00 · No pressure |
| NFL Top 3 WRs: 2010 | 96 | Timed 12:00 · No pressure |
| No. 1 Overall NFL Draft Picks | 37 | Timed 6:00 · No pressure |
| Heisman Trophy Winners | 46 | Timed 8:00 · No pressure |
| World Series Champions | 46 | Timed 6:00 · No pressure |
| Masters Champions | 47 | Timed 6:00 · No pressure |
| Highest-Grossing Movies | 25 | Timed 6:00 · No pressure |
| Best Picture Winners | 36 | Timed 7:00 · No pressure |
| Biggest US Companies Right Now | 25 | Timed 5:00 · No pressure |
| America's Best-Selling Sodas | 10 | Timed 2:00 · No pressure |
| Biggest Fast-Food Chains | 25 | Timed 5:00 · No pressure |
| US Presidents | 47 | Timed 10:00 · No pressure |
| NFL Line Game: Week 11 | 13 games | No pressure · Timed 5:00 |

## How it plays

* **Last name, full name, an unusual first name or a nickname** counts —
  Puka, Shaq, CeeDee, Amon-Ra, the Mailman. A common first name on its own
  (Tom, James, Kevin) doesn't, so typing a list of ordinary first names gets
  you nothing. A quiz can also be set to full names only.
* **Answers fill the moment you spell one.** No Enter, no submit button —
  but typing only ever fills a name you've actually got right, so working your
  way towards "Brock Purdy" can't hand you anyone else along the way.
* **Enter forgives a near-miss.** Close but misspelled — `fitzgerld`,
  `gonzales`, `tomlinsen` — lands on Enter. Nothing is ever penalised: a quiz
  that answers itself as you type can't fairly charge you for a guess, so
  there's no wrong-guess mode.
* **Common misspellings are built in**, so `mccaffery`, `rothlisberger`,
  `farve`, `emmit smith` and `jamar chase` fill as you type.
* **A shared name sweeps every match** — "Manning" takes Peyton and Eli,
  "Brown" takes Jim and Tim, even across different sections of the board.
* Two modes: a countdown, or no pressure at all.

## Adding a quiz

Everything lives in `quizzes.js` — append one object to `QUIZZES` and it shows
up on the hub automatically. Give it a `category` and `tags` from the
`TAXONOMY` list at the top of that file; the hub's search and filters are built
from them. Filtered links work today: `/?tag=NBA`, `/?q=mvp`.

## Developing

```bash
python3 -m http.server 8901
```

`window._dcm` drives the game from the browser console (`findMatches`, `guess`,
`submit`, `state`). Run `./bump.sh` before committing a change to `style.css`,
`engine.js` or `quizzes.js` — it re-stamps the `?v=` on both pages so nobody
gets a stale copy. Push to `main` to deploy; GitHub Pages picks it up in under a
minute.

See [`CLAUDE.md`](CLAUDE.md) for the full brief: how the name matcher works, the
layout rules, and the mistakes already made and fixed.

---

An independent fan project. Not affiliated with, sponsored by, or endorsed by
any beverage company. All artwork is original.

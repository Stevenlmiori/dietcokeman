# DietCokeMan Challenge

Sporcle-style fill-in-the-blank quizzes. Type a name and it fills itself in.

**Play:** <https://stevenlmiori.github.io/dietcokeman/>

No sign-in, no accounts, works on a phone. Scores stay on the player's own
device. Five static files, no build step, no dependencies.

Opening a quiz drops you straight onto the board — every answer blank, the clock
and the score already set. Pick a mode in the bar at the top and press play.

| Quiz | Answers | Modes |
|---|---|---|
| NFL Fantasy Leaders | 30 | Timed 5:00 · No pressure |
| Round 1 Recall | 12 | Timed 4:00 · No pressure |
| NFL All-Time Top 20 | 60 | Timed 15:00 · No pressure |

## How it plays

* **First name, last name or the full name** — any of them counts.
* **Answers fill the moment you spell one.** No Enter, no submit button —
  but typing only ever fills a name you've actually got right, so working your
  way towards "Brock Purdy" can't hand you Brock Bowers along the way.
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
up on the hub automatically. The shape is documented at the top of that file.

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

# DietCokeMan Challenge

Sporcle-style fill-in-the-blank quizzes for the Astroworld fantasy league.
Live: https://stevenlmiori.github.io/dietcokeman/

## Adding a quiz

Everything lives in `quizzes.js`. Append an object to `QUIZZES` and it shows up
on the hub automatically — no other file needs touching.

```js
{
  slug: 'url-safe-id',
  title: 'Shown everywhere',
  sub:   'one-line subtitle',
  blurb: 'longer line on the start screen',
  tag:   'ASTROWORLD',
  mode:  'timed' | 'lives' | 'chill',   // preselected mode
  time:  300,                            // seconds for timed mode
  lives: 10,                             // wrong guesses allowed in survival
  cols:  'multi' | 'single',             // board layout
  groups: [{
    name: 'Group heading',
    note: 'right-side label',
    items: [{ a:'Correct Answer', hint:'32.13', sub:'CIN', rk:'1.01', alias:['nickname'] }]
  }]
}
```

`a` is the answer. First name, last name, the full name and any `alias` are all
accepted automatically — you only add an `alias` for nicknames or initials the
name itself doesn't imply (`cmc`, `jsn`, `bucs`).

## How matching works (`engine.js`)

* Accents stripped, case and punctuation ignored — `Ka'imi` == `kaimi`.
* Suffixes dropped, so `Kenneth Walker` matches `Kenneth Walker III`.
* Compound surnames stay joined: `Smith-Njigba` → `smithnjigba`, and `njigba` also works.
* Levenshtein fuzz: 1 edit at 5–7 characters, 2 at 8+. Words under 5 characters
  must be exact, which is what stops `base` from matching `Bass`.
* Answers fill the instant you type them. **Enter** is only needed to commit a
  guess that didn't match, and only that costs a life.
* A guess matching two unfilled answers asks you to be more specific and costs
  nothing. Same for re-guessing something already on the board.

## Testing

Serve the folder and drive it from the console via `window._dcm`:

```
python3 -m http.server 8901
```

* `_dcm.findMatches('mccaffery')` — pure, doesn't mutate state
* `_dcm.guess('burrow')` — simulates typing
* `_dcm.submit('wrong')` — simulates Enter, can cost a life
* `_dcm.state` — score, lives, timer, mode

Not affiliated with, sponsored by, or endorsed by any beverage company.

/* ===========================================================
   DietCokeMan Challenge — quiz data
   -----------------------------------------------------------
   To add a quiz, append an object to QUIZZES. Shape:

   {
     slug:  'url-safe-id',
     title: 'Shown everywhere',
     sub:   'one-line subtitle',
     blurb: 'longer line on the start screen',
     tag:   'ASTROWORLD',          // small pill on the hub card
     mode:  'timed'|'lives'|'chill',   // preselected mode
     time:  300,                   // seconds, timed mode
     lives: 10,                    // wrong guesses allowed, lives mode
     cols:  'multi'|'single',      // board layout
     hideSub: true,                // hide each item's `sub` until that row is solved
     groups: [{
       name: 'Group heading',
       note: 'right-side label',   // optional
       items: [{
         a: 'Correct Answer',      // first name / last name / full all accepted
         hint: '32.13',            // right-hand clue, optional
         sub: 'CIN',               // small clue after the blank, optional
         rk: '1.01',               // overrides the rank badge, optional
         alias: ['extra','spellings']   // optional
       }]
     }]
   }
   =========================================================== */

window.QUIZZES = [

{
  slug: 'top5-by-position',
  title: 'Top 5 by Position',
  sub: 'Astroworld 2026 scoring leaders',
  blurb: 'The five highest average scorers at every position this season. Average fantasy points are your clue.',
  tag: 'ASTROWORLD 2026',
  mode: 'timed',
  time: 300,
  lives: 10,
  cols: 'multi',
  hideSub: true,          // the NFL team would give the player away
  groups: [
    { name: 'Quarterbacks', note: 'avg pts', items: [
      { a: 'Joe Burrow',          sub: 'CIN', hint: '32.13' },
      { a: 'Josh Allen',          sub: 'BUF', hint: '27.58' },
      { a: 'Brock Purdy',         sub: 'SF',  hint: '27.01' },
      { a: 'C.J. Stroud',         sub: 'HOU', hint: '25.12', alias: ['cj stroud','c j stroud'] },
      { a: 'Dak Prescott',        sub: 'DAL', hint: '24.88' }
    ]},
    { name: 'Running Backs', note: 'avg pts', items: [
      { a: 'Jahmyr Gibbs',        sub: 'DET', hint: '27.98' },
      { a: 'Kenneth Walker III',  sub: 'KC',  hint: '24.75', alias: ['kenneth walker','k9','kenny walker'] },
      { a: 'Christian McCaffrey', sub: 'SF',  hint: '23.36', alias: ['cmc','mccaffery'] },
      { a: 'Chuba Hubbard',       sub: 'CAR', hint: '20.04' },
      { a: 'Bijan Robinson',      sub: 'ATL', hint: '19.77' }
    ]},
    { name: 'Wide Receivers', note: 'avg pts', items: [
      { a: 'Jaxon Smith-Njigba',  sub: 'SEA', hint: '26.32', alias: ['jsn','smith njigba','njigba'] },
      { a: 'Puka Nacua',          sub: 'LAR', hint: '24.80' },
      { a: 'CeeDee Lamb',         sub: 'DAL', hint: '22.20', alias: ['cd lamb','ceedee'] },
      { a: "Ja'Marr Chase",       sub: 'CIN', hint: '21.66', alias: ['jamar chase','jamarr'] },
      { a: 'Amon-Ra St. Brown',   sub: 'DET', hint: '20.49', alias: ['amon ra','st brown','saint brown','sun god'] }
    ]},
    { name: 'Tight Ends', note: 'avg pts', items: [
      { a: 'Brock Bowers',        sub: 'LV',  hint: '18.98' },
      { a: 'Isaiah Likely',       sub: 'NYG', hint: '17.49' },
      { a: 'Trey McBride',        sub: 'ARI', hint: '17.15', alias: ['macbride'] },
      { a: 'George Kittle',       sub: 'SF',  hint: '14.49' },
      { a: 'Harold Fannin Jr.',   sub: 'CLE', hint: '11.84', alias: ['harold fannin'] }
    ]},
    { name: 'Kickers', note: 'avg pts', items: [
      { a: 'Will Reichard',       sub: 'MIN', hint: '10.40' },
      { a: 'Tyler Bass',          sub: 'BUF', hint: '10.30' },
      { a: "Ka'imi Fairbairn",    sub: 'HOU', hint: '10.10', alias: ['kaimi','kaimi fairbairn'] },
      { a: 'Spencer Shrader',     sub: 'IND', hint: '10.00' },
      { a: 'Chase McLaughlin',    sub: 'TB',  hint: '10.00', alias: ['mclaughlin'] }
    ]},
    { name: 'Defense / ST', note: 'avg pts', items: [
      { a: 'Minnesota Vikings',   sub: 'MIN', hint: '12.70', alias: ['vikes','minny'] },
      { a: 'Tampa Bay Buccaneers',sub: 'TB',  hint: '10.90', alias: ['tampa bay','tampa','buccaneers','bucs'] },
      { a: 'Jacksonville Jaguars',sub: 'JAX', hint: '9.50',  alias: ['jags'] },
      { a: 'Seattle Seahawks',    sub: 'SEA', hint: '9.30',  alias: ['hawks'] },
      { a: 'Pittsburgh Steelers', sub: 'PIT', hint: '9.10',  alias: ['pitt'] }
    ]}
  ]
},

{
  slug: 'round-one-recall',
  title: 'Round 1 Recall',
  sub: 'Every first-round pick, 2026 draft',
  blurb: 'Twelve picks, twelve managers. Name who went where in the first round of the Astroworld draft.',
  tag: 'ASTROWORLD 2026',
  mode: 'lives',
  time: 240,
  lives: 5,
  cols: 'single',
  groups: [
    { name: 'Round 1', note: 'drafted by', items: [
      { a: 'Jahmyr Gibbs',        rk: '1.01', sub: 'Big Oil' },
      { a: 'Bijan Robinson',      rk: '1.02', sub: 'Dont Tread On Me' },
      { a: "Ja'Marr Chase",       rk: '1.03', sub: 'KT', alias: ['jamar chase','jamarr'] },
      { a: 'Puka Nacua',          rk: '1.04', sub: 'law dawgs' },
      { a: 'Amon-Ra St. Brown',   rk: '1.05', sub: 'The Goods', alias: ['amon ra','st brown','saint brown'] },
      { a: 'Christian McCaffrey', rk: '1.06', sub: 'Freak Heads', alias: ['cmc','mccaffery'] },
      { a: 'Jonathan Taylor',     rk: '1.07', sub: 'Prestige Worldwide', alias: ['jt'] },
      { a: 'James Cook III',      rk: '1.08', sub: 'The Crew', alias: ['james cook'] },
      { a: 'Saquon Barkley',      rk: '1.09', sub: 'Next Year', alias: ['saquon','barkley'] },
      { a: 'CeeDee Lamb',         rk: '1.10', sub: 'DietCokeMan', alias: ['cd lamb','ceedee'] },
      { a: 'Justin Jefferson',    rk: '1.11', sub: 'makeAOCbartender', alias: ['jj','jettas'] },
      { a: 'Kenneth Walker III',  rk: '1.12', sub: 'BuckNuts', alias: ['kenneth walker','kenny walker'] }
    ]}
  ]
},

{
  slug: 'name-the-league',
  title: 'Name the League',
  sub: 'All 12 Astroworld managers',
  blurb: 'Can you name every team in the league? One word of the team name is enough.',
  tag: 'ASTROWORLD',
  mode: 'chill',
  time: 180,
  lives: 10,
  cols: 'single',
  groups: [
    { name: 'The 12 Teams', note: 'draft slot', items: [
      { a: 'Big Oil',             rk: '1',  alias: ['oil'] },
      { a: 'Dont Tread On Me',    rk: '2',  alias: ["don't tread on me",'dont tread','tread','gadsden'] },
      { a: 'KT',                  rk: '3',  alias: ['k t'] },
      { a: 'law dawgs',           rk: '4',  alias: ['lawdawgs','dawgs','law'] },
      { a: 'The Goods',           rk: '5',  alias: ['goods'] },
      { a: 'Freak Heads',         rk: '6',  alias: ['freakheads','freaks','freak'] },
      { a: 'Prestige Worldwide',  rk: '7',  alias: ['prestige','worldwide'] },
      { a: 'The Crew',            rk: '8',  alias: ['crew'] },
      { a: 'Next Year',           rk: '9',  alias: ['nextyear'] },
      { a: 'DietCokeMan',         rk: '10', alias: ['diet coke man','miori','dietcoke','diet coke'] },
      { a: 'makeAOCbartender',    rk: '11', alias: ['make aoc bartender','aoc','bartender','makeaoc'] },
      { a: 'BuckNuts',            rk: '12', alias: ['buck nuts','buckeyes','nuts'] }
    ]}
  ]
}

];

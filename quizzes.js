/* ===========================================================
   DietCokeMan Challenge — quiz data
   -----------------------------------------------------------
   To add a quiz, append an object to QUIZZES. Shape:

   {
     slug:  'url-safe-id',
     title: 'Shown everywhere',
     sub:   'one-line subtitle',
     blurb: 'longer line under the title',
     tag:   'ASTROWORLD',          // small muted label on the hub card
     mode:  'timed'|'chill',       // preselected mode
     time:  300,                   // seconds, timed mode
     cols:  'multi'|'single',      // board layout
     hideSub: true,                // hide each item's `sub` until that row is solved
     modes: ['timed','chill'],     // which mode buttons to offer (default: both)
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
  title: 'NFL Fantasy Leaders',
  sub: 'Astroworld 2026 scoring leaders',
  blurb: 'The five highest average scorers at every position this season. Average fantasy points are your clue.',
  tag: 'ASTROWORLD 2026',
  mode: 'timed',
  time: 300,
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
  mode: 'timed',
  time: 240,
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
}
,

{
  slug: 'nfl-all-time-top20',
  title: 'NFL All-Time Top 20',
  sub: 'Passing, rushing and receiving yards',
  blurb: 'The twenty biggest career totals in each of the three great counting stats. Career yards are your clue.',
  tag: 'NFL ALL-TIME',
  mode: 'timed',
  time: 900,
  modes: ['timed', 'chill'],
  cols: 'multi',
  groups: [
    { name: 'Passing Yards', note: 'career yards', items: [
      { a: 'Tom Brady', rk: '1', hint: '89,214' },
      { a: 'Drew Brees', rk: '2', hint: '80,358' },
      { a: 'Peyton Manning', rk: '3', hint: '71,940' },
      { a: 'Brett Favre', rk: '4', hint: '71,838', alias: ['farve', 'favre'] },
      { a: 'Aaron Rodgers', rk: '5', hint: '68,288' },
      { a: 'Matthew Stafford', rk: '6', hint: '67,139', alias: ['matt stafford'] },
      { a: 'Ben Roethlisberger', rk: '7', hint: '64,088', alias: ['big ben', 'rothlisberger', 'roethlisburger', 'roethlisberger'] },
      { a: 'Philip Rivers', rk: '8', hint: '63,984', alias: ['phillip rivers'] },
      { a: 'Matt Ryan', rk: '9', hint: '62,792', alias: ['matty ice'] },
      { a: 'Dan Marino', rk: '10', hint: '61,361' },
      { a: 'Eli Manning', rk: '11', hint: '57,023' },
      { a: 'John Elway', rk: '12', hint: '51,475' },
      { a: 'Warren Moon', rk: '13', hint: '49,325' },
      { a: 'Joe Flacco', rk: '14', hint: '48,176' },
      { a: 'Kirk Cousins', rk: '15', hint: '47,247' },
      { a: 'Fran Tarkenton', rk: '16', hint: '47,003', alias: ['tarkenton'] },
      { a: 'Russell Wilson', rk: '17', hint: '46,966', alias: ['russ'] },
      { a: 'Carson Palmer', rk: '18', hint: '46,247' },
      { a: 'Vinny Testaverde', rk: '19', hint: '46,233', alias: ['testaverde'] },
      { a: 'Drew Bledsoe', rk: '20', hint: '44,611', alias: ['bledsoe'] }
    ]},
    { name: 'Rushing Yards', note: 'career yards', items: [
      { a: 'Emmitt Smith', rk: '1', hint: '18,355', alias: ['emmit smith'] },
      { a: 'Walter Payton', rk: '2', hint: '16,726', alias: ['sweetness'] },
      { a: 'Frank Gore', rk: '3', hint: '16,000' },
      { a: 'Barry Sanders', rk: '4', hint: '15,269' },
      { a: 'Adrian Peterson', rk: '5', hint: '14,918', alias: ['ap', 'all day'] },
      { a: 'Curtis Martin', rk: '6', hint: '14,101' },
      { a: 'Derrick Henry', rk: '7', hint: '13,707', alias: ['king henry'] },
      { a: 'LaDainian Tomlinson', rk: '8', hint: '13,684', alias: ['ladanian tomlinson', 'ldt', 'tomlinson'] },
      { a: 'Jerome Bettis', rk: '9', hint: '13,662', alias: ['the bus', 'bettis'] },
      { a: 'Eric Dickerson', rk: '10', hint: '13,259', alias: ['dickerson'] },
      { a: 'Tony Dorsett', rk: '11', hint: '12,739', alias: ['dorsett'] },
      { a: 'Jim Brown', rk: '12', hint: '12,312' },
      { a: 'Marshall Faulk', rk: '13', hint: '12,279', alias: ['faulk'] },
      { a: 'Edgerrin James', rk: '14', hint: '12,246', alias: ['edgerin james'] },
      { a: 'Marcus Allen', rk: '15', hint: '12,243' },
      { a: 'Franco Harris', rk: '16', hint: '12,120' },
      { a: 'Thurman Thomas', rk: '17', hint: '12,074' },
      { a: 'Fred Taylor', rk: '18', hint: '11,695' },
      { a: 'Steven Jackson', rk: '19', hint: '11,438', alias: ['sjax'] },
      { a: 'John Riggins', rk: '20', hint: '11,352', alias: ['riggins'] }
    ]},
    { name: 'Receiving Yards', note: 'career yards', items: [
      { a: 'Jerry Rice', rk: '1', hint: '22,895' },
      { a: 'Larry Fitzgerald', rk: '2', hint: '17,492', alias: ['fitz', 'fitzgerald'] },
      { a: 'Terrell Owens', rk: '3', hint: '15,934', alias: ['terrel owens', 'owens'] },
      { a: 'Randy Moss', rk: '4', hint: '15,292' },
      { a: 'Isaac Bruce', rk: '5', hint: '15,208' },
      { a: 'Tony Gonzalez', rk: '6', hint: '15,127', alias: ['gonzalez'] },
      { a: 'Tim Brown', rk: '7', hint: '14,934' },
      { a: 'Steve Smith Sr.', rk: '8', hint: '14,731', alias: ['steve smith'] },
      { a: 'Marvin Harrison', rk: '9', hint: '14,580' },
      { a: 'Reggie Wayne', rk: '10', hint: '14,345' },
      { a: 'Andre Johnson', rk: '11', hint: '14,185' },
      { a: 'James Lofton', rk: '12', hint: '14,004', alias: ['lofton'] },
      { a: 'Cris Carter', rk: '13', hint: '13,899', alias: ['chris carter', 'carter'] },
      { a: 'Anquan Boldin', rk: '14', hint: '13,779', alias: ['boldin', 'anquon boldin'] },
      { a: 'Henry Ellard', rk: '15', hint: '13,777', alias: ['ellard'] },
      { a: 'Julio Jones', rk: '16', hint: '13,703' },
      { a: 'Travis Kelce', rk: '17', hint: '13,484', alias: ['kelce'] },
      { a: 'Mike Evans', rk: '18', hint: '13,472' },
      { a: 'Torry Holt', rk: '19', hint: '13,382', alias: ['tory holt', 'holt'] },
      { a: 'DeAndre Hopkins', rk: '20', hint: '13,295', alias: ['dhop', 'hopkins'] }
    ]},
  ]
},

/* -----------------------------------------------------------
   The NFL Line Game. A different kind of quiz: `type: 'lines'`.
   Every game shows away @ home. The player picks the favourite and
   types the spread; within one point of the real line is right
   (exactly one point off counts).

   `line` is the HOME team's spread: negative = home favoured,
   positive = away favoured, 0 = pick'em. `aw` / `hm` are the
   abbreviations on the pick buttons. `where` marks a neutral site.

   Week 11, 2026. Lines as of the morning of Tue Nov 17 (CBS Sports'
   updated Week 11 table, published 9:04 a.m. ET; seven of thirteen agree
   with VegasInsider the same day). Always pull the same-day number.
   ----------------------------------------------------------- */
{
  slug: 'line-game-2026-w11',
  type: 'lines',
  title: 'NFL Line Game: Week 11',
  sub: 'Guess the Vegas spread on every game',
  blurb: 'Pick the favorite and guess the spread for all 13 Week 11 games. Within one point of the real Vegas line counts. Lines as of Nov 17.',
  tag: 'LINE GAME · 2026 WEEK 11',
  mode: 'chill',
  time: 300,
  modes: ['chill', 'timed'],
  cols: 'single',
  groups: [
    { name: 'Thursday', note: 'Nov 19', items: [
      { a: 'Colts @ Texans',       away: 'Colts',      home: 'Texans',     aw: 'IND', hm: 'HOU', line: -11.5 }
    ]},
    { name: 'Sunday', note: 'Nov 22', items: [
      { a: 'Cardinals @ Chiefs',   away: 'Cardinals',  home: 'Chiefs',     aw: 'ARI', hm: 'KC',  line: -16.5 },
      { a: 'Ravens @ Panthers',    away: 'Ravens',     home: 'Panthers',   aw: 'BAL', hm: 'CAR', line: -2.5 },
      { a: 'Dolphins @ Bills',     away: 'Dolphins',   home: 'Bills',      aw: 'MIA', hm: 'BUF', line: -16.5 },
      { a: 'Saints @ Bears',       away: 'Saints',     home: 'Bears',      aw: 'NO',  hm: 'CHI', line: -11.5 },
      { a: 'Steelers @ Eagles',    away: 'Steelers',   home: 'Eagles',     aw: 'PIT', hm: 'PHI', line: 4.5 },
      { a: 'Buccaneers @ Lions',   away: 'Buccaneers', home: 'Lions',      aw: 'TB',  hm: 'DET', line: -6.5 },
      { a: 'Titans @ Cowboys',     away: 'Titans',     home: 'Cowboys',    aw: 'TEN', hm: 'DAL', line: -8.5 },
      { a: 'Jets @ Chargers',      away: 'Jets',       home: 'Chargers',   aw: 'NYJ', hm: 'LAC', line: -3.5 },
      { a: 'Jaguars @ Giants',     away: 'Jaguars',    home: 'Giants',     aw: 'JAX', hm: 'NYG', line: 6 },
      { a: 'Raiders @ Broncos',    away: 'Raiders',    home: 'Broncos',    aw: 'LV',  hm: 'DEN', line: -10 },
      { a: 'Vikings @ 49ers',      away: 'Vikings',    home: '49ers',      aw: 'MIN', hm: 'SF',  line: -3, where: 'Mexico City' }
    ]},
    { name: 'Monday', note: 'Nov 23', items: [
      { a: 'Bengals @ Commanders', away: 'Bengals',    home: 'Commanders', aw: 'CIN', hm: 'WAS', line: 6.5 }
    ]}
  ]
}

];

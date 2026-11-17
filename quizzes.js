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
     cols:  'multi'|'single'|'two'|'four', // board layout ('two'/'four' = fixed columns on desktop)
     hideSub: true,                // hide each item's `sub` until that row is solved
     modes: ['timed','chill'],     // which mode buttons to offer (default: both)
     match: 'full',                // optional: full names only (no last-name shortcut)
     groups: [{
       name: 'Group heading',
       note: 'right-side label',   // optional
       items: [{
         a: 'Correct Answer',      // last name or full name accepted; never a first name alone
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
  blurb: 'The five highest average scorers at QB, RB, WR and TE through Week 10 of the 2026 season. Average fantasy points are your clue.',
  // Kickers and defenses were cut 2026-11-17 (30 answers became 20), so scores
  // restart under a new key; the slug stays so old links still work.
  scoreKey: 'top5-by-position-2026-w10',
  tag: 'ASTROWORLD 2026',
  mode: 'timed',
  time: 300,
  cols: 'two',            // four positions read as a 2x2
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
      { a: 'Jahmyr Gibbs',        sub: 'DET', hint: '27.98', alias: ['sonic'] },
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
    ]}
  ]
},

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
      { a: 'Tom Brady', rk: '1', hint: '89,214', alias: ['tb12'] },
      { a: 'Drew Brees', rk: '2', hint: '80,358' },
      { a: 'Peyton Manning', rk: '3', hint: '71,940', alias: ['the sheriff'] },
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
      { a: 'Joe Flacco', rk: '14', hint: '48,176', alias: ['joe cool'] },
      { a: 'Kirk Cousins', rk: '15', hint: '47,247' },
      { a: 'Fran Tarkenton', rk: '16', hint: '47,003', alias: ['tarkenton'] },
      { a: 'Russell Wilson', rk: '17', hint: '46,966', alias: ['dangeruss','russ'] },
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
      { a: 'LaDainian Tomlinson', rk: '8', hint: '13,684', alias: ['lt','ladanian tomlinson', 'ldt', 'tomlinson'] },
      { a: 'Jerome Bettis', rk: '9', hint: '13,662', alias: ['the bus', 'bettis'] },
      { a: 'Eric Dickerson', rk: '10', hint: '13,259', alias: ['dickerson'] },
      { a: 'Tony Dorsett', rk: '11', hint: '12,739', alias: ['dorsett'] },
      { a: 'Jim Brown', rk: '12', hint: '12,312' },
      { a: 'Marshall Faulk', rk: '13', hint: '12,279', alias: ['the marshall plan','faulk'] },
      { a: 'Edgerrin James', rk: '14', hint: '12,246', alias: ['edge','edgerin james'] },
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
      { a: 'Terrell Owens', rk: '3', hint: '15,934', alias: ['to','terrel owens', 'owens'] },
      { a: 'Randy Moss', rk: '4', hint: '15,292', alias: ['moss'] },
      { a: 'Isaac Bruce', rk: '5', hint: '15,208' },
      { a: 'Tony Gonzalez', rk: '6', hint: '15,127', alias: ['tony g','gonzalez'] },
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
      { a: 'DeAndre Hopkins', rk: '20', hint: '13,295', alias: ['nuk','dhop', 'hopkins'] }
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

   Week 11, 2026. BetMGM lines from BetMGM's own per-game pages
   (sports.betmgm.com/en/blog/nfl/<away>-<home>-prediction-odds-...-week-11-jaa),
   pulled the afternoon of Tue Nov 17. Steven wants BetMGM, same-day.
   ----------------------------------------------------------- */
{
  slug: 'nba-top25-by-category',
  title: 'NBA Top 25 by Category',
  sub: 'Career leaders in eight stats',
  blurb: 'The top 25 in NBA career games, points, rebounds, assists, blocks, steals, 3-pointers and free throw percentage, through games of November 16, 2026. The stat is your clue. A name fills every list it is on.',
  // Basketball-Reference NBA-only career leaders (not NBA+ABA), pulled 2026-11-17
  // ("Last Updated: Tuesday, November 17, 7:01AM"). Active players' totals move
  // nightly; re-pull before trusting. FT% needs 1,200 made free throws.
  tag: 'NBA ALL-TIME',
  mode: 'timed',
  time: 900,
  cols: 'four',
  groups: [
    { name: 'Games', items: [
      { a: 'LeBron James', hint: '1,633', alias: ['king james','bron'] },
      { a: 'Robert Parish', hint: '1,611', alias: ['the chief','chief'] },
      { a: 'Kareem Abdul-Jabbar', hint: '1,560', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Vince Carter', hint: '1,541', alias: ['vinsanity','half man half amazing'] },
      { a: 'Dirk Nowitzki', hint: '1,522', alias: ['nowitski'] },
      { a: 'John Stockton', hint: '1,504' },
      { a: 'Karl Malone', hint: '1,476', alias: ['the mailman','mailman'] },
      { a: 'Kevin Garnett', hint: '1,462', alias: ['kg','the big ticket','big ticket'] },
      { a: 'Kevin Willis', hint: '1,424' },
      { a: 'Jason Terry', hint: '1,410', alias: ['jet','the jet'] },
      { a: 'Tim Duncan', hint: '1,392', alias: ['the big fundamental','big fundamental','timmy d'] },
      { a: 'Jason Kidd', hint: '1,391' },
      { a: 'Reggie Miller', hint: '1,389' },
      { a: 'Clifford Robinson', hint: '1,380' },
      { a: 'Chris Paul', hint: '1,370', alias: ['cp3'] },
      { a: 'Kobe Bryant', hint: '1,346', alias: ['black mamba','mamba'] },
      { a: 'Paul Pierce', hint: '1,343', alias: ['the truth'] },
      { a: 'Gary Payton', hint: '1,335', alias: ['the glove','glove'] },
      { a: 'Moses Malone', hint: '1,329', alias: ['chairman of the boards'] },
      { a: 'Jamal Crawford', hint: '1,327', alias: ['jcrossover'] },
      { a: 'Buck Williams', hint: '1,307' },
      { a: 'Andre Miller', hint: '1,304' },
      { a: 'Elvin Hayes', hint: '1,303', alias: ['the big e','big e'] },
      { a: 'Russell Westbrook', hint: '1,301', alias: ['russ','brodie'] },
      { a: 'Ray Allen', hint: '1,300', alias: ['jesus shuttlesworth'] }
    ]},
    { name: 'Points', items: [
      { a: 'LeBron James', hint: '43,606', alias: ['king james','bron'] },
      { a: 'Kareem Abdul-Jabbar', hint: '38,387', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Karl Malone', hint: '36,928', alias: ['the mailman','mailman'] },
      { a: 'Kobe Bryant', hint: '33,643', alias: ['black mamba','mamba'] },
      { a: 'Kevin Durant', hint: '32,917', alias: ['kd','slim reaper'] },
      { a: 'Michael Jordan', hint: '32,292', alias: ['mj','air jordan'] },
      { a: 'Dirk Nowitzki', hint: '31,560', alias: ['nowitski'] },
      { a: 'Wilt Chamberlain', hint: '31,419', alias: ['the stilt','wilt the stilt'] },
      { a: 'James Harden', hint: '29,568', alias: ['the beard'] },
      { a: 'Shaquille O\'Neal', hint: '28,596', alias: ['shaq','shaq oneal','diesel'] },
      { a: 'Carmelo Anthony', hint: '28,289', alias: ['melo'] },
      { a: 'Moses Malone', hint: '27,409', alias: ['chairman of the boards'] },
      { a: 'Elvin Hayes', hint: '27,313', alias: ['the big e','big e'] },
      { a: 'Russell Westbrook', hint: '27,176', alias: ['russ','brodie'] },
      { a: 'Hakeem Olajuwon', hint: '26,946', alias: ['the dream','hakeem the dream','olajuwan'] },
      { a: 'DeMar DeRozan', hint: '26,812', alias: ['derozen'] },
      { a: 'Stephen Curry', hint: '26,806', alias: ['steph curry','steph','chef curry'] },
      { a: 'Oscar Robertson', hint: '26,710', alias: ['big o','the big o'] },
      { a: 'Dominique Wilkins', hint: '26,668', alias: ['nique','human highlight film'] },
      { a: 'Tim Duncan', hint: '26,496', alias: ['the big fundamental','big fundamental','timmy d'] },
      { a: 'Paul Pierce', hint: '26,397', alias: ['the truth'] },
      { a: 'John Havlicek', hint: '26,395', alias: ['hondo'] },
      { a: 'Kevin Garnett', hint: '26,071', alias: ['kg','the big ticket','big ticket'] },
      { a: 'Vince Carter', hint: '25,728', alias: ['vinsanity','half man half amazing'] },
      { a: 'Alex English', hint: '25,613' }
    ]},
    { name: 'Rebounds', items: [
      { a: 'Wilt Chamberlain', hint: '23,924', alias: ['the stilt','wilt the stilt'] },
      { a: 'Bill Russell', hint: '21,620' },
      { a: 'Kareem Abdul-Jabbar', hint: '17,440', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Elvin Hayes', hint: '16,279', alias: ['the big e','big e'] },
      { a: 'Moses Malone', hint: '16,212', alias: ['chairman of the boards'] },
      { a: 'Tim Duncan', hint: '15,091', alias: ['the big fundamental','big fundamental','timmy d'] },
      { a: 'Karl Malone', hint: '14,968', alias: ['the mailman','mailman'] },
      { a: 'Robert Parish', hint: '14,715', alias: ['the chief','chief'] },
      { a: 'Kevin Garnett', hint: '14,662', alias: ['kg','the big ticket','big ticket'] },
      { a: 'Dwight Howard', hint: '14,627', alias: ['d12','superman'] },
      { a: 'Nate Thurmond', hint: '14,464' },
      { a: 'Walt Bellamy', hint: '14,241' },
      { a: 'Wes Unseld', hint: '13,769' },
      { a: 'Hakeem Olajuwon', hint: '13,748', alias: ['the dream','hakeem the dream','olajuwan'] },
      { a: 'Shaquille O\'Neal', hint: '13,099', alias: ['shaq','shaq oneal','diesel'] },
      { a: 'Buck Williams', hint: '13,017' },
      { a: 'Jerry Lucas', hint: '12,942' },
      { a: 'Bob Pettit', hint: '12,849' },
      { a: 'Charles Barkley', hint: '12,546', alias: ['sir charles','chuck'] },
      { a: 'Dikembe Mutombo', hint: '12,359', alias: ['deke'] },
      { a: 'Paul Silas', hint: '12,357' },
      { a: 'Charles Oakley', hint: '12,205' },
      { a: 'LeBron James', hint: '12,174', alias: ['king james','bron'] },
      { a: 'Dennis Rodman', hint: '11,954', alias: ['the worm','worm'] },
      { a: 'Kevin Willis', hint: '11,901' }
    ]},
    { name: 'Assists', items: [
      { a: 'John Stockton', hint: '15,806' },
      { a: 'Chris Paul', hint: '12,552', alias: ['cp3'] },
      { a: 'LeBron James', hint: '12,092', alias: ['king james','bron'] },
      { a: 'Jason Kidd', hint: '12,091' },
      { a: 'Russell Westbrook', hint: '10,351', alias: ['russ','brodie'] },
      { a: 'Steve Nash', hint: '10,335' },
      { a: 'Mark Jackson', hint: '10,334' },
      { a: 'Magic Johnson', hint: '10,141', alias: ['magic','earvin johnson'] },
      { a: 'Oscar Robertson', hint: '9,887', alias: ['big o','the big o'] },
      { a: 'Isiah Thomas', hint: '9,061', alias: ['zeke'] },
      { a: 'Gary Payton', hint: '8,966', alias: ['the glove','glove'] },
      { a: 'James Harden', hint: '8,958', alias: ['the beard'] },
      { a: 'Andre Miller', hint: '8,524' },
      { a: 'Rod Strickland', hint: '7,987' },
      { a: 'Rajon Rondo', hint: '7,584' },
      { a: 'Maurice Cheeks', hint: '7,392' },
      { a: 'Lenny Wilkens', hint: '7,211' },
      { a: 'Terry Porter', hint: '7,160' },
      { a: 'Kyle Lowry', hint: '7,110', alias: ['klow'] },
      { a: 'Tim Hardaway', hint: '7,095' },
      { a: 'Tony Parker', hint: '7,036', alias: ['tp'] },
      { a: 'Bob Cousy', hint: '6,955', alias: ['the cooz','cooz'] },
      { a: 'Guy Rodgers', hint: '6,917' },
      { a: 'Deron Williams', hint: '6,819' },
      { a: 'Jrue Holiday', hint: '6,813' }
    ]},
    { name: 'Blocks', items: [
      { a: 'Hakeem Olajuwon', hint: '3,830', alias: ['the dream','hakeem the dream','olajuwan'] },
      { a: 'Dikembe Mutombo', hint: '3,289', alias: ['deke'] },
      { a: 'Kareem Abdul-Jabbar', hint: '3,189', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Mark Eaton', hint: '3,064' },
      { a: 'Tim Duncan', hint: '3,020', alias: ['the big fundamental','big fundamental','timmy d'] },
      { a: 'David Robinson', hint: '2,954', alias: ['the admiral','admiral'] },
      { a: 'Patrick Ewing', hint: '2,894' },
      { a: 'Shaquille O\'Neal', hint: '2,732', alias: ['shaq','shaq oneal','diesel'] },
      { a: 'Tree Rollins', hint: '2,542', alias: ['wayne rollins'] },
      { a: 'Robert Parish', hint: '2,361', alias: ['the chief','chief'] },
      { a: 'Alonzo Mourning', hint: '2,356', alias: ['zo'] },
      { a: 'Marcus Camby', hint: '2,331' },
      { a: 'Dwight Howard', hint: '2,228', alias: ['d12','superman'] },
      { a: 'Brook Lopez', hint: '2,158', alias: ['splash mountain'] },
      { a: 'Ben Wallace', hint: '2,137', alias: ['big ben'] },
      { a: 'Shawn Bradley', hint: '2,119' },
      { a: 'Manute Bol', hint: '2,086' },
      { a: 'George Johnson', hint: '2,082' },
      { a: 'Kevin Garnett', hint: '2,037', alias: ['kg','the big ticket','big ticket'] },
      { a: 'Larry Nance', hint: '2,027' },
      { a: 'Theo Ratliff', hint: '1,968' },
      { a: 'Pau Gasol', hint: '1,941' },
      { a: 'Anthony Davis', hint: '1,863', alias: ['ad','the brow','a d'] },
      { a: 'Rudy Gobert', hint: '1,856', alias: ['stifle tower'] },
      { a: 'Elton Brand', hint: '1,828' }
    ]},
    { name: 'Steals', items: [
      { a: 'John Stockton', hint: '3,265' },
      { a: 'Chris Paul', hint: '2,728', alias: ['cp3'] },
      { a: 'Jason Kidd', hint: '2,684' },
      { a: 'Michael Jordan', hint: '2,514', alias: ['mj','air jordan'] },
      { a: 'Gary Payton', hint: '2,445', alias: ['the glove','glove'] },
      { a: 'LeBron James', hint: '2,430', alias: ['king james','bron'] },
      { a: 'Maurice Cheeks', hint: '2,310' },
      { a: 'Scottie Pippen', hint: '2,307', alias: ['pip'] },
      { a: 'Clyde Drexler', hint: '2,207', alias: ['clyde the glide'] },
      { a: 'Hakeem Olajuwon', hint: '2,162', alias: ['the dream','hakeem the dream','olajuwan'] },
      { a: 'Alvin Robertson', hint: '2,112' },
      { a: 'Karl Malone', hint: '2,085', alias: ['the mailman','mailman'] },
      { a: 'Mookie Blaylock', hint: '2,075' },
      { a: 'Russell Westbrook', hint: '2,038', alias: ['russ','brodie'] },
      { a: 'Allen Iverson', hint: '1,983', alias: ['the answer','ai','a i'] },
      { a: 'Derek Harper', hint: '1,957' },
      { a: 'Kobe Bryant', hint: '1,944', alias: ['black mamba','mamba'] },
      { a: 'Isiah Thomas', hint: '1,861', alias: ['zeke'] },
      { a: 'Kevin Garnett', hint: '1,859', alias: ['kg','the big ticket','big ticket'] },
      { a: 'James Harden', hint: '1,808', alias: ['the beard'] },
      { a: 'Andre Iguodala', hint: '1,765', alias: ['iggy'] },
      { a: 'Shawn Marion', hint: '1,759', alias: ['the matrix','matrix'] },
      { a: 'Paul Pierce', hint: '1,752', alias: ['the truth'] },
      { a: 'Magic Johnson', hint: '1,724', alias: ['magic','earvin johnson'] },
      { a: 'Metta World Peace', hint: '1,721', alias: ['world peace','ron artest','artest','sandiford artest','metta sandiford artest'] }
    ]},
    { name: '3-Pointers', items: [
      { a: 'Stephen Curry', hint: '4,291', alias: ['steph curry','steph','chef curry'] },
      { a: 'James Harden', hint: '3,426', alias: ['the beard'] },
      { a: 'Ray Allen', hint: '2,973', alias: ['jesus shuttlesworth'] },
      { a: 'Klay Thompson', hint: '2,952', alias: ['klay'] },
      { a: 'Damian Lillard', hint: '2,843', alias: ['dame','dame time'] },
      { a: 'LeBron James', hint: '2,645', alias: ['king james','bron'] },
      { a: 'Reggie Miller', hint: '2,560' },
      { a: 'Paul George', hint: '2,492', alias: ['pg13','pg'] },
      { a: 'Kyle Korver', hint: '2,450' },
      { a: 'Kevin Durant', hint: '2,399', alias: ['kd','slim reaper'] },
      { a: 'Vince Carter', hint: '2,290', alias: ['vinsanity','half man half amazing'] },
      { a: 'Jason Terry', hint: '2,282', alias: ['jet','the jet'] },
      { a: 'Jamal Crawford', hint: '2,221', alias: ['jcrossover'] },
      { a: 'Buddy Hield', hint: '2,217', alias: ['buddy buckets'] },
      { a: 'Kyle Lowry', hint: '2,209', alias: ['klow'] },
      { a: 'CJ McCollum', hint: '2,205', alias: ['c j mccollum'] },
      { a: 'Paul Pierce', hint: '2,143', alias: ['the truth'] },
      { a: 'Eric Gordon', hint: '2,092' },
      { a: 'Tim Hardaway Jr.', hint: '2,077', alias: ['tim hardaway jr','thj'] },
      { a: 'Mike Conley', hint: '1,990' },
      { a: 'Jason Kidd', hint: '1,988' },
      { a: 'Dirk Nowitzki', hint: '1,982', alias: ['nowitski'] },
      { a: 'Joe Johnson', hint: '1,978' },
      { a: 'JJ Redick', hint: '1,950', alias: ['j j redick','jj reddick','reddick'] },
      { a: 'J.R. Smith', hint: '1,930', alias: ['jr smith'] }
    ]},
    { name: 'Free Throw %', items: [
      { a: 'Stephen Curry', hint: '.9132', alias: ['steph curry','steph','chef curry'] },
      { a: 'Steve Nash', hint: '.9043' },
      { a: 'Mark Price', hint: '.9039' },
      { a: 'Rick Barry', hint: '.8998' },
      { a: 'Damian Lillard', hint: '.8989', alias: ['dame','dame time'] },
      { a: 'Peja Stojaković', hint: '.8948', alias: ['stojakovic'] },
      { a: 'Chauncey Billups', hint: '.8940', alias: ['mr big shot','big shot'] },
      { a: 'Ray Allen', hint: '.8939', alias: ['jesus shuttlesworth'] },
      { a: 'JJ Redick', hint: '.8918', alias: ['j j redick','jj reddick','reddick'] },
      { a: 'Calvin Murphy', hint: '.8916' },
      { a: 'Scott Skiles', hint: '.8891' },
      { a: 'Reggie Miller', hint: '.8877' },
      { a: 'Kyrie Irving', hint: '.8875', alias: ['uncle drew'] },
      { a: 'Larry Bird', hint: '.8857', alias: ['larry legend','the hick from french lick'] },
      { a: 'Bill Sharman', hint: '.8831' },
      { a: 'Kevin Durant', hint: '.8816', alias: ['kd','slim reaper'] },
      { a: 'Dirk Nowitzki', hint: '.8788', alias: ['nowitski'] },
      { a: 'Khris Middleton', hint: '.8781' },
      { a: 'Jordan Poole', hint: '.8778' },
      { a: 'Jeff Hornacek', hint: '.8770' },
      { a: 'Kyle Korver', hint: '.8769' },
      { a: 'Danilo Gallinari', hint: '.8764' },
      { a: 'Earl Boykins', hint: '.8758' },
      { a: 'Ricky Pierce', hint: '.8755' },
      { a: 'Devin Booker', hint: '.8745', alias: ['book'] }
    ]}
  ]
},

{
  slug: 'line-game',               // permanent: the weekly link never changes
  scoreKey: 'line-game-2026-w11',  // per-week best scores
  type: 'lines',
  title: 'NFL Line Game: Week 11',
  sub: 'Guess the Vegas spread on every game',
  blurb: 'Pick the favorite and guess the spread for all 13 Week 11 games. Within one point of the real Vegas line counts. BetMGM lines as of Nov 17.',
  tag: 'LINE GAME · 2026 WEEK 11',
  mode: 'chill',
  time: 300,
  modes: ['chill', 'timed'],
  cols: 'single',
  groups: [
    { name: 'Thursday', note: 'Nov 19', items: [
      { a: 'Colts @ Texans',       away: 'Colts',      home: 'Texans',     aw: 'IND', hm: 'HOU', line: -10 }
    ]},
    { name: 'Sunday', note: 'Nov 22', items: [
      { a: 'Cardinals @ Chiefs',   away: 'Cardinals',  home: 'Chiefs',     aw: 'ARI', hm: 'KC',  line: -15 },
      { a: 'Ravens @ Panthers',    away: 'Ravens',     home: 'Panthers',   aw: 'BAL', hm: 'CAR', line: -2 },
      { a: 'Dolphins @ Bills',     away: 'Dolphins',   home: 'Bills',      aw: 'MIA', hm: 'BUF', line: -17 },
      { a: 'Saints @ Bears',       away: 'Saints',     home: 'Bears',      aw: 'NO',  hm: 'CHI', line: -9.5 },
      { a: 'Steelers @ Eagles',    away: 'Steelers',   home: 'Eagles',     aw: 'PIT', hm: 'PHI', line: 4.5 },
      { a: 'Buccaneers @ Lions',   away: 'Buccaneers', home: 'Lions',      aw: 'TB',  hm: 'DET', line: -5.5 },
      { a: 'Titans @ Cowboys',     away: 'Titans',     home: 'Cowboys',    aw: 'TEN', hm: 'DAL', line: -8 },
      { a: 'Jets @ Chargers',      away: 'Jets',       home: 'Chargers',   aw: 'NYJ', hm: 'LAC', line: -3 },
      { a: 'Jaguars @ Giants',     away: 'Jaguars',    home: 'Giants',     aw: 'JAX', hm: 'NYG', line: 6.5 },
      { a: 'Raiders @ Broncos',    away: 'Raiders',    home: 'Broncos',    aw: 'LV',  hm: 'DEN', line: -8.5 },
      { a: 'Vikings @ 49ers',      away: 'Vikings',    home: '49ers',      aw: 'MIN', hm: 'SF',  line: -3.5, where: 'Mexico City' }
    ]},
    { name: 'Monday', note: 'Nov 23', items: [
      { a: 'Bengals @ Commanders', away: 'Bengals',    home: 'Commanders', aw: 'CIN', hm: 'WAS', line: 4 }
    ]}
  ]
}

];

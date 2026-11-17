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
  slug: 'nfl-mvps',
  title: 'NFL MVPs',
  sub: 'Every AP MVP since 1957',
  blurb: 'Every AP NFL MVP from 1957 through the 2025 season. The year, position and team are your clues. A name fills every year he won.',
  // Pro-Football-Reference's AP MVP list, checked 2026-11-17 against Wikipedia's
  // "AP NFL Most Valuable Player". PFR skips 1960; Wikipedia lists Norm Van Brocklin,
  // so he is in. Sources disagree on 1958-60 (Marchetti, Conerly, Joe Schmidt).
  tag: 'NFL ALL-TIME',
  mode: 'timed',
  time: 600,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Matthew Stafford', rk: '2025', sub: 'QB', hint: 'Rams', alias: ['matt stafford'] },
      { a: 'Josh Allen', rk: '2024', sub: 'QB', hint: 'Bills' },
      { a: 'Lamar Jackson', rk: '2023', sub: 'QB', hint: 'Ravens', alias: ['lamar'] },
      { a: 'Patrick Mahomes', rk: '2022', sub: 'QB', hint: 'Chiefs', alias: ['pat mahomes'] },
      { a: 'Aaron Rodgers', rk: '2021', sub: 'QB', hint: 'Packers', alias: ['a rod','arod'] },
      { a: 'Aaron Rodgers', rk: '2020', sub: 'QB', hint: 'Packers', alias: ['a rod','arod'] }
    ]},
    { name: '2010s', items: [
      { a: 'Lamar Jackson', rk: '2019', sub: 'QB', hint: 'Ravens', alias: ['lamar'] },
      { a: 'Patrick Mahomes', rk: '2018', sub: 'QB', hint: 'Chiefs', alias: ['pat mahomes'] },
      { a: 'Tom Brady', rk: '2017', sub: 'QB', hint: 'Patriots', alias: ['tb12'] },
      { a: 'Matt Ryan', rk: '2016', sub: 'QB', hint: 'Falcons', alias: ['matty ice'] },
      { a: 'Cam Newton', rk: '2015', sub: 'QB', hint: 'Panthers', alias: ['superman'] },
      { a: 'Aaron Rodgers', rk: '2014', sub: 'QB', hint: 'Packers', alias: ['a rod','arod'] },
      { a: 'Peyton Manning', rk: '2013', sub: 'QB', hint: 'Broncos', alias: ['the sheriff'] },
      { a: 'Adrian Peterson', rk: '2012', sub: 'RB', hint: 'Vikings', alias: ['ap','all day'] },
      { a: 'Aaron Rodgers', rk: '2011', sub: 'QB', hint: 'Packers', alias: ['a rod','arod'] },
      { a: 'Tom Brady', rk: '2010', sub: 'QB', hint: 'Patriots', alias: ['tb12'] }
    ]},
    { name: '2000s', items: [
      { a: 'Peyton Manning', rk: '2009', sub: 'QB', hint: 'Colts', alias: ['the sheriff'] },
      { a: 'Peyton Manning', rk: '2008', sub: 'QB', hint: 'Colts', alias: ['the sheriff'] },
      { a: 'Tom Brady', rk: '2007', sub: 'QB', hint: 'Patriots', alias: ['tb12'] },
      { a: 'LaDainian Tomlinson', rk: '2006', sub: 'RB', hint: 'Chargers', alias: ['ladanian tomlinson','ldt'] },
      { a: 'Shaun Alexander', rk: '2005', sub: 'RB', hint: 'Seahawks', alias: ['shawn alexander'] },
      { a: 'Peyton Manning', rk: '2004', sub: 'QB', hint: 'Colts', alias: ['the sheriff'] },
      { a: 'Steve McNair', rk: '2003', sub: 'QB', hint: 'Titans', alias: ['air mcnair'] },
      { a: 'Peyton Manning', rk: '2003', sub: 'QB', hint: 'Colts', alias: ['the sheriff'] },
      { a: 'Rich Gannon', rk: '2002', sub: 'QB', hint: 'Raiders' },
      { a: 'Kurt Warner', rk: '2001', sub: 'QB', hint: 'Rams' },
      { a: 'Marshall Faulk', rk: '2000', sub: 'RB', hint: 'Rams', alias: ['the marshall plan'] }
    ]},
    { name: '1990s', items: [
      { a: 'Kurt Warner', rk: '1999', sub: 'QB', hint: 'Rams' },
      { a: 'Terrell Davis', rk: '1998', sub: 'RB', hint: 'Broncos', alias: ['td'] },
      { a: 'Barry Sanders', rk: '1997', sub: 'RB', hint: 'Lions' },
      { a: 'Brett Favre', rk: '1997', sub: 'QB', hint: 'Packers', alias: ['farve'] },
      { a: 'Brett Favre', rk: '1996', sub: 'QB', hint: 'Packers', alias: ['farve'] },
      { a: 'Brett Favre', rk: '1995', sub: 'QB', hint: 'Packers', alias: ['farve'] },
      { a: 'Steve Young', rk: '1994', sub: 'QB', hint: '49ers' },
      { a: 'Emmitt Smith', rk: '1993', sub: 'RB', hint: 'Cowboys', alias: ['emmit smith'] },
      { a: 'Steve Young', rk: '1992', sub: 'QB', hint: '49ers' },
      { a: 'Thurman Thomas', rk: '1991', sub: 'RB', hint: 'Bills' },
      { a: 'Joe Montana', rk: '1990', sub: 'QB', hint: '49ers', alias: ['joe cool'] }
    ]},
    { name: '1980s', items: [
      { a: 'Joe Montana', rk: '1989', sub: 'QB', hint: '49ers', alias: ['joe cool'] },
      { a: 'Boomer Esiason', rk: '1988', sub: 'QB', hint: 'Bengals', alias: ['esiason'] },
      { a: 'John Elway', rk: '1987', sub: 'QB', hint: 'Broncos' },
      { a: 'Lawrence Taylor', rk: '1986', sub: 'LB', hint: 'Giants' },
      { a: 'Marcus Allen', rk: '1985', sub: 'RB', hint: 'Raiders' },
      { a: 'Dan Marino', rk: '1984', sub: 'QB', hint: 'Dolphins' },
      { a: 'Joe Theismann', rk: '1983', sub: 'QB', hint: 'Washington', alias: ['theisman','joe theisman'] },
      { a: 'Mark Moseley', rk: '1982', sub: 'K', hint: 'Washington' },
      { a: 'Ken Anderson', rk: '1981', sub: 'QB', hint: 'Bengals', alias: ['kenny anderson'] },
      { a: 'Brian Sipe', rk: '1980', sub: 'QB', hint: 'Browns' }
    ]},
    { name: '1970s', items: [
      { a: 'Earl Campbell', rk: '1979', sub: 'RB', hint: 'Oilers', alias: ['the tyler rose'] },
      { a: 'Terry Bradshaw', rk: '1978', sub: 'QB', hint: 'Steelers' },
      { a: 'Walter Payton', rk: '1977', sub: 'RB', hint: 'Bears', alias: ['sweetness'] },
      { a: 'Bert Jones', rk: '1976', sub: 'QB', hint: 'Colts' },
      { a: 'Fran Tarkenton', rk: '1975', sub: 'QB', hint: 'Vikings', alias: ['scramblin fran'] },
      { a: 'Ken Stabler', rk: '1974', sub: 'QB', hint: 'Raiders', alias: ['the snake','snake'] },
      { a: 'O.J. Simpson', rk: '1973', sub: 'RB', hint: 'Bills', alias: ['oj','o j','the juice','juice'] },
      { a: 'Larry Brown', rk: '1972', sub: 'RB', hint: 'Washington' },
      { a: 'Alan Page', rk: '1971', sub: 'DT', hint: 'Vikings' },
      { a: 'John Brodie', rk: '1970', sub: 'QB', hint: '49ers' }
    ]},
    { name: '1960s', items: [
      { a: 'Roman Gabriel', rk: '1969', sub: 'QB', hint: 'Rams' },
      { a: 'Earl Morrall', rk: '1968', sub: 'QB', hint: 'Colts' },
      { a: 'Johnny Unitas', rk: '1967', sub: 'QB', hint: 'Colts', alias: ['johnny u'] },
      { a: 'Bart Starr', rk: '1966', sub: 'QB', hint: 'Packers' },
      { a: 'Jim Brown', rk: '1965', sub: 'FB', hint: 'Browns' },
      { a: 'Johnny Unitas', rk: '1964', sub: 'QB', hint: 'Colts', alias: ['johnny u'] },
      { a: 'Y.A. Tittle', rk: '1963', sub: 'QB', hint: 'Giants', alias: ['ya tittle','y a tittle'] },
      { a: 'Jim Taylor', rk: '1962', sub: 'FB', hint: 'Packers' },
      { a: 'Paul Hornung', rk: '1961', sub: 'HB', hint: 'Packers', alias: ['golden boy'] },
      { a: 'Norm Van Brocklin', rk: '1960', sub: 'QB', hint: 'Eagles', alias: ['the dutchman','dutchman'] }
    ]},
    { name: '1950s', items: [
      { a: 'Johnny Unitas', rk: '1959', sub: 'QB', hint: 'Colts', alias: ['johnny u'] },
      { a: 'Jim Brown', rk: '1958', sub: 'FB', hint: 'Browns' },
      { a: 'Jim Brown', rk: '1957', sub: 'FB', hint: 'Browns' }
    ]}
  ]
},

{
  slug: 'nba-mvps',
  title: 'NBA MVPs',
  sub: 'Every MVP since 1955-56',
  blurb: 'Every NBA MVP from 1955-56 through 2025-26. The season, team and points per game are your clues. A name fills every season he won.',
  // Basketball-Reference /awards/mvp.html, pulled 2026-11-17; matches Steven's list exactly.
  tag: 'NBA ALL-TIME',
  mode: 'timed',
  time: 600,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Shai Gilgeous-Alexander', rk: '2025-26', sub: 'OKC', hint: '31.1 ppg', alias: ['sga','gilgeous alexander'] },
      { a: 'Shai Gilgeous-Alexander', rk: '2024-25', sub: 'OKC', hint: '32.7 ppg', alias: ['sga','gilgeous alexander'] },
      { a: 'Nikola Jokić', rk: '2023-24', sub: 'DEN', hint: '26.4 ppg', alias: ['joker','the joker','jokic'] },
      { a: 'Joel Embiid', rk: '2022-23', sub: 'PHI', hint: '33.1 ppg', alias: ['the process'] },
      { a: 'Nikola Jokić', rk: '2021-22', sub: 'DEN', hint: '27.1 ppg', alias: ['joker','the joker','jokic'] },
      { a: 'Nikola Jokić', rk: '2020-21', sub: 'DEN', hint: '26.4 ppg', alias: ['joker','the joker','jokic'] }
    ]},
    { name: '2010s', items: [
      { a: 'Giannis Antetokounmpo', rk: '2019-20', sub: 'MIL', hint: '29.5 ppg', alias: ['greek freak','the greek freak'] },
      { a: 'Giannis Antetokounmpo', rk: '2018-19', sub: 'MIL', hint: '27.7 ppg', alias: ['greek freak','the greek freak'] },
      { a: 'James Harden', rk: '2017-18', sub: 'HOU', hint: '30.4 ppg', alias: ['the beard'] },
      { a: 'Russell Westbrook', rk: '2016-17', sub: 'OKC', hint: '31.6 ppg', alias: ['russ','brodie'] },
      { a: 'Stephen Curry', rk: '2015-16', sub: 'GSW', hint: '30.1 ppg', alias: ['steph','steph curry','chef curry'] },
      { a: 'Stephen Curry', rk: '2014-15', sub: 'GSW', hint: '23.8 ppg', alias: ['steph','steph curry','chef curry'] },
      { a: 'Kevin Durant', rk: '2013-14', sub: 'OKC', hint: '32.0 ppg', alias: ['kd','slim reaper'] },
      { a: 'LeBron James', rk: '2012-13', sub: 'MIA', hint: '26.8 ppg', alias: ['king james','bron'] },
      { a: 'LeBron James', rk: '2011-12', sub: 'MIA', hint: '27.1 ppg', alias: ['king james','bron'] },
      { a: 'Derrick Rose', rk: '2010-11', sub: 'CHI', hint: '25.0 ppg', alias: ['d rose','drose'] }
    ]},
    { name: '2000s', items: [
      { a: 'LeBron James', rk: '2009-10', sub: 'CLE', hint: '29.7 ppg', alias: ['king james','bron'] },
      { a: 'LeBron James', rk: '2008-09', sub: 'CLE', hint: '28.4 ppg', alias: ['king james','bron'] },
      { a: 'Kobe Bryant', rk: '2007-08', sub: 'LAL', hint: '28.3 ppg', alias: ['black mamba','mamba'] },
      { a: 'Dirk Nowitzki', rk: '2006-07', sub: 'DAL', hint: '24.6 ppg', alias: ['nowitski'] },
      { a: 'Steve Nash', rk: '2005-06', sub: 'PHO', hint: '18.8 ppg' },
      { a: 'Steve Nash', rk: '2004-05', sub: 'PHO', hint: '15.5 ppg' },
      { a: 'Kevin Garnett', rk: '2003-04', sub: 'MIN', hint: '24.2 ppg', alias: ['kg','the big ticket'] },
      { a: 'Tim Duncan', rk: '2002-03', sub: 'SAS', hint: '23.3 ppg', alias: ['the big fundamental','timmy d'] },
      { a: 'Tim Duncan', rk: '2001-02', sub: 'SAS', hint: '25.5 ppg', alias: ['the big fundamental','timmy d'] },
      { a: 'Allen Iverson', rk: '2000-01', sub: 'PHI', hint: '31.1 ppg', alias: ['ai','the answer'] }
    ]},
    { name: '1990s', items: [
      { a: 'Shaquille O\'Neal', rk: '1999-00', sub: 'LAL', hint: '29.7 ppg', alias: ['shaq','diesel'] },
      { a: 'Karl Malone', rk: '1998-99', sub: 'UTA', hint: '23.8 ppg', alias: ['the mailman','mailman'] },
      { a: 'Michael Jordan', rk: '1997-98', sub: 'CHI', hint: '28.7 ppg', alias: ['mj','air jordan'] },
      { a: 'Karl Malone', rk: '1996-97', sub: 'UTA', hint: '27.4 ppg', alias: ['the mailman','mailman'] },
      { a: 'Michael Jordan', rk: '1995-96', sub: 'CHI', hint: '30.4 ppg', alias: ['mj','air jordan'] },
      { a: 'David Robinson', rk: '1994-95', sub: 'SAS', hint: '27.6 ppg', alias: ['the admiral','admiral'] },
      { a: 'Hakeem Olajuwon', rk: '1993-94', sub: 'HOU', hint: '27.3 ppg', alias: ['the dream','olajuwan'] },
      { a: 'Charles Barkley', rk: '1992-93', sub: 'PHO', hint: '25.6 ppg', alias: ['sir charles','chuck'] },
      { a: 'Michael Jordan', rk: '1991-92', sub: 'CHI', hint: '30.1 ppg', alias: ['mj','air jordan'] },
      { a: 'Michael Jordan', rk: '1990-91', sub: 'CHI', hint: '31.5 ppg', alias: ['mj','air jordan'] }
    ]},
    { name: '1980s', items: [
      { a: 'Magic Johnson', rk: '1989-90', sub: 'LAL', hint: '22.3 ppg', alias: ['magic','earvin johnson'] },
      { a: 'Magic Johnson', rk: '1988-89', sub: 'LAL', hint: '22.5 ppg', alias: ['magic','earvin johnson'] },
      { a: 'Michael Jordan', rk: '1987-88', sub: 'CHI', hint: '35.0 ppg', alias: ['mj','air jordan'] },
      { a: 'Magic Johnson', rk: '1986-87', sub: 'LAL', hint: '23.9 ppg', alias: ['magic','earvin johnson'] },
      { a: 'Larry Bird', rk: '1985-86', sub: 'BOS', hint: '25.8 ppg', alias: ['larry legend'] },
      { a: 'Larry Bird', rk: '1984-85', sub: 'BOS', hint: '28.7 ppg', alias: ['larry legend'] },
      { a: 'Larry Bird', rk: '1983-84', sub: 'BOS', hint: '24.2 ppg', alias: ['larry legend'] },
      { a: 'Moses Malone', rk: '1982-83', sub: 'PHI', hint: '24.5 ppg', alias: ['chairman of the boards'] },
      { a: 'Moses Malone', rk: '1981-82', sub: 'HOU', hint: '31.1 ppg', alias: ['chairman of the boards'] },
      { a: 'Julius Erving', rk: '1980-81', sub: 'PHI', hint: '24.6 ppg', alias: ['dr j','doctor j','dr. j'] }
    ]},
    { name: '1970s', items: [
      { a: 'Kareem Abdul-Jabbar', rk: '1979-80', sub: 'LAL', hint: '24.8 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Moses Malone', rk: '1978-79', sub: 'HOU', hint: '24.8 ppg', alias: ['chairman of the boards'] },
      { a: 'Bill Walton', rk: '1977-78', sub: 'POR', hint: '18.9 ppg' },
      { a: 'Kareem Abdul-Jabbar', rk: '1976-77', sub: 'LAL', hint: '26.2 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Kareem Abdul-Jabbar', rk: '1975-76', sub: 'LAL', hint: '27.7 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Bob McAdoo', rk: '1974-75', sub: 'BUF', hint: '34.5 ppg', alias: ['mcadoo'] },
      { a: 'Kareem Abdul-Jabbar', rk: '1973-74', sub: 'MIL', hint: '27.0 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Dave Cowens', rk: '1972-73', sub: 'BOS', hint: '20.5 ppg', alias: ['big red'] },
      { a: 'Kareem Abdul-Jabbar', rk: '1971-72', sub: 'MIL', hint: '34.8 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Kareem Abdul-Jabbar', rk: '1970-71', sub: 'MIL', hint: '31.7 ppg', alias: ['abdul jabbar','jabbar','kaj','lew alcindor','alcindor'] }
    ]},
    { name: '1960s', items: [
      { a: 'Willis Reed', rk: '1969-70', sub: 'NYK', hint: '21.7 ppg', alias: ['the captain'] },
      { a: 'Wes Unseld', rk: '1968-69', sub: 'BAL', hint: '13.8 ppg' },
      { a: 'Wilt Chamberlain', rk: '1967-68', sub: 'PHI', hint: '24.3 ppg', alias: ['the stilt','wilt the stilt'] },
      { a: 'Wilt Chamberlain', rk: '1966-67', sub: 'PHI', hint: '24.1 ppg', alias: ['the stilt','wilt the stilt'] },
      { a: 'Wilt Chamberlain', rk: '1965-66', sub: 'PHI', hint: '33.5 ppg', alias: ['the stilt','wilt the stilt'] },
      { a: 'Bill Russell', rk: '1964-65', sub: 'BOS', hint: '14.1 ppg' },
      { a: 'Oscar Robertson', rk: '1963-64', sub: 'CIN', hint: '31.4 ppg', alias: ['big o','the big o'] },
      { a: 'Bill Russell', rk: '1962-63', sub: 'BOS', hint: '16.8 ppg' },
      { a: 'Bill Russell', rk: '1961-62', sub: 'BOS', hint: '18.9 ppg' },
      { a: 'Bill Russell', rk: '1960-61', sub: 'BOS', hint: '16.9 ppg' }
    ]},
    { name: '1950s', items: [
      { a: 'Wilt Chamberlain', rk: '1959-60', sub: 'PHW', hint: '37.6 ppg', alias: ['the stilt','wilt the stilt'] },
      { a: 'Bob Pettit', rk: '1958-59', sub: 'STL', hint: '29.2 ppg' },
      { a: 'Bill Russell', rk: '1957-58', sub: 'BOS', hint: '16.6 ppg' },
      { a: 'Bob Cousy', rk: '1956-57', sub: 'BOS', hint: '20.6 ppg', alias: ['the cooz','cooz'] },
      { a: 'Bob Pettit', rk: '1955-56', sub: 'STL', hint: '25.7 ppg' }
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

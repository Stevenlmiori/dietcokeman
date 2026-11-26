/* ===========================================================
   DietCokeMan Challenge — quiz data
   -----------------------------------------------------------
   To add a quiz, append an object to QUIZZES. Shape:

   {
     slug:  'url-safe-id',
     title: 'Shown everywhere',
     sub:   'one-line subtitle',
     blurb: 'longer line under the title',
     category: 'Sports',           // exactly one, from TAXONOMY.categories
     tags:  ['NFL','Football','All-Time'], // from TAXONOMY.tags; league, sport, then kind
     mode:  'timed'|'chill',       // preselected mode
     time:  300,                   // seconds, timed mode
     cols:  'multi'|'single'|'two'|'four', // board layout ('two'/'four' = fixed columns on desktop)
     hideSub: true,                // hide each item's `sub` until that row is solved
     modes: ['timed','chill'],     // which mode buttons to offer (default: both)
     match: 'full',                // optional: full names only (no last-name shortcut)
     featured: true,               // optional: time-sensitive, shown in the hub's "This week" section
     pin: true,                    // optional: kept at the top of the hub (Best Drink, Favorite Movies)
     groups: [{
       name: 'Group heading',
       note: 'right-side label',   // optional
       items: [{
         a: 'Correct Answer',      // full or last name; an unusual first name; never a common one alone
         hint: '32.13',            // right-hand clue, optional
         sub: 'CIN',               // small clue after the blank, optional
         rk: '1.01',               // overrides the rank badge, optional
         alias: ['extra','spellings']   // optional
       }]
     }]
   }
   =========================================================== */

/* The one list of categories and tags. Every quiz names one category and a
   few tags from here; the hub's search and filters are built from them, and
   it warns in the console about anything not on this list. Add a new
   category or tag here first, then use it. Sports tags go league, sport,
   then kind; business tags go market, then kind. */
window.TAXONOMY = {
  categories: ['Sports', 'Movies', 'TV', 'Games', 'Business', 'Food & Drink', 'History', 'Geography', 'Science'],
  tags: {
    league: ['NFL', 'NBA', 'MLB', 'NHL', 'NCAA'],
    sport:  ['Football', 'Basketball', 'Baseball', 'Hockey', 'Golf'],
    market: ['S&P 500', 'Companies', 'Stocks'],
    topic:  ['Drinks', 'Restaurants', 'Box Office', 'Oscars', 'Favorites', 'Disney', 'Minecraft', 'Kids', 'Presidents', 'US States', 'World', 'Sitcoms', 'Pokémon', 'Space', 'Comics'],
    kind:   ['All-Time', 'This Season', 'Throwback', 'Career Leaders', 'Awards', 'Champions', 'Draft', 'Fantasy', 'Betting']
  },
  /* The little emoji in each hub card's corner. The most specific match wins:
     a quiz's own `icon`, then the first of its tags listed here, then its
     category. A sports quiz shows its sport's ball, not a generic trophy. */
  icons: {
    tags: {
      Football: '🏈', Basketball: '🏀', Baseball: '⚾', Hockey: '🏒', Golf: '⛳',
      Drinks: '🥤', Restaurants: '🍔', Oscars: '🏆', 'Box Office': '🎬',
      Stocks: '📈', 'S&P 500': '📈', Minecraft: '⛏️', Disney: '👑', Presidents: '🇺🇸', World: '🌎', Pokémon: '⚡', Space: '🪐', Comics: '🦸'
    },
    categories: { Sports: '🏆', Movies: '🎬', TV: '📺', Games: '🎮', Business: '💼', 'Food & Drink': '🍽️', History: '🏛️', Geography: '🗺️', Science: '🔬' }
  }
};

window.QUIZZES = [

{
  slug: 'best-drink',
  pin: true,                       // stays at the top of the hub
  title: 'Best Drink of All Time',
  sub: 'One answer. You know it.',
  blurb: 'Name the greatest drink ever made. There is exactly one correct answer.',
  // Steven's request: a one-answer quiz whose only answer is Diet Coke. Full
  // names only, so plain "coke" (or "diet") doesn't get there by accident.
  category: 'Food & Drink',
  tags: ['Drinks', 'All-Time'],
  match: 'full',
  mode: 'timed',
  time: 30,
  cols: 'single',
  // wrong guesses that deserve their own reply (keys are normalised: lowercase, letters and digits only)
  nope: {
    pepsi: 'Absolutely not.',
    dietpepsi: 'Wrong cola. Wrong company. Wrong everything.',
    pepsizero: 'Not even close.',
    coke: 'Close. Which Coke, though?',
    cocacola: 'Close. Which Coke, though?',
    cokeclassic: 'Respectable. Still wrong.',
    cokezero: 'The impostor. Try again.',
    cokezerosugar: 'The impostor. Try again.',
    drpepper: 'Bold. Wrong.',
    dietdrpepper: 'So close and yet so far.',
    sprite: 'No.',
    water: 'Technically healthy. Still wrong.',
    coffee: 'A fine drink. Not the best drink.',
    beer: 'Not on this site.',
    tab: 'Respect the ancestor. Still wrong.'
  },
  groups: [
    { name: 'The Greatest Drink Ever Made', items: [
      { a: 'Diet Coke', rk: '1', hint: 'Ice cold', alias: ['diet coca cola', 'diet coca-cola', 'dc', 'diet coke can', 'a diet coke'] }
    ]}
  ]
},

{
  slug: 'dietcokeman-favorite-movies',
  pin: true,                       // stays at the top of the hub
  title: "DietCokeMan's Favorite Movies",
  sub: '64 favorites, in his order',
  blurb: "DietCokeMan's 64 favorite movies, ranked by the man himself. The year each one came out is your clue.",
  // Steven's own list and order (2026-11-17). Years from each film's Wikipedia short description
  // ("1994 film by Frank Darabont"). The Place Beyond the Pines is 2012 per Wikipedia (US release March 2013).
  category: 'Movies',
  tags: ['Favorites'],
  icon: '🍿',
  match: 'full',
  mode: 'timed',
  time: 600,
  cols: 'two',
  groups: [
    { name: '1–16', items: [
      { a: 'The Shawshank Redemption', rk: '1', hint: '1994', alias: ['shawshank'] },
      { a: 'Interstellar', rk: '2', hint: '2014' },
      { a: 'Saving Private Ryan', rk: '3', hint: '1998', alias: ['private ryan'] },
      { a: 'Good Will Hunting', rk: '4', hint: '1997' },
      { a: 'There Will Be Blood', rk: '5', hint: '2007' },
      { a: 'Forrest Gump', rk: '6', hint: '1994', alias: ['forest gump'] },
      { a: 'No Country for Old Men', rk: '7', hint: '2007', alias: ['no country'] },
      { a: 'Inception', rk: '8', hint: '2010' },
      { a: 'The Truman Show', rk: '9', hint: '1998', alias: ['truman'] },
      { a: 'Braveheart', rk: '10', hint: '1995', alias: ['brave heart'] },
      { a: 'Mystic River', rk: '11', hint: '2003' },
      { a: 'The Dark Knight', rk: '12', hint: '2008', alias: ['batman','the dark knight batman'] },
      { a: 'The Empire Strikes Back', rk: '13', hint: '1980', alias: ['empire strikes back','star wars empire strikes back','star wars the empire strikes back','star wars episode v','episode v','star wars','empire'] },
      { a: 'Cast Away', rk: '14', hint: '2000', alias: ['castaway'] },
      { a: 'The Departed', rk: '15', hint: '2006' },
      { a: 'Gladiator', rk: '16', hint: '2000' }
    ]},
    { name: '17–32', items: [
      { a: 'Se7en', rk: '17', hint: '1995', alias: ['seven'] },
      { a: 'Rounders', rk: '18', hint: '1998' },
      { a: 'Fight Club', rk: '19', hint: '1999' },
      { a: 'Ocean\'s Eleven', rk: '20', hint: '2001', alias: ['oceans 11','oceans eleven','oceans'] },
      { a: 'Jurassic Park', rk: '21', hint: '1993' },
      { a: 'Signs', rk: '22', hint: '2002' },
      { a: 'Catch Me If You Can', rk: '23', hint: '2002', alias: ['catch me if you can'] },
      { a: 'Dead Poets Society', rk: '24', hint: '1989', alias: ['dead poets'] },
      { a: 'Man on Fire', rk: '25', hint: '2004' },
      { a: 'The Prestige', rk: '26', hint: '2006' },
      { a: 'The Matrix', rk: '27', hint: '1999' },
      { a: 'Elf', rk: '28', hint: '2003' },
      { a: 'Independence Day', rk: '29', hint: '1996', alias: ['id4'] },
      { a: 'The Big Short', rk: '30', hint: '2015' },
      { a: 'The Patriot', rk: '31', hint: '2000' },
      { a: 'Sicario', rk: '32', hint: '2015' }
    ]},
    { name: '33–48', items: [
      { a: 'The Sandlot', rk: '33', hint: '1993', alias: ['sand lot'] },
      { a: 'Mission: Impossible', rk: '34', hint: '1996', alias: ['mission impossible','mi'] },
      { a: 'Gangs of New York', rk: '35', hint: '2002' },
      { a: 'Anchorman: The Legend of Ron Burgundy', rk: '36', hint: '2004', alias: ['anchorman','ron burgundy','anchorman the legend of ron burgundy'] },
      { a: 'Office Space', rk: '37', hint: '1999' },
      { a: 'Dumb and Dumber', rk: '38', hint: '1994', alias: ['dumb & dumber','dumb n dumber'] },
      { a: 'Tommy Boy', rk: '39', hint: '1995' },
      { a: 'Billy Madison', rk: '40', hint: '1995' },
      { a: 'Happy Gilmore', rk: '41', hint: '1996' },
      { a: 'The Social Network', rk: '42', hint: '2010' },
      { a: 'Heat', rk: '43', hint: '1995' },
      { a: 'Moneyball', rk: '44', hint: '2011', alias: ['money ball'] },
      { a: 'The Princess Bride', rk: '45', hint: '1987' },
      { a: 'The Royal Tenenbaums', rk: '46', hint: '2001', alias: ['tenenbaums'] },
      { a: 'The Fugitive', rk: '47', hint: '1993' },
      { a: 'Air Force One', rk: '48', hint: '1997', alias: ['af1'] }
    ]},
    { name: '49–64', items: [
      { a: 'Clear and Present Danger', rk: '49', hint: '1994', alias: ['clear & present danger'] },
      { a: 'Patriot Games', rk: '50', hint: '1992' },
      { a: 'Arrival', rk: '51', hint: '2016' },
      { a: 'Zoolander', rk: '52', hint: '2001' },
      { a: 'Step Brothers', rk: '53', hint: '2008', alias: ['stepbrothers'] },
      { a: 'Apollo 13', rk: '54', hint: '1995', alias: ['apollo thirteen'] },
      { a: 'A Time to Kill', rk: '55', hint: '1996' },
      { a: 'Remember the Titans', rk: '56', hint: '2000' },
      { a: 'Rudy', rk: '57', hint: '1993' },
      { a: 'Training Day', rk: '58', hint: '2001' },
      { a: 'Inglourious Basterds', rk: '59', hint: '2009', alias: ['inglorious basterds','inglorious bastards','inglourious bastards'] },
      { a: 'The Town', rk: '60', hint: '2010' },
      { a: 'Toy Story', rk: '61', hint: '1995' },
      { a: 'War of the Worlds', rk: '62', hint: '2005' },
      { a: 'The Place Beyond the Pines', rk: '63', hint: '2012' },
      { a: 'Arlington Road', rk: '64', hint: '1999' }
    ]}
  ]
},

{
  slug: 'disney-princesses',
  title: 'Disney Princesses',
  sub: 'Name every princess',
  blurb: "Can you name all 13 official Disney Princesses, plus the two Frozen sisters? Each row shows the year her movie came out and her sidekick.",
  // Built for Jamesyn (10). The 13 official members per Wikipedia "Disney Princess" (Raya, 2021, is the 13th;
  // Anna and Elsa were considered but never joined, so they're a bonus section). Clues are the year and the
  // sidekick, not the movie title, which would give away Mulan, Moana, Raya, Cinderella and Pocahontas.
  category: 'Movies',
  tags: ['Disney', 'Kids'],
  icon: '👑',
  match: 'full',
  mode: 'chill',
  time: 180,
  cols: 'single',
  nope: {
    barbie: 'Barbie is awesome, but she is not a Disney princess!',
    fiona: 'Fiona is a princess from Shrek, not Disney!',
    princessfiona: 'Fiona is a princess from Shrek, not Disney!',
    peach: 'Wrong castle! Peach is from Mario.',
    princesspeach: 'Wrong castle! Peach is from Mario.',
    leia: 'Disney owns Star Wars, but Leia is not on this list!',
    princessleia: 'Disney owns Star Wars, but Leia is not on this list!',
    tinkerbell: 'She is a fairy, not a princess!',
    vanellope: 'She is a princess, but not an official Disney one!',
    sofia: 'Sofia the First is a TV princess, not one of these!',
    olaf: 'Olaf is a snowman! Try the people who made him.',
    mushu: 'Mushu is the sidekick! Who is his princess?',
    elena: 'Elena of Avalor is a TV princess, not one of these!'
  },
  groups: [
    { name: 'The Official Princesses', items: [
      { a: 'Snow White', rk: '1', sub: '1937', hint: 'Seven Dwarfs', alias: ['snow','snowwhite','princess snow white'] },
      { a: 'Cinderella', rk: '2', sub: '1950', hint: 'Gus & Jaq', alias: ['cinderelly','cinderela','cindy','princess cinderella'] },
      { a: 'Aurora', rk: '3', sub: '1959', hint: 'Three good fairies', alias: ['sleeping beauty','briar rose','arora','princess aurora'] },
      { a: 'Ariel', rk: '4', sub: '1989', hint: 'Flounder', alias: ['little mermaid','the little mermaid','ariell','arial','princess ariel'] },
      { a: 'Belle', rk: '5', sub: '1991', hint: 'Chip', alias: ['bell','bella','princess belle'] },
      { a: 'Jasmine', rk: '6', sub: '1992', hint: 'Rajah the tiger', alias: ['jasmin','jazmine','jazmin','jasmeen','jazmeen','jasmene','princess jasmine'] },
      { a: 'Pocahontas', rk: '7', sub: '1995', hint: 'Meeko', alias: ['pocahantas','pocohontas','pocahontus','princess pocahontas'] },
      { a: 'Mulan', rk: '8', sub: '1998', hint: 'Mushu', alias: ['fa mulan','hua mulan','moolan','princess mulan'] },
      { a: 'Tiana', rk: '9', sub: '2009', hint: 'Louis', alias: ['tianna','tiyana','princess tiana'] },
      { a: 'Rapunzel', rk: '10', sub: '2010', hint: 'Pascal', alias: ['repunzel','rapunzle','rapunsel','rapunzell','princess rapunzel'] },
      { a: 'Merida', rk: '11', sub: '2012', hint: 'Angus the horse', alias: ['marida','meridah','princess merida'] },
      { a: 'Moana', rk: '12', sub: '2016', hint: 'Heihei', alias: ['moanna','mowana','moanah','muana','princess moana'] },
      { a: 'Raya', rk: '13', sub: '2021', hint: 'Sisu', alias: ['raia','princess raya'] }
    ]},
    { name: 'Royalty Too', items: [
      { a: 'Anna', rk: '14', sub: '2013', hint: 'Kristoff & Sven', alias: ['ana','anah','princess anna'] },
      { a: 'Elsa', rk: '15', sub: '2013', hint: 'Olaf', alias: ['elssa','else','elza','princess elsa'] }
    ]}
  ]
},

{
  slug: 'minecraft-mobs',
  title: 'Minecraft Mobs',
  sub: 'Name every mob in the game',
  blurb: "How many of Minecraft's 88 mobs can you name? Every row has a hint. Passive, neutral, hostile, and the two bosses.",
  // For Steven's boys. The current list from minecraft.wiki "Mob" (passive/neutral/hostile/boss),
  // pulled 2026-11-17, through the Sulfur Cube. Full names only: "spider" must not also fill Cave Spider,
  // "zombie" must not fill four zombies. Old names and kid spellings are aliases (zombie pigman, snowman).
  // Upcoming mobs (Blub, Frostbite) are left out until they ship; re-pull when they do.
  category: 'Games',
  tags: ['Minecraft', 'Kids'],
  match: 'full',
  mode: 'chill',
  time: 600,
  cols: 'single',          // sentence-long hints need the full row
  nope: {
    herobrine: "Herobrine isn't real... or is he?",
    steve: "That's you, the player! Mobs only.",
    alex: "That's you, the player! Mobs only.",
    killerbunny: 'The killer bunny is a rare rabbit! Try rabbit.',
    giant: 'Giants are in the code but never spawn. Try another!',
    illusioner: 'The illusioner never spawns on its own. Try another!',
    notch: 'Notch made the game! Mobs only.',
    jeb: 'A sheep named jeb_ is a rainbow sheep! Try sheep.',
    dinnerbone: 'Name a mob Dinnerbone and it flips upside down! Try another.',
    chickenjockey: 'A chicken jockey is a baby zombie on a chicken! Name them one at a time.'
  },
  groups: [
    { name: 'Passive', items: [
      { a: 'Allay', hint: 'Blue flier that collects items for you', alias: ['allays','ally'] },
      { a: 'Armadillo', hint: 'Rolls into a ball; drops scutes', alias: ['armadilo'] },
      { a: 'Axolotl', hint: 'Cute swimmer in lush caves', alias: ['axolottl','axolotel','axalotl','axlotl','axolotls','axolatl'] },
      { a: 'Bat', hint: 'Squeaks around in dark caves', alias: ['bats'] },
      { a: 'Camel', hint: 'Desert ride for two players', alias: ['camels'] },
      { a: 'Camel Husk', hint: 'Undead camel ridden in the desert', alias: ['zombie camel'] },
      { a: 'Cat', hint: 'Scares away creepers', alias: ['kitty','kitten','cats'] },
      { a: 'Chicken', hint: 'Lays eggs', alias: ['chickens','chick'] },
      { a: 'Cod', hint: 'Plain ocean fish' },
      { a: 'Copper Golem', hint: 'Sorts your items into chests', alias: ['copper golems'] },
      { a: 'Cow', hint: 'Milk and leather', alias: ['cows'] },
      { a: 'Donkey', hint: 'Can carry a chest on its back', alias: ['donkeys'] },
      { a: 'Frog', hint: 'Eats tiny magma cubes', alias: ['frogs'] },
      { a: 'Glow Squid', hint: 'Its ink makes signs glow', alias: ['glowsquid','glowing squid'] },
      { a: 'Happy Ghast', hint: 'Friendly floating ride for four', alias: ['happy ghasts'] },
      { a: 'Horse', hint: 'Fast ride with a saddle', alias: ['horses'] },
      { a: 'Mooshroom', hint: 'Mushroom-covered cow', alias: ['mushroom cow','moshroom','mooshroom cow'] },
      { a: 'Mule', hint: 'Half horse, half donkey', alias: ['mules'] },
      { a: 'Ocelot', hint: 'Shy jungle cat', alias: ['ocelots','ocelet'] },
      { a: 'Parrot', hint: 'Dances to music', alias: ['parrots','parot'] },
      { a: 'Pig', hint: 'Ride it with a carrot on a stick', alias: ['pigs','piggy'] },
      { a: 'Rabbit', hint: 'Hops around; lucky foot', alias: ['bunny','rabbits'] },
      { a: 'Salmon', hint: 'Swims up rivers' },
      { a: 'Sheep', hint: 'Gives wool', alias: ['sheeps'] },
      { a: 'Skeleton Horse', hint: 'Shows up when lightning strikes', alias: ['skeleton horses'] },
      { a: 'Sniffer', hint: 'Ancient mob that digs up seeds', alias: ['sniffers'] },
      { a: 'Snow Golem', hint: 'Pumpkin head, throws snowballs', alias: ['snowman','snow man','snowgolem'] },
      { a: 'Squid', hint: 'Gives ink sacs', alias: ['squids'] },
      { a: 'Strider', hint: 'Walks on lava', alias: ['striders'] },
      { a: 'Sulfur Cube', hint: 'Bouncy cube from sulfur caves', alias: ['sulphur cube'] },
      { a: 'Tadpole', hint: 'Grows up into a frog', alias: ['tadpoles'] },
      { a: 'Tropical Fish', hint: 'Colorful reef fish', alias: ['tropical fishes'] },
      { a: 'Turtle', hint: 'Lays eggs on the beach', alias: ['turtles','sea turtle'] },
      { a: 'Villager', hint: 'Trades for emeralds', alias: ['villagers','villiger','vilager'] },
      { a: 'Wandering Trader', hint: 'Shows up with two llamas', alias: ['wandering traders'] },
      { a: 'Zombie Horse', hint: 'Undead horse', alias: ['zombie horses'] }
    ]},
    { name: 'Neutral', items: [
      { a: 'Bee', hint: 'Makes honey; stings if you bother it', alias: ['bees'] },
      { a: 'Cave Spider', hint: 'Poison bite in mineshafts', alias: ['cave spiders'] },
      { a: 'Dolphin', hint: 'Gives you a swimming boost', alias: ['dolphins'] },
      { a: 'Drowned', hint: 'Underwater zombie with a trident', alias: ['drowned zombie','drown'] },
      { a: 'Enderman', hint: 'Don\'t look it in the eyes!', alias: ['endermen','ender man','endermans'] },
      { a: 'Fox', hint: 'Carries things in its mouth', alias: ['foxes','fox'] },
      { a: 'Goat', hint: 'Rams you off mountains', alias: ['goats'] },
      { a: 'Iron Golem', hint: 'Protects villages', alias: ['iron golems','irongolem'] },
      { a: 'Llama', hint: 'Spits at you', alias: ['lama','llamas'] },
      { a: 'Nautilus', hint: 'Underwater ride you can tame' },
      { a: 'Panda', hint: 'Munches bamboo', alias: ['pandas'] },
      { a: 'Piglin', hint: 'Loves gold', alias: ['piglins'] },
      { a: 'Polar Bear', hint: 'Lives in snowy places', alias: ['polar bears'] },
      { a: 'Pufferfish', hint: 'Puffs up and poisons you', alias: ['puffer fish','blowfish'] },
      { a: 'Spider', hint: 'Climbs walls; angry at night', alias: ['spiders'] },
      { a: 'Trader Llama', hint: 'Follows the wandering trader', alias: ['trader llamas'] },
      { a: 'Wolf', hint: 'Tame it with a bone', alias: ['dog','wolves','puppy'] },
      { a: 'Zombie Nautilus', hint: 'Undead ride for a drowned' },
      { a: 'Zombified Piglin', hint: 'Gold sword; the whole group attacks', alias: ['zombie pigman','zombie piglin','zombified piglins','pigman'] }
    ]},
    { name: 'Hostile', items: [
      { a: 'Blaze', hint: 'Fire flier in Nether fortresses', alias: ['blazes'] },
      { a: 'Bogged', hint: 'Mossy skeleton with poison arrows' },
      { a: 'Breeze', hint: 'Windy mob in trial chambers', alias: ['breezes'] },
      { a: 'Creaking', hint: 'Only moves when you look away', alias: ['creakings'] },
      { a: 'Creeper', hint: 'Ssss... BOOM', alias: ['creepers','creper'] },
      { a: 'Elder Guardian', hint: 'Boss of the ocean monument', alias: ['elder guardians'] },
      { a: 'Endermite', hint: 'Tiny bug from ender pearls', alias: ['endermites'] },
      { a: 'Evoker', hint: 'Summons fangs and vexes', alias: ['evokers','evocation illager'] },
      { a: 'Ghast', hint: 'Cries and shoots fireballs', alias: ['ghasts'] },
      { a: 'Guardian', hint: 'Laser fish in ocean monuments', alias: ['guardians'] },
      { a: 'Hoglin', hint: 'Giant Nether pig beast', alias: ['hoglins'] },
      { a: 'Husk', hint: 'Desert zombie', alias: ['husks'] },
      { a: 'Magma Cube', hint: 'Bouncy Nether slime', alias: ['magma cubes','magma slime'] },
      { a: 'Parched', hint: 'Desert skeleton with weakness arrows' },
      { a: 'Phantom', hint: 'Swoops at you if you skip sleep', alias: ['phantoms'] },
      { a: 'Piglin Brute', hint: 'Bastion guard with a golden axe', alias: ['brute','piglin brutes'] },
      { a: 'Pillager', hint: 'Crossbow raider', alias: ['pillagers'] },
      { a: 'Ravager', hint: 'Huge beast in raids', alias: ['ravagers'] },
      { a: 'Shulker', hint: 'Hides in a box in End cities', alias: ['shulkers'] },
      { a: 'Silverfish', hint: 'Hides inside stone blocks', alias: ['silver fish'] },
      { a: 'Skeleton', hint: 'Shoots arrows', alias: ['skeletons','skelly'] },
      { a: 'Slime', hint: 'Splits into smaller ones', alias: ['slimes'] },
      { a: 'Stray', hint: 'Frozen skeleton; slowness arrows', alias: ['strays'] },
      { a: 'Vex', hint: 'Tiny flying ghost with a sword', alias: ['vexes'] },
      { a: 'Vindicator', hint: 'Axe-swinging illager', alias: ['vindicators'] },
      { a: 'Warden', hint: 'Blind giant of the Deep Dark', alias: ['wardens'] },
      { a: 'Witch', hint: 'Throws potions', alias: ['witches'] },
      { a: 'Wither Skeleton', hint: 'Black skeleton; drops skulls', alias: ['wither skeletons'] },
      { a: 'Zoglin', hint: 'Zombified hoglin', alias: ['zoglins'] },
      { a: 'Zombie', hint: 'Groans and burns in the sun', alias: ['zombies'] },
      { a: 'Zombie Villager', hint: 'Cure it with a golden apple', alias: ['zombie villagers'] }
    ]},
    { name: 'Bosses', items: [
      { a: 'Ender Dragon', hint: 'Final boss of the End', alias: ['enderdragon','the ender dragon','dragon'] },
      { a: 'Wither', hint: 'Three heads; you build it yourself', alias: ['the wither'] }
    ]}
  ]
},

{
  slug: 'top5-by-position',
  title: 'NFL Fantasy Leaders',
  sub: 'Astroworld 2026 scoring leaders',
  blurb: 'The five highest scorers at QB, RB, WR and TE through Week 11 of the 2026 season, entering Week 12. Yahoo fantasy points are your clue.',
  // Kickers and defenses were cut 2026-11-17 (30 answers became 20), so scores
  // restart under a new key; the slug stays so old links still work.
  // 2026-11-24: refreshed from Steven's Yahoo Fantasy season-leader screenshots
  // (totals through Week 11). New scoreKey because the answer set and clues changed.
  scoreKey: 'top5-by-position-2026-w11',
  category: 'Sports',
  tags: ['NFL', 'Football', 'Fantasy', 'This Season'],
  mode: 'timed',
  time: 300,
  cols: 'two',            // four positions read as a 2x2
  hideSub: true,          // the NFL team would give the player away
  groups: [
    { name: 'Quarterbacks', note: 'pts', items: [
      { a: 'Joe Burrow',          sub: 'CIN', hint: '315.84' },
      { a: 'Dak Prescott',        sub: 'DAL', hint: '293.28' },
      { a: 'Brock Purdy',         sub: 'SF',  hint: '275.28' },
      { a: 'Josh Allen',          sub: 'BUF', hint: '267.06' },
      { a: 'C.J. Stroud',         sub: 'HOU', hint: '253.38', alias: ['cj stroud','c j stroud'] }
    ]},
    { name: 'Running Backs', note: 'pts', items: [
      { a: 'Jahmyr Gibbs',        sub: 'DET', hint: '281.20', alias: ['sonic'] },
      { a: 'Christian McCaffrey', sub: 'SF',  hint: '227.20', alias: ['cmc','mccaffery'] },
      { a: 'Chuba Hubbard',       sub: 'CAR', hint: '206.80' },
      { a: 'Bijan Robinson',      sub: 'ATL', hint: '197.70' },
      { a: 'Kenneth Walker III',  sub: 'KC',  hint: '196.40', alias: ['kenneth walker','k9','kenny walker'] }
    ]},
    { name: 'Wide Receivers', note: 'pts', items: [
      { a: 'Jaxon Smith-Njigba',  sub: 'SEA', hint: '263.18', alias: ['jsn','smith njigba','njigba'] },
      { a: 'CeeDee Lamb',         sub: 'DAL', hint: '252.20', alias: ['cd lamb','ceedee'] },
      { a: "Ja'Marr Chase",       sub: 'CIN', hint: '201.90', alias: ['jamar chase','jamarr'] },
      { a: 'Amon-Ra St. Brown',   sub: 'DET', hint: '198.10', alias: ['amon ra','st brown','saint brown','sun god'] },
      { a: 'Tee Higgins',         sub: 'CIN', hint: '183.70' }
    ]},
    { name: 'Tight Ends', note: 'pts', items: [
      { a: 'Trey McBride',        sub: 'ARI', hint: '186.30', alias: ['macbride'] },
      { a: 'Isaiah Likely',       sub: 'NYG', hint: '161.00' },
      { a: 'Brock Bowers',        sub: 'LV',  hint: '149.80' },
      { a: 'George Kittle',       sub: 'SF',  hint: '146.10' },
      { a: 'Travis Kelce',        sub: 'KC',  hint: '129.70', alias: ['kelce'] }
    ]}
  ]
},

{
  slug: 'nfl-all-time-top20',
  title: 'NFL All-Time Top 20',
  sub: 'Passing, rushing and receiving yards',
  blurb: 'The twenty biggest career totals in each of the three great counting stats. Career yards are your clue.',
  category: 'Sports',
  tags: ['NFL', 'Football', 'All-Time', 'Career Leaders'],
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

   Week 12, 2026 (Thanksgiving week, Nov 25 to Nov 30). BetMGM lines from
   BetMGM's own per-game pages (sports.betmgm.com/en/blog/nfl/<away>-<home>-
   prediction-odds-...-week-12-jaa; Giants-Colts and Jets-Dolphins sat under
   /blog/article-new/), pulled the afternoon of Tue Nov 24. Pages dated
   12:34 to 12:40 PM ET (11:34 to 11:40 AM CT). Steven wants BetMGM, same-day.
   ----------------------------------------------------------- */
{
  slug: 'nba-top25-by-category',
  title: 'NBA Top 25 by Category',
  sub: 'Career leaders in eight stats',
  blurb: 'The top 25 in NBA career games, points, rebounds, assists, blocks, steals, 3-pointers and free throw percentage, through games of November 16, 2026. The stat is your clue. A name fills every list it is on.',
  // Basketball-Reference NBA-only career leaders (not NBA+ABA), pulled 2026-11-17
  // ("Last Updated: Tuesday, November 17, 7:01AM"). Active players' totals move
  // nightly; re-pull before trusting. FT% needs 1,200 made free throws.
  category: 'Sports',
  tags: ['NBA', 'Basketball', 'All-Time', 'Career Leaders'],
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
  category: 'Sports',
  tags: ['NFL', 'Football', 'All-Time', 'Awards'],
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
  category: 'Sports',
  tags: ['NBA', 'Basketball', 'All-Time', 'Awards'],
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
  slug: 'nba-50-point-games',
  title: 'NBA 50-Point Games',
  sub: 'Most 50-point games, all time',
  blurb: 'The players with the most 50-point games in NBA regular-season history, through November 20, 2026. How many each one has is your clue.',
  category: 'Sports',
  tags: ['NBA', 'Basketball', 'Career Leaders'],
  mode: 'timed',
  time: 300,
  cols: 'two',
  groups: [
    { name: 'The top 10', note: 'with ties', items: [
      { a: 'Wilt Chamberlain', rk: '1', hint: '118', alias: ['wilt','the stilt','wilt the stilt','big dipper'] },
      { a: 'Michael Jordan', rk: '2', hint: '31', alias: ['mj','air jordan','his airness'] },
      { a: 'James Harden', rk: '3', hint: '26', alias: ['the beard'] },
      { a: 'Kobe Bryant', rk: '4', hint: '25', alias: ['black mamba','mamba'] },
      { a: 'Elgin Baylor', rk: '5', hint: '17' },
      { a: 'Damian Lillard', rk: 'T6', hint: '15', alias: ['dame','dame time','dame lillard'] },
      { a: 'Stephen Curry', rk: 'T6', hint: '15', alias: ['steph','steph curry','chef curry'] },
      { a: 'LeBron James', rk: 'T8', hint: '14', alias: ['bron','king james','lebron'] },
      { a: 'Rick Barry', rk: 'T8', hint: '14' },
      { a: 'Luka Dončić', rk: 'T10', hint: '11', alias: ['luka doncic','doncic'] },
      { a: 'Allen Iverson', rk: 'T10', hint: '11', alias: ['ai','the answer','a.i.'] }
    ]},
    { name: 'Six or more', items: [
      { a: 'Kareem Abdul-Jabbar', rk: '12', hint: '10', alias: ['kareem','abdul jabbar','kaj','lew alcindor','alcindor'] },
      { a: 'Giannis Antetokounmpo', rk: 'T13', hint: '9', alias: ['greek freak','the greek freak'] },
      { a: 'Kevin Durant', rk: 'T13', hint: '9', alias: ['kd','durantula','slim reaper'] },
      { a: 'Joel Embiid', rk: 'T15', hint: '8', alias: ['jojo'] },
      { a: 'Devin Booker', rk: 'T15', hint: '8', alias: ['book','d book'] },
      { a: 'Bernard King', rk: 'T15', hint: '8' },
      { a: 'Dominique Wilkins', rk: '18', hint: '7', alias: ['nique','human highlight film'] },
      { a: 'Kyrie Irving', rk: 'T19', hint: '6', alias: ['uncle drew'] },
      { a: 'Adrian Dantley', rk: 'T19', hint: '6' },
      { a: 'Pete Maravich', rk: 'T19', hint: '6', alias: ['pistol pete','pistol'] },
      { a: 'Bob Pettit', rk: 'T19', hint: '6' }
    ]}
  ]
},

{
  slug: 'mlb-career-hr',
  title: 'MLB All-Time Home Runs',
  sub: 'The top 50 career home run hitters',
  blurb: 'The 50 greatest home run hitters in MLB history, through the 2026 season. Career home runs are your clue.',
  // Baseball-Reference /leaders/HR_career.shtml, "Last Updated: Monday, November 16" (2026 season final).
  // Ties share a rank (three at 521, two at 512, 511, 493, 475, 462, 449, 434); #49-50 tie closes it at 50.
  category: 'Sports',
  tags: ['MLB', 'Baseball', 'All-Time', 'Career Leaders'],
  mode: 'timed',
  time: 480,
  cols: 'multi',
  groups: [
    { name: '1–10', items: [
      { a: 'Barry Bonds', rk: '1', hint: '762' },
      { a: 'Hank Aaron', rk: '2', hint: '755', alias: ['henry aaron','hammerin hank','hammer','the hammer'] },
      { a: 'Babe Ruth', rk: '3', hint: '714', alias: ['the bambino','bambino','sultan of swat','george herman ruth'] },
      { a: 'Albert Pujols', rk: '4', hint: '703', alias: ['the machine','el hombre'] },
      { a: 'Alex Rodriguez', rk: '5', hint: '696', alias: ['a rod','arod'] },
      { a: 'Willie Mays', rk: '6', hint: '660', alias: ['say hey kid','the say hey kid'] },
      { a: 'Ken Griffey Jr.', rk: '7', hint: '630', alias: ['junior','griffey jr','ken griffey'] },
      { a: 'Jim Thome', rk: '8', hint: '612', alias: ['thom'] },
      { a: 'Sammy Sosa', rk: '9', hint: '609', alias: ['slammin sammy'] },
      { a: 'Frank Robinson', rk: '10', hint: '586' }
    ]},
    { name: '11–20', items: [
      { a: 'Mark McGwire', rk: '11', hint: '583', alias: ['big mac'] },
      { a: 'Harmon Killebrew', rk: '12', hint: '573', alias: ['killer'] },
      { a: 'Rafael Palmeiro', rk: '13', hint: '569', alias: ['raffy'] },
      { a: 'Reggie Jackson', rk: '14', hint: '563', alias: ['mr october'] },
      { a: 'Manny Ramirez', rk: '15', hint: '555', alias: ['manny'] },
      { a: 'Mike Schmidt', rk: '16', hint: '548' },
      { a: 'David Ortiz', rk: '17', hint: '541', alias: ['big papi','papi'] },
      { a: 'Mickey Mantle', rk: '18', hint: '536', alias: ['the mick','mick'] },
      { a: 'Jimmie Foxx', rk: '19', hint: '534', alias: ['double x','jimmy foxx'] },
      { a: 'Willie McCovey', rk: '20', hint: '521', alias: ['stretch'] }
    ]},
    { name: '21–30', items: [
      { a: 'Frank Thomas', rk: '20', hint: '521', alias: ['the big hurt','big hurt'] },
      { a: 'Ted Williams', rk: '20', hint: '521', alias: ['teddy ballgame','the splendid splinter'] },
      { a: 'Ernie Banks', rk: '23', hint: '512', alias: ['mr cub'] },
      { a: 'Eddie Mathews', rk: '23', hint: '512' },
      { a: 'Miguel Cabrera', rk: '25', hint: '511', alias: ['miggy'] },
      { a: 'Mel Ott', rk: '25', hint: '511', alias: ['master melvin'] },
      { a: 'Gary Sheffield', rk: '27', hint: '509', alias: ['sheff'] },
      { a: 'Eddie Murray', rk: '28', hint: '504', alias: ['steady eddie'] },
      { a: 'Lou Gehrig', rk: '29', hint: '493', alias: ['the iron horse','iron horse'] },
      { a: 'Fred McGriff', rk: '29', hint: '493', alias: ['crime dog','the crime dog'] }
    ]},
    { name: '31–40', items: [
      { a: 'Adrian Beltré', rk: '31', hint: '477' },
      { a: 'Stan Musial', rk: '32', hint: '475', alias: ['stan the man'] },
      { a: 'Willie Stargell', rk: '32', hint: '475', alias: ['pops'] },
      { a: 'Carlos Delgado', rk: '34', hint: '473' },
      { a: 'Chipper Jones', rk: '35', hint: '468', alias: ['larry jones'] },
      { a: 'Dave Winfield', rk: '36', hint: '465' },
      { a: 'Nelson Cruz', rk: '37', hint: '464', alias: ['boomstick'] },
      { a: 'José Canseco', rk: '38', hint: '462', alias: ['jose canseco'] },
      { a: 'Adam Dunn', rk: '38', hint: '462', alias: ['big donkey'] },
      { a: 'Giancarlo Stanton', rk: '40', hint: '456', alias: ['mike stanton'] }
    ]},
    { name: '41–50', items: [
      { a: 'Carl Yastrzemski', rk: '41', hint: '452', alias: ['yaz'] },
      { a: 'Jeff Bagwell', rk: '42', hint: '449' },
      { a: 'Vladimir Guerrero', rk: '42', hint: '449', alias: ['vlad','vlad guerrero','vladimir guerrero sr'] },
      { a: 'Dave Kingman', rk: '44', hint: '442', alias: ['kong'] },
      { a: 'Jason Giambi', rk: '45', hint: '440', alias: ['the giambino','giambino'] },
      { a: 'Paul Konerko', rk: '46', hint: '439', alias: ['paulie'] },
      { a: 'Andre Dawson', rk: '47', hint: '438', alias: ['the hawk','hawk'] },
      { a: 'Carlos Beltrán', rk: '48', hint: '435' },
      { a: 'Juan González', rk: '49', hint: '434', alias: ['igor','juan gone','juan gonzalez'] },
      { a: 'Andruw Jones', rk: '49', hint: '434' }
    ]}
  ]
},

{
  slug: 'sp500-since-1957',
  title: 'Still in the S&P 500 Since 1957',
  sub: 'The original members that never left',
  blurb: 'When the S&P 500 launched on March 4, 1957, these 52 companies (or the companies they grew out of) were in it, and they still are. The sector and headquarters are your clues.',
  // Wikipedia "List of S&P 500 companies" (S&P data), 'Date added' 1957-03-04, pulled 2026-11-17.
  // Several are there through a predecessor: Altria (Philip Morris), RTX (United Aircraft), S&P Global
  // (McGraw-Hill), Exelon (Commonwealth Edison), Honeywell (Allied). Next-oldest member: Sherwin-Williams, 1964.
  // Company names need full names: 'general' or 'energy' alone must not count. Aliases carry the everyday names.
  category: 'Business',
  tags: ['S&P 500', 'Companies', 'All-Time'],
  match: 'full',
  mode: 'timed',
  time: 600,
  cols: 'multi',
  groups: [
    { name: 'Industrials', items: [
      { a: 'Boeing', hint: 'Arlington, VA', alias: ['the boeing company'] },
      { a: 'Norfolk Southern', hint: 'Atlanta, GA', alias: ['norfolk'] },
      { a: 'Lockheed Martin', hint: 'Bethesda, MD', alias: ['lockheed','martin marietta'] },
      { a: 'Honeywell', hint: 'Charlotte, NC', alias: ['honeywell international','allied signal','alliedsignal'] },
      { a: 'Eaton', hint: 'Dublin, Ireland', alias: ['eaton corporation'] },
      { a: 'GE Aerospace', hint: 'Evendale, OH', alias: ['ge','general electric'] },
      { a: 'Caterpillar', hint: 'Irving, TX', alias: ['cat'] },
      { a: 'CSX', hint: 'Jacksonville, FL', alias: ['csx corporation','csx transportation'] },
      { a: 'John Deere', hint: 'Moline, IL', alias: ['deere','deere and company','deere & company'] },
      { a: 'Union Pacific', hint: 'Omaha, NE', alias: ['union pacific railroad'] },
      { a: 'General Dynamics', hint: 'Reston, VA', alias: ['gd'] },
      { a: '3M', hint: 'Saint Paul, MN', alias: ['mmm','three m','minnesota mining'] },
      { a: 'RTX', hint: 'Waltham, MA', alias: ['raytheon','rtx corporation','raytheon technologies','united technologies','united aircraft'] },
      { a: 'Northrop Grumman', hint: 'West Falls Church, VA', alias: ['northrop'] }
    ]},
    { name: 'Consumer Staples', items: [
      { a: 'Coca-Cola', hint: 'Atlanta, GA', alias: ['coke','coca cola','the coca cola company','coca cola company'] },
      { a: 'Archer Daniels Midland', hint: 'Chicago, IL', alias: ['adm','archer daniels'] },
      { a: 'Kroger', hint: 'Cincinnati, OH', alias: ['the kroger company'] },
      { a: 'Procter & Gamble', hint: 'Cincinnati, OH', alias: ['p&g','p and g','pg','procter and gamble','proctor and gamble','proctor & gamble','proctor gamble'] },
      { a: 'General Mills', hint: 'Golden Valley, MN' },
      { a: 'Hershey', hint: 'Hershey, PA', alias: ['hersheys','the hershey company','hershey company','hershey foods'] },
      { a: 'Kimberly-Clark', hint: 'Irving, TX', alias: ['kimberly clark'] },
      { a: 'Colgate-Palmolive', hint: 'New York, NY', alias: ['colgate','colgate palmolive'] },
      { a: 'PepsiCo', hint: 'Purchase, NY', alias: ['pepsi','pepsi co'] },
      { a: 'Altria', hint: 'Richmond, VA', alias: ['philip morris','altria group'] }
    ]},
    { name: 'Utilities', items: [
      { a: 'Southern Company', hint: 'Atlanta, GA', alias: ['the southern company','georgia power'] },
      { a: 'Exelon', hint: 'Chicago, IL', alias: ['commonwealth edison','comed'] },
      { a: 'American Electric Power', hint: 'Columbus, OH', alias: ['aep'] },
      { a: 'DTE Energy', hint: 'Detroit, MI', alias: ['dte','detroit edison'] },
      { a: 'CMS Energy', hint: 'Jackson, MI', alias: ['cms','consumers energy','consumers power'] },
      { a: 'Xcel Energy', hint: 'Minneapolis, MN', alias: ['xcel','excel energy','northern states power'] },
      { a: 'Entergy', hint: 'New Orleans, LA', alias: ['entergy corporation'] },
      { a: 'Consolidated Edison', hint: 'New York, NY', alias: ['con ed','coned','con edison'] },
      { a: 'Public Service Enterprise Group', hint: 'Newark, NJ', alias: ['pseg','pse&g','public service'] },
      { a: 'Edison International', hint: 'Rosemead, CA', alias: ['southern california edison','socal edison','sce'] }
    ]},
    { name: 'Energy', items: [
      { a: 'Chevron', hint: 'Houston, TX', alias: ['chevron corporation','chevron texaco'] },
      { a: 'ConocoPhillips', hint: 'Houston, TX', alias: ['conoco','conoco phillips','phillips petroleum'] },
      { a: 'Halliburton', hint: 'Houston, TX' },
      { a: 'Occidental Petroleum', hint: 'Houston, TX', alias: ['occidental','oxy'] },
      { a: 'Schlumberger', hint: 'Houston, TX', alias: ['slb'] },
      { a: 'ExxonMobil', hint: 'Irving, TX', alias: ['exxon','exxon mobil','mobil','standard oil of new jersey'] }
    ]},
    { name: 'Health Care', items: [
      { a: 'Merck', hint: 'Kenilworth, NJ', alias: ['merck and co','merck & co'] },
      { a: 'Bristol Myers Squibb', hint: 'New York, NY', alias: ['bms','bristol myers','bristol-myers squibb'] },
      { a: 'Pfizer', hint: 'New York, NY' },
      { a: 'Abbott Laboratories', hint: 'North Chicago, IL', alias: ['abbott','abbott labs'] },
      { a: 'CVS Health', hint: 'Woonsocket, RI', alias: ['cvs','cvs pharmacy'] }
    ]},
    { name: 'Everything Else', items: [
      { a: 'IBM', hint: 'Armonk, NY', sub: 'Tech', alias: ['international business machines','big blue'] },
      { a: 'Motorola Solutions', hint: 'Chicago, IL', sub: 'Tech', alias: ['motorola'] },
      { a: 'Ford', hint: 'Dearborn, MI', sub: 'Autos', alias: ['ford motor','ford motor company'] },
      { a: 'The Hartford', hint: 'Hartford, CT', sub: 'Finance', alias: ['hartford','hartford financial'] },
      { a: 'International Paper', hint: 'Memphis, TN', sub: 'Materials', alias: ['ip'] },
      { a: 'S&P Global', hint: 'New York, NY', sub: 'Finance', alias: ['s&p','sp global','s and p global','standard and poors','standard & poors','mcgraw hill'] },
      { a: 'PPG Industries', hint: 'Pittsburgh, PA', sub: 'Materials', alias: ['ppg','pittsburgh plate glass'] }
    ]}
  ]
},

{
  slug: 'nfl-top3-wr-2010',
  title: 'NFL Top 3 WRs: 2010',
  sub: "Every team's top three receivers",
  blurb: 'Can you name the top 3 wide receivers for each 2010 NFL team? Their jersey numbers are your clue.',
  // Steven's list (2026-11-17), from a Sporcle-style sheet; team names as they were in 2010
  // (Redskins, Rams in St. Louis, Chargers in San Diego). Two Steve Smiths and two Mike Williamses:
  // one name fills both. Common surnames (Johnson x4, Williams x4) sweep several rows by design.
  category: 'Sports',
  tags: ['NFL', 'Football', 'Throwback'],
  mode: 'timed',
  time: 720,
  cols: 'four',
  groups: [
    { name: 'Bills', items: [
      { a: 'Lee Evans', rk: '1', hint: '#83' },
      { a: 'Steve Johnson', rk: '2', hint: '#13', alias: ['stevie johnson'] },
      { a: 'David Nelson', rk: '3', hint: '#86' }
    ]},
    { name: 'Dolphins', items: [
      { a: 'Brandon Marshall', rk: '1', hint: '#19' },
      { a: 'Davone Bess', rk: '2', hint: '#15' },
      { a: 'Brian Hartline', rk: '3', hint: '#82' }
    ]},
    { name: 'Patriots', items: [
      { a: 'Wes Welker', rk: '1', hint: '#83' },
      { a: 'Deion Branch', rk: '2', hint: '#84' },
      { a: 'Brandon Tate', rk: '3', hint: '#19' }
    ]},
    { name: 'Jets', items: [
      { a: 'Braylon Edwards', rk: '1', hint: '#17' },
      { a: 'Santonio Holmes', rk: '2', hint: '#10' },
      { a: 'Jerricho Cotchery', rk: '3', hint: '#89', alias: ['jericho cotchery'] }
    ]},
    { name: 'Ravens', items: [
      { a: 'Anquan Boldin', rk: '1', hint: '#81' },
      { a: 'T.J. Houshmandzadeh', rk: '2', hint: '#84', alias: ['tj houshmandzadeh','housh','houshmandzadeh'] },
      { a: 'Derrick Mason', rk: '3', hint: '#85' }
    ]},
    { name: 'Bengals', items: [
      { a: 'Terrell Owens', rk: '1', hint: '#81', alias: ['to','t.o.'] },
      { a: 'Chad Ochocinco', rk: '2', hint: '#85', alias: ['ochocinco','ocho','chad johnson','ocho cinco','chad ocho cinco'] },
      { a: 'Jordan Shipley', rk: '3', hint: '#11' }
    ]},
    { name: 'Browns', items: [
      { a: 'Mohamed Massaquoi', rk: '1', hint: '#11' },
      { a: 'Joshua Cribbs', rk: '2', hint: '#16', alias: ['josh cribbs'] },
      { a: 'Chansi Stuckey', rk: '3', hint: '#83' }
    ]},
    { name: 'Steelers', items: [
      { a: 'Hines Ward', rk: '1', hint: '#86' },
      { a: 'Mike Wallace', rk: '2', hint: '#17' },
      { a: 'Antwaan Randle El', rk: '3', hint: '#82', alias: ['randle el','antwaan randle-el'] }
    ]},
    { name: 'Texans', items: [
      { a: 'Andre Johnson', rk: '1', hint: '#80', alias: ['dre'] },
      { a: 'Kevin Walter', rk: '2', hint: '#83' },
      { a: 'Jacoby Jones', rk: '3', hint: '#12' }
    ]},
    { name: 'Colts', items: [
      { a: 'Reggie Wayne', rk: '1', hint: '#87' },
      { a: 'Austin Collie', rk: '2', hint: '#17' },
      { a: 'Pierre Garçon', rk: '3', hint: '#85', alias: ['pierre garcon','garcon'] }
    ]},
    { name: 'Jaguars', items: [
      { a: 'Mike Sims-Walker', rk: '1', hint: '#11', alias: ['sims walker','simswalker'] },
      { a: 'Mike Thomas', rk: '2', hint: '#80' },
      { a: 'Tiquan Underwood', rk: '3', hint: '#19' }
    ]},
    { name: 'Titans', items: [
      { a: 'Randy Moss', rk: '1', hint: '#84' },
      { a: 'Kenny Britt', rk: '2', hint: '#18' },
      { a: 'Nate Washington', rk: '3', hint: '#85' }
    ]},
    { name: 'Broncos', items: [
      { a: 'Brandon Lloyd', rk: '1', hint: '#84' },
      { a: 'Eddie Royal', rk: '2', hint: '#19' },
      { a: 'Jabar Gaffney', rk: '3', hint: '#10' }
    ]},
    { name: 'Chiefs', items: [
      { a: 'Dwayne Bowe', rk: '1', hint: '#82' },
      { a: 'Verran Tucker', rk: '2', hint: '#15' },
      { a: 'Dexter McCluster', rk: '3', hint: '#22' }
    ]},
    { name: 'Raiders', items: [
      { a: 'Darrius Heyward-Bey', rk: '1', hint: '#85', alias: ['dhb','heyward bey','heywardbey'] },
      { a: 'Louis Murphy', rk: '2', hint: '#18' },
      { a: 'Chaz Schilens', rk: '3', hint: '#81' }
    ]},
    { name: 'Chargers', items: [
      { a: 'Vincent Jackson', rk: '1', hint: '#83' },
      { a: 'Malcolm Floyd', rk: '2', hint: '#80' },
      { a: 'Patrick Crayton', rk: '3', hint: '#12' }
    ]},
    { name: 'Cowboys', items: [
      { a: 'Miles Austin', rk: '1', hint: '#19' },
      { a: 'Roy Williams', rk: '2', hint: '#11' },
      { a: 'Dez Bryant', rk: '3', hint: '#88', alias: ['dez'] }
    ]},
    { name: 'Giants', items: [
      { a: 'Hakeem Nicks', rk: '1', hint: '#88' },
      { a: 'Steve Smith', rk: '2', hint: '#12' },
      { a: 'Mario Manningham', rk: '3', hint: '#82', alias: ['manningham'] }
    ]},
    { name: 'Eagles', items: [
      { a: 'DeSean Jackson', rk: '1', hint: '#10', alias: ['desean','djax'] },
      { a: 'Jeremy Maclin', rk: '2', hint: '#18' },
      { a: 'Jason Avant', rk: '3', hint: '#81' }
    ]},
    { name: 'Redskins', items: [
      { a: 'Santana Moss', rk: '1', hint: '#89' },
      { a: 'Anthony Armstrong', rk: '2', hint: '#13' },
      { a: 'Roydell Williams', rk: '3', hint: '#87' }
    ]},
    { name: 'Bears', items: [
      { a: 'Devin Hester', rk: '1', hint: '#23', alias: ['windy city flyer'] },
      { a: 'Johnny Knox', rk: '2', hint: '#13' },
      { a: 'Earl Bennett', rk: '3', hint: '#80' }
    ]},
    { name: 'Lions', items: [
      { a: 'Calvin Johnson', rk: '1', hint: '#81', alias: ['megatron'] },
      { a: 'Nate Burleson', rk: '2', hint: '#13' },
      { a: 'Bryant Johnson', rk: '3', hint: '#80' }
    ]},
    { name: 'Packers', items: [
      { a: 'Greg Jennings', rk: '1', hint: '#85' },
      { a: 'Donald Driver', rk: '2', hint: '#80' },
      { a: 'James Jones', rk: '3', hint: '#89' }
    ]},
    { name: 'Vikings', items: [
      { a: 'Sidney Rice', rk: '1', hint: '#18' },
      { a: 'Percy Harvin', rk: '2', hint: '#12' },
      { a: 'Bernard Berrian', rk: '3', hint: '#87' }
    ]},
    { name: 'Falcons', items: [
      { a: 'Roddy White', rk: '1', hint: '#84' },
      { a: 'Michael Jenkins', rk: '2', hint: '#12' },
      { a: 'Harry Douglas', rk: '3', hint: '#83' }
    ]},
    { name: 'Panthers', items: [
      { a: 'Steve Smith', rk: '1', hint: '#89' },
      { a: 'David Gettis', rk: '2', hint: '#12' },
      { a: 'Brandon LaFell', rk: '3', hint: '#11', alias: ['lafell','brandon lafelle'] }
    ]},
    { name: 'Saints', items: [
      { a: 'Marques Colston', rk: '1', hint: '#12' },
      { a: 'Robert Meachem', rk: '2', hint: '#17' },
      { a: 'Lance Moore', rk: '3', hint: '#16' }
    ]},
    { name: 'Buccaneers', items: [
      { a: 'Mike Williams', rk: '1', hint: '#19' },
      { a: 'Arrelious Benn', rk: '2', hint: '#17' },
      { a: 'Sammie Stroughter', rk: '3', hint: '#18' }
    ]},
    { name: '49ers', items: [
      { a: 'Michael Crabtree', rk: '1', hint: '#15', alias: ['crabs'] },
      { a: 'Josh Morgan', rk: '2', hint: '#84' },
      { a: 'Ted Ginn Jr.', rk: '3', hint: '#19', alias: ['ted ginn'] }
    ]},
    { name: 'Seahawks', items: [
      { a: 'Mike Williams', rk: '1', hint: '#17' },
      { a: 'Deon Butler', rk: '2', hint: '#11' },
      { a: 'Ben Obomanu', rk: '3', hint: '#87', alias: ['benjamin obomanu','obomanu'] }
    ]},
    { name: 'Cardinals', items: [
      { a: 'Larry Fitzgerald', rk: '1', hint: '#11', alias: ['fitz'] },
      { a: 'Steve Breaston', rk: '2', hint: '#15' },
      { a: 'Early Doucet', rk: '3', hint: '#80' }
    ]},
    { name: 'Rams', items: [
      { a: 'Danny Amendola', rk: '1', hint: '#16' },
      { a: 'Brandon Gibson', rk: '2', hint: '#11' },
      { a: 'Laurent Robinson', rk: '3', hint: '#19' }
    ]}
  ]
},

{
  slug: 'nfl-first-overall-picks',
  title: 'No. 1 Overall NFL Draft Picks',
  sub: 'Every top pick since 1990',
  blurb: 'Every first overall pick in the NFL draft from 1990 through 2026. The year, position and drafting team are your clues.',
  // Wikipedia "List of first overall NFL draft picks", pulled 2026-11-17 (through the 2026 draft).
  category: 'Sports',
  tags: ['NFL', 'Football', 'Draft'],
  mode: 'timed',
  time: 360,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Joe Burrow', rk: '2020', sub: 'QB', hint: 'Cincinnati Bengals', alias: ['joey b','joe brrr'] },
      { a: 'Trevor Lawrence', rk: '2021', sub: 'QB', hint: 'Jacksonville Jaguars', alias: ['t law'] },
      { a: 'Travon Walker', rk: '2022', sub: 'DE', hint: 'Jacksonville Jaguars' },
      { a: 'Bryce Young', rk: '2023', sub: 'QB', hint: 'Carolina Panthers' },
      { a: 'Caleb Williams', rk: '2024', sub: 'QB', hint: 'Chicago Bears' },
      { a: 'Cam Ward', rk: '2025', sub: 'QB', hint: 'Tennessee Titans' },
      { a: 'Fernando Mendoza', rk: '2026', sub: 'QB', hint: 'Las Vegas Raiders', alias: ['mendoza'] }
    ]},
    { name: '2010s', items: [
      { a: 'Sam Bradford', rk: '2010', sub: 'QB', hint: 'St. Louis Rams' },
      { a: 'Cam Newton', rk: '2011', sub: 'QB', hint: 'Carolina Panthers', alias: ['superman'] },
      { a: 'Andrew Luck', rk: '2012', sub: 'QB', hint: 'Indianapolis Colts' },
      { a: 'Eric Fisher', rk: '2013', sub: 'T', hint: 'Kansas City Chiefs' },
      { a: 'Jadeveon Clowney', rk: '2014', sub: 'DE', hint: 'Houston Texans', alias: ['clowney'] },
      { a: 'Jameis Winston', rk: '2015', sub: 'QB', hint: 'Tampa Bay Buccaneers' },
      { a: 'Jared Goff', rk: '2016', sub: 'QB', hint: 'Los Angeles Rams' },
      { a: 'Myles Garrett', rk: '2017', sub: 'DE', hint: 'Cleveland Browns' },
      { a: 'Baker Mayfield', rk: '2018', sub: 'QB', hint: 'Cleveland Browns' },
      { a: 'Kyler Murray', rk: '2019', sub: 'QB', hint: 'Arizona Cardinals' }
    ]},
    { name: '2000s', items: [
      { a: 'Courtney Brown', rk: '2000', sub: 'DE', hint: 'Cleveland Browns' },
      { a: 'Michael Vick', rk: '2001', sub: 'QB', hint: 'Atlanta Falcons', alias: ['mike vick'] },
      { a: 'David Carr', rk: '2002', sub: 'QB', hint: 'Houston Texans' },
      { a: 'Carson Palmer', rk: '2003', sub: 'QB', hint: 'Cincinnati Bengals' },
      { a: 'Eli Manning', rk: '2004', sub: 'QB', hint: 'SD Chargers' },
      { a: 'Alex Smith', rk: '2005', sub: 'QB', hint: 'San Francisco 49ers' },
      { a: 'Mario Williams', rk: '2006', sub: 'DE', hint: 'Houston Texans' },
      { a: 'JaMarcus Russell', rk: '2007', sub: 'QB', hint: 'Oakland Raiders', alias: ['jamarcus'] },
      { a: 'Jake Long', rk: '2008', sub: 'T', hint: 'Miami Dolphins' },
      { a: 'Matthew Stafford', rk: '2009', sub: 'QB', hint: 'Detroit Lions', alias: ['matt stafford'] }
    ]},
    { name: '1990s', items: [
      { a: 'Jeff George', rk: '1990', sub: 'QB', hint: 'Indianapolis Colts' },
      { a: 'Russell Maryland', rk: '1991', sub: 'DT', hint: 'Dallas Cowboys' },
      { a: 'Steve Emtman', rk: '1992', sub: 'DE', hint: 'Indianapolis Colts' },
      { a: 'Drew Bledsoe', rk: '1993', sub: 'QB', hint: 'New England Patriots' },
      { a: 'Dan Wilkinson', rk: '1994', sub: 'DT', hint: 'Cincinnati Bengals', alias: ['big daddy wilkinson','big daddy'] },
      { a: 'Ki-Jana Carter', rk: '1995', sub: 'HB', hint: 'Cincinnati Bengals', alias: ['kijana carter'] },
      { a: 'Keyshawn Johnson', rk: '1996', sub: 'WR', hint: 'New York Jets', alias: ['meyshawn'] },
      { a: 'Orlando Pace', rk: '1997', sub: 'T', hint: 'St. Louis Rams' },
      { a: 'Peyton Manning', rk: '1998', sub: 'QB', hint: 'Indianapolis Colts', alias: ['the sheriff'] },
      { a: 'Tim Couch', rk: '1999', sub: 'QB', hint: 'Cleveland Browns' }
    ]}
  ]
},

{
  slug: 'heisman-winners',
  title: 'Heisman Trophy Winners',
  sub: 'Every winner since 1980',
  blurb: 'Every Heisman Trophy winner from 1980 through 2025. The year, position and school are your clues.',
  // Wikipedia "List of Heisman Trophy winners", pulled 2026-11-17. 2005 Reggie Bush is listed (his trophy was reinstated in 2024).
  category: 'Sports',
  tags: ['NCAA', 'Football', 'Awards'],
  mode: 'timed',
  time: 480,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'DeVonta Smith', rk: '2020', sub: 'WR', hint: 'Alabama', alias: ['the slim reaper'] },
      { a: 'Bryce Young', rk: '2021', sub: 'QB', hint: 'Alabama' },
      { a: 'Caleb Williams', rk: '2022', sub: 'QB', hint: 'USC' },
      { a: 'Jayden Daniels', rk: '2023', sub: 'QB', hint: 'LSU' },
      { a: 'Travis Hunter', rk: '2024', sub: 'CB/WR', hint: 'Colorado' },
      { a: 'Fernando Mendoza', rk: '2025', sub: 'QB', hint: 'Indiana', alias: ['mendoza'] }
    ]},
    { name: '2010s', items: [
      { a: 'Cam Newton', rk: '2010', sub: 'QB', hint: 'Auburn' },
      { a: 'Robert Griffin III', rk: '2011', sub: 'QB', hint: 'Baylor', alias: ['rg3','rgiii','rg 3','robert griffin'] },
      { a: 'Johnny Manziel', rk: '2012', sub: 'QB', hint: 'Texas A&M', alias: ['johnny football'] },
      { a: 'Jameis Winston', rk: '2013', sub: 'QB', hint: 'Florida State' },
      { a: 'Marcus Mariota', rk: '2014', sub: 'QB', hint: 'Oregon' },
      { a: 'Derrick Henry', rk: '2015', sub: 'RB', hint: 'Alabama' },
      { a: 'Lamar Jackson', rk: '2016', sub: 'QB', hint: 'Louisville', alias: ['lamar'] },
      { a: 'Baker Mayfield', rk: '2017', sub: 'QB', hint: 'Oklahoma' },
      { a: 'Kyler Murray', rk: '2018', sub: 'QB', hint: 'Oklahoma' },
      { a: 'Joe Burrow', rk: '2019', sub: 'QB', hint: 'LSU', alias: ['joey b'] }
    ]},
    { name: '2000s', items: [
      { a: 'Chris Weinke', rk: '2000', sub: 'QB', hint: 'Florida State' },
      { a: 'Eric Crouch', rk: '2001', sub: 'QB', hint: 'Nebraska' },
      { a: 'Carson Palmer', rk: '2002', sub: 'QB', hint: 'USC' },
      { a: 'Jason White', rk: '2003', sub: 'QB', hint: 'Oklahoma' },
      { a: 'Matt Leinart', rk: '2004', sub: 'QB', hint: 'USC' },
      { a: 'Reggie Bush', rk: '2005', sub: 'RB', hint: 'USC' },
      { a: 'Troy Smith', rk: '2006', sub: 'QB', hint: 'Ohio State' },
      { a: 'Tim Tebow', rk: '2007', sub: 'QB', hint: 'Florida' },
      { a: 'Sam Bradford', rk: '2008', sub: 'QB', hint: 'Oklahoma' },
      { a: 'Mark Ingram II', rk: '2009', sub: 'RB', hint: 'Alabama', alias: ['mark ingram'] }
    ]},
    { name: '1990s', items: [
      { a: 'Ty Detmer', rk: '1990', sub: 'QB', hint: 'BYU' },
      { a: 'Desmond Howard', rk: '1991', sub: 'WR/PR', hint: 'Michigan', alias: ['magic man'] },
      { a: 'Gino Torretta', rk: '1992', sub: 'QB', hint: 'Miami (FL)' },
      { a: 'Charlie Ward', rk: '1993', sub: 'QB', hint: 'Florida State' },
      { a: 'Rashaan Salaam', rk: '1994', sub: 'RB', hint: 'Colorado' },
      { a: 'Eddie George', rk: '1995', sub: 'RB', hint: 'Ohio State' },
      { a: 'Danny Wuerffel', rk: '1996', sub: 'QB', hint: 'Florida' },
      { a: 'Charles Woodson', rk: '1997', sub: 'CB', hint: 'Michigan' },
      { a: 'Ricky Williams', rk: '1998', sub: 'RB', hint: 'Texas' },
      { a: 'Ron Dayne', rk: '1999', sub: 'RB', hint: 'Wisconsin' }
    ]},
    { name: '1980s', items: [
      { a: 'George Rogers', rk: '1980', sub: 'RB', hint: 'South Carolina' },
      { a: 'Marcus Allen', rk: '1981', sub: 'RB', hint: 'USC' },
      { a: 'Herschel Walker', rk: '1982', sub: 'RB', hint: 'Georgia' },
      { a: 'Mike Rozier', rk: '1983', sub: 'RB', hint: 'Nebraska' },
      { a: 'Doug Flutie', rk: '1984', sub: 'QB', hint: 'Boston College' },
      { a: 'Bo Jackson', rk: '1985', sub: 'RB', hint: 'Auburn', alias: ['bo knows'] },
      { a: 'Vinny Testaverde', rk: '1986', sub: 'QB', hint: 'Miami (FL)', alias: ['testaverde'] },
      { a: 'Tim Brown', rk: '1987', sub: 'WR', hint: 'Notre Dame' },
      { a: 'Barry Sanders', rk: '1988', sub: 'RB', hint: 'Oklahoma State' },
      { a: 'Andre Ware', rk: '1989', sub: 'QB', hint: 'Houston' }
    ]}
  ]
},

{
  slug: 'world-series-champions',
  title: 'World Series Champions',
  sub: 'Every champion since 1980',
  blurb: 'Every World Series champion from 1980 through 2026 (there was no Series in 1994). The year, the team they beat and the series score are your clues. A team fills every year it won.',
  // Wikipedia "List of World Series champions", pulled 2026-11-17 (2026: Brewers over Rays). Teams use the name they won under.
  category: 'Sports',
  tags: ['MLB', 'Baseball', 'Champions'],
  match: 'full',
  mode: 'timed',
  time: 360,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Los Angeles Dodgers', rk: '2020', hint: 'beat Rays, 4–2', alias: ['dodgers','la dodgers'] },
      { a: 'Atlanta Braves', rk: '2021', hint: 'beat Astros, 4–2', alias: ['braves','atlanta'] },
      { a: 'Houston Astros', rk: '2022', hint: 'beat Phillies, 4–2', alias: ['astros','houston','stros'] },
      { a: 'Texas Rangers', rk: '2023', hint: 'beat Diamondbacks, 4–1', alias: ['rangers','texas'] },
      { a: 'Los Angeles Dodgers', rk: '2024', hint: 'beat Yankees, 4–1', alias: ['dodgers','la dodgers'] },
      { a: 'Los Angeles Dodgers', rk: '2025', hint: 'beat Blue Jays, 4–3', alias: ['dodgers','la dodgers'] },
      { a: 'Milwaukee Brewers', rk: '2026', hint: 'beat Rays, 4–1', alias: ['brewers','milwaukee','brew crew'] }
    ]},
    { name: '2010s', items: [
      { a: 'San Francisco Giants', rk: '2010', hint: 'beat Rangers, 4–1', alias: ['giants','san francisco','sf giants'] },
      { a: 'St. Louis Cardinals', rk: '2011', hint: 'beat Rangers, 4–3', alias: ['cardinals','st louis','cards'] },
      { a: 'San Francisco Giants', rk: '2012', hint: 'beat Tigers, 4–0', alias: ['giants','san francisco','sf giants'] },
      { a: 'Boston Red Sox', rk: '2013', hint: 'beat Cardinals, 4–2', alias: ['red sox','boston'] },
      { a: 'San Francisco Giants', rk: '2014', hint: 'beat Royals, 4–3', alias: ['giants','san francisco','sf giants'] },
      { a: 'Kansas City Royals', rk: '2015', hint: 'beat Mets, 4–1', alias: ['royals','kansas city','kc royals'] },
      { a: 'Chicago Cubs', rk: '2016', hint: 'beat Indians, 4–3', alias: ['cubs'] },
      { a: 'Houston Astros', rk: '2017', hint: 'beat Dodgers, 4–3', alias: ['astros','houston','stros'] },
      { a: 'Boston Red Sox', rk: '2018', hint: 'beat Dodgers, 4–1', alias: ['red sox','boston'] },
      { a: 'Washington Nationals', rk: '2019', hint: 'beat Astros, 4–3', alias: ['nationals','washington','nats'] }
    ]},
    { name: '2000s', items: [
      { a: 'New York Yankees', rk: '2000', hint: 'beat Mets, 4–1', alias: ['yankees','yanks'] },
      { a: 'Arizona Diamondbacks', rk: '2001', hint: 'beat Yankees, 4–3', alias: ['diamondbacks','arizona','dbacks','d backs'] },
      { a: 'Anaheim Angels', rk: '2002', hint: 'beat Giants, 4–3', alias: ['angels','anaheim','la angels','los angeles angels'] },
      { a: 'Florida Marlins', rk: '2003', hint: 'beat Yankees, 4–2', alias: ['marlins','florida','miami marlins'] },
      { a: 'Boston Red Sox', rk: '2004', hint: 'beat Cardinals, 4–0', alias: ['red sox','boston'] },
      { a: 'Chicago White Sox', rk: '2005', hint: 'beat Astros, 4–0', alias: ['white sox'] },
      { a: 'St. Louis Cardinals', rk: '2006', hint: 'beat Tigers, 4–1', alias: ['cardinals','st louis','cards'] },
      { a: 'Boston Red Sox', rk: '2007', hint: 'beat Rockies, 4–0', alias: ['red sox','boston'] },
      { a: 'Philadelphia Phillies', rk: '2008', hint: 'beat Rays, 4–1', alias: ['phillies','philadelphia','phils'] },
      { a: 'New York Yankees', rk: '2009', hint: 'beat Phillies, 4–2', alias: ['yankees','yanks'] }
    ]},
    { name: '1990s', items: [
      { a: 'Cincinnati Reds', rk: '1990', hint: 'beat Athletics, 4–0', alias: ['reds','cincinnati'] },
      { a: 'Minnesota Twins', rk: '1991', hint: 'beat Braves, 4–3', alias: ['twins','minnesota'] },
      { a: 'Toronto Blue Jays', rk: '1992', hint: 'beat Braves, 4–2', alias: ['blue jays','toronto','jays'] },
      { a: 'Toronto Blue Jays', rk: '1993', hint: 'beat Phillies, 4–2', alias: ['blue jays','toronto','jays'] },
      { a: 'Atlanta Braves', rk: '1995', hint: 'beat Indians, 4–2', alias: ['braves','atlanta'] },
      { a: 'New York Yankees', rk: '1996', hint: 'beat Braves, 4–2', alias: ['yankees','yanks'] },
      { a: 'Florida Marlins', rk: '1997', hint: 'beat Indians, 4–3', alias: ['marlins','florida','miami marlins'] },
      { a: 'New York Yankees', rk: '1998', hint: 'beat Padres, 4–0', alias: ['yankees','yanks'] },
      { a: 'New York Yankees', rk: '1999', hint: 'beat Braves, 4–0', alias: ['yankees','yanks'] }
    ]},
    { name: '1980s', items: [
      { a: 'Philadelphia Phillies', rk: '1980', hint: 'beat Royals, 4–2', alias: ['phillies','philadelphia','phils'] },
      { a: 'Los Angeles Dodgers', rk: '1981', hint: 'beat Yankees, 4–2', alias: ['dodgers','la dodgers'] },
      { a: 'St. Louis Cardinals', rk: '1982', hint: 'beat Brewers, 4–3', alias: ['cardinals','st louis','cards'] },
      { a: 'Baltimore Orioles', rk: '1983', hint: 'beat Phillies, 4–1', alias: ['orioles','baltimore','os'] },
      { a: 'Detroit Tigers', rk: '1984', hint: 'beat Padres, 4–1', alias: ['tigers','detroit'] },
      { a: 'Kansas City Royals', rk: '1985', hint: 'beat Cardinals, 4–3', alias: ['royals','kansas city','kc royals'] },
      { a: 'New York Mets', rk: '1986', hint: 'beat Red Sox, 4–3', alias: ['mets'] },
      { a: 'Minnesota Twins', rk: '1987', hint: 'beat Cardinals, 4–3', alias: ['twins','minnesota'] },
      { a: 'Los Angeles Dodgers', rk: '1988', hint: 'beat Athletics, 4–1', alias: ['dodgers','la dodgers'] },
      { a: 'Oakland Athletics', rk: '1989', hint: 'beat Giants, 4–0', alias: ['athletics','oakland','as','a\'s','oakland as'] }
    ]}
  ]
},

{
  slug: 'masters-champions',
  title: 'Masters Champions',
  sub: 'Every green jacket since 1980',
  blurb: 'Every Masters champion from 1980 through 2026. The year, country and winning score are your clues. A name fills every year he won.',
  // Wikipedia "List of Masters Tournament champions", pulled 2026-11-17 (2026: Rory McIlroy, back to back). Countries added by hand (the table uses flags).
  category: 'Sports',
  tags: ['Golf', 'Champions'],
  mode: 'timed',
  time: 360,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Dustin Johnson', rk: '2020', sub: 'USA', hint: '−20', alias: ['dj'] },
      { a: 'Hideki Matsuyama', rk: '2021', sub: 'JPN', hint: '−10', alias: ['hideki'] },
      { a: 'Scottie Scheffler', rk: '2022', sub: 'USA', hint: '−10', alias: ['scottie'] },
      { a: 'Jon Rahm', rk: '2023', sub: 'ESP', hint: '−12', alias: ['rahmbo'] },
      { a: 'Scottie Scheffler', rk: '2024', sub: 'USA', hint: '−11', alias: ['scottie'] },
      { a: 'Rory McIlroy', rk: '2025', sub: 'NIR', hint: '−11', alias: ['rory'] },
      { a: 'Rory McIlroy', rk: '2026', sub: 'NIR', hint: '−12', alias: ['rory'] }
    ]},
    { name: '2010s', items: [
      { a: 'Phil Mickelson', rk: '2010', sub: 'USA', hint: '−16', alias: ['lefty'] },
      { a: 'Charl Schwartzel', rk: '2011', sub: 'RSA', hint: '−14' },
      { a: 'Bubba Watson', rk: '2012', sub: 'USA', hint: '−10', alias: ['bubba'] },
      { a: 'Adam Scott', rk: '2013', sub: 'AUS', hint: '−9' },
      { a: 'Bubba Watson', rk: '2014', sub: 'USA', hint: '−8', alias: ['bubba'] },
      { a: 'Jordan Spieth', rk: '2015', sub: 'USA', hint: '−18' },
      { a: 'Danny Willett', rk: '2016', sub: 'ENG', hint: '−5' },
      { a: 'Sergio García', rk: '2017', sub: 'ESP', hint: '−9', alias: ['sergio','el nino','sergio garcia'] },
      { a: 'Patrick Reed', rk: '2018', sub: 'USA', hint: '−15' },
      { a: 'Tiger Woods', rk: '2019', sub: 'USA', hint: '−13', alias: ['tiger'] }
    ]},
    { name: '2000s', items: [
      { a: 'Vijay Singh', rk: '2000', sub: 'FIJ', hint: '−10', alias: ['vijay'] },
      { a: 'Tiger Woods', rk: '2001', sub: 'USA', hint: '−16', alias: ['tiger'] },
      { a: 'Tiger Woods', rk: '2002', sub: 'USA', hint: '−12', alias: ['tiger'] },
      { a: 'Mike Weir', rk: '2003', sub: 'CAN', hint: '−7' },
      { a: 'Phil Mickelson', rk: '2004', sub: 'USA', hint: '−9', alias: ['lefty'] },
      { a: 'Tiger Woods', rk: '2005', sub: 'USA', hint: '−12', alias: ['tiger'] },
      { a: 'Phil Mickelson', rk: '2006', sub: 'USA', hint: '−7', alias: ['lefty'] },
      { a: 'Zach Johnson', rk: '2007', sub: 'USA', hint: '+1' },
      { a: 'Trevor Immelman', rk: '2008', sub: 'RSA', hint: '−8' },
      { a: 'Ángel Cabrera', rk: '2009', sub: 'ARG', hint: '−12', alias: ['angel cabrera'] }
    ]},
    { name: '1990s', items: [
      { a: 'Nick Faldo', rk: '1990', sub: 'ENG', hint: '−10', alias: ['sir nick'] },
      { a: 'Ian Woosnam', rk: '1991', sub: 'WAL', hint: '−11' },
      { a: 'Fred Couples', rk: '1992', sub: 'USA', hint: '−13', alias: ['boom boom'] },
      { a: 'Bernhard Langer', rk: '1993', sub: 'GER', hint: '−11' },
      { a: 'José María Olazábal', rk: '1994', sub: 'ESP', hint: '−9', alias: ['olazabal','chema','jose maria olazabal'] },
      { a: 'Ben Crenshaw', rk: '1995', sub: 'USA', hint: '−14', alias: ['gentle ben'] },
      { a: 'Nick Faldo', rk: '1996', sub: 'ENG', hint: '−12', alias: ['sir nick'] },
      { a: 'Tiger Woods', rk: '1997', sub: 'USA', hint: '−18', alias: ['tiger'] },
      { a: 'Mark O\'Meara', rk: '1998', sub: 'USA', hint: '−9', alias: ['omeara'] },
      { a: 'José María Olazábal', rk: '1999', sub: 'ESP', hint: '−8', alias: ['olazabal','chema','jose maria olazabal'] }
    ]},
    { name: '1980s', items: [
      { a: 'Seve Ballesteros', rk: '1980', sub: 'ESP', hint: '−13', alias: ['seve'] },
      { a: 'Tom Watson', rk: '1981', sub: 'USA', hint: '−8' },
      { a: 'Craig Stadler', rk: '1982', sub: 'USA', hint: '−4' },
      { a: 'Seve Ballesteros', rk: '1983', sub: 'ESP', hint: '−8', alias: ['seve'] },
      { a: 'Ben Crenshaw', rk: '1984', sub: 'USA', hint: '−11', alias: ['gentle ben'] },
      { a: 'Bernhard Langer', rk: '1985', sub: 'GER', hint: '−6' },
      { a: 'Jack Nicklaus', rk: '1986', sub: 'USA', hint: '−9', alias: ['the golden bear','golden bear'] },
      { a: 'Larry Mize', rk: '1987', sub: 'USA', hint: '−3' },
      { a: 'Sandy Lyle', rk: '1988', sub: 'SCO', hint: '−7' },
      { a: 'Nick Faldo', rk: '1989', sub: 'ENG', hint: '−5', alias: ['sir nick'] }
    ]}
  ]
},

{
  slug: 'highest-grossing-movies',
  title: 'Highest-Grossing Movies',
  sub: 'The worldwide top 25 of all time',
  blurb: 'The 25 biggest movies ever at the worldwide box office, as of November 8, 2026. The release year and worldwide gross are your clues. Two 2026 releases are still in theaters and still climbing.',
  // Wikipedia "List of highest-grossing films" (Box Office Mojo with Wikipedia's corrections), "as of November 8, 2026".
  // Still in release when pulled: Spider-Man: Brand New Day (#3) and The Odyssey (#11). Re-pull later.
  category: 'Movies',
  tags: ['Box Office', 'All-Time'],
  match: 'full',
  mode: 'timed',
  time: 360,
  cols: 'two',
  groups: [
    { name: 'Top 10', items: [
      { a: 'Avengers: Endgame', rk: '1', sub: '2019', hint: '$2.94B', alias: ['endgame','avengers endgame'] },
      { a: 'Avatar', rk: '2', sub: '2009', hint: '$2.92B', alias: ['avatar 1'] },
      { a: 'Spider-Man: Brand New Day', rk: '3', sub: '2026', hint: '$2.52B', alias: ['brand new day','spider man brand new day','spiderman 4'] },
      { a: 'Avatar: The Way of Water', rk: '4', sub: '2022', hint: '$2.33B', alias: ['the way of water','way of water','avatar 2','avatar way of water'] },
      { a: 'Titanic', rk: '5', sub: '1997', hint: '$2.26B' },
      { a: 'Ne Zha 2', rk: '6', sub: '2025', hint: '$2.22B', alias: ['nezha 2','ne zha','nezha'] },
      { a: 'Star Wars: The Force Awakens', rk: '7', sub: '2015', hint: '$2.07B', alias: ['the force awakens','force awakens','star wars force awakens','star wars episode vii','episode vii','star wars 7'] },
      { a: 'Avengers: Infinity War', rk: '8', sub: '2018', hint: '$2.05B', alias: ['infinity war','avengers infinity war'] },
      { a: 'Spider-Man: No Way Home', rk: '9', sub: '2021', hint: '$1.92B', alias: ['no way home','spider man no way home'] },
      { a: 'Zootopia 2', rk: '10', sub: '2025', hint: '$1.87B', alias: ['zootopia two'] }
    ]},
    { name: '11 to 25', items: [
      { a: 'The Odyssey', rk: '11', sub: '2026', hint: '$1.80B' },
      { a: 'Inside Out 2', rk: '12', sub: '2024', hint: '$1.70B', alias: ['inside out two'] },
      { a: 'Jurassic World', rk: '13', sub: '2015', hint: '$1.67B' },
      { a: 'The Lion King', rk: '14', sub: '2019', hint: '$1.66B' },
      { a: 'The Avengers', rk: '15', sub: '2012', hint: '$1.52B', alias: ['avengers 1'] },
      { a: 'Furious 7', rk: '16', sub: '2015', hint: '$1.52B', alias: ['fast and furious 7','fast 7','furious seven','fast & furious 7'] },
      { a: 'Top Gun: Maverick', rk: '17', sub: '2022', hint: '$1.50B', alias: ['top gun maverick','maverick'] },
      { a: 'Avatar: Fire and Ash', rk: '18', sub: '2025', hint: '$1.49B', alias: ['fire and ash','avatar 3','avatar fire and ash'] },
      { a: 'Frozen 2', rk: '19', sub: '2019', hint: '$1.45B', alias: ['frozen ii','frozen two'] },
      { a: 'Barbie', rk: '20', sub: '2023', hint: '$1.45B' },
      { a: 'Avengers: Age of Ultron', rk: '21', sub: '2015', hint: '$1.40B', alias: ['age of ultron','avengers age of ultron'] },
      { a: 'The Super Mario Bros. Movie', rk: '22', sub: '2023', hint: '$1.36B', alias: ['super mario bros movie','super mario bros','super mario','mario movie','mario'] },
      { a: 'Black Panther', rk: '23', sub: '2018', hint: '$1.35B' },
      { a: 'Harry Potter and the Deathly Hallows – Part 2', rk: '24', sub: '2011', hint: '$1.34B', alias: ['deathly hallows part 2','deathly hallows 2','deathly hallows','harry potter deathly hallows part 2','harry potter and the deathly hallows part 2','harry potter 8'] },
      { a: 'Deadpool & Wolverine', rk: '25', sub: '2024', hint: '$1.34B', alias: ['deadpool and wolverine','deadpool wolverine','deadpool 3'] }
    ]}
  ]
},

{
  slug: 'best-picture-winners',
  title: 'Best Picture Winners',
  sub: 'Every Oscar winner since 1990',
  blurb: 'Every Academy Award for Best Picture from the films of 1990 through 2025. The film year and director are your clues.',
  // Wikipedia "Academy Award for Best Picture" (winner = the bold row), pulled 2026-11-17; 2025 confirmed on "98th Academy Awards".
  category: 'Movies',
  tags: ['Oscars', 'Awards'],
  match: 'full',
  mode: 'timed',
  time: 420,
  cols: 'multi',
  groups: [
    { name: '2020s', items: [
      { a: 'Nomadland', rk: '2020', hint: 'Chloé Zhao' },
      { a: 'CODA', rk: '2021', hint: 'Siân Heder' },
      { a: 'Everything Everywhere All at Once', rk: '2022', hint: 'Daniels', alias: ['everything everywhere','eeaao'] },
      { a: 'Oppenheimer', rk: '2023', hint: 'Christopher Nolan' },
      { a: 'Anora', rk: '2024', hint: 'Sean Baker' },
      { a: 'One Battle After Another', rk: '2025', hint: 'Paul Thomas Anderson', alias: ['one battle'] }
    ]},
    { name: '2010s', items: [
      { a: 'The King\'s Speech', rk: '2010', hint: 'Tom Hooper', alias: ['kings speech'] },
      { a: 'The Artist', rk: '2011', hint: 'Michel Hazanavicius' },
      { a: 'Argo', rk: '2012', hint: 'Ben Affleck' },
      { a: '12 Years a Slave', rk: '2013', hint: 'Steve McQueen', alias: ['twelve years a slave'] },
      { a: 'Birdman', rk: '2014', hint: 'Alejandro G. Iñárritu', alias: ['birdman or the unexpected virtue of ignorance'] },
      { a: 'Spotlight', rk: '2015', hint: 'Tom McCarthy' },
      { a: 'Moonlight', rk: '2016', hint: 'Barry Jenkins' },
      { a: 'The Shape of Water', rk: '2017', hint: 'Guillermo del Toro' },
      { a: 'Green Book', rk: '2018', hint: 'Peter Farrelly' },
      { a: 'Parasite', rk: '2019', hint: 'Bong Joon Ho' }
    ]},
    { name: '2000s', items: [
      { a: 'Gladiator', rk: '2000', hint: 'Ridley Scott' },
      { a: 'A Beautiful Mind', rk: '2001', hint: 'Ron Howard' },
      { a: 'Chicago', rk: '2002', hint: 'Rob Marshall' },
      { a: 'The Lord of the Rings: The Return of the King', rk: '2003', hint: 'Peter Jackson', alias: ['return of the king','lord of the rings return of the king','lotr return of the king','lotr','the lord of the rings','lord of the rings'] },
      { a: 'Million Dollar Baby', rk: '2004', hint: 'Clint Eastwood' },
      { a: 'Crash', rk: '2005', hint: 'Paul Haggis' },
      { a: 'The Departed', rk: '2006', hint: 'Martin Scorsese' },
      { a: 'No Country for Old Men', rk: '2007', hint: 'Joel & Ethan Coen', alias: ['no country'] },
      { a: 'Slumdog Millionaire', rk: '2008', hint: 'Danny Boyle', alias: ['slumdog'] },
      { a: 'The Hurt Locker', rk: '2009', hint: 'Kathryn Bigelow' }
    ]},
    { name: '1990s', items: [
      { a: 'Dances With Wolves', rk: '1990', hint: 'Kevin Costner', alias: ['dances with wolfs'] },
      { a: 'The Silence of the Lambs', rk: '1991', hint: 'Jonathan Demme' },
      { a: 'Unforgiven', rk: '1992', hint: 'Clint Eastwood' },
      { a: 'Schindler\'s List', rk: '1993', hint: 'Steven Spielberg', alias: ['schindlers list'] },
      { a: 'Forrest Gump', rk: '1994', hint: 'Robert Zemeckis' },
      { a: 'Braveheart', rk: '1995', hint: 'Mel Gibson' },
      { a: 'The English Patient', rk: '1996', hint: 'Anthony Minghella' },
      { a: 'Titanic', rk: '1997', hint: 'James Cameron' },
      { a: 'Shakespeare in Love', rk: '1998', hint: 'John Madden' },
      { a: 'American Beauty', rk: '1999', hint: 'Sam Mendes' }
    ]}
  ]
},

{
  slug: 'biggest-us-companies',
  title: 'Biggest US Companies Right Now',
  sub: 'The top 25 by market value',
  blurb: 'The 25 most valuable U.S. companies by stock market value on November 17, 2026. Their market value is your clue.',
  // companiesmarketcap.com/usa/largest-companies-in-the-usa-by-market-cap/, pulled 2026-11-17. This one goes stale fast: re-pull and change the date in the blurb.
  category: 'Business',
  tags: ['Companies', 'Stocks'],
  match: 'full',
  mode: 'timed',
  time: 300,
  cols: 'two',
  groups: [
    { name: 'Worth $1 trillion or more', items: [
      { a: 'Apple', rk: '1', hint: '$5.11T' },
      { a: 'Microsoft', rk: '2', hint: '$3.76T' },
      { a: 'Nvidia', rk: '3', hint: '$3.75T' },
      { a: 'Alphabet', rk: '4', hint: '$3.41T', alias: ['google','alphabet google'] },
      { a: 'Amazon', rk: '5', hint: '$2.79T' },
      { a: 'SpaceX', rk: '6', hint: '$1.92T', alias: ['space x'] },
      { a: 'Broadcom', rk: '7', hint: '$1.63T' },
      { a: 'Meta', rk: '8', hint: '$1.58T', alias: ['facebook','meta platforms'] },
      { a: 'Tesla', rk: '9', hint: '$1.50T' },
      { a: 'Eli Lilly', rk: '10', hint: '$1.26T', alias: ['lilly','eli lilly and company'] },
      { a: 'Berkshire Hathaway', rk: '11', hint: '$1.25T', alias: ['berkshire'] },
      { a: 'Walmart', rk: '12', hint: '$1.01T', alias: ['wal mart'] }
    ]},
    { name: 'Under $1 trillion', items: [
      { a: 'JPMorgan Chase', rk: '13', hint: '$876B', alias: ['jp morgan','jpmorgan','chase','jp morgan chase','jpm'] },
      { a: 'AMD', rk: '14', hint: '$833B', alias: ['advanced micro devices'] },
      { a: 'Micron', rk: '15', hint: '$806B', alias: ['micron technology'] },
      { a: 'Visa', rk: '16', hint: '$778B' },
      { a: 'ExxonMobil', rk: '17', hint: '$682B', alias: ['exxon','exxon mobil'] },
      { a: 'Johnson & Johnson', rk: '18', hint: '$671B', alias: ['j&j','jnj','johnson and johnson'] },
      { a: 'Mastercard', rk: '19', hint: '$563B', alias: ['master card'] },
      { a: 'AbbVie', rk: '20', hint: '$518B', alias: ['abbvie'] },
      { a: 'Costco', rk: '21', hint: '$492B', alias: ['costco wholesale'] },
      { a: 'Coca-Cola', rk: '22', hint: '$425B', alias: ['coke','coca cola','the coca cola company'] },
      { a: 'Chevron', rk: '23', hint: '$422B' },
      { a: 'Procter & Gamble', rk: '24', hint: '$398B', alias: ['p&g','procter and gamble','proctor and gamble','proctor & gamble'] },
      { a: 'Palantir', rk: '25', hint: '$377B' }
    ]}
  ]
},

{
  slug: 'best-selling-sodas',
  title: 'America\'s Best-Selling Sodas',
  sub: 'The top 10 soft drinks in the U.S.',
  blurb: 'The 10 best-selling soft drinks in America by volume, per Beverage Digest. The company that makes each one is your clue.',
  // Beverage Digest via AJC (Apr 2026) and others: 2025 top 5 = Coca-Cola 18.5%, Dr Pepper 8.8%, Pepsi, Diet Coke, Sprite.
  // 6-10 (Mountain Dew, Coke Zero, Diet Pepsi, Fanta, Canada Dry) are the last fully published order (2024), matching secondary 2025 lists.
  category: 'Food & Drink',
  tags: ['Drinks', 'Companies'],
  match: 'full',
  mode: 'timed',
  time: 120,
  cols: 'single',
  groups: [
    { name: 'Top 10', items: [
      { a: 'Coca-Cola', rk: '1', hint: 'The Coca-Cola Company', alias: ['coke','coca cola','coke classic','classic coke','coca cola classic','regular coke'] },
      { a: 'Dr Pepper', rk: '2', hint: 'Keurig Dr Pepper', alias: ['dr. pepper','doctor pepper','drpepper'] },
      { a: 'Pepsi', rk: '3', hint: 'PepsiCo', alias: ['pepsi cola'] },
      { a: 'Diet Coke', rk: '4', hint: 'The Coca-Cola Company', alias: ['diet coca cola','diet coca-cola'] },
      { a: 'Sprite', rk: '5', hint: 'The Coca-Cola Company' },
      { a: 'Mountain Dew', rk: '6', hint: 'PepsiCo', alias: ['mtn dew','dew','mt dew'] },
      { a: 'Coke Zero', rk: '7', hint: 'The Coca-Cola Company', alias: ['coke zero sugar','coca cola zero','coca-cola zero sugar','coca cola zero sugar'] },
      { a: 'Diet Pepsi', rk: '8', hint: 'PepsiCo' },
      { a: 'Fanta', rk: '9', hint: 'The Coca-Cola Company', alias: ['fanta orange'] },
      { a: 'Canada Dry', rk: '10', hint: 'Keurig Dr Pepper', alias: ['canada dry ginger ale'] }
    ]}
  ]
},

{
  slug: 'biggest-fast-food-chains',
  title: 'Biggest Fast-Food Chains',
  sub: 'The top 25 by U.S. sales',
  blurb: 'The 25 biggest fast-food chains in America by 2025 U.S. systemwide sales, from the 2026 QSR 50. The food type and sales are your clues.',
  // QSR Magazine "QSR 50 2026" (2025 U.S. systemwide sales; Starbucks, Chick-fil-A, Subway, Panera, Papa Johns are QSR estimates).
  category: 'Food & Drink',
  tags: ['Restaurants', 'Companies'],
  match: 'full',
  mode: 'timed',
  time: 300,
  cols: 'two',
  groups: [
    { name: 'Top 10', items: [
      { a: 'McDonald\'s', rk: '1', sub: 'Burgers', hint: '$55.1B', alias: ['mcdonalds','mickey ds','mcds','mickey d'] },
      { a: 'Starbucks', rk: '2', sub: 'Coffee', hint: '$30.2B', alias: ['starbies'] },
      { a: 'Chick-fil-A', rk: '3', sub: 'Chicken', hint: '$23.9B', alias: ['chick fil a','chickfila','cfa','chikfila'] },
      { a: 'Taco Bell', rk: '4', sub: 'Mexican', hint: '$17.2B' },
      { a: 'Dunkin\'', rk: '5', sub: 'Coffee', hint: '$13.1B', alias: ['dunkin','dunkin donuts'] },
      { a: 'Wendy\'s', rk: '6', sub: 'Burgers', hint: '$11.9B', alias: ['wendys'] },
      { a: 'Chipotle', rk: '7', sub: 'Mexican', hint: '$11.7B', alias: ['chipotle mexican grill'] },
      { a: 'Burger King', rk: '8', sub: 'Burgers', hint: '$11.1B', alias: ['bk'] },
      { a: 'Domino\'s', rk: '9', sub: 'Pizza', hint: '$10.0B', alias: ['dominos','dominos pizza'] },
      { a: 'Subway', rk: '10', sub: 'Sandwiches', hint: '$9.2B' }
    ]},
    { name: '11 to 25', items: [
      { a: 'Panda Express', rk: '11', sub: 'Chinese', hint: '$6.4B', alias: ['panda'] },
      { a: 'Panera', rk: '12', sub: 'Bakery-café', hint: '$5.9B', alias: ['panera bread'] },
      { a: 'Popeyes', rk: '13', sub: 'Chicken', hint: '$5.7B', alias: ['popeyes louisiana kitchen','popeye'] },
      { a: 'Raising Cane\'s', rk: '14', sub: 'Chicken', hint: '$5.5B', alias: ['canes','raising canes'] },
      { a: 'Wingstop', rk: '15', sub: 'Wings', hint: '$5.3B', alias: ['wing stop'] },
      { a: 'Sonic', rk: '16', sub: 'Burgers', hint: '$5.2B', alias: ['sonic drive in','sonic drive-in'] },
      { a: 'Pizza Hut', rk: '17', sub: 'Pizza', hint: '$5.1B' },
      { a: 'Dairy Queen', rk: '18', sub: 'Burgers', hint: '$5.0B', alias: ['dq'] },
      { a: 'KFC', rk: '19', sub: 'Chicken', hint: '$4.7B', alias: ['kentucky fried chicken'] },
      { a: 'Whataburger', rk: '20', sub: 'Burgers', hint: '$4.3B', alias: ['what a burger'] },
      { a: 'Arby\'s', rk: '21', sub: 'Sandwiches', hint: '$4.2B', alias: ['arbys'] },
      { a: 'Jersey Mike\'s', rk: '22', sub: 'Sandwiches', hint: '$4.2B', alias: ['jersey mikes','jersey mikes subs'] },
      { a: 'Jack in the Box', rk: '23', sub: 'Burgers', hint: '$4.2B', alias: ['jack in the box'] },
      { a: 'Culver\'s', rk: '24', sub: 'Burgers', hint: '$4.2B', alias: ['culvers'] },
      { a: 'Papa Johns', rk: '25', sub: 'Pizza', hint: '$3.7B', alias: ['papa john\'s','papa john'] }
    ]}
  ]
},

{
  slug: 'us-presidents',
  title: 'US Presidents',
  sub: 'All 47 presidencies, in order',
  blurb: 'Name every president from Washington to today. The years in office are your clue. Two men served twice, non-consecutively.',
  category: 'History',
  tags: ['Presidents', 'All-Time'],
  mode: 'timed',
  time: 600,
  cols: 'multi',
  groups: [
    { name: 'The founders and the frontier', note: '1789–1850', items: [
      { a: 'George Washington', rk: '1', hint: '1789–1797' },
      { a: 'John Adams', rk: '2', hint: '1797–1801' },
      { a: 'Thomas Jefferson', rk: '3', hint: '1801–1809' },
      { a: 'James Madison', rk: '4', hint: '1809–1817' },
      { a: 'James Monroe', rk: '5', hint: '1817–1825' },
      { a: 'John Quincy Adams', rk: '6', hint: '1825–1829', alias: ['jqa'] },
      { a: 'Andrew Jackson', rk: '7', hint: '1829–1837', alias: ['old hickory'] },
      { a: 'Martin Van Buren', rk: '8', hint: '1837–1841', alias: ['vanburen'] },
      { a: 'William Henry Harrison', rk: '9', hint: '1841', alias: ['tippecanoe'] },
      { a: 'John Tyler', rk: '10', hint: '1841–1845' },
      { a: 'James K. Polk', rk: '11', hint: '1845–1849', alias: ['james polk'] },
      { a: 'Zachary Taylor', rk: '12', hint: '1849–1850' }
    ]},
    { name: 'Civil War and the Gilded Age', note: '1850–1897', items: [
      { a: 'Millard Fillmore', rk: '13', hint: '1850–1853' },
      { a: 'Franklin Pierce', rk: '14', hint: '1853–1857' },
      { a: 'James Buchanan', rk: '15', hint: '1857–1861' },
      { a: 'Abraham Lincoln', rk: '16', hint: '1861–1865', alias: ['abe','abe lincoln','honest abe'] },
      { a: 'Andrew Johnson', rk: '17', hint: '1865–1869' },
      { a: 'Ulysses S. Grant', rk: '18', hint: '1869–1877', alias: ['ulysses grant'] },
      { a: 'Rutherford B. Hayes', rk: '19', hint: '1877–1881', alias: ['rutherford hayes'] },
      { a: 'James A. Garfield', rk: '20', hint: '1881', alias: ['james garfield'] },
      { a: 'Chester A. Arthur', rk: '21', hint: '1881–1885', alias: ['chester arthur'] },
      { a: 'Grover Cleveland', rk: '22', hint: '1885–1889' },
      { a: 'Benjamin Harrison', rk: '23', hint: '1889–1893' },
      { a: 'Grover Cleveland', rk: '24', hint: '1893–1897' }
    ]},
    { name: 'World wars and the American century', note: '1897–1969', items: [
      { a: 'William McKinley', rk: '25', hint: '1897–1901', alias: ['mckinly','mckinnley'] },
      { a: 'Theodore Roosevelt', rk: '26', hint: '1901–1909', alias: ['teddy','teddy roosevelt','tr'] },
      { a: 'William Howard Taft', rk: '27', hint: '1909–1913', alias: ['william taft'] },
      { a: 'Woodrow Wilson', rk: '28', hint: '1913–1921' },
      { a: 'Warren G. Harding', rk: '29', hint: '1921–1923', alias: ['warren harding'] },
      { a: 'Calvin Coolidge', rk: '30', hint: '1923–1929', alias: ['silent cal','cal coolidge'] },
      { a: 'Herbert Hoover', rk: '31', hint: '1929–1933' },
      { a: 'Franklin D. Roosevelt', rk: '32', hint: '1933–1945', alias: ['fdr','franklin roosevelt','franklin delano roosevelt'] },
      { a: 'Harry S. Truman', rk: '33', hint: '1945–1953', alias: ['harry truman'] },
      { a: 'Dwight D. Eisenhower', rk: '34', hint: '1953–1961', alias: ['ike','dwight eisenhower','eisenhour'] },
      { a: 'John F. Kennedy', rk: '35', hint: '1961–1963', alias: ['jfk','john kennedy'] },
      { a: 'Lyndon B. Johnson', rk: '36', hint: '1963–1969', alias: ['lbj','lyndon johnson'] }
    ]},
    { name: 'Modern era', note: '1969–now', items: [
      { a: 'Richard Nixon', rk: '37', hint: '1969–1974', alias: ['tricky dick'] },
      { a: 'Gerald Ford', rk: '38', hint: '1974–1977', alias: ['jerry ford'] },
      { a: 'Jimmy Carter', rk: '39', hint: '1977–1981', alias: ['james carter'] },
      { a: 'Ronald Reagan', rk: '40', hint: '1981–1989', alias: ['the gipper','reagen'] },
      { a: 'George H. W. Bush', rk: '41', hint: '1989–1993', alias: ['george hw bush','bush 41','bush sr','george bush sr','poppy bush'] },
      { a: 'Bill Clinton', rk: '42', hint: '1993–2001', alias: ['william clinton'] },
      { a: 'George W. Bush', rk: '43', hint: '2001–2009', alias: ['dubya','bush 43','bush jr','george bush jr'] },
      { a: 'Barack Obama', rk: '44', hint: '2009–2017', alias: ['barak obama','obama'] },
      { a: 'Donald Trump', rk: '45', hint: '2017–2021', alias: ['the donald'] },
      { a: 'Joe Biden', rk: '46', hint: '2021–2025', alias: ['joseph biden'] },
      { a: 'Donald Trump', rk: '47', hint: '2025–present', alias: ['the donald'] }
    ]}
  ]
},

{
  slug: 'us-states',
  title: 'US States',
  sub: 'Name all 50',
  blurb: 'Every state, A to Z. No clues, just 50 blanks.',
  category: 'Geography',
  tags: ['US States'],
  match: 'full',
  mode: 'timed',
  time: 600,
  cols: 'four',      // four columns on desktop so 50 blanks aren't one long strip
  nope: {
    puertorico: 'A territory, not a state.',
    guam: 'A territory, not a state.',
    dc: 'Not a state.',
    washingtondc: 'Not a state.',
    districtofcolumbia: 'Not a state.'
  },
  groups: [
    { name: '1 to 13', items: [
      { a: 'Alabama', rk: '1' },
      { a: 'Alaska', rk: '2' },
      { a: 'Arizona', rk: '3' },
      { a: 'Arkansas', rk: '4' },
      { a: 'California', rk: '5' },
      { a: 'Colorado', rk: '6' },
      { a: 'Connecticut', rk: '7' },
      { a: 'Delaware', rk: '8' },
      { a: 'Florida', rk: '9' },
      { a: 'Georgia', rk: '10' },
      { a: 'Hawaii', rk: '11', alias: ['hawai','hawii'] },
      { a: 'Idaho', rk: '12' },
      { a: 'Illinois', rk: '13' }
    ]},
    { name: '14 to 25', items: [
      { a: 'Indiana', rk: '14' },
      { a: 'Iowa', rk: '15' },
      { a: 'Kansas', rk: '16' },
      { a: 'Kentucky', rk: '17' },
      { a: 'Louisiana', rk: '18' },
      { a: 'Maine', rk: '19' },
      { a: 'Maryland', rk: '20' },
      { a: 'Massachusetts', rk: '21' },
      { a: 'Michigan', rk: '22' },
      { a: 'Minnesota', rk: '23' },
      { a: 'Mississippi', rk: '24' },
      { a: 'Missouri', rk: '25' }
    ]},
    { name: '26 to 38', items: [
      { a: 'Montana', rk: '26' },
      { a: 'Nebraska', rk: '27' },
      { a: 'Nevada', rk: '28' },
      { a: 'New Hampshire', rk: '29' },
      { a: 'New Jersey', rk: '30' },
      { a: 'New Mexico', rk: '31' },
      { a: 'New York', rk: '32' },
      { a: 'North Carolina', rk: '33' },
      { a: 'North Dakota', rk: '34' },
      { a: 'Ohio', rk: '35' },
      { a: 'Oklahoma', rk: '36' },
      { a: 'Oregon', rk: '37' },
      { a: 'Pennsylvania', rk: '38' }
    ]},
    { name: '39 to 50', items: [
      { a: 'Rhode Island', rk: '39' },
      { a: 'South Carolina', rk: '40' },
      { a: 'South Dakota', rk: '41' },
      { a: 'Tennessee', rk: '42' },
      { a: 'Texas', rk: '43' },
      { a: 'Utah', rk: '44' },
      { a: 'Vermont', rk: '45' },
      { a: 'Virginia', rk: '46' },
      { a: 'Washington', rk: '47' },
      { a: 'West Virginia', rk: '48' },
      { a: 'Wisconsin', rk: '49' },
      { a: 'Wyoming', rk: '50' }
    ]}
  ]
},

{
  slug: 'us-state-capitals',
  title: 'US State Capitals',
  sub: 'All 50, state by state',
  blurb: 'Name the capital of every state. The state is your clue. Careful: the biggest city is usually not the answer.',
  category: 'Geography',
  tags: ['US States'],
  match: 'full',
  mode: 'timed',
  time: 480,
  cols: 'multi',
  nope: {
    losangeles: 'Big city, but not the capital.',
    sanfrancisco: 'Big city, but not the capital.',
    sandiego: 'Big city, but not the capital.',
    sanjose: 'Big city, but not the capital.',
    newyork: 'Big city, but not the capital.',
    newyorkcity: 'Big city, but not the capital.',
    nyc: 'Big city, but not the capital.',
    chicago: 'Big city, but not the capital.',
    houston: 'Big city, but not the capital.',
    dallas: 'Big city, but not the capital.',
    sanantonio: 'Big city, but not the capital.',
    philadelphia: 'Big city, but not the capital.',
    philly: 'Big city, but not the capital.',
    pittsburgh: 'Big city, but not the capital.',
    miami: 'Big city, but not the capital.',
    jacksonville: 'Big city, but not the capital.',
    tampa: 'Big city, but not the capital.',
    orlando: 'Big city, but not the capital.',
    seattle: 'Big city, but not the capital.',
    spokane: 'Big city, but not the capital.',
    lasvegas: 'Big city, but not the capital.',
    vegas: 'Big city, but not the capital.',
    detroit: 'Big city, but not the capital.',
    portland: 'Big city, but not the capital.',
    louisville: 'Big city, but not the capital.',
    lexington: 'Big city, but not the capital.',
    neworleans: 'Big city, but not the capital.',
    kansascity: 'Big city, but not the capital.',
    stlouis: 'Big city, but not the capital.',
    milwaukee: 'Big city, but not the capital.',
    baltimore: 'Big city, but not the capital.',
    burlington: 'Big city, but not the capital.',
    wilmington: 'Big city, but not the capital.',
    anchorage: 'Big city, but not the capital.',
    birmingham: 'Big city, but not the capital.',
    memphis: 'Big city, but not the capital.',
    charlotte: 'Big city, but not the capital.',
    omaha: 'Big city, but not the capital.',
    wichita: 'Big city, but not the capital.',
    albuquerque: 'Big city, but not the capital.',
    tucson: 'Big city, but not the capital.',
    siouxfalls: 'Big city, but not the capital.',
    fargo: 'Big city, but not the capital.',
    billings: 'Big city, but not the capital.',
    cleveland: 'Big city, but not the capital.',
    cincinnati: 'Big city, but not the capital.',
    minneapolis: 'Big city, but not the capital.',
    newark: 'Big city, but not the capital.',
    manchester: 'Big city, but not the capital.',
    boulder: 'Big city, but not the capital.',
    chattanooga: 'Big city, but not the capital.',
    savannah: 'Big city, but not the capital.',
    tulsa: 'Big city, but not the capital.',
    provo: 'Big city, but not the capital.',
    reno: 'Big city, but not the capital.',
    washingtondc: 'That one is the nation\'s capital. Washington State has its own.',
    dc: 'That one is the nation\'s capital. Washington State has its own.'
  },
  groups: [
    { name: 'Northeast', note: '9 states', items: [
      { a: 'Hartford', hint: 'Connecticut' },
      { a: 'Augusta', hint: 'Maine' },
      { a: 'Boston', hint: 'Massachusetts' },
      { a: 'Concord', hint: 'New Hampshire' },
      { a: 'Trenton', hint: 'New Jersey' },
      { a: 'Albany', hint: 'New York' },
      { a: 'Harrisburg', hint: 'Pennsylvania', alias: ['harrisberg'] },
      { a: 'Providence', hint: 'Rhode Island' },
      { a: 'Montpelier', hint: 'Vermont', alias: ['montpellier'] }
    ]},
    { name: 'Midwest', note: '12 states', items: [
      { a: 'Springfield', hint: 'Illinois' },
      { a: 'Indianapolis', hint: 'Indiana', alias: ['indy'] },
      { a: 'Des Moines', hint: 'Iowa', alias: ['des moine','desmoines'] },
      { a: 'Topeka', hint: 'Kansas' },
      { a: 'Lansing', hint: 'Michigan' },
      { a: 'Saint Paul', hint: 'Minnesota', alias: ['st paul','st. paul'] },
      { a: 'Jefferson City', hint: 'Missouri', alias: ['jefferson'] },
      { a: 'Lincoln', hint: 'Nebraska' },
      { a: 'Bismarck', hint: 'North Dakota', alias: ['bismark'] },
      { a: 'Columbus', hint: 'Ohio' },
      { a: 'Pierre', hint: 'South Dakota', alias: ['peer'] },
      { a: 'Madison', hint: 'Wisconsin' }
    ]},
    { name: 'South', note: '16 states', items: [
      { a: 'Montgomery', hint: 'Alabama' },
      { a: 'Little Rock', hint: 'Arkansas' },
      { a: 'Dover', hint: 'Delaware' },
      { a: 'Tallahassee', hint: 'Florida', alias: ['talahassee','tallahasee'] },
      { a: 'Atlanta', hint: 'Georgia', alias: ['hotlanta'] },
      { a: 'Frankfort', hint: 'Kentucky', alias: ['frankfurt'] },
      { a: 'Baton Rouge', hint: 'Louisiana' },
      { a: 'Annapolis', hint: 'Maryland' },
      { a: 'Jackson', hint: 'Mississippi' },
      { a: 'Raleigh', hint: 'North Carolina', alias: ['raleigh nc'] },
      { a: 'Oklahoma City', hint: 'Oklahoma', alias: ['okc','ok city'] },
      { a: 'Columbia', hint: 'South Carolina' },
      { a: 'Nashville', hint: 'Tennessee' },
      { a: 'Austin', hint: 'Texas' },
      { a: 'Richmond', hint: 'Virginia' },
      { a: 'Charleston', hint: 'West Virginia' }
    ]},
    { name: 'West', note: '13 states', items: [
      { a: 'Juneau', hint: 'Alaska' },
      { a: 'Phoenix', hint: 'Arizona' },
      { a: 'Sacramento', hint: 'California' },
      { a: 'Denver', hint: 'Colorado' },
      { a: 'Honolulu', hint: 'Hawaii' },
      { a: 'Boise', hint: 'Idaho' },
      { a: 'Helena', hint: 'Montana' },
      { a: 'Carson City', hint: 'Nevada', alias: ['carson'] },
      { a: 'Santa Fe', hint: 'New Mexico', alias: ['santafe'] },
      { a: 'Salem', hint: 'Oregon' },
      { a: 'Salt Lake City', hint: 'Utah', alias: ['salt lake','slc'] },
      { a: 'Olympia', hint: 'Washington' },
      { a: 'Cheyenne', hint: 'Wyoming', alias: ['cheyene'] }
    ]}
  ]
},

{
  slug: 'nfl-career-passing-tds',
  title: 'NFL Career Passing TDs',
  sub: 'The top 25 of all time',
  blurb: 'The 25 quarterbacks with the most career passing touchdowns, regular season, through the Thursday game of Week 11, 2026. Touchdowns are your clue.',
  category: 'Sports',
  tags: ['NFL', 'Football', 'Career Leaders'],
  mode: 'timed',
  time: 360,
  cols: 'two',
  groups: [
    { name: 'Top 10', items: [
      { a: 'Tom Brady', rk: '1', hint: '649', alias: ['tb12', 'brady'] },
      { a: 'Drew Brees', rk: '2', hint: '571' },
      { a: 'Aaron Rodgers', rk: '3', hint: '542', alias: ['a-rod qb'] },
      { a: 'Peyton Manning', rk: '4', hint: '539' },
      { a: 'Brett Favre', rk: '5', hint: '508' },
      { a: 'Matthew Stafford', rk: '6', hint: '442', alias: ['matt stafford'] },
      { a: 'Philip Rivers', rk: '7', hint: '425', alias: ['phillip rivers'] },
      { a: 'Dan Marino', rk: '8', hint: '420' },
      { a: 'Ben Roethlisberger', rk: '9', hint: '418', alias: ['big ben'] },
      { a: 'Matt Ryan', rk: '10', hint: '381', alias: ['matty ice'] }
    ]},
    { name: '11 to 25', items: [
      { a: 'Eli Manning', rk: '11', hint: '366' },
      { a: 'Russell Wilson', rk: '12', hint: '353', alias: ['russ', 'dangeruss'] },
      { a: 'Fran Tarkenton', rk: '13', hint: '342' },
      { a: 'Kirk Cousins', rk: '14', hint: '320' },
      { a: 'John Elway', rk: '15', hint: '300' },
      { a: 'Carson Palmer', rk: '16', hint: '294' },
      { a: 'Warren Moon', rk: '17', hint: '291' },
      { a: 'Johnny Unitas', rk: '18', hint: '290', alias: ['johnny u'] },
      { a: 'Patrick Mahomes', rk: '19', hint: '286', alias: ['pat mahomes'] },
      { a: 'Vinny Testaverde', rk: '20', hint: '275' },
      { a: 'Jared Goff', rk: '21', hint: '274' },
      { a: 'Joe Montana', rk: '22', hint: '273', alias: ['joe cool'] },
      { a: 'Joe Flacco', rk: '23', hint: '272' },
      { a: 'Dak Prescott', rk: '24', hint: '264' },
      { a: 'Dave Krieg', rk: '25', hint: '261' }
    ]}
  ]
},

{
  slug: 'texans-all-time-leaders',
  title: 'Texans All-Time Leaders',
  sub: 'Top 5 in passing, rushing, receiving and sacks',
  blurb: 'The Houston Texans franchise leaders, through the Thursday win over the Colts in Week 11, 2026. The numbers are your clue.',
  category: 'Sports',
  tags: ['NFL', 'Football', 'Career Leaders'],
  mode: 'timed',
  time: 300,
  cols: 'four',
  groups: [
    { name: 'Passing yards', items: [
      { a: 'Matt Schaub', rk: '1', hint: '23,221' },
      { a: 'Deshaun Watson', rk: '2', hint: '14,539' },
      { a: 'C.J. Stroud', rk: '3', hint: '13,532', alias: ['cj stroud'] },
      { a: 'David Carr', rk: '4', hint: '13,391' },
      { a: 'Davis Mills', rk: '5', hint: '7,088' }
    ]},
    { name: 'Rushing yards', items: [
      { a: 'Arian Foster', rk: '1', hint: '6,472' },
      { a: 'Domanick Williams', rk: '2', hint: '3,195', alias: ['domanick davis'] },
      { a: 'Lamar Miller', rk: '3', hint: '2,934' },
      { a: 'Alfred Blue', rk: '4', hint: '2,407' },
      { a: 'Ben Tate', rk: '5', hint: '1,992' }
    ]},
    { name: 'Receiving yards', items: [
      { a: 'Andre Johnson', rk: '1', hint: '13,597', alias: ['dre'] },
      { a: 'DeAndre Hopkins', rk: '2', hint: '8,602', alias: ['nuk', 'd hop', 'dhop', 'deandre hopkins'] },
      { a: 'Nico Collins', rk: '3', hint: '4,883' },
      { a: 'Owen Daniels', rk: '4', hint: '4,617' },
      { a: 'Kevin Walter', rk: '5', hint: '4,083' }
    ]},
    { name: 'Sacks', items: [
      { a: 'J.J. Watt', rk: '1', hint: '101', alias: ['jj watt'] },
      { a: 'Whitney Mercilus', rk: '2', hint: '57' },
      { a: 'Mario Williams', rk: '3', hint: '53' },
      { a: 'Will Anderson Jr.', rk: '4', hint: '41.5', alias: ['will anderson'] },
      { a: 'Jadeveon Clowney', rk: '5', hint: '34.5', alias: ['clowney'] }
    ]}
  ]
},

{
  slug: 'nfl-week1-qbs-2026',
  title: 'NFL Week 1 Starting QBs: 2026',
  sub: 'Every team\'s opening-day starter',
  blurb: 'The quarterback who took the first snap for every team in Week 1 of the 2026 season. The team is your clue. (Sam Darnold and Kyler Murray started but were hurt in the first quarter.)',
  category: 'Sports',
  tags: ['NFL', 'Football', 'This Season'],
  mode: 'timed',
  time: 300,
  cols: 'four',
  groups: [
    { name: 'AFC East', items: [
      { a: 'Josh Allen', hint: 'Bills' },
      { a: 'Malik Willis', hint: 'Dolphins' },
      { a: 'Drake Maye', hint: 'Patriots' },
      { a: 'Geno Smith', hint: 'Jets' }
    ]},
    { name: 'AFC North', items: [
      { a: 'Lamar Jackson', hint: 'Ravens' },
      { a: 'Joe Burrow', hint: 'Bengals' },
      { a: 'Deshaun Watson', hint: 'Browns' },
      { a: 'Aaron Rodgers', hint: 'Steelers' }
    ]},
    { name: 'AFC South', items: [
      { a: 'C.J. Stroud', hint: 'Texans', alias: ['cj stroud'] },
      { a: 'Daniel Jones', hint: 'Colts', alias: ['danny dimes'] },
      { a: 'Trevor Lawrence', hint: 'Jaguars' },
      { a: 'Cam Ward', hint: 'Titans' }
    ]},
    { name: 'AFC West', items: [
      { a: 'Bo Nix', hint: 'Broncos' },
      { a: 'Patrick Mahomes', hint: 'Chiefs', alias: ['pat mahomes'] },
      { a: 'Kirk Cousins', hint: 'Raiders' },
      { a: 'Justin Herbert', hint: 'Chargers' }
    ]},
    { name: 'NFC East', items: [
      { a: 'Dak Prescott', hint: 'Cowboys' },
      { a: 'Jaxson Dart', hint: 'Giants', alias: ['jackson dart'] },
      { a: 'Jalen Hurts', hint: 'Eagles' },
      { a: 'Jayden Daniels', hint: 'Commanders' }
    ]},
    { name: 'NFC North', items: [
      { a: 'Caleb Williams', hint: 'Bears' },
      { a: 'Jared Goff', hint: 'Lions' },
      { a: 'Jordan Love', hint: 'Packers' },
      { a: 'Kyler Murray', hint: 'Vikings' }
    ]},
    { name: 'NFC South', items: [
      { a: 'Cooper Rush', hint: 'Falcons' },
      { a: 'Bryce Young', hint: 'Panthers' },
      { a: 'Tyler Shough', hint: 'Saints' },
      { a: 'Baker Mayfield', hint: 'Buccaneers' }
    ]},
    { name: 'NFC West', items: [
      { a: 'Jacoby Brissett', hint: 'Cardinals' },
      { a: 'Matthew Stafford', hint: 'Rams', alias: ['matt stafford'] },
      { a: 'Brock Purdy', hint: '49ers' },
      { a: 'Sam Darnold', hint: 'Seahawks' }
    ]}
  ]
},

{
  slug: 'nba-50-40-90-club',
  title: 'NBA 50-40-90 Club',
  sub: 'Every 50-40-90 season in NBA history',
  blurb: 'Shoot 50% from the field, 40% from three and 90% from the line in one season. Only nine players have done it, 14 times in all (none in 2025-26). The season and team are your clue.',
  category: 'Sports',
  tags: ['NBA', 'Basketball', 'All-Time'],
  mode: 'timed',
  time: 180,
  cols: 'single',
  groups: [
    { name: 'Every 50-40-90 season', note: '9 players', items: [
      { a: 'Larry Bird', rk: '1986-87', hint: 'Celtics', alias: ['larry legend'] },
      { a: 'Larry Bird', rk: '1987-88', hint: 'Celtics', alias: ['larry legend'] },
      { a: 'Mark Price', rk: '1988-89', hint: 'Cavaliers' },
      { a: 'Reggie Miller', rk: '1993-94', hint: 'Pacers' },
      { a: 'Steve Nash', rk: '2005-06', hint: 'Suns', alias: ['nash'] },
      { a: 'Dirk Nowitzki', rk: '2006-07', hint: 'Mavericks', alias: ['dirk', 'nowitski'] },
      { a: 'Steve Nash', rk: '2007-08', hint: 'Suns', alias: ['nash'] },
      { a: 'Steve Nash', rk: '2008-09', hint: 'Suns', alias: ['nash'] },
      { a: 'Steve Nash', rk: '2009-10', hint: 'Suns', alias: ['nash'] },
      { a: 'Kevin Durant', rk: '2012-13', hint: 'Thunder', alias: ['kd', 'durantula', 'slim reaper'] },
      { a: 'Stephen Curry', rk: '2015-16', hint: 'Warriors', alias: ['steph', 'steph curry', 'chef curry'] },
      { a: 'Malcolm Brogdon', rk: '2018-19', hint: 'Bucks' },
      { a: 'Kyrie Irving', rk: '2020-21', hint: 'Nets', alias: ['uncle drew'] },
      { a: 'Kevin Durant', rk: '2022-23', hint: 'Nets', alias: ['kd', 'durantula', 'slim reaper'] }
    ]}
  ]
},

{
  slug: 'mlb-3000-hit-club',
  title: 'MLB 3,000-Hit Club',
  sub: 'All 33 members',
  blurb: 'Every player with 3,000 career hits, through the 2026 season. No one joined this year; Freddie Freeman is closest among active players. Career hits are your clue.',
  category: 'Sports',
  tags: ['MLB', 'Baseball', 'Career Leaders'],
  mode: 'timed',
  time: 420,
  cols: 'multi',
  groups: [
    { name: '3,500 or more', items: [
      { a: 'Pete Rose', rk: '1', hint: '4,256', alias: ['charlie hustle'] },
      { a: 'Ty Cobb', rk: '2', hint: '4,189' },
      { a: 'Hank Aaron', rk: '3', hint: '3,771', alias: ['henry aaron', 'hammerin hank'] },
      { a: 'Stan Musial', rk: '4', hint: '3,630', alias: ['stan the man'] },
      { a: 'Tris Speaker', rk: '5', hint: '3,514' },
      { a: 'Derek Jeter', rk: '6', hint: '3,465', alias: ['the captain'] },
      { a: 'Honus Wagner', rk: '7', hint: '3,430' }
    ]},
    { name: '3,100 to 3,499', items: [
      { a: 'Carl Yastrzemski', rk: '8', hint: '3,419', alias: ['yaz'] },
      { a: 'Albert Pujols', rk: '9', hint: '3,384' },
      { a: 'Paul Molitor', rk: '10', hint: '3,319' },
      { a: 'Eddie Collins', rk: '11', hint: '3,315' },
      { a: 'Willie Mays', rk: '12', hint: '3,293', alias: ['say hey kid'] },
      { a: 'Eddie Murray', rk: '13', hint: '3,255' },
      { a: 'Nap Lajoie', rk: '14', hint: '3,252' },
      { a: 'Cal Ripken Jr.', rk: '15', hint: '3,184', alias: ['cal ripken', 'iron man'] },
      { a: 'Miguel Cabrera', rk: '16', hint: '3,174', alias: ['miggy'] },
      { a: 'Adrián Beltré', rk: '17', hint: '3,166', alias: ['adrian beltre'] },
      { a: 'George Brett', rk: '18', hint: '3,154' },
      { a: 'Paul Waner', rk: '19', hint: '3,152', alias: ['big poison'] },
      { a: 'Robin Yount', rk: '20', hint: '3,142' },
      { a: 'Tony Gwynn', rk: '21', hint: '3,141' },
      { a: 'Alex Rodriguez', rk: '22', hint: '3,115', alias: ['a-rod', 'arod'] },
      { a: 'Dave Winfield', rk: '23', hint: '3,110' },
      { a: 'Ichiro Suzuki', rk: '24', hint: '3,089', alias: ['ichiro'] }
    ]},
    { name: '3,000 to 3,099', items: [
      { a: 'Craig Biggio', rk: '25', hint: '3,060' },
      { a: 'Rickey Henderson', rk: '26', hint: '3,055' },
      { a: 'Rod Carew', rk: '27', hint: '3,053' },
      { a: 'Lou Brock', rk: '28', hint: '3,023' },
      { a: 'Rafael Palmeiro', rk: '29', hint: '3,020' },
      { a: 'Cap Anson', rk: '30', hint: '3,011' },
      { a: 'Wade Boggs', rk: '31', hint: '3,010' },
      { a: 'Al Kaline', rk: '32', hint: '3,007' },
      { a: 'Roberto Clemente', rk: '33', hint: '3,000' }
    ]}
  ]
},

{
  slug: 'pixar-movies',
  title: 'Every Pixar Movie',
  sub: 'All 31, in order',
  blurb: 'Every Pixar feature film, from Toy Story to Toy Story 5. The year it came out is your clue.',
  category: 'Movies',
  tags: ['Disney', 'Kids'],
  icon: '🧸',
  match: 'full',
  mode: 'chill',
  time: 420,
  cols: 'two',
  groups: [
    { name: '1995 to 2010', items: [
      { a: 'Toy Story', hint: '1995' },
      { a: 'A Bug\'s Life', hint: '1998', alias: ['bugs life', 'a bugs life'] },
      { a: 'Toy Story 2', hint: '1999', alias: ['toy story two'] },
      { a: 'Monsters, Inc.', hint: '2001', alias: ['monsters inc', 'monsters incorporated'] },
      { a: 'Finding Nemo', hint: '2003', alias: ['nemo'] },
      { a: 'The Incredibles', hint: '2004' },
      { a: 'Cars', hint: '2006' },
      { a: 'Ratatouille', hint: '2007', alias: ['ratatoui', 'ratatooie'] },
      { a: 'WALL-E', hint: '2008', alias: ['walle', 'wall e'] },
      { a: 'Up', hint: '2009' },
      { a: 'Toy Story 3', hint: '2010', alias: ['toy story three'] }
    ]},
    { name: '2011 to 2026', items: [
      { a: 'Cars 2', hint: '2011', alias: ['cars two'] },
      { a: 'Brave', hint: '2012' },
      { a: 'Monsters University', hint: '2013', alias: ['monsters u'] },
      { a: 'Inside Out', hint: '2015' },
      { a: 'The Good Dinosaur', hint: '2015' },
      { a: 'Finding Dory', hint: '2016', alias: ['dory'] },
      { a: 'Cars 3', hint: '2017', alias: ['cars three'] },
      { a: 'Coco', hint: '2017' },
      { a: 'Incredibles 2', hint: '2018', alias: ['incredibles two', 'the incredibles 2'] },
      { a: 'Toy Story 4', hint: '2019', alias: ['toy story four'] },
      { a: 'Onward', hint: '2020' },
      { a: 'Soul', hint: '2020' },
      { a: 'Luca', hint: '2021' },
      { a: 'Turning Red', hint: '2022' },
      { a: 'Lightyear', hint: '2022', alias: ['light year', 'buzz lightyear'] },
      { a: 'Elemental', hint: '2023' },
      { a: 'Inside Out 2', hint: '2024', alias: ['inside out two'] },
      { a: 'Elio', hint: '2025' },
      { a: 'Hoppers', hint: '2026' },
      { a: 'Toy Story 5', hint: '2026', alias: ['toy story five'] }
    ]}
  ]
},

{
  slug: 'the-office-cast',
  title: 'The Office Main Cast',
  sub: 'Every regular at Dunder Mifflin Scranton',
  blurb: 'All 25 regular characters from The Office. First names count here, since that\'s how everyone knows them. Their job is your clue.',
  category: 'TV',
  tags: ['Sitcoms'],
  icon: '📄',
  mode: 'timed',
  time: 300,
  cols: 'two',
  groups: [
    { name: 'Dunder Mifflin originals', items: [
      { a: 'Michael Scott', hint: 'Regional manager', alias: ['michael', 'worlds best boss'] },
      { a: 'Dwight Schrute', hint: 'Assistant (to the) regional manager', alias: ['dwight'] },
      { a: 'Jim Halpert', hint: 'Salesman and prankster', alias: ['jim', 'big tuna'] },
      { a: 'Pam Beesly', hint: 'Receptionist turned artist', alias: ['pam', 'pam halpert', 'pam beesley'] },
      { a: 'Ryan Howard', hint: 'The temp', alias: ['ryan'] },
      { a: 'Stanley Hudson', hint: 'Salesman, loves crosswords and pretzel day', alias: ['stanley'] },
      { a: 'Kevin Malone', hint: 'Accountant, famous chili', alias: ['kevin'] },
      { a: 'Angela Martin', hint: 'Head of accounting, loves her cats', alias: ['angela'] },
      { a: 'Oscar Martinez', hint: 'Accountant, the smart one', alias: ['oscar'] },
      { a: 'Phyllis Vance', hint: 'Saleswoman, married to Bob Vance', alias: ['phyllis', 'phyllis lapin'] },
      { a: 'Meredith Palmer', hint: 'Supplier relations', alias: ['meredith'] },
      { a: 'Creed Bratton', hint: 'Quality assurance', alias: ['creed'] },
      { a: 'Kelly Kapoor', hint: 'Customer service, loves gossip', alias: ['kelly'] },
      { a: 'Toby Flenderson', hint: 'Human resources', alias: ['toby'] },
      { a: 'Darryl Philbin', hint: 'Warehouse foreman', alias: ['darryl', 'daryl'] },
      { a: 'Roy Anderson', hint: 'Warehouse, Pam\'s ex-fiancé', alias: ['roy'] },
      { a: 'Jan Levinson', hint: 'Corporate VP, Michael\'s ex', alias: ['jan', 'jan levinson gould'] }
    ]},
    { name: 'Later arrivals', items: [
      { a: 'Andy Bernard', hint: 'Cornell grad, the Nard Dog', alias: ['andy', 'nard dog', 'the nard dog'] },
      { a: 'Erin Hannon', hint: 'Receptionist after Pam', alias: ['erin'] },
      { a: 'Holly Flax', hint: 'HR, the love of Michael\'s life', alias: ['holly'] },
      { a: 'Gabe Lewis', hint: 'Sabre corporate liaison', alias: ['gabe'] },
      { a: 'Robert California', hint: 'Sabre CEO, the Lizard King', alias: ['robert', 'lizard king', 'the lizard king'] },
      { a: 'Nellie Bertram', hint: 'From Sabre\'s British side', alias: ['nellie'] },
      { a: 'Clark Green', hint: '"New Dwight"', alias: ['clark'] },
      { a: 'Pete Miller', hint: '"New Jim", nicknamed Plop', alias: ['pete', 'plop'] }
    ]}
  ]
},

{
  slug: 'pokemon-starters',
  title: 'Pokémon Starters',
  sub: 'Every first partner, region by region',
  blurb: 'Every starter Pokémon from every main game, plus the three just revealed for Pokémon Winds and Waves (2027). The type is your clue.',
  category: 'Games',
  tags: ['Pokémon', 'Kids'],
  match: 'full',
  nope: { pikachu: 'Pikachu is the starter in Yellow, but not a Grass, Fire or Water one!', eevee: 'Eevee is a partner in Let\'s Go Eevee, not a regular starter.', charizard: 'That\'s the evolved form. Name the first stage!', venusaur: 'That\'s the evolved form. Name the first stage!', blastoise: 'That\'s the evolved form. Name the first stage!', ivysaur: 'That\'s an evolution. Name the first stage!', wartortle: 'That\'s an evolution. Name the first stage!', charmeleon: 'That\'s an evolution. Name the first stage!' },
  mode: 'chill',
  time: 300,
  cols: 'multi',
  groups: [
    { name: 'Kanto', note: 'Gen 1', items: [
      { a: 'Bulbasaur', hint: 'Grass', alias: ['bulbasoar', 'bulbasor'] },
      { a: 'Charmander', hint: 'Fire', alias: ['charmandar', 'charmeleon'] },
      { a: 'Squirtle', hint: 'Water', alias: ['squirtel'] }
    ]},
    { name: 'Johto', note: 'Gen 2', items: [
      { a: 'Chikorita', hint: 'Grass' },
      { a: 'Cyndaquil', hint: 'Fire', alias: ['cindaquil', 'cyndaquill'] },
      { a: 'Totodile', hint: 'Water' }
    ]},
    { name: 'Hoenn', note: 'Gen 3', items: [
      { a: 'Treecko', hint: 'Grass' },
      { a: 'Torchic', hint: 'Fire' },
      { a: 'Mudkip', hint: 'Water' }
    ]},
    { name: 'Sinnoh', note: 'Gen 4', items: [
      { a: 'Turtwig', hint: 'Grass' },
      { a: 'Chimchar', hint: 'Fire' },
      { a: 'Piplup', hint: 'Water' }
    ]},
    { name: 'Unova', note: 'Gen 5', items: [
      { a: 'Snivy', hint: 'Grass' },
      { a: 'Tepig', hint: 'Fire' },
      { a: 'Oshawott', hint: 'Water', alias: ['oshawot'] }
    ]},
    { name: 'Kalos', note: 'Gen 6', items: [
      { a: 'Chespin', hint: 'Grass' },
      { a: 'Fennekin', hint: 'Fire' },
      { a: 'Froakie', hint: 'Water' }
    ]},
    { name: 'Alola', note: 'Gen 7', items: [
      { a: 'Rowlet', hint: 'Grass' },
      { a: 'Litten', hint: 'Fire' },
      { a: 'Popplio', hint: 'Water' }
    ]},
    { name: 'Galar', note: 'Gen 8', items: [
      { a: 'Grookey', hint: 'Grass' },
      { a: 'Scorbunny', hint: 'Fire' },
      { a: 'Sobble', hint: 'Water' }
    ]},
    { name: 'Paldea', note: 'Gen 9', items: [
      { a: 'Sprigatito', hint: 'Grass', alias: ['sprigatitto'] },
      { a: 'Fuecoco', hint: 'Fire', alias: ['fuecocco'] },
      { a: 'Quaxly', hint: 'Water' }
    ]},
    { name: 'Winds and Waves', note: 'Bonus: coming 2027', items: [
      { a: 'Browt', hint: 'Grass' },
      { a: 'Pombon', hint: 'Fire' },
      { a: 'Gecqua', hint: 'Water' }
    ]}
  ]
},

{
  slug: 'south-america-countries',
  title: 'Countries of South America',
  sub: 'Name all 12',
  blurb: 'Every independent country in South America, A to Z. No clues.',
  category: 'Geography',
  tags: ['World'],
  match: 'full',
  nope: { frenchguiana: 'Close! It\'s part of France, not its own country.', guiana: 'Close! French Guiana is part of France.', falklandislands: 'A British territory, not a country.', falklands: 'A British territory, not a country.', panama: 'Central America!', mexico: 'North America!', costarica: 'Central America!', cuba: 'The Caribbean!', trinidadandtobago: 'Caribbean islands, not South America.', trinidad: 'Caribbean islands, not South America.' },
  mode: 'timed',
  time: 120,
  cols: 'single',
  groups: [
    { name: 'A to Z', note: '12 countries', items: [
      { a: 'Argentina', rk: '1' },
      { a: 'Bolivia', rk: '2' },
      { a: 'Brazil', rk: '3', alias: ['brasil'] },
      { a: 'Chile', rk: '4' },
      { a: 'Colombia', rk: '5', alias: ['columbia'] },
      { a: 'Ecuador', rk: '6' },
      { a: 'Guyana', rk: '7' },
      { a: 'Paraguay', rk: '8' },
      { a: 'Peru', rk: '9' },
      { a: 'Suriname', rk: '10', alias: ['surinam'] },
      { a: 'Uruguay', rk: '11' },
      { a: 'Venezuela', rk: '12', alias: ['venezuala'] }
    ]}
  ]
},

{
  slug: 'africa-countries',
  title: 'Countries of Africa',
  sub: 'Name all 54',
  blurb: 'Every UN member state in Africa, A to Z. Disputed territories such as Western Sahara and Somaliland are not on the board.',
  category: 'Geography',
  tags: ['World'],
  match: 'full',
  nope: {
    westernsahara: 'Western Sahara is disputed and not a UN member state.',
    somaliland: 'Somaliland is not internationally recognized as an independent country.',
    canaryislands: 'The Canary Islands are part of Spain.',
    canaries: 'The Canary Islands are part of Spain.',
    reunion: 'Reunion is an overseas region of France.',
    madeira: 'Madeira is part of Portugal.',
    mayotte: 'Mayotte is an overseas department of France.',
    sainthelena: 'Saint Helena is a British territory.',
    turkey: 'Turkey is mostly in Asia, not Africa.',
    turkiye: 'Turkey is mostly in Asia, not Africa.',
    israel: 'Israel is in Asia.',
    palestine: 'Palestine is not counted here (UN status differs from full UN members in Africa).',
    yemen: 'Yemen is in Asia.',
    spain: 'Spain is in Europe.',
    portugal: 'Portugal is in Europe.'
  },
  mode: 'timed',
  time: 600,
  cols: 'two',
  groups: [
    { name: 'A to Z', note: '54 countries', items: [
      { a: 'Algeria', rk: '1' },
      { a: 'Angola', rk: '2' },
      { a: 'Benin', rk: '3' },
      { a: 'Botswana', rk: '4' },
      { a: 'Burkina Faso', rk: '5', alias: ['burkina'] },
      { a: 'Burundi', rk: '6' },
      { a: 'Cabo Verde', rk: '7', alias: ['cape verde', 'capeverde'] },
      { a: 'Cameroon', rk: '8' },
      { a: 'Central African Republic', rk: '9', alias: ['car', 'central african rep', 'central african'] },
      { a: 'Chad', rk: '10' },
      { a: 'Comoros', rk: '11', alias: ['comoro islands'] },
      { a: 'Côte d\'Ivoire', rk: '12', alias: ['cote divoire', 'cote d ivoire', 'cote d\'ivoire', 'ivory coast', 'the ivory coast'] },
      { a: 'Democratic Republic of the Congo', rk: '13', alias: ['drc', 'dr congo', 'democratic republic of congo', 'congo kinshasa', 'congo-kinshasa', 'congo democratic republic', 'zaire'] },
      { a: 'Djibouti', rk: '14' },
      { a: 'Egypt', rk: '15' },
      { a: 'Equatorial Guinea', rk: '16', alias: ['equatoguinea'] },
      { a: 'Eritrea', rk: '17' },
      { a: 'Eswatini', rk: '18', alias: ['swaziland'] },
      { a: 'Ethiopia', rk: '19' },
      { a: 'Gabon', rk: '20' },
      { a: 'Gambia', rk: '21', alias: ['the gambia'] },
      { a: 'Ghana', rk: '22' },
      { a: 'Guinea', rk: '23' },
      { a: 'Guinea-Bissau', rk: '24', alias: ['guinea bissau', 'guineabissau'] },
      { a: 'Kenya', rk: '25' },
      { a: 'Lesotho', rk: '26' },
      { a: 'Liberia', rk: '27' },
      { a: 'Libya', rk: '28' },
      { a: 'Madagascar', rk: '29' },
      { a: 'Malawi', rk: '30' },
      { a: 'Mali', rk: '31' },
      { a: 'Mauritania', rk: '32' },
      { a: 'Mauritius', rk: '33' },
      { a: 'Morocco', rk: '34' },
      { a: 'Mozambique', rk: '35' },
      { a: 'Namibia', rk: '36' },
      { a: 'Niger', rk: '37' },
      { a: 'Nigeria', rk: '38' },
      { a: 'Republic of the Congo', rk: '39', alias: ['congo brazzaville', 'congo-brazzaville', 'republic of congo', 'congo republic'] },
      { a: 'Rwanda', rk: '40' },
      { a: 'São Tomé and Principe', rk: '41', alias: ['sao tome and principe', 'sao tome', 'são tomé and príncipe', 'sao tome & principe'] },
      { a: 'Senegal', rk: '42' },
      { a: 'Seychelles', rk: '43' },
      { a: 'Sierra Leone', rk: '44', alias: ['sierraleone'] },
      { a: 'Somalia', rk: '45' },
      { a: 'South Africa', rk: '46', alias: ['rsa'] },
      { a: 'South Sudan', rk: '47', alias: ['southsudan', 's sudan'] },
      { a: 'Sudan', rk: '48' },
      { a: 'Tanzania', rk: '49', alias: ['united republic of tanzania'] },
      { a: 'Togo', rk: '50' },
      { a: 'Tunisia', rk: '51' },
      { a: 'Uganda', rk: '52' },
      { a: 'Zambia', rk: '53' },
      { a: 'Zimbabwe', rk: '54', alias: ['rhodesia'] }
    ]}
  ]
},

{
  slug: 'world-population-top25',
  title: 'Most Populous Countries',
  sub: 'Top 25 in the world',
  // UN DESA World Population Prospects 2024 Revision, medium variant, estimated population on 1 July 2025.
  blurb: 'The 25 most populous sovereign countries on Earth, ranked by the UN World Population Prospects (2024 revision), mid-2025 estimates. Rank and population appear when you find each one.',
  category: 'Geography',
  tags: ['World'],
  match: 'full',
  mode: 'timed',
  time: 360,
  cols: 'two',
  groups: [
    { name: 'Top 25', items: [
      { a: 'India', rk: '1', hint: '~1.46B', alias: ['republic of india', 'bharat'] },
      { a: 'China', rk: '2', hint: '~1.42B', alias: ['peoples republic of china', 'prc'] },
      { a: 'United States', rk: '3', hint: '~347M', alias: ['usa', 'us', 'united states of america', 'america', 'u s a', 'u.s.a.'] },
      { a: 'Indonesia', rk: '4', hint: '~286M', alias: ['republic of indonesia'] },
      { a: 'Pakistan', rk: '5', hint: '~255M', alias: ['islamic republic of pakistan'] },
      { a: 'Nigeria', rk: '6', hint: '~238M', alias: ['federal republic of nigeria'] },
      { a: 'Brazil', rk: '7', hint: '~213M', alias: ['brasil', 'federative republic of brazil'] },
      { a: 'Bangladesh', rk: '8', hint: '~176M', alias: ["people's republic of bangladesh"] },
      { a: 'Russia', rk: '9', hint: '~144M', alias: ['russian federation', 'russian'] },
      { a: 'Ethiopia', rk: '10', hint: '~135M', alias: ['federal democratic republic of ethiopia'] },
      { a: 'Mexico', rk: '11', hint: '~132M', alias: ['united mexican states', 'mexico'] },
      { a: 'Japan', rk: '12', hint: '~123M' },
      { a: 'Egypt', rk: '13', hint: '~118M', alias: ['arab republic of egypt'] },
      { a: 'Philippines', rk: '14', hint: '~117M', alias: ['republic of the philippines'] },
      { a: 'Democratic Republic of the Congo', rk: '15', hint: '~113M', alias: ['drc', 'dr congo', 'congo kinshasa', 'congo-kinshasa', 'democratic republic of congo'] },
      { a: 'Vietnam', rk: '16', hint: '~102M', alias: ['viet nam', 'socialist republic of vietnam'] },
      { a: 'Iran', rk: '17', hint: '~92M', alias: ['islamic republic of iran', 'persia'] },
      { a: 'Turkey', rk: '18', hint: '~88M', alias: ['turkiye', 'türkiye', 'republic of turkey'] },
      { a: 'Germany', rk: '19', hint: '~84M', alias: ['federal republic of germany', 'deutschland'] },
      { a: 'Thailand', rk: '20', hint: '~72M', alias: ['kingdom of thailand', 'siam'] },
      { a: 'Tanzania', rk: '21', hint: '~71M', alias: ['united republic of tanzania'] },
      { a: 'United Kingdom', rk: '22', hint: '~70M', alias: ['uk', 'u k', 'great britain', 'britain', 'england', 'united kingdom of great britain and northern ireland'] },
      { a: 'France', rk: '23', hint: '~67M', alias: ['french republic'] },
      { a: 'South Africa', rk: '24', hint: '~65M', alias: ['rsa', 'republic of south africa'] },
      { a: 'Italy', rk: '25', hint: '~59M', alias: ['italian republic'] }
    ]}
  ]
},

{
  slug: 'marvel-main-characters',
  title: 'Marvel Main Characters',
  sub: '28 icons, heroes and villains',
  blurb: 'The most iconic Marvel heroes and villains from comics and film. Hero names and secret identities both count; real names appear when you find each one.',
  category: 'Games',
  tags: ['Comics'],
  match: 'full',
  mode: 'timed',
  time: 420,
  cols: 'two',
  groups: [
    { name: 'Heroes', note: 'Avengers & X-Men', items: [
      { a: 'Spider-Man', hint: 'Peter Parker', alias: ['spiderman', 'spider man', 'the spider-man', 'peter parker', 'parker'] },
      { a: 'Iron Man', hint: 'Tony Stark', alias: ['ironman', 'iron man', 'tony stark', 'stark'] },
      { a: 'Captain America', hint: 'Steve Rogers', alias: ['capt america', 'cap', 'steve rogers', 'rogers'] },
      { a: 'Thor', hint: 'Thor Odinson', alias: ['thor odinson', 'god of thunder'] },
      { a: 'Hulk', hint: 'Bruce Banner', alias: ['the hulk', 'bruce banner', 'banner', 'professor hulk'] },
      { a: 'Black Widow', hint: 'Natasha Romanoff', alias: ['blackwidow', 'natasha romanoff', 'natalia romanova', 'romanoff'] },
      { a: 'Hawkeye', hint: 'Clint Barton', alias: ['clint barton', 'barton'] },
      { a: 'Black Panther', hint: 'T\'Challa', alias: ['blackpanther', 'tchalla', 't challa'] },
      { a: 'Doctor Strange', hint: 'Stephen Strange', alias: ['dr strange', 'dr. strange', 'stephen strange', 'sorcerer supreme'] },
      { a: 'Wolverine', hint: 'Logan / James Howlett', alias: ['logan', 'james howlett', 'howlett'] },
      { a: 'Captain Marvel', hint: 'Carol Danvers', alias: ['carol danvers', 'ms marvel', 'captain marvel carol'] },
      { a: 'Scarlet Witch', hint: 'Wanda Maximoff', alias: ['wanda maximoff', 'wanda', 'maximoff'] },
      { a: 'Vision', hint: 'Vision', alias: ['the vision', 'jarvis'] },
      { a: 'Ant-Man', hint: 'Scott Lang', alias: ['antman', 'ant man', 'scott lang', 'lang', 'hank pym'] },
      { a: 'Daredevil', hint: 'Matt Murdock', alias: ['matt murdock', 'murdock', 'man without fear'] },
      { a: 'Professor X', hint: 'Charles Xavier', alias: ['professor x', 'charles xavier', 'xavier', 'prof x'] },
      { a: 'Storm', hint: 'Ororo Munroe', alias: ['ororo munroe', 'munroe'] },
      { a: 'Cyclops', hint: 'Scott Summers', alias: ['scott summers', 'summers'] },
      { a: 'Star-Lord', hint: 'Peter Quill', alias: ['star lord', 'starlord', 'peter quill', 'quill'] },
      { a: 'Groot', hint: 'Groot', alias: ['i am groot', 'baby groot'] },
      { a: 'Rocket Raccoon', hint: 'Rocket', alias: ['rocket', 'rocket racoon'] }
    ]},
    { name: 'Villains', items: [
      { a: 'Thanos', hint: 'Thanos', alias: ['the mad titan', 'mad titan'] },
      { a: 'Loki', hint: 'Loki Laufeyson', alias: ['loki laufeyson', 'god of mischief'] },
      { a: 'Magneto', hint: 'Erik Lehnsherr', alias: ['erik lehnsherr', 'erik lensherr', 'max eisenhardt'] },
      { a: 'Deadpool', hint: 'Wade Wilson', alias: ['wade wilson', 'merc with a mouth'] },
      { a: 'Green Goblin', hint: 'Norman Osborn', alias: ['green goblin', 'norman osborn', 'osborn', 'goblin'] },
      { a: 'Venom', hint: 'Eddie Brock', alias: ['eddie brock', 'brock', 'symbiote'] },
      { a: 'Doctor Doom', hint: 'Victor von Doom', alias: ['dr doom', 'dr. doom', 'victor von doom', 'von doom', 'doom'] },
      { a: 'Mystique', hint: 'Raven Darkhölme', alias: ['raven darkholme', 'raven darkhölme'] }
    ]}
  ]
},

{
  slug: 'dc-main-characters',
  title: 'DC Main Characters',
  sub: '28 icons, heroes and villains',
  blurb: 'The most iconic DC heroes and villains from comics and film. Hero names and secret identities both count; real names appear when you find each one.',
  category: 'Games',
  tags: ['Comics'],
  match: 'full',
  mode: 'timed',
  time: 420,
  cols: 'two',
  groups: [
    { name: 'Heroes', note: 'Justice League', items: [
      { a: 'Superman', hint: 'Clark Kent', alias: ['clark kent', 'kent', 'kal-el', 'kal el', 'man of steel'] },
      { a: 'Batman', hint: 'Bruce Wayne', alias: ['bruce wayne', 'wayne', 'the dark knight', 'dark knight', 'caped crusader'] },
      { a: 'Wonder Woman', hint: 'Diana Prince', alias: ['wonderwoman', 'wonder woman', 'diana prince', 'prince', 'diana of themyscira'] },
      { a: 'The Flash', hint: 'Barry Allen', alias: ['flash', 'barry allen', 'allen', 'wally west', 'jay garrick'] },
      { a: 'Aquaman', hint: 'Arthur Curry', alias: ['arthur curry', 'curry', 'orin'] },
      { a: 'Green Lantern', hint: 'Hal Jordan', alias: ['green lantern', 'greenlantern', 'hal jordan', 'jordan', 'john stewart', 'kyle rayner', 'guy gardner'] },
      { a: 'Cyborg', hint: 'Victor Stone', alias: ['victor stone', 'stone'] },
      { a: 'Green Arrow', hint: 'Oliver Queen', alias: ['greenarrow', 'green arrow', 'oliver queen', 'queen'] },
      { a: 'Shazam', hint: 'Billy Batson', alias: ['billy batson', 'batson', 'captain marvel shazam'] },
      { a: 'Nightwing', hint: 'Dick Grayson', alias: ['dick grayson', 'grayson', 'robin nightwing'] },
      { a: 'Martian Manhunter', hint: 'J\'onn J\'onzz', alias: ['jon jonzz', 'jonn jonnz', 'john jones', 'martian manhunter'] },
      { a: 'Supergirl', hint: 'Kara Zor-El', alias: ['kara zor-el', 'kara zorel', 'kara danvers'] },
      { a: 'Batgirl', hint: 'Barbara Gordon', alias: ['barbara gordon', 'gordon', 'oracle'] },
      { a: 'Robin', hint: 'Dick Grayson', alias: ['dick grayson', 'grayson', 'damian wayne', 'tim drake', 'jason todd'] }
    ]},
    { name: 'Villains', items: [
      { a: 'Joker', hint: 'Joker', alias: ['the joker', 'clown prince of crime'] },
      { a: 'Lex Luthor', hint: 'Lex Luthor', alias: ['luthor', 'alexander luthor'] },
      { a: 'Harley Quinn', hint: 'Harleen Quinzel', alias: ['harley quinn', 'harleen quinzel', 'harley'] },
      { a: 'Catwoman', hint: 'Selina Kyle', alias: ['cat woman', 'selina kyle', 'kyle'] },
      { a: 'Poison Ivy', hint: 'Pamela Isley', alias: ['poison ivy', 'pamela isley', 'ivy'] },
      { a: 'Riddler', hint: 'Edward Nygma', alias: ['the riddler', 'edward nygma', 'nygma', 'edward nigma'] },
      { a: 'Two-Face', hint: 'Harvey Dent', alias: ['two face', 'twoface', 'harvey dent', 'dent'] },
      { a: 'Darkseid', hint: 'Darkseid', alias: ['dark side', 'uxas'] },
      { a: 'Doomsday', hint: 'Doomsday', alias: ['the ultimate'] },
      { a: 'Brainiac', hint: 'Brainiac', alias: ['the collector of worlds'] },
      { a: 'Penguin', hint: 'Oswald Cobblepot', alias: ['the penguin', 'oswald cobblepot', 'cobblepot'] },
      { a: 'Bane', hint: 'Bane', alias: ['the man who broke the bat'] },
      { a: 'Ra\'s al Ghul', hint: 'Ra\'s al Ghul', alias: ['ras al ghul', 'ras al ghoul', 'demons head', 'head of the demon'] },
      { a: 'General Zod', hint: 'Dru-Zod', alias: ['zod', 'dru-zod', 'dru zod'] }
    ]}
  ]
},

{
  slug: 'famous-slogans',
  title: 'Name the Company by Its Slogan',
  sub: '48 slogans you\'ve heard a thousand times',
  blurb: 'Famous ad slogans, past and present. The slogan is your clue; name the company or brand behind it.',
  category: 'Business',
  tags: ['Companies'],
  icon: '📣',
  match: 'full',
  mode: 'timed',
  time: 480,
  cols: 'single',
  groups: [
    { name: 'Food and drink', items: [
      { a: 'McDonald\'s', hint: 'I\'m Lovin\' It', alias: ['mcdonalds', 'mickey ds'] },
      { a: 'Burger King', hint: 'Have It Your Way', alias: ['bk'] },
      { a: 'Subway', hint: 'Eat Fresh' },
      { a: 'KFC', hint: 'Finger Lickin\' Good', alias: ['kentucky fried chicken'] },
      { a: 'Taco Bell', hint: 'Think Outside the Bun' },
      { a: 'Wendy\'s', hint: 'Where\'s the Beef?', alias: ['wendys'] },
      { a: 'Chick-fil-A', hint: 'Eat Mor Chikin', alias: ['chickfila', 'chick fil a'] },
      { a: 'Little Caesars', hint: 'Pizza! Pizza!', alias: ['little caesar', 'little caesars pizza'] },
      { a: 'Papa John\'s', hint: 'Better Ingredients. Better Pizza.', alias: ['papa johns'] },
      { a: 'M&M\'s', hint: 'Melts in your mouth, not in your hands', alias: ['mms', 'm and ms', 'm ms', 'm&m'] },
      { a: 'Skittles', hint: 'Taste the Rainbow' },
      { a: 'Kit Kat', hint: 'Gimme a Break', alias: ['kitkat'] },
      { a: 'Lay\'s', hint: 'Betcha Can\'t Eat Just One', alias: ['lays'] },
      { a: 'Frosted Flakes', hint: 'They\'re Gr-r-reat!', alias: ['tony the tiger'] },
      { a: 'Rice Krispies', hint: 'Snap! Crackle! Pop!', alias: ['rice crispies'] },
      { a: 'Wheaties', hint: 'Breakfast of Champions' },
      { a: 'Maxwell House', hint: 'Good to the Last Drop' },
      { a: 'Folgers', hint: 'The Best Part of Wakin\' Up' },
      { a: 'Coca-Cola', hint: 'The Pause That Refreshes', alias: ['coke', 'coca cola'] },
      { a: 'Red Bull', hint: '___ Gives You Wings', alias: ['redbull'] },
      { a: 'Sprite', hint: 'Obey Your Thirst' },
      { a: 'Budweiser', hint: 'The King of Beers', alias: ['bud'] },
      { a: 'Morton Salt', hint: 'When It Rains It Pours', alias: ['morton'] }
    ]},
    { name: 'Money and insurance', items: [
      { a: 'State Farm', hint: 'Like a good neighbor, ___ is there' },
      { a: 'Allstate', hint: 'You\'re in Good Hands' },
      { a: 'GEICO', hint: '15 minutes could save you 15% or more on car insurance' },
      { a: 'Capital One', hint: 'What\'s in Your Wallet?' },
      { a: 'Mastercard', hint: 'There are some things money can\'t buy. For everything else...', alias: ['master card'] },
      { a: 'Visa', hint: 'It\'s Everywhere You Want to Be' },
      { a: 'American Express', hint: 'Don\'t Leave Home Without It', alias: ['amex'] }
    ]},
    { name: 'Shopping, tech and cars', items: [
      { a: 'Nike', hint: 'Just Do It' },
      { a: 'Adidas', hint: 'Impossible Is Nothing' },
      { a: 'Apple', hint: 'Think Different' },
      { a: 'Verizon', hint: 'Can You Hear Me Now?', alias: ['verizon wireless'] },
      { a: 'Target', hint: 'Expect More. Pay Less.' },
      { a: 'Walmart', hint: 'Save Money. Live Better.', alias: ['wal-mart', 'wal mart'] },
      { a: 'The Home Depot', hint: 'More Saving. More Doing.', alias: ['home depot'] },
      { a: 'BMW', hint: 'The Ultimate Driving Machine' },
      { a: 'Chevrolet', hint: 'Like a Rock', alias: ['chevy'] },
      { a: 'Avis', hint: 'We Try Harder', alias: ['avis car rental'] },
      { a: 'United Airlines', hint: 'Fly the Friendly Skies', alias: ['united'] }
    ]},
    { name: 'Everything else', items: [
      { a: 'L\'Oréal', hint: 'Because You\'re Worth It', alias: ['loreal', 'l oreal'] },
      { a: 'Gillette', hint: 'The Best a Man Can Get' },
      { a: 'Bounty', hint: 'The Quicker Picker-Upper' },
      { a: 'Energizer', hint: 'It keeps going and going and going', alias: ['energizer bunny'] },
      { a: 'De Beers', hint: 'A Diamond Is Forever', alias: ['debeers'] },
      { a: 'Disneyland', hint: 'The Happiest Place on Earth', alias: ['disney', 'disney world'] },
      { a: 'Hallmark', hint: 'When You Care Enough to Send the Very Best' }
    ]}
  ]
},

{
  slug: 'line-game',               // permanent: the weekly link never changes
  featured: true,                  // weekly and time-sensitive: shown in the hub's "This week" section
  scoreKey: 'line-game-2026-w12',  // per-week best scores
  type: 'lines',
  title: 'NFL Line Game: Week 12',
  sub: 'Guess the Vegas spread on every game',
  blurb: 'Pick the favorite and guess the spread for all 16 Week 12 games. Within one point of the real Vegas line counts. BetMGM lines as of Nov 24.',
  category: 'Sports',
  tags: ['NFL', 'Football', 'Betting', 'This Season'],
  mode: 'chill',
  time: 300,
  modes: ['chill', 'timed'],
  cols: 'single',
  groups: [
    { name: 'Wednesday', note: 'Nov 25', items: [
      { a: 'Packers @ Rams',       away: 'Packers',    home: 'Rams',       aw: 'GB',  hm: 'LAR', line: -4 }
    ]},
    { name: 'Thursday', note: 'Nov 26', items: [
      { a: 'Bears @ Lions',        away: 'Bears',      home: 'Lions',      aw: 'CHI', hm: 'DET', line: 2.5 },
      { a: 'Eagles @ Cowboys',     away: 'Eagles',     home: 'Cowboys',    aw: 'PHI', hm: 'DAL', line: -7 },
      { a: 'Chiefs @ Bills',       away: 'Chiefs',     home: 'Bills',      aw: 'KC',  hm: 'BUF', line: -2.5 }
    ]},
    { name: 'Friday', note: 'Nov 27', items: [
      { a: 'Broncos @ Steelers',   away: 'Broncos',    home: 'Steelers',   aw: 'DEN', hm: 'PIT', line: 2.5 }
    ]},
    { name: 'Sunday', note: 'Nov 29', items: [
      { a: 'Saints @ Bengals',     away: 'Saints',     home: 'Bengals',    aw: 'NO',  hm: 'CIN', line: -10 },
      { a: 'Ravens @ Texans',      away: 'Ravens',     home: 'Texans',     aw: 'BAL', hm: 'HOU', line: -6.5 },
      { a: 'Giants @ Colts',       away: 'Giants',     home: 'Colts',      aw: 'NYG', hm: 'IND', line: 7 },
      { a: 'Jets @ Dolphins',      away: 'Jets',       home: 'Dolphins',   aw: 'NYJ', hm: 'MIA', line: 4 },
      { a: 'Falcons @ Vikings',    away: 'Falcons',    home: 'Vikings',    aw: 'ATL', hm: 'MIN', line: -7 },
      { a: 'Titans @ Jaguars',     away: 'Titans',     home: 'Jaguars',    aw: 'TEN', hm: 'JAX', line: -14 },
      { a: 'Patriots @ Chargers',  away: 'Patriots',   home: 'Chargers',   aw: 'NE',  hm: 'LAC', line: -3.5 },
      { a: 'Commanders @ Cardinals', away: 'Commanders', home: 'Cardinals', aw: 'WAS', hm: 'ARI', line: 7 },
      { a: 'Seahawks @ 49ers',     away: 'Seahawks',   home: '49ers',      aw: 'SEA', hm: 'SF',  line: -2 },
      { a: 'Raiders @ Browns',     away: 'Raiders',    home: 'Browns',     aw: 'LV',  hm: 'CLE', line: -5 }
    ]},
    { name: 'Monday', note: 'Nov 30', items: [
      { a: 'Panthers @ Buccaneers', away: 'Panthers',  home: 'Buccaneers', aw: 'CAR', hm: 'TB',  line: -2.5 }
    ]}
  ]
},

{
  // 2017 World Series 25-man roster. Names and groupings from the official
  // MLB.com roster announcement (Oct 23, 2017); same 25 names on Wikipedia's
  // 2017 Houston Astros season postseason table and Baseball-Reference's
  // 2017 World Series page. Wikipedia lists Beltrán as DH and González as an
  // outfielder; this quiz follows the club's own groups (Beltrán in the
  // outfield, González in the infield). Jersey numbers from that Wikipedia
  // World Series table, checked against Baseball Almanac's 2017 uniform list.
  // Jake Marisnick (thumb) and Tony Sipp were on the club but not this roster;
  // Tyler White was on the ALDS roster only.
  slug: '2017-astros-ws-roster',
  title: '2017 Astros World Series Roster',
  sub: 'The 25-man roster that beat the Dodgers',
  blurb: 'Every player on Houston\'s active roster for the 2017 World Series, the first title in franchise history. George Springer was named MVP. Jersey numbers are your clue.',
  category: 'Sports',
  tags: ['MLB', 'Baseball', 'Throwback', 'Champions'],
  mode: 'timed',
  time: 360,
  cols: 'multi',
  nope: {
    jakemarisnick: 'Marisnick was on the club, but a thumb injury kept him off the World Series roster.',
    marisnick: 'Marisnick was on the club, but a thumb injury kept him off the World Series roster.',
    tonysipp: 'Sipp pitched for Houston in 2017, but he was not on the World Series roster.',
    sipp: 'Sipp pitched for Houston in 2017, but he was not on the World Series roster.',
    tylerwhite: 'White was on the ALDS roster, but not the World Series one.',
    ajhinch: 'That\'s the manager. Name a player.',
    hinch: 'That\'s the manager. Name a player.'
  },
  groups: [
    { name: 'Pitchers', note: '12', items: [
      { a: 'Chris Devenski', hint: '#47', alias: ['devo'] },
      { a: 'Ken Giles', hint: '#53' },
      { a: 'Luke Gregerson', hint: '#44' },
      { a: 'Will Harris', hint: '#36' },
      { a: 'Dallas Keuchel', hint: '#60' },
      { a: 'Francisco Liriano', hint: '#46' },
      { a: 'Lance McCullers Jr.', hint: '#43', alias: ['lance mccullers', 'mccullers'] },
      { a: 'Collin McHugh', hint: '#31', alias: ['colin mchugh'] },
      { a: 'Charlie Morton', hint: '#50' },
      { a: 'Joe Musgrove', hint: '#59' },
      { a: 'Brad Peacock', hint: '#41' },
      { a: 'Justin Verlander', hint: '#35', alias: ['jv'] }
    ]},
    { name: 'Catchers', note: '3', items: [
      { a: 'Juan Centeno', hint: '#30' },
      { a: 'Evan Gattis', hint: '#11', alias: ['el oso blanco', 'oso blanco', 'el oso'] },
      { a: 'Brian McCann', hint: '#16' }
    ]},
    { name: 'Infielders', note: '5', items: [
      { a: 'Jose Altuve', hint: '#27', alias: ['touve'] },
      { a: 'Alex Bregman', hint: '#2' },
      { a: 'Carlos Correa', hint: '#1' },
      { a: 'Marwin González', hint: '#9', alias: ['marwin gonzalez'] },
      { a: 'Yuli Gurriel', hint: '#10', alias: ['gourriel', 'yulieski', 'yulieski gurriel', 'yuli gourriel', 'yulieski gourriel'] }
    ]},
    { name: 'Outfielders', note: '5', items: [
      { a: 'Carlos Beltrán', hint: '#15', alias: ['carlos beltran'] },
      { a: 'Derek Fisher', hint: '#21' },
      { a: 'Cameron Maybin', hint: '#3' },
      { a: 'Josh Reddick', hint: '#22' },
      { a: 'George Springer', hint: '#4' }
    ]}
  ]
},


{
  // For Jamesyn (10). 8 planets in order from the Sun (NASA science.nasa.gov/solar-system/planets)
  // plus 12 well-known moons (NASA Moons: Facts and Space Place "How Many Moons"). Charon is
  // included only with Pluto clearly labeled as a dwarf planet. Pluto itself is not an answer;
  // it gets a friendly nope, as do the other official dwarf planets.
  slug: 'planets-and-moons',
  title: 'Planets and Moons',
  sub: 'The 8 planets and 12 famous moons',
  blurb: 'Name the 8 planets, from closest to the Sun to farthest, and 12 famous moons. Each moon\'s clue is the world it orbits.',
  category: 'Science',
  tags: ['Kids', 'Space'],
  icon: '🪐',
  mode: 'chill',
  time: 600,
  cols: 'two',
  nope: {
    pluto: 'Pluto is a dwarf planet now. Can you name the 8 planets?',
    ceres: 'Ceres is a dwarf planet. This quiz is the 8 planets and some famous moons.',
    haumea: 'Haumea is a dwarf planet. This quiz is the 8 planets and some famous moons.',
    makemake: 'Makemake is a dwarf planet. This quiz is the 8 planets and some famous moons.',
    eris: 'Eris is a dwarf planet. This quiz is the 8 planets and some famous moons.',
    sun: 'The Sun is a star, not a planet!',
    thesun: 'The Sun is a star, not a planet!'
  },
  groups: [
    { name: 'Planets', note: '8', items: [
      { a: 'Mercury', rk: '1', hint: '1st from the Sun', alias: ['mercery', 'murcury', 'mercurry'] },
      { a: 'Venus', rk: '2', hint: '2nd from the Sun', alias: ['venis'] },
      { a: 'Earth', rk: '3', hint: '3rd from the Sun', alias: ['the earth', 'terra'] },
      { a: 'Mars', rk: '4', hint: '4th from the Sun' },
      { a: 'Jupiter', rk: '5', hint: '5th from the Sun', alias: ['jupitor', 'jupter', 'jupitter'] },
      { a: 'Saturn', rk: '6', hint: '6th from the Sun', alias: ['satturn', 'satern', 'saturns'] },
      { a: 'Uranus', rk: '7', hint: '7th from the Sun', alias: ['uranas'] },
      { a: 'Neptune', rk: '8', hint: '8th from the Sun', alias: ['neptun', 'neptuene', 'neptoon'] }
    ]},
    { name: 'Famous Moons', note: '12', items: [
      { a: 'The Moon', hint: 'Earth', alias: ['moon', 'the moon', 'luna'] },
      { a: 'Phobos', hint: 'Mars', alias: ['phobus', 'fobos'] },
      { a: 'Deimos', hint: 'Mars', alias: ['diemos', 'deimus'] },
      { a: 'Io', hint: 'Jupiter', alias: ['eye oh'] },
      { a: 'Europa', hint: 'Jupiter' },
      { a: 'Ganymede', hint: 'Jupiter', alias: ['ganymed', 'ganymid'] },
      { a: 'Callisto', hint: 'Jupiter', alias: ['calisto', 'kalisto'] },
      { a: 'Titan', hint: 'Saturn' },
      { a: 'Enceladus', hint: 'Saturn', alias: ['enceladous', 'enseladus'] },
      { a: 'Miranda', hint: 'Uranus' },
      { a: 'Triton', hint: 'Neptune' },
      { a: 'Charon', hint: 'Pluto (a dwarf planet)', alias: ['sharon'] }
    ]}
  ]
},

{
  // For Jamesyn (10). 7 continents by land area (CIA World Factbook landmass rankings)
  // and 5 oceans by surface area (NOAA). Australia accepts Oceania; the Southern Ocean
  // accepts Antarctic / Antarctic Ocean. match: 'full' so "America" does not fill both
  // Americas and bare "Ocean" does not fill all five oceans; aliases allow "Pacific"
  // or "Pacific Ocean".
  slug: 'continents-and-oceans',
  title: 'Continents and Oceans',
  sub: 'All 7 continents and all 5 oceans',
  blurb: 'Name all 7 continents and all 5 oceans. The clue is how they rank by size, from largest to smallest.',
  category: 'Geography',
  tags: ['World', 'Kids'],
  mode: 'chill',
  time: 480,
  cols: 'two',
  match: 'full',
  nope: {
    greenland: 'Greenland is a very big island, but it is not a continent.',
    zealandia: 'Some scientists talk about Zealandia, but this quiz uses the 7 continents most people learn in school.',
    centralamerica: 'Central America is part of North America.',
    mediterranean: 'That\'s a sea, not an ocean!',
    mediterraneansea: 'That\'s a sea, not an ocean!',
    caribbean: 'That\'s a sea, not an ocean!',
    caribbeansea: 'That\'s a sea, not an ocean!',
    caspian: 'That\'s a sea, not an ocean!',
    caspiansea: 'That\'s a sea, not an ocean!'
  },
  groups: [
    { name: 'Continents', note: '7', items: [
      { a: 'Asia', rk: '1', hint: 'Largest continent' },
      { a: 'Africa', rk: '2', hint: '2nd largest', alias: ['afrika'] },
      { a: 'North America', rk: '3', hint: '3rd largest' },
      { a: 'South America', rk: '4', hint: '4th largest' },
      { a: 'Antarctica', rk: '5', hint: '5th largest', alias: ['antartica', 'antartika'] },
      { a: 'Europe', rk: '6', hint: '6th largest' },
      { a: 'Australia', rk: '7', hint: 'Smallest continent', alias: ['oceania', 'austrailia', 'australia'] }
    ]},
    { name: 'Oceans', note: '5', items: [
      { a: 'Pacific Ocean', rk: '1', hint: 'Largest ocean', alias: ['pacific', 'the pacific', 'the pacific ocean'] },
      { a: 'Atlantic Ocean', rk: '2', hint: '2nd largest', alias: ['atlantic', 'the atlantic', 'the atlantic ocean'] },
      { a: 'Indian Ocean', rk: '3', hint: '3rd largest', alias: ['indian', 'the indian', 'the indian ocean'] },
      { a: 'Southern Ocean', rk: '4', hint: '4th largest', alias: ['southern', 'the southern', 'the southern ocean', 'antarctic', 'antarctic ocean', 'the antarctic', 'the antarctic ocean'] },
      { a: 'Arctic Ocean', rk: '5', hint: 'Smallest ocean', alias: ['arctic', 'the arctic', 'the arctic ocean'] }
    ]}
  ]
},

];

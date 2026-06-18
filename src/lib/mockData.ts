import { Article, MatchResult, LeagueTableEntry, Transfer, TopScorer, InjuryUpdate } from './types'

export const breakingNewsHeadlines: string[] = [
  "TRANSFER UPDATE: Mbappe seals historic move to Real Madrid on a 5-year deal",
  "FORMULA 1: Hamilton wins Monaco Grand Prix after dramatic final lap overtake",
  "TENNIS: Alcaraz defeats Sinner in a thrilling 5-set French Open classic",
  "SERIE A: Inter Milan secure Scudetto after Milan Derby victory at San Siro",
  "CHAMPIONS LEAGUE: Haaland scores hat-trick to send Manchester City into final",
  "BASKETBALL: Boston Celtics capture NBA Championship title with Game 6 win"
]

export const mockArticles: Article[] = [
  {
    id: "1",
    slug: "mbappe-seals-real-madrid-move",
    title: "Kylian Mbappé Completes Historic Transfer to Real Madrid: 'A Dream Come True'",
    excerpt: "The French superstar has officially put pen to paper on a multi-year deal with the Spanish giants, bringing an end to the longest-running transfer saga in football history.",
    content: "Real Madrid have officially confirmed the signing of Kylian Mbappé on a free transfer. The 27-year-old French World Cup winner has agreed a five-year contract worth a reported €15 million per season after tax, alongside a staggering €150 million signing-on bonus to be paid over the duration of his deal.\n\nSpeaking at his presentation in front of a packed Santiago Bernabéu Stadium, Mbappé could not hide his emotion. 'This is a dream come true. I am incredibly proud to join the club of my dreams and the biggest club in the world. I want to thank the president, Florentino Pérez, for his trust and patience. Now it is time to work and win trophies here,' he said.\n\nMbappé will wear the legendary number 9 shirt, previously worn by compatriots Karim Benzema and Ronaldo Nazário. He joins an already star-studded attack featuring Vinícius Júnior and Jude Bellingham, establishing a formidable frontline that will strike fear into defences across Europe and La Liga next season.",
    category: "Football",
    author: "Marco Rossi",
    publishedAt: "2026-06-18T10:30:00Z",
    imageUrl: "https://picsum.photos/800/450?random=1",
    tags: ["Real Madrid", "Mbappe", "La Liga", "Transfers"],
    readingTime: 3,
    featured: true
  },
  {
    id: "2",
    slug: "hamilton-triumphs-monaco-gp",
    title: "Lewis Hamilton Shines in the Rain to Clinch Sensational Monaco Grand Prix Victory",
    excerpt: "In one of the most chaotic Monaco races in recent history, Hamilton showcased masterclass driving to hold off Max Verstappen on a drying track.",
    content: "Lewis Hamilton drove a tactical masterclass to secure his first victory of the season at a dramatic, rain-affected Monaco Grand Prix. The Mercedes veteran started from third on the grid but capitalized on a pit-lane error by Ferrari and a brilliant tire preservation strategy to claim the top step of the podium.\n\nThe race started behind the safety car as heavy rain lashed down on the Principality. As the track dried out, teams scrambled to make the right tyre choices. Hamilton made the bold decision to stay out on wet tyres longer than his rivals, transitioning directly to slicks and bypassing the intermediate compound altogether.\n\nThis high-risk strategy paid off, giving him a lead he refused to relinquish despite intense pressure from Red Bull's Max Verstappen in the final 15 laps. McLaren's Lando Norris finished third to complete a star-studded podium, while pole-sitter Charles Leclerc suffered more home-race heartbreak, finishing fourth due to a strategic blunder by Scuderia Ferrari.",
    category: "F1",
    author: "David Croft",
    publishedAt: "2026-06-18T09:15:00Z",
    imageUrl: "https://picsum.photos/800/450?random=2",
    tags: ["F1", "Monaco GP", "Lewis Hamilton", "Mercedes"],
    readingTime: 4
  },
  {
    id: "3",
    slug: "alcaraz-sinner-french-open-thriller",
    title: "Carlos Alcaraz Edges Out Jannik Sinner in Five-Set French Open Semi-Final Epic",
    excerpt: "The young stars battled for over four hours on Court Philippe-Chatrier before the Spaniard secured his place in Sunday's Roland Garros final.",
    content: "Carlos Alcaraz came back from two-sets-to-one down to defeat incoming world number one Jannik Sinner in a breathtaking French Open semi-final. The encounter, which lasted four hours and nine minutes, lived up to its billing as the sport's next great rivalry, showcasing tennis of the highest calibre.\n\nSinner looked in control early on, taking the opening set with clinical baseline precision. However, Alcaraz fought back with high-energy rallies and drop-shot wizardry. Both players suffered from physical issues, with Sinner experiencing hand cramps and Alcaraz looking fatigued in the third set, but the drama reached a fever pitch in the decider.\n\nIn the fifth set, Alcaraz broke Sinner's serve in the second game and held his nerve to win 2-6, 6-3, 3-6, 6-4, 6-3. Alcaraz will face Alexander Zverev in the final, searching for his first Roland Garros title and third Grand Slam overall. 'You have to find joy in suffering,' Alcaraz reflected in his post-match interview.",
    category: "Tennis",
    author: "Sarah Jenkins",
    publishedAt: "2026-06-18T08:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=3",
    tags: ["Tennis", "French Open", "Alcaraz", "Sinner"],
    readingTime: 5
  },
  {
    id: "4",
    slug: "celtics-clinch-18th-nba-championship",
    title: "Boston Celtics Dominate Mavericks to Clinch Historic 18th NBA Championship Title",
    excerpt: "Jayson Tatum and Jaylen Brown led the charge as the Celtics surpassed the Lakers for the most championships in NBA history.",
    content: "The Boston Celtics are once again the undisputed kings of the NBA. Behind a spectacular 31-point performance from Jayson Tatum, the Celtics defeated the Dallas Mavericks 106-88 in Game 5 of the NBA Finals at TD Garden, securing a 4-1 series victory and their record-breaking 18th banner.\n\nJaylen Brown, who was named Finals MVP, added 21 points, 8 rebounds, and 6 assists. Brown was instrumental throughout the series, locking down Mavericks star Luka Dončić defensively while hitting timely shots in clutch moments. The Celtics' dominant defense held Dallas to under 100 points for the fourth time in the series.\n\nFor Tatum and Brown, this championship represents the culmination of a eight-year journey together, silencing critics who questioned whether the duo could lead a team to a title. 'It means the world,' Tatum said while holding the Larry O'Brien Trophy. 'It's been a long road, but we believed in ourselves and never stopped working.'",
    category: "Basketball",
    author: "Adrian Wojnarowski",
    publishedAt: "2026-06-17T22:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=4",
    tags: ["NBA", "Celtics", "Jayson Tatum", "Basketball"],
    readingTime: 3
  },
  {
    id: "5",
    slug: "champions-league-final-preview",
    title: "Champions League Final Preview: Manchester City vs Real Madrid Battle for European Glory",
    excerpt: "We analyze the key tactical matchups, injuries, and predicted lineups ahead of the biggest club match of the season at Wembley.",
    content: "Wembley Stadium will play host to a titan clash as defending champions Manchester City take on fourteen-time winners Real Madrid in the UEFA Champions League final. Both sides secured their domestic league titles and are eyeing the ultimate prize in European football.\n\nPep Guardiola's Manchester City will rely heavily on the goalscoring form of Erling Haaland, who has registered 11 goals in the competition this term. The tactical battle in midfield between Kevin De Bruyne and Real Madrid's Jude Bellingham promises to be a deciding factor, with both playmakers capable of turning a match in a single moment.\n\nReal Madrid manager Carlo Ancelotti enters the tie with a near fully fit squad, welcomed by the return of goalkeeper Thibaut Courtois. City, however, are sweating on the fitness of Ruben Dias, who pick up a hamstring niggle in training. The stage is set for a historic match that will define the legacy of these two modern football dynasties.",
    category: "Football",
    author: "Gianluca Di Marzio",
    publishedAt: "2026-06-17T18:45:00Z",
    imageUrl: "https://picsum.photos/800/450?random=5",
    tags: ["Champions League", "Man City", "Real Madrid", "Football"],
    readingTime: 4,
    featured: false
  },
  {
    id: "6",
    slug: "cricket-world-cup-india-victory",
    title: "India Crowned T20 World Cup Champions After Hard-Fought Victory Over South Africa",
    excerpt: "Virat Kohli's majestic half-century and Jasprit Bumrah's death-over masterclass secured a thrilling 7-run victory in Barbados.",
    content: "India broke their 11-year ICC trophy drought by defeating South Africa in an absolute nail-biter to lift the T20 World Cup in Barbados. In what was announced as Virat Kohli's final T20 International, the legendary batsman anchored the innings with a brilliant 76 off 59 balls to propel India to a competitive total of 176/7.\n\nSouth Africa's chase looked well on track with Heinrich Klaasen smashing a rapid half-century. Needing 30 runs off the final 30 balls with six wickets in hand, the Proteas looked poised for victory. However, India's star speedster Jasprit Bumrah turned the game on its head, conceding just 6 runs across the 16th and 18th overs.\n\nWith 16 needed off the final over, Hardik Pandya held his nerve, taking key wickets including Miller, as South Africa finished at 169/8. Emotion poured out on the pitch as skipper Rohit Sharma and Virat Kohli celebrated their final T20I match in style, bowing out at the absolute peak of the shortest format.",
    category: "Cricket",
    author: "Harsha Bhogle",
    publishedAt: "2026-06-17T14:30:00Z",
    imageUrl: "https://picsum.photos/800/450?random=6",
    tags: ["Cricket", "T20 World Cup", "India", "Kohli"],
    readingTime: 3
  },
  {
    id: "7",
    slug: "arsenal-midfield-signing-imminent",
    title: "Arsenal Close in on €50m Midfielder to Partner Declan Rice Next Season",
    excerpt: "Mikel Arteta is set to bolster his engine room with a marquee signing from Serie A, with terms reportedly agreed between both clubs.",
    content: "Arsenal are on the verge of completing their first major signing of the summer window, with negotiations for Real Sociedad's Spanish midfielder Martin Zubimendi entering final stages. Mikel Arteta is keen to add another technical distributor to control games alongside Rice.\n\nThe North London club are prepared to trigger Zubimendi's €50 million release clause. Personal terms have reportedly been agreed on a five-year contract, with the player excited about the project under Arteta and Champions League football.\n\nThis signing represents a significant boost for the Gunners, who narrowly missed out on the Premier League title to Manchester City last season. Zubimendi's composure in possession, defensive awareness, and line-breaking passes make him the ideal profile to elevate Arsenal's midfield structure to the next level.",
    category: "Football",
    author: "Fabrizio Romano",
    publishedAt: "2026-06-17T12:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=7",
    tags: ["Arsenal", "Transfers", "Premier League", "Zubimendi"],
    readingTime: 2
  },
  {
    id: "8",
    slug: "djokovic-wimbledon-participation-doubt",
    title: "Novak Djokovic Casts Doubt Over Wimbledon Participation Following Knee Surgery",
    excerpt: "The seven-time champion is racing against time to recover, stating he will only play if he is fit enough to challenge for the trophy.",
    content: "Novak Djokovic has provided an update on his recovery after undergoing surgery to repair a torn meniscus in his right knee, placing his participation in the upcoming Wimbledon championships in major doubt. The Serbian superstar withdrew from Roland Garros before his quarter-final match due to the injury.\n\nDjokovic has started light rehabilitation but is reluctant to rush his return, especially with the Paris 2024 Olympic Games on clay starting in late July. The Olympics remain the only major accolade missing from Djokovic's illustrious trophy cabinet.\n\n'I am doing everything I can to get back on court as soon as possible, but I will not play Wimbledon just to participate. I will only play if I feel 100% ready to go deep in the tournament and fight for the title,' Djokovic said. If he misses out, it will be the first time since 2004 that he does not feature in the main draw of the grass-court Grand Slam.",
    category: "Tennis",
    author: "Sarah Jenkins",
    publishedAt: "2026-06-16T15:45:00Z",
    imageUrl: "https://picsum.photos/800/450?random=8",
    tags: ["Tennis", "Wimbledon", "Djokovic", "Injury"],
    readingTime: 3
  },
  {
    id: "9",
    slug: "lakers-hire-new-head-coach",
    title: "Los Angeles Lakers Hire JJ Redick as Head Coach on Four-Year Deal",
    excerpt: "The former NBA sharpshooter and media personality takes over the reins at the Lakers, tasking him with maximizing LeBron James' final years.",
    content: "The Los Angeles Lakers have officially hired former NBA player and ESPN analyst JJ Redick as their next head coach. Redick, 41, has agreed to a four-year contract worth approximately $8 million per season, following a thorough search after the firing of Darvin Ham.\n\nRedick, who had a 15-year playing career in the NBA, has never coached at the professional or collegiate level. However, his deep tactical knowledge, highlighted in his basketball podcasts, and his strong relationship with superstar LeBron James made him a compelling candidate for GM Rob Pelinka.\n\n'JJ is a fierce competitor and has an extraordinary basketball IQ. We believe his vision for how we want to play, play development, and connection with players will guide us back to championship contention,' Pelinka said. Redick faces immediate pressure to build a coaching staff capable of supporting his transition and managing the championship expectations of Laker Nation.",
    category: "Basketball",
    author: "Adrian Wojnarowski",
    publishedAt: "2026-06-16T10:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=9",
    tags: ["NBA", "Lakers", "JJ Redick", "LeBron James"],
    readingTime: 3
  },
  {
    id: "10",
    slug: "ferrari-le-mans-24h-victory",
    title: "Ferrari Triumphs at 24 Hours of Le Mans in Spectacular Double for Italian Brand",
    excerpt: "The Ferrari AF Corse #50 crew held off a charging Toyota in a wet and wild race to secure back-to-back Le Mans victories.",
    content: "Ferrari has written another legendary chapter in motorsport history, securing back-to-back victories at the prestigious 24 Hours of Le Mans. The #50 Ferrari 499P Hypercar driven by Antonio Fuoco, Miguel Molina, and Nicklas Nielsen crossed the line just 14 seconds ahead of the #7 Toyota GR010 Hybrid after a gruelling 24 hours.\n\nThe race was characterized by extreme weather conditions, including a record-breaking four-hour safety car period during the night due to torrential rain and poor visibility. Strategic tire changes and fuel management kept Ferrari in a tense battle with Toyota and Porsche until the final laps.\n\nWith Nielsen behind the wheel for the final stint, the team had to manage a loose passenger door and critical fuel levels, but the Danish driver brought the car home to a roaring Italian celebration. 'It is incredible. To win Le Mans twice in a row is something we could only dream of,' Nielsen said.",
    category: "F1",
    author: "David Croft",
    publishedAt: "2026-06-15T16:20:00Z",
    imageUrl: "https://picsum.photos/800/450?random=10",
    tags: ["Motorsport", "Le Mans", "Ferrari", "Endurance"],
    readingTime: 4
  },
  {
    id: "11",
    slug: "cricket-ipl-mega-auction-rules",
    title: "IPL Announces New Mega Auction Retention Rules: Teams Allowed to Keep 6 Players",
    excerpt: "The BCCI has released the guidelines for the upcoming season, introducing a Right to Match option and massive increase in purse limit.",
    content: "The Board of Control for Cricket in India (BCCI) has officially announced the retention rules for the highly anticipated Indian Premier League (IPL) mega auction. In a move that will reshape team dynamics, franchises are allowed to retain up to six players via direct retention or the Right to Match (RTM) card.\n\nThe auction purse has been increased to a record ₹120 crore (approx. $14.5 million USD) per team, up from ₹100 crore last season. Furthermore, the BCCI has implemented a match fee of ₹7.5 lakh per game for players, a first in IPL history, ensuring domestic talent is highly compensated.\n\nFranchises must carefully strategize their expenditures. Under the new guidelines, retaining five capped players will cost a team ₹75 crore, leaving only ₹45 crore for the remaining squad in the auction. Capped Indian players who haven't played international cricket for 5 years will now count as uncapped, opening the door for legends like MS Dhoni to be retained in the lower price category.",
    category: "Cricket",
    author: "Harsha Bhogle",
    publishedAt: "2026-06-15T11:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=11",
    tags: ["IPL", "Cricket", "BCCI", "Auction"],
    readingTime: 3
  },
  {
    id: "12",
    slug: "ryder-cup-captains-announced",
    title: "Ryder Cup Captains Set for Epic Showdown as Team Europe and USA Finalize Leadership",
    excerpt: "Luke Donald and Keegan Bradley will lead their respective teams in next year's highly anticipated golf event in New York.",
    content: "The stage is set for the most intense rivalry in golf, with Luke Donald confirmed to retain his captaincy for Team Europe and Keegan Bradley shockingly named to lead Team USA for the 2025 Ryder Cup at Bethpage Black in Farmingdale, New York.\n\nDonald, who masterminded Europe's victory in Rome in 2023, will seek to become the first European captain to win back-to-back Ryder Cups since Bernhard Langer. He faces a daunting challenge in New York, where American fans are notorious for creating a highly hostile and electric atmosphere.\n\nKeegan Bradley, at 38, will be the youngest US captain since Arnold Palmer in 1963. Bradley's appointment came as a surprise after Tiger Woods turned down the role due to commitments. Bradley is eager to bring the cup back to American soil. 'Bethpage is going to be loud, it's going to be rowdy, and we are going to be ready,' Bradley stated.",
    category: "Golf",
    author: "John Hawkins",
    publishedAt: "2026-06-14T15:30:00Z",
    imageUrl: "https://picsum.photos/800/450?random=12",
    tags: ["Golf", "Ryder Cup", "Donald", "Bradley"],
    readingTime: 2
  },
  {
    id: "13",
    slug: "rugby-six-nations-ireland-defense",
    title: "Ireland Secure Consecutive Six Nations Championships with Dominant Victory Over Scotland",
    excerpt: "Andy Farrell's men put on a tactical clinic at the Aviva Stadium to secure the trophy and cement their place as Northern Hemisphere kings.",
    content: "Ireland have retained their Six Nations crown with a grueling 17-13 victory over Scotland in Dublin. Needing only a draw to secure the championship, Andy Farrell's side withstood a spirited Scottish fightback to lift the trophy in front of a jubilant home crowd.\n\nTries from Dan Sheehan and Andrew Porter, combined with the steady boot of Jack Crowley, built a comfortable lead for Ireland in the second half. Scotland struck back late through Huw Jones to set up a tense final five minutes, but the Irish defense held firm, securing turnovers at critical moments.\n\nWhile Ireland missed out on back-to-back Grand Slams following a defeat to England, their consistency over the five rounds has been unmatched. 'To win back-to-back titles is an incredible achievement. It was a tough test today, but I am proud of the character the boys showed,' skipper Peter O'Mahony remarked.",
    category: "Rugby",
    author: "Rory Lawson",
    publishedAt: "2026-06-14T10:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=13",
    tags: ["Rugby", "Six Nations", "Ireland", "Scotland"],
    readingTime: 3
  },
  {
    id: "14",
    slug: "f1-audi-driver-lineup-rumours",
    title: "Audi F1 Project Accelerates: Rumoured Bid for Top Driver Intensifies",
    excerpt: "With Audi officially entering F1 in 2026, the German manufacturer is reportedly offering a massive contract to secure a world champion driver.",
    content: "The Formula 1 paddock is abuzz with speculation surrounding Audi's driver lineup for their entry in 2026. Audi, who will take over the Sauber team, have already secured Nico Hulkenberg on a multi-year deal, but are actively looking for a marquee name to lead their project.\n\nAccording to inside sources, Audi has submitted a record-breaking contract proposal to Carlos Sainz. The Spaniard, who is departing Ferrari to make room for Lewis Hamilton, is currently weighing options between Audi, Williams, and Alpine.\n\nAudi's CEO, Andreas Seidl, is keen to secure Sainz's signature early to build the chassis and engine development around his feedback. The German giant is reportedly promising a high-tech power unit and substantial resource backing, making them a serious dark horse under the new 2026 technical regulations.",
    category: "F1",
    author: "David Croft",
    publishedAt: "2026-06-13T14:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=14",
    tags: ["F1", "Audi F1", "Carlos Sainz", "Transfers"],
    readingTime: 3
  },
  {
    id: "15",
    slug: "basketball-euroleague-final-four",
    title: "Real Madrid Crowned EuroLeague Basketball Champions After El Clásico Final Triumph",
    excerpt: "An MVP performance by Facundo Campazzo guided the Spanish giants to their 12th continental title in a thrilling final in Berlin.",
    content: "Real Madrid have extended their dominance in European basketball, defeating arch-rivals Barcelona 85-80 to win the EuroLeague Championship in Berlin. The match was a classic El Clásico encounter, filled with lead changes, physical defense, and clutch shooting.\n\nMadrid's point guard Facundo Campazzo was named Final Four MVP, orchestrating the offense with 18 points and 9 assists. Barcelona fought back in the fourth quarter behind Jabari Parker's perimeter shooting, cutting the deficit to a single point with 30 seconds remaining.\n\nHowever, a clutch corner three-pointer by veteran Sergio Llull and subsequent free throws by Campazzo sealed the victory for Real Madrid. This victory marks Madrid's twelfth EuroLeague title, solidifying their standing as the most successful basketball club on the continent.",
    category: "Basketball",
    author: "Marco Rossi",
    publishedAt: "2026-06-13T09:30:00Z",
    imageUrl: "https://picsum.photos/800/450?random=15",
    tags: ["Euroleague", "Real Madrid", "Basketball", "El Clasico"],
    readingTime: 3
  }
]

export const mockMatchResults: MatchResult[] = [
  {
    id: "m1",
    homeTeam: "Italy",
    awayTeam: "Spain",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    minute: 74,
    league: "Nations League",
    matchDate: "2026-06-18T12:00:00Z"
  },
  {
    id: "m2",
    homeTeam: "France",
    awayTeam: "Germany",
    homeScore: 0,
    awayScore: 0,
    status: "live",
    minute: 22,
    league: "International Friendly",
    matchDate: "2026-06-18T12:35:00Z"
  },
  {
    id: "m3",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeScore: 3,
    awayScore: 1,
    status: "ft",
    league: "Premier League",
    matchDate: "2026-06-18T09:00:00Z"
  },
  {
    id: "m4",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 3,
    awayScore: 2,
    status: "ft",
    league: "La Liga",
    matchDate: "2026-06-17T20:00:00Z"
  },
  {
    id: "m5",
    homeTeam: "AC Milan",
    awayTeam: "Inter Milan",
    homeScore: 1,
    awayScore: 2,
    status: "ft",
    league: "Serie A",
    matchDate: "2026-06-17T18:45:00Z"
  },
  {
    id: "m6",
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    homeScore: 4,
    awayScore: 2,
    status: "ft",
    league: "Bundesliga",
    matchDate: "2026-06-17T16:30:00Z"
  },
  {
    id: "m7",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 2,
    awayScore: 0,
    status: "ft",
    league: "Ligue 1",
    matchDate: "2026-06-16T19:00:00Z"
  },
  {
    id: "m8",
    homeTeam: "Juventus",
    awayTeam: "Napoli",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    league: "Serie A",
    matchDate: "2026-06-18T18:45:00Z"
  },
  {
    id: "m9",
    homeTeam: "Liverpool",
    awayTeam: "Manchester Utd",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    league: "Premier League",
    matchDate: "2026-06-19T14:00:00Z"
  },
  {
    id: "m10",
    homeTeam: "Man City",
    awayTeam: "Real Madrid",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    league: "Champions League",
    matchDate: "2026-06-20T19:00:00Z"
  }
]

export const mockLeagueTables: Record<string, LeagueTableEntry[]> = {
  "Premier League": [
    { position: 1, club: "Manchester City", played: 38, won: 28, drawn: 7, lost: 3, goalsFor: 96, goalsAgainst: 34, goalDifference: 62, points: 91 },
    { position: 2, club: "Arsenal", played: 38, won: 27, drawn: 5, lost: 6, goalsFor: 89, goalsAgainst: 29, goalDifference: 60, points: 86 },
    { position: 3, club: "Liverpool", played: 38, won: 24, drawn: 10, lost: 4, goalsFor: 86, goalsAgainst: 41, goalDifference: 45, points: 82 },
    { position: 4, club: "Aston Villa", played: 38, won: 20, drawn: 8, lost: 10, goalsFor: 76, goalsAgainst: 61, goalDifference: 15, points: 68 },
    { position: 5, club: "Tottenham Hotspur", played: 38, won: 20, drawn: 6, lost: 12, goalsFor: 74, goalsAgainst: 61, goalDifference: 13, points: 66 },
    { position: 18, club: "Luton Town", played: 38, won: 6, drawn: 8, lost: 24, goalsFor: 52, goalsAgainst: 85, goalDifference: -33, points: 26 },
    { position: 19, club: "Burnley", played: 38, won: 5, drawn: 9, lost: 24, goalsFor: 41, goalsAgainst: 78, goalDifference: -37, points: 24 },
    { position: 20, club: "Sheffield United", played: 38, won: 3, drawn: 7, lost: 28, goalsFor: 35, goalsAgainst: 104, goalDifference: -69, points: 16 }
  ],
  "La Liga": [
    { position: 1, club: "Real Madrid", played: 38, won: 29, drawn: 8, lost: 1, goalsFor: 87, goalsAgainst: 26, goalDifference: 61, points: 95 },
    { position: 2, club: "Barcelona", played: 38, won: 26, drawn: 7, lost: 5, goalsFor: 79, goalsAgainst: 44, goalDifference: 35, points: 85 },
    { position: 3, club: "Girona", played: 38, won: 25, drawn: 6, lost: 7, goalsFor: 85, goalsAgainst: 46, goalDifference: 39, points: 81 },
    { position: 4, club: "Atletico Madrid", played: 38, won: 24, drawn: 4, lost: 10, goalsFor: 70, goalsAgainst: 43, goalDifference: 27, points: 76 },
    { position: 5, club: "Athletic Bilbao", played: 38, won: 19, drawn: 11, lost: 8, goalsFor: 61, goalsAgainst: 37, goalDifference: 24, points: 68 },
    { position: 18, club: "Cadiz", played: 38, won: 6, drawn: 15, lost: 17, goalsFor: 26, goalsAgainst: 55, goalDifference: -29, points: 33 },
    { position: 19, club: "Almeria", played: 38, won: 3, drawn: 12, lost: 23, goalsFor: 43, goalsAgainst: 75, goalDifference: -32, points: 21 },
    { position: 20, club: "Granada", played: 38, won: 4, drawn: 9, lost: 25, goalsFor: 38, goalsAgainst: 79, goalDifference: -41, points: 21 }
  ],
  "Serie A": [
    { position: 1, club: "Inter Milan", played: 38, won: 29, drawn: 7, lost: 2, goalsFor: 89, goalsAgainst: 22, goalDifference: 67, points: 94 },
    { position: 2, club: "AC Milan", played: 38, won: 22, drawn: 9, lost: 7, goalsFor: 76, goalsAgainst: 49, goalDifference: 27, points: 75 },
    { position: 3, club: "Juventus", played: 38, won: 19, drawn: 14, lost: 5, goalsFor: 54, goalsAgainst: 31, goalDifference: 23, points: 71 },
    { position: 4, club: "Atalanta", played: 38, won: 21, drawn: 6, lost: 11, goalsFor: 72, goalsAgainst: 42, goalDifference: 30, points: 69 },
    { position: 5, club: "Bologna", played: 38, won: 18, drawn: 14, lost: 6, goalsFor: 54, goalsAgainst: 32, goalDifference: 22, points: 68 },
    { position: 18, club: "Frosinone", played: 38, won: 8, drawn: 11, lost: 19, goalsFor: 44, goalsAgainst: 69, goalDifference: -25, points: 35 },
    { position: 19, club: "Sassuolo", played: 38, won: 7, drawn: 9, lost: 22, goalsFor: 43, goalsAgainst: 75, goalDifference: -32, points: 30 },
    { position: 20, club: "Salernitana", played: 38, won: 2, drawn: 11, lost: 25, goalsFor: 32, goalsAgainst: 81, goalDifference: -49, points: 17 }
  ]
}

export const mockTopScorers: TopScorer[] = [
  { rank: 1, player: "Erling Haaland", club: "Manchester City", goals: 27, assists: 5, matches: 31 },
  { rank: 2, player: "Cole Palmer", club: "Chelsea", goals: 22, assists: 11, matches: 34 },
  { rank: 3, player: "Alexander Isak", club: "Newcastle United", goals: 21, assists: 2, matches: 30 },
  { rank: 4, player: "Phil Foden", club: "Manchester City", goals: 19, assists: 8, matches: 35 },
  { rank: 5, player: "Ollie Watkins", club: "Aston Villa", goals: 19, assists: 13, matches: 37 },
  { rank: 6, player: "Lautaro Martínez", club: "Inter Milan", goals: 24, assists: 3, matches: 33 },
  { rank: 7, player: "Artem Dovbyk", club: "Girona", goals: 24, assists: 8, matches: 36 },
  { rank: 8, player: "Kylian Mbappé", club: "PSG", goals: 27, assists: 7, matches: 29 }
]

export const mockTransfers: Transfer[] = [
  {
    id: "t1",
    player: "Kylian Mbappé",
    fromClub: "Paris Saint-Germain",
    toClub: "Real Madrid",
    fee: "Free",
    status: "confirmed",
    date: "2026-06-03"
  },
  {
    id: "t2",
    player: "Martin Zubimendi",
    fromClub: "Real Sociedad",
    toClub: "Arsenal",
    fee: "€50,000,000",
    status: "rumour",
    date: "2026-06-17"
  },
  {
    id: "t3",
    player: "Douglas Luiz",
    fromClub: "Aston Villa",
    toClub: "Juventus",
    fee: "€28,000,000 + Players",
    status: "confirmed",
    date: "2026-06-15"
  },
  {
    id: "t4",
    player: "Victor Osimhen",
    fromClub: "Napoli",
    toClub: "Chelsea",
    fee: "€110,000,000",
    status: "rumour",
    date: "2026-06-18"
  },
  {
    id: "t5",
    player: "Joao Palhinha",
    fromClub: "Fulham",
    toClub: "Bayern Munich",
    fee: "€46,000,000",
    status: "confirmed",
    date: "2026-06-12"
  }
]

export const mockInjuryUpdates: InjuryUpdate[] = [
  {
    id: "i1",
    player: "Novak Djokovic",
    club: "N/A (Tennis)",
    injury: "Knee (Meniscus Tear)",
    expectedReturn: "Late July 2026 (Olympics)",
    status: "Doubtful"
  },
  {
    id: "i2",
    player: "Rodri",
    club: "Manchester City",
    injury: "Hamstring Strain",
    expectedReturn: "Early July 2026",
    status: "Recovering"
  },
  {
    id: "i3",
    player: "Gavi",
    club: "Barcelona",
    injury: "ACL Tear",
    expectedReturn: "August 2026 (Pre-season)",
    status: "Rehabilitation"
  }
]

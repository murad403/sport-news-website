import { Article, Transfer, InjuryUpdate, MatchResult } from "./types"
import { mockArticles, mockTransfers, mockInjuryUpdates, mockMatchResults } from "./mockData"

const articleTranslationsIt: Record<string, Partial<Article>> = {
  "mbappe-seals-real-madrid-move": {
    title: "Kylian Mbappé completa lo storico trasferimento al Real Madrid: 'Un sogno che si avvera'",
    excerpt: "La superstar francese ha ufficialmente firmato un contratto pluriennale con i giganti spagnoli, ponendo fine alla più lunga telenovela di mercato nella storia del calcio.",
    content: "Il Real Madrid ha confermato ufficialmente l'acquisto di Kylian Mbappé a parametro zero. Il ventisettenne francese, vincitore della Coppa del Mondo, ha concordato un contratto quinquennale da circa 15 milioni di euro a stagione netti, oltre a un incredibile bonus alla firma da 150 milioni di euro che verrà pagato durante la durata del suo accordo.\n\nParlando durante la sua presentazione davanti a un Santiago Bernabéu gremito, Mbappé non ha potuto nascondere la sua emozione. 'Questo è un sogno che si avvera. Sono incredibilmente orgoglioso di unirmi al club dei miei sogni e al più grande club del mondo. Voglio ringraziare il presidente, Florentino Pérez, per la sua fiducia e pazienza. Ora è il momento di lavorare e vincere trofei qui,' ha dichiarato.\n\nMbappé indosserà la leggendaria maglia numero 9, indossata in passato dai connazionali Karim Benzema e Ronaldo Nazário. Si unisce a un attacco già stellare con Vinícius Júnior e Jude Bellingham, stabilendo un reparto offensivo formidabile che incuterà timore nelle difese di tutta Europa e della La Liga nella prossima stagione."
  },
  "hamilton-triumphs-monaco-gp": {
    title: "Lewis Hamilton risplende sotto la pioggia e conquista una sensazionale vittoria al GP di Monaco",
    excerpt: "In una delle gare di Monaco più caotiche della storia recente, Hamilton ha mostrato una guida magistrale per tenere a bada Max Verstappen su una pista che andava asciugandosi.",
    content: "Lewis Hamilton ha guidato in modo magistrale per assicurarsi la sua prima vittoria della stagione in un drammatico e piovoso Gran Premio di Monaco. Il veterano della Mercedes è partito terzo in griglia ma ha capitalizzato un errore della Ferrari ai box e una brillante strategia di conservazione degli pneumatici per salire sul gradino più alto del podio.\n\nLa gara è iniziata dietro la safety car mentre una forte pioggia sferzava il Principato. Con l'asciugarsi della pista, i team si sono affrettati a fare le giuste scelte di gomme. Hamilton ha preso la coraggiosa decisione di rimanere in pista con gomme da bagnato più a lungo dei suoi rivali, passando direttamente alle slick ed evitando del tutto la mescola intermedia.\n\nQuesta strategia ad alto rischio ha pagato, dandogli un vantaggio che ha difeso strenuamente nonostante l'intensa pressione di Max Verstappen su Red Bull negli ultimi 15 giri. Lando Norris su McLaren ha concluso terzo per completare un podio stellare, mentre il poleman Charles Leclerc ha subito un'altra delusione nella sua gara di casa, finendo quarto a causa di un pasticcio strategico della Scuderia Ferrari."
  },
  "alcaraz-sinner-french-open-thriller": {
    title: "Carlos Alcaraz supera Jannik Sinner in un'epica semifinale al Roland Garros in cinque set",
    excerpt: "Le giovani stelle hanno lottato per oltre quattro ore sul campo Philippe-Chatrier prima che lo spagnolo si assicurasse un posto nella finale di domenica.",
    content: "Carlos Alcaraz ha rimontato da due set a uno di svantaggio per sconfiggere il futuro numero uno del mondo Jannik Sinner in una semifinale mozzafiato del Roland Garros. L'incontro, durato quattro ore e nove minuti, ha rispettato le aspettative per quella che è considerata la prossima grande rivalità dello sport, mostrando un tennis di altissimo livello.\n\nSinner è sembrato in controllo all'inizio, vincendo il primo set con precisione clinica da fondo campo. Tuttavia, Alcaraz ha risposto con scambi ad alta intensità e magie in smorzata. Entrambi i giocatori hanno accusato problemi fisici, con Sinner colpito da crampi alle mani e Alcaraz apparso affaticato nel terzo set, ma il dramma ha raggiunto il culmine nel parziale decisivo.\n\nNel quinto set, Alcaraz ha strappato il servizio a Sinner nel secondo game e ha mantenuto i nervi saldi vincendo per 2-6, 6-3, 3-6, 6-4, 6-3. Alcaraz affronterà Alexander Zverev in finale, a caccia del suo primo titolo al Roland Garros e del terzo Slam complessivo. 'Devi trovare la gioia nella sofferenza,' ha riflettuto Alcaraz nella sua intervista post-partita."
  },
  "celtics-clinch-18th-nba-championship": {
    title: "Boston Celtics dominano i Mavericks e conquistano lo storico 18° titolo NBA",
    excerpt: "Jayson Tatum e Jaylen Brown hanno guidato la carica mentre i Celtics superano i Lakers per il maggior numero di titoli nella storia dell'NBA.",
    content: "I Boston Celtics sono ancora una volta i re indiscussi dell'NBA. Dietro a una spettacolare prestazione da 31 punti di Jayson Tatum, i Celtics hanno sconfitto i Dallas Mavericks 106-88 in Gara 5 delle NBA Finals al TD Garden, assicurandosi una vittoria per 4-1 nella serie e il loro record-breaking 18° stendardo.\n\nJaylen Brown, nominato MVP delle Finals, ha aggiunto 21 punti, 8 rimbalzi e 6 assist. Brown è stato fondamentale durante tutta la serie, limitando difensivamente la stella dei Mavericks Luka Dončić e segnando tiri cruciali nei momenti chiave. La difesa dominante dei Celtics ha tenuto Dallas sotto i 100 punti per la quarta volta nella serie.\n\nPer Tatum e Brown, questo campionato rappresenta il culmine di un viaggio di otto anni insieme, mettendo a tacere i critici che dubitavano che la coppia potesse guidare una squadra al titolo. 'Significa il mondo,' ha detto Tatum tenendo in mano il Larry O'Brien Trophy. 'È stata una lunga strada, ma abbiamo creduto in noi stessi e non abbiamo mai smesso di lavorare.'"
  },
  "champions-league-final-preview": {
    title: "Anteprima Finale Champions League: Battaglia tra Manchester City e Real Madrid per la Gloria Europea",
    excerpt: "Analizziamo i duelli tattici chiave, gli infortuni e le formazioni previste in vista della partita di club più importante della stagione a Wembley.",
    content: "Lo stadio di Wembley ospiterà uno scontro tra titani quando i campioni in carica del Manchester City affronteranno i quattordici volte vincitori del Real Madrid nella finale di UEFA Champions League. Entrambe le squadre si sono assicurate i rispettivi titoli nazionali ed ora puntano al premio finale del calcio europeo.\n\nIl Manchester City di Pep Guardiola si affiderà molto alla forma realizzativa di Erling Haaland, autore di 11 gol nella competizione in questa stagione. La battaglia tattica a centrocampo tra Kevin De Bruyne e Jude Bellingham del Real Madrid promette di essere un fattore decisivo, con entrambi i registi in grado di svoltare la partita in un solo istante.\n\nL'allenatore del Real Madrid Carlo Ancelotti entra in gara con una squadra quasi al completo, rallegrato dal ritorno del portiere Thibaut Courtois. Il City, invece, è in ansia per le condizioni fisiche di Ruben Dias, che ha accusato un fastidio al bicipite femorale in allenamento. Tutto è pronto per una partita storica che definirà l'eredità di queste due moderne dinastie calcistiche."
  },
  "cricket-world-cup-india-victory": {
    title: "India incoronata campione del mondo T20 dopo una combattuta vittoria sul Sudafrica",
    excerpt: "La maestosa mezza serie di Virat Kohli e la classe di Jasprit Bumrah negli ultimi over assicurano una emozionante vittoria per 7 run alle Barbados.",
    content: "L'India ha interrotto il suo digiuno di trofei ICC durato 11 anni sconfiggendo il Sudafrica in un finale mozzafiato per sollevare la Coppa del Mondo T20 nelle Barbados. In quella che è stata annunciata come l'ultima partita internazionale T20 di Virat Kohli, il leggendario battitore ha guidato l'attacco con uno splendido 76 su 59 palline per spingere l'India a un totale competitivo di 176/7.\n\nL'inseguimento del Sudafrica sembrava ben avviato con Heinrich Klaasen che ha segnato una rapida mezza serie. Con la necessità di 30 run nelle ultime 30 palline e sei wicket in mano, i Proteas sembravano pronti alla vittoria. Tuttavia, la stella dell'India Jasprit Bumrah ha capovolto la partita, concedendo solo 6 run tra il 16° e il 18° over.\n\nCon 16 necessari nell'ultimo over, Hardik Pandya ha mantenuto la calma prendendo wicket chiave come quello di Miller, mentre il Sudafrica ha chiuso a 169/8. Grande emozione sul campo mentre il capitano Rohit Sharma e Virat Kohli celebravano la loro ultima partita T20I con stile, ritirandosi al vertice del formato più breve."
  },
  "arsenal-midfield-signing-imminent": {
    title: "L'Arsenal si avvicina a un centrocampista da 50 milioni di euro da affiancare a Declan Rice",
    excerpt: "Mikel Arteta è pronto a rinforzare la sua mediana con un acquisto di spessore dalla Serie A, con accordi ormai raggiunti tra i club.",
    content: "L'Arsenal è sul punto di completare il suo primo grande acquisto della finestra estiva, con le trattative per il centrocampista spagnolo della Real Sociedad Martin Zubimendi entrate nelle fasi finali. Mikel Arteta vuole aggiungere un altro distributore tecnico per controllare le partite insieme a Rice.\n\nIl club del nord di Londra è pronto ad attivare la clausola rescissoria da 50 milioni di euro di Zubimendi. I termini personali sarebbero stati concordati su un contratto quinquennale, con il giocatore entusiasta del progetto sotto Arteta e del calcio di Champions League.\n\nQuesto acquisto rappresenta una spinta significativa per i Gunners, che hanno mancato di poco il titolo di Premier League a favore del Manchester City la scorsa stagione. La calma in possesso palla di Zubimendi, la consapevolezza difensiva e i passaggi chiave lo rendono il profilo ideale per elevare il centrocampo dell'Arsenal al livello successivo."
  },
  "djokovic-wimbledon-participation-doubt": {
    title: "Novak Djokovic in dubbio per Wimbledon dopo l'operazione al ginocchio",
    excerpt: "Il sette volte campione sta correndo contro il tempo per recuperare, dichiarando che giocherà solo se abbastanza in forma da lottare per il trofeo.",
    content: "Novak Djokovic ha fornito un aggiornamento sul suo recupero dopo aver subito un intervento chirurgico per riparare una lesione al menisco del ginocchio destro, ponendo in serio dubbio la sua partecipazione al prossimo torneo di Wimbledon. La superstar serba si era ritirata dal Roland Garros prima del suo match nei quarti di finale a causa dell'infortunio.\n\nDjokovic ha iniziato una leggera riabilitazione ma non ha intenzione di affrettare il rientro, soprattutto con i Giochi Olimpici di Parigi 2024 sulla terra battuta a fine luglio. Le Olimpiadi rimangono l'unico grande trofeo mancante nella straordinaria bacheca di Djokovic.\n\n'Sto facendo tutto il possibile per tornare in campo il prima possibile, ma non giocherò a Wimbledon solo per partecipare. Giocherò solo se mi sentirò al 100% pronto per andare in fondo al torneo e lottare per il titolo,' ha detto Djokovic. Se dovesse mancare, sarà la prima volta dal 2004 che non figurerà nel tabellone principale dello Slam su erba."
  },
  "lakers-hire-new-head-coach": {
    title: "I Los Angeles Lakers assumono JJ Redick come capo allenatore con un accordo quadriennale",
    excerpt: "L'ex tiratore NBA e personaggio dei media prende le redini dei Lakers con il compito di massimizzare gli ultimi anni di LeBron James.",
    content: "I Los Angeles Lakers hanno assunto ufficialmente l'ex giocatore NBA e analista di ESPN JJ Redick come prossimo capo allenatore. Redick, 41 anni, ha concordato un contratto di quattro anni da circa 8 milioni di dollari a stagione, a seguito di una approfondita ricerca dopo il licenziamento di Darvin Ham.\n\nRedick, che ha avuto una carriera da giocatore di 15 anni nella NBA, non ha mai allenato a livello professionistico o collegiale. Tuttavia, la sua profonda conoscenza tattica, evidenziata nei suoi podcast sul basket, e la sua forte relazione con la superstar LeBron James lo hanno reso un candidato convincente per il GM Rob Pelinka.\n\n'JJ è un concorrente feroce e ha un QI cestistico straordinario. Crediamo che la sua visione di gioco, lo sviluppo dei giocatori e la connessione con gli atleti ci riporteranno in corsa per il titolo,' ha detto Pelinka. Redick affronta un'immediata pressione per costruire uno staff tecnico in grado di supportare la sua transizione e gestire le aspettative di vittoria di Laker Nation."
  },
  "ferrari-le-mans-24h-victory": {
    title: "La Ferrari trionfa alla 24 Ore di Le Mans: Storica doppietta per il marchio italiano",
    excerpt: "L'equipaggio della Ferrari AF Corse #50 ha tenuto a bada una agguerrita Toyota in una gara bagnata e selvaggia, assicurandosi la seconda vittoria consecutiva a Le Mans.",
    content: "La Ferrari ha scritto un altro capitolo leggendario nella storia dell'automobilismo, assicurandosi la seconda vittoria consecutiva nella prestigiosa 24 Ore di Le Mans. La Ferrari 499P Hypercar #50 guidata da Antonio Fuoco, Miguel Molina e Nicklas Nielsen ha tagliato il traguardo con soli 14 secondi di vantaggio sulla Toyota GR010 Hybrid #7 dopo 24 ore estenuanti.\n\nLa gara è stata caratterizzata da condizioni meteorologiche estreme, incluso un periodo record di quattro ore di safety car durante la notte a causa della pioggia battente e della scarsa visibilità. Cambi di gomme strategici e la gestione del carburante hanno tenuto la Ferrari in una lotta serrata con Toyota e Porsche fino agli ultimi giri.\n\nCon Nielsen al volante per l'ultimo turno, il team ha dovuto gestire una portiera del passeggero allentata e livelli di carburante critici, ma il pilota danese ha portato la macchina al traguardo dando inizio alle grandi celebrazioni italiane. 'È incredibile. Vincere Le Mans due volte di fila è qualcosa che potevamo solo sognare,' ha detto Nielsen."
  },
  "cricket-ipl-mega-auction-rules": {
    title: "L'IPL annuncia le nuove regole per l'asta mega: i team possono trattenere fino a 6 giocatori",
    excerpt: "La BCCI ha pubblicato le linee guida per la prossima stagione, introducendo l'opzione Right to Match e un massiccio aumento del budget.",
    content: "Il Board of Control for Cricket in India (BCCI) ha annunciato ufficialmente le regole di trattenimento per la mega asta dell'Indian Premier League (IPL). Con una mossa che rimodellerà le dinamiche delle squadre, le franchigie possono trattenere fino a sei giocatori tramite trattenimento diretto o la carta Right to Match (RTM).\n\nIl budget d'asta per ogni team è stato aumentato alla cifra record di 120 crore di rupie (circa 14,5 milioni di dollari USD), rispetto ai 100 crore della scorsa stagione. Inoltre, la BCCI ha implementato per la prima volta nella storia dell'IPL una quota partita di 7,5 lakh a gara per i giocatori, garantendo alti compensi ai talenti nazionali.\n\nLe franchigie devono pianificare attentamente le spese. Secondo le nuove linee guida, trattenere cinque giocatori con contratto nazionale costerà a un team 75 crore di rupie, lasciandone solo 45 per il resto della rosa nell'asta. I giocatori nazionali che non giocano a livello internazionale da 5 anni conteranno come non convocati, aprendo la porta a leggende come MS Dhoni per essere trattenuti nella fascia di prezzo inferiore."
  },
  "ryder-cup-captains-announced": {
    title: "Annunciati i capitani della Ryder Cup: Team Europe e USA definiscono la leadership per la sfida",
    excerpt: "Luke Donald e Keegan Bradley guideranno le rispettive squadre nel tanto atteso evento di golf il prossimo anno a New York.",
    content: "Tutto è pronto per la più accesa rivalità nel golf, con Luke Donald confermato alla guida del Team Europe e Keegan Bradley a sorpresa nominato per guidare il Team USA per la Ryder Cup 2025 al Bethpage Black di Farmingdale, New York.\n\nDonald, che ha orchestrato la vittoria dell'Europa a Roma nel 2023, cercherà di diventare il primo capitano europeo a vincere Ryder Cup consecutive dai tempi di Bernhard Langer. Affronterà una sfida formidabile a New York, dove i tifosi americani sono noti per creare un'atmosfera estremamente ostile ed elettrizzante.\n\nKeegan Bradley, a 38 anni, sarà il più giovane capitano degli Stati Uniti dai tempi di Arnold Palmer nel 1963. La nomina di Bradley è stata una sorpresa dopo che Tiger Woods ha rifiutato il ruolo a causa di altri impegni. Bradley è ansioso di riportare la coppa sul suolo americano. 'Bethpage sarà rumorosa, calda e noi saremo pronti,' ha dichiarato Bradley."
  },
  "rugby-six-nations-ireland-defense": {
    title: "L'Irlanda si assicura due vittorie consecutive nel Sei Nazioni grazie a un trionfo sulla Scozia",
    excerpt: "Gli uomini di Andy Farrell tengono una lezione tattica all'Aviva Stadium per assicurarsi il trofeo e confermarsi re del Sei Nazioni.",
    content: "L'Irlanda ha conservato la corona del Sei Nazioni con una sofferta vittoria per 17-13 sulla Scozia a Dublino. Con il solo bisogno di un pareggio per assicurarsi il campionato, la squadra di Andy Farrell ha resistito a un coraggioso contrattacco scozzese per sollevare il trofeo davanti a un pubblico di casa in festa.\n\nLe mete di Dan Sheehan e Andrew Porter, combinate con il calcio preciso di Jack Crowley, hanno costruito un comodo vantaggio per l'Irlanda nel secondo tempo. La Scozia ha risposto nel finale con Huw Jones, regalando cinque minuti di pura tensione alla fine, ma la difesa irlandese ha retto saldamente, conquistando possessi decisivi.\n\nAnche se l'Irlanda ha mancato il Grande Slam consecutivo a causa di una sconfitta contro l'Inghilterra, la loro costanza nell'arco dei cinque turni è stata ineguagliabile. 'Vincere titoli consecutivi è un risultato incredibile. Oggi è stato un test duro, ma sono orgoglioso del carattere mostrato dai ragazzi,' ha commentato il capitano Peter O'Mahony."
  },
  "f1-audi-driver-lineup-rumours": {
    title: "Il progetto Audi F1 accelera: Si intensificano le voci per l'acquisto di un top driver",
    excerpt: "Con l'ingresso ufficiale di Audi in F1 nel 2026, il produttore tedesco starebbe offrendo un contratto colossale per assicurarsi un campione del mondo.",
    content: "Il paddock di Formula 1 è in fermento per le speculazioni sulla formazione dei piloti Audi per il debutto nel 2026. Audi, che rileverà il team Sauber, ha già ingaggiato Nico Hulkenberg con un contratto pluriennale, ma sta cercando attivamente un nome di spicco per guidare il proprio progetto.\n\nSecondo fonti interne, Audi ha presentato una proposta di contratto record a Carlos Sainz. Lo spagnolo, in uscita dalla Ferrari per fare spazio a Lewis Hamilton, sta attualmente valutando le opzioni tra Audi, Williams e Alpine.\n\nL'amministratore delegato di Audi, Andreas Seidl, vuole assicurarsi la firma di Sainz in anticipo per sviluppare il telaio e il motore sulla base dei suoi feedback. Il colosso tedesco promette un'unità di potenza ad alta tecnologia e ingenti risorse, rendendolo una seria mina vagante con le nuove regole tecniche del 2026."
  },
  "basketball-euroleague-final-four": {
    title: "Il Real Madrid è campione dell'Eurolega dopo il trionfo nel Clásico in finale",
    excerpt: "Una prestazione da MVP di Facundo Campazzo guida i giganti spagnoli al loro 12° titolo continentale in un'entusiasmante finale a Berlino.",
    content: "Il Real Madrid ha esteso la sua egemonia nel basket europeo sconfiggendo i rivali storici del Barcellona per 85-80, vincendo la finale di Eurolega a Berlino. La partita è stata un classico El Clásico, ricco di cambi di vantaggio, difese fisiche e tiri decisivi.\n\nIl playmaker del Real Madrid Facundo Campazzo è stato nominato MVP delle Final Four, orchestrando l'attacco con 18 punti e 9 assist. Il Barcellona ha lottato nel quarto quarto grazie ai tiri da tre di Jabari Parker, riducendo lo svantaggio a un solo punto a 30 secondi dalla fine.\n\nTuttavia, una tripla decisiva dall'angolo del veterano Sergio Llull e i successivi tiri liberi di Campazzo hanno blindato la vittoria per il Real Madrid. Questo trionfo segna il dodicesimo titolo di Eurolega del Madrid, consolidando la sua posizione come squadra di basket di maggior successo nel continente."
  }
}

const transferTranslationsIt: Record<string, Partial<Transfer>> = {
  "t1": { player: "Kylian Mbappé", fromClub: "Paris Saint-Germain", toClub: "Real Madrid", fee: "Gratuito" },
  "t2": { player: "Martin Zubimendi", fromClub: "Real Sociedad", toClub: "Arsenal", fee: "€50.000.000" },
  "t3": { player: "Douglas Luiz", fromClub: "Aston Villa", toClub: "Juventus", fee: "€28.000.000 + Contropartite" },
  "t4": { player: "Victor Osimhen", fromClub: "Napoli", toClub: "Chelsea", fee: "€110.000.000" },
  "t5": { player: "Joao Palhinha", fromClub: "Fulham", toClub: "Bayern Monaco", fee: "€46.000.000" }
}

const injuryTranslationsIt: Record<string, Partial<InjuryUpdate>> = {
  "i1": { player: "Novak Djokovic", club: "N/D (Tennis)", injury: "Ginocchio (Lesione Menisco)", expectedReturn: "Fine Luglio 2026 (Olimpiadi)", status: "In dubbio" },
  "i2": { player: "Rodri", club: "Manchester City", injury: "Stiramento al Bicipite Femorale", expectedReturn: "Inizio Luglio 2026", status: "In recupero" },
  "i3": { player: "Gavi", club: "Barcellona", injury: "Rottura Legamento Crociato", expectedReturn: "Agosto 2026 (Pre-stagione)", status: "Riabilitazione" }
}

const matchTranslationsIt: Record<string, Partial<MatchResult>> = {
  "m1": { homeTeam: "Italia", awayTeam: "Spagna", league: "Nations League" },
  "m2": { homeTeam: "Francia", awayTeam: "Germania", league: "Amichevole Internazionale" },
  "m3": { homeTeam: "Arsenal", awayTeam: "Chelsea", league: "Premier League" },
  "m4": { homeTeam: "Real Madrid", awayTeam: "Barcellona", league: "La Liga" },
  "m5": { homeTeam: "AC Milan", awayTeam: "Inter", league: "Serie A" },
  "m6": { homeTeam: "Bayern Monaco", awayTeam: "Dortmund", league: "Bundesliga" },
  "m7": { homeTeam: "PSG", awayTeam: "Marsiglia", league: "Ligue 1" },
  "m8": { homeTeam: "Juventus", awayTeam: "Napoli", league: "Serie A" },
  "m9": { homeTeam: "Liverpool", awayTeam: "Manchester Utd", league: "Premier League" },
  "m10": { homeTeam: "Man City", awayTeam: "Real Madrid", league: "Champions League" }
}

const categoryTranslationsIt: Record<string, string> = {
  "Football": "Calcio",
  "Tennis": "Tennis",
  "Basketball": "Basket",
  "F1": "F1",
  "Cricket": "Cricket",
  "Golf": "Golf",
  "Rugby": "Rugby",
  "General": "Generale"
}

// Localizer Helper Functions
export function getLocalArticles(lang: string): Article[] {
  if (lang === "en") return mockArticles
  return mockArticles.map((article) => {
    const translation = articleTranslationsIt[article.id] || articleTranslationsIt[article.slug] || {}
    const localizedCategory = categoryTranslationsIt[article.category] || article.category
    
    // Localize tags
    const localizedTags = article.tags.map(tag => {
      if (tag === "Real Madrid") return "Real Madrid"
      if (tag === "Transfers") return "Calciomercato"
      if (tag === "Basketball") return "Basket"
      if (tag === "Injury") return "Infortuni"
      if (tag === "Endurance") return "Resistenza"
      return tag
    })

    return {
      ...article,
      title: translation.title || article.title,
      excerpt: translation.excerpt || article.excerpt,
      content: translation.content || article.content,
      category: localizedCategory,
      tags: localizedTags
    }
  })
}

export function getLocalArticleBySlug(slug: string, lang: string): Article | undefined {
  const articles = getLocalArticles(lang)
  return articles.find((a) => a.slug === slug)
}

export function getLocalTransfers(lang: string): Transfer[] {
  if (lang === "en") return mockTransfers
  return mockTransfers.map((transfer) => {
    const translation = transferTranslationsIt[transfer.id] || {}
    return {
      ...transfer,
      player: translation.player || transfer.player,
      fromClub: translation.fromClub || transfer.fromClub,
      toClub: translation.toClub || transfer.toClub,
      fee: translation.fee || transfer.fee
    }
  })
}

export function getLocalInjuries(lang: string): InjuryUpdate[] {
  if (lang === "en") return mockInjuryUpdates
  return mockInjuryUpdates.map((injury) => {
    const translation = injuryTranslationsIt[injury.id] || {}
    return {
      ...injury,
      player: translation.player || injury.player,
      club: translation.club || injury.club,
      injury: translation.injury || injury.injury,
      expectedReturn: translation.expectedReturn || injury.expectedReturn,
      status: translation.status || injury.status
    }
  })
}

export function getLocalMatchResults(lang: string): MatchResult[] {
  if (lang === "en") return mockMatchResults
  return mockMatchResults.map((match) => {
    const translation = matchTranslationsIt[match.id] || {}
    return {
      ...match,
      homeTeam: translation.homeTeam || match.homeTeam,
      awayTeam: translation.awayTeam || match.awayTeam,
      league: translation.league || match.league
    }
  })
}

export function getLocalCategoryName(category: string, lang: string): string {
  if (lang === "en") return category
  return categoryTranslationsIt[category] || category
}

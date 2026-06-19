export type Locale = "it" | "en"

export const defaultLocale: Locale = "it"

export const translations = {
  it: {
    common: {
      followUs: "SEGUICI:",
      searchPlaceholder: "Cerca notizie sportive...",
      breaking: "ULTIMISSIME",
      readMore: "Leggi l'articolo completo",
      readLess: "Mostra meno",
      logoText: "⚽ SportsPulse",
      allRightsReserved: "Tutti i diritti riservati. Replicato a scopo dimostrativo.",
      quickLinks: "LINK RAPIDI",
      sports: "SPORT",
      legalContact: "NOTE LEGALI & CONTATTI",
      footerDesc: "SportsPulse è una piattaforma leader di notizie sportive professionali che fornisce risultati in tempo reale, ultimissime notizie, aggiornamenti sul calciomercato e analisi statistiche approfondite a livello globale.",
      headlines: [
        "CHAMPIONS LEAGUE: Haaland segna una tripletta e trascina il Manchester City in finale",
        "BASKET: Boston Celtics vincono il titolo NBA con la vittoria in Gara 6",
        "CALCIOMERCATO: Mbappe firma uno storico trasferimento al Real Madrid con un contratto di 5 anni",
        "FORMULA 1: Hamilton vince il Gran Premio di Monaco dopo un sorpasso drammatico all'ultimo giro",
        "TENNIS: Alcaraz batte Sinner in una entusiasmante finale al Roland Garros in 5 set",
        "SERIE A: L'Inter si assicura lo Scudetto dopo il trionfo nel Derby di Milano"
      ]
    },
    auth: {
      signInTitle: "Accedi",
      signUpTitle: "Crea il tuo account",
      withApple: "Accedi con Apple",
      withFacebook: "Accedi con Facebook",
      withGoogle: "Accedi con Google",
      withEmail: "Accedi con email e password",
      regWithEmail: "Registrati con email e password",
      emailLabel: "Indirizzo Email",
      passwordLabel: "Password",
      nameLabel: "Nome Completo",
      signInBtn: "Accedi",
      registerBtn: "Registrati",
      noAccount: "Non hai un account?",
      haveAccount: "Hai già un account?",
      registerLink: "Registrati",
      loginLink: "Accedi",
      backBtn: "Torna alle opzioni"
    },
    navigation: {
      home: "Home",
      football: "Calcio",
      soccerResults: "Risultati Calcio",
      tennis: "Tennis",
      basketball: "Basket",
      f1: "F1",
      playerUpdates: "Aggiornamenti Giocatori",
      statistics: "Statistiche",
      sponsors: "Sponsor",
      community: "Community",
      aboutUs: "Chi Siamo",
      contact: "Contatti"
    },
    home: {
      liveScores: "Risultati in tempo reale",
      featured: "Articoli in evidenza",
      latestNews: "Ultime notizie",
      noScores: "Nessuna partita in corso"
    },
    soccerResults: {
      title: "Risultati Calcio & Partite",
      subtitle: "Copertura in tempo reale dei campionati europei e mondiali.",
      today: "Oggi",
      yesterday: "Ieri",
      week: "Questa settimana",
      loadMore: "Carica altri risultati",
      vs: "VS"
    },
    statistics: {
      title: "Statistiche & Classifiche",
      subtitle: "Classifiche dettagliate dei campionati e statistiche dei migliori marcatori.",
      leagueStandings: "Classifica Campionato",
      topScorers: "Classifica Marcatori",
      playerStats: "Statistiche Giocatori",
      searchPlayers: "Cerca giocatori...",
      noPlayers: "Nessun giocatore trovato.",
      tableHeaders: {
        pos: "POS",
        club: "SQUADRA",
        pts: "PT",
        p: "G",
        w: "V",
        d: "N",
        l: "P",
        gd: "DR"
      },
      legend: {
        cl: "Champions League (Fase a gironi)",
        el: "Europa League (Fase a gironi)",
        relegation: "Retrocessione"
      }
    },
    playerUpdates: {
      title: "Calciomercato & Bollettino Infortuni",
      subtitle: "Aggiornamenti in tempo reale sui trasferimenti e resoconto medico dei giocatori.",
      transfersBoard: "Tabellone Calciomercato",
      injuryBulletin: "Bollettino Infortuni",
      noInjuries: "Nessun infortunio recente segnalato.",
      headers: {
        player: "Giocatore",
        from: "Da",
        to: "A",
        fee: "Costo",
        status: "Stato",
        team: "Squadra",
        injury: "Infortunio",
        return: "Rientro"
      }
    },
    sponsors: {
      title: "I Nostri Sponsor & Offerte Partner",
      subtitle: "Sostieni SportsPulse collaborando con i nostri marchi ufficiali.",
      becomePartner: "Diventa un Partner Oggi",
      advertisingPackages: "Pacchetti Pubblicitari",
      choosePackage: "Scegli il pacchetto di visibilità più adatto ai tuoi obiettivi aziendali e al tuo budget.",
      popular: "Più Popolare",
      visitWebsite: "Visita il Sito Ufficiale"
    },
    contact: {
      title: "Ufficio Contatti SportsPulse",
      subtitle: "Mettiti in contatto con la nostra redazione e il supporto tecnico.",
      corporateOffice: "Ufficio Stampa & Sede",
      faqTitle: "Domande Frequenti (FAQ)",
      formTitle: "Inviaci un Messaggio",
      nameLabel: "Il tuo nome",
      emailLabel: "Indirizzo Email",
      subjectLabel: "Oggetto",
      messageLabel: "Il tuo messaggio",
      sendBtn: "Invia Messaggio",
      successMsg: "Messaggio inviato!",
      successDetail: "Grazie per averci contattato. Ti risponderemo al più presto.",
      faq: [
        { q: "Come posso inviare un articolo per la Community?", a: "Accedi al tuo account e clicca sul pulsante 'Scrivi Articolo' nella sezione Community." },
        { q: "Come vengono aggiornati i risultati delle partite?", a: "I nostri dati in tempo reale vengono aggiornati automaticamente ogni 30 secondi tramite i nostri feed partner." },
        { q: "Quali sono le opportunità di partnership disponibili?", a: "Consulta la nostra pagina Sponsor o inviaci un messaggio tramite il form specificando l'oggetto 'Partnership'." }
      ]
    },
    community: {
      title: "SportsPulse Fan Forum",
      subtitle: "La sezione della community in cui gli utenti scrivono e pubblicano i propri articoli, analisi e opinioni.",
      writeArticle: "Scrivi Articolo",
      modalTitle: "Scrivi Articolo Community",
      publishedMsg: "Articolo Pubblicato!",
      publishedDetail: "La tua analisi è stata aggiunta con successo al feed del Fan Forum.",
      nicknameLabel: "Il tuo Nickname",
      titleLabel: "Titolo dell'articolo",
      categoryLabel: "Categoria Sport",
      excerptLabel: "Breve riassunto (Frase singola)",
      contentLabel: "Contenuto dell'articolo (Corpo)",
      imageLabel: "Immagine dell'articolo",
      removeImage: "Rimuovi immagine",
      publishBtn: "Pubblica nel Fan Forum",
      guidelinesTitle: "Linee guida per la pubblicazione",
      guidelines: [
        "Sii educato e rispettoso: evita insulti, molestie o polemiche tossiche con altri tifosi.",
        "Resta in tema: gli articoli devono essere rilevanti per squadre, giocatori o analisi sportive.",
        "Nessuna violazione del copyright: evita di copiare e incollare interi articoli. Scrivi con parole tue.",
        "Revisione editoriale: i redattori si riservano il diritto di archiviare i post che violano le linee guida."
      ],
      joinStaffTitle: "Vuoi unirti allo staff?",
      joinStaffText: "Se i tuoi articoli della community dimostrano analisi di alta qualità e coinvolgono i nostri lettori, il nostro team editoriale ti contatterà per offrirti opportunità di scrittura ufficiale!"
    }
  },
  en: {
    common: {
      followUs: "FOLLOW US:",
      searchPlaceholder: "Search sports news...",
      breaking: "BREAKING",
      readMore: "Read Full Article",
      readLess: "Read Less",
      logoText: "⚽ SportsPulse",
      allRightsReserved: "All rights reserved. Replicated for demonstration purposes.",
      quickLinks: "QUICK LINKS",
      sports: "SPORTS",
      legalContact: "LEGAL & CONTACT",
      footerDesc: "SportsPulse is a leading professional sports news platform providing real-time scores, breaking news, transfer updates, and in-depth statistical match analysis across the globe.",
      headlines: [
        "CHAMPIONS LEAGUE: Haaland scores hat-trick to send Manchester City into final",
        "BASKETBALL: Boston Celtics capture NBA Championship title with Game 6 win",
        "TRANSFER UPDATE: Mbappe seals historic move to Real Madrid on a 5-year deal",
        "FORMULA 1: Hamilton wins Monaco Grand Prix after dramatic final lap overtake",
        "TENNIS: Alcaraz defeats Sinner in a thrilling 5-set French Open classic",
        "SERIE A: Inter Milan secure Scudetto after Milan Derby triumph"
      ]
    },
    auth: {
      signInTitle: "Sign in",
      signUpTitle: "Create your account",
      withApple: "Sign in with Apple",
      withFacebook: "Log in with Facebook",
      withGoogle: "Sign in with Google",
      withEmail: "Log in with email and password",
      regWithEmail: "Register with email and password",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      nameLabel: "Full Name",
      signInBtn: "Sign In",
      registerBtn: "Register",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      registerLink: "Register",
      loginLink: "Sign in",
      backBtn: "Back to options"
    },
    navigation: {
      home: "Home",
      football: "Football",
      soccerResults: "Soccer Results",
      tennis: "Tennis",
      basketball: "Basketball",
      f1: "F1",
      playerUpdates: "Player Updates",
      statistics: "Statistics",
      sponsors: "Sponsors",
      community: "Community",
      aboutUs: "About Us",
      contact: "Contact"
    },
    home: {
      liveScores: "Live Scores",
      featured: "Featured Articles",
      latestNews: "Latest News",
      noScores: "No matches in progress"
    },
    soccerResults: {
      title: "Soccer Results & Fixtures",
      subtitle: "Real-time coverage of leagues across Europe and global competitions.",
      today: "Today",
      yesterday: "Yesterday",
      week: "This Week",
      loadMore: "Load More Results",
      vs: "VS"
    },
    statistics: {
      title: "Statistics & Standings",
      subtitle: "Detailed league tables and player rankings across top competitions.",
      leagueStandings: "League Standings",
      topScorers: "Top Scorers",
      playerStats: "Player Statistics",
      searchPlayers: "Search players...",
      noPlayers: "No players found.",
      tableHeaders: {
        pos: "POS",
        club: "CLUB",
        pts: "PTS",
        p: "P",
        w: "W",
        d: "D",
        l: "L",
        gd: "GD"
      },
      legend: {
        cl: "Champions League (Group Stage)",
        el: "Europa League (Group Stage)",
        relegation: "Relegation"
      }
    },
    playerUpdates: {
      title: "Transfers & Injuries bulletin",
      subtitle: "Real-time updates on active player transfers and medical room reports.",
      transfersBoard: "Transfers Board",
      injuryBulletin: "Injury Bulletin",
      noInjuries: "No active injuries reported.",
      headers: {
        player: "Player",
        from: "From",
        to: "To",
        fee: "Fee",
        status: "Status",
        team: "Team",
        injury: "Injury",
        return: "Expected Return"
      }
    },
    sponsors: {
      title: "Sponsors & Partner Deals",
      subtitle: "Support SportsPulse by checking out our official brand partners.",
      becomePartner: "Become a Partner Today",
      advertisingPackages: "Advertising Packages",
      choosePackage: "Choose the visibility package that matches your business goal and budget.",
      popular: "Most Popular",
      visitWebsite: "Visit Partner Site"
    },
    contact: {
      title: "SportsPulse Contact Desk",
      subtitle: "Get in touch with our editorial newsroom and technical support desk.",
      corporateOffice: "Corporate Office & Newsroom",
      faqTitle: "Frequently Asked Questions (FAQ)",
      formTitle: "Send Us A Message",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      sendBtn: "Send Message",
      successMsg: "Message Sent!",
      successDetail: "Thank you for contacting us. We will get back to you shortly.",
      faq: [
        { q: "How can I submit a community article?", a: "Sign in to your account and click the 'Write Article' button in the Community section." },
        { q: "How often are scores updated?", a: "Our live data is updated automatically every 30 seconds from our partner soccer feeds." },
        { q: "What advertising options are available?", a: "Please see our Sponsors page or send us a message using the partnership subject option." }
      ]
    },
    community: {
      title: "SportsPulse Fan Forum",
      subtitle: "The community section where users write and publish their own articles, analysis and opinions.",
      writeArticle: "Write Article",
      modalTitle: "Write Community Article",
      publishedMsg: "Article Published!",
      publishedDetail: "Your analysis has been successfully added to the Fan Forum feed.",
      nicknameLabel: "Your Nickname",
      titleLabel: "Article Title",
      categoryLabel: "Sport Category",
      excerptLabel: "Short Summary Excerpt (Single sentence)",
      contentLabel: "Article Content (Body)",
      imageLabel: "Article Image",
      removeImage: "Remove Image",
      publishBtn: "Publish to Fan Forum",
      guidelinesTitle: "Posting Guidelines",
      guidelines: [
        "Be Civil & Respectful: Avoid insults, harassment or toxic arguments with other fans.",
        "Keep it Sports Related: Articles and columns must be relevant to sports teams, players or analytics.",
        "No Copyright Violation: Avoid copy-pasting entire articles. Write in your own words.",
        "Editorial Review: The editors reserve the right to archive posts violating community standards."
      ],
      joinStaffTitle: "Want to join the staff?",
      joinStaffText: "If your community articles demonstrate high-quality analysis and engage our readers, our editorial team will reach out to pitch official staff writing opportunities!"
    }
  }
}

export function getTranslation(lang: string) {
  const normalized = (lang?.toLowerCase() === "en" ? "en" : "it") as Locale
  return translations[normalized]
}

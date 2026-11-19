import type { Locale } from './types';

export type UiMessages = {
  nav: {
    home: string;
    menu: string;
    pizzas: string;
    dailySpecials: string;
    history: string;
    gallery: string;
    infos: string;
    reservation: string;
    reservationContact: string;
    admin: string;
    events: string;
    mainAria: string;
    mobileAria: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    switchToLight: string;
    switchToDark: string;
  };
  common: {
    bookTable: string;
    seeMenu: string;
    viewFullMenu: string;
    reserveTable: string;
    contactRoom: string;
    callRestaurant: string;
    writeWhatsApp: string;
    openDirections: string;
    openGpsMap: string;
    openItinerary: string;
    askGroupQuote: string;
    modifyReservation: string;
    confirmRequest: string;
    add: string;
    added: string;
    addToCart: string;
    addedCount: string;
    viewCart: string;
    closeCart: string;
    yourCart: string;
    currentOrder: string;
    cartEmpty: string;
    remove: string;
    removeUnit: string;
    addUnit: string;
    totalToPay: string;
    pricesNote: string;
    validateOrder: string;
    emptyCart: string;
    orderNote: string;
    closePreview: string;
    previousPhoto: string;
    nextPhoto: string;
    enlargePhoto: string;
    preparedToOrder: string;
    preparedMinute: string;
    accordingToArrival: string;
    article: string;
    articles: string;
    liveMenu: string;
    ratherBook: string;
    group15: string;
    person: string;
    people: string;
  };
  home: {
    location: string;
    taglineFallback: string;
    intro: string;
    heroAlt: string;
    viewMenuBtn: string;
    itineraryBtn: string;
    hoursLabel: string;
    outdoorLabel: string;
    outdoorValue: string;
    indoorLabel: string;
    indoorValue: string;
    reservationLabel: string;
    signatureKicker: string;
    signatureTitle: string;
    signatureAll: string;
    dailySpecialKicker: string;
    dailySpecialTitle: string;
    dailySpecialAll: string;
    eventsKicker: string;
    eventsTitle: string;
    eventsAll: string;
    eventsEmpty: string;
    eventsNextBadge: string;
    reviewsKicker: string;
    reviewsTitle: string;
    avgRatingAria: string;
    avgRating: string;
    certified: string;
  };
  menu: {
    kicker: string;
    title: string;
    intro: string;
    tabsAria: string;
    all: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    dessertsDrinks: string;
    categories: {
      breakfast: string;
      lunch: string;
      dinner: string;
      dessertsDrinks: string;
    };
    chooseOption: string;
    noDailySpecial: string;
    empty: string;
    headings: {
      breakfast: { title: string; hours: string };
      lunch: { title: string; hours: string };
      dinner: { title: string; hours: string };
      dessertsDrinks: { title: string; hours: string };
    };
    chefSuggestion: string;
    cartAria: string;
    cartCount: string;
    customerInfoTitle: string;
    customerName: string;
    customerWhatsApp: string;
    customerNamePlaceholder: string;
    customerWhatsAppPlaceholder: string;
    customerRequired: string;
  };
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    filtersAria: string;
    all: string;
    terrace: string;
    room: string;
    dishes: string;
    events: string;
  };
  history: {
    kicker: string;
    title: string;
    intro1: string;
    intro2: string;
    discoverMenu: string;
    pillarsKicker: string;
    pillarsTitle: string;
    pillars: { title: string; description: string }[];
    teamKicker: string;
    teamTitle: string;
    heroAlt: string;
  };
  reservation: {
    kicker: string;
    title: string;
    intro: string;
    seatingLegend: string;
    terraceTitle: string;
    terraceDetail: string;
    roomTitle: string;
    roomDetail: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    date: string;
    time: string;
    guests: string;
    email: string;
    emailPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    serviceHours: string;
    confirmedKicker: string;
    confirmedTitle: string;
    confirmedThanks: string;
    dateTime: string;
    covers: string;
    seating: string;
    phoneLabel: string;
    confirmWhatsApp: string;
    directLine: string;
    contactWithoutWaiting: string;
    whatsappQuick: string;
    mapKicker: string;
    mapTitle: string;
    mapAlt: string;
    viewLandmark: string;
    whatsappPrefill: string;
  };
  infos: {
    kicker: string;
    title: string;
    intro: string;
    accessKicker: string;
    accessTitle: string;
    accessText: string;
    takeawayKicker: string;
    takeawayTitle: string;
    takeawayText: string;
    paymentKicker: string;
    paymentTitle: string;
    faqKicker: string;
    faqTitle: string;
  };
  events: {
    kicker: string;
    title: string;
    intro: string;
    all: string;
    filtersAria: string;
    empty: string;
    dateLabel: string;
    timeLabel: string;
    locationLabel: string;
    free: string;
    priceOnRequest: string;
    bookTickets: string;
    ticketsRemaining: string;
    salePoints: string;
    buyOnline: string;
    ticketFormTitle: string;
    ticketQuantity: string;
    ticketName: string;
    ticketPhone: string;
    ticketEmail: string;
    ticketSubmit: string;
    ticketSending: string;
    ticketConfirmTitle: string;
    ticketConfirmText: string;
    ticketReference: string;
    ticketWhatsapp: string;
    ticketError: string;
    organizeTitle: string;
    organizeText: string;
    organizeCta: string;
  };
  footer: {
    description: string;
    navigation: string;
    location: string;
    rights: string;
    taglineLine: string;
    ownerSpace: string;
    openItinerary: string;
    menuLink: string;
    historyLink: string;
    galleryLink: string;
    eventsLink: string;
    reservationLink: string;
    infosLink: string;
  };
  dashboard: {
    title: string;
    backToSite: string;
    tabs: {
      overview: string;
      dishes: string;
      menuCategories: string;
      dailySpecials: string;
      events: string;
      info: string;
      gallery: string;
      team: string;
      faq: string;
      media: string;
      clients: string;
    };
    status: {
      live: string;
      local: string;
      checking: string;
    };
    logout: string;
    setup: {
      title: string;
      notice: string;
      varsTitle: string;
      help: string;
    };
    login: {
      kicker: string;
      title: string;
      intro: string;
      email: string;
      password: string;
      submit: string;
      submitting: string;
    };
    clients: {
      title: string;
      description: string;
      refresh: string;
      deleteAll: string;
      deleteAllConfirm: string;
      count: string;
      empty: string;
      deleted: string;
      cleared: string;
      deleteError: string;
      loadError: string;
      order: string;
      reservation: string;
      ticket: string;
      deleteRecord: string;
      note: string;
      migrationNotice: string;
    };
    editors: {
      common: {
        save: string;
        cancel: string;
        edit: string;
        delete: string;
        close: string;
        refresh: string;
        show: string;
        hide: string;
        visible: string;
        hidden: string;
        order: string;
        title: string;
        description: string;
        image: string;
        modify: string;
        addNew: string;
      };
      overview: {
        kicker: string;
        title: string;
        description: string;
        statDishes: string;
        statGallery: string;
        statTeam: string;
        statFaq: string;
        statCategories: string;
        statEvents: string;
        importNew: string;
        importNewConfirm: string;
        syncTitle: string;
        sourceLabel: string;
        sourceSupabase: string;
        sourceLocal: string;
        liveLabel: string;
        liveActive: string;
        liveInactive: string;
        noDataNotice: string;
        migrationNotice: string;
        importMissing: string;
        imported: string;
        viewSite: string;
        howTitle: string;
        how1: string;
        how2: string;
        how3: string;
        how4: string;
      };
      menu: {
        title: string;
        description: string;
        all: string;
        editDish: string;
        newDish: string;
        name: string;
        priceKmf: string;
        category: string;
        noCategory: string;
        priceOptions: string;
        priceOptionsHint: string;
        optionLabel: string;
        optionPrice: string;
        addOption: string;
        removeOption: string;
        moment: string;
        section: string;
        badge: string;
        badgeHint: string;
        order: string;
        descriptionField: string;
        photo: string;
        showOnSite: string;
        signature: string;
        saved: string;
        deleted: string;
        shown: string;
        hidden: string;
        empty: string;
        hiddenBadge: string;
        signatureBadge: string;
      };
      menuCategories: {
        title: string;
        description: string;
        newCategory: string;
        editCategory: string;
        name: string;
        descriptionField: string;
        showOnSite: string;
        saved: string;
        deleted: string;
        empty: string;
        hiddenBadge: string;
      };
      dailySpecials: {
        title: string;
        description: string;
        newSpecial: string;
        editSpecial: string;
        dishName: string;
        descriptionField: string;
        priceKmf: string;
        image: string;
        startDate: string;
        endDate: string;
        availability: string;
        showOnSite: string;
        saved: string;
        deleted: string;
        empty: string;
        hiddenBadge: string;
      };
      events: {
        title: string;
        description: string;
        newEvent: string;
        editEvent: string;
        eventTitle: string;
        descriptionField: string;
        category: string;
        date: string;
        endDate: string;
        time: string;
        location: string;
        priceKmf: string;
        freeHint: string;
        ticketPriceKmf: string;
        ticketsAvailable: string;
        salePoints: string;
        ticketingUrl: string;
        ticketHint: string;
        bookTicketsBadge: string;
        seatsBadge: string;
        image: string;
        showOnSite: string;
        saved: string;
        deleted: string;
        empty: string;
        hiddenBadge: string;
        categoriesTitle: string;
        categoriesHint: string;
        newCategory: string;
        categoryName: string;
        categoryDescription: string;
        categorySaved: string;
        categoryDeleted: string;
        categoryDeleteConfirm: string;
        categoryInUse: string;
        deleteConfirm: string;
      };
      settings: {
        title: string;
        description: string;
        saved: string;
        restaurantName: string;
        tagline: string;
        address: string;
        country: string;
        phoneDisplay: string;
        phoneLink: string;
        whatsappLink: string;
        whatsappHint: string;
        email: string;
        hoursSummary: string;
        directionsLink: string;
        latitude: string;
        longitude: string;
        heroImage: string;
        chefTitle: string;
        chefDescription: string;
        chefHeading: string;
        chefSubtitle: string;
        chefDish: string;
        chefPrice: string;
        chefAvailability: string;
        saveButton: string;
      };
      gallery: {
        title: string;
        description: string;
        newPhoto: string;
        editPhoto: string;
        category: string;
        caption: string;
        showInGallery: string;
        saved: string;
        deleted: string;
        hiddenBadge: string;
      };
      brigade: {
        title: string;
        description: string;
        newMember: string;
        name: string;
        role: string;
        tenure: string;
        bio: string;
        showOnSite: string;
        saved: string;
        deleted: string;
      };
      faq: {
        title: string;
        description: string;
        newQuestion: string;
        question: string;
        answer: string;
        showOnSite: string;
        saved: string;
        deleted: string;
      };
      media: {
        title: string;
        description: string;
        upload: string;
        uploading: string;
        imported: string;
        uploadError: string;
        listError: string;
        copyUrl: string;
        copied: string;
        empty: string;
      };
      errorUnknown: string;
      errorValidation: string;
    };
  };
  pages: {
    accueil: string;
    menu: string;
    pizzas: string;
    platsDuJour: string;
    histoire: string;
    galerie: string;
    reservation: string;
    infos: string;
    evenements: string;
    admin: string;
  };
};

export const ui: Record<Locale, UiMessages> = {
  fr: {
    nav: {
      home: 'Accueil',
      menu: 'Menu',
      pizzas: 'Pizzas',
      dailySpecials: 'Plats du jour',
      history: 'Histoire',
      gallery: 'Galerie',
      infos: 'Infos pratiques',
      reservation: 'Réserver',
      reservationContact: 'Réservation & Contact',
      admin: 'Administration',
      events: 'Événements',
      mainAria: 'Navigation principale',
      mobileAria: 'Navigation mobile',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      skipToContent: 'Aller au contenu',
      switchToLight: 'Activer le mode clair',
      switchToDark: 'Activer le mode sombre',
    },
    common: {
      bookTable: 'Réserver une table',
      seeMenu: 'Voir la Carte',
      viewFullMenu: 'Consulter toute la carte',
      reserveTable: 'Réserver une table',
      contactRoom: 'Contacter la salle',
      callRestaurant: 'Appeler le restaurant',
      writeWhatsApp: 'Écrire sur WhatsApp',
      openDirections: 'Itinéraire Place de France',
      openGpsMap: 'Ouvrir la carte GPS',
      openItinerary: 'Itinéraire GPS Place de France',
      askGroupQuote: 'Demander un devis groupe',
      modifyReservation: 'Modifier la réservation',
      confirmRequest: 'Confirmer la demande',
      add: 'Ajouter',
      added: 'Ajouté',
      addToCart: 'Ajouter au panier',
      addedCount: 'Ajouté ({count})',
      viewCart: 'Voir le panier ({count}) · {total}',
      closeCart: 'Fermer le panier',
      yourCart: 'Votre panier',
      currentOrder: 'Commande en cours',
      cartEmpty:
        'Aucun plat sélectionné. Ajoutez un plat depuis la carte pour composer votre commande.',
      remove: 'Retirer {name} du panier',
      removeUnit: 'Retirer une unité de {name}',
      addUnit: 'Ajouter une unité de {name}',
      totalToPay: 'Total à régler sur place',
      pricesNote: 'Les prix sont indiqués en francs comoriens, taxes comprises.',
      validateOrder: 'Valider la commande',
      emptyCart: 'Vider le panier',
      orderNote:
        'Le détail de la commande est pré-rempli dans WhatsApp. Le restaurant confirme la disponibilité et le délai de préparation avant le règlement sur place.',
      closePreview: 'Fermer l’aperçu',
      previousPhoto: 'Photo précédente',
      nextPhoto: 'Photo suivante',
      enlargePhoto: 'Agrandir la photo : {title}',
      preparedToOrder: 'Préparé à la commande',
      preparedMinute: 'Préparé minute',
      accordingToArrival: 'Selon arrivage',
      article: 'article',
      articles: 'articles',
      liveMenu: 'Carte mise à jour en direct',
      ratherBook: 'Réserver une table plutôt',
      group15: 'Groupe (15+ personnes)',
      person: 'personne',
      people: 'personnes',
    },
    home: {
      location: 'Place de France · Moroni, Grande Comore',
      taglineFallback: 'Cuisine française et européenne au cœur de Moroni',
      intro:
        'Du café matinal dès 07h00 aux dîners sous les arbres de la Place de France, Le New Select marie la tradition bistrot aux pêches fraîches et épices de l’océan Indien.',
      heroAlt:
        'Terrasse ombragée du restaurant Le New Select sur la Place de France à Moroni',
      viewMenuBtn: 'Voir la Carte',
      itineraryBtn: 'Itinéraire Place de France',
      hoursLabel: 'Horaires d’ouverture',
      outdoorLabel: 'Cadre extérieur',
      outdoorValue: 'Terrasse sous les badamiers',
      indoorLabel: 'Confort intérieur',
      indoorValue: 'Salle climatisée & Wi-Fi',
      reservationLabel: 'Réservation & emporter',
      signatureKicker: 'Sélection de la maison · Tarifs en Francs Comoriens',
      signatureTitle: 'Les trois plats phares',
      signatureAll: 'Consulter toute la carte',
      dailySpecialKicker: 'Plat du jour · Selon les arrivages',
      dailySpecialTitle: 'Le plat du jour',
      dailySpecialAll: 'Voir tous les plats du jour',
      eventsKicker: 'Événements à venir · Place de France',
      eventsTitle: 'Événements à venir',
      eventsAll: 'Tous les événements',
      eventsEmpty: 'Aucun événement à venir pour le moment.',
      eventsNextBadge: 'Prochain rendez-vous',
      reviewsKicker: 'Retours vérifiés · TripAdvisor Moroni',
      reviewsTitle: 'Avis de nos hôtes et voyageurs',
      avgRatingAria: 'Note moyenne : 4,6 sur 5',
      avgRating: '4,6 / 5',
      certified: 'Avis certifiés TripAdvisor',
    },
    menu: {
      kicker: 'La Carte & Menus · Tarifs nets en Francs Comoriens (KMF)',
      title: 'Une carte rythmée par les heures du jour',
      intro:
        'Du petit-déjeuner matinal aux grillades du soir, nos assiettes sont préparées à la commande avec les pêches côtières de Grande Comore. Sélectionnez vos plats, le total se calcule automatiquement et votre commande part directement sur WhatsApp.',
      tabsAria: 'Filtrer la carte par moment de la journée',
      all: 'Toute la carte',
      breakfast: 'Petit-déjeuner · dès 07h00',
      lunch: 'Déjeuner · 12h–15h',
      dinner: 'Dîner · 18h30–23h',
      dessertsDrinks: 'Desserts & Boissons',
      categories: {
        breakfast: 'Petit-déjeuner',
        lunch: 'Déjeuner',
        dinner: 'Dîner',
        dessertsDrinks: 'Desserts & Boissons',
      },
      chooseOption: 'Choisir l’option',
      noDailySpecial: 'Aucun plat du jour prévu pour le moment.',
      empty: 'Aucun plat disponible pour ce service.',
      headings: {
        breakfast: {
          title: 'Petit-déjeuner',
          hours: 'Servi dès 07h00 jusqu’à 10h30 en terrasse et en salle',
        },
        lunch: {
          title: 'Déjeuner',
          hours: 'Servi de 12h00 à 15h00 · Formules et carte complète',
        },
        dinner: {
          title: 'Dîner',
          hours: 'Servi de 18h30 à 23h00 · Grillades, poissons et classiques bistrot',
        },
        dessertsDrinks: {
          title: 'Desserts maison & Boissons',
          hours: 'Pâtisseries du jour, jus frais pressés et cafés',
        },
      },
      chefSuggestion: 'Suggestion du chef',
      cartAria: 'Votre commande',
      cartCount: '{count} {label}',
      customerInfoTitle: 'Vos coordonnées',
      customerName: 'Nom',
      customerWhatsApp: 'Numéro WhatsApp',
      customerNamePlaceholder: 'Votre nom',
      customerWhatsAppPlaceholder: '+269 3XX XX XX',
      customerRequired:
        'Veuillez indiquer votre nom et votre numéro WhatsApp pour valider la commande.',
    },
    gallery: {
      kicker: 'Galerie Photo · Ambiances & Assiettes',
      title: 'Sous les badamiers et en cuisine',
      intro:
        'Parcourez la terrasse de la Place de France, la salle climatisée et nos assiettes préparées au fil de la journée.',
      filtersAria: 'Filtrer la galerie photo',
      all: 'Toutes les vues',
      terrace: 'Terrasse',
      room: 'Salle',
      dishes: 'Plats',
      events: 'Événements',
    },
    history: {
      kicker: 'Notre Histoire · Moroni, Place de France',
      title: 'Une table ouverte sur la Place de France',
      intro1:
        'Installé face aux arcades historiques de la Place de France, Le New Select s’est imposé au fil des années comme un point de rencontre familier au cœur de Moroni. On s’y retrouve dès sept heures du matin pour un café serré avant d’ouvrir les bureaux, pour un déjeuner d’affaires en salle climatisée ou pour un dîner paisible sous l’ombre des badamiers.',
      intro2:
        'Notre maison défend une cuisine lisible et sincère : des techniques bistrot françaises appliquées avec exigence aux trésors maritimes et agricoles de Grande Comore.',
      discoverMenu: 'Découvrir la carte',
      pillarsKicker: 'Philosophie culinaire',
      pillarsTitle: 'Nos trois fondations',
      pillars: [
        {
          title: 'Esprit bistrot français',
          description:
            'Cuissons précises, sauces montées au beurre, fonds réduits sur place et accueil attentif : une rigueur culinaire héritée de la brasserie traditionnelle.',
        },
        {
          title: 'Produits frais de l’océan Indien',
          description:
            'Capitaine, thon jaune, mérou et langoustes proviennent des débarquements matinaux des pêcheurs de Moroni, Itsandra et Mitsamiouli.',
        },
        {
          title: 'Approvisionnements locaux de Ngazidja',
          description:
            'Vanille Bourbon, poivre vert, girofle, combava, brèdes et manioc des hauteurs du Karthala signent chaque assiette d’une identité comorienne.',
        },
      ],
      teamKicker: 'Équipe en cuisine et en salle',
      teamTitle: 'La brigade et les maîtres de rang',
      heroAlt: 'Salle climatisée et boiseries du restaurant Le New Select à Moroni',
    },
    reservation: {
      kicker: 'Réservation & Contact · Moroni, Place de France',
      title: 'Réserver votre table',
      intro:
        'Choisissez votre placement en terrasse sous les arbres ou dans la salle climatisée. Confirmation immédiate ou par téléphone au ',
      seatingLegend: 'Choix de placement',
      terraceTitle: 'Terrasse ombragée',
      terraceDetail: 'Sous les badamiers · Vue Place de France',
      roomTitle: 'Salle climatisée',
      roomDetail: 'Boiseries calmes · Idéal déjeuners d’affaires',
      fullName: 'Nom complet *',
      fullNamePlaceholder: 'Ex. : Aminata Said',
      phone: 'Téléphone / WhatsApp *',
      phonePlaceholder: '+269 3XX XX XX',
      date: 'Date *',
      time: 'Heure d’arrivée',
      guests: 'Couverts',
      email: 'E-mail (optionnel)',
      emailPlaceholder: 'nom@exemple.com',
      notes: 'Précisions ou allergies',
      notesPlaceholder: 'Chaise haute, table calme, sans crustacés...',
      serviceHours: 'Service continu de 07h00 à 23h00',
      confirmedKicker: 'Référence {ref}',
      confirmedTitle: 'Demande de réservation enregistrée',
      confirmedThanks:
        'Merci {name}. Votre demande est prête ; transmettez-la via WhatsApp pour une prise en charge immédiate par notre maître d’hôtel.',
      dateTime: 'Date & Heure',
      covers: 'Nombre de couverts',
      seating: 'Placement souhaité',
      phoneLabel: 'Téléphone',
      confirmWhatsApp: 'Confirmer via WhatsApp',
      directLine: 'Ligne directe',
      contactWithoutWaiting: 'Contacter la salle sans attendre',
      whatsappQuick: 'Réponse rapide',
      mapKicker: 'Situation géographique · Moroni',
      mapTitle: 'Plan de la Place de France',
      mapAlt:
        'Carte schématique de la Place de France à Moroni et repères autour du restaurant Le New Select',
      viewLandmark: 'Voir le repère : {name}',
      whatsappPrefill: 'Bonjour Le New Select, je souhaite réserver une table.',
    },
    infos: {
      kicker: 'Informations Pratiques · Moroni',
      title: 'Préparer votre venue au New Select',
      intro:
        'Accès, stationnement autour de la Place de France, moyens de paiement et réponses aux questions fréquentes.',
      accessKicker: '01. Accès & Stationnement',
      accessTitle: 'Aux abords de la Place de France',
      accessText:
        'Situé en plein centre-ville de Moroni, le restaurant est accessible à pied depuis les ministères, banques, ambassades et le port. Des places de stationnement public longent la Place de France et la rue adjacente, à moins de cinquante mètres de l’entrée de la terrasse.',
      takeawayKicker: '02. À emporter & Groupes',
      takeawayTitle: 'Vente à emporter et grandes tables',
      takeawayText:
        'Tous les plats de la carte peuvent être commandés à emporter pour vos bureaux ou votre domicile en appelant vingt minutes avant votre passage. Pour les groupes de 8 à 30 couverts (déjeuners officiels, réunions, dîners familiaux), nous privatisons une zone de la salle climatisée ou de la terrasse.',
      paymentKicker: 'Règlement sur place ou à emporter',
      paymentTitle: 'Moyens de paiement acceptés',
      faqKicker: 'Services en salle et en terrasse',
      faqTitle: 'Foire aux questions',
    },
    events: {
      kicker: 'Événements · Le New Select, Moroni',
      title: 'Événements à venir',
      intro:
        'Soirées musicales, célébrations et rencontres professionnelles : découvrez les prochains rendez-vous du New Select, sous les badamiers de la Place de France ou dans notre salle climatisée.',
      all: 'Tous les événements',
      filtersAria: 'Filtrer les événements par catégorie',
      empty: 'Aucun événement à venir dans cette catégorie.',
      dateLabel: 'Date',
      timeLabel: 'Heure',
      locationLabel: 'Lieu',
      free: 'Gratuit',
      priceOnRequest: 'Prix sur demande',
      bookTickets: 'Réserver des billets',
      ticketsRemaining: '{count} place(s) restante(s)',
      salePoints: 'Points de vente',
      buyOnline: 'Acheter en ligne',
      ticketFormTitle: 'Réserver des billets — {title}',
      ticketQuantity: 'Nombre de billets',
      ticketName: 'Nom complet',
      ticketPhone: 'WhatsApp / Téléphone',
      ticketEmail: 'E-mail (optionnel)',
      ticketSubmit: 'Envoyer la réservation',
      ticketSending: 'Envoi en cours…',
      ticketConfirmTitle: 'Réservation de billets enregistrée',
      ticketConfirmText:
        'Votre demande a bien été enregistrée (référence {ref}). Notre équipe vous contactera pour confirmer et régler vos billets.',
      ticketReference: 'Référence',
      ticketWhatsapp: 'Finaliser sur WhatsApp',
      ticketError: 'Impossible d’enregistrer la demande. Réessayez ou contactez-nous.',
      organizeTitle: 'Organiser un événement',
      organizeText:
        'Anniversaire, mariage, soirée d’équipe ou réception officielle : notre équipe compose un menu et un espace sur mesure pour vos invités.',
      organizeCta: 'Demander un devis',
    },
    footer: {
      description:
        'Une maison ouverte chaque jour sur la Place de France, entre produits frais de l’océan Indien et savoir-faire bistrot.',
      navigation: 'Navigation',
      location: 'Moroni · Place de France',
      rights: '© {year} {name} · Moroni, Union des Comores',
      taglineLine: 'Terrasse ombragée · Salle climatisée · Vente à emporter',
      ownerSpace: 'Espace propriétaire',
      openItinerary: 'Ouvrir l’itinéraire Place de France',
      menuLink: 'La Carte & Menus',
      historyLink: 'Notre Histoire',
      galleryLink: 'Galerie Photo',
      eventsLink: 'Événements',
      reservationLink: 'Réservation & Contact',
      infosLink: 'Informations Pratiques',
    },
    dashboard: {
      title: 'Administration',
      backToSite: 'Retour au site',
      tabs: {
        overview: 'Tableau de bord',
        dishes: 'Plats',
        menuCategories: 'Catégories de la carte',
        dailySpecials: 'Plats du jour',
        events: 'Événements',
        info: 'Informations',
        gallery: 'Galerie',
        team: 'Équipe',
        faq: 'FAQ',
        media: 'Médias',
        clients: 'Clients',
      },
      status: {
        live: 'Synchronisation active',
        local: 'Mode local',
        checking: 'Vérification de l’accès…',
      },
      logout: 'Déconnexion',
      setup: {
        title: 'Configuration Supabase requise',
        notice:
          'Le dashboard est prêt, mais la clé publique Supabase n’est pas encore définie dans l’environnement de l’application.',
        varsTitle: 'Variables à définir :',
        help: 'Ajoutez-les dans .env.local en local, puis dans les variables d’environnement Vercel. Exécutez ensuite supabase/migrations/001_lns_site_content.sql dans le SQL Editor de Supabase. Seule la clé anon est exposée au navigateur : la clé service_role ne doit jamais être utilisée ici.',
      },
      login: {
        kicker: 'Espace propriétaire',
        title: 'Connexion',
        intro:
          'Réservé au propriétaire du restaurant. Utilisez le compte Supabase Auth autorisé.',
        email: 'E-mail',
        password: 'Mot de passe',
        submit: 'Se connecter',
        submitting: 'Connexion…',
      },
      clients: {
        title: 'Clients & demandes',
        description:
          'Données enregistrées automatiquement lorsqu’un client valide une commande (panier) ou confirme une demande de réservation.',
        refresh: 'Actualiser',
        deleteAll: 'Tout supprimer',
        deleteAllConfirm: 'Supprimer tous les enregistrements clients ?',
        count: '{count} enregistrement(s)',
        empty:
          'Aucun enregistrement pour le moment. Les données apparaîtront ici lorsqu’un client validera une commande ou confirmera une demande de réservation.',
        deleted: 'Enregistrement supprimé.',
        cleared: 'Tous les enregistrements ont été supprimés.',
        deleteError: 'Suppression impossible.',
        loadError: 'Impossible de charger les données clients.',
        order: 'Commande',
        reservation: 'Réservation',
        ticket: 'Billets',
        deleteRecord: 'Supprimer l’enregistrement de {name}',
        note: 'Note : {note}',
        migrationNotice:
          'Si la table Supabase lns_client_records n’est pas encore créée, exécutez la migration 003_lns_client_records.sql. Pour les billets, exécutez aussi 005_lns_ticket_records.sql. Les enregistrements sont aussi conservés localement dans ce navigateur en secours.',
      },
      editors: {
        common: {
          save: 'Enregistrer',
          cancel: 'Annuler',
          edit: 'Modifier',
          delete: 'Supprimer',
          close: 'Fermer',
          refresh: 'Actualiser',
          show: 'Afficher',
          hide: 'Masquer',
          visible: 'Visible',
          hidden: 'Masqué',
          order: 'Ordre d’affichage',
          title: 'Titre',
          description: 'Description',
          image: 'Image',
          modify: 'Modifier',
          addNew: 'Ajouter',
        },
        overview: {
          kicker: 'Vue d’ensemble',
          title: 'Bienvenue dans l’espace propriétaire',
          description:
            'Modifiez les plats, les coordonnées, les photos ou l’équipe : le site client se met à jour automatiquement grâce à Supabase Realtime.',
          statDishes: 'Plats à la carte',
          statGallery: 'Photos de galerie',
          statTeam: 'Membres de l’équipe',
          statFaq: 'Questions fréquentes',
          statCategories: 'Catégories de la carte',
          statEvents: 'Événements à venir',
          importNew: 'Importer les nouveautés',
          importNewConfirm:
            'Importer les catégories, plats du jour et événements manquants ? Vos modifications existantes seront conservées.',
          syncTitle: 'État de la synchronisation',
          sourceLabel: 'Source des données',
          sourceSupabase: 'Supabase',
          sourceLocal: 'Contenu local',
          liveLabel: 'Mises à jour en direct',
          liveActive: 'Actives',
          liveInactive: 'Inactives',
          noDataNotice:
            'Aucune donnée Supabase pour le moment. Importez le contenu d’origine pour commencer à gérer le site depuis le dashboard.',
          migrationNotice:
            'Tables manquantes dans Supabase : {tables}. Exécutez la migration 004_lns_menu_events.sql dans le SQL Editor pour publier ces sections sur le site.',
          importMissing: 'Importer le contenu manquant',
          imported: 'Contenu manquant importé (modifications préservées).',
          viewSite: 'Voir le site',
          howTitle: 'Comment ça marche',
          how1: 'Importez une fois le contenu manquant : vos modifications déjà enregistrées ne sont pas écrasées.',
          how2: 'Modifiez un plat ou une information : l’enregistrement écrit dans Supabase.',
          how3: 'Les visiteurs voient la modification instantanément, sans recharger la page.',
          how4: 'Utilisez « Masquer » pour retirer un élément du site sans le supprimer.',
        },
        menu: {
          title: 'Les plats',
          description:
            'Ajoutez un plat, modifiez son prix ou sa photo, masquez-le le temps d’une rupture. Le total du panier client suit automatiquement.',
          all: 'Tous',
          editDish: 'Modifier le plat',
          newDish: 'Nouveau plat',
          name: 'Nom du plat',
          priceKmf: 'Prix (KMF)',
          category: 'Catégorie',
          noCategory: 'Sans catégorie',
          priceOptions: 'Options de prix',
          priceOptionsHint: 'Ex. : 26 cm / 33 cm, petite / grande portion.',
          optionLabel: 'Nom de l’option',
          optionPrice: 'Prix de l’option (KMF)',
          addOption: 'Ajouter une option',
          removeOption: 'Supprimer l’option',
          moment: 'Moment de service',
          section: 'Section sur la carte',
          badge: 'Badge (optionnel)',
          badgeHint: 'Ex. : Signature, Sur arrivage, Fait maison.',
          order: 'Ordre d’affichage',
          descriptionField: 'Description',
          photo: 'Photo du plat',
          showOnSite: 'Afficher sur le site',
          signature: 'Plat phare (accueil)',
          saved: 'Plat enregistré. Le site client est à jour.',
          deleted: 'Plat supprimé.',
          shown: 'Plat affiché.',
          hidden: 'Plat masqué.',
          empty: 'Aucun plat dans cette catégorie.',
          hiddenBadge: 'Masqué',
          signatureBadge: 'Phare',
        },
        menuCategories: {
          title: 'Catégories de la carte',
          description:
            'Organisez les sections de votre carte : nom, description, ordre d’affichage et visibilité.',
          newCategory: 'Nouvelle catégorie',
          editCategory: 'Modifier la catégorie',
          name: 'Nom de la catégorie',
          descriptionField: 'Description',
          showOnSite: 'Afficher sur la carte',
          saved: 'Catégorie enregistrée.',
          deleted: 'Catégorie supprimée.',
          empty: 'Aucune catégorie pour le moment.',
          hiddenBadge: 'Masquée',
        },
        dailySpecials: {
          title: 'Plats du jour',
          description:
            'Programmez les plats du jour avec leurs dates de validité : seul le plat en cours est affiché sur le site.',
          newSpecial: 'Nouveau plat du jour',
          editSpecial: 'Modifier le plat du jour',
          dishName: 'Nom du plat',
          descriptionField: 'Description',
          priceKmf: 'Prix (KMF)',
          image: 'Photo du plat',
          startDate: 'Date de début',
          endDate: 'Date de fin',
          availability: 'Disponibilité',
          showOnSite: 'Afficher sur le site',
          saved: 'Plat du jour enregistré.',
          deleted: 'Plat du jour supprimé.',
          empty: 'Aucun plat du jour programmé.',
          hiddenBadge: 'Masqué',
        },
        events: {
          title: 'Événements',
          description:
            'Ajoutez vos événements et catégories : dates, lieu, tarif et visibilité sont affichés sur la page Événements.',
          newEvent: 'Nouvel événement',
          editEvent: 'Modifier l’événement',
          eventTitle: 'Titre de l’événement',
          descriptionField: 'Description',
          category: 'Catégorie',
          date: 'Date de début',
          endDate: 'Date de fin (optionnelle)',
          time: 'Heure',
          location: 'Lieu',
          priceKmf: 'Prix (KMF)',
          freeHint: 'Laissez à 0 pour un événement gratuit.',
          ticketPriceKmf: 'Prix d’un billet (KMF)',
          ticketsAvailable: 'Places disponibles',
          salePoints: 'Points de vente / modalités d’achat',
          ticketingUrl: 'Lien de billetterie en ligne (optionnel)',
          ticketHint: 'Ces informations alimentent la billetterie de la page Événements.',
          bookTicketsBadge: 'Billetterie',
          seatsBadge: '{count} place(s)',
          image: 'Photo de l’événement',
          showOnSite: 'Afficher sur le site',
          saved: 'Événement enregistré.',
          deleted: 'Événement supprimé.',
          empty: 'Aucun événement pour le moment.',
          hiddenBadge: 'Masqué',
          categoriesTitle: 'Catégories d’événements',
          categoriesHint:
            'Classez les événements (festivités, cérémonies, soirées, etc.).',
          newCategory: 'Nouvelle catégorie',
          categoryName: 'Nom de la catégorie',
          categoryDescription: 'Description',
          categorySaved: 'Catégorie enregistrée.',
          categoryDeleted: 'Catégorie supprimée.',
          categoryDeleteConfirm: 'Supprimer la catégorie {name} ?',
          categoryInUse: '{count} événement(s) utilisent encore la catégorie {name}.',
          deleteConfirm: 'Supprimer l’événement {name} ?',
        },
        settings: {
          title: 'Informations essentielles',
          description:
            'Nom, coordonnées, horaires, photo d’accueil et plat du jour : ces champs alimentent toutes les pages du site.',
          saved: 'Informations enregistrées.',
          restaurantName: 'Nom du restaurant',
          tagline: 'Accroche',
          address: 'Adresse',
          country: 'Pays',
          phoneDisplay: 'Téléphone affiché',
          phoneLink: 'Lien téléphone',
          whatsappLink: 'Lien WhatsApp',
          whatsappHint:
            'Ex. : https://wa.me/2697730031 — utilisé pour les commandes et réservations.',
          email: 'E-mail',
          hoursSummary: 'Horaires (résumé)',
          directionsLink: 'Lien itinéraire',
          latitude: 'Latitude',
          longitude: 'Longitude',
          heroImage: 'Photo principale (accueil)',
          chefTitle: 'Plat du jour du chef',
          chefDescription: 'Affiché en haut de la carte.',
          chefHeading: 'Titre',
          chefSubtitle: 'Sous-titre',
          chefDish: 'Nom du plat',
          chefPrice: 'Prix (KMF)',
          chefAvailability: 'Disponibilité',
          saveButton: 'Enregistrer les informations',
        },
        gallery: {
          title: 'Galerie photo',
          description:
            'Remplacez les visuels de la terrasse, de la salle et des plats. Les photos uploadées sont stockées dans le bucket Supabase dédié.',
          newPhoto: 'Nouvelle photo',
          editPhoto: 'Modifier la photo',
          category: 'Catégorie',
          caption: 'Légende',
          showInGallery: 'Afficher dans la galerie',
          saved: 'Photo enregistrée.',
          deleted: 'Photo supprimée.',
          hiddenBadge: 'Masquée',
        },
        brigade: {
          title: 'La brigade',
          description: 'Présentez l’équipe sur la page « Notre Histoire ».',
          newMember: 'Nouveau membre',
          name: 'Nom',
          role: 'Rôle',
          tenure: 'Ancienneté',
          bio: 'Biographie',
          showOnSite: 'Afficher sur le site',
          saved: 'Membre enregistré.',
          deleted: 'Membre supprimé.',
        },
        faq: {
          title: 'Questions fréquentes',
          description:
            'Gérez les réponses affichées sur la page « Informations pratiques ».',
          newQuestion: 'Nouvelle question',
          question: 'Question',
          answer: 'Réponse',
          showOnSite: 'Afficher sur le site',
          saved: 'Question enregistrée.',
          deleted: 'Question supprimée.',
        },
        media: {
          title: 'Bibliothèque de médias',
          description:
            'Uploadez vos photos une fois, puis copiez leur URL dans un plat ou une photo de galerie.',
          upload: 'Importer des images',
          uploading: 'Envoi…',
          imported: '{count} image(s) importée(s).',
          uploadError: 'Envoi impossible',
          listError: 'Impossible de lister les médias',
          copyUrl: 'Copier l’URL',
          copied: 'URL copiée.',
          empty: 'Aucune image dans la bibliothèque.',
        },
        errorUnknown: 'Erreur inconnue',
        errorValidation:
          'Vérifiez les champs du formulaire avant d’enregistrer (prix, dates, champs obligatoires).',
      },
    },
    pages: {
      accueil: 'Accueil',
      menu: 'La Carte & Menus',
      pizzas: 'Nos Pizzas',
      platsDuJour: 'Plats du jour',
      histoire: 'Notre Histoire',
      galerie: 'Galerie Photo',
      reservation: 'Réservation & Contact',
      infos: 'Informations Pratiques',
      evenements: 'Événements',
      admin: 'Administration',
    },
  },
  en: {
    nav: {
      home: 'Home',
      menu: 'Menu',
      pizzas: 'Pizzas',
      dailySpecials: 'Daily specials',
      history: 'Our Story',
      gallery: 'Gallery',
      infos: 'Practical Info',
      reservation: 'Book',
      reservationContact: 'Booking & Contact',
      admin: 'Administration',
      events: 'Events',
      mainAria: 'Main navigation',
      mobileAria: 'Mobile navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skipToContent: 'Skip to content',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    },
    common: {
      bookTable: 'Book a table',
      seeMenu: 'View Menu',
      viewFullMenu: 'View full menu',
      reserveTable: 'Book a table',
      contactRoom: 'Contact the restaurant',
      callRestaurant: 'Call the restaurant',
      writeWhatsApp: 'Message on WhatsApp',
      openDirections: 'Directions to Place de France',
      openGpsMap: 'Open GPS map',
      openItinerary: 'GPS directions to Place de France',
      askGroupQuote: 'Request a group quote',
      modifyReservation: 'Edit booking',
      confirmRequest: 'Confirm request',
      add: 'Add',
      added: 'Added',
      addToCart: 'Add to cart',
      addedCount: 'Added ({count})',
      viewCart: 'View cart ({count}) · {total}',
      closeCart: 'Close cart',
      yourCart: 'Your cart',
      currentOrder: 'Current order',
      cartEmpty: 'No dishes selected. Add a dish from the menu to build your order.',
      remove: 'Remove {name} from cart',
      removeUnit: 'Remove one {name}',
      addUnit: 'Add one {name}',
      totalToPay: 'Total to pay on site',
      pricesNote: 'Prices are shown in Comorian francs, tax included.',
      validateOrder: 'Place order',
      emptyCart: 'Clear cart',
      orderNote:
        'Your order details are pre-filled in WhatsApp. The restaurant will confirm availability and preparation time before payment on site.',
      closePreview: 'Close preview',
      previousPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
      enlargePhoto: 'Enlarge photo: {title}',
      preparedToOrder: 'Prepared to order',
      preparedMinute: 'Freshly prepared',
      accordingToArrival: 'Subject to availability',
      article: 'item',
      articles: 'items',
      liveMenu: 'Menu updated live',
      ratherBook: 'Book a table instead',
      group15: 'Group (15+ people)',
      person: 'person',
      people: 'people',
    },
    home: {
      location: 'Place de France · Moroni, Grande Comore',
      taglineFallback: 'French and European cuisine in the heart of Moroni',
      intro:
        'From morning coffee at 7:00 AM to dinners under the trees of Place de France, Le New Select blends bistro tradition with fresh catches and spices from the Indian Ocean.',
      heroAlt: 'Shaded terrace of Le New Select restaurant on Place de France in Moroni',
      viewMenuBtn: 'View Menu',
      itineraryBtn: 'Directions to Place de France',
      hoursLabel: 'Opening hours',
      outdoorLabel: 'Outdoor setting',
      outdoorValue: 'Terrace under the badamier trees',
      indoorLabel: 'Indoor comfort',
      indoorValue: 'Air-conditioned dining room & Wi-Fi',
      reservationLabel: 'Booking & takeaway',
      signatureKicker: 'House selection · Prices in Comorian Francs',
      signatureTitle: 'Our three signature dishes',
      signatureAll: 'View full menu',
      dailySpecialKicker: 'Daily special · Based on the day’s arrivals',
      dailySpecialTitle: 'Today’s daily special',
      dailySpecialAll: 'See all daily specials',
      eventsKicker: 'Upcoming events · Place de France',
      eventsTitle: 'Upcoming events',
      eventsAll: 'All events',
      eventsEmpty: 'No upcoming events at the moment.',
      eventsNextBadge: 'Next event',
      reviewsKicker: 'Verified reviews · TripAdvisor Moroni',
      reviewsTitle: 'What our guests say',
      avgRatingAria: 'Average rating: 4.6 out of 5',
      avgRating: '4.6 / 5',
      certified: 'Certified TripAdvisor reviews',
    },
    menu: {
      kicker: 'Menu · Net prices in Comorian Francs (KMF)',
      title: 'A menu that follows the rhythm of the day',
      intro:
        'From breakfast to evening grills, our dishes are cooked to order with coastal catches from Grande Comore. Select your dishes, the total updates automatically, and your order goes straight to WhatsApp.',
      tabsAria: 'Filter menu by time of day',
      all: 'Full menu',
      breakfast: 'Breakfast · from 7:00 AM',
      lunch: 'Lunch · 12:00–3:00 PM',
      dinner: 'Dinner · 6:30–11:00 PM',
      dessertsDrinks: 'Desserts & Drinks',
      categories: {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        dessertsDrinks: 'Desserts & Drinks',
      },
      chooseOption: 'Choose an option',
      noDailySpecial: 'No daily special planned at the moment.',
      empty: 'No dishes available for this service.',
      headings: {
        breakfast: {
          title: 'Breakfast',
          hours: 'Served from 7:00 AM to 10:30 AM on the terrace and indoors',
        },
        lunch: {
          title: 'Lunch',
          hours: 'Served from 12:00 PM to 3:00 PM · Set menus and full à la carte',
        },
        dinner: {
          title: 'Dinner',
          hours: 'Served from 6:30 PM to 11:00 PM · Grills, fish and bistro classics',
        },
        dessertsDrinks: {
          title: 'Homemade Desserts & Drinks',
          hours: 'Daily pastries, fresh juices and coffee',
        },
      },
      chefSuggestion: "Chef's suggestion",
      cartAria: 'Your order',
      cartCount: '{count} {label}',
      customerInfoTitle: 'Your details',
      customerName: 'Name',
      customerWhatsApp: 'WhatsApp number',
      customerNamePlaceholder: 'Your name',
      customerWhatsAppPlaceholder: '+269 3XX XX XX',
      customerRequired: 'Please enter your name and WhatsApp number to place the order.',
    },
    gallery: {
      kicker: 'Photo Gallery · Atmosphere & Dishes',
      title: 'Under the badamier trees and in the kitchen',
      intro:
        'Explore the Place de France terrace, the air-conditioned dining room, and our dishes prepared throughout the day.',
      filtersAria: 'Filter photo gallery',
      all: 'All views',
      terrace: 'Terrace',
      room: 'Dining room',
      dishes: 'Dishes',
      events: 'Events',
    },
    history: {
      kicker: 'Our Story · Moroni, Place de France',
      title: 'A table open onto Place de France',
      intro1:
        'Facing the historic arcades of Place de France, Le New Select has become a familiar meeting place in the heart of Moroni. Guests come for a strong coffee from seven in the morning, a business lunch in the air-conditioned room, or a peaceful dinner under the shade of the badamier trees.',
      intro2:
        'Our house stands for clear, sincere cooking: French bistro techniques applied with care to the maritime and agricultural treasures of Grande Comore.',
      discoverMenu: 'Discover the menu',
      pillarsKicker: 'Culinary philosophy',
      pillarsTitle: 'Our three foundations',
      pillars: [
        {
          title: 'French bistro spirit',
          description:
            'Precise cooking, butter-mounted sauces, stocks reduced on site and attentive service: culinary rigor inherited from the traditional brasserie.',
        },
        {
          title: 'Fresh produce from the Indian Ocean',
          description:
            'Capitaine, yellowfin tuna, grouper and lobsters come from the morning landings of fishermen in Moroni, Itsandra and Mitsamiouli.',
        },
        {
          title: 'Local sourcing from Ngazidja',
          description:
            'Bourbon vanilla, green pepper, clove, combava, local greens and cassava from the slopes of Mount Karthala give each dish its Comorian identity.',
        },
      ],
      teamKicker: 'Kitchen and dining room team',
      teamTitle: 'The brigade and maître d’s',
      heroAlt:
        'Air-conditioned dining room and woodwork at Le New Select restaurant in Moroni',
    },
    reservation: {
      kicker: 'Booking & Contact · Moroni, Place de France',
      title: 'Book your table',
      intro:
        'Choose a seat on the tree-shaded terrace or in the air-conditioned dining room. Instant confirmation or by phone at ',
      seatingLegend: 'Seating preference',
      terraceTitle: 'Shaded terrace',
      terraceDetail: 'Under the badamier trees · View of Place de France',
      roomTitle: 'Air-conditioned room',
      roomDetail: 'Calm wood interior · Ideal for business lunches',
      fullName: 'Full name *',
      fullNamePlaceholder: 'e.g. Aminata Said',
      phone: 'Phone / WhatsApp *',
      phonePlaceholder: '+269 3XX XX XX',
      date: 'Date *',
      time: 'Arrival time',
      guests: 'Guests',
      email: 'Email (optional)',
      emailPlaceholder: 'name@example.com',
      notes: 'Notes or allergies',
      notesPlaceholder: 'High chair, quiet table, no shellfish...',
      serviceHours: 'Continuous service from 7:00 AM to 11:00 PM',
      confirmedKicker: 'Reference {ref}',
      confirmedTitle: 'Booking request saved',
      confirmedThanks:
        'Thank you {name}. Your request is ready; send it via WhatsApp for immediate handling by our maître d’hôtel.',
      dateTime: 'Date & Time',
      covers: 'Number of guests',
      seating: 'Preferred seating',
      phoneLabel: 'Phone',
      confirmWhatsApp: 'Confirm via WhatsApp',
      directLine: 'Direct line',
      contactWithoutWaiting: 'Contact the restaurant directly',
      whatsappQuick: 'Quick response',
      mapKicker: 'Location · Moroni',
      mapTitle: 'Map of Place de France',
      mapAlt:
        'Schematic map of Place de France in Moroni and landmarks around Le New Select restaurant',
      viewLandmark: 'View landmark: {name}',
      whatsappPrefill: 'Hello Le New Select, I would like to book a table.',
    },
    infos: {
      kicker: 'Practical Information · Moroni',
      title: 'Plan your visit to Le New Select',
      intro:
        'Access, parking around Place de France, payment methods and answers to frequently asked questions.',
      accessKicker: '01. Access & Parking',
      accessTitle: 'Around Place de France',
      accessText:
        'Located in downtown Moroni, the restaurant is within walking distance of ministries, banks, embassies and the port. Public parking spaces line Place de France and the adjacent street, less than fifty meters from the terrace entrance.',
      takeawayKicker: '02. Takeaway & Groups',
      takeawayTitle: 'Takeaway and large tables',
      takeawayText:
        'All dishes on the menu can be ordered for takeaway to your office or home by calling twenty minutes before pickup. For groups of 8 to 30 guests (official lunches, meetings, family dinners), we can reserve an area of the air-conditioned room or the terrace.',
      paymentKicker: 'Payment on site or takeaway',
      paymentTitle: 'Accepted payment methods',
      faqKicker: 'Indoor and terrace services',
      faqTitle: 'Frequently asked questions',
    },
    events: {
      kicker: 'Events · Le New Select, Moroni',
      title: 'Upcoming events',
      intro:
        'Live music evenings, celebrations and business gatherings: discover the next events at Le New Select, under the badamier trees of Place de France or in our air-conditioned dining room.',
      all: 'All events',
      filtersAria: 'Filter events by category',
      empty: 'No upcoming events in this category.',
      dateLabel: 'Date',
      timeLabel: 'Time',
      locationLabel: 'Venue',
      free: 'Free',
      priceOnRequest: 'Price on request',
      bookTickets: 'Book tickets',
      ticketsRemaining: '{count} ticket(s) left',
      salePoints: 'Points of sale',
      buyOnline: 'Buy online',
      ticketFormTitle: 'Book tickets — {title}',
      ticketQuantity: 'Number of tickets',
      ticketName: 'Full name',
      ticketPhone: 'WhatsApp / Phone',
      ticketEmail: 'Email (optional)',
      ticketSubmit: 'Send booking request',
      ticketSending: 'Sending…',
      ticketConfirmTitle: 'Ticket booking recorded',
      ticketConfirmText:
        'Your request has been recorded (reference {ref}). Our team will contact you to confirm and pay for your tickets.',
      ticketReference: 'Reference',
      ticketWhatsapp: 'Finish on WhatsApp',
      ticketError: 'Unable to save the request. Please try again or contact us.',
      organizeTitle: 'Organise an event',
      organizeText:
        'Birthday, wedding, team evening or official reception: our team will tailor a menu and a space for your guests.',
      organizeCta: 'Request a quote',
    },
    footer: {
      description:
        'A house open every day on Place de France, combining fresh Indian Ocean produce with bistro know-how.',
      navigation: 'Navigation',
      location: 'Moroni · Place de France',
      rights: '© {year} {name} · Moroni, Union of the Comoros',
      taglineLine: 'Shaded terrace · Air-conditioned room · Takeaway',
      ownerSpace: 'Owner area',
      openItinerary: 'Open directions to Place de France',
      menuLink: 'Menu',
      historyLink: 'Our Story',
      galleryLink: 'Photo Gallery',
      eventsLink: 'Events',
      reservationLink: 'Booking & Contact',
      infosLink: 'Practical Information',
    },
    dashboard: {
      title: 'Administration',
      backToSite: 'Back to site',
      tabs: {
        overview: 'Dashboard',
        dishes: 'Dishes',
        menuCategories: 'Menu categories',
        dailySpecials: 'Daily specials',
        events: 'Events',
        info: 'Information',
        gallery: 'Gallery',
        team: 'Team',
        faq: 'FAQ',
        media: 'Media',
        clients: 'Clients',
      },
      status: {
        live: 'Live sync active',
        local: 'Local mode',
        checking: 'Checking access…',
      },
      logout: 'Log out',
      setup: {
        title: 'Supabase configuration required',
        notice:
          'The dashboard is ready, but the Supabase public key is not set in the app environment yet.',
        varsTitle: 'Variables to set:',
        help: 'Add them to .env.local locally, then to Vercel environment variables. Then run supabase/migrations/001_lns_site_content.sql in the Supabase SQL Editor. Only the anon key is exposed to the browser: the service_role key must never be used here.',
      },
      login: {
        kicker: 'Owner area',
        title: 'Sign in',
        intro:
          'Reserved for the restaurant owner. Use the authorized Supabase Auth account.',
        email: 'Email',
        password: 'Password',
        submit: 'Sign in',
        submitting: 'Signing in…',
      },
      clients: {
        title: 'Clients & requests',
        description:
          'Data saved automatically when a customer places an order (cart) or confirms a reservation request.',
        refresh: 'Refresh',
        deleteAll: 'Delete all',
        deleteAllConfirm: 'Delete all client records?',
        count: '{count} record(s)',
        empty:
          'No records yet. Data will appear here when a customer places an order or confirms a reservation request.',
        deleted: 'Record deleted.',
        cleared: 'All records have been deleted.',
        deleteError: 'Could not delete.',
        loadError: 'Could not load client data.',
        order: 'Order',
        reservation: 'Reservation',
        ticket: 'Tickets',
        deleteRecord: 'Delete record for {name}',
        note: 'Note: {note}',
        migrationNotice:
          'If the Supabase table lns_client_records does not exist yet, run migration 003_lns_client_records.sql. For tickets, also run 005_lns_ticket_records.sql. Records are also kept locally in this browser as a fallback.',
      },
      editors: {
        common: {
          save: 'Save',
          cancel: 'Cancel',
          edit: 'Edit',
          delete: 'Delete',
          close: 'Close',
          refresh: 'Refresh',
          show: 'Show',
          hide: 'Hide',
          visible: 'Visible',
          hidden: 'Hidden',
          order: 'Display order',
          title: 'Title',
          description: 'Description',
          image: 'Image',
          modify: 'Edit',
          addNew: 'Add',
        },
        overview: {
          kicker: 'Overview',
          title: 'Welcome to the owner area',
          description:
            'Edit dishes, contact details, photos or the team: the customer site updates automatically with Supabase Realtime.',
          statDishes: 'Menu dishes',
          statGallery: 'Gallery photos',
          statTeam: 'Team members',
          statFaq: 'FAQ entries',
          statCategories: 'Menu categories',
          statEvents: 'Upcoming events',
          importNew: 'Import new content',
          importNewConfirm:
            'Import missing categories, daily specials and events? Your existing changes will be preserved.',
          syncTitle: 'Sync status',
          sourceLabel: 'Data source',
          sourceSupabase: 'Supabase',
          sourceLocal: 'Local content',
          liveLabel: 'Live updates',
          liveActive: 'Active',
          liveInactive: 'Inactive',
          noDataNotice:
            'No Supabase data yet. Import the original content to start managing the site from the dashboard.',
          migrationNotice:
            'Missing Supabase tables: {tables}. Run migration 004_lns_menu_events.sql in the SQL Editor to publish these sections on the site.',
          importMissing: 'Import missing content',
          imported: 'Missing content imported (existing changes preserved).',
          viewSite: 'View site',
          howTitle: 'How it works',
          how1: 'Import missing content once: your saved changes are not overwritten.',
          how2: 'Edit a dish or information: the change is saved to Supabase.',
          how3: 'Visitors see the change instantly, without reloading the page.',
          how4: 'Use “Hide” to remove an item from the site without deleting it.',
        },
        menu: {
          title: 'Dishes',
          description:
            'Add a dish, edit its price or photo, or hide it during a stockout. The customer cart total updates automatically.',
          all: 'All',
          editDish: 'Edit dish',
          newDish: 'New dish',
          name: 'Dish name',
          priceKmf: 'Price (KMF)',
          category: 'Category',
          noCategory: 'No category',
          priceOptions: 'Price options',
          priceOptionsHint: 'E.g. 26 cm / 33 cm, small / large portion.',
          optionLabel: 'Option name',
          optionPrice: 'Option price (KMF)',
          addOption: 'Add an option',
          removeOption: 'Remove option',
          moment: 'Service time',
          section: 'Menu section',
          badge: 'Badge (optional)',
          badgeHint: 'E.g. Signature, On arrival, Homemade.',
          order: 'Display order',
          descriptionField: 'Description',
          photo: 'Dish photo',
          showOnSite: 'Show on site',
          signature: 'Featured dish (home)',
          saved: 'Dish saved. The customer site is up to date.',
          deleted: 'Dish deleted.',
          shown: 'Dish shown.',
          hidden: 'Dish hidden.',
          empty: 'No dishes in this category.',
          hiddenBadge: 'Hidden',
          signatureBadge: 'Featured',
        },
        menuCategories: {
          title: 'Menu categories',
          description:
            'Organise the sections of your menu: name, description, display order and visibility.',
          newCategory: 'New category',
          editCategory: 'Edit category',
          name: 'Category name',
          descriptionField: 'Description',
          showOnSite: 'Show on the menu',
          saved: 'Category saved.',
          deleted: 'Category deleted.',
          empty: 'No categories yet.',
          hiddenBadge: 'Hidden',
        },
        dailySpecials: {
          title: 'Daily specials',
          description:
            'Schedule daily specials with their date range: only the current one is shown on the site.',
          newSpecial: 'New daily special',
          editSpecial: 'Edit daily special',
          dishName: 'Dish name',
          descriptionField: 'Description',
          priceKmf: 'Price (KMF)',
          image: 'Dish photo',
          startDate: 'Start date',
          endDate: 'End date',
          availability: 'Availability',
          showOnSite: 'Show on site',
          saved: 'Daily special saved.',
          deleted: 'Daily special deleted.',
          empty: 'No daily specials scheduled.',
          hiddenBadge: 'Hidden',
        },
        events: {
          title: 'Events',
          description:
            'Add events and categories: dates, venue, price and visibility appear on the Events page.',
          newEvent: 'New event',
          editEvent: 'Edit event',
          eventTitle: 'Event title',
          descriptionField: 'Description',
          category: 'Category',
          date: 'Start date',
          endDate: 'End date (optional)',
          time: 'Time',
          location: 'Venue',
          priceKmf: 'Price (KMF)',
          freeHint: 'Leave 0 for a free event.',
          ticketPriceKmf: 'Ticket price (KMF)',
          ticketsAvailable: 'Tickets available',
          salePoints: 'Points of sale / purchase terms',
          ticketingUrl: 'Online ticketing link (optional)',
          ticketHint: 'These details feed the ticketing section of the Events page.',
          bookTicketsBadge: 'Ticketing',
          seatsBadge: '{count} seat(s)',
          image: 'Event photo',
          showOnSite: 'Show on site',
          saved: 'Event saved.',
          deleted: 'Event deleted.',
          empty: 'No events yet.',
          hiddenBadge: 'Hidden',
          categoriesTitle: 'Event categories',
          categoriesHint: 'Group events (festivities, ceremonies, evenings, etc.).',
          newCategory: 'New category',
          categoryName: 'Category name',
          categoryDescription: 'Description',
          categorySaved: 'Category saved.',
          categoryDeleted: 'Category deleted.',
          categoryDeleteConfirm: 'Delete category {name}?',
          categoryInUse: '{count} event(s) still use the category {name}.',
          deleteConfirm: 'Delete the event {name}?',
        },
        settings: {
          title: 'Essential information',
          description:
            'Name, contact details, hours, hero image and chef’s special: these fields power all site pages.',
          saved: 'Information saved.',
          restaurantName: 'Restaurant name',
          tagline: 'Tagline',
          address: 'Address',
          country: 'Country',
          phoneDisplay: 'Displayed phone',
          phoneLink: 'Phone link',
          whatsappLink: 'WhatsApp link',
          whatsappHint:
            'E.g. https://wa.me/2697730031 — used for orders and reservations.',
          email: 'Email',
          hoursSummary: 'Hours (summary)',
          directionsLink: 'Directions link',
          latitude: 'Latitude',
          longitude: 'Longitude',
          heroImage: 'Hero image (home)',
          chefTitle: 'Chef’s special',
          chefDescription: 'Shown at the top of the menu.',
          chefHeading: 'Title',
          chefSubtitle: 'Subtitle',
          chefDish: 'Dish name',
          chefPrice: 'Price (KMF)',
          chefAvailability: 'Availability',
          saveButton: 'Save information',
        },
        gallery: {
          title: 'Photo gallery',
          description:
            'Replace terrace, dining room and dish visuals. Uploaded photos are stored in the dedicated Supabase bucket.',
          newPhoto: 'New photo',
          editPhoto: 'Edit photo',
          category: 'Category',
          caption: 'Caption',
          showInGallery: 'Show in gallery',
          saved: 'Photo saved.',
          deleted: 'Photo deleted.',
          hiddenBadge: 'Hidden',
        },
        brigade: {
          title: 'The team',
          description: 'Present the team on the “Our Story” page.',
          newMember: 'New member',
          name: 'Name',
          role: 'Role',
          tenure: 'Tenure',
          bio: 'Biography',
          showOnSite: 'Show on site',
          saved: 'Member saved.',
          deleted: 'Member deleted.',
        },
        faq: {
          title: 'Frequently asked questions',
          description: 'Manage answers shown on the “Practical information” page.',
          newQuestion: 'New question',
          question: 'Question',
          answer: 'Answer',
          showOnSite: 'Show on site',
          saved: 'Question saved.',
          deleted: 'Question deleted.',
        },
        media: {
          title: 'Media library',
          description:
            'Upload your photos once, then copy their URL into a dish or gallery photo.',
          upload: 'Import images',
          uploading: 'Uploading…',
          imported: '{count} image(s) imported.',
          uploadError: 'Upload failed',
          listError: 'Could not list media',
          copyUrl: 'Copy URL',
          copied: 'URL copied.',
          empty: 'No images in the library.',
        },
        errorUnknown: 'Unknown error',
        errorValidation:
          'Check the form fields before saving (price, dates, required fields).',
      },
    },
    pages: {
      accueil: 'Home',
      menu: 'Menu',
      pizzas: 'Our Pizzas',
      platsDuJour: 'Daily specials',
      histoire: 'Our Story',
      galerie: 'Photo Gallery',
      reservation: 'Booking & Contact',
      infos: 'Practical Information',
      evenements: 'Events',
      admin: 'Administration',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      menu: 'القائمة',
      pizzas: 'البيتزا',
      dailySpecials: 'أطباق اليوم',
      history: 'قصتنا',
      gallery: 'المعرض',
      infos: 'معلومات عملية',
      reservation: 'احجز',
      reservationContact: 'الحجز والتواصل',
      admin: 'الإدارة',
      events: 'الفعاليات',
      mainAria: 'التنقل الرئيسي',
      mobileAria: 'تنقل الهاتف',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      skipToContent: 'تخطي إلى المحتوى',
      switchToLight: 'تفعيل الوضع الفاتح',
      switchToDark: 'تفعيل الوضع الداكن',
    },
    common: {
      bookTable: 'احجز طاولة',
      seeMenu: 'عرض القائمة',
      viewFullMenu: 'عرض القائمة كاملة',
      reserveTable: 'احجز طاولة',
      contactRoom: 'التواصل مع المطعم',
      callRestaurant: 'اتصل بالمطعم',
      writeWhatsApp: 'راسلنا عبر واتساب',
      openDirections: 'الاتجاهات إلى ساحة فرنسا',
      openGpsMap: 'فتح خريطة GPS',
      openItinerary: 'اتجاهات GPS إلى ساحة فرنسا',
      askGroupQuote: 'طلب عرض سعر لمجموعة',
      modifyReservation: 'تعديل الحجز',
      confirmRequest: 'تأكيد الطلب',
      add: 'إضافة',
      added: 'تمت الإضافة',
      addToCart: 'أضف إلى السلة',
      addedCount: 'تمت الإضافة ({count})',
      viewCart: 'عرض السلة ({count}) · {total}',
      closeCart: 'إغلاق السلة',
      yourCart: 'سلتك',
      currentOrder: 'الطلب الحالي',
      cartEmpty: 'لم يتم اختيار أي طبق. أضف طبقًا من القائمة لتكوين طلبك.',
      remove: 'إزالة {name} من السلة',
      removeUnit: 'إنقاص وحدة من {name}',
      addUnit: 'إضافة وحدة من {name}',
      totalToPay: 'الإجمالي للدفع في الموقع',
      pricesNote: 'الأسعار بالفرنك القمري شاملة الضريبة.',
      validateOrder: 'تأكيد الطلب',
      emptyCart: 'إفراغ السلة',
      orderNote:
        'تفاصيل طلبك تُجهّز مسبقًا في واتساب. سيؤكد المطعم التوفر ووقت التحضير قبل الدفع في الموقع.',
      closePreview: 'إغلاق المعاينة',
      previousPhoto: 'الصورة السابقة',
      nextPhoto: 'الصورة التالية',
      enlargePhoto: 'تكبير الصورة: {title}',
      preparedToOrder: 'يُحضّر عند الطلب',
      preparedMinute: 'يُحضّر فورًا',
      accordingToArrival: 'حسب التوفر',
      article: 'عنصر',
      articles: 'عناصر',
      liveMenu: 'القائمة محدّثة مباشرة',
      ratherBook: 'احجز طاولة بدلاً من ذلك',
      group15: 'مجموعة (15+ أشخاص)',
      person: 'شخص',
      people: 'أشخاص',
    },
    home: {
      location: 'ساحة فرنسا · موروني، القمر الكبرى',
      taglineFallback: 'مطبخ فرنسي وأوروبي في قلب موروني',
      intro:
        'من قهوة الصباح عند الساعة 07:00 إلى عشاء تحت أشجار ساحة فرنسا، يمزج لو نيو سيليكت بين تقاليد البيسترو ومنتجات البحر الطازجة وتوابل المحيط الهندي.',
      heroAlt: 'الشرفة المظللة لمطعم لو نيو سيليكت في ساحة فرنسا بموروني',
      viewMenuBtn: 'عرض القائمة',
      itineraryBtn: 'الاتجاهات إلى ساحة فرنسا',
      hoursLabel: 'ساعات العمل',
      outdoorLabel: 'الجلوس الخارجي',
      outdoorValue: 'شرفة مظللة تحت أشجار البادامير',
      indoorLabel: 'الراحة الداخلية',
      indoorValue: 'قاعة مكيفة وواي فاي',
      reservationLabel: 'الحجز والطلبات الخارجية',
      signatureKicker: 'اختيارات البيت · الأسعار بالفرنك القمري',
      signatureTitle: 'أطباقنا الثلاثة المميزة',
      signatureAll: 'عرض القائمة كاملة',
      dailySpecialKicker: 'طبق اليوم · حسب وصول المنتجات',
      dailySpecialTitle: 'طبق اليوم',
      dailySpecialAll: 'عرض جميع أطباق اليوم',
      eventsKicker: 'فعاليات قادمة · ساحة فرنسا',
      eventsTitle: 'الفعاليات القادمة',
      eventsAll: 'جميع الفعاليات',
      eventsEmpty: 'لا توجد فعاليات قادمة حاليًا.',
      eventsNextBadge: 'الموعد القادم',
      reviewsKicker: 'آراء موثقة · تريب أدفايزر موروني',
      reviewsTitle: 'آراء ضيوفنا والمسافرين',
      avgRatingAria: 'التقييم المتوسط: 4.6 من 5',
      avgRating: '4.6 / 5',
      certified: 'آراء موثقة من تريب أدفايزر',
    },
    menu: {
      kicker: 'القائمة · أسعار صافية بالفرنك القمري (KMF)',
      title: 'قائمة تتناغم مع ساعات اليوم',
      intro:
        'من الإفطار الصباحي إلى المشويات المسائية، تُحضّر أطباقنا عند الطلب باستخدام صيد ساحل القمر الكبرى. اختر أطباقك، يُحسب المجموع تلقائيًا ويُرسل طلبك مباشرة عبر واتساب.',
      tabsAria: 'تصفية القائمة حسب وقت اليوم',
      all: 'القائمة كاملة',
      breakfast: 'الإفطار · من 07:00',
      lunch: 'الغداء · 12:00–15:00',
      dinner: 'العشاء · 18:30–23:00',
      dessertsDrinks: 'الحلويات والمشروبات',
      categories: {
        breakfast: 'الإفطار',
        lunch: 'الغداء',
        dinner: 'العشاء',
        dessertsDrinks: 'الحلويات والمشروبات',
      },
      chooseOption: 'اختر الخيار',
      noDailySpecial: 'لا يوجد طبق اليوم حاليًا.',
      empty: 'لا توجد أطباق متاحة لهذه الخدمة.',
      headings: {
        breakfast: {
          title: 'الإفطار',
          hours: 'يُقدّم من 07:00 حتى 10:30 في الشرفة والقاعة',
        },
        lunch: { title: 'الغداء', hours: 'يُقدّم من 12:00 حتى 15:00 · وجبات وقائمة كاملة' },
        dinner: {
          title: 'العشاء',
          hours: 'يُقدّم من 18:30 حتى 23:00 · مشويات وأسماك وأطباق بيسترو',
        },
        dessertsDrinks: {
          title: 'حلويات منزلية ومشروبات',
          hours: 'حلويات اليوم وعصائر طازجة وقهوة',
        },
      },
      chefSuggestion: 'اقتراح الشيف',
      cartAria: 'طلبك',
      cartCount: '{count} {label}',
      customerInfoTitle: 'بياناتك',
      customerName: 'الاسم',
      customerWhatsApp: 'رقم واتساب',
      customerNamePlaceholder: 'اسمك',
      customerWhatsAppPlaceholder: '+269 3XX XX XX',
      customerRequired: 'يرجى إدخال اسمك ورقم واتساب لتأكيد الطلب.',
    },
    gallery: {
      kicker: 'معرض الصور · الأجواء والأطباق',
      title: 'تحت أشجار البادامير وفي المطبخ',
      intro: 'تصفح شرفة ساحة فرنسا والقاعة المكيفة وأطباقنا المُحضّرة على مدار اليوم.',
      filtersAria: 'تصفية معرض الصور',
      all: 'كل المشاهد',
      terrace: 'الشرفة',
      room: 'القاعة',
      dishes: 'الأطباق',
      events: 'الفعاليات',
    },
    history: {
      kicker: 'قصتنا · موروني، ساحة فرنسا',
      title: 'مائدة مفتوحة على ساحة فرنسا',
      intro1:
        'يقع لو نيو سيليكت مقابل أروقة ساحة فرنسا التاريخية، وأصبح على مر السنين مكان لقاء مألوفًا في قلب موروني. يجتمع الزوار هنا لتناول قهوة صباحية منذ الساعة السابعة، أو غداء عمل في القاعة المكيفة، أو عشاء هادئ تحت ظلال أشجار البادامير.',
      intro2:
        'يدافع مطعمنا عن مطبخ واضح وصادق: تقنيات البيسترو الفرنسي تُطبّق بعناية على كنوز القمر الكبرى البحرية والزراعية.',
      discoverMenu: 'اكتشف القائمة',
      pillarsKicker: 'فلسفتنا في الطهي',
      pillarsTitle: 'ركائزنا الثلاث',
      pillars: [
        {
          title: 'روح البيسترو الفرنسي',
          description:
            'طهي دقيق، وصلصات بالزبدة، مرق يُحضّر في المكان وخدمة منتبهة: دقة طهوية موروثة من المطاعم التقليدية.',
        },
        {
          title: 'منتجات طازجة من المحيط الهندي',
          description:
            'سمك الكابتن والتونة الصفراء والهامور والكركند تأتي من صيد الصيادين صباحًا في موروني وإتساندرا وميتساميوولي.',
        },
        {
          title: 'توريد محلي من نغازيدجا',
          description:
            'فانيليا بوربون والفلفل الأخضر والقرنفل والكومبافا والخضروات المحلية والكسافا من سفوح جبل كارتالا تمنح كل طبق هوية قمرية.',
        },
      ],
      teamKicker: 'فريق المطبخ والقاعة',
      teamTitle: 'الطاقم ومسؤولو الخدمة',
      heroAlt: 'القاعة المكيفة وأعمال الخشب في مطعم لو نيو سيليكت بموروني',
    },
    reservation: {
      kicker: 'الحجز والتواصل · موروني، ساحة فرنسا',
      title: 'احجز طاولتك',
      intro:
        'اختر الجلوس في الشرفة المظللة تحت الأشجار أو في القاعة المكيفة. تأكيد فوري أو عبر الهاتف على ',
      seatingLegend: 'اختيار مكان الجلوس',
      terraceTitle: 'شرفة مظللة',
      terraceDetail: 'تحت أشجار البادامير · إطلالة على ساحة فرنسا',
      roomTitle: 'قاعة مكيفة',
      roomDetail: 'أجواء هادئة · مثالية لغداءات العمل',
      fullName: 'الاسم الكامل *',
      fullNamePlaceholder: 'مثال: أميناتة سعيد',
      phone: 'الهاتف / واتساب *',
      phonePlaceholder: '+269 3XX XX XX',
      date: 'التاريخ *',
      time: 'وقت الوصول',
      guests: 'عدد الأشخاص',
      email: 'البريد الإلكتروني (اختياري)',
      emailPlaceholder: 'name@example.com',
      notes: 'ملاحظات أو حساسية',
      notesPlaceholder: 'كرسي مرتفع، طاولة هادئة، بدون محار...',
      serviceHours: 'خدمة مستمرة من 07:00 إلى 23:00',
      confirmedKicker: 'المرجع {ref}',
      confirmedTitle: 'تم تسجيل طلب الحجز',
      confirmedThanks:
        'شكرًا {name}. طلبك جاهز؛ أرسله عبر واتساب ليتم التعامل معه فورًا من قبل مسؤول القاعة.',
      dateTime: 'التاريخ والوقت',
      covers: 'عدد الأشخاص',
      seating: 'مكان الجلوس المطلوب',
      phoneLabel: 'الهاتف',
      confirmWhatsApp: 'التأكيد عبر واتساب',
      directLine: 'خط مباشر',
      contactWithoutWaiting: 'تواصل مع المطعم مباشرة',
      whatsappQuick: 'رد سريع',
      mapKicker: 'الموقع · موروني',
      mapTitle: 'مخطط ساحة فرنسا',
      mapAlt: 'خريطة تخطيطية لساحة فرنسا في موروني ومعالم حول مطعم لو نيو سيليكت',
      viewLandmark: 'عرض المعلم: {name}',
      whatsappPrefill: 'مرحبًا لو نيو سيليكت، أود حجز طاولة.',
    },
    infos: {
      kicker: 'معلومات عملية · موروني',
      title: 'استعد لزيارتك إلى لو نيو سيليكت',
      intro:
        'الوصول، ومواقف السيارات حول ساحة فرنسا، ووسائل الدفع، والإجابات على الأسئلة الشائعة.',
      accessKicker: '01. الوصول ومواقف السيارات',
      accessTitle: 'بالقرب من ساحة فرنسا',
      accessText:
        'يقع المطعم في وسط مدينة موروني، ويمكن الوصول إليه سيرًا على الأقدام من الوزارات والبنوك والسفارات والميناء. تتوفر مواقف عامة على طول ساحة فرنسا والشارع المجاور، على بُعد أقل من خمسين مترًا من مدخل الشرفة.',
      takeawayKicker: '02. الطلبات الخارجية والمجموعات',
      takeawayTitle: 'طلبات خارجية وطاولات كبيرة',
      takeawayText:
        'يمكن طلب جميع أطباق القائمة للوجبات الخارجية إلى مكتبك أو منزلك بالاتصال قبل عشرين دقيقة من الوصول. للمجموعات من 8 إلى 30 شخصًا (غداءات رسمية، اجتماعات، عشاءات عائلية)، نخصص منطقة في القاعة المكيفة أو الشرفة.',
      paymentKicker: 'الدفع في الموقع أو للطلبات الخارجية',
      paymentTitle: 'وسائل الدفع المقبولة',
      faqKicker: 'خدمات القاعة والشرفة',
      faqTitle: 'الأسئلة الشائعة',
    },
    events: {
      kicker: 'الفعاليات · لو نيو سيليكت، موروني',
      title: 'الفعاليات القادمة',
      intro:
        'أمسيات موسيقية واحتفالات ولقاءات مهنية: اكتشف مواعيد لو نيو سيليكت القادمة تحت أشجار البادامير في ساحة فرنسا أو في قاعتنا المكيفة.',
      all: 'جميع الفعاليات',
      filtersAria: 'تصفية الفعاليات حسب الفئة',
      empty: 'لا توجد فعاليات في هذه الفئة.',
      dateLabel: 'التاريخ',
      timeLabel: 'الوقت',
      locationLabel: 'المكان',
      free: 'مجاني',
      priceOnRequest: 'السعر عند الطلب',
      bookTickets: 'احجز تذاكر',
      ticketsRemaining: 'بقي {count} تذكرة',
      salePoints: 'أماكن البيع',
      buyOnline: 'اشترِ عبر الإنترنت',
      ticketFormTitle: 'حجز تذاكر — {title}',
      ticketQuantity: 'عدد التذاكر',
      ticketName: 'الاسم الكامل',
      ticketPhone: 'واتساب / الهاتف',
      ticketEmail: 'البريد الإلكتروني (اختياري)',
      ticketSubmit: 'إرسال طلب الحجز',
      ticketSending: 'جارٍ الإرسال…',
      ticketConfirmTitle: 'تم تسجيل طلب التذاكر',
      ticketConfirmText:
        'تم تسجيل طلبك (المرجع {ref}). سيتواصل معك فريقنا للتأكيد والدفع.',
      ticketReference: 'المرجع',
      ticketWhatsapp: 'إتمام الطلب عبر واتساب',
      ticketError: 'تعذر تسجيل الطلب. أعد المحاولة أو اتصل بنا.',
      organizeTitle: 'تنظيم فعالية',
      organizeText:
        'عيد ميلاد أو زفاف أو سهرة للفريق أو استقبال رسمي: يعد فريقنا قائمة ومكانًا مناسبين لضيوفك.',
      organizeCta: 'طلب عرض سعر',
    },
    footer: {
      description:
        'بيت مفتوح كل يوم في ساحة فرنسا، يجمع بين منتجات المحيط الهندي الطازجة وخبرة البيسترو.',
      navigation: 'التنقل',
      location: 'موروني · ساحة فرنسا',
      rights: '© {year} {name} · موروني، اتحاد جزر القمر',
      taglineLine: 'شرفة مظللة · قاعة مكيفة · طلبات خارجية',
      ownerSpace: 'مساحة المالك',
      openItinerary: 'فتح الاتجاهات إلى ساحة فرنسا',
      menuLink: 'القائمة',
      historyLink: 'قصتنا',
      galleryLink: 'معرض الصور',
      eventsLink: 'الفعاليات',
      reservationLink: 'الحجز والتواصل',
      infosLink: 'معلومات عملية',
    },
    dashboard: {
      title: 'الإدارة',
      backToSite: 'العودة إلى الموقع',
      tabs: {
        overview: 'لوحة التحكم',
        dishes: 'الأطباق',
        menuCategories: 'فئات القائمة',
        dailySpecials: 'أطباق اليوم',
        events: 'الفعاليات',
        info: 'المعلومات',
        gallery: 'المعرض',
        team: 'الفريق',
        faq: 'الأسئلة الشائعة',
        media: 'الوسائط',
        clients: 'العملاء',
      },
      status: {
        live: 'المزامنة المباشرة نشطة',
        local: 'الوضع المحلي',
        checking: 'جارٍ التحقق من الوصول…',
      },
      logout: 'تسجيل الخروج',
      setup: {
        title: 'إعداد Supabase مطلوب',
        notice:
          'لوحة التحكم جاهزة، لكن مفتاح Supabase العام غير مُعرّف بعد في بيئة التطبيق.',
        varsTitle: 'المتغيرات المطلوب ضبطها:',
        help: 'أضفها إلى .env.local محليًا، ثم إلى متغيرات البيئة في Vercel. بعد ذلك نفّذ supabase/migrations/001_lns_site_content.sql في محرر SQL في Supabase. يُكشف مفتاح anon فقط للمتصفح: يجب عدم استخدام مفتاح service_role هنا.',
      },
      login: {
        kicker: 'مساحة المالك',
        title: 'تسجيل الدخول',
        intro: 'مخصص لمالك المطعم. استخدم حساب Supabase Auth المصرح به.',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        submit: 'تسجيل الدخول',
        submitting: 'جارٍ تسجيل الدخول…',
      },
      clients: {
        title: 'العملاء والطلبات',
        description:
          'بيانات تُحفظ تلقائيًا عندما يؤكد العميل طلبًا (السلة) أو يؤكد طلب حجز.',
        refresh: 'تحديث',
        deleteAll: 'حذف الكل',
        deleteAllConfirm: 'حذف جميع سجلات العملاء؟',
        count: '{count} سجل(ات)',
        empty: 'لا توجد سجلات بعد. ستظهر البيانات هنا عندما يؤكد عميل طلبًا أو طلب حجز.',
        deleted: 'تم حذف السجل.',
        cleared: 'تم حذف جميع السجلات.',
        deleteError: 'تعذّر الحذف.',
        loadError: 'تعذّر تحميل بيانات العملاء.',
        order: 'طلب',
        reservation: 'حجز',
        ticket: 'تذاكر',
        deleteRecord: 'حذف سجل {name}',
        note: 'ملاحظة: {note}',
        migrationNotice:
          'إذا لم تكن جدول Supabase lns_client_records مُنشأ بعد، نفّذ الترحيل 003_lns_client_records.sql. وللتذاكر نفّذ أيضًا 005_lns_ticket_records.sql. تُحفظ السجلات أيضًا محليًا في هذا المتصفح كنسخة احتياطية.',
      },
      editors: {
        common: {
          save: 'حفظ',
          cancel: 'إلغاء',
          edit: 'تعديل',
          delete: 'حذف',
          close: 'إغلاق',
          refresh: 'تحديث',
          show: 'إظهار',
          hide: 'إخفاء',
          visible: 'مرئي',
          hidden: 'مخفي',
          order: 'ترتيب العرض',
          title: 'العنوان',
          description: 'الوصف',
          image: 'الصورة',
          modify: 'تعديل',
          addNew: 'إضافة',
        },
        overview: {
          kicker: 'نظرة عامة',
          title: 'مرحبًا بك في مساحة المالك',
          description:
            'عدّل الأطباق وبيانات الاتصال والصور والفريق: يتم تحديث موقع العملاء تلقائيًا عبر Supabase Realtime.',
          statDishes: 'أطباق القائمة',
          statGallery: 'صور المعرض',
          statTeam: 'أعضاء الفريق',
          statFaq: 'الأسئلة الشائعة',
          statCategories: 'فئات القائمة',
          statEvents: 'الفعاليات القادمة',
          importNew: 'استيراد المحتوى الجديد',
          importNewConfirm:
            'استيراد الفئات وأطباق اليوم والفعاليات الناقصة؟ ستُحفظ تعديلاتك الحالية.',
          syncTitle: 'حالة المزامنة',
          sourceLabel: 'مصدر البيانات',
          sourceSupabase: 'Supabase',
          sourceLocal: 'محتوى محلي',
          liveLabel: 'التحديثات المباشرة',
          liveActive: 'نشطة',
          liveInactive: 'غير نشطة',
          noDataNotice:
            'لا توجد بيانات في Supabase بعد. استورد المحتوى الأصلي للبدء في إدارة الموقع من لوحة التحكم.',
          migrationNotice:
            'جداول مفقودة في Supabase: {tables}. نفّذ الترحيل 004_lns_menu_events.sql في محرر SQL لنشر هذه الأقسام على الموقع.',
          importMissing: 'استيراد المحتوى الناقص',
          imported: 'تم استيراد المحتوى الناقص (مع الحفاظ على التعديلات).',
          viewSite: 'عرض الموقع',
          howTitle: 'كيف يعمل',
          how1: 'استورد المحتوى الناقص مرة واحدة: لن تُستبدل تعديلاتك المحفوظة.',
          how2: 'عدّل طبقًا أو معلومة: يُحفظ التغيير في Supabase.',
          how3: 'يرى الزوار التغيير فورًا دون إعادة تحميل الصفحة.',
          how4: 'استخدم «إخفاء» لإزالة عنصر من الموقع دون حذفه.',
        },
        menu: {
          title: 'الأطباق',
          description:
            'أضف طبقًا أو عدّل سعره أو صورته أو أخفه أثناء النفاد. يتم تحديث إجمالي سلة العميل تلقائيًا.',
          all: 'الكل',
          editDish: 'تعديل الطبق',
          newDish: 'طبق جديد',
          name: 'اسم الطبق',
          priceKmf: 'السعر (KMF)',
          category: 'الفئة',
          noCategory: 'بدون فئة',
          priceOptions: 'خيارات الأسعار',
          priceOptionsHint: 'مثال: 26 سم / 33 سم، حصة صغيرة / كبيرة.',
          optionLabel: 'اسم الخيار',
          optionPrice: 'سعر الخيار (KMF)',
          addOption: 'إضافة خيار',
          removeOption: 'إزالة الخيار',
          moment: 'وقت التقديم',
          section: 'قسم القائمة',
          badge: 'شارة (اختياري)',
          badgeHint: 'مثال: مميز، عند التوفر، منزلي.',
          order: 'ترتيب العرض',
          descriptionField: 'الوصف',
          photo: 'صورة الطبق',
          showOnSite: 'إظهار في الموقع',
          signature: 'طبق مميز (الرئيسية)',
          saved: 'تم حفظ الطبق. موقع العملاء محدّث.',
          deleted: 'تم حذف الطبق.',
          shown: 'تم إظهار الطبق.',
          hidden: 'تم إخفاء الطبق.',
          empty: 'لا توجد أطباق في هذه الفئة.',
          hiddenBadge: 'مخفي',
          signatureBadge: 'مميز',
        },
        menuCategories: {
          title: 'فئات القائمة',
          description: 'نظّم أقسام قائمتك: الاسم والوصف وترتيب العرض والظهور.',
          newCategory: 'فئة جديدة',
          editCategory: 'تعديل الفئة',
          name: 'اسم الفئة',
          descriptionField: 'الوصف',
          showOnSite: 'إظهار في القائمة',
          saved: 'تم حفظ الفئة.',
          deleted: 'تم حذف الفئة.',
          empty: 'لا توجد فئات بعد.',
          hiddenBadge: 'مخفية',
        },
        dailySpecials: {
          title: 'أطباق اليوم',
          description:
            'جدولة أطباق اليوم مع فترات صلاحيتها: يُعرض الطبق الحالي فقط في الموقع.',
          newSpecial: 'طبق يوم جديد',
          editSpecial: 'تعديل طبق اليوم',
          dishName: 'اسم الطبق',
          descriptionField: 'الوصف',
          priceKmf: 'السعر (KMF)',
          image: 'صورة الطبق',
          startDate: 'تاريخ البداية',
          endDate: 'تاريخ النهاية',
          availability: 'التوفر',
          showOnSite: 'إظهار في الموقع',
          saved: 'تم حفظ طبق اليوم.',
          deleted: 'تم حذف طبق اليوم.',
          empty: 'لا توجد أطباق يوم مجدولة.',
          hiddenBadge: 'مخفي',
        },
        events: {
          title: 'الفعاليات',
          description:
            'أضف الفعاليات وفئاتها: تظهر التواريخ والمكان والسعر والظهور في صفحة الفعاليات.',
          newEvent: 'فعالية جديدة',
          editEvent: 'تعديل الفعالية',
          eventTitle: 'عنوان الفعالية',
          descriptionField: 'الوصف',
          category: 'الفئة',
          date: 'تاريخ البداية',
          endDate: 'تاريخ النهاية (اختياري)',
          time: 'الوقت',
          location: 'المكان',
          priceKmf: 'السعر (KMF)',
          freeHint: 'اترك القيمة 0 لفعالية مجانية.',
          ticketPriceKmf: 'سعر التذكرة (KMF)',
          ticketsAvailable: 'التذاكر المتاحة',
          salePoints: 'أماكن البيع / طريقة الشراء',
          ticketingUrl: 'رابط البيع عبر الإنترنت (اختياري)',
          ticketHint: 'تظهر هذه المعلومات في قسم التذاكر بصفحة الفعاليات.',
          bookTicketsBadge: 'التذاكر',
          seatsBadge: '{count} مقعد',
          image: 'صورة الفعالية',
          showOnSite: 'إظهار في الموقع',
          saved: 'تم حفظ الفعالية.',
          deleted: 'تم حذف الفعالية.',
          empty: 'لا توجد فعاليات بعد.',
          hiddenBadge: 'مخفي',
          categoriesTitle: 'فئات الفعاليات',
          categoriesHint: 'صنّف الفعاليات (احتفالات، مناسبات، سهرات، إلخ).',
          newCategory: 'فئة جديدة',
          categoryName: 'اسم الفئة',
          categoryDescription: 'الوصف',
          categorySaved: 'تم حفظ الفئة.',
          categoryDeleted: 'تم حذف الفئة.',
          categoryDeleteConfirm: 'حذف الفئة {name}؟',
          categoryInUse: 'لا تزال هناك {count} فعالية تستخدم الفئة {name}.',
          deleteConfirm: 'حذف الفعالية {name}؟',
        },
        settings: {
          title: 'المعلومات الأساسية',
          description:
            'الاسم وبيانات الاتصال وساعات العمل والصورة الرئيسية وطبق اليوم: تغذي هذه الحقول جميع صفحات الموقع.',
          saved: 'تم حفظ المعلومات.',
          restaurantName: 'اسم المطعم',
          tagline: 'الشعار',
          address: 'العنوان',
          country: 'البلد',
          phoneDisplay: 'الهاتف المعروض',
          phoneLink: 'رابط الهاتف',
          whatsappLink: 'رابط واتساب',
          whatsappHint: 'مثال: https://wa.me/2697730031 — يُستخدم للطلبات والحجوزات.',
          email: 'البريد الإلكتروني',
          hoursSummary: 'ساعات العمل (ملخص)',
          directionsLink: 'رابط الاتجاهات',
          latitude: 'خط العرض',
          longitude: 'خط الطول',
          heroImage: 'الصورة الرئيسية (الرئيسية)',
          chefTitle: 'طبق اليوم',
          chefDescription: 'يُعرض أعلى القائمة.',
          chefHeading: 'العنوان',
          chefSubtitle: 'العنوان الفرعي',
          chefDish: 'اسم الطبق',
          chefPrice: 'السعر (KMF)',
          chefAvailability: 'التوفر',
          saveButton: 'حفظ المعلومات',
        },
        gallery: {
          title: 'معرض الصور',
          description:
            'استبدل صور الشرفة والقاعة والأطباق. تُخزّن الصور المرفوعة في حاوية Supabase المخصصة.',
          newPhoto: 'صورة جديدة',
          editPhoto: 'تعديل الصورة',
          category: 'الفئة',
          caption: 'التعليق',
          showInGallery: 'إظهار في المعرض',
          saved: 'تم حفظ الصورة.',
          deleted: 'تم حذف الصورة.',
          hiddenBadge: 'مخفية',
        },
        brigade: {
          title: 'الفريق',
          description: 'عرّف بالفريق في صفحة «قصتنا».',
          newMember: 'عضو جديد',
          name: 'الاسم',
          role: 'الدور',
          tenure: 'مدة الخدمة',
          bio: 'السيرة',
          showOnSite: 'إظهار في الموقع',
          saved: 'تم حفظ العضو.',
          deleted: 'تم حذف العضو.',
        },
        faq: {
          title: 'الأسئلة الشائعة',
          description: 'أدر الإجابات المعروضة في صفحة «معلومات عملية».',
          newQuestion: 'سؤال جديد',
          question: 'السؤال',
          answer: 'الإجابة',
          showOnSite: 'إظهار في الموقع',
          saved: 'تم حفظ السؤال.',
          deleted: 'تم حذف السؤال.',
        },
        media: {
          title: 'مكتبة الوسائط',
          description: 'ارفع صورك مرة واحدة، ثم انسخ رابطها إلى طبق أو صورة في المعرض.',
          upload: 'استيراد الصور',
          uploading: 'جارٍ الرفع…',
          imported: 'تم استيراد {count} صورة.',
          uploadError: 'تعذّر الرفع',
          listError: 'تعذّر عرض الوسائط',
          copyUrl: 'نسخ الرابط',
          copied: 'تم نسخ الرابط.',
          empty: 'لا توجد صور في المكتبة.',
        },
        errorUnknown: 'خطأ غير معروف',
        errorValidation:
          'تحقق من حقول النموذج قبل الحفظ (السعر، التواريخ، الحقول الإلزامية).',
      },
    },
    pages: {
      accueil: 'الرئيسية',
      menu: 'القائمة',
      pizzas: 'بيتزاتنا',
      platsDuJour: 'أطباق اليوم',
      histoire: 'قصتنا',
      galerie: 'معرض الصور',
      reservation: 'الحجز والتواصل',
      infos: 'معلومات عملية',
      evenements: 'الفعاليات',
      admin: 'الإدارة',
    },
  },
  sw: {
    nav: {
      home: 'Mwanzo',
      menu: 'Menyu',
      pizzas: 'Pizza',
      dailySpecials: 'Sahani za Siku',
      history: 'Historia Yetu',
      gallery: 'Matunzio',
      infos: 'Taarifa Muhimu',
      reservation: 'Hifadhi',
      reservationContact: 'Uhifadhi & Mawasiliano',
      admin: 'Usimamizi',
      events: 'Matukio',
      mainAria: 'Urambazaji mkuu',
      mobileAria: 'Urambazaji wa simu',
      openMenu: 'Fungua menyu',
      closeMenu: 'Funga menyu',
      skipToContent: 'Ruka kwenda maudhui',
      switchToLight: 'Washa hali ya mwanga',
      switchToDark: 'Washa hali ya giza',
    },
    common: {
      bookTable: 'Hifadhi meza',
      seeMenu: 'Tazama Menyu',
      viewFullMenu: 'Tazama menyu yote',
      reserveTable: 'Hifadhi meza',
      contactRoom: 'Wasiliana na mgahawa',
      callRestaurant: 'Piga simu mgahawa',
      writeWhatsApp: 'Andika kwenye WhatsApp',
      openDirections: 'Maelekezo kwenda Place de France',
      openGpsMap: 'Fungua ramani ya GPS',
      openItinerary: 'Maelekezo ya GPS kwenda Place de France',
      askGroupQuote: 'Omba makadirio ya kikundi',
      modifyReservation: 'Badilisha uhifadhi',
      confirmRequest: 'Thibitisha ombi',
      add: 'Ongeza',
      added: 'Imeongezwa',
      addToCart: 'Ongeza kwenye kikapu',
      addedCount: 'Imeongezwa ({count})',
      viewCart: 'Tazama kikapu ({count}) · {total}',
      closeCart: 'Funga kikapu',
      yourCart: 'Kikapu chako',
      currentOrder: 'Oda ya sasa',
      cartEmpty:
        'Hakuna chakula kilichochaguliwa. Ongeza chakula kutoka kwenye menyu ili kuunda oda yako.',
      remove: 'Ondoa {name} kwenye kikapu',
      removeUnit: 'Punguza moja ya {name}',
      addUnit: 'Ongeza moja ya {name}',
      totalToPay: 'Jumla ya kulipa hapa',
      pricesNote: 'Bei zimeonyeshwa kwa faranga za Komori, kodi imejumuishwa.',
      validateOrder: 'Thibitisha oda',
      emptyCart: 'Futa kikapu',
      orderNote:
        'Maelezo ya oda yako hujazwa tayari kwenye WhatsApp. Mgahawa utathibitisha upatikanaji na muda wa maandalizi kabla ya malipo hapa.',
      closePreview: 'Funga mwonekano',
      previousPhoto: 'Picha iliyotangulia',
      nextPhoto: 'Picha inayofuata',
      enlargePhoto: 'Kuza picha: {title}',
      preparedToOrder: 'Huandaliwa unapoiagiza',
      preparedMinute: 'Huandaliwa papo hapo',
      accordingToArrival: 'Kulingana na upatikanaji',
      article: 'bidhaa',
      articles: 'bidhaa',
      liveMenu: 'Menyu imesasishwa moja kwa moja',
      ratherBook: 'Hifadhi meza badala yake',
      group15: 'Kikundi (watu 15+)',
      person: 'mtu',
      people: 'watu',
    },
    home: {
      location: 'Place de France · Moroni, Ngazidja',
      taglineFallback: 'Vyakula vya Kifaransa na Ulaya katikati ya Moroni',
      intro:
        'Kutoka kahawa ya asubuhi saa 1:00 asubuhi hadi chakula cha jioni chini ya miti ya Place de France, Le New Select huunganisha utamaduni wa bistrot na samaki safi na viungo vya Bahari ya Hindi.',
      heroAlt:
        'Mtaro wenye kivuli wa mgahawa wa Le New Select kwenye Place de France huko Moroni',
      viewMenuBtn: 'Tazama Menyu',
      itineraryBtn: 'Maelekezo kwenda Place de France',
      hoursLabel: 'Saa za kufungua',
      outdoorLabel: 'Eneo la nje',
      outdoorValue: 'Mtaro chini ya miti ya mkungu',
      indoorLabel: 'Starehe ya ndani',
      indoorValue: 'Chumba chenye kiyoyozi na Wi-Fi',
      reservationLabel: 'Uhifadhi na kuchukua',
      signatureKicker: 'Chaguo la nyumba · Bei kwa Faranga za Komori',
      signatureTitle: 'Vyakula vyetu vitatu maarufu',
      signatureAll: 'Tazama menyu yote',
      dailySpecialKicker: 'Chakula cha siku · Kulingana na upatikanaji',
      dailySpecialTitle: 'Chakula cha siku',
      dailySpecialAll: 'Tazama vyakula vyote vya siku',
      eventsKicker: 'Matukio yajayo · Place de France',
      eventsTitle: 'Matukio yajayo',
      eventsAll: 'Matukio yote',
      eventsEmpty: 'Hakuna matukio yajayo kwa sasa.',
      eventsNextBadge: 'Tukio linalofuata',
      reviewsKicker: 'Maoni yaliyothibitishwa · TripAdvisor Moroni',
      reviewsTitle: 'Maoni ya wageni wetu',
      avgRatingAria: 'Wastani wa ukadiriaji: 4.6 kati ya 5',
      avgRating: '4.6 / 5',
      certified: 'Maoni yaliyothibitishwa ya TripAdvisor',
    },
    menu: {
      kicker: 'Menyu · Bei halisi kwa Faranga za Komori (KMF)',
      title: 'Menyu inayofuata mwendo wa siku',
      intro:
        'Kutoka kifungua kinywa hadi nyama choma jioni, vyakula vyetu huandaliwa unapoiagiza kwa samaki wa pwani ya Ngazidja. Chagua vyakula vyako, jumla huhesabiwa kiotomatiki na oda yako hutumwa moja kwa moja kwenye WhatsApp.',
      tabsAria: 'Chuja menyu kulingana na wakati wa siku',
      all: 'Menyu yote',
      breakfast: 'Kifungua kinywa · kuanzia 07:00',
      lunch: 'Chakula cha mchana · 12:00–15:00',
      dinner: 'Chakula cha jioni · 18:30–23:00',
      dessertsDrinks: 'Vitindamcho & Vinywaji',
      categories: {
        breakfast: 'Kifungua kinywa',
        lunch: 'Chakula cha mchana',
        dinner: 'Chakula cha jioni',
        dessertsDrinks: 'Vitindamcho & Vinywaji',
      },
      chooseOption: 'Chagua chaguo',
      noDailySpecial: 'Hakuna chakula cha siku kwa sasa.',
      empty: 'Hakuna vyakula vinavyopatikana kwa huduma hii.',
      headings: {
        breakfast: {
          title: 'Kifungua kinywa',
          hours: 'Hutolewa kuanzia 07:00 hadi 10:30 mtaroni na ndani',
        },
        lunch: {
          title: 'Chakula cha mchana',
          hours: 'Hutolewa kuanzia 12:00 hadi 15:00 · Seti na menyu kamili',
        },
        dinner: {
          title: 'Chakula cha jioni',
          hours:
            'Hutolewa kuanzia 18:30 hadi 23:00 · Nyama choma, samaki na vyakula vya bistrot',
        },
        dessertsDrinks: {
          title: 'Vitindamcho vya nyumbani & Vinywaji',
          hours: 'Keki za siku, juisi safi na kahawa',
        },
      },
      chefSuggestion: 'Pendekezo la mpishi mkuu',
      cartAria: 'Oda yako',
      cartCount: '{count} {label}',
      customerInfoTitle: 'Maelezo yako',
      customerName: 'Jina',
      customerWhatsApp: 'Nambari ya WhatsApp',
      customerNamePlaceholder: 'Jina lako',
      customerWhatsAppPlaceholder: '+269 3XX XX XX',
      customerRequired:
        'Tafadhali weka jina lako na nambari ya WhatsApp ili kuthibitisha oda.',
    },
    gallery: {
      kicker: 'Matunzio ya Picha · Mazingira & Sahani',
      title: 'Chini ya miti ya mkungu na jikoni',
      intro:
        'Tembelea mtaro wa Place de France, chumba chenye kiyoyozi na sahani zetu zilizoandaliwa siku nzima.',
      filtersAria: 'Chuja matunzio ya picha',
      all: 'Maoni yote',
      terrace: 'Mtaro',
      room: 'Chumba',
      dishes: 'Vyakula',
      events: 'Matukio',
    },
    history: {
      kicker: 'Historia Yetu · Moroni, Place de France',
      title: 'Meza iliyo wazi kuelekea Place de France',
      intro1:
        'Likiwa limeelekea matao ya kihistoria ya Place de France, Le New Select limekuwa mahali pa kukutana pa kawaida katikati ya Moroni kwa miaka mingi. Wageni huja kunywa kahawa kali kuanzia saa moja asubuhi, chakula cha mchana cha kazi katika chumba chenye kiyoyozi, au chakula cha jioni tulivu chini ya kivuli cha miti ya mkungu.',
      intro2:
        'Nyumba yetu inatetea upishi ulio wazi na wa kweli: mbinu za bistrot ya Kifaransa zinazotumika kwa uangalifu kwenye hazina za baharini na kilimo za Ngazidja.',
      discoverMenu: 'Gundua menyu',
      pillarsKicker: 'Falsafa ya upishi',
      pillarsTitle: 'Misingi yetu mitatu',
      pillars: [
        {
          title: 'Roho ya bistrot ya Kifaransa',
          description:
            'Upishi sahihi, michuzi ya siagi, mchuzi unaopikwa hapa na huduma makini: umahiri wa upishi uliorithiwa kutoka kwa migahawa ya jadi.',
        },
        {
          title: 'Bidhaa safi kutoka Bahari ya Hindi',
          description:
            'Samaki capitaine, jodari, chewa na kamba hutoka kwa wavuvi wa asubuhi wa Moroni, Itsandra na Mitsamiouli.',
        },
        {
          title: 'Ugavi wa ndani kutoka Ngazidja',
          description:
            'Vanila ya Bourbon, pilipili hoho kijani, karafuu, combava, mboga za majani na mihogo kutoka miteremko ya Mlima Karthala huipa kila sahani utambulisho wa Komori.',
        },
      ],
      teamKicker: 'Timu ya jikoni na ukumbini',
      teamTitle: 'Kikosi na wahudumu wakuu',
      heroAlt:
        'Chumba chenye kiyoyozi na mbao katika mgahawa wa Le New Select huko Moroni',
    },
    reservation: {
      kicker: 'Uhifadhi & Mawasiliano · Moroni, Place de France',
      title: 'Hifadhi meza yako',
      intro:
        'Chagua kukaa mtaroni chini ya miti au ndani ya chumba chenye kiyoyozi. Uthibitisho wa papo hapo au kwa simu kwa ',
      seatingLegend: 'Chaguo la kukaa',
      terraceTitle: 'Mtaro wenye kivuli',
      terraceDetail: 'Chini ya miti ya mkungu · Mtazamo wa Place de France',
      roomTitle: 'Chumba chenye kiyoyozi',
      roomDetail: 'Mazingira tulivu · Bora kwa mikutano ya kazi',
      fullName: 'Jina kamili *',
      fullNamePlaceholder: 'Mfano: Aminata Said',
      phone: 'Simu / WhatsApp *',
      phonePlaceholder: '+269 3XX XX XX',
      date: 'Tarehe *',
      time: 'Muda wa kuwasili',
      guests: 'Wageni',
      email: 'Barua pepe (hiari)',
      emailPlaceholder: 'jina@mfano.com',
      notes: 'Maelezo au mzio',
      notesPlaceholder: 'Kiti cha mtoto, meza tulivu, bila samakigamba...',
      serviceHours: 'Huduma mfululizo kuanzia 07:00 hadi 23:00',
      confirmedKicker: 'Rejea {ref}',
      confirmedTitle: 'Ombi la uhifadhi limehifadhiwa',
      confirmedThanks:
        'Asante {name}. Ombi lako liko tayari; litume kupitia WhatsApp kwa kushughulikiwa mara moja na mhudumu wetu mkuu.',
      dateTime: 'Tarehe & Saa',
      covers: 'Idadi ya wageni',
      seating: 'Mahali unayopendelea',
      phoneLabel: 'Simu',
      confirmWhatsApp: 'Thibitisha kupitia WhatsApp',
      directLine: 'Simu ya moja kwa moja',
      contactWithoutWaiting: 'Wasiliana na mgahawa moja kwa moja',
      whatsappQuick: 'Jibu la haraka',
      mapKicker: 'Mahali · Moroni',
      mapTitle: 'Ramani ya Place de France',
      mapAlt:
        'Ramani ya mchoro ya Place de France huko Moroni na alama karibu na mgahawa wa Le New Select',
      viewLandmark: 'Tazama alama: {name}',
      whatsappPrefill: 'Habari Le New Select, ningependa kuhifadhi meza.',
    },
    infos: {
      kicker: 'Taarifa Muhimu · Moroni',
      title: 'Jiandae kwa ziara yako Le New Select',
      intro:
        'Ufikiaji, maegesho karibu na Place de France, njia za malipo na majibu ya maswali yanayoulizwa mara kwa mara.',
      accessKicker: '01. Ufikiaji & Maegesho',
      accessTitle: 'Karibu na Place de France',
      accessText:
        'Likiwa katikati mwa jiji la Moroni, mgahawa unafikika kwa miguu kutoka wizara, benki, ubalozi na bandari. Nafasi za maegesho ya umma ziko kando ya Place de France na barabara ya karibu, chini ya mita hamsini kutoka lango la mtaro.',
      takeawayKicker: '02. Kuchukua & Vikundi',
      takeawayTitle: 'Chakula cha kuchukua na meza kubwa',
      takeawayText:
        'Vyakula vyote kwenye menyu vinaweza kuagizwa kuchukuliwa kwenda ofisini au nyumbani kwako kwa kupiga simu dakika ishirini kabla ya kufika. Kwa vikundi vya watu 8 hadi 30 (mikutano rasmi, vikao, chakula cha familia), tunaweza kutenga eneo la chumba chenye kiyoyozi au mtaro.',
      paymentKicker: 'Malipo hapa au kuchukua',
      paymentTitle: 'Njia za malipo zinazokubaliwa',
      faqKicker: 'Huduma ndani na mtaroni',
      faqTitle: 'Maswali yanayoulizwa mara kwa mara',
    },
    events: {
      kicker: 'Matukio · Le New Select, Moroni',
      title: 'Matukio yajayo',
      intro:
        'Jioni za muziki, sherehe na mikutano ya kazi: gundua matukio yajayo ya Le New Select chini ya miti ya mkungu ya Place de France au ndani ya chumba chetu chenye kiyoyozi.',
      all: 'Matukio yote',
      filtersAria: 'Chuja matukio kulingana na kundi',
      empty: 'Hakuna matukio katika kundi hili.',
      dateLabel: 'Tarehe',
      timeLabel: 'Saa',
      locationLabel: 'Mahali',
      free: 'Bure',
      priceOnRequest: 'Bei hutolewa unapouliza',
      bookTickets: 'Hifadhi tiketi',
      ticketsRemaining: 'Tiketi {count} zimesalia',
      salePoints: 'Mahali pa kununua',
      buyOnline: 'Nunua mtandaoni',
      ticketFormTitle: 'Hifadhi tiketi — {title}',
      ticketQuantity: 'Idadi ya tiketi',
      ticketName: 'Jina kamili',
      ticketPhone: 'WhatsApp / Simu',
      ticketEmail: 'Barua pepe (si lazima)',
      ticketSubmit: 'Tuma ombi la uhifadhi',
      ticketSending: 'Inatuma…',
      ticketConfirmTitle: 'Ombi la tiketi limehifadhiwa',
      ticketConfirmText:
        'Ombi lako limehifadhiwa (marejeo {ref}). Timu yetu itawasiliana ili kuthibitisha na kulipa.',
      ticketReference: 'Marejeo',
      ticketWhatsapp: 'Maliza kwenye WhatsApp',
      ticketError: 'Imeshindwa kuhifadhi ombi. Jaribu tena au wasiliana nasi.',
      organizeTitle: 'Panga tukio',
      organizeText:
        'Siku ya kuzaliwa, harusi, jioni ya timu au mapokezi rasmi: timu yetu huandaa menyu na nafasi inayofaa wageni wako.',
      organizeCta: 'Omba makadirio',
    },
    footer: {
      description:
        'Nyumba iliyo wazi kila siku kwenye Place de France, ikichanganya mazao safi ya Bahari ya Hindi na ujuzi wa bistrot.',
      navigation: 'Urambazaji',
      location: 'Moroni · Place de France',
      rights: '© {year} {name} · Moroni, Umoja wa Komori',
      taglineLine: 'Mtaro wenye kivuli · Chumba chenye kiyoyozi · Kuchukua',
      ownerSpace: 'Eneo la mmiliki',
      openItinerary: 'Fungua maelekezo kwenda Place de France',
      menuLink: 'Menyu',
      historyLink: 'Historia Yetu',
      galleryLink: 'Matunzio ya Picha',
      eventsLink: 'Matukio',
      reservationLink: 'Uhifadhi & Mawasiliano',
      infosLink: 'Taarifa Muhimu',
    },
    dashboard: {
      title: 'Usimamizi',
      backToSite: 'Rudi kwenye tovuti',
      tabs: {
        overview: 'Dashibodi',
        dishes: 'Vyakula',
        menuCategories: 'Makundi ya menyu',
        dailySpecials: 'Vyakula vya siku',
        events: 'Matukio',
        info: 'Taarifa',
        gallery: 'Matunzio',
        team: 'Timu',
        faq: 'Maswali',
        media: 'Midia',
        clients: 'Wateja',
      },
      status: {
        live: 'Usawazishaji wa moja kwa moja unafanya kazi',
        local: 'Hali ya ndani',
        checking: 'Inakagua ufikiaji…',
      },
      logout: 'Toka',
      setup: {
        title: 'Usanidi wa Supabase unahitajika',
        notice:
          'Dashibodi iko tayari, lakini ufunguo wa umma wa Supabase bado haujawekwa katika mazingira ya programu.',
        varsTitle: 'Vigezo vya kuweka:',
        help: 'Viongeze kwenye .env.local ndani ya kifaa, kisha kwenye vigezo vya mazingira vya Vercel. Kisha endesha supabase/migrations/001_lns_site_content.sql katika Kihariri cha SQL cha Supabase. Ufunguo wa anon pekee ndio unaoonekana kwenye kivinjari: ufunguo wa service_role haupaswi kutumika hapa.',
      },
      login: {
        kicker: 'Eneo la mmiliki',
        title: 'Ingia',
        intro:
          'Imetengwa kwa mmiliki wa mgahawa. Tumia akaunti iliyoidhinishwa ya Supabase Auth.',
        email: 'Barua pepe',
        password: 'Nenosiri',
        submit: 'Ingia',
        submitting: 'Inaingia…',
      },
      clients: {
        title: 'Wateja na maombi',
        description:
          'Data iliyohifadhiwa kiotomatiki mteja anapothibitisha oda (kikapu) au kuthibitisha ombi la uhifadhi.',
        refresh: 'Onyesha upya',
        deleteAll: 'Futa vyote',
        deleteAllConfirm: 'Futa rekodi zote za wateja?',
        count: 'Rekodi {count}',
        empty:
          'Hakuna rekodi bado. Data itaonekana hapa mteja anapothibitisha oda au ombi la uhifadhi.',
        deleted: 'Rekodi imefutwa.',
        cleared: 'Rekodi zote zimefutwa.',
        deleteError: 'Imeshindwa kufuta.',
        loadError: 'Imeshindwa kupakia data ya wateja.',
        order: 'Oda',
        reservation: 'Uhifadhi',
        ticket: 'Tiketi',
        deleteRecord: 'Futa rekodi ya {name}',
        note: 'Kumbuka: {note}',
        migrationNotice:
          'Ikiwa jedwali la Supabase lns_client_records bado halijaundwa, endesha uhamishaji 003_lns_client_records.sql. Kwa tiketi, endesha pia 005_lns_ticket_records.sql. Rekodi pia huhifadhiwa ndani ya kivinjari hiki kama nakala ya akiba.',
      },
      editors: {
        common: {
          save: 'Hifadhi',
          cancel: 'Ghairi',
          edit: 'Hariri',
          delete: 'Futa',
          close: 'Funga',
          refresh: 'Onyesha upya',
          show: 'Onyesha',
          hide: 'Ficha',
          visible: 'Inaonekana',
          hidden: 'Imefichwa',
          order: 'Mpangilio wa kuonyesha',
          title: 'Kichwa',
          description: 'Maelezo',
          image: 'Picha',
          modify: 'Hariri',
          addNew: 'Ongeza',
        },
        overview: {
          kicker: 'Muhtasari',
          title: 'Karibu katika eneo la mmiliki',
          description:
            'Hariri vyakula, maelezo ya mawasiliano, picha au timu: tovuti ya wateja husasishwa kiotomatiki kupitia Supabase Realtime.',
          statDishes: 'Vyakula vya menyu',
          statGallery: 'Picha za matunzio',
          statTeam: 'Wanachama wa timu',
          statFaq: 'Maswali ya mara kwa mara',
          statCategories: 'Makundi ya menyu',
          statEvents: 'Matukio yajayo',
          importNew: 'Ingiza maudhui mapya',
          importNewConfirm:
            'Ingiza makundi, vyakula vya siku na matukio yanayokosekana? Mabadiliko yako yaliyohifadhiwa yatabaki.',
          syncTitle: 'Hali ya usawazishaji',
          sourceLabel: 'Chanzo cha data',
          sourceSupabase: 'Supabase',
          sourceLocal: 'Maudhui ya ndani',
          liveLabel: 'Masasisho ya moja kwa moja',
          liveActive: 'Yanafanya kazi',
          liveInactive: 'Hayafanyi kazi',
          noDataNotice:
            'Hakuna data ya Supabase bado. Ingiza maudhui asilia ili kuanza kusimamia tovuti kutoka dashibodi.',
          migrationNotice:
            'Jedwali zinazokosekana kwenye Supabase: {tables}. Endesha uhamishaji 004_lns_menu_events.sql kwenye Kihariri cha SQL ili kuchapisha sehemu hizi kwenye tovuti.',
          importMissing: 'Ingiza maudhui yanayokosekana',
          imported:
            'Maudhui yanayokosekana yameingizwa (mabadiliko yaliyohifadhiwa yamehifadhiwa).',
          viewSite: 'Tazama tovuti',
          howTitle: 'Inavyofanya kazi',
          how1: 'Ingiza maudhui yanayokosekana mara moja: mabadiliko yako yaliyohifadhiwa hayatafutwa.',
          how2: 'Hariri chakula au taarifa: mabadiliko huhifadhiwa kwenye Supabase.',
          how3: 'Wageni wanaona mabadiliko papo hapo, bila kupakia ukurasa upya.',
          how4: 'Tumia “Ficha” kuondoa kipengee kwenye tovuti bila kukifuta.',
        },
        menu: {
          title: 'Vyakula',
          description:
            'Ongeza chakula, hariri bei au picha yake, au kifiche wakati hakipatikani. Jumla ya kikapu cha mteja husasishwa kiotomatiki.',
          all: 'Vyote',
          editDish: 'Hariri chakula',
          newDish: 'Chakula kipya',
          name: 'Jina la chakula',
          priceKmf: 'Bei (KMF)',
          category: 'Kundi',
          noCategory: 'Bila kundi',
          priceOptions: 'Chaguo za bei',
          priceOptionsHint: 'Mfano: 26 cm / 33 cm, sehemu ndogo / kubwa.',
          optionLabel: 'Jina la chaguo',
          optionPrice: 'Bei ya chaguo (KMF)',
          addOption: 'Ongeza chaguo',
          removeOption: 'Ondoa chaguo',
          moment: 'Wakati wa huduma',
          section: 'Sehemu ya menyu',
          badge: 'Beji (hiari)',
          badgeHint: 'Mfano: Maalum, Kikiwasili, Cha nyumbani.',
          order: 'Mpangilio wa kuonyesha',
          descriptionField: 'Maelezo',
          photo: 'Picha ya chakula',
          showOnSite: 'Onyesha kwenye tovuti',
          signature: 'Chakula maalum (nyumbani)',
          saved: 'Chakula kimehifadhiwa. Tovuti ya wateja imesasishwa.',
          deleted: 'Chakula kimefutwa.',
          shown: 'Chakula kinaonyeshwa.',
          hidden: 'Chakula kimefichwa.',
          empty: 'Hakuna vyakula katika kundi hili.',
          hiddenBadge: 'Imefichwa',
          signatureBadge: 'Maalum',
        },
        menuCategories: {
          title: 'Makundi ya menyu',
          description:
            'Panga sehemu za menyu yako: jina, maelezo, mpangilio na uwonekano.',
          newCategory: 'Kundi jipya',
          editCategory: 'Hariri kundi',
          name: 'Jina la kundi',
          descriptionField: 'Maelezo',
          showOnSite: 'Onyesha kwenye menyu',
          saved: 'Kundi limehifadhiwa.',
          deleted: 'Kundi limefutwa.',
          empty: 'Hakuna makundi bado.',
          hiddenBadge: 'Imefichwa',
        },
        dailySpecials: {
          title: 'Vyakula vya siku',
          description:
            'Panga vyakula vya siku na tarehe zake: kile kilicho katika kipindi cha sasa tu ndicho kinachoonyeshwa kwenye tovuti.',
          newSpecial: 'Chakula kipya cha siku',
          editSpecial: 'Hariri chakula cha siku',
          dishName: 'Jina la chakula',
          descriptionField: 'Maelezo',
          priceKmf: 'Bei (KMF)',
          image: 'Picha ya chakula',
          startDate: 'Tarehe ya kuanza',
          endDate: 'Tarehe ya mwisho',
          availability: 'Upatikanaji',
          showOnSite: 'Onyesha kwenye tovuti',
          saved: 'Chakula cha siku kimehifadhiwa.',
          deleted: 'Chakula cha siku kimefutwa.',
          empty: 'Hakuna vyakula vya siku vilivyopangwa.',
          hiddenBadge: 'Imefichwa',
        },
        events: {
          title: 'Matukio',
          description:
            'Ongeza matukio na makundi yake: tarehe, mahali, bei na uwonekano vinaonyeshwa kwenye ukurasa wa Matukio.',
          newEvent: 'Tukio jipya',
          editEvent: 'Hariri tukio',
          eventTitle: 'Kichwa cha tukio',
          descriptionField: 'Maelezo',
          category: 'Kundi',
          date: 'Tarehe ya kuanza',
          endDate: 'Tarehe ya mwisho (hiari)',
          time: 'Saa',
          location: 'Mahali',
          priceKmf: 'Bei (KMF)',
          freeHint: 'Acha 0 kwa tukio la bure.',
          ticketPriceKmf: 'Bei ya tiketi (KMF)',
          ticketsAvailable: 'Tiketi zinazopatikana',
          salePoints: 'Mahali pa kununua / namna ya kununua',
          ticketingUrl: 'Kiungo cha tiketi mtandaoni (hiari)',
          ticketHint:
            'Maelezo haya yanaonekana kwenye sehemu ya tiketi ya ukurasa wa Matukio.',
          bookTicketsBadge: 'Tiketi',
          seatsBadge: 'Vitengo {count}',
          image: 'Picha ya tukio',
          showOnSite: 'Onyesha kwenye tovuti',
          saved: 'Tukio limehifadhiwa.',
          deleted: 'Tukio limefutwa.',
          empty: 'Hakuna matukio bado.',
          hiddenBadge: 'Imefichwa',
          categoriesTitle: 'Makundi ya matukio',
          categoriesHint: 'Panga matukio (sherehe, harusi, jioni, n.k.).',
          newCategory: 'Kundi jipya',
          categoryName: 'Jina la kundi',
          categoryDescription: 'Maelezo',
          categorySaved: 'Kundi limehifadhiwa.',
          categoryDeleted: 'Kundi limefutwa.',
          categoryDeleteConfirm: 'Futa kundi {name}?',
          categoryInUse: 'Matukio {count} bado yanatumia kundi {name}.',
          deleteConfirm: 'Futa tukio {name}?',
        },
        settings: {
          title: 'Taarifa muhimu',
          description:
            'Jina, maelezo ya mawasiliano, saa, picha ya mwanzo na chakula cha siku: sehemu hizi huendesha kurasa zote za tovuti.',
          saved: 'Taarifa zimehifadhiwa.',
          restaurantName: 'Jina la mgahawa',
          tagline: 'Kauli mbiu',
          address: 'Anwani',
          country: 'Nchi',
          phoneDisplay: 'Simu inayoonyeshwa',
          phoneLink: 'Kiungo cha simu',
          whatsappLink: 'Kiungo cha WhatsApp',
          whatsappHint: 'Mfano: https://wa.me/2697730031 — hutumika kwa oda na uhifadhi.',
          email: 'Barua pepe',
          hoursSummary: 'Saa (muhtasari)',
          directionsLink: 'Kiungo cha maelekezo',
          latitude: 'Latitudo',
          longitude: 'Longitudo',
          heroImage: 'Picha kuu (nyumbani)',
          chefTitle: 'Chakula maalum cha mpishi',
          chefDescription: 'Huonyeshwa juu ya menyu.',
          chefHeading: 'Kichwa',
          chefSubtitle: 'Kichwa kidogo',
          chefDish: 'Jina la chakula',
          chefPrice: 'Bei (KMF)',
          chefAvailability: 'Upatikanaji',
          saveButton: 'Hifadhi taarifa',
        },
        gallery: {
          title: 'Matunzio ya picha',
          description:
            'Badilisha picha za mtaro, chumba cha kulia na vyakula. Picha zinazopakiwa huhifadhiwa kwenye hifadhi maalum ya Supabase.',
          newPhoto: 'Picha mpya',
          editPhoto: 'Hariri picha',
          category: 'Kundi',
          caption: 'Maelezo mafupi',
          showInGallery: 'Onyesha kwenye matunzio',
          saved: 'Picha imehifadhiwa.',
          deleted: 'Picha imefutwa.',
          hiddenBadge: 'Imefichwa',
        },
        brigade: {
          title: 'Timu',
          description: 'Wasilisha timu kwenye ukurasa wa “Hadithi Yetu”.',
          newMember: 'Mwanachama mpya',
          name: 'Jina',
          role: 'Wajibu',
          tenure: 'Muda wa huduma',
          bio: 'Wasifu',
          showOnSite: 'Onyesha kwenye tovuti',
          saved: 'Mwanachama amehifadhiwa.',
          deleted: 'Mwanachama amefutwa.',
        },
        faq: {
          title: 'Maswali ya mara kwa mara',
          description:
            'Simamia majibu yanayoonyeshwa kwenye ukurasa wa “Taarifa muhimu”.',
          newQuestion: 'Swali jipya',
          question: 'Swali',
          answer: 'Jibu',
          showOnSite: 'Onyesha kwenye tovuti',
          saved: 'Swali limehifadhiwa.',
          deleted: 'Swali limefutwa.',
        },
        media: {
          title: 'Maktaba ya midia',
          description:
            'Pakia picha zako mara moja, kisha nakili URL yake kwenye chakula au picha ya matunzio.',
          upload: 'Ingiza picha',
          uploading: 'Inapakia…',
          imported: 'Picha {count} zimeingizwa.',
          uploadError: 'Upakiaji umeshindwa',
          listError: 'Imeshindwa kuorodhesha midia',
          copyUrl: 'Nakili URL',
          copied: 'URL imenakiliwa.',
          empty: 'Hakuna picha katika maktaba.',
        },
        errorUnknown: 'Hitilafu isiyojulikana',
        errorValidation:
          'Angalia sehemu za fomu kabla ya kuhifadhi (bei, tarehe, sehemu zinazotakiwa).',
      },
    },
    pages: {
      accueil: 'Mwanzo',
      menu: 'Menyu',
      pizzas: 'Pizza Zetu',
      platsDuJour: 'Sahani za Siku',
      histoire: 'Historia Yetu',
      galerie: 'Matunzio ya Picha',
      reservation: 'Uhifadhi & Mawasiliano',
      infos: 'Taarifa Muhimu',
      evenements: 'Matukio',
      admin: 'Usimamizi',
    },
  },
};

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}

import type { BrigadeMember, FaqItem, GalleryItem, MenuItem, ReviewItem } from '../types';
import heroTerrace from '../assets/images/hero_terrace_moroni_1794936297280.webp';
import capitaine from '../assets/images/dish_capitaine_poele_1794936280936.webp';
import entrecote from '../assets/images/dish_entrecote_grillee_1794936281271.webp';
import poulet from '../assets/images/dish_poulet_roti_1794936280867.webp';
import salle from '../assets/images/interior_salle_clim_1794936281225.webp';
import dessert from '../assets/images/dessert_comoros_vanilla_1794936297375.webp';
import eveningEvent from '../assets/images/gallery_evening_event_1794936298238.webp';
import newPdjSelect from '../assets/images/new_pdj_select.webp';
import newPdjOmelette from '../assets/images/new_pdj_omelette.webp';
import newPdjCrepes from '../assets/images/new_pdj_crepes.webp';
import newDejSaladeThon from '../assets/images/new_dej_salade_thon.webp';
import newDejPates from '../assets/images/new_dej_pates.webp';
import newDinCarpaccio from '../assets/images/new_din_carpaccio.webp';
import newDinBrochettes from '../assets/images/new_din_brochettes.webp';
import newDinLangouste from '../assets/images/new_din_langouste.webp';
import newDesMousse from '../assets/images/new_des_mousse.webp';
import newBoiJus from '../assets/images/new_boi_jus.webp';
import newBoiCafe from '../assets/images/new_boi_cafe.webp';

const MENU_IMAGES = {
  petitDejeuner: newPdjSelect,
  omelette: newPdjOmelette,
  crepes: newPdjCrepes,
  saladeThon: newDejSaladeThon,
  pates: newDejPates,
  carpaccio: newDinCarpaccio,
  brochettes: newDinBrochettes,
  langouste: newDinLangouste,
  mousse: newDesMousse,
  jus: newBoiJus,
  cafe: newBoiCafe,
};

export const RESTAURANT_INFO = {
  name: 'Le New Select',
  tagline: 'Cuisine française et européenne au cœur de Moroni',
  address: 'Place de France, Moroni, Grande Comore',
  country: 'Union des Comores',
  phoneDisplay: '+269 773 00 31',
  phoneHref: 'tel:+2697730031',
  whatsappHref: 'https://wa.me/2697730031',
  email: 'contact@lenewselect-moroni.km',
  hoursSummary: 'Tous les jours · 07h00 – 23h00',
  coordinates: { lat: -11.7016, lng: 43.2547 },
  directionsUrl:
    'https://www.openstreetmap.org/?mlat=-11.7016&mlon=43.2547#map=18/-11.7016/43.2547',
};

export const IMAGES = {
  heroTerrace,
  capitaine,
  entrecote,
  poulet,
  salle,
  dessert,
  eveningEvent,
};

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'sig-capitaine',
    name: 'Capitaine poêlé',
    description:
      'Filet de capitaine pêché au large de Ngazidja, peau croustillante, beurre citronné à la vanille Bourbon des Comores, manioc grillé et brèdes sautées.',
    priceKmf: 7500,
    moment: 'dejeuner',
    sectionLabel: 'Poissons de l’océan Indien',
    tag: 'Plat signature',
    isSignature: true,
    image: IMAGES.capitaine,
  },
  {
    id: 'sig-entrecote',
    name: 'Entrecôte grillée',
    description:
      'Pièce de bœuf grillée à la flamme, fleur de sel, sauce onctueuse au poivre vert, pommes frites maison coupées au couteau et échalote confite.',
    priceKmf: 9500,
    moment: 'diner',
    sectionLabel: 'Grillades & classiques bistrot',
    tag: 'Plat signature',
    isSignature: true,
    image: IMAGES.entrecote,
  },
  {
    id: 'sig-poulet',
    name: 'Poulet rôti bistrot',
    description:
      'Demi-coquelet fermier rôti lentement au thym frais et ail confit, jus court parfumé aux herbes, pommes grenailles dorées.',
    priceKmf: 6800,
    moment: 'dejeuner',
    sectionLabel: 'Rôtisserie & volailles',
    tag: 'Plat signature',
    isSignature: true,
    image: IMAGES.poulet,
  },
];

export const FULL_MENU: MenuItem[] = [
  // Petit-déjeuner (dès 07h00)
  {
    id: 'pdj-select',
    name: 'Formule Petit-Déjeuner Le Select',
    description:
      'Jus de fruit frais pressé (mangue, papaye ou citron vert selon saison), viennoiserie tiède, pain baguette, beurre, confiture maison, boisson chaude au choix.',
    priceKmf: 3500,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner · dès 07h00',
    tag: 'Servi jusqu’à 10h30',
    image: MENU_IMAGES.petitDejeuner,
  },
  {
    id: 'pdj-omelette',
    name: 'Omelette baveuse aux herbes ou fromage',
    description:
      'Trois œufs frais battus, ciboulette, fromage affiné ou tomates confites, servie avec pain grillé et salade verte.',
    priceKmf: 3000,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner · dès 07h00',
    image: MENU_IMAGES.omelette,
  },
  {
    id: 'pdj-crepes',
    name: 'Assiette de crêpes tièdes à la vanille',
    description:
      'Deux crêpes fines parfumées à la vanille de Grande Comore, miel local de Karthala ou chocolat noir fondu.',
    priceKmf: 2800,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner · dès 07h00',
    image: MENU_IMAGES.crepes,
  },

  // Déjeuner (12h00 – 15h00)
  {
    id: 'dej-salade-thon',
    name: 'Salade niçoise revisitée au thon rouge mi-cuit',
    description:
      'Thon jaune saisi minute, haricots verts croquants, œuf mollet, olives noires, tomates cerises et vinaigrette citronnée.',
    priceKmf: 5500,
    moment: 'dejeuner',
    sectionLabel: 'Déjeuner · 12h00 – 15h00',
    image: MENU_IMAGES.saladeThon,
  },
  {
    id: 'dej-capitaine',
    name: 'Capitaine poêlé, beurre citron-vanille',
    description:
      'Filet de capitaine frais, peau dorée, sauce émulsionnée à la vanille des Comores, manioc rôti et tombée de brèdes.',
    priceKmf: 7500,
    moment: 'dejeuner',
    sectionLabel: 'Déjeuner · 12h00 – 15h00',
    tag: 'Signature',
    image: IMAGES.capitaine,
  },
  {
    id: 'dej-poulet',
    name: 'Poulet rôti bistrot au thym et ail confit',
    description:
      'Demi-volaille rôtie au four, pommes grenailles persillées, jus corsé aux aromates.',
    priceKmf: 6800,
    moment: 'dejeuner',
    sectionLabel: 'Déjeuner · 12h00 – 15h00',
    tag: 'Signature',
    image: IMAGES.poulet,
  },
  {
    id: 'dej-pates',
    name: 'Tagliatelles aux gambas de l’océan Indien',
    description:
      'Gambas décortiquées flambées à l’ail, crème légère au citron vert et basilic frais.',
    priceKmf: 7900,
    moment: 'dejeuner',
    sectionLabel: 'Déjeuner · 12h00 – 15h00',
    image: MENU_IMAGES.pates,
  },

  // Dîner (18h30 – 23h00)
  {
    id: 'din-carpaccio',
    name: 'Carpaccio de poisson blanc aux agrumes & girofle',
    description:
      'Fines tranches de pêche du matin marinées au combava, huile d’olive vierge, éclats de baies roses et pain toasté.',
    priceKmf: 5200,
    moment: 'diner',
    sectionLabel: 'Dîner · 18h30 – 23h00',
    image: MENU_IMAGES.carpaccio,
  },
  {
    id: 'din-entrecote',
    name: 'Entrecôte grillée, sauce au poivre vert',
    description:
      'Pièce de bœuf saisie selon votre cuisson, poêlon de sauce au poivre vert, frites maison et échalote braisée.',
    priceKmf: 9500,
    moment: 'diner',
    sectionLabel: 'Dîner · 18h30 – 23h00',
    tag: 'Signature',
    image: IMAGES.entrecote,
  },
  {
    id: 'din-brochettes',
    name: 'Brochettes de mérou grillées & riz pilaf safrané',
    description:
      'Cubes de mérou marinés au citron et coriandre, poivrons doux grillés, riz basmati parfumé et sauce vierge.',
    priceKmf: 7800,
    moment: 'diner',
    sectionLabel: 'Dîner · 18h30 – 23h00',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'din-langouste',
    name: 'Langouste grillée de Mitsamiouli (selon arrivage)',
    description:
      'Langouste entière ouverte et grillée au beurre persillé, accompagnée de légumes de saison et pommes vapeur.',
    priceKmf: 14500,
    moment: 'diner',
    sectionLabel: 'Dîner · 18h30 – 23h00',
    tag: 'Sur arrivage',
    image: MENU_IMAGES.langouste,
  },

  // Desserts maison & Boissons
  {
    id: 'des-creme-brulee',
    name: 'Crème brûlée à la vanille Bourbon & fruit de la passion',
    description:
      'Crème prise infusée à la gousse de vanille de Grande Comore, cassonade caramélisée à la flamme et tuile dentelle.',
    priceKmf: 3200,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts maison & Boissons',
    tag: 'Fait maison',
    image: IMAGES.dessert,
  },
  {
    id: 'des-mousse',
    name: 'Mousse au chocolat noir 70 % & zeste d’orange',
    description:
      'Texture aérienne au chocolat de couverture, pointe de fleur de sel et sablé breton.',
    priceKmf: 3000,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts maison & Boissons',
    image: MENU_IMAGES.mousse,
  },
  {
    id: 'boi-jus',
    name: 'Jus pressés du marché & citronnade à la menthe',
    description:
      'Mangue fraîche, corossol, fruit de la passion, ananas Victoria ou citronnade maison peu sucrée.',
    priceKmf: 1800,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts maison & Boissons',
    image: MENU_IMAGES.jus,
  },
  {
    id: 'boi-cafe',
    name: 'Expresso italien, café allongé ou thé à la cardamome',
    description:
      'Torréfaction de caractère, servis en terrasse dès 07h00 ou en fin de repas.',
    priceKmf: 1200,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts maison & Boissons',
    image: MENU_IMAGES.cafe,
  },
];

export const CHEF_DAILY_SPECIAL = {
  title: 'Plat du jour du chef',
  subtitle: 'Selon les arrivages du port de Moroni et du marché de Volo-Volo',
  dishName: 'Dos de thon jaune snacké, sauce vierge au combava & purée de patate douce',
  priceKmf: 7200,
  availability: 'Disponible au déjeuner et au dîner · Jusqu’à épuisement',
};

export const TRIPADVISOR_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Claire D.',
    origin: 'Lyon · Voyageuse d’affaires',
    date: 'Octobre 2026',
    rating: 5,
    title: 'Une valeur sûre face à la Place de France',
    quote:
      'Le capitaine poêlé est cuit à la perfection, peau croustillante et sauce citron-vanille délicate. La terrasse sous les grands arbres reste fraîche même à midi, et le service est attentif sans jamais presser.',
    context: 'Déjeuner en terrasse · Avis certifié TripAdvisor',
  },
  {
    id: 'rev-2',
    author: 'Mohamed A.',
    origin: 'Moroni · Habitué du quartier',
    date: 'Septembre 2026',
    rating: 5,
    title: 'Idéal pour un rendez-vous professionnel ou un dîner en famille',
    quote:
      'On apprécie autant le café du matin dès 7 heures que l’entrecôte grillée le soir dans la salle climatisée. L’accueil est constant et les produits de la mer sont toujours du jour.',
    context: 'Dîner en salle climatisée · Avis certifié TripAdvisor',
  },
  {
    id: 'rev-3',
    author: 'Jean-Baptiste M.',
    origin: 'Paris · Coopérant international',
    date: 'Août 2026',
    rating: 5,
    title: 'L’esprit bistrot français avec les saveurs comoriennes',
    quote:
      'Poulet rôti digne d’un grand bistrot et crème brûlée à la vanille locale inoubliable. L’emplacement au cœur de Moroni permet de tout faire à pied ensuite.',
    context: 'Dîner entre collègues · Avis certifié TripAdvisor',
  },
];

export const BRIGADE: BrigadeMember[] = [
  {
    id: 'bri-1',
    name: 'Chef Ibrahim Soilihi',
    role: 'Chef de cuisine',
    tenure: '12 ans aux fourneaux',
    bio: 'Formé aux techniques de la cuisine française classique et passionné par les pêches de Ngazidja, il compose chaque matin la carte du jour au retour des pirogues et du marché.',
  },
  {
    id: 'bri-2',
    name: 'Nadia Abdallah',
    role: 'Maîtresse d’hôtel & accueil',
    tenure: '9 ans en salle',
    bio: 'Veille au rythme fluide des services du petit-déjeuner jusqu’au dernier dîner, avec une attention particulière pour les déjeuners diplomatiques et les familles.',
  },
  {
    id: 'bri-3',
    name: 'Chef Thomas Renaud',
    role: 'Sous-chef rôtisserie & sauces',
    tenure: '7 ans en bistronomie',
    bio: 'Garant des cuissons précises des viandes grillées, des jus réduits maison et des pâtisseries infusées à la vanille et aux agrumes des Comores.',
  },
  {
    id: 'bri-4',
    name: 'Saïd Mzé',
    role: 'Responsable terrasse & bar',
    tenure: '8 ans à Moroni',
    bio: 'Orchestre le service sous les badamiers de la Place de France, les cafés matinaux dès 07h00 et les jus pressés de fruits tropicaux.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'La terrasse sous les badamiers',
    caption: 'Tables dressées à l’ombre naturelle des arbres face à la Place de France.',
    category: 'terrasse',
    categoryLabel: 'Terrasse',
    image: IMAGES.heroTerrace,
  },
  {
    id: 'gal-2',
    title: 'La salle climatisée',
    caption:
      'Boiseries sombres, nappes blanches et fraîcheur calme pour vos déjeuners d’affaires.',
    category: 'salle',
    categoryLabel: 'Salle',
    image: IMAGES.salle,
  },
  {
    id: 'gal-3',
    title: 'Capitaine poêlé à la vanille des Comores',
    caption: 'Peau dorée et beurre citronné servi avec manioc grillé et brèdes.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: IMAGES.capitaine,
  },
  {
    id: 'gal-4',
    title: 'Entrecôte grillée & poivre vert',
    caption: 'Sauce au poivre vert en poêlon de cuivre et pommes frites maison.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: IMAGES.entrecote,
  },
  {
    id: 'gal-5',
    title: 'Poulet rôti bistrot',
    caption: 'Volaille dorée au thym frais, ail confit et pommes grenailles.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: IMAGES.poulet,
  },
  {
    id: 'gal-6',
    title: 'Crème brûlée vanille & passion',
    caption: 'Dessert signature infusé à la vanille Bourbon de Grande Comore.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: IMAGES.dessert,
  },
  {
    id: 'gal-7',
    title: 'Dîners & grandes tablées en soirée',
    caption: 'Ambiance chaleureuse sous les guirlandes pour réceptions et groupes.',
    category: 'evenements',
    categoryLabel: 'Événements',
    image: IMAGES.eveningEvent,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Le restaurant dispose-t-il du Wi-Fi pour les déjeuners de travail ?',
    answer:
      'Oui. Une connexion Wi-Fi haut débit gratuite est disponible aussi bien en salle climatisée qu’en terrasse. Le code vous est remis à votre arrivée.',
  },
  {
    id: 'faq-2',
    question: 'Faut-il réserver à l’avance le week-end ou pour le dîner ?',
    answer:
      'La réservation est vivement recommandée pour le vendredi soir, le samedi ainsi que pour les tables de plus de 4 personnes au déjeuner en semaine.',
  },
  {
    id: 'faq-3',
    question: 'Les enfants sont-ils accueillis et proposez-vous des plats adaptés ?',
    answer:
      'Bien sûr. Nous disposons de chaises hautes sur demande et préparons des portions adaptées (filet de poisson pané ou grillé, steak haché frais et frites maison, crêpes).',
  },
  {
    id: 'faq-4',
    question: 'Quels régimes alimentaires respectez-vous ?',
    answer:
      'Toutes nos viandes de bœuf et de volaille sont certifiées halal, et notre cuisine est garantie sans porc. Des options végétariennes et sans gluten (poissons grillés, manioc, riz, salades) sont disponibles à chaque service.',
  },
  {
    id: 'faq-5',
    question: 'Peut-on commander des plats à emporter ou organiser un repas de groupe ?',
    answer:
      'Oui, l’ensemble de la carte est disponible à emporter sur appel au +269 773 00 31. Pour les groupes de 8 à 30 personnes (entreprises, délégations, anniversaires), nous préparons un menu dédié sur réservation.',
  },
];

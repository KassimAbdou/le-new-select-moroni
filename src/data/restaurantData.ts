import type {
  BrigadeMember,
  DailySpecial,
  EventCategory,
  EventItem,
  FaqItem,
  GalleryItem,
  MenuCategory,
  MenuItem,
  ReviewItem,
} from '../types';
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

/** Catégories de la carte. L'ordre ici est aussi l'ordre d'affichage. */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'cat-petit-dejeuner',
    name: 'Petit-déjeuner',
    description: 'Servi dès 07h00, jusqu’à 10h30.',
  },
  {
    id: 'cat-entrees-froides',
    name: 'Entrées froides',
    description: 'Produits de la mer et crudités de saison.',
  },
  {
    id: 'cat-entrees-chaudes',
    name: 'Entrées chaudes',
    description: 'Beignets, croquettes et potages maison.',
  },
  {
    id: 'cat-viandes',
    name: 'Viandes',
    description: 'Grillades, sauces et classiques de la cuisine française.',
  },
  {
    id: 'cat-volailles',
    name: 'Volailles',
    description: 'Cuisson lente, marinades et recettes comoriennes.',
  },
  {
    id: 'cat-poissons',
    name: 'Poissons',
    description: 'Pêche du jour préparée selon les arrivages.',
  },
  {
    id: 'cat-fruits-de-mer',
    name: 'Fruits de mer',
    description: 'Crevettes, langoustes et poulpes de l’océan Indien.',
  },
  {
    id: 'cat-pizzas',
    name: 'Pizzas',
    description: 'Pizzas maison, disponibles en 26 cm et 33 cm.',
  },
  {
    id: 'cat-pizzas-creme',
    name: 'Pizzas à la crème fraîche',
    description: 'Une alternative à la sauce tomate, en PM et GM.',
  },
  {
    id: 'cat-desserts',
    name: 'Desserts',
    description: 'Pâtisserie et douceurs maison.',
  },
  {
    id: 'cat-boulangerie',
    name: 'Boulangerie',
    description: 'Viennoiseries et pains frais du matin.',
  },
  {
    id: 'cat-boissons',
    name: 'Boissons',
    description: 'Jus pressés, cafés et boissons chaudes.',
  },
];

const pizza = (
  id: string,
  name: string,
  small: number,
  large: number,
  description: string,
  image?: string,
): MenuItem => ({
  id,
  name,
  description,
  priceKmf: small,
  moment: 'diner',
  sectionLabel: 'Pizzas',
  categoryId: 'cat-pizzas',
  priceOptions: [
    { label: '26 cm', priceKmf: small },
    { label: '33 cm', priceKmf: large },
  ],
  image,
  tag: 'Fait maison',
});

const creamPizza = (
  id: string,
  name: string,
  pm: number,
  gm: number,
  description: string,
): MenuItem => ({
  id,
  name,
  description,
  priceKmf: pm,
  moment: 'diner',
  sectionLabel: 'Pizzas à la crème fraîche',
  categoryId: 'cat-pizzas-creme',
  priceOptions: [
    { label: 'PM', priceKmf: pm },
    { label: 'GM', priceKmf: gm },
  ],
  image: newPdjCrepes,
  tag: 'Crème fraîche',
});

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'sig-langouste',
    name: 'Langouste grillée au beurre citronné',
    description:
      'Langouste entière grillée au beurre persillé, citron confit et légumes de saison. Selon arrivage du port de Moroni.',
    priceKmf: 15000,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    tag: 'Plat signature',
    isSignature: true,
    image: newDinLangouste,
  },
  {
    id: 'sig-curry-boeuf',
    name: 'Curry de bœuf à la comorienne',
    description:
      'Bœuf mijoté aux épices douces, lait de coco, basilic et brèdes, servi avec du riz parfumé.',
    priceKmf: 8000,
    moment: 'diner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    tag: 'Plat signature',
    isSignature: true,
    image: entrecote,
  },
  {
    id: 'sig-pizza-select',
    name: 'Pizza Select',
    description:
      'Notre pizza maison généreuse : sauce tomate, fromage, viande hachée et fruits de mer, cuite au four à pierre.',
    priceKmf: 4000,
    moment: 'diner',
    sectionLabel: 'Pizzas',
    categoryId: 'cat-pizzas',
    priceOptions: [
      { label: '26 cm', priceKmf: 4000 },
      { label: '33 cm', priceKmf: 6500 },
    ],
    tag: 'La spécialité de la maison',
    isSignature: true,
    image: newDinBrochettes,
  },
];

export const FULL_MENU: MenuItem[] = [
  // Petit-déjeuner
  {
    id: 'pdj-select',
    name: 'Formule Petit-Déjeuner Le Select',
    description:
      'Jus de fruit frais, viennoiserie tiède, pain, beurre, confiture maison et boisson chaude au choix.',
    priceKmf: 3500,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner',
    categoryId: 'cat-petit-dejeuner',
    tag: 'Servi jusqu’à 10h30',
    image: MENU_IMAGES.petitDejeuner,
  },
  {
    id: 'pdj-omelette',
    name: 'Omelette aux herbes ou au fromage',
    description:
      'Trois œufs frais, ciboulette ou fromage affiné, pain grillé et salade verte.',
    priceKmf: 3000,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner',
    categoryId: 'cat-petit-dejeuner',
    image: MENU_IMAGES.omelette,
  },
  {
    id: 'pdj-crepes',
    name: 'Assiette de crêpes à la vanille',
    description:
      'Deux crêpes fines parfumées à la vanille des Comores, miel local ou chocolat noir.',
    priceKmf: 2800,
    moment: 'petit-dejeuner',
    sectionLabel: 'Petit-déjeuner',
    categoryId: 'cat-petit-dejeuner',
    image: MENU_IMAGES.crepes,
  },

  // Entrées froides
  {
    id: 'ent-espadon-fume',
    name: 'Éventail d’espadon fumé',
    description:
      'Fines tranches d’espadon fumé, huile d’olive, citron et herbes fraîches.',
    priceKmf: 2500,
    moment: 'dejeuner',
    sectionLabel: 'Entrées froides',
    categoryId: 'cat-entrees-froides',
    image: MENU_IMAGES.carpaccio,
  },
  {
    id: 'ent-couronne-langouste',
    name: 'Couronne de langouste',
    description: 'Langouste fraîche dressée en couronne, sauce légère aux agrumes.',
    priceKmf: 3500,
    moment: 'diner',
    sectionLabel: 'Entrées froides',
    categoryId: 'cat-entrees-froides',
    image: MENU_IMAGES.langouste,
  },
  {
    id: 'ent-crudites',
    name: 'Crudités de saison',
    description: 'Légumes croquants du marché et leur vinaigrette maison.',
    priceKmf: 2000,
    moment: 'dejeuner',
    sectionLabel: 'Entrées froides',
    categoryId: 'cat-entrees-froides',
    image: MENU_IMAGES.saladeThon,
  },
  {
    id: 'ent-salade-poulpe',
    name: 'Salade de poulpe',
    description: 'Poulpe tendre mariné au citron, oignon rouge, olives et persil frais.',
    priceKmf: 3750,
    moment: 'dejeuner',
    sectionLabel: 'Entrées froides',
    categoryId: 'cat-entrees-froides',
    image: MENU_IMAGES.carpaccio,
  },

  // Entrées chaudes
  {
    id: 'ent-croquettes-manioc',
    name: 'Croquettes de manioc au fromage',
    description: 'Croquettes dorées de manioc farci au fromage fondant.',
    priceKmf: 1250,
    moment: 'dejeuner',
    sectionLabel: 'Entrées chaudes',
    categoryId: 'cat-entrees-chaudes',
    image: MENU_IMAGES.crepes,
  },
  {
    id: 'ent-beignets-crevettes',
    name: 'Beignets de crevette',
    description: 'Crevettes enrobées d’une pâte croustillante, sauce citronnée.',
    priceKmf: 3750,
    moment: 'diner',
    sectionLabel: 'Entrées chaudes',
    categoryId: 'cat-entrees-chaudes',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'ent-acras-poisson',
    name: 'Accras de poisson',
    description: 'Beignets de poisson aux herbes et épices, servis bien chauds.',
    priceKmf: 1750,
    moment: 'dejeuner',
    sectionLabel: 'Entrées chaudes',
    categoryId: 'cat-entrees-chaudes',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'ent-ailerons-poulet',
    name: 'Ailerons de poulet marinés',
    description: 'Ailerons marinés puis grillés, sauce maison au choix.',
    priceKmf: 2000,
    moment: 'diner',
    sectionLabel: 'Entrées chaudes',
    categoryId: 'cat-entrees-chaudes',
    image: poulet,
  },
  {
    id: 'ent-potage-legumes',
    name: 'Potage de légumes de saison',
    description: 'Velouté de légumes frais du marché, servi avec pain grillé.',
    priceKmf: 2000,
    moment: 'dejeuner',
    sectionLabel: 'Entrées chaudes',
    categoryId: 'cat-entrees-chaudes',
    image: MENU_IMAGES.pates,
  },

  // Viandes
  {
    id: 'plat-spaghetti-bolognaise',
    name: 'Spaghetti bolognaise',
    description: 'Spaghetti à la sauce bolognaise mijotée et parmesan râpé.',
    priceKmf: 3500,
    moment: 'dejeuner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    image: MENU_IMAGES.pates,
  },
  {
    id: 'plat-emince-boeuf',
    name: 'Émincé de bœuf',
    description: 'Bœuf émincé saisi à la poêle avec oignons et poivrons.',
    priceKmf: 4500,
    moment: 'dejeuner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    image: entrecote,
  },
  {
    id: 'plat-filet-boeuf-poivre',
    name: 'Filet de bœuf au poivre noir',
    description:
      'Filet saisi selon votre cuisson, sauce au poivre noir et frites maison.',
    priceKmf: 7000,
    moment: 'diner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    image: entrecote,
  },
  {
    id: 'plat-cote-agneau',
    name: 'Côte d’agneau à l’ail et au persil',
    description: 'Côte d’agneau grillée, beurre d’ail et persil, légumes de saison.',
    priceKmf: 8000,
    moment: 'diner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    image: entrecote,
  },
  {
    id: 'plat-curry-boeuf',
    name: 'Curry de bœuf à la comorienne',
    description: 'Bœuf mijoté aux épices et lait de coco, riz parfumé et brèdes.',
    priceKmf: 8000,
    moment: 'diner',
    sectionLabel: 'Viandes',
    categoryId: 'cat-viandes',
    tag: 'Signature',
    isSignature: true,
    image: entrecote,
  },

  // Volailles
  {
    id: 'plat-mysao-poulet',
    name: 'Mysao de poulet',
    description: 'Poulet sauté aux légumes et épices douces, servi avec du riz.',
    priceKmf: 5500,
    moment: 'dejeuner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: poulet,
  },
  {
    id: 'plat-cuisse-poulet',
    name: 'Cuisse de poulet',
    description: 'Cuisse de poulet rôtie ou grillée, pommes de terre et salade.',
    priceKmf: 4500,
    moment: 'dejeuner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: poulet,
  },
  {
    id: 'plat-curry-poulet',
    name: 'Curry de poulet',
    description: 'Poulet mijoté au curry, lait de coco et basilic, avec riz basmati.',
    priceKmf: 5500,
    moment: 'diner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: poulet,
  },
  {
    id: 'plat-poulet-kfc',
    name: 'Poulet KFC',
    description: 'Morceaux de poulet panés croustillants et frites maison.',
    priceKmf: 6000,
    moment: 'diner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: poulet,
  },
  {
    id: 'plat-spaghetti-poulet-champignons',
    name: 'Spaghetti poulet champignons',
    description: 'Spaghetti crémeux au poulet et champignons frais.',
    priceKmf: 5500,
    moment: 'dejeuner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: MENU_IMAGES.pates,
  },
  {
    id: 'plat-emince-poulet-citron-gingembre',
    name: 'Émincé de poulet au citron et gingembre',
    description: 'Émincé de poulet saisi, sauce citron-gingembre et riz parfumé.',
    priceKmf: 6000,
    moment: 'diner',
    sectionLabel: 'Volailles',
    categoryId: 'cat-volailles',
    image: poulet,
  },

  // Poissons
  {
    id: 'plat-daurade-provencale',
    name: 'Filet de daurade sauce provençale',
    description: 'Daurade poêlée, tomates, olives, herbes de Provence et pommes vapeur.',
    priceKmf: 7500,
    moment: 'diner',
    sectionLabel: 'Poissons',
    categoryId: 'cat-poissons',
    image: capitaine,
  },
  {
    id: 'plat-poisson-entier-frit',
    name: 'Poisson entier frit et oignons caramélisés',
    description:
      'Poisson entier frit doré, oignons caramélisés et accompagnement du jour.',
    priceKmf: 7000,
    moment: 'diner',
    sectionLabel: 'Poissons',
    categoryId: 'cat-poissons',
    image: capitaine,
  },
  {
    id: 'plat-curry-poisson',
    name: 'Curry de poisson',
    description: 'Poisson mijoté au curry doux et lait de coco, servi avec du riz.',
    priceKmf: 7500,
    moment: 'diner',
    sectionLabel: 'Poissons',
    categoryId: 'cat-poissons',
    image: capitaine,
  },
  {
    id: 'plat-brochettes-poisson',
    name: 'Brochettes de poisson',
    description: 'Cubes de poisson marinés et grillés, poivrons et riz pilaf.',
    priceKmf: 7000,
    moment: 'diner',
    sectionLabel: 'Poissons',
    categoryId: 'cat-poissons',
    image: MENU_IMAGES.brochettes,
  },

  // Fruits de mer
  {
    id: 'plat-crevettes-ail',
    name: 'Crevettes sautées à l’ail',
    description: 'Crevettes sautées à l’ail et au persil, pain grillé.',
    priceKmf: 8500,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    image: MENU_IMAGES.langouste,
  },
  {
    id: 'plat-brochettes-crevettes',
    name: 'Brochettes de crevettes',
    description: 'Crevettes grillées en brochettes, sauce citronnée.',
    priceKmf: 8000,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'plat-langoustes-grillees',
    name: 'Langoustes grillées au beurre citronné',
    description: 'Langoustes grillées au beurre persillé et citron, légumes de saison.',
    priceKmf: 15000,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    tag: 'Sur arrivage',
    isSignature: true,
    image: MENU_IMAGES.langouste,
  },
  {
    id: 'plat-brochettes-poulpe',
    name: 'Brochettes de poulpes',
    description: 'Poulpe mariné grillé en brochettes, poivrons et oignons.',
    priceKmf: 9000,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'plat-curry-poulpe',
    name: 'Curry de poulpe',
    description: 'Poulpe mijoté au curry et lait de coco, riz parfumé.',
    priceKmf: 9500,
    moment: 'diner',
    sectionLabel: 'Fruits de mer',
    categoryId: 'cat-fruits-de-mer',
    image: MENU_IMAGES.langouste,
  },

  // Pizzas
  pizza(
    'piz-napolitaine',
    'Pizza Napolitaine',
    2750,
    4000,
    'Sauce tomate, mozzarella, anchois, câpres et olives.',
    MENU_IMAGES.pates,
  ),
  pizza(
    'piz-espadon',
    'Pizza Espadon',
    3750,
    6500,
    'Espadon, sauce tomate, mozzarella et herbes fraîches.',
    MENU_IMAGES.carpaccio,
  ),
  pizza(
    'piz-vegetarienne',
    'Pizza Végétarienne',
    3000,
    4750,
    'Légumes frais du marché, mozzarella et sauce tomate.',
    MENU_IMAGES.saladeThon,
  ),
  pizza(
    'piz-saucisses',
    'Pizza Saucisses',
    3250,
    4750,
    'Saucisses, sauce tomate et mozzarella fondue.',
    MENU_IMAGES.pates,
  ),
  pizza(
    'piz-merguez',
    'Pizza Merguez',
    3250,
    4750,
    'Merguez épicées, mozzarella et sauce tomate.',
    MENU_IMAGES.pates,
  ),
  pizza(
    'piz-3-fromages',
    'Pizza 3 fromages',
    3500,
    5750,
    'Mozzarella, emmental et fromage de chèvre.',
    MENU_IMAGES.crepes,
  ),
  pizza(
    'piz-poulet',
    'Pizza Poulet',
    3000,
    5250,
    'Poulet, sauce tomate, mozzarella et oignons.',
    poulet,
  ),
  pizza(
    'piz-poulet-champignons',
    'Pizza Poulet Champignon',
    3500,
    5750,
    'Poulet, champignons frais et mozzarella.',
    poulet,
  ),
  pizza(
    'piz-bolognaise',
    'Pizza Bolognaise',
    4000,
    5500,
    'Sauce bolognaise mijotée et mozzarella.',
    MENU_IMAGES.pates,
  ),
  pizza(
    'piz-fruits-de-mer',
    'Pizza Fruits de mer',
    4000,
    6500,
    'Crevettes, poulpe, sauce tomate et mozzarella.',
    MENU_IMAGES.langouste,
  ),
  pizza(
    'piz-thon',
    'Pizza au Thon',
    3500,
    6000,
    'Thon, oignons, olives, sauce tomate et mozzarella.',
    MENU_IMAGES.carpaccio,
  ),
  {
    ...pizza(
      'piz-select',
      'Pizza Select',
      4000,
      6500,
      'La pizza signature de la maison, généreusement garnie.',
      MENU_IMAGES.brochettes,
    ),
    isSignature: true,
  },

  // Pizzas à la crème fraîche
  creamPizza(
    'piz-creme-viande-hachee',
    'Viande hachée',
    2750,
    3750,
    'Crème fraîche, viande hachée et mozzarella.',
  ),
  creamPizza(
    'piz-creme-vegane-pomme-de-terre',
    'Végane à la pomme de terre',
    3000,
    4000,
    'Crème fraîche végétale, pommes de terre et oignons.',
  ),
  creamPizza(
    'piz-creme-poulet-champignons',
    'Poulet aux champignons',
    3250,
    4500,
    'Crème fraîche, poulet et champignons frais.',
  ),
  creamPizza('piz-creme-thon', 'Thon', 3750, 5000, 'Crème fraîche, thon et oignons.'),
  creamPizza(
    'piz-creme-espadon-fume',
    'Espadon fumé',
    3750,
    5000,
    'Crème fraîche, espadon fumé et herbes fraîches.',
  ),

  // Desserts
  {
    id: 'des-creme-brulee',
    name: 'Crème brûlée vanille & passion',
    description: 'Crème infusée à la vanille des Comores et caramélisée à la flamme.',
    priceKmf: 3200,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts',
    categoryId: 'cat-desserts',
    tag: 'Fait maison',
    image: dessert,
  },
  {
    id: 'des-mousse-chocolat',
    name: 'Mousse au chocolat noir',
    description: 'Mousse aérienne au chocolat noir et zeste d’orange.',
    priceKmf: 3000,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts',
    categoryId: 'cat-desserts',
    image: MENU_IMAGES.mousse,
  },
  {
    id: 'des-tarte-coco',
    name: 'Tarte à la coco',
    description: 'Tarte fine garnie de crème de coco et parfumée à la vanille locale.',
    priceKmf: 3500,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts',
    categoryId: 'cat-desserts',
    image: MENU_IMAGES.crepes,
  },
  {
    id: 'des-panna-cotta',
    name: 'Panna cotta au fruit de la passion',
    description: 'Panna cotta crémeuse et coulis de fruit de la passion.',
    priceKmf: 3500,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts',
    categoryId: 'cat-desserts',
    image: dessert,
  },
  {
    id: 'des-banane-flambee',
    name: 'Banane flambée',
    description: 'Bananes poêlées flambées au rhum, glace vanille.',
    priceKmf: 4000,
    moment: 'desserts-boissons',
    sectionLabel: 'Desserts',
    categoryId: 'cat-desserts',
    image: MENU_IMAGES.crepes,
  },

  // Boulangerie
  {
    id: 'bou-croissant',
    name: 'Croissant feuilleté',
    description: 'Croissant doré et feuilleté, servi tiède.',
    priceKmf: 800,
    moment: 'petit-dejeuner',
    sectionLabel: 'Boulangerie',
    categoryId: 'cat-boulangerie',
    image: MENU_IMAGES.crepes,
  },
  {
    id: 'bou-pain-chocolat',
    name: 'Pain au chocolat',
    description: 'Viennoiserie feuilletée garnie de chocolat noir.',
    priceKmf: 900,
    moment: 'petit-dejeuner',
    sectionLabel: 'Boulangerie',
    categoryId: 'cat-boulangerie',
    image: MENU_IMAGES.crepes,
  },
  {
    id: 'bou-brioche',
    name: 'Brioche tressée',
    description: 'Brioche moelleuse à la vanille, à partager.',
    priceKmf: 1000,
    moment: 'petit-dejeuner',
    sectionLabel: 'Boulangerie',
    categoryId: 'cat-boulangerie',
    image: MENU_IMAGES.petitDejeuner,
  },
  {
    id: 'bou-baguette',
    name: 'Baguette fraîche',
    description: 'Baguette croustillante cuite le matin.',
    priceKmf: 700,
    moment: 'petit-dejeuner',
    sectionLabel: 'Boulangerie',
    categoryId: 'cat-boulangerie',
    image: MENU_IMAGES.petitDejeuner,
  },
  {
    id: 'bou-pain-comore',
    name: 'Pain comorien',
    description: 'Pain traditionnel parfumé à la cardamome et au clou de girofle.',
    priceKmf: 600,
    moment: 'petit-dejeuner',
    sectionLabel: 'Boulangerie',
    categoryId: 'cat-boulangerie',
    image: MENU_IMAGES.petitDejeuner,
  },

  // Boissons
  {
    id: 'boi-jus',
    name: 'Jus pressés du marché',
    description: 'Mangue, corossol, fruit de la passion, ananas ou citronnade maison.',
    priceKmf: 1800,
    moment: 'desserts-boissons',
    sectionLabel: 'Boissons',
    categoryId: 'cat-boissons',
    image: MENU_IMAGES.jus,
  },
  {
    id: 'boi-cafe',
    name: 'Café, thé ou infusion',
    description: 'Expresso italien, café allongé, thé à la cardamome ou infusion.',
    priceKmf: 1200,
    moment: 'desserts-boissons',
    sectionLabel: 'Boissons',
    categoryId: 'cat-boissons',
    image: MENU_IMAGES.cafe,
  },
  {
    id: 'boi-soda',
    name: 'Boisson gazeuse',
    description: 'Au choix selon les arrivages.',
    priceKmf: 1500,
    moment: 'desserts-boissons',
    sectionLabel: 'Boissons',
    categoryId: 'cat-boissons',
    image: MENU_IMAGES.jus,
  },
];

/** Ancien champ unique conservé pour compatibilité avec la table lns_site_settings. */
export const CHEF_DAILY_SPECIAL = {
  title: 'Plat du jour du chef',
  subtitle: 'Selon les arrivages du port de Moroni et du marché de Volo-Volo',
  dishName: 'Poisson grillé du jour, sauce vierge au combava',
  priceKmf: 6800,
  availability: 'Disponible au déjeuner et au dîner · Jusqu’à épuisement',
};

export const DAILY_SPECIALS: DailySpecial[] = [
  {
    id: 'special-1',
    title: 'Plat du jour du chef',
    dishName: 'Poisson grillé du jour, sauce vierge au combava',
    description: 'Pêche du matin grillée, purée de patate douce et légumes de saison.',
    priceKmf: 6800,
    image: capitaine,
    startDate: '2026-11-18',
    endDate: '2026-11-20',
    availability: 'Déjeuner et dîner · Jusqu’à épuisement',
  },
  {
    id: 'special-2',
    title: 'Plat du jour du chef',
    dishName: 'Curry de poulet à la comorienne',
    description: 'Poulet mijoté aux épices douces, lait de coco, riz et brèdes.',
    priceKmf: 5500,
    image: poulet,
    startDate: '2026-11-21',
    endDate: '2026-11-23',
    availability: 'Déjeuner et dîner',
  },
  {
    id: 'special-3',
    title: 'Plat du jour du chef',
    dishName: 'Assiette de fruits de mer grillés',
    description: 'Crevettes, brochettes de poulpe et poisson grillé, sauce citronnée.',
    priceKmf: 12000,
    image: MENU_IMAGES.langouste,
    startDate: '2026-11-24',
    endDate: '2026-11-26',
    availability: 'Dîner · Sur réservation',
  },
];

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'evt-cat-festivites',
    name: 'Festivités',
    description: 'Fêtes, célébrations et temps forts de la ville.',
  },
  {
    id: 'evt-cat-ceremonies',
    name: 'Cérémonies',
    description: 'Mariages, réceptions et cérémonies privées.',
  },
  {
    id: 'evt-cat-soirees',
    name: 'Soirées & concerts',
    description: 'Musique live, dîners spectacle et soirées thématiques.',
  },
  {
    id: 'evt-cat-professionnel',
    name: 'Événements professionnels',
    description: 'Séminaires, déjeuners d’affaires et délégations.',
  },
  {
    id: 'evt-cat-culturel',
    name: 'Culture & rencontres',
    description: 'Rencontres, ateliers et échanges culturels.',
  },
];

export const EVENTS: EventItem[] = [
  {
    id: 'evt-jazz-badamiers',
    title: 'Soirée Jazz sous les badamiers',
    description:
      'Un trio de jazz acoustique en terrasse, avec une carte de pizzas et de fruits de mer spécialement composée pour la soirée.',
    categoryId: 'evt-cat-soirees',
    categoryLabel: 'Soirées & concerts',
    eventDate: '2026-11-28',
    time: '19h30',
    location: 'Terrasse',
    priceKmf: 5000,
    image: eveningEvent,
  },
  {
    id: 'evt-mariage-decembre',
    title: 'Réception de mariage — salon privé',
    description:
      'Cérémonie et dîner de réception dans la salle climatisée, menu sur mesure pour 60 convives.',
    categoryId: 'evt-cat-ceremonies',
    categoryLabel: 'Cérémonies',
    eventDate: '2026-12-05',
    time: '13h00',
    location: 'Salle climatisée',
    image: salle,
  },
  {
    id: 'evt-fete-musique',
    title: 'Fête de la Musique à la Place de France',
    description:
      'Le New Select ouvre sa terrasse pour une après-midi de musique et de rencontres, entrée libre.',
    categoryId: 'evt-cat-festivites',
    categoryLabel: 'Festivités',
    eventDate: '2026-12-12',
    endDate: '2026-12-12',
    time: '18h00',
    location: 'Place de France',
    priceKmf: 0,
    image: heroTerrace,
  },
  {
    id: 'evt-diner-diplomatique',
    title: 'Dîner diplomatique — délégation régionale',
    description:
      'Dîner privé sur réservation, menu dégustation mettant à l’honneur les produits de Ngazidja.',
    categoryId: 'evt-cat-professionnel',
    categoryLabel: 'Événements professionnels',
    eventDate: '2026-12-18',
    time: '20h00',
    location: 'Salle climatisée',
    image: entrecote,
  },
  {
    id: 'evt-rencontre-entrepreneurs',
    title: 'Rencontre des entrepreneurs de Ngazidja',
    description:
      'Petit-déjeuner de travail et table ronde autour du tourisme et de la restauration locale.',
    categoryId: 'evt-cat-culturel',
    categoryLabel: 'Culture & rencontres',
    eventDate: '2027-01-15',
    time: '09h00',
    location: 'Salle climatisée',
    priceKmf: 3500,
    image: poulet,
  },
];

export const TRIPADVISOR_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Claire D.',
    origin: 'Lyon · Voyageuse d’affaires',
    date: 'Octobre 2026',
    rating: 5,
    title: 'Une valeur sûre face à la Place de France',
    quote:
      'L’espadon fumé est délicat et la langouste grillée parfaitement cuite. La terrasse sous les grands arbres reste fraîche même à midi, et le service est attentif sans jamais presser.',
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
      'On apprécie autant le café du matin dès 7 heures que la pizza Select le soir dans la salle climatisée. L’accueil est constant et les produits de la mer sont toujours du jour.',
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
      'Le curry de bœuf à la comorienne est superbe et la crème brûlée à la vanille locale inoubliable. L’emplacement au cœur de Moroni permet de tout faire à pied ensuite.',
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
    title: 'Éventail d’espadon fumé',
    caption:
      'Une entrée froide du menu, servie avec un filet d’huile d’olive et du citron.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: MENU_IMAGES.carpaccio,
  },
  {
    id: 'gal-4',
    title: 'Filet de bœuf au poivre noir',
    caption: 'Sauce au poivre noir, frites maison et échalote braisée.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: IMAGES.entrecote,
  },
  {
    id: 'gal-5',
    title: 'Pizza Select',
    caption: 'La pizza signature de la maison, disponible en 26 et 33 cm.',
    category: 'plats',
    categoryLabel: 'Plats',
    image: MENU_IMAGES.brochettes,
  },
  {
    id: 'gal-6',
    title: 'Crème brûlée vanille & passion',
    caption: 'Dessert maison infusé à la vanille Bourbon de Grande Comore.',
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
    question: 'Faut-il réserver à l’avance le week-end ou pour un événement ?',
    answer:
      'La réservation est vivement recommandée pour le vendredi soir, le samedi, les soirées événement ainsi que pour les tables de plus de 4 personnes au déjeuner en semaine.',
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
    question: 'Peut-on commander à emporter ou organiser une réception ?',
    answer:
      'Oui, l’ensemble de la carte est disponible à emporter sur appel au +269 773 00 31. Pour les groupes de 8 à 60 personnes (entreprises, délégations, anniversaires, mariages), nous préparons un menu dédié sur réservation.',
  },
];

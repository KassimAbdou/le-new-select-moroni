import type { Locale } from './types';
import type { SiteContent } from '../data/siteContent';

export interface LocalizedFields {
  settings?: {
    info?: Partial<SiteContent['settings']['info']>;
    heroImage?: string;
    chef?: Partial<SiteContent['settings']['chef']>;
  };
  menu?: Record<string, Partial<Pick<import('../types').MenuItem, 'name' | 'description' | 'sectionLabel' | 'tag'>>>;
  gallery?: Record<string, Partial<Pick<import('../types').GalleryItem, 'title' | 'caption' | 'categoryLabel'>>>;
  brigade?: Record<string, Partial<Pick<import('../types').BrigadeMember, 'name' | 'role' | 'tenure' | 'bio'>>>;
  faq?: Record<string, Partial<Pick<import('../types').FaqItem, 'question' | 'answer'>>>;
  reviews?: Record<string, Partial<Pick<import('../types').ReviewItem, 'origin' | 'date' | 'title' | 'quote' | 'context'>>>;
  landmarks?: Record<string, { name?: string; distance?: string; note?: string }>;
  paymentMethods?: Array<{ title: string; detail: string }>;
}

export const contentTranslations: Record<Exclude<Locale, 'fr'>, LocalizedFields> = {
  en: {
    settings: {
      info: {
        tagline: 'French and European cuisine in the heart of Moroni',
        address: 'Place de France, Moroni, Grande Comore',
        country: 'Union of the Comoros',
        hoursSummary: 'Every day · 7:00 AM – 11:00 PM',
      },
      chef: {
        title: "Chef's daily special",
        subtitle: 'Based on arrivals at Moroni port and Volo-Volo market',
        dishName: 'Seared yellowfin tuna, combava vierge sauce & sweet potato purée',
        availability: 'Available for lunch and dinner · While supplies last',
      },
    },
    menu: {
      'sig-capitaine': { name: 'Pan-seared Capitaine', description: 'Capitaine fillet caught off Ngazidja, crispy skin, lemon butter with Comorian Bourbon vanilla, grilled cassava and sautéed greens.', sectionLabel: 'Fish from the Indian Ocean', tag: 'Signature dish' },
      'sig-entrecote': { name: 'Grilled ribeye steak', description: 'Flame-grilled beef, fleur de sel, creamy green pepper sauce, hand-cut homemade fries and confit shallot.', sectionLabel: 'Grills & bistro classics', tag: 'Signature dish' },
      'sig-poulet': { name: 'Bistro roast chicken', description: 'Half free-range chicken slowly roasted with fresh thyme and confit garlic, short herb jus and golden baby potatoes.', sectionLabel: 'Rotisserie & poultry', tag: 'Signature dish' },
      'pdj-select': { name: 'Le Select Breakfast Set', description: 'Freshly pressed fruit juice (mango, papaya or lime depending on season), warm pastry, baguette, butter, homemade jam, hot drink of your choice.', sectionLabel: 'Breakfast · from 7:00 AM', tag: 'Served until 10:30 AM' },
      'pdj-omelette': { name: 'Soft omelette with herbs or cheese', description: 'Three fresh eggs, chives, mature cheese or confit tomatoes, served with toast and green salad.', sectionLabel: 'Breakfast · from 7:00 AM' },
      'pdj-crepes': { name: 'Warm vanilla crêpes', description: 'Two thin crêpes flavored with Grande Comore vanilla, served with local Mount Karthala honey or melted dark chocolate.', sectionLabel: 'Breakfast · from 7:00 AM' },
      'dej-salade-thon': { name: 'Niçoise-style salad with seared tuna', description: 'Yellowfin tuna seared rare, crisp green beans, soft-boiled egg, black olives, cherry tomatoes and lemon vinaigrette.', sectionLabel: 'Lunch · 12:00–3:00 PM' },
      'dej-capitaine': { name: 'Pan-seared Capitaine, lemon-vanilla butter', description: 'Fresh capitaine fillet with golden skin, emulsified Comorian vanilla sauce, roasted cassava and sautéed greens.', sectionLabel: 'Lunch · 12:00–3:00 PM', tag: 'Signature' },
      'dej-poulet': { name: 'Bistro roast chicken with thyme and confit garlic', description: 'Half roasted chicken, parsley baby potatoes and rich herb jus.', sectionLabel: 'Lunch · 12:00–3:00 PM', tag: 'Signature' },
      'dej-pates': { name: 'Tagliatelle with Indian Ocean prawns', description: 'Shelled prawns flambéed with garlic, light lime cream and fresh basil.', sectionLabel: 'Lunch · 12:00–3:00 PM' },
      'din-carpaccio': { name: 'White fish carpaccio with citrus & clove', description: 'Thin slices of morning catch marinated in combava, extra virgin olive oil, pink peppercorns and toasted bread.', sectionLabel: 'Dinner · 6:30–11:00 PM' },
      'din-entrecote': { name: 'Grilled ribeye, green pepper sauce', description: 'Beef steak cooked to your liking, green pepper sauce, homemade fries and braised shallot.', sectionLabel: 'Dinner · 6:30–11:00 PM', tag: 'Signature' },
      'din-brochettes': { name: 'Grilled grouper skewers & saffron pilaf rice', description: 'Grouper cubes marinated in lemon and coriander, grilled sweet peppers, fragrant basmati rice and vierge sauce.', sectionLabel: 'Dinner · 6:30–11:00 PM' },
      'din-langouste': { name: 'Grilled Mitsamiouli lobster (subject to availability)', description: 'Whole lobster split and grilled with parsley butter, served with seasonal vegetables and steamed potatoes.', sectionLabel: 'Dinner · 6:30–11:00 PM', tag: 'Subject to availability' },
      'des-creme-brulee': { name: 'Bourbon vanilla & passion fruit crème brûlée', description: 'Set cream infused with Grande Comore vanilla pod, flame-caramelized sugar and lace tuile.', sectionLabel: 'Homemade Desserts & Drinks', tag: 'Homemade' },
      'des-mousse': { name: '70% dark chocolate mousse & orange zest', description: 'Light chocolate mousse with a hint of fleur de sel and Breton shortbread.', sectionLabel: 'Homemade Desserts & Drinks' },
      'boi-jus': { name: 'Market-pressed juices & mint lemonade', description: 'Fresh mango, soursop, passion fruit, Victoria pineapple or lightly sweetened homemade lemonade.', sectionLabel: 'Homemade Desserts & Drinks' },
      'boi-cafe': { name: 'Italian espresso, long coffee or cardamom tea', description: 'Bold roast served on the terrace from 7:00 AM or after your meal.', sectionLabel: 'Homemade Desserts & Drinks' },
      'plat-du-jour': { name: "Chef's daily special", description: 'Based on arrivals at Moroni port and Volo-Volo market', sectionLabel: "Chef's daily special", tag: 'Subject to availability' },
    },
    gallery: {
      'gal-1': { title: 'Terrace under the badamier trees', caption: 'Tables set in natural shade facing Place de France.', categoryLabel: 'Terrace' },
      'gal-2': { title: 'Air-conditioned dining room', caption: 'Dark woodwork, white tablecloths and calm freshness for your business lunches.', categoryLabel: 'Dining room' },
      'gal-3': { title: 'Pan-seared Capitaine with Comorian vanilla', caption: 'Golden skin and lemon butter served with grilled cassava and greens.', categoryLabel: 'Dishes' },
      'gal-4': { title: 'Grilled ribeye & green pepper sauce', caption: 'Green pepper sauce in a copper pan and homemade fries.', categoryLabel: 'Dishes' },
      'gal-5': { title: 'Bistro roast chicken', caption: 'Golden chicken with fresh thyme, confit garlic and baby potatoes.', categoryLabel: 'Dishes' },
      'gal-6': { title: 'Vanilla & passion fruit crème brûlée', caption: 'Signature dessert infused with Bourbon vanilla from Grande Comore.', categoryLabel: 'Dishes' },
      'gal-7': { title: 'Evening dinners & large tables', caption: 'Warm atmosphere under string lights for receptions and groups.', categoryLabel: 'Events' },
    },
    brigade: {
      'bri-1': { name: 'Chef Ibrahim Soilihi', role: 'Head Chef', tenure: '12 years in the kitchen', bio: 'Trained in classic French techniques and passionate about Ngazidja catches, he creates the daily menu each morning when the boats and market return.' },
      'bri-2': { name: 'Nadia Abdallah', role: 'Maître d’hôtel & Front of House', tenure: '9 years in service', bio: 'Ensures smooth service from breakfast to the last dinner, with special care for diplomatic lunches and families.' },
      'bri-3': { name: 'Chef Thomas Renaud', role: 'Sous-chef, rotisserie & sauces', tenure: '7 years in bistronomy', bio: 'Guarantees precise cooking of grilled meats, house-reduced jus and pastries infused with Comorian vanilla and citrus.' },
      'bri-4': { name: 'Saïd Mzé', role: 'Terrace & Bar Manager', tenure: '8 years in Moroni', bio: 'Orchestrates service under the badamier trees of Place de France, morning coffees from 7:00 AM and fresh tropical juices.' },
    },
    faq: {
      'faq-1': { question: 'Does the restaurant offer Wi-Fi for working lunches?', answer: 'Yes. Free high-speed Wi-Fi is available both in the air-conditioned room and on the terrace. The code is provided upon arrival.' },
      'faq-2': { question: 'Should I book in advance on weekends or for dinner?', answer: 'Booking is strongly recommended for Friday evenings, Saturdays, and for tables of more than 4 people at weekday lunch.' },
      'faq-3': { question: 'Are children welcome and do you offer suitable dishes?', answer: 'Of course. High chairs are available on request and we prepare adapted portions (breaded or grilled fish fillet, fresh beef patty with homemade fries, crêpes).' },
      'faq-4': { question: 'What dietary requirements do you accommodate?', answer: 'All our beef and poultry are certified halal, and our kitchen is guaranteed pork-free. Vegetarian and gluten-free options (grilled fish, cassava, rice, salads) are available at every service.' },
      'faq-5': { question: 'Can I order takeaway or organize a group meal?', answer: 'Yes, the entire menu is available for takeaway by calling +269 773 00 31. For groups of 8 to 30 people (companies, delegations, birthdays), we prepare a dedicated menu by reservation.' },
    },
    reviews: {
      'rev-1': { origin: 'Lyon · Business traveler', date: 'October 2026', title: 'A sure bet facing Place de France', quote: 'The pan-seared capitaine is perfectly cooked, with crispy skin and delicate lemon-vanilla sauce. The terrace under the large trees stays cool even at noon, and service is attentive without ever rushing you.', context: 'Terrace lunch · Certified TripAdvisor review' },
      'rev-2': { origin: 'Moroni · Local regular', date: 'September 2026', title: 'Ideal for a business meeting or family dinner', quote: 'We enjoy the morning coffee from 7 AM as much as the grilled ribeye in the evening in the air-conditioned room. The welcome is consistent and the seafood is always fresh.', context: 'Dinner in the air-conditioned room · Certified TripAdvisor review' },
      'rev-3': { origin: 'Paris · International worker', date: 'August 2026', title: 'French bistro spirit with Comorian flavors', quote: 'Roast chicken worthy of a great bistro and an unforgettable vanilla crème brûlée made with local vanilla. The central Moroni location makes it easy to walk everywhere afterward.', context: 'Dinner with colleagues · Certified TripAdvisor review' },
    },
    landmarks: {
      select: { name: 'Le New Select', distance: 'Place de France', note: 'Shaded terrace under badamier trees and air-conditioned room facing the square.' },
      mosquee: { name: 'Old Friday Mosque', distance: '3 min walk', note: 'Historic white coral-stone monument by the water.' },
      port: { name: 'Port of Moroni', distance: '4 min walk', note: 'Daily fishermen’s arrivals supply the daily special.' },
      parking: { name: 'Place de France parking', distance: '1 min walk', note: 'Public parking areas along the square and adjacent avenues.' },
    },
    paymentMethods: [
      { title: 'Cash (KMF & EUR)', detail: 'Payment in Comorian Francs (KMF) and Euros (€) at the official fixed rate (1 € = 491.97 KMF).' },
      { title: 'Bank cards', detail: 'Payment terminal accepting Visa and Mastercard in the dining room and at the counter.' },
      { title: 'Mobile Money', detail: 'Instant mobile payment via Huri Money and MVola Comores accepted for dine-in and takeaway.' },
    ],
  },
  ar: {
    settings: {
      info: {
        tagline: 'مطبخ فرنسي وأوروبي في قلب موروني',
        address: 'ساحة فرنسا، موروني، القمر الكبرى',
        country: 'اتحاد جزر القمر',
        hoursSummary: 'كل يوم · 07:00 – 23:00',
      },
      chef: {
        title: 'طبق اليوم من الشيف',
        subtitle: 'حسب وصول الصيد إلى ميناء موروني وسوق فولو-فولو',
        dishName: 'ظهر تونة صفراء مشوي، صلصة كومبافا وبطاطا حلوة مهروسة',
        availability: 'متوفر للغداء والعشاء · حتى نفاد الكمية',
      },
    },
    menu: {
      'sig-capitaine': { name: 'سمك الكابتن المقلي', description: 'فيليه كابتن من صيد نغازيدجا، جلد مقرمش، زبدة بالليمون وفانيليا بوربون القمرية، كسافا مشوية وخضروات سوتيه.', sectionLabel: 'أسماك المحيط الهندي', tag: 'طبق مميز' },
      'sig-entrecote': { name: 'شريحة لحم مشوية', description: 'قطعة لحم بقري مشوية على اللهب، ملح زهري، صلصة فلفل أخضر كريمية، بطاطس مقلية منزلية وكراث محمر.', sectionLabel: 'مشويات وأطباق بيسترو', tag: 'طبق مميز' },
      'sig-poulet': { name: 'دجاج محمر على طريقة البيسترو', description: 'نصف دجاجة مشوية ببطء مع زعتر طازج وثوم محمر، مرق بالأعشاب وبطاطس صغيرة ذهبية.', sectionLabel: 'مشويات ودواجن', tag: 'طبق مميز' },
      'pdj-select': { name: 'وجبة إفطار لو سيليكت', description: 'عصير فواكه طازج (مانجو أو بابايا أو ليمون أخضر حسب الموسم)، معجنات دافئة، خبز باغيت، زبدة، مربى منزلية ومشروب ساخن من اختيارك.', sectionLabel: 'الإفطار · من 07:00', tag: 'يُقدّم حتى 10:30' },
      'pdj-omelette': { name: 'أومليت بالأعشاب أو الجبن', description: 'ثلاث بيضات طازجة، ثوم معمر، جبن معتق أو طماطم محمرة، تُقدّم مع خبز محمص وسلطة خضراء.', sectionLabel: 'الإفطار · من 07:00' },
      'pdj-crepes': { name: 'كريب دافئ بالفانيليا', description: 'قطعتا كريب رقيقتان بنكهة فانيليا القمر الكبرى، مع عسل محلي من كارتالا أو شوكولاتة داكنة مذابة.', sectionLabel: 'الإفطار · من 07:00' },
      'dej-salade-thon': { name: 'سلطة نيسواز بالتونة نصف مشوية', description: 'تونة صفراء مشوية سريعًا، فاصوليا خضراء مقرمشة، بيضة نصف مسلوقة، زيتون أسود، طماطم كرزية وصلصة ليمون.', sectionLabel: 'الغداء · 12:00–15:00' },
      'dej-capitaine': { name: 'سمك الكابتن بزبدة الليمون والفانيليا', description: 'فيليه كابتن طازج بجلد ذهبي، صلصة فانيليا قمرية، كسافا مشوية وخضروات سوتيه.', sectionLabel: 'الغداء · 12:00–15:00', tag: 'مميز' },
      'dej-poulet': { name: 'دجاج محمر بالزعتر والثوم المحمر', description: 'نصف دجاجة مشوية، بطاطس صغيرة بالبقدونس ومرق غني بالأعشاب.', sectionLabel: 'الغداء · 12:00–15:00', tag: 'مميز' },
      'dej-pates': { name: 'تالياتيلي مع روبيان المحيط الهندي', description: 'روبيان مقشر مقلّى بالثوم، كريمة خفيفة بالليمون الأخضر وريحان طازج.', sectionLabel: 'الغداء · 12:00–15:00' },
      'din-carpaccio': { name: 'كارباتشيو سمك أبيض بالحمضيات والقرنفل', description: 'شرائح رقيقة من صيد الصباح متبلة بالكومبافا وزيت زيتون بكر وفلفل وردي وخبز محمص.', sectionLabel: 'العشاء · 18:30–23:00' },
      'din-entrecote': { name: 'شريحة لحم مشوية بصلصة الفلفل الأخضر', description: 'قطعة لحم بقري حسب درجة الطهي المطلوبة، صلصة فلفل أخضر، بطاطس مقلية منزلية وكراث مطهو.', sectionLabel: 'العشاء · 18:30–23:00', tag: 'مميز' },
      'din-brochettes': { name: 'أسياخ هامور مشوية مع أرز بالزعفران', description: 'مكعبات هامور متبلة بالليمون والكزبرة، فلفل حلو مشوي، أرز بسمتي عطري وصلصة فيرج.', sectionLabel: 'العشاء · 18:30–23:00' },
      'din-langouste': { name: 'جراد بحر ميتساميوولي المشوي (حسب التوفر)', description: 'جراد بحر كامل مشوي بزبدة البقدونس، يُقدّم مع خضروات موسمية وبطاطس مطهوة على البخار.', sectionLabel: 'العشاء · 18:30–23:00', tag: 'حسب التوفر' },
      'des-creme-brulee': { name: 'كريم بروليه بفانيليا بوربون وفاكهة العاطفة', description: 'كريمة بنكهة فانيليا القمر الكبرى، سكر مكرمل وخبز مقرمش.', sectionLabel: 'حلويات منزلية ومشروبات', tag: 'منزلي الصنع' },
      'des-mousse': { name: 'موس شوكولاتة داكنة 70% وقشر برتقال', description: 'قوام خفيف من الشوكولاتة مع لمسة ملح وخبز بريتون.', sectionLabel: 'حلويات منزلية ومشروبات' },
      'boi-jus': { name: 'عصائر طازجة من السوق وليموناضة بالنعناع', description: 'مانجو طازجة، قشطة شائكة، فاكهة العاطفة، أناناس فيكتوريا أو ليموناضة منزلية قليلة السكر.', sectionLabel: 'حلويات منزلية ومشروبات' },
      'boi-cafe': { name: 'إسبريسو إيطالي أو قهوة أو شاي بالهيل', description: 'تحميص غني يُقدّم في الشرفة من 07:00 أو بعد الوجبة.', sectionLabel: 'حلويات منزلية ومشروبات' },
      'plat-du-jour': { name: 'طبق اليوم من الشيف', description: 'حسب وصول الصيد إلى ميناء موروني وسوق فولو-فولو', sectionLabel: 'طبق اليوم من الشيف', tag: 'حسب التوفر' },
    },
    gallery: {
      'gal-1': { title: 'الشرفة تحت أشجار البادامير', caption: 'طاولات في ظل طبيعي مقابل ساحة فرنسا.', categoryLabel: 'الشرفة' },
      'gal-2': { title: 'القاعة المكيفة', caption: 'أعمال خشبية داكنة ومفارش بيضاء وأجواء هادئة لغداءات العمل.', categoryLabel: 'القاعة' },
      'gal-3': { title: 'سمك الكابتن بفانيليا جزر القمر', caption: 'جلد ذهبي وزبدة بالليمون مع كسافا مشوية وخضروات.', categoryLabel: 'الأطباق' },
      'gal-4': { title: 'شريحة لحم مشوية بصلصة الفلفل الأخضر', caption: 'صلصة الفلفل الأخضر وبطاطس مقلية منزلية.', categoryLabel: 'الأطباق' },
      'gal-5': { title: 'دجاج محمر على طريقة البيسترو', caption: 'دجاج ذهبي مع زعتر طازج وثوم محمر وبطاطس صغيرة.', categoryLabel: 'الأطباق' },
      'gal-6': { title: 'كريم بروليه بالفانيليا وفاكهة العاطفة', caption: 'حلوى مميزة بنكهة فانيليا بوربون من القمر الكبرى.', categoryLabel: 'الأطباق' },
      'gal-7': { title: 'عشاءات ومناسبات مسائية', caption: 'أجواء دافئة تحت الأضواء للاستقبالات والمجموعات.', categoryLabel: 'الفعاليات' },
    },
    brigade: {
      'bri-1': { name: 'الشيف إبراهيم صليحي', role: 'رئيس الطهاة', tenure: '12 عامًا في المطبخ', bio: 'تدرب على تقنيات المطبخ الفرنسي الكلاسيكي وشغوف بصيد نغازيدجا، يبتكر قائمة اليوم كل صباح مع عودة القوارب والسوق.' },
      'bri-2': { name: 'نادية عبد الله', role: 'مديرة القاعة والاستقبال', tenure: '9 سنوات في الخدمة', bio: 'تضمن سلاسة الخدمة من الإفطار حتى العشاء الأخير، مع اهتمام خاص بغداءات الوفود والعائلات.' },
      'bri-3': { name: 'الشيف توماس رينو', role: 'نائب الشيف للمشويات والصلصات', tenure: '7 سنوات في فن البيسترو', bio: 'يضمن دقة طهي اللحوم المشوية والمرق المحضر في المكان والحلويات بنكهة فانيليا وحمضيات جزر القمر.' },
      'bri-4': { name: 'سعيد مزي', role: 'مسؤول الشرفة والبار', tenure: '8 سنوات في موروني', bio: 'ينسق الخدمة تحت أشجار البادامير في ساحة فرنسا، والقهوة الصباحية من 07:00 وعصائر الفواكه الاستوائية الطازجة.' },
    },
    faq: {
      'faq-1': { question: 'هل يوفر المطعم واي فاي لغداءات العمل؟', answer: 'نعم. تتوفر خدمة واي فاي عالية السرعة مجانًا في القاعة المكيفة والشرفة. يُقدَّم الرمز عند الوصول.' },
      'faq-2': { question: 'هل يجب الحجز مسبقًا في عطلة نهاية الأسبوع أو للعشاء؟', answer: 'يُنصح بالحجز بشدة مساء الجمعة والسبت، وكذلك للطاولات التي تزيد عن 4 أشخاص في غداء أيام الأسبوع.' },
      'faq-3': { question: 'هل يُرحب بالأطفال وهل تتوفر أطباق مناسبة؟', answer: 'بالتأكيد. تتوفر كراسي مرتفعة عند الطلب ونحضّر حصصًا مناسبة (فيليه سمك مقلي أو مشوي، لحم بقري طازج مع بطاطس، كريب).' },
      'faq-4': { question: 'ما الأنظمة الغذائية التي تراعيها؟', answer: 'جميع لحوم البقر والدواجن لدينا حلال معتمدة، ومطبخنا خالٍ من لحم الخنزير. تتوفر خيارات نباتية وخالية من الغلوتين (أسماك مشوية، كسافا، أرز، سلطات) في كل خدمة.' },
      'faq-5': { question: 'هل يمكن طلب وجبات خارجية أو تنظيم وجبة لمجموعة؟', answer: 'نعم، جميع أطباق القائمة متاحة للطلبات الخارجية بالاتصال على +269 773 00 31. للمجموعات من 8 إلى 30 شخصًا (شركات، وفود، أعياد ميلاد)، نُعد قائمة مخصصة عند الحجز.' },
    },
    reviews: {
      'rev-1': { origin: 'ليون · مسافرة عمل', date: 'أكتوبر 2026', title: 'خيار موثوق مقابل ساحة فرنسا', quote: 'سمك الكابتن مطهو بإتقان، بجلد مقرمش وصلصة ليمون وفانيليا رائعة. الشرفة تحت الأشجار الكبيرة تبقى منعشة حتى وقت الظهيرة، والخدمة منتبهة دون استعجال.', context: 'غداء في الشرفة · رأي موثق من تريب أدفايزر' },
      'rev-2': { origin: 'موروني · زبون دائم', date: 'سبتمبر 2026', title: 'مثالي لاجتماع عمل أو عشاء عائلي', quote: 'نستمتع بقهوة الصباح من الساعة 7 بقدر ما نستمتع بشريحة اللحم المشوية مساءً في القاعة المكيفة. الاستقبال ثابت والمأكولات البحرية طازجة دائمًا.', context: 'عشاء في القاعة المكيفة · رأي موثق من تريب أدفايزر' },
      'rev-3': { origin: 'باريس · عامل دولي', date: 'أغسطس 2026', title: 'روح البيسترو الفرنسي بنكهات قمرية', quote: 'دجاج محمر يليق بأفضل المطاعم وكريم بروليه بالفانيليا المحلية لا تُنسى. الموقع في قلب موروني يتيح التنقل سيرًا بسهولة.', context: 'عشاء مع زملاء · رأي موثق من تريب أدفايزر' },
    },
    landmarks: {
      select: { name: 'لو نيو سيليكت', distance: 'ساحة فرنسا', note: 'شرفة مظللة تحت أشجار البادامير وقاعة مكيفة مقابل الساحة.' },
      mosquee: { name: 'مسجد الجمعة القديم', distance: '3 دقائق سيرًا', note: 'معلم تاريخي من حجر المرجان الأبيض على حافة الماء.' },
      port: { name: 'ميناء موروني', distance: '4 دقائق سيرًا', note: 'وصول يومي لصيادي السمك يغذي طبق اليوم.' },
      parking: { name: 'موقف ساحة فرنسا', distance: 'دقيقة واحدة سيرًا', note: 'مواقف عامة بمحاذاة الساحة والشوارع المجاورة.' },
    },
    paymentMethods: [
      { title: 'نقدًا (KMF & EUR)', detail: 'الدفع بالفرنك القمري (KMF) واليورو (€) وفق السعر الرسمي الثابت (1 € = 491.97 KMF).' },
      { title: 'البطاقات المصرفية', detail: 'جهاز دفع يقبل بطاقات Visa وMastercard في القاعة وعند الصندوق.' },
      { title: 'الدفع عبر الهاتف', detail: 'الدفع الفوري عبر Huri Money وMVola Comores متاح في القاعة والطلبات الخارجية.' },
    ],
  },
  sw: {
    settings: {
      info: {
        tagline: 'Vyakula vya Kifaransa na Ulaya katikati ya Moroni',
        address: 'Place de France, Moroni, Ngazidja',
        country: 'Umoja wa Komori',
        hoursSummary: 'Kila siku · 07:00 – 23:00',
      },
      chef: {
        title: 'Chakula maalum cha mpishi mkuu',
        subtitle: 'Kulingana na upatikanaji bandarini Moroni na sokoni Volo-Volo',
        dishName: 'Jodari aliyechomwa kidogo, mchuzi wa combava na uji wa viazi vitamu',
        availability: 'Inapatikana mchana na jioni · Hadi itakapoisha',
      },
    },
    menu: {
      'sig-capitaine': { name: 'Capitaine wa kukaangwa', description: 'Fillet ya capitaine kutoka Ngazidja, ngozi laini na ya kukauka, siagi ya limau na vanila ya Bourbon ya Komori, mihogo iliyochomwa na mboga za majani.', sectionLabel: 'Samaki wa Bahari ya Hindi', tag: 'Chakula maalum' },
      'sig-entrecote': { name: 'Nyama ya ng’ombe iliyochomwa', description: 'Nyama ya ng’ombe iliyochomwa kwenye moto, chumvi, mchuzi wa pilipili hoho kijani, viazi vya kukaanga vya nyumbani na vitunguu vilivyopikwa polepole.', sectionLabel: 'Vyakula vya kuchoma na bistrot', tag: 'Chakula maalum' },
      'sig-poulet': { name: 'Kuku wa kuoka wa bistrot', description: 'Nusu kuku aliyeokwa polepole na thyme na vitunguu saumu, mchuzi wa mimea na viazi vidogo vya dhahabu.', sectionLabel: 'Vyakula vya kuoka na kuku', tag: 'Chakula maalum' },
      'pdj-select': { name: 'Kifungua kinywa cha Le Select', description: 'Juisi safi (embe, papai au ndimu kulingana na msimu), andazi joto, mkate, siagi, jamu ya nyumbani na kinywaji moto unachopenda.', sectionLabel: 'Kifungua kinywa · kuanzia 07:00', tag: 'Hadi 10:30' },
      'pdj-omelette': { name: 'Omeleti laini yenye mimea au jibini', description: 'Mayai matatu safi, vitunguu majani, jibini au nyanya, hutolewa na mkate wa kuoka na saladi.', sectionLabel: 'Kifungua kinywa · kuanzia 07:00' },
      'pdj-crepes': { name: 'Krepe za vanila zenye joto', description: 'Krepe mbili nyembamba zenye harufu ya vanila ya Ngazidja, pamoja na asali ya Karthala au chokoleti nyeusi iliyoyeyuka.', sectionLabel: 'Kifungua kinywa · kuanzia 07:00' },
      'dej-salade-thon': { name: 'Saladi ya Niçoise na jodari', description: 'Jodari aliyechomwa kidogo, maharagwe mabichi, yai laini, zeituni nyeusi, nyanya ndogo na mchuzi wa limau.', sectionLabel: 'Chakula cha mchana · 12:00–15:00' },
      'dej-capitaine': { name: 'Capitaine wa kukaangwa, siagi ya limau-vanila', description: 'Fillet safi ya capitaine, ngozi ya dhahabu, mchuzi wa vanila ya Komori, mihogo iliyochomwa na mboga za majani.', sectionLabel: 'Chakula cha mchana · 12:00–15:00', tag: 'Maalum' },
      'dej-poulet': { name: 'Kuku wa kuoka na thyme na vitunguu saumu', description: 'Nusu kuku aliyeokwa, viazi vidogo vya parsley na mchuzi mzito wa mimea.', sectionLabel: 'Chakula cha mchana · 12:00–15:00', tag: 'Maalum' },
      'dej-pates': { name: 'Tagliatelle na kamba wa Bahari ya Hindi', description: 'Kamba waliokaangwa na vitunguu saumu, krimu nyepesi ya ndimu na basil safi.', sectionLabel: 'Chakula cha mchana · 12:00–15:00' },
      'din-carpaccio': { name: 'Carpaccio ya samaki mweupe na machungwa na karafuu', description: 'Vipande vyembamba vya samaki wa asubuhi vilivyolowekwa kwenye combava, mafuta ya zeituni, pilipili nyekundu na mkate wa kuoka.', sectionLabel: 'Chakula cha jioni · 18:30–23:00' },
      'din-entrecote': { name: 'Nyama ya ng’ombe iliyochomwa, mchuzi wa pilipili hoho kijani', description: 'Nyama ya ng’ombe iliyopikwa upendavyo, mchuzi wa pilipili hoho kijani, viazi vya nyumbani na vitunguu vilivyopikwa.', sectionLabel: 'Chakula cha jioni · 18:30–23:00', tag: 'Maalum' },
      'din-brochettes': { name: 'Mishikaki ya chewa iliyochomwa na wali wa zafarani', description: 'Vipande vya chewa vilivyolowekwa kwenye limau na giligilani, pilipili tamu zilizochomwa, wali wa basmati na mchuzi wa vierge.', sectionLabel: 'Chakula cha jioni · 18:30–23:00' },
      'din-langouste': { name: 'Kamba mkubwa wa Mitsamiouli aliyechomwa (kulingana na upatikanaji)', description: 'Kamba mkubwa mzima aliyechomwa na siagi ya parsley, hutolewa na mboga za msimu na viazi vilivyochemshwa.', sectionLabel: 'Chakula cha jioni · 18:30–23:00', tag: 'Kulingana na upatikanaji' },
      'des-creme-brulee': { name: 'Crème brûlée ya vanila ya Bourbon na passion', description: 'Krimu yenye ladha ya vanila ya Ngazidja, sukari iliyokaramelishwa na biskuti nyembamba.', sectionLabel: 'Vitindamcho vya nyumbani & Vinywaji', tag: 'Vya nyumbani' },
      'des-mousse': { name: 'Mousse ya chokoleti nyeusi 70% na ganda la chungwa', description: 'Mousse nyepesi ya chokoleti yenye chumvi kidogo na biskuti ya Breton.', sectionLabel: 'Vitindamcho vya nyumbani & Vinywaji' },
      'boi-jus': { name: 'Juisi safi za sokoni na limau na mnanaa', description: 'Embe safi, duriani, passion, nanasi ya Victoria au limau ya nyumbani isiyo na sukari nyingi.', sectionLabel: 'Vitindamcho vya nyumbani & Vinywaji' },
      'boi-cafe': { name: 'Espresso ya Kiitaliano, kahawa au chai ya iliki', description: 'Kahawa yenye ladha kali hutolewa mtaroni kuanzia 07:00 au baada ya mlo.', sectionLabel: 'Vitindamcho vya nyumbani & Vinywaji' },
      'plat-du-jour': { name: 'Chakula maalum cha mpishi mkuu', description: 'Kulingana na upatikanaji bandarini Moroni na sokoni Volo-Volo', sectionLabel: 'Chakula maalum cha mpishi mkuu', tag: 'Kulingana na upatikanaji' },
    },
    gallery: {
      'gal-1': { title: 'Mtaro chini ya miti ya mkungu', caption: 'Meza zilizopangwa kwenye kivuli asilia zikielekea Place de France.', categoryLabel: 'Mtaro' },
      'gal-2': { title: 'Chumba chenye kiyoyozi', caption: 'Mbao nyeusi, vitambaa vyeupe na utulivu kwa chakula cha kazi.', categoryLabel: 'Chumba' },
      'gal-3': { title: 'Capitaine wa kukaangwa na vanila ya Komori', caption: 'Ngozi ya dhahabu na siagi ya limau pamoja na mihogo na mboga.', categoryLabel: 'Vyakula' },
      'gal-4': { title: 'Nyama ya ng’ombe iliyochomwa na mchuzi wa pilipili kijani', caption: 'Mchuzi wa pilipili kijani na viazi vya nyumbani.', categoryLabel: 'Vyakula' },
      'gal-5': { title: 'Kuku wa kuoka wa bistrot', caption: 'Kuku wa dhahabu na thyme safi, vitunguu saumu na viazi vidogo.', categoryLabel: 'Vyakula' },
      'gal-6': { title: 'Crème brûlée ya vanila na passion', caption: 'Kitindamcho maalum chenye vanila ya Bourbon kutoka Ngazidja.', categoryLabel: 'Vyakula' },
      'gal-7': { title: 'Chakula cha jioni na meza kubwa', caption: 'Mazingira ya joto chini ya taa kwa mapokezi na vikundi.', categoryLabel: 'Matukio' },
    },
    brigade: {
      'bri-1': { name: 'Mpishi Mkuu Ibrahim Soilihi', role: 'Mpishi Mkuu', tenure: 'Miaka 12 jikoni', bio: 'Alifundishwa mbinu za jadi za Kifaransa na anapenda samaki wa Ngazidja; huandaa menyu ya kila siku asubuhi baada ya wavuvi na soko kufika.' },
      'bri-2': { name: 'Nadia Abdallah', role: 'Msimamizi wa ukumbi na mapokezi', tenure: 'Miaka 9 katika huduma', bio: 'Huhakikisha huduma laini kutoka kifungua kinywa hadi chakula cha mwisho cha jioni, hasa kwa mikutano rasmi na familia.' },
      'bri-3': { name: 'Mpishi Thomas Renaud', role: 'Naibu mpishi wa kuoka na michuzi', tenure: 'Miaka 7 katika bistronomy', bio: 'Anahakikisha upishi sahihi wa nyama choma, michuzi ya nyumbani na vitindamcho vyenye vanila na machungwa ya Komori.' },
      'bri-4': { name: 'Saïd Mzé', role: 'Msimamizi wa mtaro na baa', tenure: 'Miaka 8 Moroni', bio: 'Anaratibu huduma chini ya miti ya mkungu ya Place de France, kahawa ya asubuhi kuanzia 07:00 na juisi safi za matunda ya kitropiki.' },
    },
    faq: {
      'faq-1': { question: 'Je, mgahawa una Wi-Fi kwa mikutano ya chakula cha mchana?', answer: 'Ndiyo. Wi-Fi ya kasi ya juu ya bure inapatikana ndani ya chumba chenye kiyoyozi na mtaroni. Nenosiri hutolewa unapofika.' },
      'faq-2': { question: 'Je, ni lazima kuhifadhi mapema wikendi au kwa chakula cha jioni?', answer: 'Uhifadhi unapendekezwa sana Ijumaa jioni, Jumamosi, na kwa meza za zaidi ya watu 4 wakati wa chakula cha mchana siku za kazi.' },
      'faq-3': { question: 'Je, watoto wanakaribishwa na kuna vyakula vinavyowafaa?', answer: 'Ndiyo. Viti vya watoto vinapatikana ukitaja, na tunaandaa sehemu zinazofaa (samaki wa kukaanga au kuchoma, nyama ya ng’ombe na viazi, krepe).' },
      'faq-4': { question: 'Je, mnakidhi mahitaji gani ya lishe?', answer: 'Nyama zetu zote za ng’ombe na kuku ni halal, na jikoni yetu haina nyama ya nguruwe. Chaguo za mboga na zisizo na gluteni (samaki wa kuchoma, mihogo, wali, saladi) zinapatikana kila wakati.' },
      'faq-5': { question: 'Je, naweza kuagiza chakula cha kuchukua au kupanga mlo wa kikundi?', answer: 'Ndiyo, menyu yote inapatikana kwa kuchukua kwa kupiga simu +269 773 00 31. Kwa vikundi vya watu 8 hadi 30 (kampuni, ujumbe, siku za kuzaliwa), tunaandaa menyu maalum kwa uhifadhi.' },
    },
    reviews: {
      'rev-1': { origin: 'Lyon · Msafiri wa kazi', date: 'Oktoba 2026', title: 'Chaguo la kuaminika mbele ya Place de France', quote: 'Capitaine imepikwa vizuri sana, ngozi laini na mchuzi wa limau na vanila ni mzuri. Mtaro chini ya miti mikubwa hubaki baridi hata mchana, na huduma ni makini bila kuharakisha.', context: 'Chakula cha mchana mtaroni · Maoni yaliyothibitishwa ya TripAdvisor' },
      'rev-2': { origin: 'Moroni · Mteja wa kawaida', date: 'Septemba 2026', title: 'Bora kwa mkutano wa kazi au chakula cha familia', quote: 'Tunafurahia kahawa ya asubuhi kuanzia saa 1:00 na nyama choma jioni ndani ya chumba chenye kiyoyozi. Huduma ni thabiti na vyakula vya baharini ni safi kila wakati.', context: 'Chakula cha jioni ndani · Maoni yaliyothibitishwa ya TripAdvisor' },
      'rev-3': { origin: 'Paris · Mfanyakazi wa kimataifa', date: 'Agosti 2026', title: 'Roho ya bistrot ya Kifaransa na ladha za Komori', quote: 'Kuku wa kuoka wa kiwango cha juu na crème brûlée ya vanila ya ndani isiyosahaulika. Mahali katikati ya Moroni hurahisisha kutembea baada ya mlo.', context: 'Chakula cha jioni na wenzake · Maoni yaliyothibitishwa ya TripAdvisor' },
    },
    landmarks: {
      select: { name: 'Le New Select', distance: 'Place de France', note: 'Mtaro wenye kivuli chini ya miti ya mkungu na chumba chenye kiyoyozi kinachoelekea uwanja.' },
      mosquee: { name: 'Msikiti wa Kale wa Ijumaa', distance: 'Dakika 3 kwa miguu', note: 'Jengo la kihistoria la mawe ya matumbawe meupe karibu na maji.' },
      port: { name: 'Bandari ya Moroni', distance: 'Dakika 4 kwa miguu', note: 'Uwasilishaji wa kila siku wa wavuvi husaidia menyu ya siku.' },
      parking: { name: 'Maegesho ya Place de France', distance: 'Dakika 1 kwa miguu', note: 'Maeneo ya maegesho ya umma kando ya uwanja na barabara zilizo karibu.' },
    },
    paymentMethods: [
      { title: 'Fedha taslimu (KMF & EUR)', detail: 'Malipo kwa Faranga za Komori (KMF) na Euro (€) kulingana na kiwango rasmi (1 € = 491.97 KMF).' },
      { title: 'Kadi za benki', detail: 'Kifaa cha malipo kinachokubali Visa na Mastercard ndani ya mgahawa na kauntani.' },
      { title: 'Pesa za simu', detail: 'Malipo ya papo hapo kupitia Huri Money na MVola Comores yanakubaliwa ndani na kwa kuchukua.' },
    ],
  },
};

export function localizeContent(content: SiteContent, locale: Locale): SiteContent {
  if (locale === 'fr') return content;
  const tr = contentTranslations[locale];
  if (!tr) return content;

  const menuMap = tr.menu ?? {};
  const galleryMap = tr.gallery ?? {};
  const brigadeMap = tr.brigade ?? {};
  const faqMap = tr.faq ?? {};
  const reviewMap = tr.reviews ?? {};

  const localizeMenu = <T extends import('../types').MenuItem>(item: T): T => {
    const m = menuMap[item.id];
    return m ? { ...item, ...m } : item;
  };

  return {
    ...content,
    settings: {
      ...content.settings,
      info: { ...content.settings.info, ...(tr.settings?.info ?? {}) },
      heroImage: tr.settings?.heroImage ?? content.settings.heroImage,
      chef: { ...content.settings.chef, ...(tr.settings?.chef ?? {}) },
    },
    menu: content.menu.map(localizeMenu),
    signature: content.signature.map(localizeMenu),
    gallery: content.gallery.map((item) => {
      const m = galleryMap[item.id];
      return m ? { ...item, ...m } : item;
    }),
    brigade: content.brigade.map((member) => {
      const m = brigadeMap[member.id];
      return m ? { ...member, ...m } : member;
    }),
    faq: content.faq.map((item) => {
      const m = faqMap[item.id];
      return m ? { ...item, ...m } : item;
    }),
    reviews: content.reviews.map((review) => {
      const m = reviewMap[review.id];
      return m ? { ...review, ...m } : review;
    }),
  };
}

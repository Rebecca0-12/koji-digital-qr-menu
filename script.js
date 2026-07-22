/* ============ CONFIG ============ */
const restaurantConfig = {
  name: 'KŌJI',
  tagline: {
    en: 'Modern Nikkei kitchen & robata grill',
    fr: 'Cuisine Nikkei moderne & grill robata',
    es: 'Cocina Nikkei moderna y parrilla robata',
  },
  whatsappNumber: '15551234567',
  locationName: 'KŌJI — Main Dining Room',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
  ],
  defaultLanguage: 'en',
  categories: [
    { id: 'starters', label: { en: 'Starters', fr: 'Entrées', es: 'Entrantes' } },
    { id: 'mains', label: { en: 'Main Courses', fr: 'Plats Principaux', es: 'Platos Principales' } },
    { id: 'desserts', label: { en: 'Desserts', fr: 'Desserts', es: 'Postres' } },
    { id: 'cocktails', label: { en: 'Cocktails', fr: 'Cocktails', es: 'Cócteles' } },
    { id: 'wines', label: { en: 'Wines', fr: 'Vins', es: 'Vinos' } },
    { id: 'nonalcoholic', label: { en: 'Non-Alcoholic', fr: 'Sans Alcool', es: 'Sin Alcohol' } },
  ],
  allergens: [
    { id: 'gluten', label: { en: 'Gluten', fr: 'Gluten', es: 'Gluten' } },
    { id: 'milk', label: { en: 'Milk', fr: 'Lait', es: 'Leche' } },
    { id: 'eggs', label: { en: 'Eggs', fr: 'Œufs', es: 'Huevos' } },
    { id: 'fish', label: { en: 'Fish', fr: 'Poisson', es: 'Pescado' } },
    { id: 'shellfish', label: { en: 'Shellfish', fr: 'Crustacés', es: 'Mariscos' } },
    { id: 'peanuts', label: { en: 'Peanuts', fr: 'Arachides', es: 'Cacahuetes' } },
    { id: 'treenuts', label: { en: 'Tree Nuts', fr: 'Fruits à Coque', es: 'Frutos Secos' } },
    { id: 'soy', label: { en: 'Soy', fr: 'Soja', es: 'Soja' } },
    { id: 'sesame', label: { en: 'Sesame', fr: 'Sésame', es: 'Sésamo' } },
    { id: 'mustard', label: { en: 'Mustard', fr: 'Moutarde', es: 'Mostaza' } },
    { id: 'celery', label: { en: 'Celery', fr: 'Céleri', es: 'Apio' } },
    { id: 'sulphites', label: { en: 'Sulphites', fr: 'Sulfites', es: 'Sulfitos' } },
  ],
  ui: {
    search: { en: 'Search dishes', fr: 'Rechercher un plat', es: 'Buscar platos' },
    filterAllergens: { en: 'Filter allergens', fr: 'Filtrer les allergènes', es: 'Filtrar alérgenos' },
    addToOrder: { en: 'Add to order', fr: 'Ajouter à la commande', es: 'Añadir al pedido' },
    unavailable: { en: 'Currently unavailable', fr: 'Actuellement indisponible', es: 'No disponible actualmente' },
    featured: { en: 'Featured', fr: 'Recommandé', es: 'Recomendado' },
    yourOrder: { en: 'Your order', fr: 'Votre commande', es: 'Tu pedido' },
  },
};

/* ============ GOOGLE SHEETS CSV CONFIG ============ */
// Published Google Sheet (File > Share > Publish to web > CSV) used as the live menu data source.
// Expected columns (header row), one row per dish:
//   id, category, displayOrder, name_en, name_fr, name_es, desc_en, desc_fr, desc_es,
//   price, allergens, dietaryTags, available, featured, imageUrl
// - allergens / dietaryTags: semicolon-separated values in a single cell, e.g. "fish;soy;sesame"
// - available / featured: TRUE or FALSE (any case) in the sheet
// - price: plain number, e.g. 19 or 19.5
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9HsaCNqrZ5QPrEXwPOkAN_APwTZzSvoMQmI-GOs5KwP5qGFR8znvjA1uL9SZ_XMfjUhbsAEpxdyhG/pub?output=csv';

/* ============ SAMPLE DATA (fallback — used if the CSV fetch fails or is unreachable) ============ */
const FALLBACK_DISHES = [
{id:'starter-01',category:'starters',displayOrder:1,name:{en:'Hamachi Tiradito',fr:'Tiradito de Hamachi',es:'Tiradito de Hamachi'},description:{en:'Thin-sliced yellowtail, leche de tigre, aji amarillo, crisp shallot, cilantro oil',fr:'Emincé de sériole, leche de tigre, aji amarillo, échalote croustillante, huile de coriandre',es:'Lonjas finas de hamachi, leche de tigre, aji amarillo, chalota crujiente, aceite de cilantro'},price:19,allergens:['fish'],dietaryTags:['pescatarian'],available:true,featured:true,imageUrl:'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800'},
{id:'starter-02',category:'starters',displayOrder:2,name:{en:'Charred Shishito & Miso Butter',fr:'Shishito Grillés au Beurre Miso',es:'Shishito Asados con Mantequilla de Miso'},description:{en:'Blistered shishito peppers, brown butter miso glaze, bonito flake, lime zest',fr:'Poivrons shishito cloqués, glaçage beurre-miso, copeaux de bonite, zeste de citron vert',es:'Pimientos shishito asados, glaseado de mantequilla y miso, copos de bonito, ralladura de lima'},price:14,allergens:['fish','soy','milk'],dietaryTags:['vegetarian-option'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800'},
{id:'starter-03',category:'starters',displayOrder:3,name:{en:'Tuna Tataki Robata',fr:'Tataki de Thon Robata',es:'Tataki de Atún Robata'},description:{en:'Charcoal-seared bluefin, ponzu, grated daikon, micro shiso, toasted sesame',fr:'Thon rouge saisi au charbon, ponzu, daikon râpé, micro-shiso, sésame grillé',es:'Atún rojo sellado al carbón, ponzu, daikon rallado, micro shiso, sésamo tostado'},price:22,allergens:['fish','soy','sesame'],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'},
{id:'starter-04',category:'starters',displayOrder:4,name:{en:'Anticucho Skewers',fr:'Brochettes Anticucho',es:'Brochetas Anticucho'},description:{en:'Grilled beef heart, aji panca marinade, roasted corn, huacatay salsa',fr:'Cœur de bœuf grillé, marinade aji panca, maïs rôti, salsa huacatay',es:'Corazón de res a la parrilla, marinado en aji panca, maíz asado, salsa de huacatay'},price:16,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800'},
{id:'main-01',category:'mains',displayOrder:1,name:{en:'Robata Black Cod',fr:'Morue Noire Robata',es:'Bacalao Negro Robata'},description:{en:'48-hour miso-marinated black cod, charcoal grilled, shiso oil, pickled ginger',fr:'Morue noire marinée au miso 48h, grillée au charbon, huile de shiso, gingembre mariné',es:'Bacalao negro marinado en miso 48h, a la parrilla de carbón, aceite de shiso, jengibre encurtido'},price:34,allergens:['fish','soy'],dietaryTags:['gluten-free'],available:true,featured:true,imageUrl:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'},
{id:'main-02',category:'mains',displayOrder:2,name:{en:'Duck Nikkei',fr:'Canard Nikkei',es:'Pato Nikkei'},description:{en:'Seared duck breast, aji panca glaze, purple corn puree, charred scallion',fr:'Magret de canard saisi, glaçage aji panca, purée de maïs violet, oignon vert grillé',es:'Pechuga de pato sellada, glaseado de aji panca, puré de maíz morado, cebollín asado'},price:29,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800'},
{id:'main-03',category:'mains',displayOrder:3,name:{en:'Wagyu Robata Skewers',fr:'Brochettes Wagyu Robata',es:'Brochetas Wagyu Robata'},description:{en:'A5 wagyu, binchotan-grilled, sudachi salt, shishito',fr:'Wagyu A5, grillé au binchotan, sel au sudachi, shishito',es:'Wagyu A5, a la parrilla de binchotan, sal de sudachi, shishito'},price:48,allergens:[],dietaryTags:['gluten-free'],available:true,featured:true,imageUrl:'https://images.unsplash.com/photo-1558030006-450675393462?w=800'},
{id:'main-04',category:'mains',displayOrder:4,name:{en:'Aji Amarillo Risotto',fr:'Risotto Aji Amarillo',es:'Risotto de Aji Amarillo'},description:{en:'Slow-cooked risotto, aji amarillo, queso fresco, crisp huacatay leaf',fr:'Risotto mijoté, aji amarillo, queso fresco, feuille de huacatay croustillante',es:'Risotto de cocción lenta, aji amarillo, queso fresco, hoja de huacatay crujiente'},price:24,allergens:['milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800'},
{id:'dessert-01',category:'desserts',displayOrder:1,name:{en:'Yuzu Cheesecake',fr:'Cheesecake au Yuzu',es:'Cheesecake de Yuzu'},description:{en:'Baked yuzu cheesecake, matcha crumble, candied kumquat',fr:'Cheesecake au yuzu cuit, crumble matcha, kumquat confit',es:'Cheesecake de yuzu horneado, crumble de matcha, kumquat confitado'},price:12,allergens:['milk','eggs','gluten'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800'},
{id:'dessert-02',category:'desserts',displayOrder:2,name:{en:'Black Sesame Mochi',fr:'Mochi au Sésame Noir',es:'Mochi de Sésamo Negro'},description:{en:'Black sesame mochi, coconut ice cream, sesame tuile',fr:'Mochi au sésame noir, glace coco, tuile au sésame',es:'Mochi de sésamo negro, helado de coco, tuile de sésamo'},price:10,allergens:['sesame','milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'},
{id:'dessert-03',category:'desserts',displayOrder:3,name:{en:'Miso Caramel Tart',fr:'Tarte Caramel Miso',es:'Tarta de Caramelo y Miso'},description:{en:'Miso caramel tart, brown butter crust, smoked salt',fr:'Tarte au caramel miso, pâte au beurre noisette, sel fumé',es:'Tarta de caramelo con miso, base de mantequilla dorada, sal ahumada'},price:11,allergens:['gluten','milk','eggs','soy'],dietaryTags:['vegetarian'],available:false,featured:false,imageUrl:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800'},
{id:'dessert-04',category:'desserts',displayOrder:4,name:{en:'Pisco Poached Pear',fr:'Poire Pochée au Pisco',es:'Pera Escalfada en Pisco'},description:{en:'Pisco-poached pear, cinnamon anglaise, toasted walnut',fr:'Poire pochée au pisco, crème anglaise à la cannelle, noix grillées',es:'Pera escalfada en pisco, crema inglesa de canela, nueces tostadas'},price:11,allergens:['milk','eggs','treenuts'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=800'},
{id:'cocktail-01',category:'cocktails',displayOrder:1,name:{en:'Pisco Sour Clasico',fr:'Pisco Sour Classique',es:'Pisco Sour Clásico'},description:{en:'Quebranta pisco, lime, egg white, angostura',fr:"Pisco quebranta, citron vert, blanc d'œuf, angostura",es:'Pisco quebranta, lima, clara de huevo, angostura'},price:15,allergens:['eggs'],dietaryTags:['gluten-free'],available:true,featured:true,imageUrl:'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800'},
{id:'cocktail-02',category:'cocktails',displayOrder:2,name:{en:'Yuzu Highball',fr:'Highball au Yuzu',es:'Highball de Yuzu'},description:{en:'Japanese whisky, yuzu, soda, shiso leaf',fr:'Whisky japonais, yuzu, soda, feuille de shiso',es:'Whisky japonés, yuzu, soda, hoja de shiso'},price:16,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800'},
{id:'cocktail-03',category:'cocktails',displayOrder:3,name:{en:'Aji Amarillo Margarita',fr:'Margarita Aji Amarillo',es:'Margarita de Aji Amarillo'},description:{en:'Tequila reposado, aji amarillo, lime, agave, tajin rim',fr:'Tequila reposado, aji amarillo, citron vert, agave, bord au tajin',es:'Tequila reposado, aji amarillo, lima, agave, borde de tajín'},price:16,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800'},
{id:'cocktail-04',category:'cocktails',displayOrder:4,name:{en:'Smoked Old Fashioned',fr:'Old Fashioned Fumé',es:'Old Fashioned Ahumado'},description:{en:'Bourbon, binchotan smoke, demerara, orange oil',fr:"Bourbon, fumée de binchotan, sucre demerara, huile d'orange",es:'Bourbon, humo de binchotan, azúcar demerara, aceite de naranja'},price:17,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800'},
{id:'wine-01',category:'wines',displayOrder:1,name:{en:'Albarino Rias Baixas',fr:'Albariño Rias Baixas',es:'Albariño Rías Baixas'},description:{en:'Crisp, saline white — citrus and stone fruit',fr:'Blanc vif et salin — agrumes et fruits à noyau',es:'Blanco fresco y salino — cítricos y fruta de hueso'},price:14,allergens:['sulphites'],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800'},
{id:'wine-02',category:'wines',displayOrder:2,name:{en:'Junmai Ginjo Sake',fr:'Saké Junmai Ginjo',es:'Sake Junmai Ginjo'},description:{en:'Delicate, floral sake — pairs with raw preparations',fr:"Saké délicat et floral — s'accorde avec les préparations crues",es:'Sake delicado y floral — combina con preparaciones crudas'},price:18,allergens:['sulphites'],dietaryTags:['vegan'],available:true,featured:true,imageUrl:'https://images.unsplash.com/photo-1626897105619-1ee73f6c9be9?w=800'},
{id:'wine-03',category:'wines',displayOrder:3,name:{en:'Malbec Reserva',fr:'Malbec Reserva',es:'Malbec Reserva'},description:{en:'Full-bodied, dark fruit — pairs with robata grill',fr:"Corsé, fruits noirs — s'accorde avec le grill robata",es:'Cuerpo intenso, fruta oscura — combina con la parrilla robata'},price:15,allergens:['sulphites'],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800'},
{id:'wine-04',category:'wines',displayOrder:4,name:{en:'Txakoli',fr:'Txakoli',es:'Txakoli'},description:{en:'Light, slightly sparkling Basque white',fr:'Blanc basque léger, légèrement pétillant',es:'Blanco vasco ligero, ligeramente espumoso'},price:13,allergens:['sulphites'],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1566995541428-f2246c2b4c92?w=800'},
{id:'nonalcoholic-01',category:'nonalcoholic',displayOrder:1,name:{en:'Yuzu Soda',fr:'Soda au Yuzu',es:'Soda de Yuzu'},description:{en:'House yuzu cordial, soda, mint',fr:'Cordial maison au yuzu, soda, menthe',es:'Cordial casero de yuzu, soda, menta'},price:7,allergens:[],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=800'},
{id:'nonalcoholic-02',category:'nonalcoholic',displayOrder:2,name:{en:'Iced Hojicha Latte',fr:'Latte Glacé au Hojicha',es:'Latte Helado de Hojicha'},description:{en:'Roasted green tea, steamed milk, over ice',fr:'Thé vert torréfié, lait vapeur, sur glace',es:'Té verde tostado, leche vaporizada, con hielo'},price:7,allergens:['milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'},
{id:'nonalcoholic-03',category:'nonalcoholic',displayOrder:3,name:{en:'Shiso Limeade',fr:'Limonade au Shiso',es:'Limonada de Shiso'},description:{en:'Fresh shiso, lime, light agave',fr:'Shiso frais, citron vert, agave léger',es:'Shiso fresco, lima, agave suave'},price:6,allergens:[],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800'},
{id:'nonalcoholic-04',category:'nonalcoholic',displayOrder:4,name:{en:'Cold Brew Genmaicha',fr:'Genmaicha Infusion Froide',es:'Genmaicha en Frío'},description:{en:'Cold-steeped genmaicha, toasted rice notes',fr:'Genmaicha infusé à froid, notes de riz grillé',es:'Genmaicha infusionado en frío, notas de arroz tostado'},price:6,allergens:[],dietaryTags:['vegan'],available:true,featured:false,imageUrl:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800'}
];

// RAW_DISHES is the live data set the rest of the app reads from.
// It starts as the fallback data and is replaced in-place once the CSV loads successfully.
let RAW_DISHES = FALLBACK_DISHES;

/* ============ CSV LOADING & PARSING ============ */

// Minimal CSV parser that supports quoted fields, escaped quotes (""), and commas/newlines inside quotes.
// Avoids relying on a naive split(',') which would break on any quoted field containing a comma.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { field += char; }
    } else {
      if (char === '"') { inQuotes = true; }
      else if (char === ',') { row.push(field); field = ''; }
      else if (char === '\n' || char === '\r') {
        if (char === '\r' && next === '\n') i++; // handle \r\n
        row.push(field); field = '';
        if (row.length > 1 || row[0] !== '') rows.push(row); // skip fully blank lines
        row = [];
      } else { field += char; }
    }
  }
  // push the final field/row if the file doesn't end with a newline
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = (r[idx] !== undefined ? r[idx] : '').trim(); });
    return obj;
  });
}

// Converts a single flat CSV row object into the nested dish shape the app expects
// (matching the same structure as FALLBACK_DISHES above).
function normalizeCsvRow(row) {
  const toBool = (val) => String(val).trim().toUpperCase() === 'TRUE';
  const toList = (val) => String(val || '')
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return {
    id: row.id,
    category: row.category,
    displayOrder: Number(row.displayOrder) || 0,
    name: {
      en: row.name_en || '',
      fr: row.name_fr || row.name_en || '',
      es: row.name_es || row.name_en || '',
    },
    description: {
      en: row.desc_en || '',
      fr: row.desc_fr || row.desc_en || '',
      es: row.desc_es || row.desc_en || '',
    },
    price: Number(row.price) || 0,
    allergens: toList(row.allergens),
    dietaryTags: toList(row.dietaryTags),
    available: toBool(row.available),
    featured: toBool(row.featured),
    imageUrl: row.imageUrl || '',
  };
}

// Fetches the published Google Sheet CSV, parses it, and normalizes it into dish objects.
// On any failure (network error, empty/malformed response, etc.) it throws, and the caller
// falls back to the hardcoded FALLBACK_DISHES so the site never breaks.
async function loadDishesFromCsv() {
  const response = await fetch(CSV_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('CSV fetch failed with status ' + response.status);

  const text = await response.text();
  const rows = parseCSV(text);
  if (!rows.length) throw new Error('CSV returned no rows');

  const dishes = rows
    .filter(r => r.id) // ignore any blank/trailing rows without an id
    .map(normalizeCsvRow);

  if (!dishes.length) throw new Error('CSV parsed but produced no valid dishes');
  return dishes;
}

/* ============ STATE ============ */
let state = {
  language: restaurantConfig.defaultLanguage,
  query: '',
  excludedAllergens: new Set(),
  activeCategory: restaurantConfig.categories[0].id,
  cart: [], // { dishId, quantity, notes }
  selectedDishId: null,
};

const CART_KEY = 'koji-menu-cart-v1';
try {
  const raw = localStorage.getItem(CART_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) state.cart = parsed;
  }
} catch (e) {}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) {}
}

function getDish(id) { return RAW_DISHES.find(d => d.id === id); }

/* ============ RENDER: HEADER / LANG ============ */
function renderLangSwitch() {
  const el = document.getElementById('langSwitch');
  el.innerHTML = restaurantConfig.languages.map(l =>
    `<button data-lang="${l.code}" class="${l.code === state.language ? 'active' : ''}">${l.code.toUpperCase()}</button>`
  ).join('');
  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.language = btn.dataset.lang;
      renderAll();
    });
  });
  document.getElementById('tagline').textContent = restaurantConfig.tagline[state.language];
}

/* ============ RENDER: CATEGORY NAV ============ */
function renderCategoryNav() {
  const el = document.getElementById('categoryNav');
  el.innerHTML = restaurantConfig.categories.map(c =>
    `<button data-cat="${c.id}" class="${c.id === state.activeCategory ? 'active' : ''}">${c.label[state.language]}</button>`
  ).join('');
  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.cat;
      renderCategoryNav();
      const sectionEl = document.getElementById('cat-' + btn.dataset.cat);
      if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============ RENDER: ALLERGEN PANEL ============ */
function renderAllergenChips() {
  const el = document.getElementById('allergenChips');
  el.innerHTML = restaurantConfig.allergens.map(a =>
    `<button data-allergen="${a.id}" class="allergen-chip ${state.excludedAllergens.has(a.id) ? 'excluded' : ''}">${a.label[state.language]}</button>`
  ).join('');
  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.allergen;
      if (state.excludedAllergens.has(id)) state.excludedAllergens.delete(id);
      else state.excludedAllergens.add(id);
      renderAllergenChips();
      updateAllergenBadge();
      renderMenu();
    });
  });
}

function updateAllergenBadge() {
  const badge = document.getElementById('allergenBadge');
  const n = state.excludedAllergens.size;
  badge.style.display = n > 0 ? 'flex' : 'none';
  badge.textContent = n;
}

document.getElementById('allergenToggle').addEventListener('click', () => {
  document.getElementById('allergenPanel').classList.toggle('open');
});
document.getElementById('clearAllergens').addEventListener('click', () => {
  state.excludedAllergens.clear();
  renderAllergenChips();
  updateAllergenBadge();
  renderMenu();
});
document.getElementById('searchInput').addEventListener('input', (e) => {
  state.query = e.target.value;
  renderMenu();
});

/* ============ FILTER LOGIC ============ */
function getFilteredDishes() {
  let dishes = RAW_DISHES;
  if (state.excludedAllergens.size > 0) {
    dishes = dishes.filter(d => !d.allergens.some(a => state.excludedAllergens.has(a)));
  }
  if (state.query.trim()) {
    const q = state.query.trim().toLowerCase();
    dishes = dishes.filter(d => {
      const name = (d.name[state.language] || d.name.en).toLowerCase();
      const desc = (d.description[state.language] || d.description.en).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }
  return dishes;
}

function getCategorized(dishes) {
  return restaurantConfig.categories
    .map(cat => ({
      ...cat,
      dishes: dishes.filter(d => d.category === cat.id).sort((a, b) => a.displayOrder - b.displayOrder),
    }))
    .filter(cat => cat.dishes.length > 0);
}

/* ============ RENDER: MENU ============ */
function renderMenu() {
  const main = document.getElementById('menuMain');
  const filtered = getFilteredDishes();
  const categorized = getCategorized(filtered);

  if (categorized.length === 0) {
    main.innerHTML = `<div class="empty-state"><h3>No dishes found</h3><p>Try a different search or allergen filter.</p></div>`;
    return;
  }

  main.innerHTML = categorized.map(cat => `
    <section class="category-section" id="cat-${cat.id}">
      <h2>${cat.label[state.language]}</h2>
      ${cat.dishes.map(d => renderDishCard(d)).join('')}
    </section>
  `).join('');

  main.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.quick-add')) return;
      state.selectedDishId = card.dataset.id;
      openDishModal();
    });
  });
  main.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });
}

function renderDishCard(d) {
  const name = d.name[state.language] || d.name.en;
  const desc = d.description[state.language] || d.description.en;
  const priceText = d.price !== null ? `$${d.price.toFixed(2)}` : '';
  const tags = [];
  if (d.featured) tags.push(`<span class="tag featured">${restaurantConfig.ui.featured[state.language]}</span>`);
  if (!d.available) tags.push(`<span class="tag unavailable">${restaurantConfig.ui.unavailable[state.language]}</span>`);
  return `
    <div class="dish-card ${!d.available ? 'unavailable' : ''}" data-id="${d.id}">
      <div class="dish-thumb"><img src="${d.imageUrl}" alt="" loading="lazy" onerror="this.style.display='none'"></div>
      <div class="dish-info">
        <div class="row-top">
          <p class="dish-name">${name}</p>
          <span class="dish-price">${priceText}</span>
        </div>
        <p class="dish-desc">${desc}</p>
        ${tags.length ? `<div class="dish-tags">${tags.join('')}</div>` : ''}
      </div>
      ${d.available ? `<button class="quick-add" data-id="${d.id}" aria-label="Add to order">+</button>` : ''}
    </div>
  `;
}

/* ============ DISH MODAL ============ */
function openDishModal() {
  const d = getDish(state.selectedDishId);
  if (!d) return;
  const name = d.name[state.language] || d.name.en;
  const desc = d.description[state.language] || d.description.en;
  const priceText = d.price !== null ? `$${d.price.toFixed(2)}` : '';

  const modal = document.getElementById('dishModal');
  modal.innerHTML = `
    <button class="dish-modal-close" id="closeDishModal">✕</button>
    ${d.imageUrl ? `<img class="dish-modal-img" src="${d.imageUrl}" alt="" onerror="this.style.display='none'">` : ''}
    <div class="dish-modal-body">
      <div class="dish-modal-header">
        <h2>${name}</h2>
        <span class="price">${priceText}</span>
      </div>
      <p class="desc">${desc}</p>
      ${d.allergens.length ? `<div class="allergen-list">${d.allergens.map(a => {
        const found = restaurantConfig.allergens.find(x => x.id === a);
        return `<span class="allergen-pill">${found ? found.label[state.language] : a}</span>`;
      }).join('')}</div>` : ''}
      <button class="add-order-btn" id="modalAddBtn" ${!d.available ? 'disabled' : ''}>
        ${d.available ? restaurantConfig.ui.addToOrder[state.language] : restaurantConfig.ui.unavailable[state.language]}
      </button>
    </div>
  `;
  document.getElementById('closeDishModal').addEventListener('click', closeDishModal);
  if (d.available) {
    document.getElementById('modalAddBtn').addEventListener('click', () => {
      addToCart(d.id);
      closeDishModal();
    });
  }
  document.getElementById('dishModalBackdrop').classList.add('open');
}
function closeDishModal() {
  document.getElementById('dishModalBackdrop').classList.remove('open');
  state.selectedDishId = null;
}
document.getElementById('dishModalBackdrop').addEventListener('click', (e) => {
  if (e.target.id === 'dishModalBackdrop') closeDishModal();
});

/* ============ CART LOGIC ============ */
function addToCart(dishId) {
  const existing = state.cart.find(i => i.dishId === dishId);
  if (existing) existing.quantity += 1;
  else state.cart.push({ dishId, quantity: 1, notes: '' });
  saveCart();
  renderCartUI();
}
function setQuantity(dishId, qty) {
  if (qty <= 0) {
    state.cart = state.cart.filter(i => i.dishId !== dishId);
  } else {
    const item = state.cart.find(i => i.dishId === dishId);
    if (item) item.quantity = qty;
  }
  saveCart();
  renderCartUI();
  renderCartDrawer();
}
function setNotes(dishId, notes) {
  const item = state.cart.find(i => i.dishId === dishId);
  if (item) item.notes = notes;
  saveCart();
}
function removeItem(dishId) {
  state.cart = state.cart.filter(i => i.dishId !== dishId);
  saveCart();
  renderCartUI();
  renderCartDrawer();
}

function getOrderSummary() {
  const lines = state.cart.map(item => {
    const dish = getDish(item.dishId);
    if (!dish) return null;
    const name = dish.name[state.language] || dish.name.en;
    const lineTotal = (dish.price || 0) * item.quantity;
    return { dish, name, quantity: item.quantity, notes: item.notes, lineTotal };
  }).filter(Boolean);
  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  return { lines, total, itemCount };
}

function renderCartUI() {
  const { total, itemCount } = getOrderSummary();
  const btn = document.getElementById('cartBtn');
  btn.classList.toggle('visible', itemCount > 0);
  document.getElementById('cartCount').textContent = itemCount;
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

function renderCartDrawer() {
  const { lines, total } = getOrderSummary();
  const list = document.getElementById('cartItemsList');
  if (lines.length === 0) {
    list.innerHTML = `<div class="cart-empty">Your order is empty.</div>`;
  } else {
    list.innerHTML = lines.map(l => `
      <div class="cart-item" data-id="${l.dish.id}">
        <div class="cart-item-info">
          <p class="cart-item-name">${l.name}</p>
          <p class="cart-item-price">$${l.dish.price.toFixed(2)} each</p>
          <div class="qty-control">
            <button class="qty-minus" data-id="${l.dish.id}">−</button>
            <span>${l.quantity}</span>
            <button class="qty-plus" data-id="${l.dish.id}">+</button>
          </div>
          <textarea class="cart-item-notes" data-id="${l.dish.id}" placeholder="Add a note (optional)" rows="1">${l.notes || ''}</textarea>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', () => {
      const item = state.cart.find(i => i.dishId === b.dataset.id);
      setQuantity(b.dataset.id, (item?.quantity || 0) + 1);
    }));
    list.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', () => {
      const item = state.cart.find(i => i.dishId === b.dataset.id);
      setQuantity(b.dataset.id, (item?.quantity || 0) - 1);
    }));
    list.querySelectorAll('.cart-item-notes').forEach(t => t.addEventListener('input', () => {
      setNotes(t.dataset.id, t.value);
    }));
  }

  document.getElementById('cartFooterTotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('whatsappBtn').href = buildWhatsAppOrderUrl(lines, total);
}

function buildWhatsAppOrderUrl(lines, total) {
  const header = `${restaurantConfig.name} — New Order\n${restaurantConfig.locationName}\n`;
  const body = lines.map(line => {
    const priceText = line.dish.price !== null ? `$${line.lineTotal.toFixed(2)}` : '';
    const noteText = line.notes?.trim() ? `\n   Note: ${line.notes.trim()}` : '';
    return `${line.quantity}x ${line.name} — ${priceText}${noteText}`;
  }).join('\n');
  const footer = `\n\nTotal: $${total.toFixed(2)}`;
  const message = `${header}\n${body}${footer}`;
  return `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.getElementById('cartBtn').addEventListener('click', () => {
  renderCartDrawer();
  document.getElementById('cartDrawer').style.display = 'flex';
  document.getElementById('cartBackdrop').classList.add('open');
});
document.getElementById('closeCart').addEventListener('click', closeCartDrawer);
document.getElementById('cartBackdrop').addEventListener('click', closeCartDrawer);
function closeCartDrawer() {
  document.getElementById('cartDrawer').style.display = 'none';
  document.getElementById('cartBackdrop').classList.remove('open');
}

/* ============ INIT ============ */
function renderAll() {
  renderLangSwitch();
  renderCategoryNav();
  renderAllergenChips();
  updateAllergenBadge();
  renderMenu();
  renderCartUI();
  document.getElementById('searchInput').placeholder = restaurantConfig.ui.search[state.language];
  document.getElementById('allergenToggle').firstChild.textContent = restaurantConfig.ui.filterAllergens[state.language] + ' ';
}

// Attempts to load fresh menu data from the published Google Sheet before the first render.
// If the fetch/parse fails for any reason (offline, sheet unpublished, bad format, etc.),
// we log the issue and silently continue with FALLBACK_DISHES so the page still works normally.
async function init() {
  try {
    const csvDishes = await loadDishesFromCsv();
    RAW_DISHES = csvDishes;
  } catch (err) {
    console.warn('Could not load menu from Google Sheets CSV, using fallback data instead:', err);
    RAW_DISHES = FALLBACK_DISHES;
  }
  renderAll();
}

init();
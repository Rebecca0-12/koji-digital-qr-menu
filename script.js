============ CONFIG ============ */
const restaurantConfig = {
  name: 'MARA',
  tagline: {
    en: 'Modern plates. Bold flavours.',
    fr: 'Assiettes modernes. Saveurs audacieuses.',
    es: 'Platos modernos. Sabores audaces.',
  },
  whatsappNumber: '15551234567',
  locationName: 'MARA — Main Dining Room',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
  ],
  defaultLanguage: 'en',
  categories: [
    { id: 'starters', label: { en: 'Starters', fr: 'Entrées', es: 'Entrantes' } },
    { id: 'mains', label: { en: 'Main Courses', fr: 'Plats Principaux', es: 'Platos Principales' } },
    { id: 'burgers', label: { en: 'Burgers', fr: 'Burgers', es: 'Hamburguesas' } },
    { id: 'pasta', label: { en: 'Pasta', fr: 'Pâtes', es: 'Pasta' } },
    { id: 'sides', label: { en: 'Sides', fr: 'Accompagnements', es: 'Acompañamientos' } },
    { id: 'desserts', label: { en: 'Desserts', fr: 'Desserts', es: 'Postres' } },
    { id: 'drinks', label: { en: 'Drinks', fr: 'Boissons', es: 'Bebidas' } },
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
{id:'starter-01',category:'starters',displayOrder:1,name:{en:'Chicken Suya Skewers',fr:'Brochettes de poulet suya',es:'Brochetas de pollo suya'},description:{en:'Chargrilled chicken skewers coated in a smoky suya spice blend, served with onions and a light pepper sauce.',fr:'Brochettes de poulet grillées au charbon, enrobées d’un mélange d’épices suya fumées, servies avec des oignons et une sauce légèrement pimentée.',es:'Brochetas de pollo a la parrilla con una mezcla de especias suya ahumadas, servidas con cebolla y una salsa de pimienta suave.'},price:8500,allergens:['peanuts','sesame'],dietaryTags:['gluten-free'],available:true,featured:true,imageUrl:''},
{id:'starter-02',category:'starters',displayOrder:2,name:{en:'Garlic Prawns',fr:'Gambas à l’ail',es:'Gambas al ajillo'},description:{en:'Juicy prawns sautéed with garlic, butter, parsley and a touch of lemon.',fr:'Gambas sautées avec de l’ail, du beurre, du persil et une touche de citron.',es:'Gambas salteadas con ajo, mantequilla, perejil y un toque de limón.'},price:9500,allergens:['shellfish','milk'],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:''},
{id:'starter-03',category:'starters',displayOrder:3,name:{en:'Crispy Chicken Wings',fr:'Ailes de poulet croustillantes',es:'Alitas de pollo crujientes'},description:{en:'Crispy chicken wings tossed in a house pepper glaze.',fr:'Ailes de poulet croustillantes nappées d’une sauce maison légèrement pimentée.',es:'Alitas de pollo crujientes bañadas en una salsa casera ligeramente picante.'},price:8000,allergens:['gluten'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'starter-04',category:'starters',displayOrder:4,name:{en:'Loaded Nachos',fr:'Nachos garnis',es:'Nachos con toppings'},description:{en:'Crispy tortilla chips topped with melted cheese, salsa, jalapeños and seasoned chicken.',fr:'Chips de tortilla croustillantes garnies de fromage fondu, de salsa, de jalapeños et de poulet assaisonné.',es:'Totopos crujientes con queso fundido, salsa, jalapeños y pollo sazonado.'},price:7500,allergens:['milk'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'starter-05',category:'starters',displayOrder:5,name:{en:'Pepper Soup',fr:'Soupe épicée au poivre',es:'Sopa picante de pimienta'},description:{en:'A fragrant Nigerian-style pepper soup with tender chicken, herbs and warming spices.',fr:'Soupe parfumée inspirée de la cuisine nigériane, avec du poulet tendre, des herbes et des épices chaleureuses.',es:'Sopa aromática inspirada en la cocina nigeriana, con pollo tierno, hierbas y especias cálidas.'},price:7000,allergens:[],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:''},
{id:'main-01',category:'mains',displayOrder:1,name:{en:'Grilled Chicken & Jollof Rice',fr:'Poulet grillé & riz jollof',es:'Pollo a la parrilla & arroz jollof'},description:{en:'Herb-marinated grilled chicken served with fragrant tomato jollof rice and a fresh side salad.',fr:'Poulet grillé mariné aux herbes, servi avec un riz jollof parfumé à la tomate et une salade fraîche.',es:'Pollo a la parrilla marinado con hierbas, servido con arroz jollof de tomate y una ensalada fresca.'},price:14500,allergens:[],dietaryTags:['gluten-free'],available:true,featured:true,imageUrl:''},
{id:'main-02',category:'mains',displayOrder:2,name:{en:'Creamy Tuscan Chicken',fr:'Poulet crémeux à la toscane',es:'Pollo cremoso a la toscana'},description:{en:'Pan-seared chicken in a creamy garlic sauce with sun-dried tomatoes, spinach and herbs.',fr:'Poulet poêlé dans une sauce crémeuse à l’ail avec tomates séchées, épinards et herbes.',es:'Pollo dorado en sartén con salsa cremosa de ajo, tomates secos, espinacas y hierbas.'},price:15500,allergens:['milk'],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:''},
{id:'main-03',category:'mains',displayOrder:3,name:{en:'Grilled Salmon',fr:'Saumon grillé',es:'Salmón a la parrilla'},description:{en:'Grilled salmon fillet served with lemon herb potatoes and seasonal vegetables.',fr:'Filet de saumon grillé servi avec des pommes de terre aux herbes et des légumes de saison.',es:'Filete de salmón a la parrilla servido con patatas al limón y hierbas y verduras de temporada.'},price:18500,allergens:['fish'],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:''},
{id:'main-04',category:'mains',displayOrder:4,name:{en:'Beef Steak & Pepper Sauce',fr:'Steak de bœuf & sauce au poivre',es:'Filete de ternera & salsa de pimienta'},description:{en:'Grilled beef steak served with creamy pepper sauce, fries and seasonal greens.',fr:'Steak de bœuf grillé servi avec une sauce crémeuse au poivre, des frites et des légumes verts de saison.',es:'Filete de ternera a la parrilla con salsa cremosa de pimienta, patatas fritas y verduras de temporada.'},price:21000,allergens:['milk'],dietaryTags:['gluten-free'],available:true,featured:false,imageUrl:''},
{id:'main-05',category:'mains',displayOrder:5,name:{en:'Vegetable Stir-Fry',fr:'Légumes sautés',es:'Verduras salteadas'},description:{en:'Crisp seasonal vegetables wok-tossed with ginger, garlic and a light soy glaze.',fr:'Légumes de saison croquants sautés au wok avec gingembre, ail et une légère sauce au soja.',es:'Verduras de temporada salteadas al wok con jengibre, ajo y una ligera salsa de soja.'},price:10500,allergens:['soy'],dietaryTags:['vegan'],available:true,featured:false,imageUrl:''},
{id:'burger-01',category:'burgers',displayOrder:1,name:{en:'Classic Beef Burger',fr:'Burger classique au bœuf',es:'Hamburguesa clásica de ternera'},description:{en:'Juicy beef patty with lettuce, tomato, onion and house sauce in a toasted brioche bun.',fr:'Steak haché de bœuf juteux avec laitue, tomate, oignon et sauce maison dans un pain brioché toasté.',es:'Hamburguesa de ternera jugosa con lechuga, tomate, cebolla y salsa de la casa en pan brioche tostado.'},price:12500,allergens:['gluten','eggs','milk'],dietaryTags:[],available:true,featured:true,imageUrl:''},
{id:'burger-02',category:'burgers',displayOrder:2,name:{en:'Crispy Chicken Burger',fr:'Burger au poulet croustillant',es:'Hamburguesa de pollo crujiente'},description:{en:'Crispy chicken fillet with lettuce, pickles and creamy house sauce.',fr:'Filet de poulet croustillant avec laitue, cornichons et sauce maison crémeuse.',es:'Filete de pollo crujiente con lechuga, pepinillos y salsa cremosa de la casa.'},price:12000,allergens:['gluten','eggs','milk'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'burger-03',category:'burgers',displayOrder:3,name:{en:'BBQ Chicken Burger',fr:'Burger au poulet BBQ',es:'Hamburguesa de pollo BBQ'},description:{en:'Grilled chicken, smoked BBQ sauce, caramelised onions and melted cheese.',fr:'Poulet grillé, sauce BBQ fumée, oignons caramélisés et fromage fondu.',es:'Pollo a la parrilla, salsa BBQ ahumada, cebolla caramelizada y queso fundido.'},price:13000,allergens:['gluten','milk'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'burger-04',category:'burgers',displayOrder:4,name:{en:'Grilled Chicken Sandwich',fr:'Sandwich au poulet grillé',es:'Sándwich de pollo a la parrilla'},description:{en:'Grilled chicken breast with avocado, lettuce, tomato and lemon herb dressing.',fr:'Blanc de poulet grillé avec avocat, laitue, tomate et sauce citronnée aux herbes.',es:'Pechuga de pollo a la parrilla con aguacate, lechuga, tomate y aderezo de limón y hierbas.'},price:12000,allergens:['gluten'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'burger-05',category:'burgers',displayOrder:5,name:{en:'Suya Steak Sandwich',fr:'Sandwich au steak suya',es:'Sándwich de steak suya'},description:{en:'Sliced grilled beef coated in suya spice with onions, peppers and a creamy pepper sauce.',fr:'Fines tranches de bœuf grillé enrobées d’épices suya, avec oignons, poivrons et sauce crémeuse au poivre.',es:'Tiras de ternera a la parrilla con especias suya, cebolla, pimientos y salsa cremosa de pimienta.'},price:13500,allergens:['gluten','milk','peanuts','sesame'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'pasta-01',category:'pasta',displayOrder:1,name:{en:'Chicken Alfredo',fr:'Poulet Alfredo',es:'Pollo Alfredo'},description:{en:'Fettuccine tossed in a creamy parmesan sauce with grilled chicken and herbs.',fr:'Fettuccine mélangées à une sauce crémeuse au parmesan, avec poulet grillé et herbes.',es:'Fettuccine con salsa cremosa de parmesano, pollo a la parrilla y hierbas.'},price:13000,allergens:['gluten','milk'],dietaryTags:[],available:true,featured:true,imageUrl:''},
{id:'pasta-02',category:'pasta',displayOrder:2,name:{en:'Spicy Chicken Penne',fr:'Penne épicées au poulet',es:'Penne picantes con pollo'},description:{en:'Penne pasta with grilled chicken, tomato, peppers, herbs and a gentle chilli kick.',fr:'Penne avec poulet grillé, tomate, poivrons, herbes et une légère touche de piment.',es:'Penne con pollo a la parrilla, tomate, pimientos, hierbas y un toque suave de chile.'},price:12500,allergens:['gluten'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'pasta-03',category:'pasta',displayOrder:3,name:{en:'Creamy Garlic Prawn Pasta',fr:'Pâtes crémeuses aux gambas et à l’ail',es:'Pasta cremosa con gambas al ajillo'},description:{en:'Creamy linguine with prawns, roasted garlic, parmesan and fresh parsley.',fr:'Linguine crémeuses aux gambas, à l’ail rôti, au parmesan et au persil frais.',es:'Linguine cremosa con gambas, ajo asado, parmesano y perejil fresco.'},price:15500,allergens:['gluten','milk','shellfish'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'pasta-04',category:'pasta',displayOrder:4,name:{en:'Beef Bolognese',fr:'Bolognaise au bœuf',es:'Boloñesa de ternera'},description:{en:'Slow-simmered beef and tomato ragù served with spaghetti and parmesan.',fr:'Ragoût de bœuf et de tomate mijoté lentement, servi avec des spaghetti et du parmesan.',es:'Ragú de ternera y tomate cocinado a fuego lento, servido con espaguetis y parmesano.'},price:13500,allergens:['gluten','milk'],dietaryTags:[],available:true,featured:false,imageUrl:''},
{id:'pasta-05',category:'pasta',displayOrder:5,name:{en:'Tomato & Basil Pasta',fr:'Pâtes à la tomate et au basilic',es:'Pasta con tomate y albahaca'},description:{en:'Pasta tossed with slow-cooked tomato sauce, fresh basil and parmesan.',fr:'Pâtes accompagnées d’une sauce tomate mijotée, de basilic frais et de parmesan.',es:'Pasta con salsa de tomate cocinada a fuego lento, albahaca fresca y parmesano.'},price:10500,allergens:['gluten','milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'side-01',category:'sides',displayOrder:1,name:{en:'French Fries',fr:'Frites',es:'Patatas fritas'},description:{en:'Crispy golden fries seasoned with sea salt.',fr:'Frites dorées et croustillantes assaisonnées au sel marin.',es:'Patatas fritas doradas y crujientes sazonadas con sal marina.'},price:4500,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'side-02',category:'sides',displayOrder:2,name:{en:'Sweet Potato Fries',fr:'Frites de patate douce',es:'Boniatos fritos'},description:{en:'Crispy sweet potato fries served with a house dipping sauce.',fr:'Frites de patate douce croustillantes servies avec une sauce maison.',es:'Boniatos fritos crujientes servidos con una salsa de la casa.'},price:5000,allergens:['eggs'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'side-03',category:'sides',displayOrder:3,name:{en:'Fried Plantain',fr:'Bananes plantain frites',es:'Plátano macho frito'},description:{en:'Golden slices of ripe plantain, lightly fried until caramelised.',fr:'Tranches de plantain mûr dorées et légèrement frites jusqu’à caramélisation.',es:'Rodajas de plátano macho maduro fritas ligeramente hasta caramelizar.'},price:4000,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:true,imageUrl:''},
{id:'side-04',category:'sides',displayOrder:4,name:{en:'Garlic Bread',fr:'Pain à l’ail',es:'Pan de ajo'},description:{en:'Toasted bread brushed with garlic butter and fresh herbs.',fr:'Pain toasté au beurre à l’ail et aux herbes fraîches.',es:'Pan tostado con mantequilla de ajo y hierbas frescas.'},price:4000,allergens:['gluten','milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'side-05',category:'sides',displayOrder:5,name:{en:'Coleslaw',fr:'Salade de chou',es:'Ensalada de col'},description:{en:'Fresh cabbage, carrot and herbs tossed in a light creamy dressing.',fr:'Chou frais, carotte et herbes mélangés à une sauce crémeuse légère.',es:'Col, zanahoria y hierbas frescas con un aderezo cremoso ligero.'},price:3500,allergens:['eggs'],dietaryTags:['vegetarian','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'dessert-01',category:'desserts',displayOrder:1,name:{en:'Chocolate Brownie',fr:'Brownie au chocolat',es:'Brownie de chocolate'},description:{en:'Warm chocolate brownie served with a scoop of vanilla ice cream.',fr:'Brownie au chocolat chaud servi avec une boule de glace à la vanille.',es:'Brownie de chocolate caliente servido con una bola de helado de vainilla.'},price:6500,allergens:['gluten','eggs','milk'],dietaryTags:['vegetarian'],available:true,featured:true,imageUrl:''},
{id:'dessert-02',category:'desserts',displayOrder:2,name:{en:'New York Cheesecake',fr:'Cheesecake new-yorkais',es:'Tarta de queso al estilo neoyorquino'},description:{en:'Creamy baked cheesecake with a buttery biscuit base and berry sauce.',fr:'Cheesecake cuit et crémeux avec une base biscuitée au beurre et une sauce aux fruits rouges.',es:'Tarta de queso horneada y cremosa con base de galleta y mantequilla y salsa de frutos rojos.'},price:7000,allergens:['gluten','milk','eggs'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'dessert-03',category:'desserts',displayOrder:3,name:{en:'Classic Tiramisu',fr:'Tiramisu classique',es:'Tiramisú clásico'},description:{en:'Espresso-soaked sponge layered with mascarpone cream and cocoa.',fr:'Biscuit imbibé d’espresso, crème de mascarpone et cacao.',es:'Bizcocho empapado en espresso con crema de mascarpone y cacao.'},price:7000,allergens:['gluten','milk','eggs'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'dessert-04',category:'desserts',displayOrder:4,name:{en:'Vanilla Ice Cream',fr:'Glace à la vanille',es:'Helado de vainilla'},description:{en:'Smooth vanilla ice cream with a rich, creamy finish.',fr:'Glace onctueuse à la vanille, riche et crémeuse.',es:'Helado de vainilla suave, rico y cremoso.'},price:5000,allergens:['milk'],dietaryTags:['vegetarian','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'dessert-05',category:'desserts',displayOrder:5,name:{en:'Chocolate Lava Cake',fr:'Moelleux au chocolat',es:'Coulant de chocolate'},description:{en:'Warm chocolate cake with a molten centre, served with vanilla ice cream.',fr:'Gâteau au chocolat chaud au cœur coulant, servi avec une glace à la vanille.',es:'Pastel de chocolate caliente con centro fundido, servido con helado de vainilla.'},price:7500,allergens:['gluten','eggs','milk'],dietaryTags:['vegetarian'],available:true,featured:false,imageUrl:''},
{id:'drink-01',category:'drinks',displayOrder:1,name:{en:'Fresh Lemonade',fr:'Limonade fraîche',es:'Limonada fresca'},description:{en:'Freshly squeezed lemon juice balanced with water and a touch of sweetness.',fr:'Jus de citron fraîchement pressé, équilibré avec de l’eau et une touche de douceur.',es:'Zumo de limón recién exprimido, equilibrado con agua y un toque de dulzor.'},price:3500,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'drink-02',category:'drinks',displayOrder:2,name:{en:'Strawberry Lemonade',fr:'Limonade à la fraise',es:'Limonada de fresa'},description:{en:'Fresh lemonade blended with ripe strawberries and served chilled.',fr:'Limonade fraîche mélangée à des fraises mûres, servie bien fraîche.',es:'Limonada fresca mezclada con fresas maduras, servida bien fría.'},price:4500,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:true,imageUrl:''},
{id:'drink-03',category:'drinks',displayOrder:3,name:{en:'Iced Tea',fr:'Thé glacé',es:'Té helado'},description:{en:'Chilled black tea with lemon and a light touch of sweetness.',fr:'Thé noir glacé au citron avec une légère touche de douceur.',es:'Té negro frío con limón y un toque ligero de dulzor.'},price:3000,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'drink-04',category:'drinks',displayOrder:4,name:{en:'Mango Smoothie',fr:'Smoothie à la mangue',es:'Batido de mango'},description:{en:'Creamy mango smoothie blended with fresh fruit and chilled yoghurt.',fr:'Smoothie crémeux à la mangue préparé avec des fruits frais et du yaourt frais.',es:'Batido cremoso de mango preparado con fruta fresca y yogur frío.'},price:5000,allergens:['milk'],dietaryTags:['vegetarian','gluten-free'],available:true,featured:false,imageUrl:''},
{id:'drink-05',category:'drinks',displayOrder:5,name:{en:'Chapman',fr:'Chapman',es:'Chapman'},description:{en:'A refreshing Nigerian-style cocktail-inspired soft drink with citrus, grenadine and bitters.',fr:'Boisson rafraîchissante inspirée du Chapman nigérian, aux agrumes, à la grenadine et aux bitters.',es:'Refresco inspirado en el Chapman nigeriano, con cítricos, granadina y bitters.'},price:4500,allergens:[],dietaryTags:['vegan','gluten-free'],available:true,featured:true,imageUrl:''}
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

const CART_KEY = 'mara-menu-cart-v1';
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
/* ============================================================
   MENU-DATA.JS — Pizza Planet Abbottabad — Full Menu
   ============================================================ */

export const MENU_CATEGORIES = [
  { id: 'all',         label: 'All',            emoji: '🍽️' },
  { id: 'combos',      label: 'Combo Deals',    emoji: '🎁' },
  { id: 'meals',       label: 'Meal Deals',     emoji: '🍱' },
  { id: 'starters',    label: 'Starters',       emoji: '🍗' },
  { id: 'pasta',       label: 'Pasta',          emoji: '🍝' },
  { id: 'chinese',     label: 'Chinese',        emoji: '🥡' },
  { id: 'rice',        label: 'Rice',           emoji: '🍚' },
  { id: 'pizza',       label: 'Pizza Flavours', emoji: '🍕' },
  { id: 'special',     label: 'Special Flavours',emoji: '🔥' },
  { id: 'premium',     label: 'Premium Flavours',emoji: '👑' },
  { id: 'treats',      label: 'Treat on Planet',emoji: '🎉' },
  { id: 'burgers',     label: 'Burgers & Wraps',emoji: '🍔' }
];

export const MENU_ITEMS = [

  /* ================================================================
     COMBO DEALS — Buy 1 Get 1 Free or 40% Off (Chicken Tikka only)
     Only for Members
     ================================================================ */
  {
    id: 'combo1',
    category: 'combos',
    name: 'Combo 1',
    emoji: '🎁',
    description: '1 Zinger Burger, 1 Chicken Piece, 1 Regular Fries, 1 Regular Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1199
  },
  {
    id: 'combo2',
    category: 'combos',
    name: 'Combo 2',
    emoji: '🎁',
    description: '1 Small Pizza, 1 Zinger Burger, 1 Regular Fries, 1 Regular Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1499
  },
  {
    id: 'combo3',
    category: 'combos',
    name: 'Combo 3',
    emoji: '🎁',
    description: '4 Hot Wings, 2 Chicken Pieces, 1 Regular Fries, 1 Regular Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1499
  },
  {
    id: 'combo4',
    category: 'combos',
    name: 'Combo 4',
    emoji: '🎁',
    description: '1 Small Pizza, 1 Zinger Burger, 1 Chicken Piece, 1 Grill Burger, 1 Regular Fries.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1699
  },
  {
    id: 'combo5',
    category: 'combos',
    name: 'Combo 5',
    emoji: '🎁',
    description: '1 Small Pizza, 1 Zinger Burger, 1 Regular Fries, 500ml Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1699
  },
  {
    id: 'combo6',
    category: 'combos',
    name: 'Combo 6',
    emoji: '🎁',
    description: '1 Medium Pizza, 1 Regular Fries, 1 Regular Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1999
  },
  {
    id: 'combo7',
    category: 'combos',
    name: 'Combo 7',
    emoji: '🎁',
    description: '1 Small Pizza, 1 Behari Roll, 1 Chicken Piece.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 1999
  },
  {
    id: 'combo8',
    category: 'combos',
    name: 'Combo 8',
    emoji: '🎁',
    description: '1 Medium Pizza, 1 Zinger Burger, 1500ml Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 2399
  },
  {
    id: 'combo9',
    category: 'combos',
    name: 'Combo 9',
    emoji: '🎁',
    description: '1 Large Pizza, 5 Hot Wings, 1500ml Drink.',
    tags: ['Members Only', 'BOGO/40% Off'],
    note: 'Buy 1 Get 1 Free or 40% Off (Chicken Tikka flavour only)',
    price: 3499
  },

  /* ================================================================
     MEAL DEALS — Already Discounted — No More Discount — Only for Members
     ================================================================ */
  {
    id: 'meal-a',
    category: 'meals',
    name: 'Meal A',
    emoji: '🍱',
    description: '1 Zinger Burger, 1 Regular Fries, 1 Regular Drink.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 599
  },
  {
    id: 'meal-b',
    category: 'meals',
    name: 'Meal B',
    emoji: '🍱',
    description: '1 Small Pizza, 5 Pc Hot Wings, 1 Regular Fries.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 999
  },
  {
    id: 'meal-c',
    category: 'meals',
    name: 'Meal C',
    emoji: '🍱',
    description: '5 Chicken Pcs, 1 Medium Fries, 1.5 Ltr Drink.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 1299
  },
  {
    id: 'meal-d',
    category: 'meals',
    name: 'Meal D',
    emoji: '🍱',
    description: '1 Medium Pizza, 2 Zinger Burgers, 1500ml Drink.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 1599
  },
  {
    id: 'meal-e',
    category: 'meals',
    name: 'Meal E',
    emoji: '🍱',
    description: '1 Large Pizza, 1 Medium Fries, 1.5 Ltr Drink.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 1699
  },
  {
    id: 'meal-f',
    category: 'meals',
    name: 'Meal F',
    emoji: '🍱',
    description: '5 Zinger Burgers, 1 Medium Fries, 1.5 Ltr Drink.',
    tags: ['Members Only', 'No Further Discount'],
    note: 'Already Discounted Deals — No More Discount — Only for Members',
    price: 1699
  },

  /* ================================================================
     STARTERS — No Deal
     ================================================================ */
  {
    id: 'hot-wings',
    category: 'starters',
    name: 'Hot Wings',
    emoji: '🍗',
    description: 'Crispy, spicy hot wings — choose your size.',
    tags: ['No Deal'],
    sizes: {
      small:  { label: '5 Pcs',  price: 499 },
      large:  { label: '10 Pcs', price: 999 }
    }
  },
  {
    id: 'nuggets',
    category: 'starters',
    name: 'Chicken Nuggets',
    emoji: '🍗',
    description: '12 pieces of crispy golden chicken nuggets.',
    tags: ['No Deal'],
    price: 799
  },
  {
    id: 'crispy-piece',
    category: 'starters',
    name: 'Crispy Chicken Piece',
    emoji: '🍗',
    description: 'A single crispy fried chicken piece, perfectly seasoned.',
    tags: ['No Deal'],
    price: 199
  },
  {
    id: 'stuffed-chicken',
    category: 'starters',
    name: 'Stuffed Chicken',
    emoji: '🍗',
    description: 'Juicy chicken stuffed with chef\'s special filling.',
    tags: ['No Deal'],
    price: 499
  },
  {
    id: 'fries',
    category: 'starters',
    name: 'Fries',
    emoji: '🍟',
    description: 'Crispy golden fries.',
    tags: ['No Deal'],
    sizes: {
      medium: { label: 'Medium', price: 199 },
      large:  { label: 'Large',  price: 199 }
    },
    note: 'M/L same price'
  },
  {
    id: 'loaded-fries',
    category: 'starters',
    name: 'Loaded Fries',
    emoji: '🍟',
    description: 'Fries loaded with cheese, sauce, and toppings.',
    tags: ['No Deal'],
    price: 599
  },

  /* ================================================================
     PASTA — No Deal, 2 Person Serving
     ================================================================ */
  {
    id: 'home-style-pasta',
    category: 'pasta',
    name: 'Home Style Pasta',
    emoji: '🍝',
    description: 'Penne pasta with grilled chicken tossed in creamy mushroom sauce, olives and parmesan.',
    tags: ['No Deal', '2 Person Serving'],
    price: 999
  },
  {
    id: 'alfredo-pasta',
    category: 'pasta',
    name: 'Alfredo Pasta',
    emoji: '🍝',
    description: 'Classic Italian pasta tossed in creamy alfredo sauce topped with grilled chicken and olive.',
    tags: ['No Deal', '2 Person Serving'],
    price: 999
  },
  {
    id: 'cajun-pasta',
    category: 'pasta',
    name: 'Cajun Chicken Pasta',
    emoji: '🍝',
    description: 'Spicy cajun flavoured chicken tossed in a melt-in-your-mouth creamy white sauce.',
    tags: ['No Deal', '2 Person Serving'],
    price: 999
  },
  {
    id: 'lasagne',
    category: 'pasta',
    name: 'Chicken Lasagne',
    emoji: '🍝',
    description: 'Home style chunky chicken with mushrooms, olives, sundried tomatoes and mozzarella cheese topped with basil and oregano.',
    tags: ['No Deal', '2 Person Serving'],
    price: 1199
  },

  /* ================================================================
     CHINESE — All gravies served with fried rice
     ================================================================ */
  {
    id: 'chili-dry',
    category: 'chinese',
    name: 'Chicken Chili Dry',
    emoji: '🥡',
    description: 'Chunks of chicken marinated and cooked with chili and a delicious spicy aroma.',
    tags: ['Served with Fried Rice'],
    price: 899
  },
  {
    id: 'manchurian',
    category: 'chinese',
    name: 'Chicken Manchurian',
    emoji: '🥡',
    description: 'Boneless chicken cubes prepared in sweet n spicy tomato and garlic sauce served with rice.',
    tags: ['Served with Fried Rice'],
    price: 799
  },
  {
    id: 'chowmien',
    category: 'chinese',
    name: 'Chowmien',
    emoji: '🥡',
    description: 'Traditional noodles tossed in salty exotic sauces topped with seasonal veggies and chicken. Available: Veg / Chicken / Egg.',
    tags: ['Served with Fried Rice'],
    price: 799
  },
  {
    id: 'shashlik',
    category: 'chinese',
    name: 'Chicken Shashlik',
    emoji: '🥡',
    description: 'Tender chicken shashlik with peppers and onions in a tangy sauce.',
    tags: ['Served with Fried Rice'],
    price: 799
  },

  /* ================================================================
     RICE — 2 Person Serving
     ================================================================ */
  {
    id: 'special-fried-rice',
    category: 'rice',
    name: 'Special Chicken Fried Rice',
    emoji: '🍚',
    description: 'Flavourful fried rice with tender chicken pieces.',
    tags: ['2 Person Serving'],
    price: 599
  },
  {
    id: 'arabian-rice',
    category: 'rice',
    name: 'Arabian Rice',
    emoji: '🍚',
    description: 'Aromatic Arabian-style rice.',
    tags: ['2 Person Serving'],
    price: 499
  },
  {
    id: 'veg-fried-rice',
    category: 'rice',
    name: 'Vegetable Fried Rice',
    emoji: '🍚',
    description: 'Fried rice loaded with seasonal vegetables.',
    tags: ['2 Person Serving'],
    price: 499
  },
  {
    id: 'masala-rice',
    category: 'rice',
    name: 'Masala Fried Rice',
    emoji: '🍚',
    description: 'Spicy masala fried rice bursting with flavour.',
    tags: ['2 Person Serving'],
    price: 599
  },
  {
    id: 'zeera-rice',
    category: 'rice',
    name: 'Zeera Rice',
    emoji: '🍚',
    description: 'Fragrant cumin rice — a perfect side.',
    tags: ['2 Person Serving'],
    price: 599
  },

  /* ================================================================
     PIZZA FLAVOURS — Buy 1 Get 1 Free or 40% Off — Only for Members
     Sizes: 7" Small / 11" Medium / 13" Large / 16" X-Large
     ================================================================ */
  {
    id: 'chicken-tikka',
    category: 'pizza',
    name: 'Chicken Tikka',
    emoji: '🍕',
    description: 'Spicy chicken tikka chunks topped with capsicum, mozzarella and cheddar cheese.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'fajita-sicilian',
    category: 'pizza',
    name: 'Fajita Sicilian',
    emoji: '🍕',
    description: 'A delicious blend of fajita chicken, onion, green peppers and chillies, smoke veal and lots of cheese.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'chilli-chicken',
    category: 'pizza',
    name: 'Chilli Chicken',
    emoji: '🍕',
    description: 'Fire up your taste buds with spicy chicken chunks, onion, jalapeño and hot peri peri sauce.',
    tags: ['Members Only', 'BOGO/40% Off', 'Spicy'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'behari-chicken',
    category: 'pizza',
    name: 'Behari Chicken',
    emoji: '🍕',
    description: 'Behari masala marinated chicken chunks, onion, green chillies, topped with lots of mozzarella cheese and garnished with lemon wedge.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'pepperoni-passion',
    category: 'pizza',
    name: 'Pepperoni Passion',
    emoji: '🍕',
    description: 'One of our all-time specialties; a meaty feast of double pepperoni, mozzarella cheese and tomato sauce.',
    tags: ['Members Only', 'BOGO/40% Off', 'Bestseller'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'veggie-feast',
    category: 'pizza',
    name: 'Veggie Feast',
    emoji: '🍕',
    description: 'A cocktail medley of tomatoes, onion, mushrooms, black olives, green pepper and capsicum.',
    tags: ['Members Only', 'BOGO/40% Off', 'Vegetarian'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'margarita',
    category: 'pizza',
    name: 'Margarita Pizza',
    emoji: '🍕',
    description: 'Go back to it all again with classic cheese and tomato sauce.',
    tags: ['Members Only', 'BOGO/40% Off', 'Vegetarian'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'mushroom-lover',
    category: 'pizza',
    name: 'Mushroom Lover',
    emoji: '🍕',
    description: 'An innovative mushroom delight, a mighty feast of mushroom base topped with pizza sauce, chicken, onion, green pepper, tomatoes and cheese.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'sausages-lover',
    category: 'pizza',
    name: 'Sausages Lover',
    emoji: '🍕',
    description: 'A delicious blend of beef and chicken sausages, exotic touch of chicken, onion, green pepper, green chillies and lots of cheese.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },
  {
    id: 'achari-special',
    category: 'pizza',
    name: 'Achari Special',
    emoji: '🍕',
    description: 'Chicken mixed with mix pickle, capsicum, sweet corn and sauce.',
    tags: ['Members Only', 'BOGO/40% Off'],
    sizes: {
      small:  { label: '7" Small',    price: 999 },
      medium: { label: '11" Medium',  price: 1999 },
      large:  { label: '13" Large',   price: 2899 },
      xlarge: { label: '16" X-Large', price: 3399 }
    }
  },

  /* ================================================================
     SPECIAL FLAVOURS — For Special Peoples — BOGO or 40% Off
     Sizes: 7" Small / 11" Medium / 13" Large / 16" X-Large
     ================================================================ */
  {
    id: 'afghani-pizza',
    category: 'special',
    name: 'Afghani Pizza',
    emoji: '🔥',
    description: 'Topped with Afghani tikka chunks and cheese on a special creamy pizza sauce.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'superb-cheese',
    category: 'special',
    name: 'Superb Cheese',
    emoji: '🔥',
    description: 'Combination of extra cheddar and mozzarella cheese.',
    tags: ['BOGO/40% Off', 'Special', 'Vegetarian'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'super-supreme',
    category: 'special',
    name: 'Super Supreme',
    emoji: '🔥',
    description: 'Our famous combination of marinated chicken, pepperoni, tomato, onion, capsicum, olives and special sauce.',
    tags: ['BOGO/40% Off', 'Special', 'Bestseller'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'four-square',
    category: 'special',
    name: 'Four Square',
    emoji: '🔥',
    description: 'Crazy mix of one chicken tikka, veggie feast, margarita and our special.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'malai-boti',
    category: 'special',
    name: 'Malai Boti',
    emoji: '🔥',
    description: 'Creamy pizza topped with kabab chunks and chicken tikka chunks.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'chicken-lover',
    category: 'special',
    name: 'Chicken Lover',
    emoji: '🔥',
    description: 'Lots of marinated spicy chicken chunks, green peppers, mushrooms and tasty tomato sauce.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'chicken-tandoori',
    category: 'special',
    name: 'Chicken Tandoori',
    emoji: '🔥',
    description: 'Complete with chicken roasted, turkey strips, mozzarella cheese, black olives and juicy pineapple.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'grilled-chicken',
    category: 'special',
    name: 'Grilled Chicken',
    emoji: '🔥',
    description: 'Delightful blend of roasted chicken, black olives, sweet corn, Italian sausages, cheese and capsicum.',
    tags: ['BOGO/40% Off', 'Special'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'hot-spicy-chicken',
    category: 'special',
    name: 'Hot & Spicy Chicken',
    emoji: '🔥',
    description: 'Spicy chicken, onions, green peppers, jalapeño, black olives and cheese.',
    tags: ['BOGO/40% Off', 'Special', 'Spicy'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },
  {
    id: 'planet-special',
    category: 'special',
    name: 'Planet Special Pizza',
    emoji: '🔥',
    description: 'Lots of cheddar and mozzarella cheese, special chicken, black olives, mushroom sausages, tomato, onion, capsicum and tasty Planet special sauce.',
    tags: ['BOGO/40% Off', 'Special', 'Bestseller'],
    sizes: {
      small:  { label: '7" Small',    price: 1099 },
      medium: { label: '11" Medium',  price: 2099 },
      large:  { label: '13" Large',   price: 2999 },
      xlarge: { label: '16" X-Large', price: 3499 }
    }
  },

  /* ================================================================
     PREMIUM FLAVOURS — No Deal
     Sizes: Medium / Large / X-Large
     ================================================================ */
  {
    id: 'crown-crust',
    category: 'premium',
    name: 'Crown Crust',
    emoji: '👑',
    description: 'Cheese-filled butter crust, topped with white sauce marinated chicken, Italian tomato sauce with mozzarella, olives.',
    tags: ['No Deal', 'Premium'],
    sizes: {
      medium: { label: '11" Medium',  price: 1299 },
      large:  { label: '13" Large',   price: 1899 },
      xlarge: { label: '16" X-Large', price: 2299 }
    }
  },
  {
    id: 'stuffed-crust',
    category: 'premium',
    name: 'Special Stuffed Crust',
    emoji: '👑',
    description: 'Stuff filled crust, topped with chicken, mozzarella cheese, smoky tomato sauce.',
    tags: ['No Deal', 'Premium'],
    sizes: {
      medium: { label: '11" Medium',  price: 1299 },
      large:  { label: '13" Large',   price: 1899 },
      xlarge: { label: '16" X-Large', price: 2299 }
    }
  },
  {
    id: 'behari-kabab',
    category: 'premium',
    name: 'Behari Kabab',
    emoji: '👑',
    description: 'Topped with chicken behari seekh kabab, tomatoes, onions, black olives, special BBQ tomato sauce and lots of cheese.',
    tags: ['No Deal', 'Premium'],
    sizes: {
      medium: { label: '11" Medium',  price: 1299 },
      large:  { label: '13" Large',   price: 1899 },
      xlarge: { label: '16" X-Large', price: 2299 }
    }
  },
  {
    id: 'wehshi-pizza',
    category: 'premium',
    name: 'Wehshi Pizza',
    emoji: '👑',
    description: 'Cheese filled butter crust, topped with white sauce marinated chicken, Italian tomato sauce with mozzarella, olives.',
    tags: ['No Deal', 'Premium'],
    sizes: {
      medium: { label: '11" Medium',  price: 1299 },
      large:  { label: '13" Large',   price: 1899 },
      xlarge: { label: '16" X-Large', price: 2299 }
    }
  },
  {
    id: 'kabab-crust',
    category: 'premium',
    name: 'Kabab Crust',
    emoji: '👑',
    description: 'Kabab filled crust, topped with chicken and smoky tomato sauce with kabab.',
    tags: ['No Deal', 'Premium'],
    sizes: {
      medium: { label: '11" Medium',  price: 1299 },
      large:  { label: '13" Large',   price: 1899 },
      xlarge: { label: '16" X-Large', price: 2299 }
    }
  },

  /* ================================================================
     TREAT ON PLANET — Multi-item deal bundles
     ================================================================ */
  {
    id: 'treat-3small',
    category: 'treats',
    name: '3 Small Pizzas',
    emoji: '🎉',
    description: '3 Small Pizzas (Chicken Tikka) with 1/2 Ltr Drink. Other flavours available at different pricing.',
    tags: ['Deal', 'Chicken Tikka'],
    price: 1499
  },
  {
    id: 'treat-3medium',
    category: 'treats',
    name: '3 Medium Pizzas',
    emoji: '🎉',
    description: '3 Medium Pizzas (Chicken Tikka) with 1.5 Ltr Drink. Other flavours available at different pricing.',
    tags: ['Deal', 'Chicken Tikka'],
    price: 2899
  },
  {
    id: 'treat-3large',
    category: 'treats',
    name: '3 Large Pizzas',
    emoji: '🎉',
    description: '3 Large Pizzas (Chicken Tikka) with 1.5 Ltr Drink. Other flavours available at different pricing.',
    tags: ['Deal', 'Chicken Tikka'],
    price: 3499
  },
  {
    id: 'treat-3family',
    category: 'treats',
    name: '3 Family Pizzas',
    emoji: '🎉',
    description: '3 Family Pizzas (Chicken Tikka) with 1.5 Ltr Drink. Other flavours available at different pricing.',
    tags: ['Deal', 'Chicken Tikka'],
    price: 4299
  },
  {
    id: 'treat-3zinger',
    category: 'treats',
    name: '3 Zinger Burgers',
    emoji: '🎉',
    description: '3 Zinger Burgers with 1/2 Ltr Drink.',
    tags: ['Deal'],
    price: 899
  },
  {
    id: 'treat-buy1get3',
    category: 'treats',
    name: 'BUY 1 GET 3 FREE',
    emoji: '🎉',
    description: 'Buy a Large Pizza and get 3 Small Pizzas with 1.5 Ltr Drink FREE!',
    tags: ['Deal', 'Bestseller'],
    price: 2899
  },

  /* ================================================================
     BURGERS & WRAPS — Buy 1 Get 1 Free or 40% Off
     ================================================================ */
  {
    id: 'grill-burger',
    category: 'burgers',
    name: 'Grill Burger',
    emoji: '🍔',
    description: 'Char grilled chicken topped with lettuce, ring of tomato, special sauce and cheese.',
    tags: ['BOGO/40% Off'],
    price: 599
  },
  {
    id: 'planet-special-burger',
    category: 'burgers',
    name: 'Planet Special Burger',
    emoji: '🍔',
    description: 'Deep fried crusted boneless breast stuffed with chef\'s special sauce, mozzarella and vegetables, topped with lettuce and tomato.',
    tags: ['BOGO/40% Off', 'Signature'],
    price: 799
  },
  {
    id: 'tower-burger',
    category: 'burgers',
    name: 'Tower Burger',
    emoji: '🍔',
    description: 'Golden fried chicken and burger patty, topped with cheese, sautéed olives, tomato and mayo.',
    tags: ['BOGO/40% Off'],
    price: 799
  },
  {
    id: 'zinger-burger',
    category: 'burgers',
    name: 'Zinger Burger',
    emoji: '🍔',
    description: 'Our signature golden fried chicken topped with lettuce, tomato and cocktail sauce.',
    tags: ['BOGO/40% Off', 'Bestseller'],
    price: 599
  },
  {
    id: 'zinger-cheese-burger',
    category: 'burgers',
    name: 'Zinger Cheese Burger',
    emoji: '🍔',
    description: 'Zinger burger topped with extra melted cheese.',
    tags: ['BOGO/40% Off'],
    price: 699
  },
  {
    id: 'behari-roll',
    category: 'burgers',
    name: 'Behari Roll',
    emoji: '🌯',
    description: 'Toasted pita bread or traditional paratha stuffed with chopped chicken.',
    tags: ['BOGO/40% Off'],
    price: 599
  },
  {
    id: 'shawarma',
    category: 'burgers',
    name: 'Classic Chicken Shawarma',
    emoji: '🌯',
    description: 'Pan toasted pita bread or traditional paratha stuffed with chopped chicken, vegetables, pickle and cheese.',
    tags: ['BOGO/40% Off'],
    price: 499
  }
];

/* Derive helper properties */
MENU_ITEMS.forEach(function(item) {
  if (item.sizes) {
    var keys = Object.keys(item.sizes);
    item.defaultSize = keys[0];
    item.defaultPrice = item.sizes[item.defaultSize].price;
    item.hasSizes = keys.length > 1;
  } else {
    item.hasSizes = false;
    item.defaultPrice = item.price;
  }
});
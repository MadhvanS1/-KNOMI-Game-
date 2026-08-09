import type { Dish } from '../types/dish';

export const DISHES: Dish[] = [
  // STARTERS (8)
  {
    id: 'starter-1',
    name: 'Paneer Tikka',
    category: 'starters',
    price: 249,
    description: 'Smoky cottage cheese cubes marinaded in yogurt and spices',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 5, social: 8, indulgence: 6, sophistication: 3 }
  },
  {
    id: 'starter-2',
    name: 'Veg Spring Rolls',
    category: 'starters',
    price: 199,
    description: 'Crispy fried rolls packed with shredded veggies and sweet chili dip',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 3, comfort: 7, spice: 2, social: 7, indulgence: 7, sophistication: 3 }
  },
  {
    id: 'starter-3',
    name: 'Loaded Cheese Nachos',
    category: 'starters',
    price: 299,
    description: 'Tortilla chips smothered in melted cheddar, jalapenos, and salsa',
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 3, comfort: 8, spice: 4, social: 9, indulgence: 9, sophistication: 2 }
  },
  {
    id: 'starter-4',
    name: 'Tom Yum Soup',
    category: 'starters',
    price: 279,
    description: 'Authentic Thai hot and sour soup infused with lemongrass and galangal',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 8, comfort: 4, spice: 8, social: 3, indulgence: 3, sophistication: 7 }
  },
  {
    id: 'starter-5',
    name: 'Truffle Bruschetta',
    category: 'starters',
    price: 349,
    description: 'Toasted sourdough topped with heirloom tomatoes, basil, and truffle oil',
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 7, comfort: 4, spice: 1, social: 6, indulgence: 5, sophistication: 9 }
  },
  {
    id: 'starter-6',
    name: 'Peri Peri Chicken Wings',
    category: 'starters',
    price: 329,
    description: 'Fire-roasted wings tossed in atomic peri peri glaze',
    imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 6, spice: 9, social: 8, indulgence: 8, sophistication: 3 }
  },
  {
    id: 'starter-7',
    name: 'Steamed Edamame',
    category: 'starters',
    price: 289,
    description: 'Warm soy pods sprinkled with flaky sea salt and toasted sesame',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 7, comfort: 3, spice: 1, social: 4, indulgence: 2, sophistication: 8 }
  },
  {
    id: 'starter-8',
    name: 'Truffle Parmesan Fries',
    category: 'starters',
    price: 259,
    description: 'Crispy skin-on fries tossed in white truffle oil and aged parmesan',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 5, comfort: 8, spice: 2, social: 7, indulgence: 9, sophistication: 6 }
  },

  // MAINS (10)
  {
    id: 'main-1',
    name: 'Classic Butter Chicken',
    category: 'mains',
    price: 429,
    description: 'Tender chicken simmered in rich velvet tomato-butter gravy',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 10, spice: 4, social: 8, indulgence: 9, sophistication: 3 }
  },
  {
    id: 'main-2',
    name: 'Chef’s Sushi Platter',
    category: 'mains',
    price: 699,
    description: 'Assorted salmon nigiri, spicy tuna rolls, and avocado maki',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 9, comfort: 3, spice: 3, social: 6, indulgence: 4, sophistication: 9 }
  },
  {
    id: 'main-3',
    name: 'Margherita Pizza',
    category: 'mains',
    price: 399,
    description: 'Neapolitan sourdough crust with fresh mozzarella, tomatoes, and basil',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 1, social: 9, indulgence: 7, sophistication: 4 }
  },
  {
    id: 'main-4',
    name: 'Hyderabadi Dum Biryani',
    category: 'mains',
    price: 449,
    description: 'Fragrant basmati rice slow-cooked with aromatic spices and saffron',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 3, comfort: 9, spice: 7, social: 8, indulgence: 8, sophistication: 4 }
  },
  {
    id: 'main-5',
    name: 'Authentic Pad Thai',
    category: 'mains',
    price: 399,
    description: 'Stir-fried rice noodles with tamarind, crushed peanuts, and sprouts',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 6, spice: 5, social: 5, indulgence: 5, sophistication: 6 }
  },
  {
    id: 'main-6',
    name: 'Pan-Seared Salmon',
    category: 'mains',
    price: 799,
    description: 'Crispy skin salmon served over wild rice and lemon-dill butter',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 4, spice: 1, social: 4, indulgence: 4, sophistication: 9 }
  },
  {
    id: 'main-7',
    name: 'Amritsari Chole Bhature',
    category: 'mains',
    price: 279,
    description: 'Spiced chickpea curry with fluffy fried bread and pickled onions',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 6, social: 6, indulgence: 9, sophistication: 2 }
  },
  {
    id: 'main-8',
    name: 'Spicy Tonkotsu Ramen',
    category: 'mains',
    price: 499,
    description: 'Rich pork bone broth with handmade noodles, chashu, and chili oil',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 8, comfort: 7, spice: 7, social: 3, indulgence: 7, sophistication: 7 }
  },
  {
    id: 'main-9',
    name: 'Avocado Caesar Salad',
    category: 'mains',
    price: 349,
    description: 'Crisp romaine, creamy avocado, sourdough croutons, parmesan dressing',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 4, comfort: 3, spice: 1, social: 4, indulgence: 2, sophistication: 7 }
  },
  {
    id: 'main-10',
    name: 'Double Bacon Smash Cheeseburger',
    category: 'mains',
    price: 449,
    description: 'Dual smashed Angus beef patties, melted American cheese, crispy bacon',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 3, comfort: 8, spice: 3, social: 7, indulgence: 10, sophistication: 2 }
  },

  // DESSERTS (6)
  {
    id: 'dessert-1',
    name: 'Hot Gulab Jamun & Ice Cream',
    category: 'desserts',
    price: 179,
    description: 'Golden syrup-soaked dumplings served with vanilla bean scoop',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 1, comfort: 10, spice: 1, social: 7, indulgence: 9, sophistication: 2 }
  },
  {
    id: 'dessert-2',
    name: 'Molten Chocolate Lava Cake',
    category: 'desserts',
    price: 249,
    description: 'Warm dark chocolate cake with a gooey oozing chocolate center',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 1, social: 6, indulgence: 10, sophistication: 5 }
  },
  {
    id: 'dessert-3',
    name: 'Classic Espresso Tiramisu',
    category: 'desserts',
    price: 299,
    description: 'Italian ladyfingers soaked in dark espresso and mascarpone cream',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 5, spice: 1, social: 5, indulgence: 7, sophistication: 9 }
  },
  {
    id: 'dessert-4',
    name: 'Shahi Mango Kulfi',
    category: 'desserts',
    price: 189,
    description: 'Traditional slow-cooked milk ice cream flavored with Alphonso mango',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 1, social: 6, indulgence: 7, sophistication: 4 }
  },
  {
    id: 'dessert-5',
    name: 'New York Baked Cheesecake',
    category: 'desserts',
    price: 279,
    description: 'Dense cream cheese cake over graham cracker crust with berry compote',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 3, comfort: 7, spice: 1, social: 5, indulgence: 8, sophistication: 7 }
  },
  {
    id: 'dessert-6',
    name: 'Fresh Exotic Fruit Platter',
    category: 'desserts',
    price: 229,
    description: 'Sliced dragon fruit, kiwi, passionfruit, and berries with mint honey',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 3, spice: 1, social: 4, indulgence: 1, sophistication: 7 }
  },

  // DRINKS (6)
  {
    id: 'drink-1',
    name: 'Khadak Masala Chai',
    category: 'drinks',
    price: 99,
    description: 'Brewed black tea infused with ginger, cardamom, and whole spices',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 1, comfort: 10, spice: 4, social: 7, indulgence: 4, sophistication: 2 }
  },
  {
    id: 'drink-2',
    name: 'Japanese Iced Matcha Latte',
    category: 'drinks',
    price: 249,
    description: 'Ceremonial grade Uji matcha whisked with oat milk and honey',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 8, comfort: 3, spice: 1, social: 4, indulgence: 3, sophistication: 9 }
  },
  {
    id: 'drink-3',
    name: 'Punjabi Mango Lassi',
    category: 'drinks',
    price: 149,
    description: 'Thick yogurt shake blended with sweet mango pulp and saffron',
    imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 9, spice: 1, social: 6, indulgence: 7, sophistication: 3 }
  },
  {
    id: 'drink-4',
    name: 'Artisanal Cold Brew Coffee',
    category: 'drinks',
    price: 199,
    description: 'Single-origin 18-hour cold steeped coffee served over clear ice',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 6, comfort: 4, spice: 1, social: 5, indulgence: 2, sophistication: 8 }
  },
  {
    id: 'drink-5',
    name: 'Fresh Mint Lime Soda',
    category: 'drinks',
    price: 119,
    description: 'Fizzy sparkling water infused with freshly crushed mint and key lime',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 7, spice: 1, social: 6, indulgence: 3, sophistication: 3 }
  },
  {
    id: 'drink-6',
    name: 'Thick Oreo Chocolate Shake',
    category: 'drinks',
    price: 219,
    description: 'Blended chocolate ice cream, crushed Oreo biscuits, and whipped cream',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    dimensions: { adventure: 2, comfort: 8, spice: 1, social: 7, indulgence: 10, sophistication: 2 }
  }
];

export const DEFAULT_LOCATION = {
  lat: 27.6710,
  lng: 85.3218,
  address: 'Kathmandu, Nepal'
};

export const initialUser = {
  id: 'usr-101',
  name: 'Unfamous',
  email: 'unfamous@example.com',
  phone: '+977 9812345678',
  dob: '2003-01-12',
  gender: 'Male',
  role: 'Food Lover',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  stats: {
    totalOrders: 4,
    favoriteRestaurants: 5,
    savedAddresses: 4,
    avgRating: 4.5
  }
};

export const initialPreferences = {
  preferredCuisines: ['Nepali', 'Italian', 'Chinese'],
  vegetarianOnly: false,
  spicyFoodPreference: 'Medium',
  defaultDeliveryInstructions: 'Ring doorbell and leave at door'
};

export const initialNotificationSettings = {
  orderUpdates: true,
  promotions: true,
  restaurantOffers: true,
  deliveryNotifications: true
};

export const cuisineCategories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'nepali', name: 'Nepali', icon: 'utensils' },
  { id: 'italian', name: 'Italian', icon: 'pizza' },
  { id: 'chinese', name: 'Chinese', icon: 'bowl' },
  { id: 'indian', name: 'Indian', icon: 'flame' },
  { id: 'fast-food', name: 'Fast Food', icon: 'burger' },
  { id: 'continental', name: 'Continental', icon: 'coffee' },
  { id: 'desserts', name: 'Desserts', icon: 'cake' },
  { id: 'beverages', name: 'Beverages', icon: 'cup' }
];

export const recentlyFavorited = [
  {
    id: 'spice-corner',
    name: 'Spice Corner',
    cuisine: 'Nepali • Indian',
    date: 'Sep 19, 2025',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'dragon-wok',
    name: 'Dragon Wok',
    cuisine: 'Chinese • Asian',
    date: 'Sep 16, 2025',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'himalayan-kitchen',
    name: 'The Himalayan Kitchen',
    cuisine: 'Nepali • Asian',
    date: 'Sep 14, 2025',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Order Status Update',
    message: 'Your multi-restaurant order is being prepared by Himalayan Kitchen and Pizza Palace.',
    time: '10 min ago',
    read: false,
    type: 'order',
    orderId: 'ORD-1089'
  },
  {
    id: 'notif-2',
    title: '10% OFF Discount!',
    message: 'Use promo code FOODBARI10 on your next multi-restaurant order.',
    time: '2 hours ago',
    read: false,
    type: 'promo'
  },
  {
    id: 'notif-3',
    title: 'Order Delivered',
    message: 'Your order ORD-1074 from Pizza Palace was delivered successfully.',
    time: '4 days ago',
    read: true,
    type: 'order',
    orderId: 'ORD-1074'
  }
];

export const restaurantsList = [
  {
    id: 'himalayan-kitchen',
    name: 'The Himalayan Kitchen',
    rating: 4.6,
    reviewCount: 320,
    cuisine: 'Nepali • Asian',
    cuisines: ['Nepali', 'Asian', 'Tibetan'],
    deliveryTime: '30–40 min',
    freeDelivery: true,
    deliveryFee: 0,
    minOrder: 300,
    minOrderText: 'Rs. 300 min',
    isOpen: true,
    coordinates: { lat: 27.6715, lng: 85.3225 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    logoText: 'The Himalayan Kitchen',
    logoBg: 'bg-stone-800 text-white',
    description: 'Authentic Nepali and Tibetan culinary experience crafted with fresh Himalayan herbs and local spices.',
    location: 'Balkumari, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Popular',
        items: [
          {
            id: 'hk-1',
            name: 'Buff Steam Momo (10 pcs)',
            description: 'Traditional Nepali steam momos stuffed with minced buff meat, scallions & spices served with spicy tomato chutney.',
            price: 220,
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true,
            customizations: {
              sizes: [{ name: 'Half (5 pcs)', price: 0 }, { name: 'Full (10 pcs)', price: 0 }],
              spiceLevels: ['Mild', 'Medium', 'Extra Hot'],
              extras: [{ name: 'Extra Momo Chutney', price: 30 }, { name: 'Cheese Topping', price: 50 }]
            }
          },
          {
            id: 'hk-2',
            name: 'Chicken Thukpa',
            description: 'Hearty Himalayan noodle soup cooked in slow-simmered chicken broth with fresh veggies and boiled egg.',
            price: 280,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true,
            customizations: {
              sizes: [{ name: 'Regular', price: 0 }, { name: 'Large Bowl', price: 60 }],
              spiceLevels: ['Mild', 'Spicy'],
              extras: [{ name: 'Extra Egg', price: 30 }]
            }
          }
        ]
      },
      {
        category: 'Nepali Thali',
        items: [
          {
            id: 'hk-3',
            name: 'Special Mutton Thakali Set',
            description: 'Traditional Nepali set served with aromatic Basmati rice, slow-cooked mutton curry, black lentils (Dal), gundruk, spinach & ghee.',
            price: 550,
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          },
          {
            id: 'hk-4',
            name: 'Veg Thakali Set',
            description: 'Authentic Nepali vegetarian thali with paneer curry, seasonal veggies, dal, saag, pickles & papad.',
            price: 380,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
            isVegetarian: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    rating: 4.7,
    reviewCount: 450,
    cuisine: 'Pizza • Italian',
    cuisines: ['Pizza', 'Italian', 'Continental'],
    deliveryTime: '25–50 min',
    freeDelivery: false,
    deliveryFee: 50,
    minOrder: 400,
    minOrderText: 'Rs. 400 min',
    isOpen: true,
    coordinates: { lat: 27.6740, lng: 85.3180 },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Pizza Palace',
    logoBg: 'bg-orange-600 text-white',
    description: 'Authentic stone-oven baked pizzas with imported Mozzarella cheese, homemade sauce, and fresh toppings.',
    location: 'Pulchowk, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Pizzas',
        items: [
          {
            id: 'pp-1',
            name: 'Classic Margherita Pizza',
            description: 'San Marzano tomato sauce, fresh mozzarella, sweet basil, and extra virgin olive oil.',
            price: 480,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
            isVegetarian: true,
            isAvailable: true,
            customizations: {
              sizes: [{ name: 'Medium (10")', price: 0 }, { name: 'Large (12")', price: 200 }],
              extras: [{ name: 'Extra Cheese Crust', price: 120 }, { name: 'Jalapenos', price: 40 }]
            }
          },
          {
            id: 'pp-2',
            name: 'Pepperoni Supreme Pizza',
            description: 'Loaded with Italian beef pepperoni, marinara sauce, mozzarella cheese, and chili flakes.',
            price: 650,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          }
        ]
      },
      {
        category: 'Sides',
        items: [
          {
            id: 'pp-3',
            name: 'Garlic Cheese Breadsticks',
            description: 'Oven baked crispy garlic bread coated with garlic butter and melted mozzarella cheese.',
            price: 250,
            image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=400&q=80',
            isVegetarian: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'burger-house',
    name: 'Burger House',
    rating: 4.6,
    reviewCount: 510,
    cuisine: 'Burgers • Fast Food',
    cuisines: ['Burgers', 'Fast Food'],
    deliveryTime: '30–40 min',
    freeDelivery: false,
    deliveryFee: 40,
    minOrder: 300,
    minOrderText: 'Rs. 300 min',
    isOpen: true,
    coordinates: { lat: 27.6780, lng: 85.3240 },
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Burger House',
    logoBg: 'bg-amber-800 text-white',
    description: 'Juicy handcrafted flame-grilled burgers served in toasted brioche buns with crispy seasoned fries.',
    location: 'Kumaripati, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Burgers',
        items: [
          {
            id: 'bh-1',
            name: 'Double Crunchy Chicken Burger',
            description: 'Double crispy fried chicken fillet, double cheddar cheese, lettuce, pickles & spicy mayo sauce.',
            price: 340,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          },
          {
            id: 'bh-2',
            name: 'Classic Veggie Patty Burger',
            description: 'House-made potato and corn veggie patty with fresh tomato, lettuce and tangy cocktail sauce.',
            price: 240,
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
            isVegetarian: true,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'noodle-bowl',
    name: 'The Noodle Bowl',
    rating: 4.4,
    reviewCount: 280,
    cuisine: 'Noodles • Asian',
    cuisines: ['Noodles', 'Asian', 'Chinese'],
    deliveryTime: '25–35 min',
    freeDelivery: true,
    deliveryFee: 0,
    minOrder: 250,
    minOrderText: 'Rs. 250 min',
    isOpen: true,
    coordinates: { lat: 27.6700, lng: 85.3150 },
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=80',
    logoText: 'The Noodle Bowl',
    logoBg: 'bg-red-800 text-white',
    description: 'Sizzling hot bowls of hand-pulled noodles, spicy ramen, and stir-fried Asian delicacies.',
    location: 'Jhamsikhel, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Ramen & Noodles',
        items: [
          {
            id: 'nb-1',
            name: 'Spicy Seafood Ramen',
            description: 'Rich miso seafood broth with ramen noodles, prawns, squid, nori seaweed & soft boiled egg.',
            price: 420,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'spice-corner',
    name: 'Spice Corner',
    rating: 4.5,
    reviewCount: 190,
    cuisine: 'Nepali • Indian',
    cuisines: ['Nepali', 'Indian'],
    deliveryTime: '30–45 min',
    freeDelivery: false,
    deliveryFee: 45,
    minOrder: 300,
    minOrderText: 'Rs. 300 min',
    isOpen: true,
    coordinates: { lat: 27.6820, lng: 85.3200 },
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Spice Corner',
    logoBg: 'bg-yellow-700 text-white',
    description: 'Delectable Indian curries, tandoori kebabs, naan breads, and aromatic Dum Biryanis.',
    location: 'Patandhoka, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Biryani',
        items: [
          {
            id: 'sc-1',
            name: 'Special Chicken Dum Biryani',
            description: 'Fragrant long-grain basmati rice cooked on dum with succulent chicken pieces, saffron and aromatic spices.',
            price: 320,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'dragon-wok',
    name: 'Dragon Wok',
    rating: 4.4,
    reviewCount: 310,
    cuisine: 'Chinese • Asian',
    cuisines: ['Chinese', 'Asian'],
    deliveryTime: '25–35 min',
    freeDelivery: true,
    deliveryFee: 0,
    minOrder: 350,
    minOrderText: 'Rs. 350 min',
    isOpen: true,
    coordinates: { lat: 27.7150, lng: 85.3120 },
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Dragon Wok',
    logoBg: 'bg-red-700 text-white',
    description: 'Sichuan stir-fries, Kung Pao chicken, Schezwan fried rice, and crispy fried dim sums.',
    location: 'Thamel, Kathmandu',
    isFavorite: true,
    menu: [
      {
        category: 'Chinese Specials',
        items: [
          {
            id: 'dw-1',
            name: 'Kung Pao Chicken',
            description: 'Diced chicken stir-fried with peanuts, chili peppers, and green onions in a sweet & spicy soy sauce.',
            price: 360,
            image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'sushi-house',
    name: 'Sushi House',
    rating: 4.2,
    reviewCount: 160,
    cuisine: 'Japanese • Asian',
    cuisines: ['Japanese', 'Asian'],
    deliveryTime: '30–40 min',
    freeDelivery: false,
    deliveryFee: 60,
    minOrder: 500,
    minOrderText: 'Rs. 500 min',
    isOpen: true,
    coordinates: { lat: 27.7250, lng: 85.3210 },
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Sushi House',
    logoBg: 'bg-slate-800 text-white',
    description: 'Fresh sashimi, California rolls, Salmon Nigiri, and Japanese bento boxes prepared by sushi chefs.',
    location: 'Lazimpat, Kathmandu',
    isFavorite: true,
    menu: [
      {
        category: 'Sushi Rolls',
        items: [
          {
            id: 'sh-1',
            name: 'Salmon California Roll (8 pcs)',
            description: 'Fresh Norwegian salmon, avocado, cucumber, wrapped with tobiko fish roe.',
            price: 520,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
            isVegetarian: false,
            isAvailable: true
          }
        ]
      }
    ]
  },
  {
    id: 'cafe-noir',
    name: 'Cafe Noir',
    rating: 4.5,
    reviewCount: 220,
    cuisine: 'Cafe • Continental',
    cuisines: ['Cafe', 'Continental', 'Beverages', 'Desserts'],
    deliveryTime: '20–30 min',
    freeDelivery: true,
    deliveryFee: 0,
    minOrder: 250,
    minOrderText: 'Rs. 250 min',
    isOpen: true,
    coordinates: { lat: 27.6730, lng: 85.3110 },
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    logoText: 'Cafe Noir',
    logoBg: 'bg-zinc-900 text-white',
    description: 'Artisanal espresso coffees, flaky French croissants, cheesecakes, and all-day breakfast plates.',
    location: 'Sanepa, Lalitpur',
    isFavorite: true,
    menu: [
      {
        category: 'Coffee & Cakes',
        items: [
          {
            id: 'cn-1',
            name: 'Iced Caramel Macchiato',
            description: 'Freshly pulled espresso with cold milk, vanilla syrup and rich caramel drizzle.',
            price: 240,
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80',
            isVegetarian: true,
            isAvailable: true
          }
        ]
      }
    ]
  }
];

export const initialOrders = [
  {
    id: 'ORD-1089',
    date: 'Sep 22, 2025',
    time: '12:45 PM',
    location: 'Balkumari, Lalitpur - 44700',
    deliveryAddress: 'Home: Balkumari, Lalitpur - 44700 (Near Balkumari Chowk)',
    paymentMethod: 'Cash on Delivery',
    subtotal: 700,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 750,
    estimatedDeliveryTime: '30-40 mins',
    restaurantOrders: [
      {
        restaurantId: 'himalayan-kitchen',
        restaurantName: 'The Himalayan Kitchen',
        restaurantCuisine: 'Nepali • Asian',
        restaurantImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        status: 'Preparing',
        items: [
          { id: 'hk-1', name: 'Buff Steam Momo (10 pcs)', price: 220, quantity: 1, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=200&q=80' }
        ]
      },
      {
        restaurantId: 'pizza-palace',
        restaurantName: 'Pizza Palace',
        restaurantCuisine: 'Italian • Pizza',
        restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        status: 'Preparing',
        items: [
          { id: 'pp-1', name: 'Classic Margherita Pizza', price: 480, quantity: 1, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80' }
        ]
      }
    ]
  }
];

export const initialAddresses = [
  {
    id: 'addr-1',
    label: 'Home',
    fullAddress: 'Balkumari, Lalitpur - 44700',
    city: 'Lalitpur',
    district: 'Lalitpur',
    postalCode: '44700',
    landmark: 'Near Balkumari Chowk, Kathmandu Valley',
    coordinates: { lat: 27.6715, lng: 85.3225 },
    isDefault: true,
    icon: 'home'
  },
  {
    id: 'addr-2',
    label: 'Office',
    fullAddress: 'Pulchowk, Lalitpur - 44700',
    city: 'Lalitpur',
    district: 'Lalitpur',
    postalCode: '44700',
    landmark: 'Foodbari Pvt. Ltd., 3rd Floor, Pulchowk',
    coordinates: { lat: 27.6740, lng: 85.3180 },
    isDefault: false,
    icon: 'briefcase'
  },
  {
    id: 'addr-3',
    label: "Friend's Place",
    fullAddress: 'Sanepa, Lalitpur - 44600',
    city: 'Lalitpur',
    district: 'Lalitpur',
    postalCode: '44600',
    landmark: 'Near Sanepa Chowk',
    coordinates: { lat: 27.6730, lng: 85.3110 },
    isDefault: false,
    icon: 'map-pin'
  },
  {
    id: 'addr-4',
    label: "Parents' Home",
    fullAddress: 'Bhaktapur - 44800',
    city: 'Bhaktapur',
    district: 'Bhaktapur',
    postalCode: '44800',
    landmark: 'Suryabinayak, Bhaktapur',
    coordinates: { lat: 27.6710, lng: 85.4290 },
    isDefault: false,
    icon: 'map-pin'
  }
];

import { Product } from '../../types';

export const menList: Product[] = [
  // --- السعودية (AR) ---
  {
    id: 'ksa-1',
    name: 'Jeddah Coastal Kit',
    price: 185.00,
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    region: 'ar',
    gender: 'men',
    description: 'Inspired by the Red Sea coast and historic Al-Balad architecture.',
    category: 'Jersey',
    isNew: true
  },
  {
    id: 'ksa-2',
    name: 'Riyadh Desert Falcon Tee',
    price: 150.00,
    currency: 'SAR',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop',
    region: 'ar',
    gender: 'men',
    description: 'Golden hues reflecting the Tuwaiq mountains spirit.',
    category: 'Jersey',
    reviews: [
      {
        id: 'review-1',
        user: 'Fahad Al-Otaibi',
        rating: 5,
        comment: 'الخامة ممتازة جداً والتوصيل سريع للرياض. شكراً لكم!',
        date: '2023-12-05'
      },
      {
        id: 'review-2',
        user: 'Sarah M.',
        rating: 4,
        comment: 'Nice design but I suggest ordering a size up.',
        date: '2023-11-20'
      }
    ]
  },

  // --- فرنسا (FR) ---
  {
    id: 'fr-1',
    name: 'Paris Saint-Germain Street',
    price: 60.00,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop',
    region: 'fr',
    gender: 'men',
    description: 'Elegant sportswear connecting the stadium to the Champs-Élysées.'
  },
  {
    id: 'fr-2',
    name: 'Marseille Docklands Hoodie',
    price: 85.00,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    region: 'fr',
    gender: 'men',
    description: 'Raw energy from the southern coast football culture.'
  },

  // --- إسبانيا (ES) ---
  {
    id: 'es-1',
    name: 'Madrid Royal Vintage',
    price: 55.00,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop',
    region: 'es',
    gender: 'men',
    description: 'Classic white aesthetic with royal purple accents.'
  },
  {
    id: 'es-2',
    name: 'Barcelona Mosaic Jersey',
    price: 65.00,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1000&auto=format&fit=crop',
    region: 'es',
    gender: 'men',
    description: 'Inspired by Gaudi architecture and total football.'
  },

  // --- أمريكا (EN) ---
  {
    id: 'us-1',
    name: 'Brooklyn Concrete Tee',
    price: 42.00,
    currency: 'USD',
    image: '/images/1.webp',
    region: 'en',
    gender: 'men',
    description: 'Gritty textures inspired by NYC street football.'
  },
  {
    id: 'us-2',
    name: 'LA Galaxy Retro',
    price: 48.00,
    currency: 'USD',
    image: '/images/2.webp',
    region: 'en',
    gender: 'men',
    description: 'Sun-faded aesthetic for the West Coast lifestyle.'
  },
  {
    id: 'us-3',
    name: 'Miami Vibes Kit', // قمت بتسميته بدلاً من taet
    price: 50.00,
    currency: 'USD',
    image: '/images/3.webp',
    region: 'en',
    gender: 'men',
    description: 'Neon lights and ocean breeze.'
  },
  {
    id: 'us-4',
    name: 'LA Logo Hoodie',
    price: 49.00,
    currency: 'USD',
    image: '/images/7.webp',
    region: 'en',
    gender: 'men',
    description: 'Premium cotton hoodie with embroidered details.'
  },
  {
    id: 'us-5',
    name: 'NY Red Bulls Classic',
    price: 32.00,
    currency: 'USD',
    image: '/images/5.webp',
    region: 'en',
    gender: 'men',
    description: 'Street ready design.'
  },
  {
    id: 'us-6',
    name: 'Chicago Fire Drill',
    price: 48.00,
    currency: 'USD',
    image: '/images/9.webp',
    region: 'en',
    gender: 'men',
    description: 'Bold red aesthetic.'
  },
  {
    id: 'us-8',
    name: 'Seattle Sounders Rain',
    price: 48.00,
    currency: 'USD',
    image: '/images/10.webp',
    region: 'en',
    gender: 'men',
    description: 'Water resistant training top.'
  },
  {
    id: 'us-10',
    name: 'Austin Verde Kit',
    price: 48.00,
    currency: 'USD',
    image: '/images/11.webp',
    region: 'en',
    gender: 'men',
    description: 'Deep green roots.'
  },

  // --- اليابان (JA) ---
  {
    id: 'jp-1',
    name: 'Kyoto Mist Heavyweight',
    price: 6500,
    currency: 'JPY',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    region: 'ja',
    gender: 'men',
    description: 'Inspired by traditional patterns and modern Tokyo drift.'
  },
  {
    id: 'jp-3',
    name: 'Shibuya Neon Bomber',
    price: 12000,
    currency: 'JPY',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000&auto=format&fit=crop',
    region: 'ja',
    gender: 'men',
    description: 'Tech-wear meets football heritage in neon lights.'
  }
];
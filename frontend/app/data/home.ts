// Home Page Types and Demo Data

export interface DealCard {
  id: number
  title: string
  subtitle: string
  bgColor: string
  image: string
}

export interface HomeProduct {
  id: number
  name: string
  price: string
  unit: string
  distance: string
  category: string
  image: string
}

// Deal cards for carousel
export const dealCards: DealCard[] = [
  {
    id: 1,
    title: '25% OFF',
    subtitle: 'VEGETABLES',
    bgColor: 'bg-orange-100',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
  },
  {
    id: 2,
    title: 'SPECIAL OFFER',
    subtitle: 'Save Big Today',
    bgColor: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
  },
  {
    id: 3,
    title: 'HOT DEALS',
    subtitle: 'Limited Time',
    bgColor: 'bg-red-50',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
  },
  {
    id: 4,
    title: 'DELICIOUS',
    subtitle: '50% OFF',
    bgColor: 'bg-purple-100',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  },
  {
    id: 5,
    title: 'FRIDAY DEALS',
    subtitle: 'Special Price',
    bgColor: 'bg-yellow-100',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400',
  },
]

// Grocery items
export const groceryItems: HomeProduct[] = [
  { id: 1, name: 'Fresh Milk', price: '450', unit: 'Per Piece', distance: '2.6 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { id: 2, name: 'Premium Coffee', price: '100', unit: 'Per Pack', distance: '1.2 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
  { id: 3, name: 'Biscuits Pack', price: '200', unit: 'Per Piece', distance: '3.5 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
  { id: 4, name: 'Snacks Combo', price: '850', unit: 'Per Combo', distance: '2.1 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
  { id: 5, name: 'Tomato Sauce', price: '50', unit: 'Per Piece', distance: '1.8 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { id: 6, name: 'Chips Variety', price: '340', unit: 'Per Combo', distance: '4.2 km', category: 'grocery', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
]

// Fashion items
export const fashionItems: HomeProduct[] = [
  { id: 1, name: 'Casual Shoes', price: '6650', unit: 'Per Piece', distance: '1.2 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
  { id: 2, name: 'Winter Hoodie', price: '850', unit: 'Per Piece', distance: '2.8 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
  { id: 3, name: 'Leather Handbag', price: '6800', unit: 'Per Piece', distance: '3.1 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
  { id: 4, name: 'High Heels', price: '8500', unit: 'Per Piece', distance: '2.3 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
  { id: 5, name: 'Party Dress', price: '6850', unit: 'Per Piece', distance: '1.9 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
  { id: 6, name: 'Lipstick Set', price: '340', unit: 'Per Piece', distance: '4.5 km', category: 'fashion', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400' },
]

// Gadget items
export const gadgetItems: HomeProduct[] = [
  { id: 1, name: 'Gaming Monitor', price: '1250', unit: 'Old', distance: '2.1 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
  { id: 2, name: 'Gaming Console', price: '200', unit: 'Old', distance: '3.2 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
  { id: 3, name: 'Wireless Headphones', price: '6250', unit: 'Old', distance: '1.7 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { id: 4, name: 'Hair Dryer', price: '340', unit: 'Per Piece', distance: '2.9 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400' },
  { id: 5, name: 'Mechanical Keyboard', price: '6650', unit: 'Old', distance: '4.1 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { id: 6, name: 'Gaming Mouse', price: '750', unit: 'Old', distance: '2.6 km', category: 'gadget', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
]

import { Product } from '../types/product';

// Base product templates for generating variations
const productTemplates = [
  {
    name: 'Diamond Exclusive Ring',
    basePrice: 50,
    category: 'rings',
    brand: 'Diamond Collection',
    image: '/assets/img/product/diamond-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    colors: ['lightblue', 'gold', 'silver'],
  },
  {
    name: 'Handmade Golden Ring',
    basePrice: 55,
    category: 'rings',
    brand: 'Gold Collection',
    image: '/assets/img/product/gold-handmade.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    colors: ['gold', 'rose-gold'],
  },
  {
    name: 'Exclusive Gold Jewelry Set',
    basePrice: 45,
    category: 'sets',
    brand: 'Quickiin',
    image: '/assets/img/product/gold-jewelry.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace.jpeg',
    colors: ['gold'],
  },
  {
    name: 'Perfect Diamond Earrings',
    basePrice: 50,
    category: 'earrings',
    brand: 'Diamond Collection',
    image: '/assets/img/product/diamond-earring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    colors: ['silver', 'gold'],
  },
  {
    name: 'Handmade Golden Necklace',
    basePrice: 90,
    category: 'necklaces',
    brand: 'Gold Collection',
    image: '/assets/img/product/gold-necklace.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
    colors: ['gold', 'rose-gold'],
  },
  {
    name: 'Diamond Ring Collection',
    basePrice: 125,
    category: 'rings',
    brand: 'Platinum',
    image: '/assets/img/product/diamond-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    colors: ['lightblue', 'silver'],
  },
  {
    name: 'Silver Wedding Ring',
    basePrice: 280,
    category: 'rings',
    brand: 'Quickiin',
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/mony-ring.jpeg',
    colors: ['blue', 'silver', 'gold'],
  },
  {
    name: 'Elegant Silver Bracelet',
    basePrice: 450,
    category: 'bracelets',
    brand: 'Quickiin',
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    colors: ['silver'],
  },
  {
    name: 'Classic Silver Bracelet',
    basePrice: 144,
    category: 'bracelets',
    brand: 'Diamond',
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    colors: ['gold', 'rose-gold'],
  },
  {
    name: 'Golden Necklace Collection',
    basePrice: 55,
    category: 'necklaces',
    brand: 'Gold Collection',
    image: '/assets/img/product/gold-necklace.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
    colors: ['gold'],
  },
  {
    name: 'Exclusive Silver Bracelet',
    basePrice: 45,
    category: 'bracelets',
    brand: 'BDevs',
    image: '/assets/img/product/silver-bracelet.jpeg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    colors: ['silver'],
  },
  {
    name: 'Diamond Necklace',
    basePrice: 50,
    category: 'necklaces',
    brand: 'Diamond Collection',
    image: '/assets/img/product/diamond-necklace.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring.jpeg',
    colors: ['silver', 'gold'],
  },
  {
    name: 'Diamond Stud Earrings',
    basePrice: 90,
    category: 'earrings',
    brand: 'Diamond Collection',
    image: '/assets/img/product/diamond-earring.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring-1.jpeg',
    colors: ['silver', 'gold'],
  },
  {
    name: 'Diamond Ring Special',
    basePrice: 90,
    category: 'rings',
    brand: 'BDevs',
    image: '/assets/img/product/mony-ring.jpeg',
    secondaryImage: '/assets/img/product/diamond-ring.jpeg',
    colors: ['white', 'cream'],
  },
  {
    name: 'Gold Ring Collection',
    basePrice: 224,
    category: 'rings',
    brand: 'BDevs',
    image: '/assets/img/product/gold-rings.jpeg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    colors: ['red', 'gold'],
  },
  {
    name: 'Jevoo Exclusive Jewelry Set',
    basePrice: 20,
    category: 'sets',
    brand: 'Jevoo',
    image: '/assets/img/product/gold-jewelry.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace.jpeg',
    colors: ['gold', 'silver'],
  },
];

const variations = [
  'Premium', 'Luxury', 'Exclusive', 'Classic', 'Modern', 'Vintage', 'Elegant', 'Sophisticated',
  'Deluxe', 'Royal', 'Elite', 'Signature', 'Limited Edition', 'Special', 'Unique', 'Rare'
];

const materials = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Pearl', 'Ruby', 'Emerald', 'Sapphire'];

// Simple deterministic random function to avoid hydration issues
function deterministicRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate a large number of products for pagination testing
export function generateProducts(totalProducts: number = 800): Product[] {
  const products: Product[] = [];
  
  for (let i = 0; i < totalProducts; i++) {
    const template = productTemplates[i % productTemplates.length];
    const variation = variations[i % variations.length];
    const material = materials[i % materials.length];
    
    // Use deterministic "random" based on index to avoid hydration issues
    const priceVariation = (deterministicRandom(i) - 0.5) * 0.4; // ±20% variation
    const basePrice = template.basePrice;
    const price = Math.round(basePrice * (1 + priceVariation));
    
    // Determine if it's on sale (30% chance) - deterministic
    const isSale = deterministicRandom(i * 2) < 0.3;
    const originalPrice = isSale ? Math.round(price * (1.2 + deterministicRandom(i * 3) * 0.3)) : undefined;
    const discount = isSale ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : undefined;
    
    // Determine if it's new (20% chance) - deterministic
    const isNew = deterministicRandom(i * 4) < 0.2;
    
    // Stock status - deterministic
    const inStock = deterministicRandom(i * 5) > 0.05; // 95% in stock
    
    const product: Product = {
      id: `product-${i + 1}`,
      name: `${variation} ${material} ${template.name}`,
      price: price,
      originalPrice: originalPrice,
      image: template.image,
      secondaryImage: template.secondaryImage,
      url: '/product-details',
      brand: template.brand,
      category: template.category,
      isNew: isNew,
      isSale: isSale,
      discount: discount,
      inStock: inStock,
      colors: template.colors,
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate products for specific pages (useful for testing empty pages)
export function generateProductsForPage(page: number, productsPerPage: number = 8): Product[] {
  // For testing purposes, let's say we only have products for pages 1-50
  // Pages 51-99 will be empty
  if (page > 50) {
    return [];
  }
  
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const allProducts = generateProducts(400); // Generate 400 products (50 pages * 8 products)
  
  return allProducts.slice(startIndex, endIndex);
}

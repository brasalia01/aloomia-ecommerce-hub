import { Product } from '@/components/Products/ProductCard';
import productWatch from '@/assets/product-watch.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productPhone from '@/assets/product-phone.jpg';
import productBag from '@/assets/product-bag.jpg';
import productSnacks from '@/assets/product-snacks.jpg';
import productSmartTv from '@/assets/product-smart-tv.jpg';
import productLaptop from '@/assets/product-laptop.jpg';
import productCoffeeMaker from '@/assets/product-coffee-maker.jpg';
import productLadiesDress from '@/assets/product-ladies-dress.jpg';
import productMensShirt from '@/assets/product-mens-shirt.jpg';
import productGamingKeyboard from '@/assets/product-gaming-keyboard.jpg';
import productSneakersNike from '@/assets/product-sneakers-nike.jpg';
import productSneakersAdidas from '@/assets/product-sneakers-adidas.jpg';
import productSneakersPuma from '@/assets/product-sneakers-puma.jpg';
import productSneakersReebok from '@/assets/product-sneakers-reebok.jpg';
import productBookFiction from '@/assets/product-book-fiction.jpg';
import productBookBusiness from '@/assets/product-book-business.jpg';
import productBookCookbook from '@/assets/product-book-cookbook.jpg';
import productBookScience from '@/assets/product-book-science.jpg';
import productBookChildren from '@/assets/product-book-children.jpg';

export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  sizes: string[];
  stock: { [size: string]: number };
  images: string[];
}

export interface DetailedProduct extends Product {
  description: string;
  features: string[];
  variants: ProductVariant[];
  inStock: boolean;
  totalStock: number;
}

// Base product data
export const allProducts: Array<Product & { features?: string[]; onSale?: boolean }> = [
  {
    id: '1',
    name: 'Premium Luxury Watch',
    price: 299.99,
    originalPrice: 399.99,
    image: productWatch,
    rating: 4.8,
    reviewCount: 124,
    category: 'Accessories',
    isSale: true,
    isNew: false,
  },
  {
    id: '2',
    name: 'Wireless Pro Headphones',
    price: 199.99,
    image: productHeadphones,
    rating: 4.9,
    reviewCount: 89,
    category: 'Audio',
    isNew: true,
  },
  {
    id: '3',
    name: 'Smartphone Pro Max',
    price: 899.99,
    originalPrice: 999.99,
    image: productPhone,
    rating: 4.7,
    reviewCount: 256,
    category: 'Electronics',
    isSale: true,
  },
  {
    id: '4',
    name: 'Premium Leather Bag',
    price: 149.99,
    image: productBag,
    rating: 4.6,
    reviewCount: 67,
    category: 'Fashion',
    isNew: true,
  },
  {
    id: '5',
    name: 'Gourmet Snack Collection',
    price: 29.99,
    originalPrice: 39.99,
    image: productSnacks,
    rating: 4.5,
    reviewCount: 45,
    category: 'Home & Garden',
    isSale: true,
  },
  {
    id: '6',
    name: '65" Smart TV 4K Ultra HD',
    price: 799.99,
    originalPrice: 999.99,
    image: productSmartTv,
    rating: 4.8,
    reviewCount: 312,
    category: 'Electronics',
    isSale: true,
  },
  {
    id: '7',
    name: 'MacBook Pro 14-inch Laptop',
    price: 1899.99,
    image: productLaptop,
    rating: 4.7,
    reviewCount: 1024,
    category: 'Electronics',
    isNew: true,
  },
  {
    id: '8',
    name: 'Premium Coffee Maker',
    price: 249.99,
    originalPrice: 299.99,
    image: productCoffeeMaker,
    rating: 4.9,
    reviewCount: 89,
    category: 'Home & Garden',
    isSale: true,
  },
  {
    id: '9',
    name: 'Elegant Summer Dress',
    price: 89.99,
    image: productLadiesDress,
    rating: 4.9,
    reviewCount: 156,
    category: 'Fashion',
    isNew: true,
  },
  {
    id: '10',
    name: 'Men\'s Casual Shirt',
    price: 49.99,
    originalPrice: 69.99,
    image: productMensShirt,
    rating: 4.8,
    reviewCount: 78,
    category: 'Fashion',
    isSale: true,
  },
  {
    id: '11',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    image: productGamingKeyboard,
    rating: 4.9,
    reviewCount: 92,
    category: 'Gaming',
    isNew: true,
  },
  {
    id: '12',
    name: 'Nike Air Max Running Sneakers',
    price: 149.99,
    originalPrice: 189.99,
    image: productSneakersNike,
    rating: 4.8,
    reviewCount: 234,
    category: 'Sneakers',
    isSale: true,
    isNew: false,
  },
  {
    id: '13',
    name: 'Adidas Ultra Boost Performance',
    price: 179.99,
    image: productSneakersAdidas,
    rating: 4.9,
    reviewCount: 187,
    category: 'Sneakers',
    isNew: true,
  },
  {
    id: '14',
    name: 'Puma RS-X Street Style',
    price: 119.99,
    originalPrice: 149.99,
    image: productSneakersPuma,
    rating: 4.7,
    reviewCount: 145,
    category: 'Sneakers',
    isSale: true,
  },
  {
    id: '15',
    name: 'Reebok Classic Leather Sneakers',
    price: 89.99,
    image: productSneakersReebok,
    rating: 4.6,
    reviewCount: 98,
    category: 'Sneakers',
    isNew: false,
  },
  {
    id: '16',
    name: 'Home Hovel - Classic Fiction Novel',
    price: 24.99,
    image: productBookFiction,
    rating: 4.8,
    reviewCount: 342,
    category: 'Books',
    isNew: false,
  },
  {
    id: '17',
    name: 'Business & Self Help Guide',
    price: 29.99,
    originalPrice: 39.99,
    image: productBookBusiness,
    rating: 4.7,
    reviewCount: 189,
    category: 'Books',
    isSale: true,
  },
  {
    id: '18',
    name: 'Modern Cookbook Collection',
    price: 34.99,
    image: productBookCookbook,
    rating: 4.9,
    reviewCount: 267,
    category: 'Books',
    isNew: true,
  },
  {
    id: '19',
    name: 'Science & Technology Handbook',
    price: 39.99,
    image: productBookScience,
    rating: 4.6,
    reviewCount: 145,
    category: 'Books',
    isNew: false,
  },
  {
    id: '20',
    name: 'Children\'s Story Book Collection',
    price: 19.99,
    originalPrice: 24.99,
    image: productBookChildren,
    rating: 4.8,
    reviewCount: 423,
    category: 'Books',
    isSale: true,
  },
];

// Detailed product information
export const getProductDetails = (productId: string): DetailedProduct | null => {
  const baseProduct = allProducts.find(p => p.id === productId);
  if (!baseProduct) return null;

  // Generate detailed product data based on category and type
  const generateVariants = (product: Product): ProductVariant[] => {
    switch (product.category) {
      case 'Electronics':
        return [
          {
            id: 'black',
            color: 'Midnight Black',
            colorHex: '#1a1a1a',
            sizes: product.name.includes('Phone') ? ['128GB', '256GB', '512GB'] : ['Small', 'Medium', 'Large'],
            stock: { 'Small': 5, 'Medium': 12, 'Large': 8, '128GB': 10, '256GB': 15, '512GB': 5 },
            images: [product.image, product.image]
          },
          {
            id: 'white',
            color: 'Pearl White',
            colorHex: '#f8f9fa',
            sizes: product.name.includes('Phone') ? ['128GB', '256GB', '512GB'] : ['Small', 'Medium', 'Large'],
            stock: { 'Small': 3, 'Medium': 7, 'Large': 4, '128GB': 8, '256GB': 12, '512GB': 3 },
            images: [product.image, product.image]
          },
          {
            id: 'blue',
            color: 'Ocean Blue',
            colorHex: '#2563eb',
            sizes: product.name.includes('Phone') ? ['128GB', '256GB', '512GB'] : ['Small', 'Medium', 'Large'],
            stock: { 'Small': 0, 'Medium': 5, 'Large': 2, '128GB': 6, '256GB': 9, '512GB': 2 },
            images: [product.image, product.image]
          }
        ];
      case 'Audio':
      case 'Gaming':
        return [
          {
            id: 'black',
            color: 'Midnight Black',
            colorHex: '#1a1a1a',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 8, 'Medium': 15, 'Large': 12 },
            images: [product.image, product.image]
          },
          {
            id: 'white',
            color: 'Pearl White',
            colorHex: '#f8f9fa',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 6, 'Medium': 10, 'Large': 8 },
            images: [product.image, product.image]
          },
          {
            id: 'red',
            color: 'Gaming Red',
            colorHex: '#dc2626',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 4, 'Medium': 8, 'Large': 6 },
            images: [product.image, product.image]
          }
        ];
      case 'Fashion':
      case 'Accessories':
      case 'Jerseys':
        return [
          {
            id: 'brown',
            color: 'Rich Brown',
            colorHex: '#8B4513',
            sizes: ['XS', 'Small', 'Medium', 'Large', 'XL'],
            stock: { 'XS': 3, 'Small': 8, 'Medium': 15, 'Large': 12, 'XL': 6 },
            images: [product.image, product.image]
          },
          {
            id: 'black',
            color: 'Classic Black',
            colorHex: '#1a1a1a',
            sizes: ['XS', 'Small', 'Medium', 'Large', 'XL'],
            stock: { 'XS': 2, 'Small': 6, 'Medium': 10, 'Large': 8, 'XL': 4 },
            images: [product.image, product.image]
          },
          {
            id: 'navy',
            color: 'Navy Blue',
            colorHex: '#1e3a8a',
            sizes: ['XS', 'Small', 'Medium', 'Large', 'XL'],
            stock: { 'XS': 1, 'Small': 4, 'Medium': 8, 'Large': 6, 'XL': 3 },
            images: [product.image, product.image]
          }
        ];
      case 'Home & Garden':
        return [
          {
            id: 'natural',
            color: 'Natural Wood',
            colorHex: '#8B4513',
            sizes: [],
            stock: { 'One Size': 12 },
            images: [product.image, product.image]
          },
          {
            id: 'black',
            color: 'Matte Black',
            colorHex: '#1a1a1a',
            sizes: [],
            stock: { 'One Size': 8 },
            images: [product.image, product.image]
          },
          {
            id: 'white',
            color: 'Pure White',
            colorHex: '#ffffff',
            sizes: [],
            stock: { 'One Size': 10 },
            images: [product.image, product.image]
          }
        ];
      default:
        return [
          {
            id: 'default',
            color: 'Standard',
            colorHex: '#6B7280',
            sizes: [],
            stock: {},
            images: [product.image]
          }
        ];
    }
  };

  const generateDescription = (product: Product): string => {
    switch (product.category) {
      case 'Electronics':
        if (product.name.includes('Smartphone')) {
          return 'The latest in smartphone technology with cutting-edge features, exceptional camera quality, and lightning-fast performance. Built with premium materials and designed for the modern lifestyle. Stay connected, productive, and entertained wherever you go.';
        } else if (product.name.includes('TV')) {
          return 'Immerse yourself in stunning 4K Ultra HD picture quality with smart features that bring your entertainment to life. Experience vibrant colors, crystal-clear details, and seamless streaming from your favorite apps.';
        } else if (product.name.includes('Laptop')) {
          return 'Powerful computing performance meets elegant design in this premium laptop. Whether for work, creativity, or entertainment, experience lightning-fast processing, stunning display quality, and all-day battery life.';
        }
        return 'High-quality electronic device engineered for performance, reliability, and user satisfaction. Built with the latest technology and premium materials.';
      case 'Audio':
        return 'Experience unparalleled audio quality with crystal-clear sound, premium comfort, and cutting-edge technology. Perfect for music lovers, professionals, and anyone who demands the best in audio performance.';
      case 'Fashion':
        return 'Crafted with premium materials and attention to detail, this fashion piece combines style with functionality. Perfect for both casual and formal occasions, designed to complement your unique style and provide lasting comfort.';
      case 'Accessories':
        return 'A perfect blend of style and functionality, this accessory is designed to complement your lifestyle. Crafted with premium materials and attention to detail, it\'s built to last while making a statement.';
      case 'Gaming':
        return 'Elevate your gaming experience with professional-grade equipment designed for performance and precision. Built for gamers who demand responsiveness, durability, and competitive edge.';
      case 'Home & Garden':
        return 'Transform your living space with this premium home product. Combining functionality with elegant design, it\'s perfect for creating a comfortable and stylish environment you\'ll love.';
      case 'Jerseys':
        return 'Show your team pride with this authentic jersey featuring premium materials, official team colors, and comfortable fit. Perfect for game day, casual wear, or collecting your favorite teams.';
      case 'Books':
        return 'Immerse yourself in captivating stories and knowledge with this carefully curated book. Whether for entertainment, education, or personal growth, this book offers engaging content and high-quality printing for an exceptional reading experience.';
      default:
        return 'Premium quality product designed with attention to detail and built to exceed your expectations. Perfect for those who appreciate quality and value.';
    }
  };

  const generateFeatures = (product: Product): string[] => {
    switch (product.category) {
      case 'Electronics':
        if (product.name.includes('Smartphone')) {
          return [
            'Pro camera system with advanced computational photography',
            'All-day battery life with fast wireless charging',
            'Premium titanium design with Ceramic Shield',
            'A17 Pro chip with industry-leading performance',
            '5G connectivity for blazing-fast speeds',
            'Water resistant up to 6 meters for 30 minutes'
          ];
        } else if (product.name.includes('TV')) {
          return [
            '4K Ultra HD resolution with HDR support',
            'Smart TV platform with built-in streaming apps',
            'Dolby Vision and Dolby Atmos for immersive experience',
            'Multiple HDMI and USB ports for connectivity',
            'Voice control with built-in assistants',
            'Sleek design that complements any room'
          ];
        } else if (product.name.includes('Laptop')) {
          return [
            'High-performance processor for multitasking',
            'Stunning Retina display with True Tone technology',
            'All-day battery life up to 18 hours',
            'Premium aluminum unibody construction',
            'Advanced thermal architecture for sustained performance',
            'Touch ID for secure authentication'
          ];
        }
        return [
          'Premium build quality with attention to detail',
          'Latest technology for optimal performance',
          'User-friendly design and interface',
          'Long-lasting durability and reliability',
          'Comprehensive warranty and support'
        ];
      case 'Audio':
        return [
          'Active Noise Cancellation with advanced algorithms',
          '40-hour battery life with quick charge',
          'Premium materials and memory foam padding',
          'High-resolution audio with custom drivers',
          'Bluetooth 5.3 with multi-device connectivity',
          'Touch controls with voice assistant support'
        ];
      case 'Fashion':
      case 'Accessories':
        return [
          'Premium materials with expert craftsmanship',
          'Multiple size options for perfect fit',
          'Durable construction with quality hardware',
          'Comfortable design for all-day wear',
          'Easy care and maintenance instructions',
          'Timeless style that never goes out of fashion'
        ];
      case 'Gaming':
        return [
          'Professional-grade mechanical switches',
          'RGB backlighting with customizable effects',
          'Anti-ghosting and N-key rollover technology',
          'Durable construction built for intensive gaming',
          'Programmable keys and macros support',
          'Compatible with all major gaming platforms'
        ];
      case 'Home & Garden':
        return [
          'Premium materials designed for longevity',
          'Easy setup and user-friendly operation',
          'Energy-efficient and environmentally friendly',
          'Sleek design that complements any decor',
          'Multiple settings for customized use',
          'Comprehensive warranty and customer support'
        ];
      case 'Jerseys':
        return [
          'Official team colors and authentic design',
          'Premium breathable fabric for comfort',
          'Moisture-wicking technology keeps you dry',
          'Durable construction for long-lasting wear',
          'Official team logos and player details',
          'Available in multiple sizes for perfect fit'
        ];
      case 'Books':
        return [
          'High-quality printing on premium paper',
          'Engaging content from expert authors',
          'Durable binding for long-lasting use',
          'Perfect for personal reading or gifting',
          'Comprehensive index and references',
          'Available in multiple formats and editions'
        ];
      default:
        return [
          'Premium quality materials and construction',
          'Designed for durability and longevity',
          'Excellent value for money',
          'Customer satisfaction guaranteed',
          'Fast and reliable shipping'
        ];
    }
  };

  const variants = generateVariants(baseProduct);
  const totalStock = variants.reduce((total, variant) => 
    total + Object.values(variant.stock).reduce((sum, stock) => sum + stock, 0), 0
  );

  return {
    ...baseProduct,
    description: generateDescription(baseProduct),
    features: generateFeatures(baseProduct),
    variants,
    inStock: totalStock > 0,
    totalStock
  };
};

export const getSimilarProducts = (productId: string, category: string): Product[] => {
  return allProducts
    .filter(p => p.category === category && p.id !== productId)
    .slice(0, 4);
};
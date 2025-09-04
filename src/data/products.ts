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
export const allProducts: Product[] = [
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
    category: 'Electronics',
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
    category: 'Food & Snacks',
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
    category: 'Home Appliances',
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
    category: 'Electronics',
    isNew: true,
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
      case 'Fashion':
      case 'Accessories':
        return [
          {
            id: 'brown',
            color: 'Rich Brown',
            colorHex: '#8B4513',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 8, 'Medium': 15, 'Large': 12 },
            images: [product.image, product.image]
          },
          {
            id: 'black',
            color: 'Classic Black',
            colorHex: '#1a1a1a',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 6, 'Medium': 10, 'Large': 8 },
            images: [product.image, product.image]
          },
          {
            id: 'tan',
            color: 'Camel Tan',
            colorHex: '#D2691E',
            sizes: ['Small', 'Medium', 'Large'],
            stock: { 'Small': 4, 'Medium': 8, 'Large': 6 },
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
        if (product.name.includes('Headphones')) {
          return 'Experience unparalleled audio quality with our Premium Wireless Headphones. Featuring advanced noise cancellation technology, premium materials, and exceptional comfort for extended listening sessions. Perfect for music lovers, professionals, and anyone who demands the best in audio performance.';
        } else if (product.name.includes('Phone')) {
          return 'The latest in smartphone technology with cutting-edge features, exceptional camera quality, and lightning-fast performance. Built with premium materials and designed for the modern lifestyle. Stay connected, productive, and entertained wherever you go.';
        }
        return 'High-quality electronic device engineered for performance, reliability, and user satisfaction. Built with the latest technology and premium materials.';
      case 'Fashion':
        return 'Crafted with premium materials and attention to detail, this fashion piece combines style with functionality. Perfect for both casual and formal occasions, designed to complement your unique style and provide lasting comfort.';
      case 'Accessories':
        return 'A perfect blend of style and functionality, this accessory is designed to complement your lifestyle. Crafted with premium materials and attention to detail, it\'s built to last while making a statement.';
      case 'Services':
        return 'Professional service delivered by experienced experts. We combine creativity, technical expertise, and industry best practices to deliver exceptional results that exceed your expectations.';
      default:
        return 'Premium quality product designed with attention to detail and built to exceed your expectations. Perfect for those who appreciate quality and value.';
    }
  };

  const generateFeatures = (product: Product): string[] => {
    switch (product.category) {
      case 'Electronics':
        if (product.name.includes('Headphones')) {
          return [
            'Active Noise Cancellation with advanced algorithms',
            '40-hour battery life with quick charge',
            'Premium leather and memory foam padding',
            'High-resolution audio with custom drivers',
            'Bluetooth 5.3 with multi-device connectivity',
            'Touch controls with voice assistant support'
          ];
        } else if (product.name.includes('Phone')) {
          return [
            'Pro camera system with advanced computational photography',
            'All-day battery life with fast wireless charging',
            'Premium titanium design with Ceramic Shield',
            'A17 Pro chip with industry-leading performance',
            '5G connectivity for blazing-fast speeds',
            'Water resistant up to 6 meters for 30 minutes'
          ];
        }
        return [
          'Premium build quality with attention to detail',
          'Latest technology for optimal performance',
          'User-friendly design and interface',
          'Long-lasting durability and reliability',
          'Comprehensive warranty and support'
        ];
      case 'Fashion':
      case 'Accessories':
        return [
          'Premium leather construction with expert craftsmanship',
          'Multiple compartments for organized storage',
          'Durable hardware with lifetime warranty',
          'Ergonomic design for comfortable everyday use',
          'Water-resistant coating for protection',
          'Timeless design that never goes out of style'
        ];
      case 'Services':
        return [
          'Professional consultation and planning',
          'Custom solutions tailored to your needs',
          'Expert team with years of experience',
          'Timely delivery and project management',
          'Ongoing support and maintenance',
          'Satisfaction guarantee with revisions included'
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
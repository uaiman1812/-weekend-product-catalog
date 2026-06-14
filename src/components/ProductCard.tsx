import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Get gradient color based on category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "men's clothing": "from-blue-500 to-blue-600",
      "women's clothing": "from-pink-500 to-rose-500",
      "jewelery": "from-yellow-500 to-amber-500",
      "electronics": "from-green-500 to-emerald-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      "men's clothing": "bg-blue-100 text-blue-700",
      "women's clothing": "bg-pink-100 text-pink-700",
      "jewelery": "bg-yellow-100 text-yellow-700",
      "electronics": "bg-green-100 text-green-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Handle Add to Cart click
  const handleAddToCart = () => {
    addToCart(product);
    alert(`🛒 Added to cart: ${product.title.substring(0, 40)}...`);
  };

  const gradientColor = getCategoryColor(product.category);
  const badgeColor = getCategoryBadgeColor(product.category);
  const rating = product.rating.rate;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${gradientColor}`}></div>
      
      {/* Product Image */}
      <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
          {product.category}
        </span>
        <h3 className="text-base font-bold text-gray-800 mt-3 line-clamp-2 min-h-[52px] hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {product.description.substring(0, 80)}...
        </p>
        
        {/* Rating Stars */}
        <div className="flex items-center mt-3">
          <div className="flex text-lg">
            {'★'.repeat(fullStars)}
            {hasHalfStar && <span className="text-yellow-400">½</span>}
            {'☆'.repeat(emptyStars)}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.rating.count} reviews)
          </span>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
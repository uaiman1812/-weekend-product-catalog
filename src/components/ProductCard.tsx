import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        <div className="price">${product.price}</div>
        <div className="category">{product.category}</div>
        <button className="add-to-cart">🛒 Add to Cart</button>
      </div>
    </div>
  );
}
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { Product } from '../services/api';

export default function ProductCatalog() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error">
        <div className="error-icon">⚠️</div>
        <h2>Failed to load products</h2>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>🛍️ Our Product Catalog</h1>
          <p className="subtitle">Here's what we have in stock ({products?.length} products)</p>
        </div>
        <div className="cart-icon">
          🛒
          <span className="cart-count">0</span>
        </div>
      </div>

      <div className="products-grid">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <footer className="footer">
        <p>© 2026 ProSensia Store | Powered by FakeStore API</p>
        <p className="credit">⭐ Developed by Umme Aiman — Intern at ProSensia ⭐</p>
      </footer>
    </div>
  );
}
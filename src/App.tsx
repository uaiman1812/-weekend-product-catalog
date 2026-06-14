import { useState, useEffect } from 'react';
import './App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`🛒 Added to cart: ${product.title.substring(0, 40)}...`);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header with Cart */}
      <div className="header">
        <div>
          <h1>🛍️ Our Product Catalog</h1>
          <p className="subtitle">Here's what we have in stock ({products.length} products)</p>
        </div>
        <div className="cart-icon">
          🛒
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </div>

      {/* Cart Items (if any) */}
      {cart.length > 0 && (
        <div className="cart-section">
          <h3>Your Cart ({cart.length} items)</h3>
          <div className="cart-items">
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <span>{item.title.substring(0, 40)}</span>
                <span>${item.price}</span>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </div>
            ))}
            <div className="cart-total">
              Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </div>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <div className="price">${product.price}</div>
              <div className="category">{product.category}</div>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ProSensia Store | Powered by FakeStore API</p>
        <p className="credit">⭐ Developed by Umme Aiman — Intern at ProSensia ⭐</p>
      </footer>
    </div>
  );
}

export default App;
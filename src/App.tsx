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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Our Product Catalog <span className="rq-badge">⚡ React Query</span></h1>
      <p className="subtitle">Here's what we have in stock ({products.length} products)</p>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <div className="price">${product.price}</div>
              <div className="category">{product.category}</div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>© 2026 ProSensia Store | Powered by FakeStore API</p>
        <p className="credit">⭐ Developed by Umme Aiman — Intern at ProSensia ⭐</p>
      </footer>
    </div>
  );
}

export default App;
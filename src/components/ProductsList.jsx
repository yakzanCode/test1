import { useState, useEffect } from 'react';
import { addToCart } from '../utils/firstUtils.js';
import CardComponent from './Card.jsx';
import { div } from 'framer-motion/client';
import { getAllProducts } from '../services/api.js';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/assets/loading.gif" alt="Loading…" className='objectfit-cover w-100 h-100'/>
      </div>
    );
  }
  if (error)   return <p className="text-danger">{error}</p>;

  return (
    <div className='container'>
      <h2 className='text-center mt-2 mb-5'>All Products</h2>
      <div className="row g-2">
        {products.map((product) => (
          <div className='col-md-4 col-6 col-xs-12'>
            <CardComponent
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;

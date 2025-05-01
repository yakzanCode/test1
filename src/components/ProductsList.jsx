import { useState, useEffect } from 'react';
import { addToCart } from '../utils/firstUtils.js';
import CardComponent from './Card';
import { div } from 'framer-motion/client';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/products');
        const response = await fetch('http://localhost:3000/api/products');

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

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

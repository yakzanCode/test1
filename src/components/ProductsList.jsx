import { useState, useEffect } from 'react';
import { addToCart } from '../utils/firstUtils.js';
import CardComponent from './Card';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/products');
        const response = await fetch('https://shop-o510.onrender.com/api/products');

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
      <div className="row">
        {products.map((product) => (
          <CardComponent 
            key={product._id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';
import { addToCart } from '../utils/firstUtils';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://shop-o510.onrender.com/api/products');
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4)); // Show first 4 as featured
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
      <div className="palm palm-top-left">
        <img src="/src/assets/palm-top-left.png" alt="Palm Top Left" />
      </div>
      <div className="palm palm-bottom-left">
        <img src="/src/assets/palm-bottom-left.png" alt="Palm Bottom Left" />
      </div>
      <div className="palm palm-top-right">
        <img src="/src/assets/palm-top-right.png" alt="Palm Top Right" />
      </div>
      <div className="palm palm-bottom-right">
        <img src="/src/assets/palm-bottom-right.png" alt="Palm Bottom Right" />
      </div>

      <div className="hero-content text-center text-white">
        <h1 className="display-1 fw-bold">Celebrate Summer Style</h1>
        <p className="lead">Summer Sale is Here – Up to 50% Off!</p>
        <button className="btn btn-light px-4 py-2">Explore Products</button>
      </div>
    </section>

      {/* Featured Products */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {featuredProducts.map(product => (
            <CardComponent key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="bg-darkred text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">About Us</h2>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            We are passionate about delivering the best online shopping experience. 
            Our mission is to offer high-quality products, fast delivery, and top-notch customer service. 
            Whether you're shopping for essentials or gifts, we make sure you enjoy every click.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container py-5">
        <h2 className="text-center mb-5">What Our Customers Say</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-3">
              <div className="card-body text-center">
                <p className="text-muted">"Fast shipping, amazing quality. I love it!"</p>
                <h6 className="fw-bold mt-3">– Sarah M.</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-3">
              <div className="card-body text-center">
                <p className="text-muted">"Great prices and excellent customer support!"</p>
                <h6 className="fw-bold mt-3">– Ahmed Y.</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow p-3">
              <div className="card-body text-center">
                <p className="text-muted">"My favorite store now. Everything arrived as described."</p>
                <h6 className="fw-bold mt-3">– Lena W.</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';
import { addToCart } from '../utils/firstUtils';
import Slider from 'react-slick';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(`/products`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: false,
    speed: 500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400, // Bootstrap XL (≥1400px)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200, // Bootstrap LG (≥1200px)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
          // centerPadding: "0"
        }
      },
      {
        breakpoint: 992, // Bootstrap MD (≥992px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
          // centerPadding: "70px",
        }
      },
      {
        breakpoint: 768, // Bootstrap SM (≥768px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
          // centerPadding: "80px"
        }
      },
      {
        breakpoint: 576, // Bootstrap XS (≥576px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
          // centerPadding: "20px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
          // centerPadding: "90px"
        }
      }
    ]

  };

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
          <button className="btn text-light py-2 px-4" style={{ backgroundColor: 'cornflowerblue' }} onClick={navigateToProducts}>Explore Products</button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container my-5">
        <div className="text-center">
          <h2>Featured Products</h2>
          <p>Browse Our Products</p>
          <button className="btn text-light py-2 px-4" style={{ backgroundColor: 'cornflowerblue' }} onClick={navigateToProducts}>Explore Products</button>
        </div>
        <div className="row mt-3">
          <Slider {...settings}>
            {featuredProducts.map(product => (
              <CardComponent key={product._id} product={product} addToCart={addToCart} />
            ))}
          </Slider>
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
        <h2 className="text-center mb-5 fw-bold">Happy Customers</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card border-0 bg-body-tertiary p-2" style={{ minHeight: '250px' }}>
              <div className="card-body text-center">
                <i className='bi bi-chat-square-quote-fill fs-1' style={{ color: 'cornflowerblue' }}></i>
                <hr className='my-2' />
                <div className='d-flex' style={{minHeight:'125px'}}>
                  <p className="text-muted m-auto">Fast shipping, amazing quality. I love it!</p>
                </div>
                <hr className='my-2' />
                <small className="text-muted">– Sarah M.</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-body-tertiary p-2" style={{ minHeight: '250px' }}>
              <div className="card-body text-center">
                <i className='bi bi-chat-square-quote-fill fs-1' style={{ color: 'cornflowerblue' }}></i>
                <hr className='my-2' />
                <div className='d-flex' style={{minHeight:'125px'}}>
                  <p className="text-muted m-auto">Great prices and excellent customer support!</p>
                </div>
                <hr className='my-2' />
                <small className="text-muted mt-3">– Ahmed Y.</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 bg-body-tertiary p-2" style={{ minHeight: '250px' }}>
              <div className="card-body text-center">
                <i className='bi bi-chat-square-quote-fill fs-1' style={{ color: 'cornflowerblue' }}></i>
                <hr className='my-2' />
                <div className='d-flex' style={{minHeight:'125px'}}>
                  <p className="text-muted m-auto">My favorite store now. Everything arrived as described.</p>
                </div>
                <hr className='my-2' />
                <small className="text-muted mt-3">– Lena W.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';
import { addToCart } from '../utils/firstUtils';
import Slider from 'react-slick';
import { getAllProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(`/products`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reviews = [
    {
      text: "Fast shipping, amazing quality. I love it!",
      author: "Yujax"
    },
    {
      text: "Great prices and excellent customer support!",
      author: "Pams"
    },
    {
      text: "My favorite store now. Everything arrived as described.",
      author: "Top-G"
    },
    {
      text: "Super fast delivery, just like my pace on the field!",
      author: "Kylian Mbappé"
    },
    {
      text: "Top quality. Reminds me of lifting a trophy!",
      author: "Lionel Messi"
    },
    {
      text: "Amazing service. Like scoring a last-minute winner!",
      author: "Cristiano Ronaldo"
    },
    {
      text: "Perfect experience. 10/10, just like my passing accuracy!",
      author: "Kevin De Bruyne"
    },
    {
      text: "Everything arrived as promised — no VAR check needed!",
      author: "Erling Haaland"
    },
    {
      text: "Feels like winning the Champions League every time I order.",
      author: "Mohamed Salah"
    },
    {
      text: "Brilliant. Solid defense, solid service!",
      author: "Virgil van Dijk"
    },
    {
      text: "Quick, smooth, and reliable — like my dribbling.",
      author: "Neymar Jr."
    },
    {
      text: "Fantastic support! Feels like having the best fans behind me.",
      author: "Robert Lewandowski"
    },
    {
      text: "On time, on point. Just like my goals!",
      author: "Karim Benzema"
    }    
  ];


  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    

  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFeaturedProducts(data.slice(0, 4)); // Show first 4 as featured
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllProducts();
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
        <div className="text-center row">
          <h2>New Collection</h2>
          <p>Browse Our Products</p>
          <div className="text-end fw-semibold btn" style={{ color: 'cornflowerblue', fontSize: '12px'}} onClick={navigateToProducts}>View All <i className='bi bi-arrow-right'></i></div>
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
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index}>
                <div className="card border-0 bg-body-tertiary m-1" style={{ minHeight: '250px' }}>
                  <div className="card-body text-center">
                    <i className='bi bi-chat-square-quote-fill fs-1' style={{ color: 'cornflowerblue' }}></i>
                    <hr className='my-2'/>
                    <div className='d-flex' style={{ minHeight: '125px' }}>
                      <p className="text-muted m-auto">{review.text}</p>
                    </div>
                    <hr className='my-2'/>
                    <small className="text-muted mt-3">– {review.author}</small>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
      </section>

    </div>
  );
}

export default Home;

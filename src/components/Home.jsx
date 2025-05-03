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
        <video className="hero-video" autoPlay muted loop playsInline >
          <source src="/public/assets/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-white">
          <h1 className="display-1 fw-bold">Comfort Meets Style</h1>
          {/* <p className="lead">Comfort you feel. Style you love.</p> */}
          <p className="hero-animated-text fw-semibold">
            <span>Soft</span>
            <span className='mx-1'>| Everyday wear</span>
            <span>| Stylish</span>
          </p>
          <button
            className="btn text-light py-2 px-4"
            style={{ backgroundColor: 'cornflowerblue' }}
            onClick={navigateToProducts}>
            Explore Products
          </button>
        </div>
      </section>


      {/* <div className='card border-0 text-uppercase' style={{ height: '30vh' }}>
        <img alt={cat}
          src="/public/assets/bras.jpg"
          className='w-100 h-100'
          style={{ objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-center text-center text-light fw-bold"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <h5 className='fs-1'>3 for 2 or 2nd -50%</h5>
          <small>--- On Selected {cat}---</small>
        </div>
      </div> */}

      {/* Featured Products */}
      <section className="container my-5">
        <div className="text-center row">
          <h2>New Collection</h2>
          <p>Browse Our Products</p>
          <div className="text-end fw-semibold btn" style={{ color: 'cornflowerblue', fontSize: '12px' }} onClick={navigateToProducts}>View All <i className='bi bi-arrow-right'></i></div>
        </div>
        <div className="row mt-3">
          <Slider {...settings}>
            {featuredProducts.map(product => (
              <CardComponent key={product._id} product={product} addToCart={addToCart} />
            ))}
          </Slider>
        </div>
      </section>

      <div className='card border-0 text-uppercase my-5' style={{ height: '45vh' }}>
        <img
          src="/public/assets/home1.jpg"
          className='w-100 h-100'
          style={{ objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-center text-center text-light fw-bold"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <h5 className='fs-1'>3 for 2 or 2nd -50%</h5>
          <small>--- On Selected items---</small>
        </div>
      </div>

      {/* About Us */}
      <section className="bg-darkred text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="/public/assets/bras3.jpg"
                alt="About our brand"
                className="img-fluid rounded shadow"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="col-md-6 text-center text-md-start">
              <h2 className="fw-bold mb-4">Redefining Comfort & Confidence</h2>
              <p className="lead" style={{ lineHeight: '1.8' }}>
                We’re more than just an online store — we’re a lifestyle brand dedicated to making every woman feel confident, comfortable, and effortlessly stylish.
                From timeless basics to bold statement pieces, every product we offer is crafted with quality and purpose.
              </p>
              <p className="text-muted">
                Join thousands of women who trust us for their everyday essentials — because you deserve comfort that doesn't compromise on style.
              </p>
            </div>
          </div>
        </div>
      </section>


      <div className='card border-0 text-uppercase my-5' style={{ height: '45vh' }}>
        <img
          src="/public/assets/home2.jpg"
          className='w-100 h-100'
          style={{ objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-center text-center text-light fw-bold"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <h5 className='fs-1'>Real reviews. Real style. Real fast delivery.</h5>
          <small>Don’t just take our word for it — hear it from champions</small>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Happy Customers</h2>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index}>
              <div className="card border-0 bg-body-tertiary m-1" style={{ minHeight: '250px' }}>
                <div className="card-body text-center">
                  <i className='bi bi-chat-square-quote-fill fs-1' style={{ color: 'cornflowerblue' }}></i>
                  <hr className='my-2' />
                  <div className='d-flex' style={{ minHeight: '125px' }}>
                    <p className="text-muted m-auto">{review.text}</p>
                  </div>
                  <hr className='my-2' />
                  <small className="text-muted mt-3">– {review.author}</small>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose Us</h2>
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="p-4 bg-body-secondary rounded shadow-sm h-100 hover-effect">
                <i className="bi bi-truck fs-1 text-primary mb-3 d-block"></i>
                <h6 className="fw-semibold">Fast Delivery</h6>
                <p className="small mb-0">Reliable and speedy shipping services.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 bg-body-secondary rounded shadow-sm h-100 hover-effect">
                <i className="bi bi-award fs-1 text-success mb-3 d-block"></i>
                <h6 className="fw-semibold">Top Quality</h6>
                <p className="small mb-0">We guarantee long-lasting, premium products.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 bg-body-secondary rounded shadow-sm h-100 hover-effect">
                <i className="bi bi-arrow-repeat fs-1 text-warning mb-3 d-block"></i>
                <h6 className="fw-semibold">Hassle-Free Returns</h6>
                <p className="small mb-0">Easy return policies for your peace of mind.</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 bg-body-secondary rounded shadow-sm h-100 hover-effect">
                <i className="bi bi-headset fs-1 text-danger mb-3 d-block"></i>
                <h6 className="fw-semibold">24/7 Support</h6>
                <p className="small mb-0">We're here for you, anytime you need us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

export default Home;

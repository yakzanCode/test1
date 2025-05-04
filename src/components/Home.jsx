import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';
import { addToCart } from '../utils/firstUtils';
import Slider from 'react-slick';
import { getAllProducts } from '../services/api';
import { Helmet } from 'react-helmet-async';

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

      <Helmet>
        <title>Comfort Meets Style | Shop New Collection</title>
        <meta name="description" content="Discover stylish and comfortable everyday wear. Explore our latest collection with great offers like 3 for 2 and 50% off your second item!" />
        <meta name="keywords" content="fashion, stylish clothes, comfortable clothing, new collection, offers, shop online, homewear" />
        <link rel="canonical" href="https://yourdomain.com/" />
        <meta property="og:title" content="Comfort Meets Style | Shop New Collection" />
        <meta property="og:description" content="Shop trendy and comfy clothes. Get 3 for 2 or your 2nd item at 50% off. Don’t miss our latest collection!" />
        <meta property="og:image" content="https://yakzancode.github.io/test1/public/assets/home1.jpg" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


      {/* Hero Section */}
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline >
          <source src="https://yakzancode.github.io/test1/public/assets/hero.mp4" type="video/mp4" />
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


      {/* Featured Products */}
      <section className="container-fluid px-5 my-5">
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


      {/* Btw Sections */}
      <div className='card border-0 text-uppercase my-5' style={{ height: '45vh' }}>
        <img
          src="https://yakzancode.github.io/test1/public/assets/home1.jpg"
          className='w-100 h-100'
          style={{ objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-center text-center text-light fw-bold"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <h5 className='fs-1'>3 for 2 or 2nd -50%</h5>
          <small>--- On Selected items---</small>
        </div>
      </div>


      <div className="text-center my-4">
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-4 mb-3">
          <div className="text-center" style={{ fontSize: '8px', width: '50px' }}>
            <i className='bi bi-truck text-darkred'></i>
            <p>PAYMENT ON DELIVERY</p>
          </div>
          <div className='d-flex position-relative mb-2' style={{ fontSize: '7px', width: '70px', height: '50px' }}>
            <div className="rounded-circle d-flex mx-auto bg-darkred text-white" style={{ width: '45px', height: '45px' }}>
              <p className='d-flex m-auto mb-4'>100%</p>
            </div>
            <p className='text-center position-absolute bottom-0 left-0 me-5 bg-body-tertiary mx-auto text-darkred' style={{ width: '72px' }}>QUALITY GUARANTEE</p>
          </div>
          <div className="text-center d-block" style={{ fontSize: '8px', width: '50px' }}>
            <p className="mb-0">PREMIUM</p>
            <i className='bi bi-star-fill text-darkred'></i><i className='bi bi-star-fill text-darkred'></i><i className='bi bi-star-fill text-darkred'></i><i className='bi bi-star-fill text-darkred'></i><i className='bi bi-star-fill text-darkred'></i>
            <p className="mt-1">QUALITY</p>
          </div>
          <div className="text-center" style={{ fontSize: '8px', width: '50px' }}>
            <i className='bi bi-shield-fill-check text-darkred'></i>
            <p>SECURE CHECKOUT</p>
          </div>
        </div>

        <div className='bg-light w-100 btn mx-2 py-2 fw-semibold'>
          Guaranteed safe & secure checkout
        </div>

        <div className='bg-light w-100 btn m-2 py-2'>
          <span className="small text-muted">
            <i className="bi bi-truck text-dark"></i> Buy now to receive between <strong>Tue May 6</strong> - <strong>Thu May 8</strong>
          </span>
        </div>

      </div>



      {/* About Us */}
      <section className="bg-darkred text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://yakzancode.github.io/test1/public/assets/bras3.jpg"
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


      {/* FAQ */}
      <section className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>
        <div className="accordion bg-light" id="faqAccordion">

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
                What is your return policy?
              </button>
            </h2>
            <div id="faqCollapse1" className="accordion-collapse collapse show" aria-labelledby="faqHeading1" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You can return any item within 14 days of delivery. Items must be unworn and in original packaging.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
                What happens to returned items?
              </button>
            </h2>
            <div id="faqCollapse2" className="accordion-collapse collapse" aria-labelledby="faqHeading2" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Returned items are thoroughly inspected. If they’ve been tried on, they’re washed, sanitized, and donated to local charities or shelters. We do not resell used items.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
                How long does shipping take?
              </button>
            </h2>
            <div id="faqCollapse3" className="accordion-collapse collapse" aria-labelledby="faqHeading3" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Orders are processed within 1-2 business days. Shipping takes 3–5 business days depending on your location.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading4">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
                Do you ship internationally?
              </button>
            </h2>
            <div id="faqCollapse4" className="accordion-collapse collapse" aria-labelledby="faqHeading4" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                We currently only ship to countries in the <strong>Middle East</strong>. Shipping fees and delivery times may vary depending on the destination within the region.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading5">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse5" aria-expanded="false" aria-controls="faqCollapse5">
                Can I modify or cancel my order?
              </button>
            </h2>
            <div id="faqCollapse5" className="accordion-collapse collapse" aria-labelledby="faqHeading5" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes, but only if your order hasn’t been processed yet. Contact our support team as soon as possible to make changes or cancellations.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqHeading6">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse6" aria-expanded="false" aria-controls="faqCollapse6">
                What payment methods do you accept?
              </button>
            </h2>
            <div id="faqCollapse6" className="accordion-collapse collapse" aria-labelledby="faqHeading6" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                We currently only accept <strong>Cash on Delivery (COD)</strong>. In some special cases, we also accept payments through <strong>Wish</strong>. Please contact our support team if you have questions about eligible orders.
              </div>
            </div>
          </div>

        </div>
        <div className="container rounded-1 text-center mt-3 bg-light pt-4 pb-5">
          <i className="bi bi-patch-question fs-1 text-darkred"></i> {/* Bootstrap Icon */}
          <h5 className="mt-3">Didn’t find your answer?</h5>
          <p>Our customer support team will be happy to assist you.</p>
          <a
            href="https://wa.me/yourNumberHere"
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white"
            style={{ backgroundColor: 'cornflowerblue' }}
          >
            Chat with us
          </a>
        </div>

      </section>


      {/* Btw Sections */}
      <div className='card border-0 text-uppercase my-5' style={{ height: '45vh' }}>
        <img
          src="https://yakzancode.github.io/test1/public/assets/home2.jpg"
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
        <Slider {...{ ...settings, dots: false }}>
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
                  <small className="text-muted fst-italic mt-3">_ {review.author}</small>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>


      {/* Why Choose Us Section */}
      <section className="border-top ">
        <div className="container-fluid pb-3">
          <div className="row text-center g-4">
            <div className="col-6 col-lg-3">
              <div className="p-4 h-100">
                <i className="bi bi-truck fs-1 text-darkred mb-3 d-block"></i>
                <h6 className="fw-semibold">Fast Delivery</h6>
                <p className="small mb-0">Reliable and speedy shipping services.</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="p-4 h-100">
                <i className="bi bi-award fs-1 text-darkred mb-3 d-block"></i>
                <h6 className="fw-semibold">Top Quality</h6>
                <p className="small mb-0">We guarantee long-lasting, premium products.</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="p-4 h-100">
                <i className="bi bi-arrow-repeat fs-1 text-darkred mb-3 d-block"></i>
                <h6 className="fw-semibold">Hassle-Free Returns</h6>
                <p className="small mb-0">Easy return policies for your peace of mind.</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="p-4 h-100">
                <i className="bi bi-headset fs-1 text-darkred mb-3 d-block"></i>
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

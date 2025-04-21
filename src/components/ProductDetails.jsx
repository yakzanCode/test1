import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  getCart,
  findInCart,
  addToCart,
  updateCartItem
} from '../utils/firstUtils';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [showAddedMsg, setShowAddedMsg] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const increment = () => {
    if (!selectedSize) {
      // Optionally, show a message or just return
      return;
    }
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (inCart) {
      updateCartItem(product._id, newQty);
    }
  };

  const decrement = () => {
    if (!selectedSize) {
      // Optionally, show a message or just return
      return;
    }
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);

      if (inCart) {
        updateCartItem(product._id, newQty);
      }
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400, // Bootstrap XL (≥1400px)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 1200, // Bootstrap LG (≥1200px)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: "0"
        }
      },
      {
        breakpoint: 1050, // Bootstrap MD (≥992px)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 885, // Bootstrap MD (≥992px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "70px",
        }
      },
      {
        breakpoint: 780, // Bootstrap SM (≥768px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "40px"
        }
      },
      {
        breakpoint: 720, // Bootstrap SM (≥768px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "80px"
        }
      },
      {
        breakpoint: 600, // Bootstrap SM (≥768px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px"
        }
      },
      {
        breakpoint: 550, // Bootstrap XS (≥576px)
        settings: {
          slidesToShow: 2, // To show part of next card
          slidesToScroll: 2,
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 480, // Smaller devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "0"
        }
      }
    ]

  };



  useEffect(() => {
    const fetchProduct = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`https://shop-o510.onrender.com/api/products/${id}`);
        const data = await response.json();

        if (data) {
          setProduct(data);

          const found = findInCart(data._id);
          if (found) {
            setInCart(true);
            setQuantity(found.quantity || 1);
          } else {
            setQuantity(1);
          }

          // Fetch similar products by name, excluding this product's ID
          const similarRes = await fetch(
            `https://shop-o510.onrender.com/api/products/similar?name=${encodeURIComponent(data.name)}&id=${data._id}`
          );
          const similarData = await similarRes.json();
          setSimilarProducts(similarData);

          // Fetch recommended products
          const recommendedRes = await fetch(
            `https://shop-o510.onrender.com/api/products/category/${data.category}`
          );
          const recommendedData = await recommendedRes.json();
          setRecommendedProducts(recommendedData);

          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const productWithSize = { ...product, selectedSize }; // Include selected size with product

    // Correctly passing the product object with size and quantity
    addToCart(productWithSize, quantity);
    setInCart(true);
    setShowAddedMsg(true);
    setTimeout(() => setShowAddedMsg(false), 2000);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const emptyStars = totalStars - filledStars;

    const stars = [
      ...Array(filledStars).fill(<i className="bi bi-star-fill text-darkred"></i>),
      ...Array(emptyStars).fill(<i className="bi bi-star text-darkred"></i>)
    ];

    return stars;
  };

  if (loading) return <p className="text-center my-5">Loading product details...</p>;
  if (!product) return <p className="text-center my-5">Product not found.</p>;

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <h5 className='mt-3'>{product.name.toUpperCase()}</h5>
          <img
            loading="lazy"
            src={`https://yakzancode.github.io/test1/src/assets/${product.image}`}
            alt={product.name}
            className="img-fluid rounded-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6 p-0">
          <p className="text-secondary p-2">{product.description}</p>

          <div className="d-flex bg-body-tertiary my-4" style={{ padding: '14px 0 7px 0' }}>
            {product.price !== undefined &&
              product.price !== 0 &&
              product.price !== product.priceAfterSale && (
                <h6 className="text-muted text-decoration-line-through ms-2">
                  {product.price.toFixed(2)}$
                </h6>
              )}
            <h6 className="mx-1">${product.priceAfterSale.toFixed(2)}</h6>
            {product.salePercent !== undefined &&
              product.salePercent !== 0 && (
                <div className="d-flex border border-dark mx-2" style={{ width: '50px', height: '17px', fontSize: '10px', marginTop: '1px', borderRadius: '2px' }}>
                  <span className="m-auto">save {product.salePercent}%</span>
                </div>
              )}
            <h6 className="fw-bold ms-auto me-2">
              {renderStars(product.rating)}
              <span className="text-secondary"> {product.reviewsCount}</span>
            </h6>
          </div>

          <div className='p-2'>
            {/* Similar Products (Product Image Boxes) */}
            <div className="mb-4">
              <h6>Available Colors:</h6>
              <div className="d-flex flex-wrap justify-content-start gap-2">
                {similarProducts.length > 0 ? (
                  similarProducts.map((similarProduct) => (
                    <div
                      key={similarProduct._id}
                      className="product-image-box"
                      onClick={() => navigate(`/product/${similarProduct._id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        loading="lazy"
                        src={`https://yakzancode.github.io/test1/src/assets/${similarProduct.image}`}
                        alt={similarProduct.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'contain',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                        }}
                      />
                      <p className='text-center fw-bold'>{similarProduct.color}</p>
                    </div>
                  ))
                ) : (
                  <div
                    className="product-image-box"
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      loading="lazy"
                      src={`https://yakzancode.github.io/test1/src/assets/${product.image}`}
                      alt={product.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {product.sizes?.length > 0 && (
              <div>
                <h6>Available Sizes:</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`btn btn-sm ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {/* Quantity Controls */}
            <button
              className="btn border mt-4 mb-3 w-100 d-flex justify-content-between"
              disabled={!selectedSize}
            >
              <i onClick={decrement} className="bi bi-dash"></i>
              <span>{quantity}</span>
              <i onClick={increment} className="bi bi-plus"></i>
            </button>

            {/* Add to Cart Button */}
            <button className="btn btn-dark w-100 mb-2"
              disabled={loading || (!selectedSize && product.sizes?.length > 0)}
              onClick={handleAddToCart}>
              <h6 className="m-0 py-2">
                <i className="bi bi-bag-fill"></i> Add to Cart
              </h6>
            </button>
            {!selectedSize && product.sizes?.length > 0 && (
              <div className="invalid-feedback d-block mt-1">
                Please select a size before adding to cart.
              </div>
            )}
            {showAddedMsg && (
              <div className="alert alert-success mt-2 p-2 py-1" style={{ fontSize: '0.9rem' }}>
                Added to cart!
              </div>
            )}
          </div>

        </div>

      </div>
      <div className="my-5 row">
        <h5 className='text-center'>SIMILAR PRODUCTS</h5>
        <p className='text-muted text-center mb-5'>Customers who view this prodcut also viewed</p>
        {recommendedProducts.length > 0 && (
          <Slider {...settings}>
            {recommendedProducts.slice(0, 5).map((recommendedProduct) => (

              <div key={recommendedProduct._id} className="recommended-card bg-body-tertiary text-center">
                <img className='mx-auto' src={`https://yakzancode.github.io/test1/src/assets/${recommendedProduct.image}`} alt={recommendedProduct.name} />
                <h6 className='mb-auto'>{recommendedProduct.name}</h6>
                <div className='mb-2'>
                  {recommendedProduct.price != null &&
                    recommendedProduct.priceAfterSale != null &&
                    recommendedProduct.priceAfterSale < recommendedProduct.price && (
                      <s className="text-danger me-2">{recommendedProduct.price} €</s>
                    )}
                  {recommendedProduct.priceAfterSale != null && (
                    <span>{recommendedProduct.priceAfterSale} €</span>
                  )}
                </div>
                <button className='btn btn-outline-dark w-100 rounded-pill' onClick={() => navigate(`/product/${recommendedProduct._id}`)}>View</button>
              </div>

            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

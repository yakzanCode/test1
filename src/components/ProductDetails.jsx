import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCart,
  isInCart,
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

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (inCart) {
      updateCartItem(product._id, newQty);
      // Instead of reloading the page, you can just update the state
      const updatedCart = getCart();
      const found = findInCart(product._id);
      if (found) {
        setQuantity(found.quantity);
      }
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (inCart) {
        updateCartItem(product._id, newQty);
        const updatedCart = getCart();
        const found = findInCart(product._id);
        if (found) {
          setQuantity(found.quantity);
        }
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const response = await fetch(`https://shop-o510.onrender.com/api/products/${id}`);
        const data = await response.json();
        console.log('Fetched product:', data._id);

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
            // `http://localhost:3000/api/products/similar?name=${encodeURIComponent(data.name)}&id=${data._id}`
            `https://shop-o510.onrender.com/products/similar?name=${encodeURIComponent(data.name)}&id=${data._id}`

          );
          const similarData = await similarRes.json();
          setSimilarProducts(similarData);

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
    if (inCart) {
      navigate('/cart');
    } else {
      addToCart({ ...product, quantity });
      setInCart(true);
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Number of filled stars
    const emptyStars = totalStars - filledStars; // Number of empty stars

    // Create an array of filled and empty star icons
    const stars = [
      ...Array(filledStars).fill(<i className="bi bi-star-fill text-pink"></i>),
      ...Array(emptyStars).fill(<i className="bi bi-star text-pink"></i>)
    ];

    return stars;
  };

  if (loading) return <p className="text-center my-5">Loading product details...</p>;
  if (!product) return <p className="text-center my-5">Product not found.</p>;

  return (
    <div className="container-fluid py-4">
      <button onClick={() => navigate(-1)} className="btn btn-light my-2">
        ← Back
      </button>
      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}

      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded-3"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h3>{product.name.toUpperCase()}</h3>
          <p className="text-secondary">{product.description}</p>

          <div className="my-3 d-flex">
            {product.price !== undefined &&
              product.price !== 0 &&
              product.price !== product.priceAfterSale && (
                <h5 className="fs-5 text-muted text-decoration-line-through">
                  {product.price.toFixed(2)}$
                </h5>
              )}
            <h3 className="fs-5 mx-1">${product.priceAfterSale.toFixed(2)}</h3>
            <div className='d-flex p-0 border border-dark my-1' style={{ width: '50px', height: '17px', fontSize: '10px' }}> <span className='p-0 m-0 m-auto'>save {product.salePercent}%</span> </div>
          </div>

          <div className="fw-bold" style={{ fontSize: '15px' }}>
            <span
              className="text-secondary"
              style={{
                border: 'none',
                borderRadius: '4px',
                padding: '0px 4px',
                background:
                  'linear-gradient(to right,rgba(233, 88, 144, 0.71),rgba(233, 88, 144, 0.25),rgba(233, 88, 144, 0))'
              }}
            >
              {product.salesCount} items sold <i className="bi bi-fire text-pink"></i>
            </span>
            <span className="float-end">
              {/* {product.rating} */}
              {renderStars(product.rating)}
              <span className='text-secondary'> {product.reviewsCount}</span>
            </span>
          </div>


          {/* Similar Products (Product Image Boxes) */}
          <div className="mt-4">
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
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                      }}
                    />
                  </div>
                ))
              ) : (
                <div
                  className="product-image-box"
                  onClick={() => navigate(`/product/${product._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={product.image}
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

          {/* Quantity Controls */}
          <button className="btn border mt-4 w-100 d-flex justify-content-between">
            <i
              onClick={decrement}
              className="bi bi-dash"
            ></i>
            <span>{quantity}</span>
            <i
              onClick={increment}
              className="bi bi-plus"
            ></i>
          </button>

          {/* Add/View Cart Button */}
          <button className="btn btn-dark w-100 mt-2" disabled={loading} onClick={handleAddToCart}>
            <h6 className="m-0 py-2">
              <i className="bi bi-bag-fill"></i> {inCart ? 'View in Cart' : 'Add to Cart'}
            </h6>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

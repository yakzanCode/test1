// CardComponent.js
import { React, useEffect, useState } from 'react';
import { findInCart, isInCart } from '../utils/firstUtils.js';
import { useNavigate } from 'react-router-dom';

function CardComponent({ product }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  // Check if the product is already in the cart on mount
  useEffect(() => {
    const found = findInCart(product._id);
    if (found) {
      setQuantity(found.quantity);
    }
  }, [product._id]);

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };


  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Number of filled stars
    const emptyStars = totalStars - filledStars; // Number of empty stars

    // Create an array of filled and empty star icons
    const stars = [
      ...Array(filledStars).fill(<i className="bi bi-star-fill text-darkred"></i>),
      ...Array(emptyStars).fill(<i className="bi bi-star text-darkred"></i>)
    ];

    return stars;
  };

  // const handleAddToCart = (e) => {
  //   e.stopPropagation(); // Prevent triggering handleViewDetails

  //   if (inCart) {
  //     handleViewDetails();
  //   } else {
  //     addToCart({ ...product, quantity });
  //     setInCart(true);
  //   }
  // };

  return (


    <div className="col-md-4 col-6 col-xs-12 mb-4" onClick={handleViewDetails}>
      <div className="card border-0">
        <img
          loading="lazy"
          src={`https://yakzancode.github.io/test1/src/assets/${product.image}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain', cursor: 'pointer' }}
        />
        <div className="card-body">
          <p className="card-text m-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}</p>
          <div className="my-2 fw-bold d-flex" style={{ fontSize: '15px' }}>
            {product.price !== undefined &&
              product.price !== 0 &&
              product.price !== product.priceAfterSale && (
                <h5 className="fs-6 text-muted text-decoration-line-through">
                  {product.price.toFixed(2)}$
                </h5>
              )}
            <h5 className="fs-6 mx-1">{product.priceAfterSale.toFixed(2)}$</h5>
          </div>
          <button className="w-100 btn btn-white shadow text-darkred"
          style={{color:"cornflowerblue"}}
            onClick={handleViewDetails}>
            <h6 className="m-0 py-2">
              <i className="bi bi-bag-fill me-1"></i>
              {isInCart(product._id) ? `View Details (${quantity})` : 'Add to Cart'}
            </h6>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

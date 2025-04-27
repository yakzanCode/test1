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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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


    <div className="card border-0 p-3 m-1 bg-body-tertiary text-center" onClick={handleViewDetails} style={{ height: '350px' }} >
      <img
        loading="lazy"
        src={`https://yakzancode.github.io/test1/src/assets/${product.image}`}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'contain', cursor: 'pointer' }}
      />
      <h6 className="mb-auto">{product.name}</h6>
      <div className="mb-2 text-center mx-auto" style={{ fontSize: '15px' }}>
        {product.price !== null &&
          product.price !== 0 &&
          product.price !== product.priceAfterSale && (
            <s className="text-danger">{product.price.toFixed(2)}$</s>
          )}
        {product.priceAfterSale != null && (
          <span>{product.priceAfterSale.toFixed(2)}$</span>
        )}
      </div>
      <button className="w-100 btn btn-outline-dark rounded-pill"
        style={{ color: "cornflowerblue" }}
        onClick={handleViewDetails}>
        <h6 className="m-0 py-1">
          <i className="bi bi-bag-fill me-1"></i>
          {isInCart(product._id) ? `View Details (${quantity})` : 'Add to Cart'}
        </h6>
      </button>
    </div>
  );
}

export default CardComponent;

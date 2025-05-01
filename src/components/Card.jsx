// CardComponent.js
import { React, useEffect, useState } from 'react';
import { findInCart, isInCart } from '../utils/firstUtils.js';
import { useNavigate } from 'react-router-dom';
// import '../index.css';

function CardComponent({ product }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

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


  return (


    <div className="card border-0 p-3 m-1 bg-body-tertiary text-center" style={{ height: '350px' }} >
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
      <button className="w-100 btn"
        style={{ color: "cornflowerblue", border: '2px solid cornflowerblue' }}
        onClick={handleViewDetails}>
        <h6 className="m-0 py-1">
          <i className="bi bi-bag-fill me-1"></i>
          {isInCart(product._id) ? `View Cart (${quantity})` : 'View Product'}
        </h6>
      </button>
    </div>
  );
}

export default CardComponent;

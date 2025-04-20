// CardComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardComponent({ product, addToCart }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
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

  return (


    <div className="col-md-4 col-6 col-xs-12 mb-4" onClick={handleViewDetails}>
      <div className="card border-0">
        <img
          src={`https://yakzancode.github.io/test1/src/assets/${product.image}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain', cursor: 'pointer' }}
        />
        <div className="card-body">
          <p className="card-text m-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
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
          <button className='w-100 btn btn-dark'>
            <i className="bi bi-bag-fill" onClick={() => addToCart(product)}></i> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

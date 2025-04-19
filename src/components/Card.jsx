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
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'contain', cursor: 'pointer' }}
        />
        <div className="card-body">
          <p className="card-text text-muted m-0 fw-semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
          <div className=" mt-2 d-flex" style={{ fontSize: '15px' }}>
            <h5 className="card-title fw-bold fs-6">{product.price}$</h5>
            {/* <i className='ms-auto bi bi-fire text-danger'></i>{product.salesCount} items sold */}
            <i className="bi bi-cart4 text-secondary float-end p-0 ms-auto" role='button' onClick={() => addToCart(product)}></i>
          </div>
          <div className='mt-1'>
            {renderStars(product.rating)}
            <span className='text-secondary'> {product.reviewsCount}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default CardComponent;

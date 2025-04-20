import React, { useEffect, useState } from 'react';
import PlaceOrder from './placeOrder';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const updateCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  };

  useEffect(() => {
    updateCart();
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Handle increasing quantity
  const handleIncreaseQuantity = (product) => {
    const updatedCart = cart.map(i =>
      i._id === product._id && i.selectedSize === product.selectedSize
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (product) => {
    const updatedCart = cart.map(item =>
      item._id === product._id && item.quantity > 1 && item.selectedSize === product.selectedSize
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter(item => !(item._id === product._id && item.selectedSize === product.selectedSize));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  return (
    <div className="p-3">
      <h4 className="mt-3 mb-4 text-center">Your Cart</h4>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {cart.map((item) => (
              <div key={`${item._id}-${item.selectedSize}`} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2 position-relative">
                <img loading="lazy" src={`https://yakzancode.github.io/test1/src/assets/${item.image}`}
                  alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div className="flex-grow-1 mx-3">
                  <h6 className="mb-0">{item.name}</h6>
                  <small>{`${item.color} / ${item.selectedSize}`}</small><br />
                  <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                </div>
                <div className="btn-group mt-auto">
                  <i onClick={() => handleDecreaseQuantity(item)}
                    className="bi bi-dash py-0 px-2 btn btn-outline-secondary"></i>
                  <span className="btn py-0 px-2 btn-outline-secondary">{item.quantity}</span>
                  <i onClick={() => handleIncreaseQuantity(item)}
                    className="bi bi-plus py-0 px-2 btn btn-outline-secondary"></i>
                </div>
                <i className="bi bi-trash position-absolute top-0 end-0 me-1" onClick={() => handleRemoveFromCart(item)} role='button'></i>
              </div>
            ))}
          </div>

          <div className="text-end pt-2">
            <h5>Total: ${cartTotal.toFixed(2)}</h5>
          </div>

          <PlaceOrder cart={cart} cartTotal={cartTotal} />
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useEffect, useState } from 'react';
import { increaseQuantity, decreaseQuantity, removeFromCart, sendOrderViaWhatsApp } from '../utils/firstUtils'; // Import sendOrderViaWhatsApp

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [orderSent, setOrderSent] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    location: '',
    phone: '',
    notes: ''
  });
  const [formError, setFormError] = useState('');

  const updateCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  };

  useEffect(() => {
    updateCart();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSendOrder = () => {
    const result = sendOrderViaWhatsApp(form, cart, cartTotal);
    if (result === 'Please fill in all required fields.') {
      setFormError(result);
    } else {
      setOrderSent(true);
    }
  };

  // Handle increasing quantity
  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(cart, itemId);
    updateCart(); // Update cart from localStorage
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(cart, itemId);
    updateCart(); // Update cart from localStorage
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(cart, itemId);
    updateCart(); // Update cart from localStorage
  };


  return (
    <div className="p-3">
      <h4 className="mt-3 mb-4 text-center">Your Cart</h4>

      {orderSent && (
        <div className="alert alert-success">
          ✅ Order sent successfully! You can follow up via WhatsApp.
        </div>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {cart.map((item) => (
              <div key={item._id} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2 position-relative">
                <img loading="lazy" src={`https://yakzancode.github.io/test1/src/assets/${item.image}`}
                  alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div className="flex-grow-1 mx-3">
                  <h6 className="mb-1">{item.title}</h6>
                  <small>{item.name}</small><br />
                  <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                </div>
                <div className="btn-group mt-auto">
                  <i onClick={() => handleDecreaseQuantity(item._id)}
                    className="bi bi-dash py-0 px-2 btn btn-outline-secondary"></i>
                  <span className="btn py-0 px-2 btn-outline-secondary">{item.quantity}</span>
                  <i onClick={() => handleIncreaseQuantity(item._id)}
                    className="bi bi-plus py-0 px-2 btn btn-outline-secondary"></i>
                </div>
                <i className="bi bi-trash position-absolute top-0 end-0 me-1" onClick={() => handleRemoveFromCart(item._id)} role='button'></i>
              </div>
            ))}
          </div>

          <div className="text-end pt-2">
            <h5>Total: ${cartTotal.toFixed(2)}</h5>
          </div>

          {/* User Info Form */}
          <div className="mt-4">
            <h5>Customer Info</h5>
            {formError && <div className="alert alert-danger">{formError}</div>}
            <div className="row">
              <div className="col-md-6 mb-2">
                <input type="text" name="firstName" className="form-control" placeholder="First Name *" value={form.firstName} onChange={handleInputChange} />
              </div>
              <div className="col-md-6 mb-2">
                <input type="text" name="lastName" className="form-control" placeholder="Last Name *" value={form.lastName} onChange={handleInputChange} />
              </div>
              <div className="col-12 mb-2">
                <input type="text" name="location" className="form-control" placeholder="Location *" value={form.location} onChange={handleInputChange} />
              </div>
              <div className="col-12 mb-2">
                <input type="text" name="phone" className="form-control" placeholder="Phone (optional)" value={form.phone} onChange={handleInputChange} />
              </div>
              <div className="col-12 mb-3">
                <textarea name="notes" className="form-control" placeholder="Notes (optional)" rows="2" value={form.notes} onChange={handleInputChange}></textarea>
              </div>
              <div className="col-12 text-end">
                <button className="btn btn-pink text-white" style={{ backgroundColor: 'palevioletred' }} onClick={handleSendOrder}>
                  Send Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

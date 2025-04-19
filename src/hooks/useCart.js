// hooks/useCart.js
import { useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem } from '../utils/cartUtils';

export const useCart = (product) => {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  // Listen for cart changes and update the component state
  useEffect(() => {
    const cart = getCart();
    const found = cart.find(item => item._id === product?._id);

    if (found) {
      setInCart(true); // Mark as in the cart
      setQuantity(found.quantity || 1); // Set quantity to the found item's quantity
    } else {
      setInCart(false); // Mark as not in the cart
      setQuantity(1); // Reset quantity to 1
    }
  }, [product]);

  // Function to handle adding/updating the cart
  const handleAddToCart = () => {
    if (inCart) {
      // If the product is already in the cart, update its quantity
      updateCartItem(product._id, quantity);
    } else {
      // If the product is not in the cart, add it
      addToCart(product, quantity);
    }
    setInCart(true); // Mark the product as in the cart after adding
  };

  return {
    quantity,
    inCart,
    setQuantity,
    handleAddToCart,
  };
};

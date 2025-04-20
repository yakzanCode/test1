// Save to localStorage and reload
export const updateCartInLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  // window.location.reload();
};

// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Update cart item in localStorage
export const updateCartItem = (productId, selectedSize, quantity) => {
  const cart = getCart().map(item =>
    item._id === productId && item.selectedSize === selectedSize ? { ...item, quantity } : item
  );
  updateCartInLocalStorage(cart);
};

// Find item in cart by product ID
export const findInCart = (productId) => {
  const cart = getCart();
  return cart.find(item => item._id === productId);
};

// Check if product is in cart
export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some(item => item._id === productId);
};

// Increase quantity of product in cart
export const increaseQuantity = (cart, productId, size) => {
  const updatedCart = cart.map(item =>
    item._id === productId && item.selectedSize === size ? { ...item, quantity: item.quantity + 1 } : item
  );
  updateCartInLocalStorage(updatedCart);
};

// Decrease quantity of product in cart
export const decreaseQuantity = (cart, productId, size) => {
  const updatedCart = cart
    .map(item =>
      item._id === productId && item.quantity > 1 && item.selectedSize === size
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);
  updateCartInLocalStorage(updatedCart);
};

// Remove product from cart
export const removeFromCart = (cart, productId, size) => {
  const updatedCart = cart.filter(item => !(item._id === productId && item.selectedSize === size));
  updateCartInLocalStorage(updatedCart);
};

// Add product to cart
export const addToCart = (product, quantity = 1) => {
  const existingCart = getCart();

  const itemIndex = existingCart.findIndex(item =>
    item._id === product._id &&
    item.selectedSize === product.selectedSize
  );

  if (itemIndex !== -1) {
    existingCart[itemIndex].quantity += quantity;
  } else {
    existingCart.push({ ...product, quantity });
  }

  updateCartInLocalStorage(existingCart);
};

// Send order via WhatsApp
export const sendOrderViaWhatsApp = (form, cart, cartTotal) => {
  const { firstName, lastName, location, phone, notes } = form;

  // Validate required fields
  if (!firstName || !lastName || !location) {
    return 'Please fill in all required fields.';
  }

  // Format cart items for message
  const productLines = cart.map(
    (item, index) =>
      `${index + 1}. ${item.name} (*${item.selectedSize || ''}*) × *${item.quantity}* = $${(item.quantity * (item.price || 0)).toFixed(2)}`
  ).join('\n');

  // Construct WhatsApp message
  const message = `
🔴🔴🔴   *New Order*   🔴🔴🔴

👤 Name: ${firstName} ${lastName}

📍 Location: ${location}

📞 Phone: ${phone || '-----------------'}

📝 Notes: ${notes || '-----------------'}
——————————————————
🧾 Order:
${productLines}
——————————————————
💰 Total: $${cartTotal.toFixed(2)}
  `.trim();

  // Send message via WhatsApp
  const phoneNumber = '4915753368747';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
  return true; // Success after opening WhatsApp
};

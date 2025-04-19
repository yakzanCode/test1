// Save to localStorage and reload
export const updateCartInLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
};

// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Update cart item in localStorage
export const updateCartItem = (productId, quantity) => {
  const cart = getCart().map(item =>
    item._id === productId ? { ...item, quantity } : item
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
export const increaseQuantity = (cart, productId) => {
  const updatedCart = cart.map(item =>
    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
  );
  updateCartInLocalStorage(updatedCart);
};

// Decrease quantity of product in cart
export const decreaseQuantity = (cart, productId) => {
  const updatedCart = cart
    .map(item =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);
  updateCartInLocalStorage(updatedCart);
};

// Remove product from cart
export const removeFromCart = (cart, productId) => {
  const updatedCart = cart.filter(item => item._id !== productId);
  updateCartInLocalStorage(updatedCart);
};

// Add product to cart
export const addToCart = (product) => {
  const existingCart = getCart();
  const itemIndex = existingCart.findIndex(item => item._id === product._id);

  if (itemIndex !== -1) {
    existingCart[itemIndex].quantity += 1;
  } else {
    existingCart.push({ ...product, quantity: 1 });
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
      `${index + 1}. ${item.name}(${item.name}) × ${item.quantity} = $${(item.quantity * item.price).toFixed(2)}`
  ).join('%0A');

  // Construct WhatsApp message
  const message = `
🛒 *New Order*%0A
👤 Name: ${firstName} ${lastName}%0A
📍 Location: ${location}%0A
📞 Phone: ${phone || 'N/A'}%0A
📝 Notes: ${notes || 'None'}%0A%0A
🧾 Order:%0A${productLines}%0A
💰 Total: $${cartTotal.toFixed(2)}
  `.trim();

  // Send message via WhatsApp
  const phoneNumber = '4915753368747';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
  return true; // Success after opening WhatsApp
};

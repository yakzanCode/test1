// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://shop-o510.onrender.com/api';


const fetchData = async (endpoint, method = 'GET', body = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json();
};

// API calls
export const getProductsByCategory = (category) =>
  fetchData(`/products/category/${category}`);

export const getAllProducts = () =>
  fetchData('/products');

export const getCategories = () =>
  fetchData('/products/categories');

export const getProductById = (id) =>
  fetchData(`/products/${id}`);

export const getSimilarProducts = (name, id) =>
  fetchData(`/products/similar?name=${encodeURIComponent(name)}&id=${id}`);

export const getRecommendedProducts = (category) =>
    fetchData(`/products/category/${category}`);


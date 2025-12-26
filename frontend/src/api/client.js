import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = (search, category) => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  return client.get('/products', { params });
};

export const getCategories = () => {
  return client.get('/products/categories');
};

export const getProduct = (id) => {
  return client.get(`/products/${id}`);
};

export const getCart = (sessionId) => {
  return client.get('/cart', {
    params: { sessionId },
  });
};

export const addToCart = (sessionId, productId, quantity) => {
  return client.post('/cart/add', { productId, quantity }, {
    params: { sessionId },
  });
};

export const removeFromCart = (sessionId, productId) => {
  return client.delete(`/cart/${productId}`, {
    params: { sessionId },
  });
};

export const getCartTotal = (sessionId) => {
  return client.get('/cart/total', {
    params: { sessionId },
  });
};

export const clearCart = (sessionId) => {
  return client.delete('/cart', {
    params: { sessionId },
  });
};

export const createOrder = (sessionId, customerName, customerEmail, customerPhone, totalAmount, items) => {
  return client.post('/orders', {
    customerName,
    customerEmail,
    customerPhone,
    totalAmount,
    items,
  }, {
    params: { sessionId },
  });
};

export const getOrderHistory = (sessionId) => {
  return client.get('/orders/history', {
    params: { sessionId },
  });
};

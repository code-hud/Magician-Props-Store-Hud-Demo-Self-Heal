import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Checkout({ onBackToShop }) {
  const { cart, cartTotal, checkoutOrder } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '555-0123',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const order = await checkoutOrder(
        formData.customerName,
        formData.customerEmail,
        formData.customerPhone,
      );

      setOrderConfirmed(true);
      setTimeout(() => {
        onBackToShop();
      }, 3000);
    } catch (error) {
      // Error is already handled and displayed by error banner in StoreContext
    } finally {
      setIsLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="checkout-container">
        <div className="order-confirmed">
          <div className="success-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase.</p>
          <p>You will be redirected to the shop shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Billing Information</h3>

            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email *</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerPhone">Phone Number *</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.product_id} className="order-item">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onBackToShop}
              className="cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="place-order-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

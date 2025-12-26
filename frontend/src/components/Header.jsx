import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Header({ currentPage, onPageChange }) {
  const { cart, cartTotal } = useStore();

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => onPageChange('shop')}>
          🎩 Magician Props Store
        </h1>

        <nav className="nav">
          <button
            className={`nav-btn ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={() => onPageChange('shop')}
          >
            Shop
          </button>
          <button
            className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => onPageChange('cart')}
          >
            Cart ({cart.length})
          </button>
        </nav>

        <div className="header-right">
          <button
            className="cart-icon-btn"
            onClick={() => onPageChange('cart')}
            title="View Cart"
          >
            🛒 ${cartTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </header>
  );
}

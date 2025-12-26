import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import ErrorBanner from './components/ErrorBanner';
import Search from './components/Search';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const AppContent = () => {
  const { loading, error, setError } = useStore();
  const [currentPage, setCurrentPage] = useState('shop');

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      <ErrorBanner error={error} onDismiss={handleDismissError} />

      {currentPage === 'shop' && (
        <>
          <Search />
          {loading ? <div className="loading">Loading products...</div> : <ProductList />}
        </>
      )}

      {currentPage === 'cart' && <Cart onCheckout={() => setCurrentPage('checkout')} />}

      {currentPage === 'checkout' && <Checkout onBackToShop={() => setCurrentPage('shop')} />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

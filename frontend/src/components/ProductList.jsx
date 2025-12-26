import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

export default function ProductList() {
  const { paginatedProducts, products, currentPage, totalPages } = useStore();

  if (!products || products.length === 0) {
    return <div className="no-products">No products found. Try a different search.</div>;
  }

  return (
    <div className="products-container">
      <div className="products-info">
        <p className="products-count">
          Showing {paginatedProducts.length} of {products.length} products (Page {currentPage} of {totalPages})
        </p>
      </div>
      <div className="products-grid">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

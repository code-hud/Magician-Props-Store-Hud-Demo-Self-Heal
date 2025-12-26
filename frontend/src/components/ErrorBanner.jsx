import React, { useEffect } from 'react';

const ErrorBanner = ({ error, onDismiss }) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(onDismiss, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, onDismiss]);

  // Always render banner for debugging
  return (
    <div style={{ minHeight: '40px' }}>
      {error ? (
        <div className={`error-banner ${error.type === 'server' ? 'error-banner-server' : ''}`}>
          <span>{`${error.type === 'server' ? 'Server Error ' : ''}${error.status ? `(${error.status})` : ''}: ${error.message}`.trim()}</span>
          <button className="error-banner-close" onClick={onDismiss}>
            ×
          </button>
        </div>
      ) : (
        <div style={{ visibility: 'hidden', height: '0px' }}></div>
      )}
    </div>
  );
};

export default ErrorBanner;

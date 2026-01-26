import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Catch-all for uncaught errors during boot
window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.error('App Load Error:', msg, error);
  return false;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical: Could not find root element.");
}
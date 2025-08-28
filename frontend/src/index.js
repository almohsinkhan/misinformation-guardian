import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'; // Your i18n setup
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}> {/* Wrap App with I18nextProvider */}
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => console.log('SW registered:', registration))
      .catch((error) => console.log('SW registration failed:', error));
  });
}

reportWebVitals();
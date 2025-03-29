
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Ensure DOM is loaded before mounting the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();

// Log that the app has been mounted successfully
console.log('FarmWise application mounted successfully - Build version 9');

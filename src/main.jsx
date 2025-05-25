import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css'; // <-- MUITO IMPORTANTE! PRIMEIRO!
import App from './App';
import './App.css'; // <-- Nosso CSS vem depois

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
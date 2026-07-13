import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Account from './pages/Account';
import Quote from './pages/Quote';
import StaticPage from './pages/StaticPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="quote" element={<Quote />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="industries" element={<StaticPage />} />
          <Route path="services" element={<StaticPage />} />
          <Route path="about" element={<StaticPage />} />
          <Route path="quality" element={<StaticPage />} />
          <Route path="capabilities" element={<StaticPage />} />
          <Route path="careers" element={<StaticPage />} />
          <Route path="contact" element={<StaticPage />} />
          <Route path="privacy" element={<StaticPage />} />
          <Route path="terms" element={<StaticPage />} />
          <Route path="iso" element={<StaticPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import Receipt from '../pages/Receipt';

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/menu" />} />
  <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

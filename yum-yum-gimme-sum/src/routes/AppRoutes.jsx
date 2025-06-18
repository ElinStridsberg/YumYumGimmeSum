// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Menu from '../features/menu/Menu';
import Cart from '../features/cart/Cart';
import Order from '../features/order/Order';
import Receipt from '../features/receipt/Receipt';

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

// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Menu from '../features/menu/Menu';
import Cart from '../features/cart/Cart';
import Order from '../features/order/Order';
import Receipt from '../features/receipt/Receipt';
import ETA from '../features/eta/Eta';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/eta" element={<ETA />} />

    </Routes>
  );
}

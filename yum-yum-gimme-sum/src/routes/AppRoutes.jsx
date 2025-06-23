// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Menu from '../features/menu/Menu';
import Cart from '../features/order/Order';
import Receipt from '../features/receipt/Receipt';
import ETA from '../features/eta/Eta';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<Cart />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/eta" element={<ETA />} />

    </Routes>
  );
}

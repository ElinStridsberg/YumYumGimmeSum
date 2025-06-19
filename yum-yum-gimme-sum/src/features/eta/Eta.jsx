import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ETA() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!order) return;
    const eta = new Date(order.eta).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, eta - now);
      setTimeLeft(Math.ceil(diff / 60000));
      if (diff <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [order]);

  if (!order) return <p>Ingen order</p>;

  return (
    <main className="eta">
      <h1>DINA WONTONS TILLAGAS!</h1>
      <p>ETA: {timeLeft} MIN</p>
      <p>Ordernummer: {order.id}</p>
      <button onClick={() => navigate('/receipt', { state: { order } })}>
        SE KVITTO
      </button>
    </main>
  );
}

export default ETA;

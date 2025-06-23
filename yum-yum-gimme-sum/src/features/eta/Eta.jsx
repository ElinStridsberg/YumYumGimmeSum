import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ETA() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [etaMinutes, setEtaMinutes] = useState(0);

  useEffect(() => {
    if (order?.eta) {
      const etaTime = new Date(order.eta).getTime();
      const now = Date.now();
      const diffMin = Math.ceil((etaTime - now) / 60000);
      setEtaMinutes(diffMin);
    }
  }, [order]);

  if (!order) return <p>Ingen order hittades.</p>;

  return (
    <main className="eta-screen" style={{ backgroundColor: '#4f4b4a', color: 'white', padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
      <div className="logo" style={{ marginBottom: '1rem' }}>YYGS</div>
      <img src="/box.png" alt="Wonton-låda" style={{ maxWidth: '200px', margin: '1rem auto' }} />
      <h1>DINA WONTONS TILLAGAS!</h1>
      <p>ETA {etaMinutes} MIN</p>
      <p style={{ fontFamily: 'monospace' }}>#{order.id}</p>

      <button
        style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#111', color: '#fff', width: '100%', fontWeight: 'bold' }}
        onClick={() => navigate('/cart')}
      >
        GÖR EN NY BESTÄLLNING
      </button>

      <button
        style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#d9d9d9', color: '#222', width: '100%', fontWeight: 'bold' }}
        onClick={() => navigate('/receipt', { state: { order } })}
      >
        SE KVITTO
      </button>
    </main>
  );
}

export default ETA;

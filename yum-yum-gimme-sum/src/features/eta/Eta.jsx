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
      const diffMin = Math.max(0, Math.ceil((etaTime - now) / 60000));
      setEtaMinutes(diffMin);
    }
  }, [order]);

  if (!order) return <p>Ingen order hittades.</p>;

  return (
    <main className="eta-screen">
      <div className="eta-logo">
        <img src="../logo.png" alt="Yum Yum Gimme Sum" className="eta-logo-image" />
      </div>
      <img src="../wonton.png" alt="Wonton-låda" className="eta-image" />
      <h1 className="eta-heading">DINA WONTONS TILLAGAS!</h1>
      <p className="eta-text">ETA {etaMinutes} MIN</p>
      <p className="eta-code">#{order.id}</p>
  
      <div className="eta-buttons">
        <button className="eta-btn btn-primary" onClick={() => navigate('/menu')}>
          GÖR EN NY BESTÄLLNING
        </button>
        <button className="eta-btn btn-secondary" onClick={() => navigate('/receipt', { state: { order } })}>
          SE KVITTO
        </button>
      </div>

    </main>
  );
  
}

export default ETA;

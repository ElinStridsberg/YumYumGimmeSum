import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) return <div>Inget ordernummer angivet</div>;

  const { id, items, timestamp, eta, orderValue, state } = order;

  return (
    <main className="receipt-screen">
      <div className="eta-logo">
        <img src="../logo.png" alt="YYGS logga" className="eta-logo-image" />
      </div>
  
      <div className="receipt-box">
  <img src="../logo2.png" alt="logga" className="receipt-box-logo" />
  <div className='receipt-box-header'>
    <h2>Kvitto</h2>
    <p className="order-id">#{id}</p>
  </div>

  <div className="receipt-items">
    {items.map((item, index) => (
      <div key={`${item.id}-${index}`} className="receipt-row">
        <div className="receipt-line">
          <span className="item-name">{item.name.toUpperCase()}</span>
          <span className="item-price">{item.price * item.quantity} SEK</span>
        </div>
        <div className="item-qty">{item.quantity} stycken</div>
      </div>
    ))}
  </div>



</div>
<div className="receipt-total">
  <div className="total-line">
    <div className="label-wrap">
      <span className="label">Totalt</span>
      <p className="moms">inkl 20% moms</p>
    </div>
    <span className="value">{orderValue} SEK</span>
  </div>
</div>

      <button className="eta-btn btn-primary" onClick={() => navigate('/')}>
        GÖR EN NY BESTÄLLNING
      </button>
    </main>
  );
  
  
  
}

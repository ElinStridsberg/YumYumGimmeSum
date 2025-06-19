import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Receipt() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <div>Inget ordernummer angivet</div>;

  const { id, items, timestamp, eta, orderValue, state } = order;

  return (
    <main>
      <h1>Kvitto</h1>
      <p>Ordernummer: {id}</p>
      <p>Beställningstid: {new Date(timestamp).toLocaleTimeString()}</p>
      <p>ETA: {new Date(eta).toLocaleTimeString()}</p>
      <p>Status: <strong>{state}</strong></p>
      <p>Totalt värde: {orderValue} SEK</p>

      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.name} × {item.quantity} = {item.price * item.quantity} SEK
          </li>
        ))}
      </ul>
    </main>
  );
}

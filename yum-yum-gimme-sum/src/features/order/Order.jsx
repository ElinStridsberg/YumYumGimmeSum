import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateTenantMutation, usePlaceOrderMutation } from '../tenant/tenantSlice';
import { clearCart } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const [tenant, setTenant] = useState(null);
  const apiKey = useSelector((state) => state.auth.apiKey);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createTenant] = useCreateTenantMutation();
  const [placeOrder, { error: orderError }] = usePlaceOrderMutation();

  useEffect(() => {
    const initTenant = async () => {
      const stored = localStorage.getItem('tenant');
      if (stored) {
        setTenant(JSON.parse(stored));
        return;
      }

      const result = await createTenant('ElinsFoodtruck');

      if ('error' in result) {
        if (result.error?.data === 'A Tenant with given name already exists.') {
          const existing = { id: 'ElinsFoodtruck', name: 'ElinsFoodtruck' };
          setTenant(existing);
          localStorage.setItem('tenant', JSON.stringify(existing));
        } else {
          console.error('Fel vid skapande av tenant:', result.error);
          alert(`Kunde inte skapa tenant: ${result.error?.data || 'Okänt fel'}`);
        }
      } else {
        setTenant(result.data);
        localStorage.setItem('tenant', JSON.stringify(result.data));
      }
    };

    initTenant();
  }, [createTenant]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!tenant?.id || cartItems.length === 0) {
      alert('Kunde inte lägga beställning. Kontrollera API-nyckel och varukorg.');
      return;
    }

    const order = {
      items: cartItems.flatMap(({ id, quantity }) => Array(quantity).fill(id)),
    };

    try {
      const result = await placeOrder({ tenantId: tenant.id, order }).unwrap();
      dispatch(clearCart());
      navigate('/eta', { state: { order: result.order } });
    } catch (err) {
      console.error('Orderfel:', err);
      alert(`Kunde inte lägga beställning: ${err?.data?.message || 'Okänt fel'}`);
    }
  };

  if (!tenant) return <p>Hämtar tenant...</p>;

  return (
    <main>
      <h1>Beställning</h1>
      <p>Foodtruck: {tenant.name}</p>
      <ul>
        {cartItems.map(({ id, name, price, quantity }) => (
          <li key={id}>
            {name} × {quantity} = {price * quantity} SEK
          </li>
        ))}
      </ul>
      <p>
        <strong>Totalt: {totalPrice} SEK</strong>
      </p>
      <button onClick={handleOrder}>Bekräfta beställning</button>
      {orderError && <p style={{ color: 'red' }}>Fel vid beställning</p>}
    </main>
  );
}

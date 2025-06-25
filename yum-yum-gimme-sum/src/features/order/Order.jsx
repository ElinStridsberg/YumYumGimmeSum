import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useCreateTenantMutation, usePlaceOrderMutation } from '../tenant/tenantSlice';
import Cart from '../cart/Cart';

function Order() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);

  const [createTenant] = useCreateTenantMutation();
  const [placeOrder] = usePlaceOrderMutation();

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

  const handleOrder = async () => {
    if (!tenant?.id || items.length === 0) {
      alert('Kunde inte lägga beställning. Kontrollera API-nyckel och varukorg.');
      return;
    }

    const order = {
      items: items.flatMap(({ id, quantity }) => Array(quantity).fill(id)),
    };

    try {
      const result = await placeOrder({ tenantId: tenant.id, order }).unwrap();
      dispatch(clearCart());
      navigate('/eta', { state: { order: { ...result.order, items } } });
    } catch (err) {
      console.error('Orderfel:', err);
      alert(`Kunde inte lägga beställning: ${err?.data?.message || 'Okänt fel'}`);
    }
  };

  if (items.length === 0) {
    return (
      <main className="order-wrapper">
        <div className="empty-cart">
          <h2>Din varukorg är tom.</h2>
          <p>Gå tillbaka till menyn</p>
          <img
            src="/arrow.png"
            alt="Tom varukorg"
            className="arrowEmptyCart"
            onClick={() => navigate('/menu')}
          />
        </div>
      </main>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="order-wrapper">
      <div className="cart-header-bar">
        <img src="/arrow.png" alt="Tillbaka" className="nav-icon left" onClick={() => navigate('/menu')} />
        <img src="/cart-icon.png" alt="Varukorg" className="nav-icon right" />
      </div>

      <Cart items={items} />

      <div className="order-footer">
        <div className="order-total-bar">
          <span>TOTALT</span>
          <span>{totalPrice} SEK</span>
        </div>
        <button className="cart-order-btn" onClick={handleOrder}>
          TAKE MY MONEY!
        </button>
      </div>
    </main>
  );
}

export default Order;

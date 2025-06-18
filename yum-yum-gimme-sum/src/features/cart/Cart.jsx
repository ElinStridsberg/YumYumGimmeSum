import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, decrementItem, clearCart } from '../cart/cartSlice';

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <main className="cart-wrapper">
        <h1>Min beställning</h1>
        <p>Din varukorg är tom.</p>
      </main>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="cart-wrapper">
      <h1>Min beställning</h1>
      <ul className="cart-list">
        {items.map(({ id, name, price, quantity }) => (
          <li key={id} className="cart-item">
            <span className="cart-item-name">{name}</span>
            <span className="dots"></span>
            <span className="cart-item-price">{price * quantity} SEK</span>
            <div className="cart-item-actions">
              <button className="btn" onClick={() => dispatch(decrementItem(id))}>-</button>
              <span>{quantity}</span>
              <button className="btn" onClick={() => dispatch(addItem({ id, name, price }))}>+</button>
              <button className="btn btn-remove" onClick={() => dispatch(removeItem(id))}>Ta bort</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Totalt</span>
        <span className="total-price">{totalPrice} SEK</span>
      </div>
      <button className="cart-order-btn">TAKE MY MONEY!</button>
    </main>
  );
}

export default Cart;

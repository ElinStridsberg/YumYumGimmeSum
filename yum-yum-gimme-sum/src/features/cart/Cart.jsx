// src/features/cart/Cart.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, decrementItem, removeItem } from './cartSlice';

function Cart({ items }) {
  const dispatch = useDispatch();

  if (items.length === 0) return null;

  return (
    <ul className="order-list">
      {items.map(({ id, name, price, quantity }) => (
        <li key={id} className="order-item">
          <span className="item-name">{name.toUpperCase()} × {quantity}</span>
          <span className="dots"></span>
          <span className="item-price">{price * quantity} SEK</span>
          <div className="item-actions">
            <button className="btn btn-qty" onClick={() => dispatch(decrementItem(id))}>−</button>
            <button className="btn btn-qty" onClick={() => dispatch(addItem({ id, name, price }))}>+</button>
            <button className="btn btn-remove" onClick={() => dispatch(removeItem(id))}>🗑</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Cart;

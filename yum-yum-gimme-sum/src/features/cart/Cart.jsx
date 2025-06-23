// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addItem, removeItem, decrementItem, clearCart } from '../cart/cartSlice';
// import { useNavigate } from 'react-router-dom';
// function Cart() {
//   const items = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Definiera navigate

//   if (items.length === 0) {
//     return (
//       <main className="cart-wrapper">
//         <h1>Min beställning</h1>
//         <p>Din varukorg är tom.</p>
//       </main>
//     );
//   }

  
//   const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  
//   return (
//     <main className="cart-wrapper">
//       <h1>Min beställning</h1>
//       <ul className="cart-list">
//   {items.map(({ id, name, price, quantity }) => (
//     <li key={id} className="cart-item-line">
//       <span className="cart-item-name">{name}</span>
//       <span className="dots"></span>
//       <span className="cart-item-price">{price * quantity} SEK</span>
//     </li>
//   ))}
// </ul>
// <div className='buttons'>
//   <div className="cart-total">
//     <span>TOTALT</span>
//     <span className="total-price">{totalPrice} SEK</span>
//   </div>

//   <button className="cart-order-btn" onClick={() => navigate('/order')}>
//     TAKE MY MONEY!
//   </button>
// </div>
//        </main>
//   );
// }

// export default Cart;

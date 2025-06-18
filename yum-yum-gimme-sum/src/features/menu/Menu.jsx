import React from 'react';
import { useGetMenuQuery } from '../../app/apiSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

import '../../styles/styles.css'; // CSS för styling

export default function Menu() {
  const apiKey = useSelector(state => state.auth.apiKey);
  const cartItemsCount = useSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const { data: menu, error, isLoading } = useGetMenuQuery(undefined, {
    skip: !apiKey,
  });
  const dispatch = useDispatch();


  if (!apiKey) return <div>Laddar API-nyckel...</div>;
  if (isLoading) return <div>Laddar menyn...</div>;
  if (error) return <div>Ett fel uppstod vid hämtning av menyn</div>;

  const menuItems = menu?.items ?? [];

  return (
    <main>
      <div className="menu-header-bar">
        <img src="/logo.png" alt="Yum Yum Gimme Sum" className="logo" />
        <Link to="/cart" className="cart-icon-wrapper">
          <img src="/cart-icon.png" alt="Varukorg" />
          {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
        </Link>
      </div>

      <div className="menu-wrapper">
        <h1>MENY</h1>
        <div className="menu-list">
          {menuItems.length === 0 && <p>Ingen meny tillgänglig</p>}
          {menuItems.map(({ id, name, description, price, ingredients }) => (
            <article key={id} className="menu-card">
              <div className="menu-header">
                <div className="menu-name">{name}</div>
                <div className="price">{price} SEK</div>
              </div>
              <p className="menu-description">{description}</p>
              <div className="menu-tags">
              {Array.isArray(ingredients) ? (
  <>
    {ingredients.map((ingredient, i) => (
      <span key={i} className="menu-tag">{ingredient}</span>
    ))}
    <button onClick={() => dispatch(addItem({ id, name, price }))}>
      +
    </button>
  </>
) : (
  <span>Inga ingredienser tillgängliga</span>
)}

              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
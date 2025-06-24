import React from 'react';
import { useGetMenuQuery } from '../../app/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem } from '../cart/cartSlice';
import '../../styles/styles.css';

export default function Menu() {
  const apiKey = useSelector(state => state.auth.apiKey);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemsCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const { data: menu, error, isLoading } = useGetMenuQuery(undefined, { skip: !apiKey });
  const dispatch = useDispatch();

  if (!apiKey) return <div>Laddar API‑nyckel…</div>;
  if (isLoading) return <div>Laddar menyn…</div>;
  if (error) return <div>Ett fel uppstod vid hämtning av menyn</div>;

  const items = menu?.items ?? [];
  const mains = items.filter(item => item.type === 'wonton');
  const sauces = items.filter(item => item.type === 'dip');
  const drinks = items.filter(item => item.type === 'drink');

  const renderMainItem = ({ id, name, price, ingredients }) => {
    const cartItem = cartItems.find(ci => ci.id === id);

    return (
      <article
        key={id}
        className={`menu-card clickable${cartItem ? ' selected' : ''}`}
        onClick={() =>
          cartItem ? dispatch(removeItem(id)) : dispatch(addItem({ id, name, price }))
        }
      >
        <div className="menu-header">
          <div className="menu-name">{name.toUpperCase()}</div>
          <div className="price">{price} SEK</div>
        </div>
        <div className="menu-tags">
          {Array.isArray(ingredients)
            ? ingredients.map((ing, i) => (
                <span key={i} className="menu-tag">
                  {ing}
                  {i < ingredients.length - 1 ? ', ' : ''}
                </span>
              ))
            : <span className="menu-tag">Inga ingredienser</span>}
        </div>
        {cartItem && <span className="menu-check">✔</span>}
      </article>
    );
  };

  const renderSimpleGrid = (items, sectionTitle, price) => (
    <>
      <div className="simple-grid-header">
        <h2 className="section-title">{sectionTitle}</h2>
        <span className="grid-price">{price} SEK</span>
      </div>
      <div className="simple-grid">
        {items.map(({ id, name, price }) => {
          const isSelected = cartItems.some(ci => ci.id === id);
          return (
            <span
              key={id}
              className={`grid-item ${isSelected ? 'selected' : ''}`}
              onClick={() =>
                isSelected ? dispatch(removeItem(id)) : dispatch(addItem({ id, name, price }))
              }
            >
              {name.toLowerCase()}
            </span>
          );
        })}
      </div>
    </>
  );

  return (
    <main>
      <div className="menu-header-bar">
        <img src="/logo.png" alt="Yum Yum Gimme Sum" className="logo" />
        <Link to="/order" className="cart-icon-wrapper">
          <img src="/cart-icon.png" alt="Varukorg" />
          {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
        </Link>
      </div>

      <div className="menu-wrapper">
        <h1>MENY</h1>
        <div className="menu-list">
          {mains.map(renderMainItem)}

          {sauces.length > 0 &&
            renderSimpleGrid(sauces, 'DIPSÅS', 19)}

          {drinks.length > 0 &&
            renderSimpleGrid(drinks, 'DRICKA', 25)}
        </div>
      </div>
    </main>
  );
}

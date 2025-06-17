import React from 'react';
import { useGetMenuQuery } from '../app/apiSlice';
import { useSelector } from 'react-redux';

export default function Menu() {
  const apiKey = useSelector(state => state.auth.apiKey);

  const { data: menu, error, isLoading } = useGetMenuQuery(undefined, {
    skip: !apiKey,
  });

  if (!apiKey) return <div>Laddar API-nyckel...</div>;
  if (isLoading) return <div>Laddar menyn...</div>;
  if (error) return <div>Ett fel uppstod vid hämtning av menyn</div>;

  const menuItems = menu?.items ?? [];

  return (
    <main>
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
                  ingredients.map((ingredient, i) => (
                    <span key={i} className="menu-tag">{ingredient}</span>
                  ))
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

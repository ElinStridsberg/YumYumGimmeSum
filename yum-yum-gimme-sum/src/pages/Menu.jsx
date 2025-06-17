import React from "react";

const sampleMenu = [
  {
    id: 1,
    name: "Karlstad",
    description: "koriander, vitlökssås, morot, krispig lök",
    price: 9,
    tags: ["sweet chili", "thai", "vegetarisk"],
  },
  {
    id: 2,
    name: "Bangkok",
    description: "mango, srirachamayo, chili, koriander",
    price: 9,
    tags: ["spicy", "sweet & sour", "glutenfri"],
  },
  {
    id: 3,
    name: "Ho Chi Minh",
    description: "kål, vitlök, hoisinsås, ingefära, räka",
    price: 9,
    tags: ["sweet", "sour", "glutenfri"],
  },
  {
    id: 4,
    name: "Paris",
    description: "kål, chévro, honung, basilika, valnöt",
    price: 9,
    tags: ["vegetarisk"],
  },
  {
    id: 5,
    name: "Oaxaca",
    description: "majá, tomat, rostad vitlök, chili",
    price: 19,
    tags: ["spicy", "sweet & sour", "glutenfri"],
  },
];

export default function Menu() {
  return (
    <main>
      <h2>Meny</h2>
      <div className="menu-list">
        {sampleMenu.map(({ id, name, description, price, tags }) => (
          <article key={id} className="menu-card">
            <div className="menu-header">
              <div className="menu-name">{name}</div>
              <div className="price">{price} SEK</div>
            </div>
            <p className="menu-description">{description}</p>
            <div className="menu-tags">
              {tags.map((tag, i) => (
                <span key={i} className="menu-tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Menu() {
  const products = [
    {
      id: 1,
      name: "KARLSTAD",
      desc: "koriander, vitlökssås, morot, krispig lök",
      price: 9
    },
    {
      id: 2,
      name: "BANGKOK",
      desc: "mango, srirachamayo, chili, koriander",
      price: 9
    }
  ];

  return (
    <main className="menu">
      <h2>Meny</h2>
      <section className="menu-list compact">
        {products.map((item) => (
          <article key={item.id} className="menu-card dark">
            <div className="menu-header">
              <h3>{item.name}</h3>
              <span>{item.price} SEK</span>
            </div>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Menu;

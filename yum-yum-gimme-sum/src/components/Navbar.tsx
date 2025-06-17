import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee", display: "flex", gap: "1rem" }}>
      <Link to="/">Hem</Link>
      <Link to="/menu">Meny</Link>
      <Link to="/cart">Varukorg</Link>
      <Link to="/order">Beställ</Link>
      <Link to="/receipt">Kvitto</Link>
    </nav>
  );
}

export default Navbar;

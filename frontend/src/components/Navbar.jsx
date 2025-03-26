import './Navbar';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Tienda Virtual</h1>
      <div className="navbar-links">
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
};
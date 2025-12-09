import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const NavBar = () => {
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi tiendita deportiva</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/category/Ropa">Ropa</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/Calzado">Calzado</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/Suplementos">Suplementos</NavLink>
            </li>

            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin Panel</NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="text-white text-decoration-none position-relative">
              <FaShoppingCart size={20} />
              {totalQuantity() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-light small">Hola, {user.email}</span>
                <button onClick={logout} className="btn btn-outline-light btn-sm">Salir</button>
              </div>
            ) : (
              <Link to="/login" className="text-white">
                <FaUser size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
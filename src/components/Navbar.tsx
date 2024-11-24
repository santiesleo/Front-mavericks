import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Importar RootState
import { ShoppingCart } from 'lucide-react';
import '../styles/navbar.css';
import logo from '../img/logo_2.png';

function NavBar() {
  // Usar useSelector para acceder al estado del carrito en Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calcular la cantidad total de productos en el carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Estado para manejar la visibilidad del menú desplegable
  const [menuVisible, setMenuVisible] = useState(false);

  // Manejar clic fuera del menú para cerrarlo
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#user-menu-toggle') && !target.closest('#user-menu')) {
        setMenuVisible(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="nav_i py-5 box-border">
      <div className="container box-border mx-auto flex items-center justify-between">
        {/* Menú izquierdo */}
        <div className="flex space-x-10">
          <a className="init text-lg" href="#Iniciar sesión">
            Inicio
          </a>
          <a className="order text-lg" href="#Hacer pedido">
            Hacer pedido
          </a>
          <a className="order text-lg" href='#Ordenes'>
            Ordenes
          </a>
          <a className="contact text-lg" href="#contacto">
            Contacto
          </a>
        </div>

        {/* Logo */}
        <div>
          <img className="w-48" src={logo} alt="Logo" />
        </div>

        {/* Menú derecho */}
        <div className="flex items-center space-x-10">
          {/* Icono de Carrito con contador */}
          <Link to="/cart" className="text-lg flex items-center relative">
            <ShoppingCart className="hover:text-[#ff7359]" />
            {totalItems > 0 && (
              <span className="cart-count absolute top-0 right-0 bg-red-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <a className="init text-lg" href="#Iniciar_sesion">
            Iniciar sesión
          </a>
          <a className="register text-lg" href="#Registrarse">
            Registrarse
          </a>

          {/* Menú de usuario */}
          <div className="relative">
            <img
              id="user-menu-toggle"
              className="w-20 rounded-full cursor-pointer"
              src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              alt="perfil"
              onClick={() => setMenuVisible(!menuVisible)}
            />
            {menuVisible && (
              <div
                id="user-menu"
                className="dropdown-menu absolute left-0 mt-2 bg-white shadow-lg rounded-lg text-gray-700"
              >
                <a href="#info" className="block px-4 py-2 hover:bg-gray-200">
                  Información
                </a>
                <a href="#logout" className="block px-4 py-2 hover:bg-gray-200">
                  Cerrar sesión
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

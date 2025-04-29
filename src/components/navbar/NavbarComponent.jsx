import ParrotLogo from "../../assets/brand/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ButtonComponent from "../button/ButtonComponent";
import { signout } from "../../pages/utils/auth";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);

  // Actualiza la ruta activa cuando cambie la ubicación
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Definicion de los elementos de navegación
  const navItems = [
    { path: "/pos", label: "Nueva venta", style: "primary" },
    { path: "/reports", label: "Ver reporte diario", style: "primary" },
    { path: "/", label: "Cerrar sesión", style: "secondary" },
  ];

  // Función de navegación para usar con los botones
  const handleNavigation = (path) => {
    if (path === "/") {
      signout();
      console.log("Sesión cerrada");
    }
    navigate(path);
  };

  return (
    <nav className="w-full shadow p-4 bg-black text-white">
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Logo y botón de menú */}
        <div className="flex justify-between items-center">
          <img
            src={ParrotLogo}
            alt="Parrot Logo"
            className="h-10 self-center"
          />

          {/* Botón de menú para móvil */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              // Icono X cuando el menú está abierto
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              // Icono de hamburguesa cuando está cerrado
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Menú de navegación */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col space-y-2 mt-4 md:mt-0 md:flex md:flex-row md:space-y-0 md:space-x-2`}
        >
          {navItems.map((item, index) => (
            <ButtonComponent
              key={index}
              size="md"
              style={activePath === item.path ? item.style : "secondary"}
              className="w-full md:w-auto"
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </ButtonComponent>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;

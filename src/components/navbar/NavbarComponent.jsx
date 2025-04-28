import ParrotLogo from "../../assets/brand/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ButtonComponent from "../button/ButtonComponent";
import { signout } from "../../pages/utils/auth";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("/");

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
    <nav className="w-full shadow p-4 flex justify-between bg-black text-white">
      <img src={ParrotLogo} alt="Parrot Logo" className="h-10  self-center" />
      <div className="">
        {navItems.map((item, index) => (
          <ButtonComponent
            key={index}
            size="md"
            style={activePath === item.path ? item.style : "secondary"}
            className={index > 0 ? "ml-2" : ""}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </ButtonComponent>
        ))}
      </div>
    </nav>
  );
};

export default NavbarComponent;

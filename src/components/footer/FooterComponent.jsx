import ParrotLogo from "../../assets/brand/logo.png";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="w-full shadow p-4 bg-black text-gray-400">
      <div className="w-full border-t border-gray-400 pt-2">
        {/* En móvil: elementos apilados verticalmente y centrados */}
        {/* En desktop: elementos en fila con espacio entre ellos */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-3 md:mb-0">
            <img
              src={ParrotLogo}
              alt="Parrot Logo"
              className="h-8 mx-auto md:mx-0"
            />
          </div>

          <p className="text-center md:text-right text-xs sm:text-sm">
            &#169;2025 Parrot Software | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

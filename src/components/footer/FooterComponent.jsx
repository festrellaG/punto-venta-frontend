import ParrotLogo from "../../assets/brand/logo.png";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="w-full shadow p-4 flex flex-col items-center bg-black text-gray mt-auto">
      <div className="w-3/4 border-t border-gray-400 mb-4 flex justify-between pt-2">
        <img src={ParrotLogo} alt="Parrot Logo" className="h-6  self-center" />
        <p className="self-center">
          &#169;2025 Parrot Software | Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;

import React, { useState, useEffect } from "react";

const SelectArticuloComponent = ({
  label,
  placeholder,
  className,
  onChange,
  articulos = [],
  required,
  resetKey = 0,
}) => {
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  // Efecto que reiniciará el estado cuando cambie resetKey
  useEffect(() => {
    setSelectedArticulo(null);
  }, [resetKey]);

  const handleSelectArticulo = (articulo) => {
    setSelectedArticulo(articulo);
    if (onChange) {
      onChange(articulo);
    }
  };

  return (
    <div className={className}>
      <label className="block text-start mb-2">{label}</label>
      <select
        className="border border-gray-300 rounded p-2 w-full cursor-pointer"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const articulo = articulos.find((a) => a.idArticulo === selectedId);
          handleSelectArticulo(articulo);
        }}
        value={selectedArticulo?.idArticulo || ""}
        required={required}
      >
        <option value="" disabled className="text-gray-600">
          {placeholder}
        </option>
        {articulos.map((articulo) => (
          <option
            key={articulo.idArticulo}
            value={articulo.idArticulo}
            className="text-black"
          >
            {articulo.nombreArticulo} - ${articulo.precio} MXN
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectArticuloComponent;

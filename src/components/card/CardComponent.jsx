import React from "react";
import { useState, useEffect } from "react";

const CardComponent = ({
  card,
  onHandleDetailCustomer,
  details,
  activeDetailId,
  setActiveDetailId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Determinar si esta tarjeta debe mostrar detalles basado en activeDetailId
  const isActive = activeDetailId === card.idArticulo;

  // Efecto para resetear el loading cuando cambia el estado activo
  useEffect(() => {
    if (!isActive) {
      setIsLoading(false);
    }
  }, [isActive]);

  function handleDetailCustomer() {
    if (isActive) {
      // Si ya está activo, cerrarlo
      setActiveDetailId(null);
    } else {
      // Si no está activo, cargar los detalles y activarlo
      setIsLoading(true);
      onHandleDetailCustomer(card.idArticulo, card.fechaOrden);
      setActiveDetailId(card.idArticulo);

      // Desactivar el loading después de un tiempo
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  // Filtrar detalles para mostrar solo los relacionados con este artículo
  const filteredDetails = details
    ? details.filter((detail) => detail.idArticulo === card.idArticulo)
    : [];

  return (
    <div className="border rounded border-gray-300">
      <div>
        <p className="text-md p-4 text-xl rounded-t bg-gray-200 text-black font-bold">
          Artículo: {card.nombreArticulo} - Precio: ${card.precio}.00 MXN
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 mb-4">
          <button
            onClick={handleDetailCustomer}
            className={`underline cursor-pointer ${
              isActive
                ? "text-blue-800 font-semibold"
                : "text-blue-600 hover:text-blue-800"
            }`}
            disabled={isLoading}
          >
            {isLoading
              ? "Cargando..."
              : isActive
              ? "Ocultar Clientes"
              : "Ver Clientes"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-light">Cantidad vendida </h2>
          <h2 className="text-end ">{card.cantidadTotal}pz</h2>
          <h2 className="text-xl ">Total: </h2>
          <h2 className="text-xl font-bold text-end">
            ${card.precioTotal}.00 MXN
          </h2>
        </div>
      </div>
      {isActive && (
        <div className="mt-4 border-t pt-2">
          <h4 className="font-bold mb-2 px-4">Detalle por cliente:</h4>

          {isLoading ? (
            <p className="text-gray-500 text-center py-2">
              Cargando detalles...
            </p>
          ) : filteredDetails.length > 0 ? (
            <ul className="max-h-40 overflow-y-auto px-4 pb-4">
              {filteredDetails.map((detail, idx) => (
                <li key={idx} className="text-sm py-1 border-b">
                  <div className="flex justify-between">
                    <span className="font-medium">{detail.nombreComensal}</span>
                    <span>{detail.cantidad} pz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{detail.fechaOrden}</span>
                    <span className="font-medium">
                      ${detail.costoTotal} MXN
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-2">
              No hay detalles disponibles
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardComponent;

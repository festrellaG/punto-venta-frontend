import { useState, useEffect, useRef } from "react";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import SelectArticuloComponent from "../../components/selected/SelectArticuloComponent";
import FooterComponent from "../../components/footer/FooterComponent";

const PosPage = (props) => {
  const [comensal, setComensal] = useState("");
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);
  const [resetSelectKey, setResetSelectKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar formulario cuando cambien los valores
  useEffect(() => {
    if (comensal && selectedArticulo && cantidad && Number(cantidad) > 0) {
      // Calcular subtotal
      setTotal(
        selectedArticulo && cantidad
          ? selectedArticulo.precio * Number(cantidad)
          : 0
      );
      setFormValid(true);
    } else {
      setTotal(0);
      setFormValid(false);
    }
  }, [comensal, selectedArticulo, cantidad]);

  function handleChangeComensal(e) {
    setComensal(e.target.value);
  }

  function handleChangeArticulo(articulo) {
    setSelectedArticulo(articulo);
  }

  function handleChangeCantidad(e) {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setCantidad(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formValid && !isSubmitting) {
      setIsSubmitting(true); // Activar spinner

      try {
        // Esperar a que se complete la operación
        await props.onSubmitOrder({
          comensal,
          articulo: selectedArticulo,
          cantidad,
          total,
        });

        // Resetear hooks
        setComensal("");
        setSelectedArticulo(null);
        setCantidad(0);
        setTotal(0);
        setFormValid(false);

        // Incrementar el resetKey para forzar el reset del select
        setResetSelectKey((prev) => prev + 1);

        // Resetear el formulario completo
        formRef.current.reset();
      } catch (error) {
        console.error("Error al crear la orden:", error);
        // Aquí podrías mostrar un mensaje de error
      } finally {
        setIsSubmitting(false); // Desactivar spinner independientemente del resultado
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavbarComponent></NavbarComponent>
      <div className="flex-grow flex justify-center">
        <div className="w-200 p-8">
          <h1 className="text-4xl font-medium">Nueva venta</h1>
          <form ref={formRef} className="mt-8" onSubmit={handleSubmit}>
            <InputComponent
              className="mt-4"
              label="Cliente"
              placeholder="Ingresa el nombre del comensal"
              type="text"
              onChange={handleChangeComensal}
              disabled={isSubmitting}
              required
            ></InputComponent>

            <SelectArticuloComponent
              className="mt-4 col-span-2"
              label="Artículo"
              placeholder="Selecciona un artículo"
              articulos={props.articulos}
              onChange={handleChangeArticulo}
              disabled={isSubmitting}
              required
              resetKey={resetSelectKey} // Pasar el key para forzar reset
            />

            <InputComponent
              className="mt-4 col-span-2 "
              label="Cantidad"
              placeholder="Cantidad"
              type="number"
              onChange={handleChangeCantidad}
              disabled={isSubmitting}
              required
            ></InputComponent>

            {formValid && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <h2 className="font-light">Subtotal</h2>
                <h2 className="text-end font-bold">
                  (x{cantidad}) ${selectedArticulo.precio} MXN
                </h2>

                <h2 className="text-2xl font-light">Total</h2>
                <h2 className="text-2xl text-end font-bold">${total} MXN</h2>
              </div>
            )}

            <ButtonComponent
              className="mt-8 w-full"
              size="md"
              style={formValid ? "primary" : "disabled"}
              type="submit"
              disabled={!formValid}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creando orden...
                </div>
              ) : (
                "Crear orden"
              )}
            </ButtonComponent>
          </form>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default PosPage;

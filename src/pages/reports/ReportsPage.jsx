import { useState, useEffect, useRef } from "react";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import CardsComponent from "../../components/card/CardComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import FooterComponent from "../../components/footer/FooterComponent";
import PopupComponent from "../../components/popup/PopupComponent";
import iconError from "../../assets/iconError.png";

const ReportsPage = (props) => {
  const [formValid, setFormValid] = useState(false);
  const [inputsValid, setInputsValid] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [activeDetailId, setActiveDetailId] = useState(null);

  // Referencias para los campos de fecha
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Efecto para verificar cuando cambian las fechas
  useEffect(() => {
    // Validamos si ambos campos tienen valores
    setInputsValid(!!fechaInicio && !!fechaFin);
  }, [fechaInicio, fechaFin]);

  function handleChangeDateInit(e) {
    setFechaInicio(e.target.value);
  }

  function handleChangeDateEnd(e) {
    setFechaFin(e.target.value);
  }

  function handleSubmit(e) {
    // Validar que ambos campos tengan valores
    if (!fechaInicio || !fechaFin) {
      setPopupMessage("Por favor, completa ambas fechas.");
      setIsPopupOpen(true);
      return;
    }

    // Validar que fecha inicio sea menor o igual que fecha fin
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    if (fechaInicioDate > fechaFinDate) {
      setPopupMessage(
        "La fecha de inicio debe ser anterior o igual a la fecha de fin."
      );
      setIsPopupOpen(true);
      return;
    }

    setIsPopupOpen(false);
    props.onSubmitReports({
      fechaInicio,
      fechaFin,
    });
    setFormValid(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handleReset(e) {
    // Reseteamos los estados
    setFechaInicio("");
    setFechaFin("");
    setFormValid(false);
    setInputsValid(false);

    // Reseteamos los campos usando las refs
    if (startDateRef.current) startDateRef.current.value = "";
    if (endDateRef.current) endDateRef.current.value = "";
  }

  function handleDetailCustomer(idArticulo, fechaOrden) {
    props.onHdlDetailCustomer({ idArticulo, fechaOrden });
  }

  return (
    <div className="w-full h-screen ">
      <NavbarComponent></NavbarComponent>

      <div className="p-8">
        <h1 className="text-4xl font-medium">Reporte diario</h1>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <label htmlFor="startDate">Fecha de inicio</label>
            <input
              type="date"
              id="startDate"
              ref={startDateRef}
              className="p-2 border border-gray-300 rounded w-full"
              onChange={handleChangeDateInit}
              value={fechaInicio}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate">Fecha de fin</label>
            <input
              type="date"
              id="endDate"
              ref={endDateRef}
              className="p-2 border border-gray-300 rounded w-full"
              onChange={handleChangeDateEnd}
              value={fechaFin}
              required
            />
          </div>
          <div className="flex items-end">
            <ButtonComponent
              size="sm"
              style="primary"
              className="align-bottom h-10 w-full"
              onClick={handleSubmit}
              disabled={!inputsValid}
            >
              Filtrar
            </ButtonComponent>
          </div>
          <div className="flex items-end">
            <ButtonComponent
              size="sm"
              style="primary"
              className="align-bottom h-10 w-full"
              onClick={handleReset}
              disabled={!inputsValid}
            >
              Limpiar
            </ButtonComponent>
          </div>
        </div>
        {formValid && (
          <>
            <p className="mt-4 text-xl font-bold">Productos vendidos</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-8 gap-4">
              {props.reports && props.reports.length > 0 ? (
                props.reports.map((item, index) => (
                  <CardsComponent
                    key={`${item.idArticulo}-${item.nombreArticulo}-${index}`}
                    card={item}
                    onHandleDetailCustomer={handleDetailCustomer}
                    details={props.details}
                    activeDetailId={activeDetailId}
                    setActiveDetailId={setActiveDetailId}
                  />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  No hay datos para mostrar en el rango seleccionado.
                </p>
              )}
            </div>
          </>
        )}
      </div>
      <PopupComponent
        isOpen={isPopupOpen}
        title={popupMessage}
        onClose={closePopup}
        name="popup"
        icon={iconError}
      />
      <FooterComponent />
    </div>
  );
};

export default ReportsPage;

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/login/Login";
import PosPage from "./pages/pos/PosPage";
import ReportsPage from "./pages/reports/ReportsPage";
import api from "./pages/utils/api";
import { CurrentWaiterContext } from "./contexts/CurrentWaiterContext";
import { checkToken } from "./pages/utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentWaiter, setCurrentWaiter] = useState({});
  const [reports, setReports] = useState([]);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function initializeApp() {
      const tokenLs = localStorage.getItem("jwt");
      if (tokenLs) {
        const response = await checkToken(tokenLs);
        if (response.valid) {
          setToken(tokenLs);
          setLoggedIn(true);

          // Recuperar el mesero actual del localStorage
          const storedWaiter = localStorage.getItem("currentWaiter");
          if (storedWaiter) {
            try {
              const waiterData = JSON.parse(storedWaiter);
              setCurrentWaiter(waiterData);
            } catch (e) {
              console.error("Error al parsear datos del mesero:", e);
            }
          } else {
            console.error("No se pudo recuperar el mesero:", error);
          }

          // Obtener artículos con el token
          const articlesResponse = await api.getInitialArticles(tokenLs);
          setArticles(articlesResponse);

          // Solo redirige a /pos si estamos en la página de login (/)
          if (location.pathname === "/") {
            navigate("/pos");
          }
        } else {
          // Token inválido - limpiar el storage
          localStorage.removeItem("jwt");
          localStorage.removeItem("currentWaiter");

          // Redirigir si es necesario
          if (location.pathname !== "/") {
            navigate("/");
          }
        }
      } else if (location.pathname !== "/") {
        // Si no hay token y no estamos en login, redirigir a login
        navigate("/");
      }
    }

    initializeApp();
  }, [navigate, location.pathname]);

  async function handleLoggin(email, tokenFromLogin) {
    //Obtiene datos del mesero
    const waiter = await api.getWaiterByEmail(email, tokenFromLogin);
    setToken(tokenFromLogin);
    setCurrentWaiter(waiter);
    setLoggedIn(true);

    localStorage.setItem("currentWaiter", JSON.stringify(waiter));

    //Navega a la pagina de punto de venta
    navigate("/pos");
  }

  async function handleSubmitOrder(order) {
    if (!currentWaiter || !currentWaiter.idMesero) {
      console.error("Error: No hay un mesero seleccionado o falta su ID");
      return;
    }

    try {
      const response = await api.insertOrder(token, {
        idMesero: currentWaiter.idMesero,
        nombreComensal: order.comensal,
        idArticulo: order.articulo.idArticulo,
        cantidad: order.cantidad,
        costoTotal: order.total,
        fechaOrden: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
      });

      console.log("Orden creada con éxito:", response);
      return response;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  }

  async function handleSubmitReports(fechas) {
    try {
      const response = await api.getReports(
        token,
        fechas.fechaInicio,
        fechas.fechaFin
      );
      setReports(response);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      throw error;
    }
  }

  async function handleSubmitDetailCustomer(data) {
    try {
      const response = await api.getDetails(
        token,
        data.idArticulo,
        data.fechaOrden
      );

      console.log("Detalle generado con éxito:", response);
      setDetails(response);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      throw error;
    }
  }

  return (
    <div>
      <CurrentWaiterContext.Provider value={{ currentWaiter }}>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<LoginPage handleLoggin={handleLoggin} />} />
          {/* Ruta para la página de punto de venta */}
          <Route
            path="/pos"
            element={
              <PosPage articulos={articles} onSubmitOrder={handleSubmitOrder} />
            }
          />
          {/* Ruta para la página de reportes */}
          <Route
            path="/reports"
            element={
              <ReportsPage
                reports={reports}
                onSubmitReports={handleSubmitReports}
                onHdlDetailCustomer={handleSubmitDetailCustomer}
                details={details}
              />
            }
          />
        </Routes>
      </CurrentWaiterContext.Provider>
    </div>
  );
}

export default App;

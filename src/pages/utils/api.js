class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  handlePromise(res) {
    if (res.ok) {
      // Verificar si la respuesta tiene contenido antes de intentar parsearla
      const contentType = res.headers.get("content-type");
      if (
        contentType &&
        contentType.includes("application/json") &&
        res.status !== 204
      ) {
        return res.json();
      } else {
        // Para respuestas sin contenido o no-JSON
        return Promise.resolve({ success: true, status: res.status });
      }
    }
    // si el servidor devuelve un error, rechaza el promise
    return Promise.reject(`Error: ${res.status}`);
  }

  /* obtiene todos los articulos de la API */
  getInitialArticles(token) {
    return fetch(`${this.baseUrl}/articulos/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Inserta la información de la orden en la API */
  insertOrder(token, order) {
    return fetch(`${this.baseUrl}/ordenes/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idMesero: order.idMesero,
        nombreComensal: order.nombreComensal,
        idArticulo: order.idArticulo,
        cantidad: order.cantidad,
        costoTotal: order.costoTotal,
        fechaOrden: order.fechaOrden,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Obtiene la información del mesero por su id en la API */
  getWaiterByEmail(email, token) {
    return fetch(`${this.baseUrl}/meseros/getEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Obtiene reportes */
  getReports(token, fechaInicio, fechaFin) {
    return fetch(`${this.baseUrl}/getReports/getReporteByRangeDates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fechaIni: fechaInicio,
        fechaFin: fechaFin,
        idArticulo: 0,
        fechaOrden: "",
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Obtiene detalles del cliente por articulo vendido */
  getDetails(token, idArticulo, fechaOrden) {
    return fetch(`${this.baseUrl}/getReports/getReporteByArtFecha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fechaIni: "",
        fechaFin: "",
        idArticulo,
        fechaOrden,
      }),
    })
      .then((res) => {
        return this.handlePromise(res);
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}

const api = new Api({
  baseUrl: "http://localhost:10001",
});

export default api;

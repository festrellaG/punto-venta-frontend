const BASE_URL = "http://localhost:10001";
//Para loggearte
export async function signin(email) {
  try {
    // Obtener el token de autenticación
    const respToken = await fetch(`${BASE_URL}/auth0/token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!respToken.ok) {
      throw new Error(`Error al obtener el token: ${respToken.status}`);
    }

    const tokenData = await respToken.json();
    const token = tokenData.token;

    // Verificar el email del mesero con el token obtenido
    const response = await fetch(`${BASE_URL}/meseros/getEmail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "401 - Usuario no encontrado");
    }

    // Almacenar token y retornar los datos del usuario
    localStorage.setItem("jwt", token);
    console.log("Usuario autenticado correctamente");

    return data;
  } catch (error) {
    console.error("Error en el proceso de autenticación:", error);
    throw error;
  }
}

//Para cerrar sesión
export function signout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("currentWaiter");
}

//Para validación de token
export async function checkToken(token) {
  if (!token) {
    console.error("No token found");
    return false;
  }

  try {
    // Crear un endpoint específico para validación de token
    const response = await fetch(`${BASE_URL}/auth0/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      /*console.log("Token is valid:", data);*/
      return data; // Devuelve la información del usuario
    } else {
      console.error("Token inválido o expirado");
      localStorage.removeItem("jwt"); // Limpiar token inválido
      return false;
    }
  } catch (error) {
    console.error("Error al validar el token:", error);
    localStorage.removeItem("jwt"); // Limpiar token por error
    return false;
  }
}

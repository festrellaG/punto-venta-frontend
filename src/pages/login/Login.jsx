import { useState } from "react";
import { signin } from "../../pages/utils/auth";
import ParrotLogo from "../../assets/brand/logo.png";
import ButtonComponent from "../../components/button/ButtonComponent";
import InputComponent from "../../components/input/InputComponent";
import PopupComponent from "../../components/popup/PopupComponent";
import iconError from "../../assets/iconError.png";

const LoginPage = ({ handleLoggin }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signin(email);
      const token = localStorage.getItem("jwt");
      handleLoggin(email, token);
    } catch (error) {
      console.error("Error with email:", error);
      setIsPopupOpen(true);
      setIsLoading(false);
    }
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-black">
      <form className="w-100 flex flex-col p-4" onSubmit={handleSubmit}>
        <img src={ParrotLogo} alt="Parrot Logo" className="w-50  self-center" />
        <h1 className="text-center text-2xl font-medium my-5">
          Iniciar sesión
        </h1>

        <InputComponent
          label="Correo electrónico"
          placeholder="Ingresa tu correo electronico"
          type="email"
          onChange={handleEmailChange}
          disabled={isLoading} // Deshabilitar el input durante la carga
        ></InputComponent>

        <ButtonComponent
          className="mt-8 w-full"
          size="md"
          style="primary"
          type="submit"
          disabled={isLoading} // Deshabilitar el botón durante la carga
        >
          {isLoading ? (
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
              Iniciando...
            </div>
          ) : (
            "Iniciar sesión"
          )}
        </ButtonComponent>
      </form>
      <PopupComponent
        isOpen={isPopupOpen}
        title="Uy, algo salió mal. Por favor,  intentalo de nuevo."
        onClose={closePopup}
        name="popup"
        icon={iconError}
      />
    </div>
  );
};

export default LoginPage;

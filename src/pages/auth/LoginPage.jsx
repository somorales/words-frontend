import service from "../../services/config.js";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import { Link } from "react-router-dom";
import { ToastContext } from "../../context/toast.context.jsx";
import Loading from "../../components/Loading.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  const { setErrorMessage } = useContext(ToastContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      //setIsLoading(false);
    }, 2000);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("/auth/login", userCredentials);

      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error de comunicación con el servidor.");
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#4D3E7F]">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-[#000000]"
                >
                  Correo Eletrónico
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleEmailChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlePasswordChange}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Usar entre 8-16 caracteres"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#c07c53] px-3 py-1.5 text-sm font-semibold leading-6 text-[#efe8db] shadow-sm hover:bg-[#D68C60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D68C60]"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className=" font-light mt-10 text-center text-sm text-[#000000]">
            No tienes cuenta?{" "}
            <Link
              to={`/signup`}
              className="font-bold leading-6 text-[#c07c53] hover:text-[#D68C60]"
            >
              Crear Cuenta
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

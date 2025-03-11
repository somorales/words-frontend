import { createContext, useEffect, useState } from "react";
import service from "../services/config";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  //estado que creo para compartir
  const [loggerUserName, setLoggerUserName] = useState("");

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify");

      console.log(response);

      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false);
      setLoggerUserName(response.data.name);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);
      setLoggerUserName("");
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    loggerUserName,
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };

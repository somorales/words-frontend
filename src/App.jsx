import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

//pages
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CreateWordPage from "./pages/CreateWordPage";
import WordPage from "./pages/WordPage";
import EditWordPage from "./pages/EditWordPage";

import { ToastContext } from "./context/toast.context";
import { useContext } from "react";
import ToastError from "./components/ToastError";

function App() {
  const location = useLocation();
  const { errorMessage, okMessage, setErrorMessage } = useContext(ToastContext);
  console.log("error message", errorMessage);
  console.log(location.pathname);
  return (
    <>
      {location.pathname !== `/signup` && location.pathname !== `/login` && (
        <NavBar />
      )}
      {errorMessage && (
        <ToastError
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/words/new" element={<CreateWordPage />} />
        <Route path="/words/:wordId" element={<WordPage />} />
        <Route path="/words/:wordId/edit" element={<EditWordPage />} />
      </Routes>
      {location.pathname !== `/signup` && location.pathname !== `/login` && (
        <Footer />
      )}
    </>
  );
}

export default App;

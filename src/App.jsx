import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

//pages
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
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
      {errorMessage && (
        <ToastError
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/words/new" element={<CreateWordPage />} />
        <Route path="/words/:wordId" element={<WordPage />} />
        <Route path="/words/:wordId/edit" element={<EditWordPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

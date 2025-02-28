import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
import CreateWordPage from "./pages/CreateWordPage";
import WordPage from "./pages/WordPage";
import EditWordPage from "./pages/EditWordPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/words/new" element={<CreateWordPage />} />
        <Route path="/words/:wordId" element={<WordPage />} />
        <Route path="/words/id/edit" element={<EditWordPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

import React from "react";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";

export default function CreateWordPage() {
  const navigate = useNavigate();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [translation, setTransalation] = useState("");
  const [sentences, setSentences] = useState([""]);
  const [language, setLanguage] = useState("English");

  const handleWordChange = (evento) => {
    let value = evento.target.value;
    setWord(value);
  };

  const handleMeaningChange = (evento) => {
    let value = evento.target.value;
    setMeaning(value);
  };
  const handleTanslationChange = (evento) => {
    let value = evento.target.value;
    setTransalation(value);
  };
  const handleSentencesChange = (index, event) => {
    const newSentences = [...sentences];
    newSentences[index] = event.target.value;
    setSentences(newSentences);
  };
  const addSentence = () => {
    setSentences([...sentences, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      word === "" ||
      meaning === "" ||
      translation === "" ||
      sentences === "" ||
      language === ""
    ) {
      return;
    }

    const newWord = {
      word: word,
      meaning: meaning,
      translation: translation,
      sentences: sentences,
      language: language,
    };

    try {
      await service.post(`/words`, newWord);

      navigate(`/`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error de comunicación con el servidor.");
    }
  };
  return (
    <div className="bg-white">
      <div className="p-6 space-y-6"></div>
      <form onSubmit={handleSubmit} method="POST" className="space-y-6 p-6">
        <div className="lg:col-span-2 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
            Crear Palabra
          </h1>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="word"
              className="block text-sm font-medium leading-6 text-[#000000]"
            >
              Word (Requerido)
            </label>
          </div>
          <div className="mt-2">
            <textarea
              onChange={handleWordChange}
              value={word}
              placeholder="New Word"
              id="word"
              name="word"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-[#000000]"
            >
              Meaning (Requerido)
            </label>
          </div>
          <div className="mt-2">
            <textarea
              onChange={handleMeaningChange}
              value={meaning}
              placeholder="Que significa"
              id="description"
              name="description"
              type="text"
              required
              className="block w-full h-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-[#000000]"
            >
              Traduccion (Requerido)
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleTanslationChange}
              value={translation}
              id="traduccion"
              name="traduccion"
              type="traduccion"
              required
              className="block w-full h-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="lg:col-span-2 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
            Crea tus oraciones
          </h1>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-[#000000]"
            >
              Sentences (Requerido)
            </label>
          </div>
          <div className="space-y-2">
            {sentences.map((sentence, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={sentence}
                  onChange={(event) => handleSentencesChange(index, event)}
                  placeholder="Escribe una oración"
                  id={`sentence-${index}`}
                  name={`sentence-${index}`}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
                />
              </div>
            ))}
          </div>

          <button
            onClick={addSentence}
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
          >
            agregar oración
          </button>
        </div>
        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
        >
          Guardar
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-[#c07c53] hover:bg-[#d2ccb4] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

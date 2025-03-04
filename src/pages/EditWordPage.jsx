import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EditWordPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [translation, setTransalation] = useState("");
  const [sentences, setSentences] = useState("");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    service
      .get(`/words/${params.wordId}`)
      .then((response) => {
        setWord(response.data.word);
        setMeaning(response.data.meaning);
        setTransalation(response.data.translation);
        setSentences(response.data.sentencesen);
        setLanguage(response.data.language);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error de comunicación con el servidor.");
      });
  }, []);

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
  const handleSentencesChange = (evento) => {
    let value = evento.target.value;
    setSentences(value);
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

    const editWord = {
      word: word,
      meaning: meaning,
      translation: translation,
      sentences: sentences,
      language: language,
    };

    try {
      await service.put(`/words/${params.wordId}`, editWord);

      navigate(`/`);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error de comunicación con el servidor.");
    }
  };

  return (
    <div className="bg-white">
      <div className="p-6 space-y-6"></div>
      <form onSubmit={handleSubmit} method="PuT" className="space-y-6 p-6">
        <div className="lg:col-span-2 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
            Editar Palabra
          </h1>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="word"
              className="block text-sm font-medium leading-6 text-[#000000]"
            >
              Word
            </label>
          </div>
          <div className="mt-2">
            <textarea
              onChange={handleWordChange}
              value={word}
              placeholder=" Word"
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
              Meaning
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
              Traduccion
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
              Sentences
            </label>
          </div>
          <div className="mt-2">
            <textarea
              onChange={handleSentencesChange}
              value={sentences}
              placeholder="Oraciones"
              id="Oraciones"
              name="Oraciones"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#c07c53] sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
        >
          editar palabra
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

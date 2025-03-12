import React from "react";
import { useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import yourSentences from "../assets/images/sentences.png";
import plus from "../assets/images/plus.png";

export default function CreateWordPage() {
  const navigate = useNavigate();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [translation, setTransalation] = useState("");
  const [sentences, setSentences] = useState([]);
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
    <div>
      <div className="pt-2 pl-6 pr-6 pb-8">
        <div className="lg:col-span-2 lg:pr-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#47307D]">
            Create Word
          </h1>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          <div>
            <div className="mt-6">
              <input
                onChange={handleWordChange}
                value={word}
                placeholder="Write a word"
                id="word"
                name="word"
                type="text"
                required
                className="w-full border-b-2 border-[#E46D45] focus:outline-none py-1 mb-2 text-gray-600 placeholder:pt-4 h-[3rem]"
              />
            </div>
          </div>

          <div>
            <div className="mt-6">
              <input
                onChange={handleMeaningChange}
                value={meaning}
                placeholder="What does it mean?"
                id="description"
                name="description"
                type="text"
                required
                className="w-full border-b-2 border-[#E46D45] focus:outline-none py-1 mb-8 text-gray-600 placeholder:pt-4 h-[3rem]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#4D3E7F]">
              Translated to Spanish
            </h3>
            <div className="mt-2">
              <input
                onChange={handleTanslationChange}
                value={translation}
                placeholder="Write the translation"
                id="traduccion"
                name="traduccion"
                type="traduccion"
                required
                className="w-full border-b-2 border-[#E46D45] focus:outline-none py-1 mb-8 text-gray-600 placeholder:pt-4 h-[3rem]"
              />
            </div>
          </div>

          <img src={yourSentences} className="w-64 h-auto" />

          <div>
            <div className="space-y-2">
              {sentences.map((sentence, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sentence}
                    onChange={(event) => handleSentencesChange(index, event)}
                    placeholder="Write a sentence"
                    id={`sentence-${index}`}
                    name={`sentence-${index}`}
                    className="w-full border-b-2 border-[#E46D45] focus:outline-none py-1 mb-8 text-gray-600 placeholder:pt-4 h-[3rem]"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={addSentence}
              className=" flex bg-[#A28DE7] justify-center border-2 border-[#A28DE7] text-base  text-white rounded-xl p-6 mb-4 shadow-md shadow[#4D3E7F] h-[5.125rem] w-full"
            >
              <img src={plus} className="w-6 h-6 pr-2" />
              Create sentence
            </button>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className=" mt-8 w-full bg-[#4D3E7F] text-white py-2 rounded-full text-base font-medium hover:bg-[#47307D] transition"
            >
              Save new word
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-[#4D3E7F] "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

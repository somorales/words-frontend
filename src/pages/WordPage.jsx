import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";

export default function WordPage() {
  const params = useParams();

  const navigate = useNavigate();

  const [word, setword] = useState({});

  const [allSentences, setAllSentences] = useState([]);

  useEffect(() => {
    service
      .get(`/words/${params.wordId}`)
      .then((response) => {
        setword(response.data);
        setAllSentences(response.data.sentences);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (event) => {
    service
      .delete(`/words/${params.wordId}`)

      .then((response) => {
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#EDE9D8]">
      <div className="lg:py-6">
        <div className="p-6">
          <div className="mt-4">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
                {word.word}
              </h1>
            </div>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-xl tracking-tight text-[#000000]">
              {word.meaning}
            </p>
          </div>

          <div className="py-6 lg:pb-6 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="text-xl font-medium text-[#000000]">Traduccion</h3>
              <div className="space-y-6">
                <p className="text-sm text-[#000000]">{word.translation}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
              Tus Oraciones
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {allSentences.map((sentence, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-md shadow-md bg-white"
                >
                  <p className="text-base font-medium text-[#000000]">
                    {sentence}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(`/words/${word._id}/edit`)}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#c07c53] px-8 py-3 text-base font-semibold text-[#efe8db] hover:bg-[#D68C60] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-[#c07c53] hover:bg-[#d2ccb4] focus:outline-none focus:ring-2 focus:ring-[#c07c53] focus:ring-offset-2"
            >
              Borrar Palabra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

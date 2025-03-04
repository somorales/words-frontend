import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import TextToSpeech from "../components/TextToSpeech.jsx";

export default function HomePage() {
  const [allWords, setAllWords] = useState([]);

  useEffect(() => {
    service
      .get(`/words`)
      .then((response) => {
        console.log(response);
        setAllWords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col mt-8 lg:grid lg:grid-cols-2">
          <h1 className="text-3xl text-[#2a3a2d]	font-semibold italic pb-4">
            Learn words, write sentences, and improve your pronunciation
          </h1>
        </div>

        <div>
          <Link
            to="/words/new"
            className="bg-[#065471] border-2 border-white rounded-3xl hover:bg-[#FFC045] hover:border-[#065471]  hover:text-[#065471]    px-3.5 py-2.5 shadow-sm w-80 font-bold text-white text-center"
          >
            crear palabra
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allWords.map((word) => (
            <Link key={word._id} to={`/words/${word._id}`}>
              <div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-base text-[#000000]">{word.word}</h3>
                    <TextToSpeech text={word.word} />
                    <p className="mt-1 text-sm text-gray-800">{word.meaning}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

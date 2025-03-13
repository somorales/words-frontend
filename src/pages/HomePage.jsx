import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import TextToSpeech from "../components/TextToSpeech.jsx";
import SearchForm from "../components/SearchForm.jsx";
import header from "../assets/images/header.png";
import wordList from "../assets/images/word-list.png";
import arrow from "../assets/images/flecha.png";

export default function HomePage() {
  const [allWords, setAllWords] = useState([]);
  const [userHandleSearchWord, setUserHandleSearchWord] = useState(false);
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

  const handleSearchWord = (text) => {
    service
      .get(`/words?word=${text}`)
      .then((response) => {
        setAllWords(response.data);
        if (text.length > 0) {
          setUserHandleSearchWord(true);
        } else {
          setUserHandleSearchWord(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-2 pl-6 pr-6 pb-8">
      <div className="mb-4">
        <img src={header} className="w-24 h-auto" />
        <h1 className="text-[#47307D] font-sans text-2xl font-bold py-2">
          Learn words, write sentences, and improve your pronunciation.
        </h1>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-grow">
          <SearchForm
            placeholder="search words"
            onSearch={handleSearchWord}
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
          />
        </div>
        <Link
          to="/words/new"
          className="bg-[#47307D] text-white px-4 py-2 rounded-full text-base font-medium whitespace-nowrap"
        >
          Create word
        </Link>
      </div>

      {/* Word List Section */}
      <div className="mt-6">
        <img src={wordList} className="w-64 h-auto" />
        <div className="space-y-2">
          {allWords.map((word) => (
            <Link key={word._id} to={`/words/${word._id}`}>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-indigo-900 font-medium">{word.word}</h3>
                    <p className="text-gray-600 text-sm">
                      It is a common English greeting used to say hi to someone.
                    </p>
                  </div>
                  <div className="text-purple-500">
                    <TextToSpeech text={word.word} />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* If there are no words yet, show at least the "Hello" example from the image */}
          {allWords.length === 0 && (
            <>
              <div className="flex justify-center items-center">
                <div>
                  {userHandleSearchWord === true ? (
                    <div className=" flex flex-col  items-center">
                      <p className=" mt-32 mb-1 text-gray-600 text-bold text-xl">
                        "Oops, it looks like you haven't created this word yet!"
                      </p>
                      <img src={arrow} className="w-48 h-auto mb-32" />
                    </div>
                  ) : (
                    <div className=" flex flex-col  items-center">
                      <p className=" mt-32 mb-1 text-gray-600 text-bold text-xl">
                        "Oops, You don't have words yet, create words and do a
                        daily review to improve your English!"
                      </p>
                      <img src={arrow} className="w-48 h-auto mb-32" />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* <div>
  <div className="text-purple-500">
            <span role="img" aria-label="speaker">
              🔊
            </span>
          </div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col mt-8 lg:grid lg:grid-cols-2">
          <h1 className="text-3xl text-[#2a3a2d]	font-semibold italic pb-4">
            Learn words, write sentences, and improve your pronunciation
          </h1>
        </div>

        <div className="w-full lg:w-96">
          <SearchForm
            placeholder="Buscar Productos..."
            onSearch={handleSearchWord}
          />
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
} */

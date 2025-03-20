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
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasPrev, setHasPrev] = useState(false);
  const [prevCursor, setPrevCursor] = useState(null);
  const [userSearchText, setUserSearchText] = useState(null);

  const loadPage = (text, cursor) => {
    let urlParams = new URLSearchParams();

    if (text) {
      urlParams.append("word", text);
    }

    if (cursor) {
      urlParams.append("cursor", cursor);
    }

    let url = `/words?${urlParams.toString()}`;

    service
      .get(url)
      .then((response) => {
        setAllWords(response.data.allWords);
        setHasMore(response.data.hasMore);
        setNextCursor(response.data.nextCursor);
        setHasPrev(response.data.hasPrev);
        setPrevCursor(response.data.prevCursor);

        if (text && text.length > 0) {
          setUserHandleSearchWord(true);
        } else {
          setUserHandleSearchWord(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadPage(null, null);
  }, []);

  const handleSearchWord = (text) => {
    setUserSearchText(text);
    loadPage(text, null);
  };

  return (
    <div>
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

        <div className="mt-6">
          <img src={wordList} className="w-64 h-auto" />
          <div className="space-y-2">
            {allWords.map((word) => (
              <div key={word._id} className="relative">
                <Link to={`/words/${word._id}`}>
                  <div className="bg-white border-2 border-[#A28DE7] rounded-xl p-4 mb-4 shadow-md shadow[#4D3E7F] h-[7rem]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text[#47307D] text-xl font-semibold">
                          {word.word}
                        </h3>
                        <p className="text-gray-500 fond-medium text-sm py-2">
                          {word.meaning}
                        </p>
                      </div>

                      <div className="w-10"></div>
                    </div>
                  </div>
                </Link>

                <div
                  className="absolute top-4 right-4 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TextToSpeech
                    text={word.word}
                    className=" duration-200 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm"
                  />
                </div>
              </div>
            ))}

            {allWords.length === 0 && (
              <>
                <div className="flex justify-center items-center">
                  <div>
                    {userHandleSearchWord === true ? (
                      <div className=" flex flex-col  items-center">
                        <p className=" mt-32 mb-1 text-gray-600 text-bold text-xl">
                          "Oops, it looks like you haven't created this word
                          yet!"
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
            <div className="flex flex-row justify-end gap-4  pt-4  ">
              {hasPrev === true && (
                <button
                  className="w-16 h-16  border-[#4D3E7F] border-2  rounded-full flex items-center justify-center text-white "
                  aria-label="Previous"
                  onClick={() => loadPage(userSearchText, prevCursor)}
                >
                  <div className="w-3 h-3 border-t-2 border-r-2 border-[#4D3E7F] transform rotate-[225deg] translate-x-[-2px]"></div>
                </button>
              )}

              {hasMore === true && (
                <button
                  className="w-16 h-16 bg-[#4D3E7F] rounded-full flex items-center justify-center text-white "
                  aria-label="Next"
                  onClick={() => loadPage(userSearchText, nextCursor)}
                >
                  <div className="w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45 translate-x-[-2px]"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

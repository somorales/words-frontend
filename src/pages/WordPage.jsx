import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../services/config.js";
import { useNavigate } from "react-router-dom";
import sentences from "../assets/images/sentences.png";

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
    <div>
      <div className="pt-2 pl-6 pr-6 pb-8">
        <div className="lg:pb-6 lg:pr-8 lg:pt-6">
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#47307D]">
              {word.word}
            </h1>
          </div>

          <div className="mt-2 lg:row-span-3 lg:mt-0">
            <p className="text-xl tracking-tight text-[#0A0320]">
              {word.meaning}
            </p>
          </div>
        </div>

        <div className="py-8 lg:pb-6 lg:pr-8 lg:pt-6">
          <div>
            <h3 className="text-2xl font-semibold text-[#4D3E7F]">
              Translated to Spanish
            </h3>
            <div className="mt-2 lg:row-span-3 lg:mt-0">
              <p className="text-xl tracking-tight text-[#0A0320]">
                {word.translation}
              </p>
            </div>
          </div>
        </div>

        <img src={sentences} className="w-64 h-auto" />

        {allSentences.map((sentence, index) => (
          <div
            key={index}
            className="bg-white border-2 border-purple-200 rounded-xl p-4 mb-4 shadow-md shadow[#4D3E7F] h-[5.125rem] "
          >
            <p className="text-base font-medium text-[#000000]">{sentence}</p>
          </div>
        ))}

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/words/${word._id}/edit`)}
            className=" mt-8 w-full bg-[#4D3E7F] text-white py-2 rounded-full text-base font-medium hover:bg-[#47307D] transition"
          >
            Edit word
          </button>

          <button
            onClick={handleDelete}
            className="flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-[#4D3E7F] "
          >
            Delete word
          </button>
        </div>
      </div>
    </div>
  );
}

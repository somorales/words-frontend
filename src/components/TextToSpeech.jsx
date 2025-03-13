import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import speech from "../assets/images/speech.png";

export default function TextToSpeech(props) {
  const [voices, setVoices] = useState([]);
  console.log("text", props.text);

  // Cargar las voces disponibles cuando la página se cargue
  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Obtener las voces inmediatamente si ya están cargadas
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    // Si las voces ya están cargadas en el momento de la carga inicial
    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
      setVoices(initialVoices);
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speakText = () => {
    if (!props.text) return; // No hacer nada si no hay texto

    // Verificar si SpeechSynthesis está disponible
    if (!window.speechSynthesis) {
      alert("Tu navegador no soporta la síntesis de voz.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(props.text);
    speech.lang = "en-US"; // Configura el idioma a inglés (EE.UU.)

    // Buscar una voz en inglés (EE.UU.)
    const englishVoice = voices.find((voice) => voice.lang === "en-GB");
    if (englishVoice) {
      speech.voice = englishVoice; // Asignar la voz en inglés
    }
    console.log(speech);

    // Reproducir el texto
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <button onClick={speakText}>
        <img src={speech} className="w-[1.8rem] h-auto" />
      </button>
    </div>
  );
}

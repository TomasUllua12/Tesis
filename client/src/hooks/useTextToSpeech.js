import { useEffect, useRef, useState } from "react";

/**
 * Hook que escucha la tecla Espacio y reproduce (o detiene) la voz del texto que retorna 'getText'.
 * @param {() => string} getText - Función que retorna el texto a leer (por ejemplo, del innerText de un ref).
 */
export function useTextToSpeech(getText) {
  // Estado que indica si se está leyendo el texto en voz alta
  const [isReading, setIsReading] = useState(false);
  // Referencia para guardar el utterance actual
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Función que maneja la reproducción de voz
    const startReading = () => {
      if (!("speechSynthesis" in window)) {
        alert("Lo siento, tu navegador no soporta la síntesis de voz.");
        return;
      }

      // Cancelamos cualquier lectura anterior
      window.speechSynthesis.cancel();
      
      const text = getText();
      if (!text) return;

      // Creamos el objeto SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);
      // Opcional: Configura el idioma o velocidad. 
      // utterance.lang = "es-ES";
      // utterance.rate = 1;
      // utterance.pitch = 1;

      // Cuando la lectura termine, ponemos isReading en false
      utterance.onend = () => {
        setIsReading(false);
      };

      // Guardamos la referencia para cancelarlo si se presiona Espacio de nuevo
      utteranceRef.current = utterance;
      
      // Iniciamos la lectura
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    };

    // Función que maneja la detención de la lectura
    const stopReading = () => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      setIsReading(false);
    };

    // Función que se llama al presionar una tecla
    const handleKeydown = (e) => {
      if (e.code === "ShiftRight") {
        e.preventDefault();
        // Si no estamos leyendo, inicia la lectura
        if (!isReading) {
          startReading();
        } else {
          // Si ya está leyendo, detiene la lectura
          stopReading();
        }
      }
    };

    // Registramos el listener de teclado
    window.addEventListener("keydown", handleKeydown);

    // Limpiamos el listener al desmontar
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [getText, isReading]);

  // Retornamos el estado, por si queremos usarlo en el componente
  return { isReading };
}

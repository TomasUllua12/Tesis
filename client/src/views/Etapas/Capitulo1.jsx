// Capitulo1.jsx
import React, { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { InteractiveStory } from "../../components/InteractiveStory";
import storyData from "./cap.json";

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <div>
          <h2>Capítulo 1: Historia Interactiva</h2>
          <InteractiveStory storyData={storyData} />
        </div>
      )}
    </>
  );
}

export default Capitulo1;

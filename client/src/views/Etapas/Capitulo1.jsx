// Capitulo1.jsx
import React, { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { InteractiveStory } from "../../components/InteractiveStory";
import storyData from "./cap.json";
import "./Capitulo.css";

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="cap-bg">
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <div className="cap-content">
          <h2>Capítulo 1: Historia Interactiva</h2>
          <div className="cap-options">
            <InteractiveStory storyData={storyData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Capitulo1;

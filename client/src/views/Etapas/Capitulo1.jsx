import React, { useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen'; // Ajusta la ruta si es necesario

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen setIsLoading={setIsLoading} />;
  }

  return (
    <div>
      <h2>Capítulo 1</h2>
      <p>Contenido del capítulo.</p>
    </div>
  );
}

export default Capitulo1;

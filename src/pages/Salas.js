import React, { useEffect, useState } from "react";
import { getSalas } from "../services/api";

const Salas = () => {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    getSalas()
      .then((response) => {
        setSalas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar salas:", error);
      });
  }, []);

  return (
    <div>
      <h2>Salas</h2>
      <ul>
        {salas.map((sala) => (
          <li key={sala.id}>
            {sala.nome} - {sala.localizacao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Salas;

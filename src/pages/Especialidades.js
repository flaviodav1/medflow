import React, { useEffect, useState } from "react";
import api from "../services/api";

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    api.get("/especialidades")
      .then((response) => {
        setEspecialidades(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar especialidades:", error);
      });
  }, []);

  return (
    <div>
      <h1>Especialidades</h1>
      <ul>
        {especialidades.map((esp) => (
          <li key={esp.id}>{esp.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Especialidades;

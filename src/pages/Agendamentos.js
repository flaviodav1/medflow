import React, { useEffect, useState } from "react";
import {
  getAgendamentos,
  getEspecialidades,
  updateAgendamento,
  createAgendamento,
  deleteAgendamento,
} from "../services/api";

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novoAgendamento, setNovoAgendamento] = useState({
    paciente: "",
    especialidade_id: "",
    data: "",
  });

  useEffect(() => {
    carregarAgendamentos();
    carregarEspecialidades();
  }, []);

  const carregarAgendamentos = () => {
    getAgendamentos()
      .then((res) => setAgendamentos(res.data))
      .catch((err) => console.error("Erro ao buscar agendamentos:", err));
  };

  const carregarEspecialidades = () => {
    getEspecialidades()
      .then((res) => {
	setEspecialidades(res.data);
	console.log("Especialidades carregadas:", res.data);
	})
      .catch((err) => console.error("Erro ao buscar especialidades:", err));
  };

  const handleEditar = (id) => setEditandoId(id);
  const handleCancelar = () => setEditandoId(null);

  const handleSalvar = (id) => {
    const agendamento = agendamentos.find((a) => a.id === id);
    const agendamentoCorrigido = {
      ...agendamento,
      especialidade_id: parseInt(agendamento.especialidade_id),
    };

    updateAgendamento(id, agendamentoCorrigido)
      .then(() => {
        setEditandoId(null);
        carregarAgendamentos();
      })
      .catch((err) => console.error("Erro ao salvar agendamento:", err));
  };

  const handleInputChange = (id, campo, valor) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
    );
  };

  const handleNovoInputChange = (campo, valor) => {
    setNovoAgendamento((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAdicionar = () => {
    if (
      !novoAgendamento.paciente ||
      !novoAgendamento.especialidade_id ||
      !novoAgendamento.data
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const agendamentoCorrigido = {
      ...novoAgendamento,
      especialidade_id: parseInt(novoAgendamento.especialidade_id),
    };

    createAgendamento(agendamentoCorrigido)
      .then(() => {
        setNovoAgendamento({ paciente: "", especialidade_id: "", data: "" });
        carregarAgendamentos();
      })
      .catch((err) => console.error("Erro ao adicionar agendamento:", err));
  };

  const handleExcluir = (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      deleteAgendamento(id)
        .then(() => carregarAgendamentos())
        .catch((err) => console.error("Erro ao excluir agendamento:", err));
    }
  };

  const getNomeEspecialidade = (id) => {
    const esp = especialidades.find((e) => e.id === id);
    return esp ? esp.nome : `ID: ${id}`;
  };

  return (
  <div
    className="min-h-screen p-6 bg-blue-100 bg-[url('https://www.transparenttextures.com/patterns/waves.png')]"
    style={{ backgroundSize: "cover" }}
  >


      <h2 className="text-2xl font-semibold mb-4">Agendamentos</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Paciente</th>
              <th className="text-left py-2 px-4 border-b">Especialidade</th>
              <th className="text-left py-2 px-4 border-b">Data</th>
              <th className="text-left py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {editandoId === a.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={a.paciente}
                      onChange={(e) =>
                        handleInputChange(a.id, "paciente", e.target.value)
                      }
                    />
                  ) : (
                    a.paciente
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editandoId === a.id ? (
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={a.especialidade_id}
                      onChange={(e) =>
                        handleInputChange(
                          a.id,
                          "especialidade_id",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Selecione</option>
                      {especialidades.map((esp) => (
                        <option key={esp.id} value={esp.id}>
                          {esp.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getNomeEspecialidade(a.especialidade_id)
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editandoId === a.id ? (
                    <input
                      type="date"
                      className="border px-2 py-1 rounded w-full"
                      value={a.data}
                      onChange={(e) =>
                        handleInputChange(a.id, "data", e.target.value)
                      }
                    />
                  ) : (
                    a.data
                  )}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {editandoId === a.id ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => handleSalvar(a.id)}
                      >
                        Salvar
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => handleEditar(a.id)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleExcluir(a.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-medium mt-6 mb-2">Novo Agendamento</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          placeholder="Paciente"
          value={novoAgendamento.paciente}
          onChange={(e) =>
            handleNovoInputChange("paciente", e.target.value)
          }
        />
        


 <select
  className="border px-2 py-1 rounded flex-1 min-w-[150px]"
  value={String(novoAgendamento.especialidade_id)}
  onChange={(e) =>
    handleNovoInputChange("especialidade_id", parseInt(e.target.value))
  }
>
  <option value="">Especialidade</option>
  {especialidades.map((esp) => (
    <option key={esp.id} value={esp.id}>
      {esp.nome}
    </option>
  ))}
</select>





        <input
          type="date"
          className="border px-2 py-1 rounded flex-1 min-w-[150px]"
          value={novoAgendamento.data}
          onChange={(e) => handleNovoInputChange("data", e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={handleAdicionar}
        >
          Adicionar
        </button>
      </div>
    </div>

  );
};

export default Agendamentos;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL do seu back-end
});

// Funções de busca
export const getEspecialidades = () => api.get("/especialidades");
export const getAgendamentos = () => api.get("/agendamentos");
export const getSalas = () => api.get("/salas");

// Funções para manipular agendamentos
export const updateAgendamento = (id, agendamento) =>
  api.put(`/agendamentos/${id}`, agendamento);

export const createAgendamento = (agendamento) =>
  api.post("/agendamentos", agendamento);

export const deleteAgendamento = (id) =>
  api.delete(`/agendamentos/${id}`);

export default api;

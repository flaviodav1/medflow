import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Salas from "./pages/Salas";
import Especialidades from "./pages/Especialidades";
import Navbar from "./components/Navbar";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Navbar />
      
     
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/especialidades" element={<Especialidades />} />
      </Routes>
    </Router>
  );
}

export default App;

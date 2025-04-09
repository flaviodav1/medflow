import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/agendamentos">Agendamentos</Link></li>
        <li><Link to="/salas">Salas</Link></li>
        <li><Link to="/especialidades">Especialidades</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

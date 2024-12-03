import { Link } from "react-router-dom";

const AdminNav = () => {
   return (
      <nav className="nav">
         <Link to="/admin/perfil" className="nav__enlace">Editar Perfil</Link>
         <Link to="/admin/cambiar-password"  className="nav__enlace">Cambiar Contraseña</Link>
      </nav>
   );
}

export default AdminNav;
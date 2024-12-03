import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
   const { cerrarSesion } = useAuth();
   return (
      <header className="header">
         <div className="header__container">
            <h1 className="header__titulo">
               Administrador de Pacientes de {''}
               <span className="header__titulo--span">Veterinaria</span>
            </h1>
            <nav className="header__navegacion">
               <Link to="/admin" className="header__enlace">Pacientes</Link>
               <Link to="/admin/perfil" className="header__enlace">Perfil</Link>
               <button
                  type="button"
                  className="header__enlace"
                  onClick={cerrarSesion}
               >Cerrar Sesión</button>
            </nav>
         </div>
      </header>
   );
}

export default Header;
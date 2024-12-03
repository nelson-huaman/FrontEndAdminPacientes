import { useState } from "react";
import Formulario from "../components/Formulario";
import ListaPacientes from "../components/ListaPacientes";

const AdministrarPacientes = () => {
   
   const [ mostrarFormulario, setMostrarFormulario ] = useState(false);

   return (
      <div className="dashboard__flex">
         <button
            type="button"
            className="dashboard__enlace"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
         >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
         <div className={`dashboard__formulario ${mostrarFormulario ? 'dashboard__formulario--block' : 'dashboard__formulario--hidden'}`}>
            <Formulario />
         </div>
         <div className="dashboard__lista">
            <ListaPacientes />
         </div>
      </div>
   );
}

export default AdministrarPacientes;
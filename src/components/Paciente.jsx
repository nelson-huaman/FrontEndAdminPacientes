import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

   const { setEdicion, eliminarPaciente } = usePacientes();
   const { nombre, propietario, email, telefono, fecha, sintomas, _id } = paciente;

   const formaterFecha = fecha => {
      const nuevaFecha = new Date(fecha);
      return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
   }

   return (
      <div className="paciente">
         <p className="paciente__texto">Nombre: {''}
            <span className="paciente__texto--span">{ nombre }</span>
         </p>
         <p className="paciente__texto">Propietario: {''}
            <span className="paciente__texto--span">{ propietario }</span>
         </p>
         <p className="paciente__texto">Correo: {''}
            <span className="paciente__texto--span">{ email }</span>
         </p>
         <p className="paciente__texto">Telefono: {''}
            <span className="paciente__texto--span">{ telefono }</span>
         </p>
         <p className="paciente__texto">Fecha: {''}
            <span className="paciente__texto--span">{ formaterFecha(fecha) }</span>
         </p>
         <p className="paciente__texto">Síntomas: {''}
            <span className="paciente__texto--span">{ sintomas }</span>
         </p>
         <div className="paciente__acciones">
            <button
               type="button"
               className="paciente__boton"
               onClick={ () => setEdicion(paciente) }
            >Editar</button>
            <button
               type="button"
               className="paciente__boton paciente__boton--eliminar"
               onClick={ () => eliminarPaciente(_id) }
            >Eliminar</button>
         </div>
      </div>
   );
}

export default Paciente;
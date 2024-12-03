import usePacientes from '../hooks/usePacientes';
import Paciente from './Paciente';

const ListaPacientes = () => {

   const { pacientes } = usePacientes();

   return (
      <>
         { pacientes.length ? (
            <>
               <h2 className='dashboard__titulo'>Listado de Pacientes</h2>
               <p className='dashboard__texto'>
                  Administra tus {''}
                  <span className='dashboard__texto--span'>Pacientes y Citas</span>
               </p>

               { pacientes.map( paciente => (
                  <Paciente
                     key={paciente._id}
                     paciente={paciente}
                  />
               ))}
            </>
         ) : (
            <>
               <h2 className='dashboard__titulo'>No hay Pacientes</h2>
               <p className='dashboard__texto'>
                  Comienza agregando pacientes {''}
                  <span className='dashboard__texto--span'>y aparecerán ene este lugar</span>
               </p>
            </>
         ) }
      </>
   );
}

export default ListaPacientes;
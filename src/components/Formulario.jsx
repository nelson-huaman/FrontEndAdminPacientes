import { useEffect, useState } from "react";
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {

   const [ nombre, setNombre ] = useState('');
   const [ propietario, setPropietario ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ telefono, setTelefono ] = useState('');
   const [ fecha, setFecha ] = useState('');
   const [ sintomas, setSintomas ] = useState('');
   const [ id, setId ] = useState(null);

   const [ alerta, setAlerta ] = useState({});
   const { guardarPaciente, paciente } = usePacientes();

   useEffect( () => {
      if(paciente?.nombre){
         setNombre(paciente.nombre);
         setPropietario(paciente.propietario);
         setEmail(paciente.email);
         setTelefono(paciente.telefono);
         setFecha(new Date(paciente.fecha).toISOString());
         setSintomas(paciente.sintomas);
         setId(paciente._id);
      }
   }, [paciente]);

   const handleSubmit = e => {
      e.preventDefault();

      if([nombre, propietario, email, telefono, fecha, sintomas].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
         });
      }

      guardarPaciente({nombre, propietario, email, telefono, fecha, sintomas, id});
      setAlerta({
         msg: 'Cuardado correctamente'
      });

      setNombre('');
      setPropietario('');
      setEmail('');
      setTelefono('');
      setFecha('');
      setSintomas('');
      setId('');
      
   }

   const { msg } = alerta;
   return (
      <>

         <h2 className='dashboard__titulo'>Administrador de Pacientes</h2>
         <p className='dashboard__texto'>
            Añade tus Pacientes y {''}
            <span className='dashboard__texto--span'>Administralos</span>
         </p>

         <form className="formulario formulario--paciente" onSubmit={handleSubmit}>
            <fieldset className="formulario__fieldset">
               <div className="formulario__row">
                  <label htmlFor="nombre" className="formulario__label">Nombre</label>
                  <input
                     type="text"
                     id="nombre"
                     placeholder="Nombre de la Mascota"
                     className="formulario__input"
                     value={nombre}
                     onChange={e => setNombre(e.target.value)}
                  />
               </div>
               <div className="formulario__row">
                  <label htmlFor="propietario" className="formulario__label">Propietario</label>
                  <input
                     type="text"
                     id="propietario"
                     placeholder="Nombre del Propietario"
                     className="formulario__input"
                     value={propietario}
                     onChange={e => setPropietario(e.target.value)}
                  />
               </div>
               <div className="formulario__row">
                  <label htmlFor="email" className="formulario__label">Correo</label>
                  <input
                     type="email"
                     id="email"
                     placeholder="Correo del Propietario"
                     className="formulario__input"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className="formulario__row">
                  <label htmlFor="telefono" className="formulario__label">Telefono</label>
                  <input
                     type="tel"
                     id="telefono"
                     placeholder="Telefono del Propietario"
                     className="formulario__input"
                     value={telefono}
                     onChange={e => setTelefono(e.target.value)}
                  />
               </div>
               <div className="formulario__row">
                  <label htmlFor="fecha" className="formulario__label">Fecha</label>
                  <input
                     type="date"
                     id="fecha"
                     className="formulario__input"
                     value={fecha}
                     onChange={e => setFecha(e.target.value)}
                  />
               </div>
               <div className="formulario__row">
                  <label htmlFor="sintomas" className="formulario__label">Síntomas</label>
                  <textarea
                     id="sintomas"
                     placeholder="Describe sus Síntomas"
                     className="formulario__input"
                     value={sintomas}
                     onChange={e => setSintomas(e.target.value)}
                  />
               </div>
            </fieldset>
            <input type="submit" value={ id ? 'Guardar Cambios' : 'Agregar Paciente'} className="formulario__submit" />
         </form>

         { msg && <Alerta alerta={alerta} /> }
      </>
   );
}

export default Formulario;
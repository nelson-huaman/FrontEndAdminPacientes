import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

   const { auth, actualizarPerfil } = useAuth();
   const [ perfil, setPerfil ] = useState({});
   const [ alerta, setAlerta ] = useState({});

   useEffect( () => {
      setPerfil(auth);
   }, [auth]);

   const handleSubmit = async e => {
      e.preventDefault();

      const { nombre, email } = perfil;
      if([nombre, email].includes('')) {
         setAlerta({
            msg: 'Email y Nombre son obligarorios',
            error: true
         });
         return;
      }

      const resultado = await actualizarPerfil(perfil);
      setAlerta(resultado);
   }

   const { msg } = alerta;
   
   return (
      <>
         <AdminNav />
         <h2 className="dashboard__titulo">Editar Perfil</h2>
         <p className="dashboard__texto">
            Modifica tu {''}
            <span className="dashboard__texto--span">Información aquí</span>
         </p>
         <div className="dashboard__contenido">

            { msg && <Alerta alerta={alerta} /> }

            <form className="formulario" onSubmit={handleSubmit}>
               <fieldset className="formulario__fieldset">
                  <div className="formulario__row">
                     <label htmlFor="nombre" className="formulario__label">Nombre</label>
                     <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        className="formulario__input"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="web" className="formulario__label">Sitio Web</label>
                     <input
                        type="text"
                        id="web"
                        name="web"
                        placeholder="Sitio Web"
                        className="formulario__input"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="telefono" className="formulario__label">Telefono</label>
                     <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Telefono"
                        className="formulario__input"
                        value={perfil.telefono || ''}
                        onChange={e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="email" className="formulario__label">Correo</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo"
                        className="formulario__input"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                           ...perfil,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
               </fieldset>
               <input type="submit" value="Guardar Cambios" className="formulario__submit" />
            </form>
         </div>
      </>
   );
}

export default EditarPerfil;
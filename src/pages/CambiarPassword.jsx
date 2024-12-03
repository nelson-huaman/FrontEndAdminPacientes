import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
   const { guardarPassword } = useAuth();
   const [ alerta, setAlerta ] = useState({});
   const [ password, setPassword ] = useState({
      password_actual: '',
      password_nuevo: ''
   });

   const handleSubmit = async e => {
      e.preventDefault();
      if(Object.values(password).some( campo => campo === '')) {
         setAlerta({
            msg: 'Todo los campos con oblogatorios',
            error: true
         });
         return;
      }

      if( password.password_nuevo.length < 6) {
         setAlerta({
            msg: 'La contraseña debe de tener minimo 6 caracteres',
            error: true
         });
         return;
      }

      const resultado = await guardarPassword(password);
      setAlerta(resultado);
      setPassword({
         password_actual: '',
         password_nuevo: ''
      });
   }

   const { msg } = alerta;

   return (
      <>
         <AdminNav />
         <h2 className="dashboard__titulo">Cambiar Contraseña</h2>
         <p className="dashboard__texto">
            Modifica tu {''}
            <span className="dashboard__texto--span">Contraseña aquí</span>
         </p>
         <div className="dashboard__contenido">
            { msg && <Alerta alerta={alerta} /> }
            <form className="formulario" onSubmit={handleSubmit}>
               <fieldset className="formulario__fieldset">
                  <div className="formulario__row">
                     <label htmlFor="password_actual" className="formulario__label">Contraseña Actual</label>
                     <input
                        type="password"
                        id="password_actual"
                        name="password_actual"
                        placeholder="Contraseña Actual"
                        className="formulario__input"
                        value={password.password_actual}
                        onChange={e => setPassword({
                           ...password,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="password_nuevo" className="formulario__label">Contraseña Nuevo</label>
                     <input
                        type="password"
                        id="password_nuevo"
                        name="password_nuevo"
                        placeholder="Contraseña Nuevo"
                        className="formulario__input"
                        value={password.password_nuevo}
                        onChange={e => setPassword({
                           ...password,
                           [e.target.name]: e.target.value
                        })}
                     />
                  </div>
               </fieldset>
               <input type="submit" value="Actualizar Contraseña" className="formulario__submit" />
            </form>
         </div>
      </>
   );
}

export default CambiarPassword;
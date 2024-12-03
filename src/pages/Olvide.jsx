import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Olvide = () => {

   const [ email, setEmail ] = useState('');
   const [ alerta, setAlerta ] = useState({})

   const handleSubmit = async e => {
      e.preventDefault();
      
      if(email === '' || email.length < 6) {
         setAlerta({
            msg: 'El Correo es obligatorio',
            error: true
         });
         return;
      }

      try {
         const { data } = await clienteAxios.post('/veterinarios/olvide', {email});
         setAlerta({
            msg: data.msg
         })
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })
      }
   }

   const { msg } = alerta;

   return (
      <>
         <div className="auth">
            <h1 className="auth__nombre">
               Recuperer Contraseña y Administra {""}
               <span className="auth__nombre--span">tus Pacientes</span>
            </h1>

            {msg && <Alerta
               alerta={alerta}
            />}
            
            <form className="formulario" onSubmit={handleSubmit}>
               <fieldset className="formulario__fieldset">
                  <div className="formulario__row">
                     <label htmlFor="email" className="formulario__label">Correo</label>
                     <input
                        type="text"
                        id="email"
                        placeholder="Tu Correo"
                        className="formulario__input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
               </fieldset>
               <input type="submit" value="Enviar Instrucciones" className="formulario__submit" />
            </form>
            <nav className="auth__footer">
               <Link className="auth__enlace" to="/">
                  ¿Ya tienes una cuenta? Inicia Sesión
               </Link>
               <Link className="auth__enlace" to="/registrar">
                  ¿No tienes una cuenta? Regístare
               </Link>
            </nav>
         </div>
      </>
   );
}

export default Olvide;
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

   const [ password, setPassword ] = useState('');
   const [ alerta, setAlerta ] = useState({});
   const [ tokenValido, setTokenValido ] = useState(false);
   const [ passwordModificado, setPasswordModificado ] = useState(false);

   const params = useParams();
   const { token } = params;

   useEffect( () => {
      const comprobarToken = async () => {
         try {
            await clienteAxios(`/veterinarios/olvide/${token}`);
            setAlerta({
               msg: 'Coloca tu nueva contraseña'
            });
            setTokenValido(true);
         } catch (error) {
            setAlerta({
               msg: 'Hubo un error con el enlace',
               error: true
            })
         }
      }
      comprobarToken();
   }, []);

   const handleSubmit = async e => {
      e.preventDefault();
      
      if(password.length < 6) {
         setAlerta({
            msg: 'La contraseña debe ser mínimo de 6 caracteres',
            error: true
         });
         return;
      }

      try {
         const url = `/veterinarios/olvide/${token}`;
         const { data } = await clienteAxios.post(url, {password});
         setAlerta({
            msg: data.msg
         });
         setPasswordModificado(true);
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
               Reestablece tu contraseña y no pierdas acceso a {""}
               <span className="auth__nombre--span">tus Pacientes</span>
            </h1>

            {msg && <Alerta
               alerta={alerta}
            />}

            {tokenValido && (
               <form className="formulario" onSubmit={handleSubmit}>
                  <fieldset className="formulario__fieldset">
                     <div className="formulario__row">
                        <label htmlFor="password" className="formulario__label">Nueva Contraseña</label>
                        <input
                           type="password"
                           id="password"
                           placeholder="Nueva Contraseña"
                           className="formulario__input"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                        />
                     </div>
                  </fieldset>
                  <input type="submit" value="Guardar Nueva Contraseña" className="formulario__submit" />
               </form>
            )}
            
            {passwordModificado && 
               <nav className="auth__footer">
                  <Link className="auth__enlace" to="/">
                     Iniciar Sesión
                  </Link>
               </nav>
            }
            
         </div>
      </>
   );
}

export default NuevoPassword;
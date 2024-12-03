import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

   const [ nombre, setNombre ] = useState('');
   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ repetirPassword, setRepetirPassword ] = useState('');
   const [ alerta, setAlerta ] = useState({msg: '', error: false});

   const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPassword].includes('')) {
         setAlerta({
            msg: 'Hay campos vacíos',
            error: true
         });
         return;
      }

      if(password !== repetirPassword) {
         setAlerta({
            msg: 'la contraseña no son iguales',
            error: true
         });
         return;
      }
      if(password.length < 6){
         setAlerta({
            msg: 'La contraseña es muy corto, agrega mínimo 6 caracteres',
            error: true
         })
      }

      setAlerta({});

      // Crear el usuario con la API
      try {
         await clienteAxios.post('/veterinarios', {nombre, email, password})
         setAlerta({
            msg: 'Creado correctamente, revisa tu correo'
         });
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })
      }

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
   }

   const { msg } = alerta;

   return (
      <>
         <div className="auth">
            <h1 className="auth__nombre">
               Crea tu Cuenta y Administra {""}
               <span className="auth__nombre--span">tus Pacientes</span>
            </h1>

            {msg && <Alerta
               alerta={alerta}
            />}

            <form className="formulario" onSubmit={handleSubmit}>
               <fieldset className="formulario__fieldset">
                  <div className="formulario__row">
                     <label htmlFor="nombre" className="formulario__label">Nombre</label>
                     <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre"
                        className="formulario__input"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="email" className="formulario__label">Correo</label>
                     <input
                        type="text"
                        id="email"
                        placeholder="Correo"
                        className="formulario__input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="password" className="formulario__label">Contraseña</label>
                     <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        className="formulario__input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>
                  <div className="formulario__row">
                     <label htmlFor="password2" className="formulario__label">Repetir Contraseña</label>
                     <input
                        type="password"
                        id="password2"
                        placeholder="Repetir Contraseña"
                        className="formulario__input"
                        value={repetirPassword}
                        onChange={e => setRepetirPassword(e.target.value)}
                     />
                  </div>
               </fieldset>
               <input type="submit" value="Crear Cuenta" className="formulario__submit" />
            </form>
            <nav className="auth__footer">
               <Link className="auth__enlace" to="/">
                  ¿Ya tienes una cuenta? Iniciar Sesión
               </Link>
               <Link className="auth__enlace" to="/olvide">
                  Olvide mi Contraseña
               </Link>
            </nav>
         </div>
      </>
   );
}

export default Registrar;
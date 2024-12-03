import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';
import clienteAxios from "../config/axios";

const Login = () => {

   const [ email, setEmail ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ alerta, setAlerta ] = useState({});

   const { setAuth } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async e => {
      e.preventDefault();
      
      if([email, password].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
         });
         return;
      }

      try {
         const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
         localStorage.setItem('token', data.token);
         setAuth(data);
         navigate('/admin');
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
               Inicia Sesión y Administra {""}
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
                  <div className="formulario__row">
                     <label htmlFor="password" className="formulario__label">Contraseña</label>
                     <input
                        type="password"
                        id="password"
                        placeholder="Tu Contraseña"
                        className="formulario__input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>
               </fieldset>
               <input type="submit" value="Iniciar Sesión" className="formulario__submit" />
            </form>
            <nav className="auth__footer">
               <Link className="auth__enlace" to="/registrar">
                  ¿No tienes una cuenta? Regístare
               </Link>
               <Link className="auth__enlace" to="/olvide">
                  Olvide mi Contraseña
               </Link>
            </nav>
         </div>
      </>
   );
}

export default Login;
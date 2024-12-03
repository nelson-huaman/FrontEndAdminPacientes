import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';

const Confirmar = () => {

   const [ confirmado, setConfirmado ] = useState(false);
   const [ cargando, setCargando ] = useState(true);
   const [ alerta, setAlerta ] = useState({});

   const params = useParams();
   const { id } = params;

   useEffect( () => {
      const confirmarCuenta = async () => {
         try {
            const url = `/veterinarios/confirmar/${id}`;
            const { data } = await clienteAxios(url);

            setConfirmado(true);
            setAlerta({
               msg: data.msg
            })
         } catch (error) {
            setAlerta({
               msg: error.response.data.msg,
               error: true
            });
         }
         setCargando(false);
      }
      confirmarCuenta();
   }, []);

   return (
      <>
         <div className="auth">
            <h1 className="auth__nombre">
               Confirma tu Cuenta y Empieza a  Administrar {""}
               <span className="auth__nombre--span">tus Pacientes</span>
            </h1>
            
            {!cargando && <Alerta
               alerta={alerta}
            />}

            {confirmado && (
               <nav className="auth__footer">
                  <Link className="auth__enlace" to="/">Iniciar Sesión</Link>
               </nav>
            )}
            
         </div>
      </>
   );
}

export default Confirmar;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Header from "../components/Header";
import Footer from '../components/Footer';

const RutaProtegida = () => {
   const { auth, cargando } = useAuth();
   if(cargando) return 'Cargando...';
   
   return (
      <>
         <Header />
            {auth?._id ? (
               <main className="dashboard">
                  <Outlet />
               </main>
            ) : <Navigate to="/" />}
         <Footer />
      </>
   )
}

export default RutaProtegida;
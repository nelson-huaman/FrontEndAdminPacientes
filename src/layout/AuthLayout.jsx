import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <>
         <main className="main">
            <Outlet />
         </main>
      </>
   );
}

export default AuthLayout;
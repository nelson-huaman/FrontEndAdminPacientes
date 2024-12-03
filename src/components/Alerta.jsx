
const Alerta = ({alerta}) => {
   return (
      <div className={`alerta ${alerta.error ? 'alerta--error' : 'alerta--exito'}`}>
         {alerta.msg}
      </div>
   );
}

export default Alerta;
const Mensaje = ({ children, tipo}) => {
  return (
    //creamos la clase alerta y ponemos una alerta para que se dinamico(error o correcto)
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje
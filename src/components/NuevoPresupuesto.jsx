import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto
}) => {
    
    const [mensaje, setMensaje] = useState('')

    const handlepresupuesto = (e) => {
        e.preventDefault();  // cada vez que se presione sumit en el formulario se llama esta funcion
        //validamos el presupuesto ingresado
        if(!presupuesto || presupuesto < 0 ) {
            setMensaje('no es un presupuesto valido')

            //con el return hacemos que en caso de colocar un presupuesto valido no se vuelva a ejecutar este if y no evitamos poner un else
            return   
        }
        setMensaje('')
        setIsValidPresupuesto(true)  //modificamos el valor del validador de presupuesto
        
    }


    return (
            <div className="contenedor-presupuesto contenedor sombra">
                <form onSubmit={handlepresupuesto} className="formulario">
                    <div className="campo">
                        <label>Definir Presupuesto</label>
                        <input 
                            className="nuevo-presupuesto"
                            type="number"
                            placeholder="Anade Tu Presupuesto"
                            value={presupuesto > 0 && presupuesto}  //si presupuesto mayor a cero entonces coloca el presupuesto
                            //por cada e en el input se reescribira en el componenete presupuesto con setpresupuesto
                            onChange={ e => setPresupuesto(Number(e.target.value))} //convertimos el presupuesto de string a numero
                        />
                    
                    </div>   
                    <input type="submit" value="añadir" />

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                </form>
            </div>
  )
}

export default NuevoPresupuesto
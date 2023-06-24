import { useState ,useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

import {formatearCantidad} from '../helpers/index'

const ControlPresupuesto = ({
        gastos, 
        setGastos, 
        presupuesto, 
        setPresupuesto,
        setIsValidPresupuesto
    }) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState (0)

    useEffect(() => {
      //.reduce alamacena una cantidad en una variable, toma dos argumentos total(v almacena) 
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)  // por cada gasto en gastos la cantidad del gasto va a ser sumada con el total que arranca en 0
      const disponible = presupuesto - totalGastado

      //calcular porcentaje gastado
      const nuevoPorcentage = ( (( totalGastado / presupuesto) * 100).toFixed(2) )
      
      setDisponible(disponible)
      setGastado(totalGastado)
      
      //despues de 1500 milisegundos(1.5 segundos llamar a set presupuesto)
      setTimeout(() =>{
        setPorcentaje(nuevoPorcentage)
      }, 1500);
    }, [gastos])

    useEffect( () => {
        if(porcentaje > 100){
            const resultado = confirm('Ya has superado el presupuesto deseas continuar')
            if(!resultado){
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
            }
        }
    }, [porcentaje])

    const handleResetApp = () => {
        const resultado = confirm('Desea reiniciar la app')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  
    


    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    //utilizamos la funcion buildstyles para aplicar estilos ccs
                    styles={buildStyles({
                        //si el porcentaje es mayor a 100 coloca el color en rojo de lo contrario
                        pathColor : porcentaje > 100 ? '#DC2626' : '#3bf6e6',   //color de la barra que se llena
                        trailColor : '#F5F5F5',   //color de fondo de la barra    
                        textColor : porcentaje > 100 ? '#DC2626' : '#3bf6e6'     //le colocamos un color al texto de la barra
                    })}
                    value = {porcentaje}
                    text= {`${porcentaje}% Gastado`}  //creamos el texto que aparecera dentro de la barra progresiva
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)} 
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Displonible: </span> {formatearCantidad(disponible)} 
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)} 
                </p>

            </div>
        </div>
    )
}

export default ControlPresupuesto
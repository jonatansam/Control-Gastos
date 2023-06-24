import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

// // cuando hay muchos props es recomendado tabularlos para verlos mejor
const Header = ({   
    gastos,
    setGastos,   
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto
   
}) => {
  return (
        <header>
            <h1>Planificador de Gastos</h1>

            
            {isValidPresupuesto ? (      //si el presupuesto es valido(true) coloca
                <ControlPresupuesto 
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                    
                />

            ) : (            // de lo contrario llama al componente de definir presupuesto
                <NuevoPresupuesto 
                    presupuesto= {presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />

            )}

        </header>
  )
}

export default Header
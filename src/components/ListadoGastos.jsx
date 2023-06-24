import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastos, setGastoEditar, eliminarGasto,filtro, gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">

        
        {/* si hay filtro entonces (?) de lo contrario ( : )*/}
        { filtro ? (
              <>
                {/* si la cantidad de gastos filtrados es mas de 1 entonces coloca gastos de lo contarrio no hay gastos */}
                <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos En Esta Categoria'}</h2>
                {gastosFiltrados.map( gasto => (     //por cada gasto en gastosfiltrados entonces creamos un nuevo componenete(Gasto)
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />
                ))}
              </>
         ) : (
              <>
              
                {/* si la cantidad de gastos es mas de 1 entonces coloca gastos de lo contarrio no hay gastos */}
                <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
                {gastos.map( gasto => (    
                  <Gasto
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                  />
                ))}
              </>
        )}
        
     

    </div>
  )
}

export default ListadoGastos
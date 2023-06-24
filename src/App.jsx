import { useState, useEffect } from 'react'

import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'   //forma de importar imagenes en formato svg



function App() {

  const [gastos, setGastos] = useState(
    //busca el item gastos en local storage si esta conviertelo a json y coloca lo que hay de lo contrario coloca una lista vacia []
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) :  []
  )


  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0    //si en localstorage esta el item presupuesto entonces coloca lo que haya ahi si no coloca 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)  //creamos el estado para la ventana modal de añadir gasto
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  
  useEffect( () => {
    // si el objeto gastoeditar tiene mas de una llave entonces llama a handlenuevogasto
    if( Object.keys(gastoEditar).length > 0) {
      setModal(true)
      
      setTimeout(() => {    //realiza una accion despues de tantos segundos(milisegundos)
        setAnimarModal(true)
      }, 500);
    }
    
  }, [gastoEditar])
  
  
  //creamos el usse effect para almacenar los datos en local strorage
  useEffect (()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])
  
  
  useEffect(() => {
    // crea el item gasos en localstorage y ponle un arreglo convertido a string de los gastos
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos] )

  useEffect(() =>{
    //por cada categoria de gasto en gastos traeme todos los que sean igual al filtro
    const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  },[filtro])
  

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {    //realiza una accion despues de tantos segundos(milisegundos)
        setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {   //almacenamos el objeto de gastos en el estado gasto
    
    if(gasto.id){
      //actualizar gasto
      //por cada gastostate en gastosstate si el id de gastossate es igual al id de gasto entonces retorna el gasto(editado) si no retorna el gastostate(nuevo) 
      const gastosActualizados = gastos.map( gastosstate => gastosstate.id === gasto.id ? gasto : gastosstate)
      setGastos(gastosActualizados)
      

    } else{
      
      gasto.id = generarId();      //creamos id unico para cada gasto
      gasto.fecha = Date.now();    //creamos fecha de creacion
      setGastos([...gastos, gasto])  
    }
    

    setAnimarModal(false)    //creamos animacion para que desaparesca uno y despues cierre la ventana modal( 0.5s)
    setGastoEditar({}) 
    
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {

    //por cada gasto en gastos trae todos los que seab diferentes al id de la funcion
    const gastosactualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosactualizados)
  }


  


  return (
      <div className={modal ? 'fijar' : ''}>
        <Header 
          gastos={gastos}
          setGastos={setGastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          
        />

        {isValidPresupuesto && (     //si el presupuesto es valido crea el boton de agregar gastos
          <>
            <main>
                <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
                />
                <ListadoGastos
                    gastos = {gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                />
            </main>

            <div className="nuevo-gasto">
                <img
                    src={IconoNuevoGasto}
                    alt="Icono Nuevo Gasto" 
                    onClick={handleNuevoGasto}  //si hay un click en el + llama a la funcion handle nuevo gasto
                />

            </div>
          </>
        )}
        
        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}  
       
      </div>
  )
}

export default App

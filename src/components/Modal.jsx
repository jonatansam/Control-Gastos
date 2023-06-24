import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria,setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setID] = useState('')    //state donde se almacenara el id

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setID(gastoEditar.id)  //tomamos el id del gasto a editar y lo colocamos en el state de id
            setFecha(gastoEditar.fecha)
        }
    }, [])

    
    const OcultarModal = () => {     //cambiamos el modal a false para cerrarlo
        
        setAnimarModal(false)    //creamos animacion para que desaparesca uno y despues cierre la ventana modal( 0.5s)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);
        
        
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes('')){     //si alguno de los campos del formulario esta vacio entonces 
            setMensaje('todos los campos son obligatorios')
            
            setTimeout(() => {     // colocamos el settimeou para que el mensaje desaparezca despues de n segundos
                setMensaje('')
            }, 3000);

            return;
        }

        // si los campos estan llenos entonces creamos objeto de gasto
        guardarGasto({ nombre,cantidad,categoria, id, fecha})
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src= {CerrarBtn} 
                    alt="boton para cerrar modal"
                    onClick={OcultarModal}
                />
            </div>
            
            {/* si animarmodal esta en true entonces añade a formulario la clase animar de lo contrario */}
            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                
                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend> 

                {/* si hay un mensaje entonces cargar el componenete Mensaje */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input 
                        id="nombre"
                        type="text" 
                        placeholder="Añade El Nombre Del Gasto" 
                        value={nombre}    //el value es para escribir en el input si se deja vacio no se puede escribir
                        onChange={ e => setNombre(e.target.value)}  //lo que se escribe en el input se almacena en el state de nombre
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>

                    <input 
                        id="cantidad"
                        type="number" 
                        placeholder="Añade La Cantidad  Del Gasto" 
                        value={cantidad}    //el value es para escribir en el input si se deja vacio no se puede escribir
                        onChange={ e => setCantidad( Number(e.target.value))}  //lo que se escribe en el input se almacena en el state de nombre


                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>

                    <select
                        id="Categoria"    
                        value={categoria}
                        onChange={ e => setCategoria( e.target.value)}                 
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Subcripciones</option>
                        
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Anadir Gasto"}
                />

            </form>

        </div>
    )
}

export default Modal
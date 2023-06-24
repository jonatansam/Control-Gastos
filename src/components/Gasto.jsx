import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'

import { formatearFecha } from '../helpers/index'


import iconoAhorro from '../img/ahorro.png'
import iconoCasa from '../img/casa.avif'
import iconoComida from '../img/icono_comida.svg'
import iconoGastos from '../img/icono_gastos.svg'
import iconoOcio from '../img/icono_ocio.svg'
import iconoSalud from '../img/images.png'
import iconoSuscripciones from '../img/suscripciones.avif'

const diccionarioIconos = {
    ahorro : iconoAhorro,
    comida: iconoComida,
    casa: iconoCasa,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones
}


const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

  const {categoria, nombre, cantidad, id, fecha} = gasto;    //descomprimimos propiedades del gasto

  const leadingActions = () => (
      <LeadingActions>
          <SwipeAction onClick={ () => setGastoEditar(gasto)}>
              Editar
          </SwipeAction>
      </LeadingActions>
  )

  const trailingActions = () => (
      <TrailingActions>
          <SwipeAction 
          onClick={ () => eliminarGasto(id)}
          destructive={true}   //accion para crear una transicion al eliminar
          >
              Eliminar
          </SwipeAction>
      </TrailingActions>
  )


  return (
      <SwipeableList>
          <SwipeableListItem
              leadingActions={leadingActions()}  //funcion para dezlisar hacia la izquierda
              trailingActions={trailingActions()}  //funcion para deslizar hacia la derecha
          >
              <div className="gasto sombra">
                  <div className="contenido-gasto">
                      <img 
                          //la imagen va a ser tomada del clave de la categoria en diccionarioiconos y alli tomara el valor(imagen)
                          src={diccionarioIconos[categoria]}
                          alt="Icono Gasto" 
                      />
                      <div className="descripcion-gasto">
                          <p className="categoria">{categoria}</p>
                          <p className="nombre-gasto">{nombre}</p>
                          <p className="fecha-gasto">
                              Agregando el: {''}
                              <span>{formatearFecha(fecha)}</span>
                          </p>
                      </div>
                  </div>
                  <p className="cantidad-gasto">${cantidad}</p>
              </div>
          </SwipeableListItem>
      </SwipeableList>
  )
}

export default Gasto
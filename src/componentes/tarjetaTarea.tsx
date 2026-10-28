import './tarea.css'
import type {Tarea} from "../interfaces/Tarea.ts";

interface Props {
    tarea: Tarea;
    onEliminar: (id: number) => void;
}

function TarjetaTarea({tarea, onEliminar}: Props) {
    return (
        <div className="tarjeta">
            <h3>{tarea.titulo}</h3>
            {tarea.descripcion && <p>{tarea.descripcion}</p>}
            <p>{tarea.responsable}</p>
            <button type="button" onClick={() => onEliminar(tarea.id)}>
                Eliminar
            </button>
        </div>
    );
}

export default TarjetaTarea;
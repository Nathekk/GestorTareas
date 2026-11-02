import type {Tarea} from "../interfaces/Tarea.ts";
import styled from "@emotion/styled";
// ESTILOS
const Tarjeta = styled.div`
    border: 1px solid #0072ff;
    border-radius: 8px;
    padding: 16px;
    background: #eaf7ff;
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
        margin: 0;
    }
`;

interface Props {
    tarea: Tarea;
    onEliminar: (id: string) => void;
}

function TarjetaTarea({tarea, onEliminar}: Props) {
    return (
        <Tarjeta>
            <h3>{tarea.titulo}</h3>
            {tarea.descripcion && <p>{tarea.descripcion}</p>}
            <p>{tarea.responsable}</p>
            <button type="button" onClick={() => onEliminar(tarea.id)}>
                Eliminar
            </button>
        </Tarjeta>
    );
}

export default TarjetaTarea;
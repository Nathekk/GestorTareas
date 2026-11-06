import type {Tarea} from "../interfaces/Tarea.ts";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router';
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
const BotonEliminar = styled.button`
    background-color: red;
    color: white;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
        background-color: #b90000;
    }
`;

    const Boton = styled.button`
    background-color: #0072ff;
    color: white;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
        background-color: #005bb5;
    }
`;

interface Props {
    tarea: Tarea;
    onEliminar: (id: string) => void;
}

function TarjetaTarea({tarea, onEliminar}: Props) {
    const navigate = useNavigate();
    return (
        <Tarjeta>
            <h3>{tarea.titulo}</h3>
            {tarea.descripcion && <p>{tarea.descripcion}</p>}
            <p>{tarea.responsable}</p>
            <Boton type="button" onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>
                Editar
            </Boton>
            <BotonEliminar type="button" onClick={() => onEliminar(tarea.id)}>
                Eliminar
            </BotonEliminar>
        </Tarjeta>
    );
}

export default TarjetaTarea;
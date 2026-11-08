import {useNavigate} from 'react-router';
import FormularioTarea from "../componentes/FormularioTarea.tsx";
import {useState} from "react";
import styled from "@emotion/styled";


const MensajeError = styled.p`
    color: red;
    font-size: 14px;
`;

function NuevaTarea() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function guardar(titulo: string, descripcion: string, responsable: string) {
        const nueva = {
            titulo: titulo,
            descripcion: descripcion,
            responsable: responsable,
        };
        setError("");
        try {
            const api = "http://localhost:3000/tareas";
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nueva),
            });

            if (!response.ok) {
                throw new Error("Error al crear tarea");
            }
            navigate("/tareas")

        } catch (error) {
            console.error("Error creando tarea", error);
            setError("No se pudo crear la tarea");
            throw error
        }
    }

    return (
        <div>
            <h2>Crear Tarea</h2>
            {error && <MensajeError>{error}</MensajeError>}

            <FormularioTarea onGuardar={guardar} onCancelar={() => navigate("/tareas")}/>
        </div>
    );
}


export default NuevaTarea;

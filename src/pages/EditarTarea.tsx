import {useParams, useNavigate} from 'react-router';
import FormularioTarea from "../componentes/FormularioTarea.tsx";
import {useEffect, useState} from "react";
import type {Tarea} from "../interfaces/Tarea.ts";
import styled from "@emotion/styled";


const MensajeError = styled.p`
    color: red;
    font-size: 14px;
`;

function EditarTarea() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tarea, setTarea] = useState<Tarea>({id: "", titulo: "", descripcion: "", responsable: ""});
    const [error, setError] = useState("");


    //GET PARA TOMAR EL ID Y COSAS DE LA TAREA
    useEffect(() => {
        async function cargarTarea() {
            try {
                const api = `http://localhost:3000/tareas/${id}`;
                const response = await fetch(api);
                if (response.ok) {
                    const data = await response.json();
                    setTarea(data);
                } else {
                    setError("No existe la tarea");
                }
            } catch (error) {
                console.error("Error al cargar la tarea", error);
            }
        }

        if (id) {
            cargarTarea();
        }
    }, [id]);


    const handleGuardar = async (titulo: string, descripcion: string, responsable: string) => {
        try {
            const api = `http://localhost:3000/tareas/${id}`;
            const response = await fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({titulo, descripcion, responsable}),
            });

            if (response.ok) {
                console.error("Todo perfeccto, actualizado");
                navigate('/tareas');
            }
        } catch (error) {
            console.error("Error creando tarea", error);
        }
    };

    return (
        <div>
            <h2>Editar Tarea</h2>
            <p>Editando la tarea con ID: <strong>{id}</strong></p>
            {error && <MensajeError>{error}</MensajeError>}

            {tarea && (
                <FormularioTarea key={tarea.id} tareaObtenida={tarea} onGuardar={handleGuardar}
                                 onCancelar={() => navigate('/tareas')}/>
            )}
        </div>
    );
}

export default EditarTarea;

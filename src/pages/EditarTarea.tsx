import {useParams, useNavigate} from 'react-router';
import FormularioTarea from "../componentes/FormularioTarea.tsx";
import {useEffect, useState} from "react";

function EditarTarea({}) {
    const {id} = useParams();
    const navigate = useNavigate();

    const [tarea, setTarea] = useState(null);

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
                    console.error("No se pudo encontrar la tarea");
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

            <FormularioTarea onGuardar={handleGuardar} onCancelar={() => navigate('/tareas')}/>
        </div>
    );
}

export default EditarTarea;

import {useState} from "react";

interface Props {
    onGuardar: (titulo: string, descripcion: string, responsable: string) => void;
    onCancelar: () => void;
}

//EL FORMUALRIO MODAL
function FormularioTarea({onGuardar, onCancelar}: Props) {
    //vi que era mejor hacerlo de esta forma viendo ejemplos de youtube y documentacion
    const [nuevaTarea, setNuevaTarea] = useState({titulo: '', descripcion: '', responsable: ''})
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nuevaTarea.titulo.trim() === "" || nuevaTarea.responsable.trim() === "") {
            setError("El titulo y el responsable no deben estar vacios");
            return;
        }
        setError("");

        const api = "http://localhost:3000/tareas"
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: nuevaTarea.titulo.trim(),
                descripcion: nuevaTarea.descripcion.trim(),
                responsable: nuevaTarea.responsable.trim(),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Nueva tarea creao', data);
                onGuardar(nuevaTarea.titulo.trim(), nuevaTarea.descripcion.trim(), nuevaTarea.responsable.trim());
                setNuevaTarea({titulo: "", descripcion: "", responsable: ""});
            })
            .catch((error) => console.error('Error creando tarea', error));
    }

    return (
        <form className="formulario-tarea" onSubmit={handleSubmit}>
            {/*la interfaz modal del formulario*/}
            <h2>Nueva tarea</h2>

            <label>
                Título
                <input type="text" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                />
            </label>

            <label>
                Descripción
                <textarea value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}/>
            </label>

            <label>
                Responsable
                <input type="text" value={nuevaTarea.responsable} onChange={(e) => setNuevaTarea({ ...nuevaTarea, responsable: e.target.value })}/>
            </label>

            {error && <p className="error">{error}</p>}

            <div className="botones-formulario">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioTarea;
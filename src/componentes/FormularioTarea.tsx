import {useState} from "react";

interface Props {
    onGuardar: (titulo: string, descripcion: string, responsable: string) => void;
    onCancelar: () => void;
}

//EL FORMUALRIO MODAL
function FormularioTarea({onGuardar, onCancelar}: Props) {
    const [nuevaTarea, setNuevaTarea] = useState({titulo: '', descripcion: '', responsable: ''})
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nuevaTarea.titulo.trim() === "" || nuevaTarea.responsable.trim() === "") {
            setError("El titulo y el responsable no deben estar vacios");
            return;
        }
        setError("");

        onGuardar(nuevaTarea.titulo.trim(), nuevaTarea.descripcion.trim(), nuevaTarea.responsable.trim());
        setNuevaTarea({titulo: "", descripcion: "", responsable: ""});
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
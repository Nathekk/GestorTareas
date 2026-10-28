import {useState} from "react";

interface Props {
    onGuardar: (titulo: string, descripcion: string, responsable: string) => void;
    onCancelar: () => void;
}
//EL FORMUALRIO MODAL
function FormularioTarea({onGuardar, onCancelar}: Props) {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [responsable, setResponsable] = useState("");
    const [error, setError] = useState("");

    return (
        <form className="formulario-tarea" onSubmit={(e) => {
            e.preventDefault();
            //la validacion, con el trim para los espacios, y mira si esta vacio, si esta vacio te salta el error, al guardar quita todos los espacios, y deja el formulario vacio

            if (titulo.trim() === "" || responsable.trim() === "") {
                setError("El titulo y el responsable no deben estar vacios");
                return;
            }

            setError("");
            onGuardar(titulo.trim(), descripcion.trim(), responsable.trim());

            setTitulo("");
            setDescripcion("");
            setResponsable("");
        }}
        >
            {/*la interfaz modal del formulario*/}
            <h2>Nueva tarea</h2>

            <label>
                Título
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}
                />
            </label>

            <label>
                Descripción
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            </label>

            <label>
                Responsable
                <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)}/>
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
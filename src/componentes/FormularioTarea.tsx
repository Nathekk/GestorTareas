import {useState} from "react";
import styled from "@emotion/styled";
import type {Tarea} from "../interfaces/Tarea.ts";

//ESTILOOS
const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;

    label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-weight: 600;
    }

    input, textarea {
        padding: 6px;
    }
`;

const BotonesFormulario = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`;

const MensajeError = styled.p`
    color: red;
    font-size: 14px;
`;

interface Props {
    tareaObtenida?: Tarea | null;
    onGuardar: (titulo: string, descripcion: string, responsable: string) => Promise<void>;
    onCancelar: () => void;
}

//EL FORMUALRIO MODAL
function FormularioTarea({tareaObtenida, onGuardar, onCancelar}: Props) {
    const [nuevaTarea, setNuevaTarea] = useState({
        titulo: tareaObtenida?.titulo ?? "",
        descripcion: tareaObtenida?.descripcion ?? "",
        responsable: tareaObtenida?.responsable ?? "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nuevaTarea.titulo.trim() === "" || nuevaTarea.responsable.trim() === "") {
            setError("El titulo y el responsable no deben estar vacios");
            return;
        }
        setError("");
        await onGuardar(nuevaTarea.titulo.trim(), nuevaTarea.descripcion.trim(), nuevaTarea.responsable.trim());


    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <h2>{tareaObtenida ? "Editar tarea" : "Nueva tarea"}</h2>

            <label>
                Título
                <input type="text" value={nuevaTarea.titulo}
                       onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})}
                />
            </label>

            <label>
                Descripción
                <textarea value={nuevaTarea.descripcion}
                          onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})}/>
            </label>

            <label>
                Responsable
                <input type="text" value={nuevaTarea.responsable}
                       onChange={(e) => setNuevaTarea({...nuevaTarea, responsable: e.target.value})}/>
            </label>

            {error && <MensajeError>{error}</MensajeError>}

            <BotonesFormulario>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>
                    Cancelar
                </button>
            </BotonesFormulario>
        </Formulario>
    );
}

export default FormularioTarea;
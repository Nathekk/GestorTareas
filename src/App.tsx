import {useState} from 'react'
import './App.css'
import TarjetaTarea from "./componentes/tarjetaTarea.tsx";
import FormularioTarea from "./componentes/FormularioTarea.tsx";
import type {Tarea} from "./interfaces/Tarea.ts";

function App() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [siguienteId, setSiguienteId] = useState(1)
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierta, setModalAbierta] = useState(false)

    //añade la tarea en setareas, incremento el id para la siguiente tarea y cierro el modal cuando ya esta terminaste el formulario
    function addTarea(titulo: string, descripcion: string, responsable: string) {
        const nueva: Tarea = {
            id: siguienteId,
            titulo: titulo,
            descripcion: descripcion,
            responsable: responsable,
        };

        setTareas([...tareas, nueva]);
        setSiguienteId(siguienteId + 1);
        setModalAbierta(false);
    }

    function eliminarTarea(id: number) {
        setTareas(tareas.filter((t) => t.id !== id));
    }

    const tareasVisibles = tareas.filter((t) =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        //el render con todo lo de la interfaz
        <>
            <header className="cabecera">
                <h1>Gestor de tareas</h1>
                <button type="button" onClick={() => setModalAbierta(true)}>Nueva tarea</button>
            </header>

            <input type="text" className="buscador" placeholder="Buscar por titulo" value={busqueda}
                   onChange={(e) => setBusqueda(e.target.value)}/>

            <p className="contador">Mostrando {tareasVisibles.length} de {tareas.length} tareas</p>
            {tareas.length === 0 && <p>No hay tareas pendientes</p>}
            {tareas.length > 0 && tareasVisibles.length === 0 && (
                <p>No se encontraron tareas con ese título</p>
            )}

            <div className="grid-tareas">
                {tareasVisibles.map((t) => (
                    <TarjetaTarea key={t.id} tarea={t} onEliminar={eliminarTarea}/>))}
            </div>

            {/*basicamente mira es true que si le estas clickando al fondo, si le clickas al fondo se cierra, si no es true esta abierta pq no le clickaste nada*/}
            {modalAbierta && (
                <div className="modal-fondo" onClick={(e) => {
                        if (e.target === e.currentTarget) {setModalAbierta(false);}
                    }}
                >
                    <div className="modal">
                        <FormularioTarea onGuardar={addTarea} onCancelar={() => setModalAbierta(false)}/>
                    </div>
                </div>
            )}

        </>
    )
}

export default App
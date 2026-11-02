import {useEffect, useState} from 'react'
import './App.css'
import TarjetaTarea from "./componentes/tarjetaTarea.tsx";
import FormularioTarea from "./componentes/FormularioTarea.tsx";
import type {Tarea} from "./interfaces/Tarea.ts";

function App() {
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierta, setModalAbierta] = useState(false)
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    //FETCH de los datos de la api
    useEffect(() => {
        async function cargarTareas() {
            try {
                const api = "http://localhost:3000/tareas";
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error("Error al obtener las tareas");
                }

                const tareas = await response.json();

                setTareas(tareas);
            } catch (error) {
                console.error("Error al cargar las tareas", error);
                setError("No se pudieron cargar las tareas");
            } finally {
                setCargando(false)
            }
        }

        cargarTareas().catch(console.error);
    }, []);


//en el anterior hice post en el formulario, no me funcionaba el delete, era aqui, en addtarea porque sino la id me daba problemas, ademas que por algo sellamaba addtarea, no tengo mucho sentido comun
    async function addTarea(titulo: string, descripcion: string, responsable: string) {
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
                throw new Error("Error");
            }

            const nuevaTarea = await response.json();

            setTareas([...tareas, nuevaTarea]);
            setModalAbierta(false);

        } catch (error) {
            console.error("Error creando tarea", error);
            setError("No se pudo crear la tarea");
        }
    }


    async function eliminarTarea(id: string) {
        setError("");
        try {
            const api = `http://localhost:3000/tareas/${id}`;
            const response = await fetch(api, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Error");
            }

            setTareas(tareas.filter((t) => t.id !== id));

        } catch (error) {
            console.error("Error tarea", error);
            setError("No se pudo eliminar la tarea");
        }
    }
//TAREAS VISIBLES
    const tareasVisibles = tareas.filter((t) =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        document.title = `Mostrando ${tareasVisibles.length} de ${tareas.length} tareas`;
    }, [tareas, tareasVisibles.length]);
    return (
        //el render con todo lo de la interfaz
        <>
            <header className="cabecera">
                <h1>Gestor de tareas</h1>
                <button type="button" onClick={() => setModalAbierta(true)}>Nueva tarea</button>
            </header>

            <input type="text" className="buscador" placeholder="Buscar por titulo" value={busqueda}
                   onChange={(e) => setBusqueda(e.target.value)}/>

            {cargando && <p>Cargando tareas...</p>}
            <p>
                Mostrando {tareasVisibles.length} de {tareas.length} tareas
            </p>

            {!cargando && tareas.length === 0 && (
                <p>No hay tareas pendientes</p>
            )}

            {!cargando && tareas.length > 0 && tareasVisibles.length === 0 && (
                <p>No se encontraron tareas con ese título</p>
            )}
            {error && <p>{error}</p>}

            <div className="grid-tareas">
                {tareasVisibles.map((t) => (
                    <TarjetaTarea key={t.id} tarea={t} onEliminar={eliminarTarea}/>))}
            </div>

            {/*basicamente mira es true que si le estas clickando al fondo, si le clickas al fondo se cierra, si no es true esta abierta pq no le clickaste nada*/}
            {modalAbierta && (
                <div className="modal-fondo" onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setModalAbierta(false);
                    }
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
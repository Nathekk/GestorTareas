import {useState} from 'react'
import './App.css'
import TarjetaTarea from "./componentes/tarjetaTarea.tsx";

function App() {
    const [id, setId] = useState(0)
    const [tarea, setTarea] = useState([])
    const [texto, setTexto] = useState("");

    function addTarea(e) {
        e.preventDefault();

        if (!texto.trim()) return
        let tareaList = [...tarea];
        tareaList.push({id, texto});
        setTarea(tareaList)
        setId(id + 1)
        setTexto("")

    }

    function eliminarTarea(taskid) {
        let tareaList = [...tarea];

        tareaList = tareaList.filter((tarea) =>
            tarea.id !== taskid
        )
        setTarea(tareaList)
    }

    return (
        <>
            <label>
                Nombre de la tarea
                <textarea
                    id="tareaTexto"
                    name="postContent"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
            </label>
            <button type="button" onClick={addTarea}>Añadir</button>
            {tarea.length == 0 ?
                <><p>No hay tareas pendientes</p>
                </> : <div id={"tarjetaLista"}>
                    {tarea.map((tarea) => (
                        <TarjetaTarea
                            key={tarea.id}
                            tarea={tarea.texto}
                            id={tarea.id}
                            deleteTarea={eliminarTarea}
                        />
                    ))}

                </div>}


        </>
    )
}

export default App

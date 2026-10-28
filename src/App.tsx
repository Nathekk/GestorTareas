import {useState} from 'react'
import './App.css'
import TarjetaTarea from "./componentes/tarjetaTarea.tsx";
function App() {
  const [tarea, setTarea] = useState([])

  function addTarea(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    let tareaList=[...tarea];
    let texto = document.getElementById("tareaTexto").value;
    tareaList.push(<TarjetaTarea tarea={texto} key={tareaList.length}/>)
    setTarea(tareaList)
  }

  return (
    <>
      <label>
        Nombre de la tarea
        <textarea id="tareaTexto" name="postContent" />
      </label>
      <button type="button" onClick={addTarea}>Añadir</button>
      <div id={"tarjetaLista"}>
        {tarea}

      </div>
    </>
  )
}

export default App

import './Tarea.css'

function TarjetaTarea({tarea, deleteTarea,id}) {
    return (
            <div>
                <p>{tarea}</p>
                <button type="button" onClick={() =>deleteTarea(id)}>Eliminar</button>
            </div>
    )
}

export default TarjetaTarea

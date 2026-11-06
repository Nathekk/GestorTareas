import ListaTareas from './pages/ListaTareas.tsx';
import EditarTarea from './pages/EditarTarea.tsx';
import {Routes, Route, Navigate} from 'react-router';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/tareas"/>}/>
            <Route path="/tareas" element={<ListaTareas/>}/>
            {/*<Route path="/tareas/nueva" element={<NuevaTarea/>}/>*/}
            <Route path="/tareas/:id/editar" element={<EditarTarea/>}/>
            {/*<Route path="*" element={<PaginaNoEncontrada/>}/>*/}
        </Routes>
    );
}

export default App;
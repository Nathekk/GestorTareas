import {useNavigate} from 'react-router';

function PaginaNoEncontrada() {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Pagina no encontrada</h2>
            <button type="button" onClick={() => navigate('/tareas')}>Volver</button>
        </div>
    );
}

export default PaginaNoEncontrada;
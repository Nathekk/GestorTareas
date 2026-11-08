import {useEffect, useState} from 'react'
import TarjetaTarea from "../componentes/tarjetaTarea.tsx";
import FormularioTarea from "../componentes/FormularioTarea.tsx";
import type {Tarea} from "../interfaces/Tarea.ts";
import styled from "@emotion/styled";
import {useNavigate} from "react-router";
//EMOTIONNN
const Cabecera = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const Buscador = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
`;

const Contador = styled.p`
    font-size: 14px;
    color: #555;
    margin-bottom: 16px;
`;

const GridTareas = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 16px;
`;

const ModalFondo = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    background: #eaf7ff;
    padding: 24px;
    border-radius: 8px;
    min-width: 320px;
`;

const MensajeError = styled.p`
    color: red;
    font-size: 14px;
`;

const OpcionesEleccion = styled.div`
    display: flex;
    background-color: #0072ff;
    padding: 10px;
    border-radius: 10px;
    color: white;
    margin-top: 15px;
    cursor: pointer;
`;
export default function ListaTareas() {

    const [tareas, setTareas] = useState<Tarea[]>([])
    const [busqueda, setBusqueda] = useState("")
    const [modalAbierta, setModalAbierta] = useState(false)
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [eligiendo, setEligiendo] = useState(false)
    const navigate = useNavigate()

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
            <Cabecera>
                <h1>Gestor de tareas</h1>
                <button type="button" onClick={() => setEligiendo(true)}>Nueva tarea</button>
            </Cabecera>

            <Buscador type="text" placeholder="Buscar por titulo" value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}/>

            {cargando && <p>Cargando tareas...</p>}

            <Contador>
                Mostrando {tareasVisibles.length} de {tareas.length} tareas
            </Contador>

            {!cargando && tareas.length === 0 && (
                <p>No hay tareas pendientes</p>
            )}

            {!cargando && tareas.length > 0 && tareasVisibles.length === 0 && (
                <p>No se encontraron tareas con ese título</p>
            )}
            {error && <MensajeError>{error}</MensajeError>}

            <GridTareas>
                {tareasVisibles.map((t) => (
                    <TarjetaTarea key={t.id} tarea={t} onEliminar={eliminarTarea}/>))}
            </GridTareas>

            {modalAbierta && (
                <ModalFondo onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setModalAbierta(false);
                    }
                }}
                >
                    <Modal>
                        <FormularioTarea onGuardar={addTarea} onCancelar={() => setModalAbierta(false)}/>
                    </Modal>
                </ModalFondo>
            )}
            {eligiendo && (
                <ModalFondo onClick={(e) => {
                    if (e.target === e.currentTarget) setEligiendo(false);
                }}>
                    <Modal>
                        <h2>¿De que forma quieres crearla?</h2>
                        <OpcionesEleccion  onClick={() => { setEligiendo(false); setModalAbierta(true); }}>
                            Ventana modal
                        </OpcionesEleccion>
                        <OpcionesEleccion onClick={() => navigate('/tareas/nueva')}>
                            Página independiente
                        </OpcionesEleccion>
                        <OpcionesEleccion onClick={() => setEligiendo(false)}>Cancelar</OpcionesEleccion>
                    </Modal>
                </ModalFondo>
            )}

        </>
    )
}


import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import styled from "@emotion/styled";



const Contenedor = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1;
    color: #444;
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    padding: 30px;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    background-color: #fff;

    h1, h2 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        color: #222;
    }

    h1 {
        font-size: 32px;
    }

    h2 {
        font-size: 22px;
    }
`;




createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Contenedor>
        <App />
        </Contenedor>

    </StrictMode>,
)

import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Buscador from "../components/Buscador";

const apiSismo = "https://api.gael.cloud/general/public/sismos";
const Sismo = () => {
    const [sismo, setSismo] = useState([]);
    const [sismosFiltrados, setSismosFiltrados] = useState([]);
    const filtrarSismos = (terminoBusqueda) => {
        const terminoBusquedaLowerCase = terminoBusqueda.toLowerCase();
        const sismosFiltrados = sismo.filter(
            (sismo) =>
                sismo.Fecha.toLowerCase().includes(terminoBusquedaLowerCase) ||
                sismo.RefGeografica.toLowerCase().includes(
                    terminoBusquedaLowerCase
                ) ||
                sismo.Magnitud.toLowerCase().includes(terminoBusquedaLowerCase)
        );
        setSismosFiltrados(sismosFiltrados);
    };
    useEffect(() => {
        consultarApiSismo();
    }, []);
    const consultarApiSismo = async () => {
        try {
            const response = await fetch(apiSismo);
            const data = await response.json();
            setSismo(data);
            setSismosFiltrados(data);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };
    return (
        <>
            <Buscador filtrar={filtrarSismos} />
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha/Hora</th>
                        <th>Lugar</th>
                        <th>Profundidad</th>
                        <th>Magnitud (ML)</th>
                    </tr>
                </thead>
                <tbody>
                    {sismosFiltrados.map((movimiento) => (
                        <tr key={movimiento.Fecha}>
                            <td>{movimiento.Fecha}</td>
                            <td>{movimiento.RefGeografica}</td>
                            <td>{movimiento.Profundidad} Km</td>
                            <td>{movimiento.Magnitud}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Sismo;

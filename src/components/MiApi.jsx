import { useState, useEffect } from "react";
import Sismo from "./Sismo";
// import dato from "../assets/datos/datos";

const api = "https://api.gael.cloud/general/public/clima";
const urlImagen =
    "https://archivos.meteochile.gob.cl/portaldmc/localJS/img/clima/";
console.log("render");

function Clima() {
    const [info, setInfo] = useState([]);
    const [estacionSeleccionada, setEstacionSeleccionada] = useState("");
    const [temperatura, setTemperatura] = useState(null);
    const [estado, setEstado] = useState(null);
    const [icono, setIcono] = useState(null);
    const handleEstacionChange = (e) => {
        setEstacionSeleccionada(e.target.value);
        const codigoEstacion = e.target.value;
        const estacionSeleccionada = info.find(
            (estacion) => estacion.Codigo === codigoEstacion
        );
        if (estacionSeleccionada) {
            setTemperatura(estacionSeleccionada.Temp);
            setEstado(estacionSeleccionada.Estado);
            const urlImg = `${urlImagen}${estacionSeleccionada.Icono}`;
            setIcono(urlImg);
        }
    };
    useEffect(() => {
        consultarApi();
    }, []);
    const consultarApi = async () => {
        try {
            const response = await fetch(api);
            const data = await response.json();
            setInfo(data);
        } catch (error) {
            console.error("Error al consultar la API:", error);
        }
    };
    return (
        <>
            <h1>Clima y sismos</h1>
            <p>Si deseas conocer el clima de alguna región, selecciona dentro de las opciones, lo deseado</p>
            <select
                value={estacionSeleccionada}
                onChange={handleEstacionChange}
            >
                <option value=""> Selecciona una región/comuna </option>
                {info.map((estacion) => (
                    <option key={estacion.Codigo} value={estacion.Codigo}>
                        {estacion.Estacion}
                    </option>
                ))}
            </select>
            {temperatura !== null && estado !== null && icono !== null && (
                <div className="datos-climaticos">
                    <p className="temperatura">Temperatura: {temperatura} °C</p>
                    <p className="estado">{estado}</p>
                    <img className="img" src={icono} alt='imagen del clima de la region seleccionada' />
                </div>
            )}
            <h2>Datos de los últimos sismos</h2>
            <Sismo />
        </>
    );
}

export default Clima;

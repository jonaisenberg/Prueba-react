// eslint-disable-next-line react/prop-types
const Buscador = ({ filtrar }) => {
    const handleBuscar = (terminoBusqueda) => {
        const terminoBusquedaLowerCase = terminoBusqueda.toLowerCase();
        filtrar(terminoBusquedaLowerCase);
    };
    return (
        <div className="input">
            <input
                className="form-control mt-3"
                type="text"
                placeholder="Buscador sismologico"
                onChange={(e) => handleBuscar(e.target.value)}
            />
        </div>
    );
};

export default Buscador;

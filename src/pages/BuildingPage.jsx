import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Edifice from "../components/Edifice";
import SearchBar from "../components/SearchBar";
import { useProductos } from "../hook/useProductos"; // Importamos el Hook

function BuildingPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: productos, loading, error } = useProductos();

    const filteredProductos = useMemo(() => {
        if (!searchTerm) return productos;
        const lower = searchTerm.toLowerCase();
        return productos.filter(p =>
            p.name.toLowerCase().includes(lower)
        );
    }, [searchTerm, productos]);

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Edificios actualizados</h2>
            <p className="text-gray-600 mb-6">
                Edificios gestionados desde el panel de administración.
            </p>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar por nombre..."
            />

            {/* Zona de contenido */}
            <div className="mt-8 min-h-64 w-full">

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl animate-pulse">
                            Cargando edificios desde la API...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="cards-grid">
                        {filteredProductos.length > 0 ? (
                            filteredProductos.map((producto) => (
                                <Link
                                    key={producto._id}
                                    to={`/edificios/${producto._id}`}
                                    state={{ producto }}
                                >
                                    <Edifice
                                        id={producto._id}
                                        name={producto.name}
                                        photo={producto.photo}
                                        price={producto.price}
                                        description={producto.description}
                                        category={producto.category}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-10">
                                {productos.length === 0
                                    ? "No se encontraron edificios."
                                    : `No se han encontrado edificios que coincidan con "${searchTerm}".`}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default BuildingPage;
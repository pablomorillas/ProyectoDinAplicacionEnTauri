import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import Edifice from '../components/Edifice.jsx'
import { useProductos } from '../hook/useProductos'

function HomePage() {
    const { data: productos, loading, error } = useProductos();

    // Select first 4 buildings as featured
    const featuredBuildings = productos.slice(0, 4);

    return (
        <div className="page-container w-full max-w-7xl mx-auto px-4">
            <header className="page-header">
                <h1 className='contenedor_h1'>Welcome Home</h1>
                <p className='contenedor_p' style={{ textAlign: "center" }}>Discover your dream space today.</p>
            </header>

            <div className="banner">
                <div className="banner-content">
                    <img src="/res/img1.jpg" alt="Main Banner" className="banner-image shadow-lg" />
                </div>
            </div>

            <section className="mt-12">
                <h2 className='contenedor_h2 text-center'>Edificios destacados</h2>

                {loading && <p className="text-center py-10">Cargando destacados...</p>}
                {error && <p className="text-center py-10 text-red-500">Error al cargar destacados: {error}</p>}

                {!loading && !error && (
                    <div className="cards-grid">
                        {featuredBuildings.map((producto) => (
                            <Link key={producto._id} to={`/edificios/${producto._id}`}>
                                <Card>
                                    <Edifice
                                        id={producto._id}
                                        name={producto.name}
                                        photo={producto.photo}
                                        price={producto.price}
                                        description={producto.description}
                                        category={producto.category}
                                    />
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <Link to="/edificios">
                        <button className="px-6 py-3 text-lg font-bold">Mostrar todos</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage
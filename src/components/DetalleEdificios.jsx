import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { getProductById } from '../services/Service'
import Section from './Section.jsx'
import { UserContext } from '../context/UserContext'
import { useDeleteProduct } from '../hook/useDeleteProducto'


/**
 * Functional component that displays the detailed information of a specific building.
 * Retrieves the building index from the URL parameters OR uses provided prop data.
 *
 * @component
 * @param {Object} [props]
 * @param {Object} [props.edificioData] - Optional direct building data injection (for Storybook/Testing)
 */
function DetalleEdificio({ edificioData }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const { userLogged } = useContext(UserContext)
    const { removeProduct, loading: deleting } = useDeleteProduct()
    const [edificio, setEdificio] = useState(edificioData || null)
    const [loading, setLoading] = useState(!edificioData)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (edificioData) return

        const fetchEdificio = async () => {
            try {
                const data = await getProductById(id)
                if (data) {
                    setEdificio(data)
                } else {
                    setError("Edificio no encontrado")
                }
            } catch (err) {
                setError("Error al cargar el edificio")
            } finally {
                setLoading(false)
            }
        }

        fetchEdificio()
    }, [id, edificioData])

    if (loading) {
        return <div className="p-8 text-center">Cargando detalles...</div>
    }

    if (error || !edificio) {
        return <div className="p-8 text-center">{error || "Edificio no encontrado"}</div>
    }

    // Mapping API fields to component expectations if necessary
    // const displayData = {
    //     nombre: edificio.name || edificio.nombre,
    //     imagen: edificio.photo || edificio.imagen,
    //     precio: edificio.price || edificio.precio,
    //     categoria: edificio.category || edificio.categoria,
    //     descripcion: edificio.description || edificio.descripcion
    // }

    return (
        <Section>
            {/* Button to go back to the previous page */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded"
            >
                Back
            </button>

            {/* Main building information */}
            <h2 className='contenedor_h2'>{edificio.name}</h2>
            <img
                src={edificio.photo}
                alt={edificio.name}
                style={{ maxWidth: '900px', display: 'block', margin: '20px auto', borderRadius: '12px' }}
            />
            <h3 className='contenedor_h3'>Precio: ${edificio.price?.toLocaleString()}</h3>
            <h4 className='contenedor_h4'>Categoría: {edificio.category}</h4>
            <p className='contenedor_p'>{edificio.description}</p>

            {userLogged && (
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <button
                        onClick={async () => {
                            if (window.confirm(`¿Estás seguro de que deseas eliminar "${edificio.name}"?`)) {
                                const success = await removeProduct(id);
                                if (success) {
                                    navigate('/edificios');
                                }
                            }
                        }}
                        disabled={deleting}
                        className="delete-button"
                        style={{
                            backgroundColor: 'var(--color-error)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        {deleting ? "Eliminando..." : "Eliminar este Edificio"}
                    </button>
                </div>
            )}
        </Section>
    )
}

export default DetalleEdificio;

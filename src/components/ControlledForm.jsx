import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/index.css";
import { useCreateProduct } from '../hook/useCreateProductos';

/**
 * Functional component that renders a form to create a new building.
 * Handles form state, validation, and submission.
 *
 * @component
 */
function BuildingForm() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        photo: "",
    });

    const [validationErrors, setValidationErrors] = useState({});
    const { addProduct, loading, error: apiError } = useCreateProduct();

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        // Validations
        if (formData.name.trim().length < 5) {
            newErrors.name = "El nombre debe tener al menos 5 caracteres.";
        }

        if (formData.description.trim().length < 10) {
            newErrors.description = "La descripción debe ser más detallada (+10 letras).";
        }

        const precioNum = Number(formData.price);
        if (!formData.price || precioNum <= 0) {
            newErrors.price = "El precio debe ser un número positivo.";
        }

        if (!formData.category) {
            newErrors.category = "Selecciona una categoría válida.";
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        // Envío de datos real
        setValidationErrors({});

        const ok = await addProduct(formData);

        if (ok) {
            alert(`¡El edificio "${formData.name}" se ha guardado correctamente!`);

            // Reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                photo: "",
            });

            if (fileInputRef.current) fileInputRef.current.value = null;
            navigate("/edificios");
        }
    };

    return (
        <div className="form-container box">
            <h2 className='contenedor_h2'>Añadir Nuevo Edificio</h2>

            <form onSubmit={handleSubmit} className="flex-col">

                {/* Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Introduce el nombre (min 5 letras)'
                        className={validationErrors.name ? "input-error" : ""}
                    />
                    {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
                </div>

                {/* Descripción */}
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Introduce una descripción (min 10 letras)'
                        className={validationErrors.description ? "input-error" : ""}
                        rows="3"
                    />
                    {validationErrors.description && <span className="error-message">{validationErrors.description}</span>}
                </div>

                {/* Precio */}
                <div className="form-group">
                    <label htmlFor="price">Precio (€):</label>
                    <input
                        id="price"
                        type="number"
                        placeholder='Introduce un precio positivo'
                        value={formData.price}
                        onChange={handleChange}
                        className={validationErrors.price ? "input-error" : ""}
                    />
                    {validationErrors.price && <span className="error-message">{validationErrors.price}</span>}
                </div>

                {/* Categoría */}
                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={validationErrors.category ? "input-error" : ""}
                    >
                        <option value="" disabled>Seleccione una categoría</option>
                        <option value="residencial">Residencial</option>
                        <option value="oficinas">Oficinas</option>
                        <option value="comercial">Comercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="mixto">Mixto</option>
                    </select>
                    {validationErrors.category && <span className="error-message">{validationErrors.category}</span>}
                </div>

                {/* Imagen */}
                <div className="form-group">
                    <label htmlFor="photo">URL de Imagen:</label>
                    <input
                        id="photo"
                        type="text"
                        value={formData.photo}
                        onChange={handleChange}
                        placeholder="/res/ejemplo.jpg"
                    />
                </div>

                {apiError && (
                    <p role="alert" className="mt-4 text-sm text-red-600">
                        {apiError}
                    </p>
                )}
                <button type="submit" className="mt-4">
                    {loading ? "Guardando..." : "Crear Edificio"}
                </button>
            </form>
        </div>
    );
}

export default BuildingForm;
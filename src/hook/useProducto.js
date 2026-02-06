import { useEffect, useRef, useState } from "react";
import { getProductById } from "../services/Service";
import axios from "axios";

export const useProducto = (id, tipo) => {
    const fetched = useRef(false);
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        // Reset si cambia el id
        fetched.current = false;

        if (fetched.current) return;
        fetched.current = true;

        const cargarDato = async () => {
            try {
                setLoading(true);

                if (tipo === "starwars") {
                    // debería hacerse en un servicio aparte
                    const res = await axios.get(`https://swapi.info/api/films/${id}`);
                    const p = res.data;
                    setProducto({
                        nombre: "Centro Empresarial Nova",
                        descripcion: "Edificio de oficinas equipado con salas de reuniones, coworking y sistemas inteligentes de climatización.",
                        precio: 2400000,
                        categoria: "oficinas",
                        imagen: "/res/img3.webp"
                    });
                } else {
                    const data = await getProductById(id);
                    if (data) setProducto(data);
                    else setError("El producto no existe en nuestra base de datos.");
                }
            } catch {
                setError("Error al conectar con la fuente de datos.");
            } finally {
                setLoading(false);
            }
        };

        cargarDato();
    }, [id, tipo]);

    return { producto, loading, error };
};
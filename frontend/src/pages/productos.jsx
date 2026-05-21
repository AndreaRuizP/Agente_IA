import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
function Productos() {
    const { agregarProducto } = useContext(CartContext);

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await api.get("productos/");
            setProductos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold mb-8">Menú</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        className="bg-white rounded-2xl shadow-lg p-5"
                    >
                        <h3 className="text-2xl font-bold mb-2">{producto.nombre}</h3>
                        <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                        <p className="text-2xl font-bold text-green-600 mb-4">${producto.precio}</p>
                        <button
                            onClick={() => agregarProducto(producto)}
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;
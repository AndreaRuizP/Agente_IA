import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Carrito() {

    const {
        carrito,
        eliminarProducto,
        total
    } = useContext(CartContext);

    return (
        <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl p-5 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">
                Carrito
            </h2>
            {carrito.length === 0 ? (
                <p>No hay productos</p>

            ) : (
                carrito.map((item, index) => (
                    <div
                        key={index}
                        className="border-b py-4"
                    >
                        <h3 className="font-bold">{item.nombre}</h3>
                        <p>${item.precio}</p>
                        <button
                            onClick={() => eliminarProducto(index)}
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
                            Eliminar
                        </button>
                    </div>
                ))
            )}
            <div className="mt-8">
                <h3 className="text-2xl font-bold">
                    Total: ${total}
                </h3>
                <button
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl">
                    Realizar pedido
                </button>
            </div>
        </div>
    );
}

export default Carrito;
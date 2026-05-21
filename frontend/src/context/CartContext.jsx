import { createContext, useState } from "react";
export const CartContext = createContext();
function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);
    const agregarProducto = (producto) => {
        setCarrito([...carrito, producto]);

    };
    const eliminarProducto = (index) => {
        const nuevoCarrito = carrito.filter(
            (_, i) => i !== index
        );
        setCarrito(nuevoCarrito);
    };
    const total = carrito.reduce(
        (acc, item) => acc + Number(item.precio),
        0
    );
    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarProducto,
                eliminarProducto,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider;
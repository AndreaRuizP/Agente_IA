import { useState, useRef, useEffect } from "react";
import api from "../services/api";

function ChatIA() {

    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const mensajesEndRef = useRef(null);

    const [mensajes, setMensajes] = useState([
        {
            tipo: "ia",
            texto: "Hola 👋 Soy el asistente virtual del restaurante."
        }
    ]);

    useEffect(() => {
        mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes, cargando]);

    const enviarMensaje = async () => {

        if (!mensaje.trim() || cargando) return;

        const nuevoMensaje = {
            tipo: "usuario",
            texto: mensaje
        };

        setMensajes((prev) => [...prev, nuevoMensaje]);
        setMensaje("");
        setCargando(true);

        try {

            const response = await api.post("chat/", { mensaje });

            const respuestaIA = {
                tipo: "ia",
                texto: response.data.mensaje
            };

            setMensajes((prev) => [...prev, respuestaIA]);

        } catch (error) {

            console.log(error);

            setMensajes((prev) => [
                ...prev,
                { tipo: "ia", texto: "Error al contactar con el asistente. Intenta de nuevo." }
            ]);

        } finally {
            setCargando(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") enviarMensaje();
    };

    return (

        <div className="fixed bottom-5 left-5 w-96 h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">

            <div className="bg-black text-white p-4 text-xl font-bold">
                Asistente IA 🍔
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">

                {mensajes.map((msg, index) => (

                    <div
                        key={index}
                        className={`p-3 rounded-2xl max-w-[80%] ${msg.tipo === "usuario"
                            ? "bg-green-500 text-white ml-auto"
                            : "bg-gray-200 text-black"
                        }`}
                    >
                        {msg.texto}
                    </div>
                ))}

                {cargando && (
                    <div className="p-3 rounded-2xl max-w-[80%] bg-gray-200 text-black">
                        <span className="animate-pulse">Escribiendo...</span>
                    </div>
                )}

                <div ref={mensajesEndRef} />
            </div>

            <div className="p-4 border-t flex gap-2">

                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 border rounded-xl px-4 py-2 outline-none"
                    disabled={cargando}
                />

                <button
                    onClick={enviarMensaje}
                    disabled={cargando}
                    className="bg-black text-white px-5 rounded-xl disabled:opacity-50"
                >
                    Enviar
                </button>

            </div>

        </div>
    );
}

export default ChatIA;
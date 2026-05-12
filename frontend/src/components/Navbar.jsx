function Navbar() {

    return (
        <nav className="bg-black text-white p-4 shadow-lg">

            <div className="container mx-auto flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    Restaurante 
                </h1>

                <button className="bg-yellow-500 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">

                    Carrito

                </button>

            </div>

        </nav>
    );
}

export default Navbar;
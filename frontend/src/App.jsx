import Navbar from "./components/Navbar";
import Productos from "./pages/Productos";
import Carrito from "./components/Carrito";

function App() {

  return (

    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Productos />
      <Carrito />
    </div>
  );
}

export default App;
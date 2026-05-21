import Navbar from "./components/Navbar";
import Productos from "./pages/Productos";
import Carrito from "./components/Carrito";
import ChatIA from "./components/ChatIA";

function App() {

  return (

    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mr-80">
        <Productos />
      </div>
      <Carrito />
      <ChatIA />
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Marcas from "./pages/Marcas"; 
import Experiencia from "./pages/Experiencia";
import Servicios from "./pages/Servicios";
import Ofertas from "./pages/Ofertas";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import SobreNosotros from "./pages/Sobre_nosotros"; 
import WhatsappButton from "./components/WhatsappButton";
import ProductoDetalle from "./pages/ProductoDetalle"; // <--- nuevo

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} /> {/* nuevo */}
        <Route path="/marcas" element={<Marcas />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
      <WhatsappButton />
      <Footer />
    </Router>
  );
}

export default App;
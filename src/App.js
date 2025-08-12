import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
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
import Carrito from "./pages/Carrito";
import Terminos from "./pages/Terminos";
import Reclamaciones from "./pages/Reclamaciones";
import ProductoDetalle from "./pages/ProductoDetalle"; 
import ReclamacionesAdmin from "./pages/ReclamacionesAdmin";
import FaqPage from './pages/FaqPage';
import ReclamoDetalle from "./pages/ReclamoDetalle";
import PedidosAdmin from "./pages/PedidosAdmin";
import PedidoDetalle from "./pages/PedidoDetalle";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './index.css';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} /> 
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/experiencia" element={<Experiencia />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/carrito" element={<Carrito />} /> 
          <Route path="/terminos" element={<Terminos />} /> 
          <Route path="/reclamaciones" element={<Reclamaciones />} /> 
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/admin/reclamaciones" element={<PrivateRoute><ReclamacionesAdmin /></PrivateRoute>} />
          <Route path="/admin/reclamaciones/:id" element={<PrivateRoute><ReclamoDetalle /></PrivateRoute>} />
          <Route path="/admin/pedidos" element={<PrivateRoute><PedidosAdmin /></PrivateRoute>} />
          <Route path="/admin/pedidos/:id" element={<PrivateRoute><PedidoDetalle /></PrivateRoute>} />
        </Routes>
        <WhatsappButton />
        <Footer />
      </Router>
    </CarritoProvider>
  );
}

export default App;
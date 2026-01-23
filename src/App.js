import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { TipoCambioProvider } from "./context/TipoCambioContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Marcas from "./pages/Marcas"; 
import Experiencia from "./pages/Experiencia";
import FiltroProductosContext, { FiltroProductosProvider } from "./context/FiltroProductosContext";
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
import ProductosAdmin from "./pages/ProductosAdmin";
import TipoCambioAdmin from "./pages/TipoCambioAdmin";
import MesaAyuda from "./pages/MesaAyuda";
import Registro from "./pages/Registro";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './index.css';

function App() {
  return (
    <TipoCambioProvider>
      <FiltroProductosProvider>
      <CarritoProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/marcas" element={<Marcas />} />
              <Route path="/experiencia" element={<Experiencia />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/reclamaciones" element={<Reclamaciones />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <Admin />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/reclamaciones" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <ReclamacionesAdmin />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/reclamaciones/:id" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <ReclamoDetalle />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/pedidos" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <PedidosAdmin />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/pedidos/:id" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <PedidoDetalle />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/productos" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <ProductosAdmin />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/tipo-cambio" 
                element={
                  <PrivateRoute requireAdmin={true}>
                    <TipoCambioAdmin />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
            <Footer />
            <WhatsappButton />
          </div>
        </Router>
      </CarritoProvider>
    </FiltroProductosProvider>
    </TipoCambioProvider>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert, Form, Row, Col, Spinner } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import { useTipoCambio } from "../context/TipoCambioContext";
import { enviarCorreoPedido, notificarEmpresa } from "../services/emailService";
import { crearPedido as crearPedidoService } from "../services/pedidoService";
import apiClient, { authService } from "../services/authService";

const emptyFormTemplate = {
  para: "",
  cliente: "",
  apellidos: "",
  telefono: "",
  direccion: "",
};

const mergeWithPerfil = (values, perfil = {}) => ({
  para: values.para || perfil.para || "",
  cliente: values.cliente || perfil.cliente || "",
  apellidos: values.apellidos || perfil.apellidos || "",
  telefono: values.telefono || perfil.telefono || "",
  direccion: values.direccion || perfil.direccion || "",
});

const Carrito = () => {
  const { carrito, quitarDelCarrito, vaciarCarrito, actualizarCantidad } = useCarrito();
  const { formatearPrecioSoles, convertirAMonedaSoles } = useTipoCambio();
  const [defaultFormValues, setDefaultFormValues] = useState(() => ({ ...emptyFormTemplate }));
  const [form, setForm] = useState(() => ({ ...emptyFormTemplate }));
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  
  // Función para formatear números con separadores de miles
  const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-PE').format(numero);
  };
  // Normalize: keep totals in base currency (USD) and convert only when formatting/sending
  const totalUsd = carrito.reduce((acc, item) => acc + ((item.precioUSD ?? item.precio ?? 0) * item.cantidad), 0);
  // Cálculo de IGV 18% en USD
  const subtotalSinIgv = totalUsd; // in USD
  const igv = +(subtotalSinIgv * 0.18);
  const totalConIgv = +(subtotalSinIgv + igv); // in USD
  const totalConIgvSoles = convertirAMonedaSoles(totalConIgv); // converted once when needed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      return;
    }

    let cancel = false;

    const cargarPerfil = async () => {
      try {
        const { data } = await apiClient.get("/auth/me");
        if (cancel) return;

        const perfil = {
          para: data.correo ?? data.email ?? data.usuario ?? "",
          cliente: data.razonSocial ?? data.nombre ?? data.nombres ?? "",
          apellidos: data.apellidos ?? data.apellido ?? "",
          telefono: data.telefono ?? data.celular ?? data.phone ?? "",
          direccion:
            data.direccion ?? data.domicilio ?? data.direccionEntrega ?? "",
        };

        setDefaultFormValues((prev) => mergeWithPerfil(prev, perfil));
        setForm((prev) => mergeWithPerfil(prev, perfil));
      } catch (error) {
        if (!cancel) {
          console.warn("No se pudo obtener el perfil del usuario:", error);
        }
      }
    };

    cargarPerfil();
    return () => {
      cancel = true;
    };
  }, []);

  const handleCantidadChange = (idProducto, valor) => {
    const cantidad = Number.parseInt(valor, 10);
    if (Number.isNaN(cantidad)) {
      return;
    }
    actualizarCantidad(idProducto, cantidad);
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    // Verificar sesión: solo usuarios autenticados pueden enviar correos desde la UI
    if (!authService.isAuthenticated()) {
      setMensaje({ tipo: "danger", texto: "Es necesario estar registrado para hacer pedidos." });
      setEnviando(false);
      return;
    }
    setEnviando(true);
    setMensaje(null);
    const pedidoId = `PED${Date.now()}`;
    const urlDetalle = `${window.location.origin}/carrito`;
    const items = carrito.map((item) => ({
      nombre: item.producto,
      cantidad: item.cantidad,
      precio: (item.precioUSD ?? item.precio ?? 0)
    }));
    
    const itemsEmpresa = carrito.map((item) => ({
      nombre: item.producto,
      descripcion: item.descripcion || item.producto,
      sku: item.nroSKU || item.idProducto,
      cantidad: item.cantidad,
      precio: (item.precioUSD ?? item.precio ?? 0).toString(),
      subtotal: (item.cantidad * convertirAMonedaSoles(item.precioUSD ?? item.precio ?? 0)).toString()
    }));

    try {
      // Crear pedido en el backend con el formato correcto
      const detallesPedido = carrito.map((item) => {
        // Preserve idProducto and include a snapshot of the product (same fields as ProductosAdmin)
        const origen = item.producto && typeof item.producto === 'object' ? item.producto : item;
        const idVal = item.idProducto ?? item.id ?? item.nroSKU ?? origen.idProducto ?? origen.id ?? String(Date.now());

        const productoSnapshot = {
          idProducto: String(idVal),
          nroModelo: origen.nroModelo ?? origen.nroModelo ?? "",
          nroParte: origen.nroParte ?? "",
          nroSKU: origen.nroSKU ?? origen.nroSKU ?? "",
          producto: origen.producto ?? origen.nombre ?? origen.title ?? "",
          marca: origen.marca ?? "",
          modelo: origen.modelo ?? "",
          descripcion: origen.descripcion ?? "",
          especificaciones: origen.especificaciones ?? "",
          precio: Number(item.precioUSD ?? item.precio ?? origen.precio ?? 0),
          stock: Number(item.stock ?? origen.stock ?? 0),
          observaciones: origen.observaciones ?? "",
          foto1: origen.foto1 ?? origen.imagen ?? "",
          foto2: origen.foto2 ?? "",
          foto3: origen.foto3 ?? "",
          foto4: origen.foto4 ?? "",
          linkHojaDeDatos: origen.linkHojaDeDatos ?? "",
          garantia: origen.garantia ?? "",
          umGarantia: origen.umGarantia ?? "años"
        };

        return {
          producto: productoSnapshot,
          cantidad: item.cantidad
        };
      });

      const pedidoData = {
        nombres: form.cliente,
        apellidos: form.apellidos,
        correo: form.para,
        telefono: form.telefono,
        fechaSolicitud: new Date().toISOString(),
        detalles: detallesPedido
      };

      // Console log fácil de leer para el POST del pedido
      console.log("🚀 ===== ENVIANDO PEDIDO AL BACKEND =====");
      console.log("📍 URL: POST /api/pedidos");
      console.log("📦 DATOS DEL PEDIDO:");
      console.log(JSON.stringify(pedidoData, null, 2));
      console.log("============================================");

      // Intentar crear pedido, pero no bloquear el envío de correos si el endpoint requiere auth
      let pedidoCreado = false;
      try {
        await crearPedidoService(pedidoData);
        pedidoCreado = true;
      } catch (errCreate) {
        console.warn("crearPedido falló:", errCreate.response?.status, errCreate.response?.data || errCreate.message);
      }

      // Enviar correo al cliente (se hace con publicClient en emailService)
      let correoClienteOk = false;
      try {
        await enviarCorreoPedido({
          para: form.para,
          cliente: `${form.cliente} ${form.apellidos}`,
          pedidoId,
          // enviar total en soles al cliente
          total: totalConIgvSoles,
          urlDetalle,
          items
        });
        correoClienteOk = true;
      } catch (errMail) {
        console.error("Error al enviar correo al cliente:", errMail.response?.status, errMail.response?.data || errMail.message);
      }

      // Notificar a la empresa (correo fijo)
      let correoEmpresaOk = false;
      try {
        await notificarEmpresa({
          paraEmpresa: "pelopelo103@gmail.com", // Correo fijo de la empresa
          cliente: `${form.cliente} ${form.apellidos}`,
          correoCliente: form.para,
          telefonoCliente: form.telefono,
          direccionCliente: form.direccion,
          pedidoId,
          // enviar total en soles a la empresa
          total: totalConIgvSoles.toString(), // Convertir a string en soles como requiere la API
          items: itemsEmpresa
        });
        correoEmpresaOk = true;
      } catch (errNotify) {
        console.error("Error al notificar a la empresa:", errNotify.response?.status, errNotify.response?.data || errNotify.message);
      }

      // Mensajes según resultado
      if (pedidoCreado && correoClienteOk && correoEmpresaOk) {
        setMensaje({ tipo: "success", texto: "¡Pedido confirmado! Se creó el pedido y se enviaron los correos al cliente y a la empresa." });
      } else if (!pedidoCreado && (correoClienteOk || correoEmpresaOk)) {
        setMensaje({ tipo: "warning", texto: "No se pudo crear el pedido (401). Los correos se intentaron enviar." });
      } else if (!correoClienteOk && !correoEmpresaOk) {
        setMensaje({ tipo: "danger", texto: "Error: no se pudieron enviar los correos ni crear el pedido. Revisa la consola para más detalles." });
      } else {
        setMensaje({ tipo: "info", texto: "El proceso terminó con advertencias. Revisa la consola para más detalles." });
      }
      vaciarCarrito();
      setForm({ ...defaultFormValues });
    } catch (err) {
      console.error("❌ ERROR AL PROCESAR PEDIDO:", err);
      console.error("📄 Respuesta del servidor:", err.response?.data);
      setMensaje({ tipo: "danger", texto: `Error al procesar el pedido: ${err.response?.data?.message || err.message}` });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Mi Carrito de Compras</h2>
      {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}
      {carrito.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-dark">
              <tr>
                <th style={{ width: '40%' }}>Producto</th>
                <th className="text-end" style={{ width: '15%' }}>Precio</th>
                <th className="text-center" style={{ width: '20%' }}>Cantidad</th>
                <th className="text-end" style={{ width: '15%' }}>Subtotal</th>
                <th className="text-center" style={{ width: '10%' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => {
                const stockDisponible =
                  item.stock === null || item.stock === undefined ? undefined : Number(item.stock);
                const maxCantidad = Number.isFinite(stockDisponible) ? stockDisponible : undefined;

                return (
                  <tr key={item.idProducto}>
                    <td>{item.producto}</td>
                    <td className="text-end">{formatearPrecioSoles(item.precio || 0)}</td>
                    <td className="text-center">
                      <div className="d-flex flex-column align-items-center">
                        <Form.Control
                          type="number"
                          min={1}
                          max={maxCantidad}
                          value={item.cantidad}
                          onChange={(e) => handleCantidadChange(item.idProducto, e.target.value)}
                          style={{ width: "80px" }}
                          className="text-center"
                        />
                        {maxCantidad !== undefined && (
                          <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                            Disponible: {formatearNumero(maxCantidad)}
                          </Form.Text>
                        )}
                      </div>
                    </td>
                    <td className="text-end fw-bold">{formatearPrecioSoles((item.precio || 0) * item.cantidad)}</td>
                    <td className="text-center">
                      <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(item.idProducto)}>
                        Quitar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
            <Button variant="outline-danger" onClick={vaciarCarrito}>Vaciar carrito</Button>
            <div className="text-end" style={{ minWidth: '250px' }}>
              <div className="d-flex justify-content-between mb-2">
                <span>Sin IGV:</span>
                <strong className="ms-3">{formatearPrecioSoles(subtotalSinIgv)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>IGV (18%):</span>
                <strong className="ms-3">{formatearPrecioSoles(igv)}</strong>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top">
                <h5 className="mb-0">Total (con IGV):</h5>
                <h5 className="mb-0 ms-3">{formatearPrecioSoles(totalConIgv)}</h5>
              </div>
            </div>
          </div>
          
          {/* Mensaje informativo */}
          <Alert variant="info" className="mb-3">
            <strong>📞 Importante:</strong> Esta no es una página de checkout o pago en línea. 
            Al confirmar el pedido, enviaremos tu solicitud a nuestro equipo para que se comuniquen 
            contigo y coordinar los detalles de la compra.
          </Alert>
          
          <Form onSubmit={handleEnviar} className="border p-3 rounded bg-light">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPara">
                  <Form.Label>Correo del cliente</Form.Label>
                  <Form.Control
                    type="email"
                    name="para"
                    value={form.para}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCliente">
                  <Form.Label>Nombres del cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={form.cliente}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formApellidos">
                  <Form.Label>Apellidos del cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTelefono">
                  <Form.Label>Teléfono del cliente</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formDireccion">
                  <Form.Label>Dirección de entrega</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            {!authService.isAuthenticated() ? (
              <Alert variant="warning" className="mt-3">
                <strong>⚠️ Debe iniciar sesión para confirmar el pedido</strong>
                <div className="mt-2">
                  <Button 
                    variant="primary" 
                    href="/login?redirect=carrito"
                    className="me-2"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    href="/registro?redirect=carrito"
                  >
                    Crear Cuenta
                  </Button>
                </div>
              </Alert>
            ) : (
              <div>
                <Button type="submit" variant="primary" disabled={enviando}>
                  {enviando ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Enviando solicitud...
                    </>
                  ) : (
                    "📧 Confirmar pedido y contactar con la empresa"
                  )}
                </Button>
                <Form.Text className="d-block mt-2 text-muted">
                  Se enviará tu solicitud a nuestro equipo para coordinar la venta.
                </Form.Text>
              </div>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};
export default Carrito;

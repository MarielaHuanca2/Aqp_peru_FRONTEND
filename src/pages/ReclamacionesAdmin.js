import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/authService";

const ReclamacionesAdmin = () => {
  const [reclamaciones, setReclamaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get("/reclamos")
      .then((res) => {
        setReclamaciones(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const goToAdminPanel = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Reclamaciones</h2>
        <p>Cargando reclamaciones...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="primary" className="mb-3" onClick={goToAdminPanel}>
        Volver al Panel de Administrador
      </Button>
      <h2>Reclamaciones</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Tipo Reclamo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reclamaciones.map((rec, idx) => (
            <tr key={rec.id || idx}>
              <td>{idx + 1}</td>
              <td>{rec.nombres}</td>
              <td>{rec.apellidos}</td>
              <td>{rec.tipoDocumento}</td>
              <td>{rec.numeroDocumento}</td>
              <td>{rec.correo}</td>
              <td>{rec.telefonoMovil || rec.telefonoFijo}</td>
              <td>{rec.tipoReclamo}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => navigate(`/admin/reclamaciones/${rec.id}`)}
                >
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="mt-3" onClick={goToAdminPanel}>
        Volver al Panel de Administrador
      </Button>
    </Container>
  );
};

export default ReclamacionesAdmin;

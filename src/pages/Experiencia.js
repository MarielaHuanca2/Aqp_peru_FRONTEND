function Experiencia() {
  return (
    <div className="container py-4">
      <h2>Experiencia</h2>

      <p style={{ fontSize: "1.2rem" }}>
        En ComputerShops nos dedicamos a brindar soluciones tecnológicas personalizadas a empresas de todos los tamaños. Nuestro equipo experto
        garantiza asesoría especializada, soporte constante y productos de alta calidad.
      </p>

      {/* Cuadros de texto "image" */}
      <div className="row my-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3 mb-3">
            <div
              style={{
                backgroundColor: "#e0e0e0",
                textAlign: "center",
                padding: "50px 0",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              image
            </div>
          </div>
        ))}
      </div>

      <hr />

      <p style={{ fontSize: "1.2rem" }}>
        Nuestra experiencia nos permite ofrecer un servicio confiable y eficiente, ayudando a nuestros clientes a transformar digitalmente sus negocios
        y alcanzar sus metas tecnológicas con éxito.
      </p>
    </div>
  );
}

export default Experiencia;

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

      {/* Caso 1: SEAL */}
      <div className="mt-5">
        <h3 className="mb-3">Caso de Éxito: Renovación del Data Center de SEAL</h3>
        <p><strong>Cliente:</strong> Sociedad Eléctrica del Sur Oeste S.A. - SEAL<br />
        <strong>Sector:</strong> Energía eléctrica<br />
        <strong>Ubicación:</strong> Arequipa, Perú</p>
        <p>SEAL necesitaba modernizar su Data Center para garantizar el funcionamiento de sus aplicaciones críticas y conexiones remotas.</p>
        <p><strong>Solución:</strong></p>
        <ul>
          <li>Aire acondicionado de precisión, sistema contra incendios, UPS, gabinetes, y acceso biométrico.</li>
        </ul>
        <p><strong>Resultados:</strong></p>
        <ul>
          <li>Ambiente óptimo, mayor seguridad y escalabilidad.</li>
        </ul>
        <p><em>Ejecutado por: Consorcio ComputerShop’s S.R.L. e Integrity Perú S.A.C.</em></p>
      </div>

      <hr />

      {/* Caso 2: EGASA */}
      <div className="mt-5">
        <h3 className="mb-3">Caso de Éxito: Servidores Industriales para Sala de Control – EGASA</h3>
        <p><strong>Cliente:</strong> Empresa de Generación Eléctrica de Arequipa S.A. - EGASA<br />
        <strong>Sector:</strong> Generación eléctrica<br />
        <strong>Ubicación:</strong> C.T. Pisco y C.T. Chilina</p>
        <p>EGASA necesitaba renovar sus servidores para mejorar el sistema SCADA sin interrupciones.</p>
        <p><strong>Solución:</strong></p>
        <ul>
          <li>Servidores Blade HP, almacenamiento MSA 2040, migración sin pérdida de datos y capacitación técnica.</li>
        </ul>
        <p><strong>Resultados:</strong></p>
        <ul>
          <li>Continuidad operativa, reducción de fallas y ahorro energético.</li>
        </ul>
        <p><em>Ejecutado por: ComputerShop’s Corporation.</em></p>
      </div>

      <hr />

      {/* Caso 3: SUNARP */}
      <div className="mt-5">
        <h3 className="mb-3">Caso de Éxito: Mantenimiento de Servidores – Zona Registral Nº XII (SUNARP)</h3>
        <p><strong>Cliente:</strong> Zona Registral Nº XII – SUNARP<br />
        <strong>Sector:</strong> Servicios registrales<br />
        <strong>Ubicación:</strong> Arequipa, Perú</p>
        <p>Los equipos de su centro de datos habían superado su garantía y requerían mantenimiento preventivo y correctivo para garantizar continuidad operativa.</p>
        <p><strong>Solución:</strong></p>
        <ul>
          <li>Mantenimiento integral a servidores, almacenamiento, respaldo, red, UPS, aire acondicionado, cableado y monitoreo.</li>
        </ul>
        <p><strong>Resultados:</strong></p>
        <ul>
          <li>Reducción de incidencias, aumento de vida útil y operatividad constante.</li>
        </ul>
        <p><em>Ejecutado por: ComputerShop’s Corporation.</em></p>
      </div>

      <hr />

      {/* Caso 4: ZOFRATACNA */}
      <div className="mt-5">
        <h3 className="mb-3">Caso de Éxito: Sistema de Video Vigilancia y Monitoreo – ZOFRATACNA</h3>
        <p><strong>Cliente:</strong> Zona Franca de Tacna – ZOFRATACNA<br />
        <strong>Sector:</strong> Comercio exterior / Seguridad institucional<br />
        <strong>Ubicación:</strong> Tacna, Perú</p>
        <p>ZOFRATACNA contaba con un sistema CCTV obsoleto, poniendo en riesgo la seguridad. Se requería implementar un sistema IP moderno y eficiente.</p>
        <p><strong>Solución:</strong></p>
        <ul>
          <li>Instalación de 8 cámaras IP Axis, software ISS SecurOS, servidor Dell, cableado estructurado Cat 6 y fibra OM3.</li>
          <li>Centro de monitoreo con joystick y pantalla dedicada. Integración con infraestructura virtualizada VMware.</li>
        </ul>
        <p><strong>Resultados:</strong></p>
        <ul>
          <li>Vigilancia en tiempo real, control de accesos, monitoreo bajo demanda, y gestión centralizada.</li>
        </ul>
        <p><em>Ejecutado por: Consorcio ComputerShop’s S.R.L. y Soluciones Digitales Unificadas.</em></p>
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


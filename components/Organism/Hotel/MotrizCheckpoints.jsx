const MotrizCheckpoints = () => (
    <div>
      <div className="text-center">
       <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Motriz</h2>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Accesos y Entradas:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El hotel cuenta con rampas accesibles para sillas de ruedas.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las puertas de acceso a las habitaciones y áreas comunes tienen un ancho mínimo de 90 cm.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay un camino accesible desde el estacionamiento hasta la entrada principal.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Habitaciones:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El hotel tiene habitaciones adaptadas para personas con movilidad reducida.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las camas y muebles están diseñados para facilitar el acceso a personas en silla de ruedas.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Baños:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los baños de las habitaciones adaptadas tienen barras de apoyo.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las duchas son accesibles y tienen asientos o espacio para sillas de ruedas.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay suficiente espacio en el baño para el giro de una silla de ruedas (mínimo 1.50 m de diámetro).
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Albercas y Playas (si aplicable):</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              La alberca cuenta con una rampa o silla hidráulica para facilitar el acceso.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay caminos accesibles hasta la alberca o playa.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Existen áreas adaptadas con sombra y descanso cerca de la alberca o playa.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Otras áreas recreativas:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las áreas recreativas (gimnasios, jardines, etc.) son accesibles para personas con movilidad reducida.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay rutas accesibles hacia todas las áreas comunes.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Estacionamiento:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El hotel ofrece plazas de estacionamiento reservadas y señalizadas para personas con discapacidad.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El transporte interno del hotel es accesible para personas con movilidad reducida (si aplica).
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default MotrizCheckpoints;
  
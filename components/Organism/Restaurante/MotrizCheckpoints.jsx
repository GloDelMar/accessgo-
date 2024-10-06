const RestMotrizCheckpoints = () => (
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
              El restaurante cuenta con rampas accesibles para sillas de ruedas.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las puertas tienen un ancho mínimo de 90 cm para permitir el acceso.
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
        <h4 className="text-lg font-semibold mb-2">Circulación Interior:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los pasillos tienen un ancho mínimo de 1.20 m para facilitar la circulación de sillas de ruedas.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las mesas tienen una altura mínima de 70 cm en la parte inferior para permitir el acceso de sillas de ruedas.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Mobiliario:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Existen mesas reservadas y adaptadas para personas con movilidad reducida.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El mobiliario está dispuesto de forma que permite la movilidad de sillas de ruedas.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Sanitarios:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El restaurante cuenta con baños adaptados, con barras de apoyo.
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
        <h4 className="text-lg font-semibold mb-2">Estacionamiento:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El restaurante tiene plazas de estacionamiento reservadas para personas con discapacidad.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los espacios de estacionamiento están señalizados y son accesibles.
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default RestMotrizCheckpoints;
  
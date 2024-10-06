
const RestVisualCheckpoints = () => (
    <div>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Visual</h2>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Accesos y Entradas:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay señalización táctil o en braille en la entrada del restaurante.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Se cuenta con rutas accesibles y bien señalizadas hacia la entrada principal.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las puertas de acceso tienen texturas o contrastes visuales para ser identificadas fácilmente.
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
              Los pasillos y rutas dentro del restaurante están bien señalizados con alto contraste.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Existen guías táctiles en el piso o sistemas podotáctiles para ayudar en la orientación.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las mesas y el mobiliario tienen bordes contrastantes para su identificación.
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
              Las cartas o menús están disponibles en formatos accesibles (braille, texto ampliado, o digitales con lector de pantalla).
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las áreas de servicio están bien iluminadas y señalizadas.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Señalización:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las señalizaciones importantes (salidas de emergencia, baños, etc.) tienen alto contraste y están en braille.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay asistencia auditiva o personal capacitado para guiar a personas con discapacidad visual.
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
              Los baños cuentan con señalización táctil o braille.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los interruptores y dispensadores están bien ubicados y marcados de forma accesible.
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
              El restaurante cuenta con señalización accesible para personas con discapacidad visual en las áreas de estacionamiento.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay asistencia o guía disponible para el desplazamiento desde el estacionamiento al restaurante.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Perros Guía:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El restaurante acepta perros guía y ofrece acceso sin restricciones para ellos.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay áreas designadas donde los perros guía pueden descansar mientras sus dueños comen.
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default RestVisualCheckpoints;
  
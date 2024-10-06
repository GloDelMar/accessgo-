
const RestAuditivaCheckpoints = () => {
    return (
      <div className="mt-4">
       <div className="text-center">
        <h2 className="text-lg font-bold">Accesibilidad para Personas con Discapacidad Auditiva</h2>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Accesos y Entradas:</h4>
          <ul className="list-none">
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Las señales de entrada y salida están claramente indicadas con símbolos visuales.
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Hay alarmas visuales (luces intermitentes) en caso de emergencia.
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
                El personal está capacitado en lengua de señas o hay un servicio de intérprete disponible.
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Existen pantallas o señalización digital visual para informar sobre los servicios, menús o promociones.
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
                El restaurante ofrece dispositivos visuales de llamada en las mesas (por ejemplo, luces o sistemas vibratorios).
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Las áreas de servicio y el mobiliario tienen señalización visual adecuada para facilitar la orientación.
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
                La señalización de emergencia está reforzada con alarmas visuales (luces intermitentes) y texto claro.
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Hay sistemas de comunicación visual disponibles para los clientes, como pantallas o menús digitales.
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
                Los baños están equipados con señales visuales de emergencia (luces o pantallas).
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                La señalización dentro de los baños es clara y visible, con símbolos visuales.
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
                El restaurante cuenta con señalización visual en las áreas de estacionamiento para personas con discapacidad auditiva.
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Hay alarmas visuales o guías indicativas para la evacuación en caso de emergencia.
              </label>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Perros de Servicio:</h4>
          <ul className="list-none">
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                El restaurante acepta perros de servicio auditivo y permite su acceso sin restricciones.
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Hay áreas designadas donde los perros de servicio auditivo pueden descansar mientras sus dueños comen.
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default RestAuditivaCheckpoints;

const AuditivaCheckpoints = () => (
    <div>
      <div className="text-center ">
        <h2 className="text-xl font-bold mb-4">Accesibilidad para Personas con Discapacidad Auditiva</h2>
      </div>
       <div>
        <h4 className="text-lg font-semibold mb-2">Accesos y Entradas:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El hotel tiene señalización visual clara en las entradas y salidas, utilizando símbolos y texto.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay alarmas visuales (luces intermitentes) en caso de emergencia en todas las áreas de entrada.
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
              Las habitaciones están equipadas con alarmas visuales (luces intermitentes) para emergencias.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las habitaciones cuentan con dispositivos visuales o vibratorios para llamadas a la puerta.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El televisor tiene subtítulos disponibles para los huéspedes.
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
              Los baños tienen alarmas visuales de emergencia.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los dispensadores y otras instalaciones están bien señalizadas con texto y símbolos.
            </label>
          </li>
        </ul>
      </div>
       <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Áreas Comunes y Recreativas:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las áreas comunes tienen alarmas visuales (luces intermitentes) y señalización clara en caso de emergencia.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los servicios ofrecidos en las áreas recreativas tienen señalización visual adecuada y personal capacitado.
            </label>
          </li>
        </ul>
      </div>
       <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Señalización General:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Todas las áreas del hotel (salidas de emergencia, ascensores, áreas de servicios) tienen señalización visual clara.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los ascensores están equipados con señales visuales para indicar los pisos y las direcciones.
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
              El hotel tiene señalización visual clara y alarmas visuales en las áreas de estacionamiento.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay guías visuales para facilitar la evacuación en caso de emergencia.
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
              El hotel acepta perros de servicio auditivo y permite su acceso sin restricciones.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay áreas designadas para el descanso de perros de servicio auditivo dentro del hotel.
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Asistencia y Personal:</h4>
        <ul className="list-none">
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              El personal del hotel está capacitado en lengua de señas o tiene acceso a intérpretes.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay dispositivos de asistencia auditiva disponibles (como bucles de inducción o sistemas de amplificación).
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default AuditivaCheckpoints;
  
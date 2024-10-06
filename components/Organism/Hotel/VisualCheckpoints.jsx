const VisualCheckpoints = () => (
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
              El hotel cuenta con señalización táctil o en braille en las entradas.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las rutas hacia la entrada y las áreas comunes están marcadas con guías táctiles o sistemas podotáctiles.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las puertas de acceso tienen texturas o contrastes visuales para su fácil identificación.
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
              Las habitaciones adaptadas tienen numeración en braille y texto con alto contraste.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los interruptores, enchufes y dispositivos electrónicos tienen señalización accesible.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay guías táctiles o rutas visualmente contrastantes para moverse dentro de la habitación.
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
              Los baños tienen señalización en braille o táctil para identificar las áreas (inodoro, ducha, etc.).
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los dispensadores de jabón y papel están marcados de manera accesible.
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
              Las áreas comunes tienen guías táctiles o señalización con alto contraste para ayudar en la orientación.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay mapas en relieve o con braille disponibles para la orientación en el hotel.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Las albercas y áreas recreativas cuentan con señalización accesible y asistencia si es necesario.
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
              Toda la señalización del hotel (salidas de emergencia, ascensores, áreas de servicios) tiene alto contraste y braille.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Los ascensores tienen botones en braille y señales auditivas para indicar el piso.
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
              El hotel ofrece asistencia o guías para personas con discapacidad visual en el estacionamiento.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay señalización accesible en las áreas de estacionamiento, con indicadores táctiles o visualmente contrastantes.
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
              El hotel acepta perros guía y ofrece acceso sin restricciones para ellos.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay áreas designadas para el descanso de perros guía dentro del hotel.
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
              El personal del hotel está capacitado para asistir a personas con discapacidad visual.
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Hay servicio de guías o asistencia disponible para el desplazamiento en áreas clave.
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default VisualCheckpoints;
  
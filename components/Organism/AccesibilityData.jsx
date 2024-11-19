// accessibilityData.js
export const restaurantQuestions = {
    disabilities: [
        {
            type: "Auditiva",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "Las señales de entrada y salida están claramente indicadas con símbolos visuales.", response: false },
                        { question: "Hay alarmas visuales (luces intermitentes) en caso de emergencia.", response: false },
                    ],
                },
                {
                    name: "Circulación Interior",
                    questions: [
                        { question: "El personal está capacitado en lengua de señas o hay un servicio de intérprete disponible.", response: false },
                        { question: "Existen pantallas o señalización digital visual para informar sobre los servicios, menús o promociones.", response: false },
                    ],
                },
                {
                    name: "Mobiliario",
                    questions: [
                        { question: "El restaurante ofrece dispositivos visuales de llamada en las mesas (por ejemplo, luces o sistemas vibratorios).", response: false },
                        { question: "Las áreas de servicio y el mobiliario tienen señalización visual adecuada para facilitar la orientación.", response: false },
                    ],
                },
                {
                    name: "Señalización",
                    questions: [
                        { question: "La señalización de emergencia está reforzada con alarmas visuales (luces intermitentes) y texto claro.", response: false },
                        { question: "Hay sistemas de comunicación visual disponibles para los clientes, como pantallas o menús digitales.", response: false },
                    ],
                },
                {
                    name: "Sanitarios",
                    questions: [
                        { question: "Los baños están equipados con señales visuales de emergencia (luces o pantallas).", response: false },
                        { question: "La señalización dentro de los baños es clara y visible, con símbolos visuales.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El restaurante cuenta con señalización visuales en las áreas de estacionamiento para personas con discapacidad auditiva.", response: false },
                        { question: "Hay alarmas visuales o guías indicativas para la evacuación en caso de emergencia.", response: false },
                    ],
                },
                {
                    name: "Perros de Servicio",
                    questions: [
                        { question: "El restaurante acepta perros de servicio auditivo y permite su acceso sin restricciones.", response: false },
                        { question: "Hay áreas designadas donde los perros de servicio auditivo pueden descansar mientras sus dueños comen.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Intelectual",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "La entrada del restaurante tiene señalización clara y sencilla, con símbolos fáciles de entender.", response: false },
                        { question: "Hay personal disponible para asistir en la orientación si es necesario.", response: false },
                    ],
                },
                {
                    name: "Circulación Interior",
                    questions: [
                        { question: "Los pasillos y rutas dentro del restaurante están bien marcados con señales visuales sencillas.", response: false },
                        { question: "Las áreas de tránsito están libres de obstáculos y bien iluminadas para facilitar la orientación.", response: false },
                    ],
                },
                {
                    name: "Mobiliario",
                    questions: [
                        { question: "Las cartas o menús están disponibles en versiones simplificadas con pictogramas o imágenes.", response: false },
                        { question: "Los precios y descripciones de los alimentos están escritos de manera clara y en un lenguaje sencillo.", response: false },
                    ],
                },
                {
                    name: "Señalización",
                    questions: [
                        { question: "La señalización de emergencia está claramente marcada con pictogramas y texto simple.", response: false },
                        { question: "Existen mapas o guías visuales con instrucciones claras para moverse dentro del restaurante.", response: false },
                    ],
                },
                {
                    name: "Sanitarios",
                    questions: [
                        { question: "Los baños cuentan con señalización clara y visible que incluye símbolos y colores fácilmente comprensibles.", response: false },
                        { question: "Las instrucciones de uso de los dispositivos (grifos, secadores de manos, etc.) están escritas de manera sencilla o ilustradas.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El restaurante tiene señalización visual clara y sencilla en las áreas de estacionamiento.", response: false },
                        { question: "Hay asistencia disponible para ayudar con el desplazamiento desde el estacionamiento hasta el restaurante si es necesario.", response: false },
                    ],
                },
                {
                    name: "Personal Capacitado",
                    questions: [
                        { question: "El personal está capacitado en atención a personas con discapacidad intelectual, utilizando un lenguaje sencillo y claro.", response: false },
                        { question: "Hay personal disponible para ofrecer ayuda o asistencia en caso de que los clientes lo necesiten.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Motriz",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "El restaurante cuenta con rampas accesibles para sillas de ruedas.", response: false },
                        { question: "Las puertas tienen un ancho mínimo de 90 cm para permitir el acceso.", response: false },
                        { question: "Hay un camino accesible desde el estacionamiento hasta la entrada principal.", response: false },
                    ],
                },
                {
                    name: "Circulación Interior",
                    questions: [
                        { question: "Los pasillos tienen un ancho mínimo de 1.20 m para facilitar la circulación de sillas de ruedas.", response: false },
                        { question: "Las mesas tienen una altura mínima de 70 cm en la parte inferior para permitir el acceso de sillas de ruedas.", response: false },
                    ],
                },
                {
                    name: "Mobiliario",
                    questions: [
                        { question: "Existen mesas reservadas y adaptadas para personas con movilidad reducida.", response: false },
                        { question: "El mobiliario está dispuesto de forma que permite la movilidad de sillas de ruedas.", response: false },
                    ],
                },
                {
                    name: "Sanitarios",
                    questions: [
                        { question: "El restaurante cuenta con baños adaptados, con barras de apoyo.", response: false },
                        { question: "Hay suficiente espacio en el baño para el giro de una silla de ruedas (mínimo 1.50 m de diámetro).", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El restaurante tiene plazas de estacionamiento reservadas para personas con discapacidad.", response: false },
                        { question: "Los espacios de estacionamiento están señalizados y son accesibles.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Neurodivergente",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "La entrada al restaurante tiene señalización clara y sencilla, con símbolos o gráficos que faciliten la orientación.", response: false },
                        { question: "Existen zonas de espera o entrada libres de aglomeraciones y con ruido controlado.", response: false },
                    ],
                },
                {
                    name: "Ambiente Sensorial",
                    questions: [
                        { question: "El restaurante cuenta con zonas de menor estimulación sensorial, como áreas con menos ruido y luz tenue.", response: false },
                        { question: "La iluminación del restaurante es regulable o hay opciones de áreas con luz suave, sin luces intermitentes.", response: false },
                        { question: "La música de fondo o los sonidos ambientales están controlados y no resultan intrusivos para los clientes.", response: false },
                    ],
                },
                {
                    name: "Circulación Interior",
                    questions: [
                        { question: "Los pasillos y zonas de circulación están bien definidos, con señalización visual clara y sin distracciones excesivas.", response: false },
                        { question: "El espacio está organizado de manera que minimiza la sobrecarga sensorial y permite una circulación fluida.", response: false },
                    ],
                },
                {
                    name: "Mobiliario",
                    questions: [
                        { question: "El mobiliario está organizado de manera estructurada y permite a los clientes tener un espacio propio y cómodo.", response: false },
                        { question: "Se ofrecen mesas en zonas más tranquilas o apartadas para quienes prefieran menos interacción social o estímulos.", response: false },
                    ],
                },
                {
                    name: "Menú y Pedidos",
                    questions: [
                        { question: "El menú está disponible en un formato visual claro, con pictogramas o descripciones sencillas para facilitar la toma de decisiones.", response: false },
                        { question: "Existe la opción de realizar pedidos por medio de aplicaciones o pantallas para minimizar la interacción social si es necesario.", response: false },
                    ],
                },
                {
                    name: "Señalización",
                    questions: [
                        { question: "Las señales dentro del restaurante están organizadas de manera clara y sencilla, sin sobrecargar visualmente a los clientes.", response: false },
                        { question: "Las rutas de salida de emergencia y las áreas importantes están bien señalizadas con colores y símbolos claros.", response: false },
                    ],
                },
                {
                    name: "Sanitarios",
                    questions: [
                        { question: "Los baños tienen señalización visual sencilla y accesible, con símbolos que ayuden a identificar las áreas.", response: false },
                        { question: "Existen áreas de sanitarios que proporcionan un ambiente tranquilo y cómodo, con iluminación suave.", response: false },
                    ],
                },
                {
                    name: "Perros de Asistencia o de Terapia",
                    questions: [
                        { question: "El restaurante acepta perros de asistencia o terapia para apoyar a personas neurodivergentes que puedan requerir su compañía.", response: false },
                    ],
                },
                {
                    name: "Personal Capacitado",
                    questions: [
                        { question: "El personal está capacitado en sensibilización neurodivergente y está preparado para interactuar de manera comprensiva y calmada.", response: false },
                        { question: "Existe la opción de informar al personal sobre necesidades específicas de los clientes para una experiencia personalizada.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Visual",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "Hay señalización táctil o en braille en la entrada del restaurante.", response: false },
                        { question: "Se cuenta con rutas accesibles y bien señalizadas hacia la entrada principal.", response: false },
                        { question: "Las puertas de acceso tienen texturas o contrastes visuales para ser identificadas fácilmente.", response: false },
                    ],
                },
                {
                    name: "Circulación Interior",
                    questions: [
                        { question: "Los pasillos y rutas dentro del restaurante están bien señalizados con alto contraste.", response: false },
                        { question: "Existen guías táctiles en el piso o sistemas podotáctiles para ayudar en la orientación.", response: false },
                        { question: "Las mesas y el mobiliario tienen bordes contrastantes para su identificación.", response: false },
                    ],
                },
                {
                    name: "Mobiliario",
                    questions: [
                        { question: "Las cartas o menús están disponibles en formatos accesibles (braille, texto ampliado, o digitales con lector de pantalla).", response: false },
                        { question: "Las áreas de servicio están bien iluminadas y señalizadas.", response: false },
                    ],
                },
                {
                    name: "Señalización",
                    questions: [
                        { question: "Las señalizaciones importantes (salidas de emergencia, baños, etc.) tienen alto contraste y están en braille.", response: false },
                        { question: "Hay asistencia auditiva o personal capacitado para guiar a personas con discapacidad visual.", response: false },
                    ],
                },
                {
                    name: "Sanitarios",
                    questions: [
                        { question: "Los baños cuentan con señalización táctil o braille.", response: false },
                        { question: "Los interruptores y dispensadores están bien ubicados y marcados de forma accesible.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El restaurante cuenta con señalización accesible para personas con discapacidad visual en las áreas de estacionamiento.", response: false },
                        { question: "Hay asistencia o guía disponible para el desplazamiento desde el estacionamiento al restaurante.", response: false },
                    ],
                },
                {
                    name: "Perros Guía",
                    questions: [
                        { question: "El restaurante acepta perros guía y ofrece acceso sin restricciones para ellos.", response: false },
                        { question: "Hay áreas designadas donde los perros guía pueden descansar mientras sus dueños comen.", response: false },
                    ],
                },
            ],
        }
    ]
};

export const hotelQuestions = {
    disabilities: [
        {
            type: "Auditiva",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "El hotel tiene señalización visual clara en las entradas y salidas, utilizando símbolos y texto.", response: false, },
                        { question: "Hay alarmas visuales (luces intermitentes) en caso de emergencia en todas las áreas de entrada.", response: false, },
                    ],
                },
                {
                    name: "Habitaciones",
                    questions: [
                        { question: "Las habitaciones están equipadas con alarmas visuales (luces intermitentes) para emergencias.", response: false },
                        { question: "Las habitaciones cuentan con dispositivos visuales o vibratorios para llamadas a la puerta.", response: false },
                        { question: "El televisor tiene subtítulos disponibles para los huéspedes.", response: false },
                    ],
                },
                {
                    name: "Baños",
                    questions: [
                        { question: "Los baños tienen alarmas visuales de emergencia.", response: false },
                        { question: "Los dispensadores y otras instalaciones están bien señalizadas con texto y símbolos.", response: false },
                    ],
                },
                {
                    name: "Áreas Comunes y Recreativas",
                    questions: [
                        { question: "Las áreas comunes tienen alarmas visuales (luces intermitentes) y señalización clara en caso de emergencia.", response: false },
                        { question: "Los servicios ofrecidos en las áreas recreativas tienen señalización visual adecuada y personal capacitado.", response: false },
                    ],
                },
                {
                    name: "Señalización General",
                    questions: [
                        { question: "Todas las áreas del hotel (salidas de emergencia, ascensores, áreas de servicios) tienen señalización visual clara.", response: false },
                        { question: "Los ascensores están equipados con señales visuales para indicar los pisos y las direcciones.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El hotel tiene señalización visual clara y alarmas visuales en las áreas de estacionamiento.", response: false },
                        { question: "Hay guías visuales para facilitar la evacuación en caso de emergencia.", response: false },
                    ],
                },
                {
                    name: "Perros de Servicio",
                    questions: [
                        { question: "El hotel acepta perros de servicio auditivo y permite su acceso sin restricciones.", response: false },
                        { question: "Hay áreas designadas para el descanso de perros de servicio auditivo dentro del hotel.", response: false },
                    ],
                },
                {
                    name: "Asistencia y Personal",
                    questions: [
                        { question: "El personal del hotel está capacitado en lengua de señas o tiene acceso a intérpretes.", response: false },
                        { question: "Hay dispositivos de asistencia auditiva disponibles (como bucles de inducción o sistemas de amplificación).", response: false },
                    ],
                },
            ],
        },
        {
            type: "Intelectual",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "La entrada del hotel tiene señalización clara y sencilla con pictogramas y símbolos fáciles de entender.", response: false },
                        { question: "Hay personal disponible para asistir en la orientación y registro si es necesario.", response: false },
                    ],
                },
                {
                    name: "Habitaciones",
                    questions: [
                        { question: "Las habitaciones tienen instrucciones sencillas para el uso de las instalaciones (luces, televisor, teléfono).", response: false },
                        { question: "La señalización de la habitación incluye números grandes, con símbolos visuales o colores para fácil identificación.", response: false },
                    ],
                },
                {
                    name: "Baños",
                    questions: [
                        { question: "Los baños tienen señales claras y sencillas para indicar las áreas de uso (inodoro, ducha, etc.).", response: false },
                        { question: "Las instrucciones de uso de los dispositivos (grifos, ducha) están simplificadas y visualmente accesibles.", response: false },
                    ],
                },
                {
                    name: "Áreas Comunes y Recreativas",
                    questions: [
                        { question: "Las áreas comunes tienen señalización simple y clara, utilizando pictogramas o texto sencillo.", response: false },
                        { question: "Las instrucciones para el uso de las áreas recreativas o albercas están simplificadas, con gráficos o imágenes.", response: false },
                    ],
                },
                {
                    name: "Señalización General",
                    questions: [
                        { question: "Todas las señales dentro del hotel (salidas de emergencia, ascensores, áreas de servicios) son fáciles de entender, con símbolos o pictogramas claros.", response: false },
                        { question: "Existen mapas o guías visuales con instrucciones sencillas para moverse por el hotel.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El hotel tiene señalización visual clara y sencilla en las áreas de estacionamiento, utilizando símbolos y texto comprensible.", response: false },
                        { question: "Hay asistencia disponible en el estacionamiento para orientar a las personas con discapacidad intelectual si es necesario.", response: false },
                    ],
                },
                {
                    name: "Personal Capacitado",
                    questions: [
                        { question: "El personal del hotel está capacitado para asistir a personas con discapacidad intelectual utilizando lenguaje claro y directo.", response: false },
                        { question: "Hay personal disponible para ofrecer ayuda en situaciones que puedan requerir mayor orientación o explicación.", response: false },
                    ],
                },
                {
                    name: "Asistencia en Actividades",
                    questions: [
                        { question: "Si el hotel organiza actividades, estas tienen guías o instructores capacitados para incluir a personas con discapacidad intelectual, adaptando las explicaciones de forma clara y sencilla.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Motriz",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "El hotel cuenta con rampas accesibles para sillas de ruedas.", response: false },
                        { question: "Las puertas de acceso a las habitaciones y áreas comunes tienen un ancho mínimo de 90 cm.", response: false },
                        { question: "Hay un camino accesible desde el estacionamiento hasta la entrada principal.", response: false },
                    ],
                },
                {
                    name: "Habitaciones",
                    questions: [
                        { question: "El hotel tiene habitaciones adaptadas para personas con movilidad reducida.", response: false },
                        { question: "Las camas y muebles están diseñados para facilitar el acceso a personas en silla de ruedas.", response: false },
                    ],
                },
                {
                    name: "Baños",
                    questions: [
                        { question: "Los baños de las habitaciones adaptadas tienen barras de apoyo.", response: false },
                        { question: "Las duchas son accesibles y tienen asientos o espacio para sillas de ruedas.", response: false },
                        { question: "Hay suficiente espacio en el baño para el giro de una silla de ruedas (mínimo 1.50 m de diámetro).", response: false },
                    ],
                },
                {
                    name: "Albercas y Playas",
                    questions: [
                        { question: "La alberca cuenta con una rampa o silla hidráulica para facilitar el acceso.", response: false },
                        { question: "Hay caminos accesibles hasta la alberca o playa.", response: false },
                        { question: "Existen áreas adaptadas con sombra y descanso cerca de la alberca o playa.", response: false },
                    ],
                },
                {
                    name: "Otras áreas recreativas",
                    questions: [
                        { question: "Las áreas recreativas (gimnasios, jardines, etc.) son accesibles para personas con movilidad reducida.", response: false },
                        { question: "Hay rutas accesibles hacia todas las áreas comunes.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El hotel ofrece plazas de estacionamiento reservadas y señalizadas para personas con discapacidad.", response: false },
                        { question: "El transporte interno del hotel es accesible para personas con movilidad reducida (si aplica).", response: false },
                    ],
                },
            ],
        },
        {
            type: "Neurodivergente",
            sections: [
                {
                    name: "Accesos y Entradas",
                    questions: [
                        { question: "La entrada al hotel tiene señalización clara y sencilla, con rutas visuales fáciles de seguir.", response: false },
                        { question: "Existen zonas de espera tranquilas, con luz tenue y sin ruido excesivo para quienes necesiten menos estimulación sensorial.", response: false },
                    ],
                },
                {
                    name: "Habitaciones",
                    questions: [
                        { question: "Las habitaciones tienen opciones de iluminación suave, regulable, y están libres de estímulos visuales o auditivos intrusivos.", response: false },
                        { question: "Las habitaciones se encuentran organizadas de manera estructurada y sin decoración excesiva para reducir la sobrecarga sensorial.", response: false },
                        { question: "Existe la opción de seleccionar una habitación en una zona más tranquila del hotel (alejada de ascensores o áreas comunes).", response: false },
                    ],
                },
                {
                    name: "Baños",
                    questions: [
                        { question: "Los baños en las habitaciones y áreas comunes tienen señalización sencilla y clara, con símbolos fáciles de entender.", response: false },
                        { question: "Las instrucciones de uso para las duchas y otros dispositivos están explicadas visualmente de manera clara y simple.", response: false },
                    ],
                },
                {
                    name: "Áreas Comunes y Recreativas",
                    questions: [
                        { question: "Las áreas comunes cuentan con zonas de menor estimulación sensorial, donde se pueda descansar de ruidos o luces intensas.", response: false },
                        { question: "Las actividades recreativas tienen opciones para ser realizadas en un ambiente controlado sensorialmente, con luz y sonido suaves.", response: false },
                    ],
                },
                {
                    name: "Señalización General",
                    questions: [
                        { question: "Todas las señales dentro del hotel (salidas de emergencia, ascensores, áreas de servicios) están diseñadas de manera clara y sin sobrecarga visual.", response: false },
                        { question: "Existen mapas visuales sencillos que permiten a los huéspedes neurodivergentes orientarse fácilmente por el hotel.", response: false },
                    ],
                },
                {
                    name: "Estacionamiento",
                    questions: [
                        { question: "El hotel tiene señalización visual clara y sencilla en las áreas de estacionamiento, con colores o símbolos que ayuden a la orientación.", response: false },
                        { question: "Hay rutas visualmente claras desde el estacionamiento hasta las entradas principales del hotel.", response: false },
                    ],
                },
                {
                    name: "Personal Capacitado",
                    questions: [
                        { question: "El personal del hotel está capacitado en la sensibilización neurodivergente y está preparado para ofrecer interacciones comprensivas, calmas y no invasivas.", response: false },
                        { question: "Existe la opción de informar al personal sobre las necesidades sensoriales de los huéspedes para adaptar la experiencia.", response: false },
                    ],
                },
                {
                    name: "Perros de Asistencia o de Terapia",
                    questions: [
                        { question: "El hotel acepta perros de asistencia o terapia para apoyar a personas neurodivergentes que puedan requerir su compañía.", response: false },
                    ],
                },
                {
                    name: "Asistencia en Actividades",
                    questions: [
                        { question: "Si el hotel organiza actividades, estas tienen guías o instructores capacitados para adaptar las explicaciones y reducir la estimulación sensorial, según las necesidades de los huéspedes neurodivergentes.", response: false },
                    ],
                },
            ],
        },
        {
            type: "Visual",
            sections: [
                {
                  name: "Accesos y Entradas",
                  questions: [
                    { question: "Hay señalización táctil o en braille en la entrada del restaurante.", response: false },
                    { question: "Se cuenta con rutas accesibles y bien señalizadas hacia la entrada principal.", response: false },
                    { question: "Las puertas de acceso tienen texturas o contrastes visuales para ser identificadas fácilmente.", response: false },
                  ],
                },
                {
                  name: "Circulación Interior",
                  questions: [
                    { question: "Los pasillos y rutas dentro del restaurante están bien señalizados con alto contraste.", response: false },
                    { question: "Existen guías táctiles en el piso o sistemas podotáctiles para ayudar en la orientación.", response: false },
                    { question: "Las mesas y el mobiliario tienen bordes contrastantes para su identificación.", response: false },
                  ],
                },
                {
                  name: "Mobiliario",
                  questions: [
                    { question: "Las cartas o menús están disponibles en formatos accesibles (braille, texto ampliado, o digitales con lector de pantalla).", response: false },
                    { question: "Las áreas de servicio están bien iluminadas y señalizadas.", response: false },
                  ],
                },
                {
                  name: "Señalización",
                  questions: [
                    { question: "Las señalizaciones importantes (salidas de emergencia, baños, etc.) tienen alto contraste y están en braille.", response: false },
                    { question: "Hay asistencia auditiva o personal capacitado para guiar a personas con discapacidad visual.", response: false },
                  ],
                },
                {
                  name: "Sanitarios",
                  questions: [
                    { question: "Los baños cuentan con señalización táctil o braille.", response: false },
                    { question: "Los interruptores y dispensadores están bien ubicados y marcados de forma accesible.", response: false },
                  ],
                },
                {
                  name: "Estacionamiento",
                  questions: [
                    { question: "El restaurante cuenta con señalización accesible para personas con discapacidad visual en las áreas de estacionamiento.", response: false },
                    { question: "Hay asistencia o guía disponible para el desplazamiento desde el estacionamiento al restaurante.", response: false },
                  ],
                },
                {
                  name: "Perros Guía",
                  questions: [
                    { question: "El restaurante acepta perros guía y ofrece acceso sin restricciones para ellos.", response: false },
                    { question: "Hay áreas designadas donde los perros guía pueden descansar mientras sus dueños comen.", response: false },
                  ],
                },
              ],
            }
    ]
};

const Modal = ({ isOpen, onClose, disabilityType }) => {
    const descriptions = {
        Motriz: "Una persona con discapacidad motriz tiene limitaciones en el movimiento o la capacidad de moverse fácilmente. Estas limitaciones pueden ser causadas por una variedad de condiciones, como parálisis, problemas en las extremidades o dificultades para caminar. Las barreras que enfrentan suelen ser obstáculos físicos, como escaleras, puertas angostas, superficies irregulares o falta de rampas, que dificultan el acceso a espacios y servicios. También pueden enfrentar dificultades en la comunicación, el transporte o la participación en actividades diarias, limitando su independencia e inclusión en la sociedad.",
        Visual: "Una persona con discapacidad visual tiene dificultades para ver o carece completamente de visión. Esto puede ser causado por diferentes condiciones, como ceguera total o parcial, defectos en la percepción visual o enfermedades que afectan la vista. Las barreras que enfrentan incluyen la falta de información accesible en formatos visuales, como textos impresos o señales, lo que dificulta su orientación y acceso a espacios o servicios. También pueden enfrentar dificultades con el mobiliario, los elementos urbanos mal diseñados, o la falta de guía en entornos como transporte público o edificios, lo que puede limitar su autonomía e inclusión. Con ajustes y adaptaciones, como señales en braille o sistemas de audio, estas barreras pueden superarse, facilitando su plena participación en la sociedad.",
        Auditiva: "Una persona con discapacidad auditiva tiene dificultades para oír o no puede escuchar en absoluto. Esto puede ser causado por diferentes condiciones, como pérdida auditiva total o parcial. La comunidad de sordos se basa en una rica cultura y lengua propia, la lengua de señas, que les permite comunicarse de manera efectiva. Las barreras que enfrentan suelen incluir la falta de accesibilidad en medios de comunicación como el subtitulado o la interpretación en lenguaje de señas, lo que puede dificultar su acceso a información y servicios. Además, entornos sin adecuadas señalizaciones visuales, como falta de accesos adaptados o comunicación escrita, pueden limitar su inclusión y participación plena en la sociedad. Con ajustes como la interpretación en lengua de señas, el subtitulado y espacios accesibles, estas barreras pueden reducirse, promoviendo la inclusión y el respeto hacia su comunidad.",
        Intelectual: "Una persona con discapacidad intelectual tiene dificultades en el aprendizaje, el razonamiento y la comunicación, lo que puede afectar su capacidad para resolver problemas, seguir instrucciones o tomar decisiones de manera independiente. Estas dificultades pueden variar en grado, pero no limitan su capacidad para participar plenamente en la vida social y comunitaria. Las barreras que enfrentan suelen incluir entornos o comunicaciones que no están adaptados a sus necesidades, como información escrita compleja o sistemas de comunicación que no consideran sus capacidades. También pueden enfrentar desafíos en el acceso a servicios, como educación, empleo o actividades recreativas, si no se implementan apoyos o ajustes razonables. Con la creación de entornos más inclusivos, accesibles y comprensibles, se pueden reducir estas barreras, promoviendo una mayor inclusión y el respeto hacia sus capacidades.",
        Neurodivergente: 'Una persona neurodivergente tiene un cerebro que funciona de manera diferente a lo "neurotípico". Esto puede incluir condiciones como el autismo, el síndrome de Tourette, o el TDAH, entre otras. Las diferencias neurodivergentes pueden influir en cómo procesan el mundo, cómo se relacionan con los demás, y cómo gestionan la información. Las barreras que enfrentan las personas neurodivergentes pueden incluir la falta de comprensión y ajustes en entornos sociales, educativos o laborales, como el exceso de estímulos, la comunicación poco clara, o sistemas que no contemplan sus necesidades. Espacios y servicios sin accesibilidad o comprensión de sus formas de interacción y aprendizaje pueden limitar su participación e inclusión. Con apoyos como entornos estructurados, comunicación clara y ajustes razonables, se pueden minimizar estas barreras, permitiendo una mayor integración y respeto por sus diferencias.',
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[90%] md:w-2/3 lg:w-1/2">
                    <h2 className="text-xl font-bold mb-4">Conoce más: </h2>
                    <p>{descriptions[disabilityType]}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        )
    );
};
export default Modal;
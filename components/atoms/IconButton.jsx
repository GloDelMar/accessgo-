const iconMapping = {
  Motriz: <img src="/iconsBlue/discapacidad.png" alt="icono de persona usuaria de silla de ruedas" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />,
  Visual: <img src="/iconsBlue/icons8-acceso-para-ciegos-50.png" alt="icono de persona ciega con bastón" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />,
  Auditiva: <img src="/iconsBlue/sordera.png" alt="icono de persona sorda" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />,
  Intelectual: <img src="/iconsBlue/icons8-cabeza-con-cerebro-50.png" alt="icono de persona con discapacidad intelectual" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />,
  Neurodivergente: <img src="/iconsBlue/icons8-infinito-64.png" alt="icono del infinito que representa las personas neurodivergentes" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />,
};

const IconButton = ({ condition, onClick }) => {
  return (
    <button onClick={onClick} className="p-2 border gap-2 rounded-md hover:bg-blue-200">
      {iconMapping[condition]}
    </button>
  );
};

export default IconButton;

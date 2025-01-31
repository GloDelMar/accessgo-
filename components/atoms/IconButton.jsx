import Image from "next/image";

const iconMapping = {
  Motriz: (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
      <Image 
        src="/iconsBlue/discapacidad.png" 
        alt="icono de persona usuaria de silla de ruedas" 
        fill 
        sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
        className="object-contain" 
      />
    </div>
  ),
  Visual: (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
      <Image 
        src="/iconsBlue/icons8-acceso-para-ciegos-50.png" 
        alt="icono de persona ciega con bastón" 
        fill 
        sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
        className="object-contain" 
      />
    </div>
  ),
  Auditiva: (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
      <Image 
        src="/iconsBlue/sordera.png" 
        alt="icono de persona sorda" 
        fill 
        sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
        className="object-contain" 
      />
    </div>
  ),
  Intelectual: (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
      <Image 
        src="/iconsBlue/icons8-cabeza-con-cerebro-50.png" 
        alt="icono de persona con discapacidad intelectual" 
        fill 
        sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
        className="object-contain" 
      />
    </div>
  ),
  Neurodivergente: (
    <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
      <Image 
        src="/iconsBlue/icons8-infinito-64.png" 
        alt="icono del infinito que representa las personas neurodivergentes" 
        fill 
        sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
        className="object-contain" 
      />
    </div>
  ),
};



const IconButton = ({ condition, onClick }) => {
  return (
    <button onClick={onClick} className="p-2 border gap-2 rounded-md hover:bg-blue-200">
      {iconMapping[condition]}
    </button>
  );
};

export default IconButton;

import { useState } from 'react';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import EstablishmentSelect from '../Molecules/TipoEstablecimiento';
import Checkpoints from './Checkpoints';
import Link from 'next/link';

const AccessForm = () => {
  const [selectedEstablishment, setSelectedEstablishment] = useState('');
  const [visibleCondition, setVisibleCondition] = useState(null);

  const handleEstablishmentChange = (e) => {
    setSelectedEstablishment(e.target.value);
    setVisibleCondition(null);  // Reiniciar visibleCondition al cambiar el tipo de establecimiento
  };

  const handleConditionClick = (condition) => {
    setVisibleCondition(visibleCondition === condition ? null : condition);
  };

  return (
    <div className=" bg-white border border-[#E8DECF] shadow-sm rounded-[15px] px-8 pt-6 pb-8 mb-4 w-full md:w-[750px] lg:w-[1000px]">
      <div className='flex flex-col mb-4 text-center items-center'>
        <h1 className="text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-2">¡AccessGo!</h1>
        <p className="mt-4 text-[#2F4F4F] font-bold">Su colaboración es clave. Complete este formulario para informar sobre la accesibilidad de su establecimiento.</p>
      </div>
      
      <EstablishmentSelect onChange={handleEstablishmentChange} />

      <div className="flex justify-around space-x-2 mb-6">
        {['Motriz', 'Visual', 'Auditiva', 'Intelectual', 'Neurodivergente'].map((condition) => (
          <IconButton key={condition} condition={condition} onClick={() => handleConditionClick(condition)} />
        ))}
      </div>

      {visibleCondition && <Checkpoints condition={visibleCondition} establishment={selectedEstablishment} />}

      <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
        <Button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/"><a>Cancelar</a></Link>
        </Button>
        <Button className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
          <Link legacyBehavior href=""><a>Continuar</a></Link>
        </Button>
      </div>
    </div>
  );
};

export default AccessForm;

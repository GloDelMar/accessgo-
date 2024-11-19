import { useState } from 'react';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import EstablishmentSelect from '../Molecules/TipoEstablecimiento';
import Link from 'next/link';

import MotrizCheckpoints from '../Organism/Hotel/MotrizCheckpoints';
import VisualCheckpoints from '../Organism/Hotel/VisualCheckpoints';
import AuditivaCheckpoints from '../Organism/Hotel/AuditivaCheckpoints';
import IntelectualCheckpoints from '../Organism/Hotel/IntelectualCheckpoints';
import NeurodivergenteCheckpoints from '../Organism/Hotel/NeurodivergenteCheckpoints';

import RestMotrizCheckpoints from '../Organism/Restaurante/MotrizCheckpoints';
import RestVisualCheckpoints from '../Organism/Restaurante/VisualCheckpoints';
import RestAuditivaCheckpoints from '../Organism/Restaurante/AuditivaCheckpoints';
import RestIntelectualCheckpoints from '../Organism/Restaurante/IntelectualChecpoints';
import RestNeurodivergenteCheckpoints from '../Organism/Restaurante/NeurodivergenteCheckpoints';

const AccessForm = () => {
  const [selectedEstablishment, setSelectedEstablishment] = useState('');
  const [visibleCondition, setVisibleCondition] = useState(null);

  const handleEstablishmentChange = (e) => {
    setSelectedEstablishment(e.target.value);
   
  };

  const handleConditionClick = (condition) => {
    setVisibleCondition(visibleCondition === condition ? null : condition);
  };

  const renderCheckpoints = () => {
    if (selectedEstablishment === 'hotel') {
      return (
        <>
          {visibleCondition === 'Auditiva' && (
            <AuditivaCheckpoints
            />
          )}
          {visibleCondition === 'Motriz' && (
            <MotrizCheckpoints
            />
          )}
          {visibleCondition === 'Visual' && (
            <VisualCheckpoints
            />
          )}
          {visibleCondition === 'Intelectual' && (
            <IntelectualCheckpoints
            />
          )}
          {visibleCondition === 'Neurodivergente' && (
            <NeurodivergenteCheckpoints
            />
          )}
        </>
      );
    } else if (selectedEstablishment === 'restaurante') {
      return (
        <>
          {visibleCondition === 'Motriz' && (
            <RestMotrizCheckpoints
            />
          )}
          {visibleCondition === 'Visual' && (
            <RestVisualCheckpoints
            />
          )}
          {visibleCondition === 'Auditiva' && (
            <RestAuditivaCheckpoints
            />
          )}
          {visibleCondition === 'Intelectual' && (
            <RestIntelectualCheckpoints />
          )}
          {visibleCondition === 'Neurodivergente' && (
            <RestNeurodivergenteCheckpoints 
           />
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#E8DECF] shadow-sm rounded-[15px] px-8 pt-6 pb-8 mb-4 w-full md:w-[750px] lg:w-[1000px]">
      <div className='flex flex-col mb-4 text-center items-center'>
        <h1 className="text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-2">¡AccessGo!</h1>
        <p className="mt-4 text-[#2F4F4F] font-bold">Su colaboración es clave. Complete este formulario para informar sobre la accesibilidad de su establecimiento.</p>
      </div>

      <p className='my-2 text-[#2F4F4F]'>1. Selecciona el tipo de establecimiento que deseas registrar.</p>
      <EstablishmentSelect onChange={handleEstablishmentChange} />

      <p className='mt-2 mb-4 text-[#2F4F4F]'>
        2. Selecciona para qué tipo de discapacidad es accesible tu establecimiento haciendo clic en los botones de abajo. Luego, especifica qué adaptaciones has implementado en tu diseño accesible.
      </p>
      <div className="flex justify-around space-x-2 mb-6">
        {['Motriz', 'Visual', 'Auditiva', 'Intelectual', 'Neurodivergente'].map((type) => (
          <IconButton
            key={type}
            condition={type}
            onClick={() => handleConditionClick(type)}
          />
        ))}
      </div>

      {renderCheckpoints()}

      <div className="flex flex-row justify-center mt-4 space-x-4 md:space-x-[200px]">
        <Button  className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/"><a>Cancelar</a></Link>
        </Button>
        <Button   className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
          <Link legacyBehavior href="/planes"><a>Continuar</a></Link>
        </Button>
      </div>
    </div>
  );
};

export default AccessForm;

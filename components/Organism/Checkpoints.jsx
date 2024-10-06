import MotrizCheckpoints from './Hotel/MotrizCheckpoints';
import VisualCheckpoints from './Hotel/VisualCheckpoints';
import AuditivaCheckpoints from './Hotel/AuditivaCheckpoints';
import IntelectualCheckpoints from './Hotel/IntelectualCheckpoints';
import NeurodivergenteCheckpoints from './Hotel/NeurodivergenteCheckpoints';
import RestMotrizCheckpoints from './Restaurante/MotrizCheckpoints';
import RestVisualCheckpoints from './Restaurante/VisualCheckpoints';
import RestAuditivaCheckpoints from './Restaurante/AuditivaCheckpoints';
import RestIntelectualCheckpoints from './Restaurante/IntelectualChecpoints';
import RestNeurodivergenteCheckpoints from './Restaurante/NeurodivergenteCheckpoints';

const Checkpoints = ({ condition, establishment }) => {
  if (establishment === 'hotel') {
    switch (condition) {
      case 'Motriz':
        return <MotrizCheckpoints />;
      case 'Visual':
        return <VisualCheckpoints />;
      case 'Auditiva':
        return <AuditivaCheckpoints />;
      case 'Intelectual':
        return <IntelectualCheckpoints />;
      case 'Neurodivergente':
        return <NeurodivergenteCheckpoints />;
      default:
        return <p>Selecciona un tipo de discapacidad para ver los checkpoints.</p>;
    }
  } else if (establishment === 'restaurante') {
    switch (condition) {
      case 'Motriz':
        return <RestMotrizCheckpoints />;
      case 'Visual':
        return <RestVisualCheckpoints />;
      case 'Auditiva':
        return <RestAuditivaCheckpoints />;
      case 'Intelectual':
        return <RestIntelectualCheckpoints />;
      case 'Neurodivergente':
        return <RestNeurodivergenteCheckpoints />;
      default:
        return <p>Selecciona un tipo de discapacidad para ver los checkpoints.</p>;
    }
  }

  return <p>Selecciona un tipo de establecimiento.</p>;
};

export default Checkpoints;

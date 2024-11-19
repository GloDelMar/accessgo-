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

const Checkpoints = ({ condition, establishment, accessibilityData, setAccessibilityData }) => {
  if (establishment === 'hotel') {
    switch (condition) {
      case 'Motriz':
        return <MotrizCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Visual':
        return <VisualCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Auditiva':
        return <AuditivaCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Intelectual':
        return <IntelectualCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Neurodivergente':
        return <NeurodivergenteCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      default:
        return <p>Selecciona un tipo de discapacidad para ver los checkpoints.</p>;
    }
  } else if (establishment === 'restaurante') {
    switch (condition) {
      case 'Motriz':
        return <RestMotrizCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Visual':
        return <RestVisualCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Auditiva':
        return <RestAuditivaCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Intelectual':
        return <RestIntelectualCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      case 'Neurodivergente':
        return <RestNeurodivergenteCheckpoints accessibilityData={accessibilityData} setAccessibilityData={setAccessibilityData} />;
      default:
        return <p>Selecciona un tipo de discapacidad para ver los checkpoints.</p>;
    }
  }

  return <p>Selecciona un tipo de establecimiento.</p>;
};

export default Checkpoints;

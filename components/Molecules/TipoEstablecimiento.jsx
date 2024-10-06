const EstablishmentSelect = ({ onChange }) => {
    return (
      <select onChange={onChange} className="w-full mb-4 px-4 py-2 border rounded-md">
        <option value="">-- Selecciona el tipo de establecimiento --</option>
        <option value="restaurante">Restaurante</option>
        <option value="hotel">Hotel</option>
      </select>
    );
  };
  
  export default EstablishmentSelect;
  
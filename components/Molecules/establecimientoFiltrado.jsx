const EstablishmentSelect = ({ options, onChange }) => {
    return (
      <select onChange={onChange} className="w-full sm:w-auto px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
        <option value="">-- Selecciona el tipo de establecimiento --</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default EstablishmentSelect;
  
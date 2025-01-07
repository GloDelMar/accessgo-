const EstablishmentSelect = ({  onChange, selectedValue}) => {
    return (
      <div className="mb-4">
      <label htmlFor="establishmentType" className="block text-[#455A64] font-semibold">
        Tipo de establecimiento
      </label>
      <select
        id="establishmentType"
        value={selectedValue}
        onChange={onChange}
        className="w-full mt-2 border rounded-md py-2 px-3 text-[#455A64]"
      >
        <option value="">Selecciona un tipo de establecimiento</option>
        <option value="restaurante">Restaurante</option>
        <option value="hotel">Hotel</option>
      </select>
    </div>
    );
  };
  
  export default EstablishmentSelect;
  
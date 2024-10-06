import React from 'react';
import PropTypes from 'prop-types';

// Componente de entrada de texto
const Input = ({ id, type, name, value, onChange, placeholder }) => {
  return (
    <div className="input-container">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={name}
        className="input-field w-full px-3 py-2 border border-gray-400 bg-gray-100 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-blue-50"
      />
    </div>
  );
};

// Definición de tipos de props para el componente Input
Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

// Valores por defecto para las props del componente Input
Input.defaultProps = {
  type: 'text',
  placeholder: '',
};

// Componente de entrada de texto con etiqueta
const InputWithLabel = ({ label, ...props }) => {
  return (
    <div className="input-with-label mb-4">
      {label && (
        <label htmlFor={props.id} className="input-label block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}
      <Input {...props} />
    </div>
  );
};

// Definición de tipos de props para el componente InputWithLabel
InputWithLabel.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export { Input, InputWithLabel };
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';




// Componente de entrada de texto
const LoginEmailInput = ({ id, type, name, value, onChange, placeholder }) => {
  const { register } = useForm()
  return (
    <div className='input-container'>
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Invalida data'
          }
        })}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={name}
        className='input-field w-full px-3 py-2 border border-gray-400 bg-gray-100 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent focus:bg-blue-50'
      />
    </div>
  );
};

// Definición de tipos de props para el componente Input
LoginEmailInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

// Valores por defecto para las props del componente Input
LoginEmailInput.defaultProps = {
  type: 'text',
  placeholder: ''
};

// Componente de entrada de texto con etiqueta
const InputWithLabel = ({ label, ...props }) => {
  return (
    <div className='input-with-label mb-4'>
      {label && (
        <label
          htmlFor={props.id}
          className='input-label block text-sm font-medium text-gray-600 mb-1'
        >
          {label}
        </label>
      )}
      <LoginEmailInput {...props} />
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
  placeholder: PropTypes.string
};

export { LoginEmailInput, InputWithLabel };

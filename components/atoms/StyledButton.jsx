import React from 'react';
import PropTypes from 'prop-types';

// Componente de botón estilizado con variantes
const StyledButton = React.forwardRef(({ 
  children, 
  onClick, 
  className, 
  type, 
  variant, 
  name, 
  ...props 
}, ref) => {
  onClick = onClick || (() => {});
  className = className || '';
  type = type || 'button';
  variant = variant || 'default';
  let buttonClass;

  switch (variant) {
    case 'blancoCuadrado':
      buttonClass =
        'px-6 py-2 border border-[#2F4F4F] bg-[#F9F9F9] rounded-md text-sm font-medium text-[#2F4F4F] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5] hidden md:inline-block';
      break;
    case 'verdeCuadrado':
      buttonClass =
        'px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]';
      break;
    case 'verdeCurvo':
      buttonClass =
        'px-6 py-3 bg-[#2F4F4F] text-white rounded-full font-semibold';
      break;
    case 'beigeCuadrado':
      buttonClass =
        'px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#F5F0E5] hover:bg-[#E0D7C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]';
      break;
    default:
      buttonClass =
        'px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
      break;
  }

  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      className={`${buttonClass} ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

StyledButton.displayName = 'StyledButton';

// Definición de tipos de props para el componente StyledButton
StyledButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default StyledButton;
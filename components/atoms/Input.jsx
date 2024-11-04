import PropTypes from 'prop-types';

const Input = ({ name = '', label = '', placeholder = '', value = '', onChange = () => {} }) => (
  <div className="input-with-label">
    {label && <label htmlFor={name} className="block text-sm font-medium text-[#546E7A] mb-1">{label}</label>}
    <input
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-[#B0BEC5] bg-[#F9F9F9] rounded-md text-[#78909C] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent focus:bg-blue-50"
    />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export const InputWithLabel = ({ label, ...props }) => (
  <div className="input-with-label">
    {label && <label htmlFor={props.name} className="block text-sm font-medium text-[#546E7A] mb-1">{label}</label>}
    <Input {...props} />
  </div>
);

InputWithLabel.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
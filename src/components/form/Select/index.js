import './styles.scss';

const Select = ({ name, options, placeholder, register, handleFocus }) => {
  return (
    <div className="Select">
      <select id={name} name={name} {...register(name)} onFocus={handleFocus}>
        {placeholder && (
          <option disabled selected value="">
            {placeholder}
          </option>
        )}
        {options.map((opt, index) => (
          <option key={`select-option-${index}`} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;

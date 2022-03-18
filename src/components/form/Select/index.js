import './styles.scss';

const Select = ({ name, options, placeholder, register, handleFocus, error }) => {
  return (
    <div className="select">
      <select
        id={name}
        name={name}
        {...register(name)}
        onFocus={handleFocus}
        defaultValue={placeholder}
      >
        {placeholder && (
          <option disabled value={placeholder}>
            {placeholder}
          </option>
        )}
        {options.map((opt, index) => (
          <option key={`select-option-${index}`} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
      <small className="error-message">{error?.message}</small>
    </div>
  );
};

export default Select;

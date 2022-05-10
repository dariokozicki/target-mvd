import { PrimeIcons } from 'primereact/api';

const Cross = ({ onClick }) => {
  const handleKeyDown = ({ key }) => key === 'Enter' && onClick();

  return (
    <div
      className="clickable"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <i className={[PrimeIcons.TIMES, 'text-4xl'].join(' ')}></i>
    </div>
  );
};

export default Cross;

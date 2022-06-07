import { PrimeIcons } from 'primereact/api';

const Back = ({ onBack }) => {
  const handleKeyDown = ({ key }) => key === 'Enter' && onBack();

  return (
    <div
      className="clickable"
      onClick={onBack}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <i className={[PrimeIcons.ANGLE_LEFT, 'text-4xl'].join(' ')}></i>
    </div>
  );
};

export default Back;

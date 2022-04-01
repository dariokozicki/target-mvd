import { PrimeIcons } from 'primereact/api';
import './styles.scss';
const Back = ({ onBack }) => {
  return (
    <div
      className="clickable"
      onClick={onBack}
      onKeyDown={e => e.key === 'Enter' && onBack()}
      role="button"
      tabIndex={0}
    >
      <i className={[PrimeIcons.ANGLE_LEFT, 'button-back'].join(' ')}></i>
    </div>
  );
};

export default Back;

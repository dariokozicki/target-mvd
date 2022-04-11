import useTranslation from 'hooks/useTranslation';
import { ProgressSpinner } from 'primereact/progressspinner';
import './styles.scss';

const Loader = () => {
  const t = useTranslation();
  return (
    <div className="centered w-100 h-100">
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <div className="loading-text">{t('global.loading')}</div>
    </div>
  );
};

export default Loader;

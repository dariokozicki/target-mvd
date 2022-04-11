import useTranslation from 'hooks/useTranslation';
import './styles.scss';

const IntroTab = () => {
  const t = useTranslation();
  return (
    <div className="intro">
      <img src="/smilies.png" alt="smilies" className="smilies" />
      <div>
        <div className="welcome">{t('home.welcomeMsg')}</div>
        <div className="welcome target">{t('home.target')}</div>
      </div>
      <div className="subtitle">{t('home.subtitle')}</div>
    </div>
  );
};

export default IntroTab;

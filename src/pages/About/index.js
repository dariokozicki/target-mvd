import Button from 'components/common/Button';
import LandingScreen from 'components/landing/LandingScreen';
import useTranslation from 'hooks/useTranslation';
import { Link } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import './styles.scss';

const About = () => {
  const t = useTranslation();

  return (
    <LandingScreen>
      <div className="about">
        <img src="/smilies.png" alt="smilies" className="smilies" />
        <div className="about-title mt-5">{t('about.title')}</div>
        <p className="about-desc mt-5">{t('about.description')}</p>
        <Link to={routesPaths.signup} className="mt-auto mb-auto">
          <Button>{t('about.back').toUpperCase()}</Button>
        </Link>
      </div>
    </LandingScreen>
  );
};

export default About;

import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import SignupForm from 'components/signup/SignupForm';
import { Link } from 'react-router-dom';
import LandingScreen from 'components/landing/LandingScreen';
import './styles.scss';

const Signup = () => {
  const t = useTranslation();

  return (
    <>
      <LandingScreen>
        <div className="title">{t('signup.title')}</div>
        <SignupForm />
        <Link to={routesPaths.login} className="link-to clickable uppercase">
          {t('login.title')}
        </Link>
      </LandingScreen>
    </>
  );
};

export default Signup;

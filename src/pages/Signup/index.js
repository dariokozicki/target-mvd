import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import SignupForm from 'components/signup/SignupForm';
import { Link } from 'react-router-dom';
import '../../styles/form.scss';
import './styles.scss';
import LandingScreen from 'components/landing/LandingScreen';

const Signup = () => {
  const t = useTranslation();

  return (
    <>
      <LandingScreen>
        <div className="title">{t('signup.title')}</div>
        <SignupForm />
        <Link to={routesPaths.login} className="link-to clickable">
          {t('login.title')}
        </Link>
      </LandingScreen>
    </>
  );
};

export default Signup;

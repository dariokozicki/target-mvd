import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import LoginForm from 'components/login/LoginForm';
import LandingScreen from 'components/landing/LandingScreen';
import Hamburger from 'components/navigation/Hamburger';
import smilies from 'assets/smilies.png';

const Login = () => {
  const t = useTranslation();

  return (
    <>
      <Hamburger />
      <LandingScreen>
        <img src={smilies} alt="smilies" className="smilies" />
        <div className="title my-auto">{t('login.page-title')}</div>
        <div className="subtitle">{t('login.subtitle')}</div>
        <p className="description">{t('login.description')}</p>
        <LoginForm />
        <Link to={routesPaths.signup} className="link-to clickable uppercase mb-auto">
          {t('login.dontHaveAccountMsg')}
        </Link>
      </LandingScreen>
    </>
  );
};

export default Login;

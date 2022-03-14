import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import LoginForm from 'components/login/LoginForm';
import Smilies from 'components/common/Smilies';
import './styles.scss';

const Login = () => {
  const t = useTranslation();

  return (
    <>
      <Smilies />
      <div className="title">{t('login.page-title')}</div>
      <div className="subtitle">{t('login.subtitle')}</div>
      <p className="description">{t('login.description')}</p>
      <LoginForm />
      <Link to={routesPaths.signup} className="link-to clickable">
        {t('login.dontHaveAccountMsg')}
      </Link>
    </>
  );
};

export default Login;

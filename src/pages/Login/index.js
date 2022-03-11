import React from 'react';
import { Link } from 'react-router-dom';
import VideoContainer from 'components/login/VideoContainer';
import useTranslation from 'hooks/useTranslation';
import routesPaths from 'routes/routesPaths';
import LoginForm from 'components/login/LoginForm';
import './styles.css';

const Login = () => {
  const t = useTranslation();

  return (
    <div className="screen-container">
      <div id="login" className="login-container">
        <img src="/smilies.png" alt="smilies" className="smilies" />
        <div className="title">{t('login.page-title')}</div>
        <div className="subtitle">{t('login.subtitle')}</div>
        <p className="description">{t('login.description')}</p>
        <LoginForm />
        <Link to={routesPaths.signup} className="link-to clickable">
          {t('login.dontHaveAccountMsg')}
        </Link>
      </div>
      <VideoContainer />
    </div>
  );
};

export default Login;

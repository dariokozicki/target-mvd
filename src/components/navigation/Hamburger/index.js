import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';

const Hamburger = () => {
  const t = useTranslation();

  return (
    <div id="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
        <Link to={routesPaths.about}>
          <li>{t('menu.about')}</li>
        </Link>
        <Link to={routesPaths.contact}>
          <li>{t('menu.contact')}</li>
        </Link>
      </ul>
    </div>
  );
};

export default Hamburger;

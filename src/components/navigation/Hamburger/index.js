import React from 'react';
import { Link } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';

import './styles.css';

const Hamburger = () => {
  const t = useTranslation();

  return (
    <div className="hamburger-container">
      <input type="checkbox" />
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <ul className="menu">
        <Link to={routesPaths.about}>
          <li className="menu-item">{t('menu.about')}</li>
        </Link>
        <Link to={routesPaths.contact}>
          <li className="menu-item">{t('menu.contact')}</li>
        </Link>
      </ul>
    </div>
  );
};

export default Hamburger;

import { tabsEnum } from 'components/common/Tabs';
import useTranslation from 'hooks/useTranslation';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import { setHomeTab } from 'state/slices/tabSlice';
import './styles.scss';

const Hamburger = ({ tab = false }) => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const handleAboutTab = useCallback(() => {
    dispatch(setHomeTab(tabsEnum.about));
  }, [dispatch]);

  return (
    <div className="hamburger-container">
      <input type="checkbox" />
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <div className="hamburger-line" />
      <ul className="h-menu">
        {tab ? (
          <div
            className="hamburger-item clickable"
            onClick={handleAboutTab}
            onKeyDown={handleAboutTab}
            role="button"
            tabIndex={0}
          >
            {t('menu.about')}
          </div>
        ) : (
          <Link to={routesPaths.about} className="hamburger-item">
            <li className="menu-item">{t('menu.about')}</li>
          </Link>
        )}
        <Link to={routesPaths.contact} className="hamburger-item">
          <li className="menu-item">{t('menu.contact')}</li>
        </Link>
      </ul>
    </div>
  );
};

export default Hamburger;

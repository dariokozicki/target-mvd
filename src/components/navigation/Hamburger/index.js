import { tabsEnum } from 'components/common/Tabs';
import useTranslation from 'hooks/useTranslation';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import { setHomeTab, setShowContactDialog } from 'state/slices/tabSlice';
import './styles.scss';

const Hamburger = ({ tab = false }) => {
  const [checked, setChecked] = useState(false);
  const t = useTranslation();
  const dispatch = useDispatch();

  const handleAboutTab = useCallback(() => {
    dispatch(setHomeTab(tabsEnum.about));
  }, [dispatch]);

  const handleContact = useCallback(() => {
    setChecked(false);
    dispatch(setShowContactDialog(true));
  }, [dispatch]);

  return (
    <div className="hamburger-container">
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
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
        <div
          className="hamburger-item clickable"
          onClick={handleContact}
          onKeyDown={handleContact}
          role="button"
          tabIndex={-1}
        >
          <li className="menu-item">{t('menu.contact')}</li>
        </div>
      </ul>
    </div>
  );
};

export default Hamburger;

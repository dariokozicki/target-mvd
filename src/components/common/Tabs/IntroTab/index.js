import Hamburger from 'components/navigation/Hamburger';
import useTranslation from 'hooks/useTranslation';
import { Button } from 'primereact/button';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import './styles.scss';

const IntroTab = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setHomeTab(tabsEnum.profile));
  }, [dispatch]);

  return (
    <>
      <Hamburger tab />
      <div className="intro pt-6 w-100 h-100">
        <img src="/smilies.png" alt="smilies" className="smilies" />
        <div className="pt-3">
          <div className="welcome">{t('home.welcomeMsg')}</div>
          <div className="welcome target">{t('home.target')}</div>
        </div>
        <div className="subtitle pt-3 pb-6">{t('home.subtitle')}</div>
        <div className="pgraph">
          <div className="dot" />
          <div>{t('intro.howToCreate')}</div>
        </div>
        <div className="pgraph">
          <div className="dot" />
          <div>
            <div className="desc-target uppercase p-d-inline">{t('intro.target')}</div>
            {t('intro.chat')}
          </div>
        </div>
        <div className="intro-btn">
          <Button
            label={t('intro.ok')}
            className="p-button-secondary uppercase"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default IntroTab;

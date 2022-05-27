import smilies from 'assets/smilies.png';
import Back from 'components/common/Back';
import useTranslation from 'hooks/useTranslation';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import './styles.scss';

const AboutTab = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const onBack = useCallback(() => {
    dispatch(setHomeTab(tabsEnum.profile));
  }, [dispatch]);

  return (
    <>
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('about.title')}</div>
      </div>
      <div className="create-target">
        <p className="about-tab-desc">{t('about.description')}</p>
        <img src={smilies} alt="smilies" className="smilies-small mb-5 mt-auto" />
      </div>
    </>
  );
};

export default AboutTab;

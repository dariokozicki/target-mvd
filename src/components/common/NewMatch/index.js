import smilies from 'assets/smilies.png';
import defaultProfile from 'assets/default-profile.png';
import useTranslation from 'hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab, setHomeTab, setNewMatch } from 'state/slices/tabSlice';
import { setConversationSelected } from 'state/slices/targetSlice';
import Button from '../Button';
import { tabsEnum } from '../Tabs';
import './styles.scss';

const NewMatch = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { newMatch } = useSelector(selectTab);

  if (!newMatch) return null;

  const onStart = () => {
    dispatch(setConversationSelected(newMatch.match_conversation?.id));
    dispatch(setHomeTab(tabsEnum.chat));
    dispatch(setNewMatch(null));
  };

  const onSkip = () => dispatch(setNewMatch(null));

  return (
    <>
      <div className="new-match-dialog">
        <div className="new-match-dialog__content">
          <img src={smilies} alt="smilies" />
          <div className="new-match-dialog__title">{t('newMatch.title')}</div>
          <div className="new-match-dialog__subtitle">{t('newMatch.subtitle')}</div>
          <div className="new-match-dialog__user">
            <img
              src={newMatch.matched_user?.avatar?.small_thumb_url || defaultProfile}
              alt="user-matched"
            />
            <div className="new-match-dialog__subtitle">
              {newMatch.matched_user?.full_name || t('profile.anonymous')}
            </div>
          </div>
          <div className="button-container">
            <Button handleClick={onStart} className="new-match-dialog__btn" type="submit">
              {t('newMatch.startChatting')}
            </Button>
          </div>
          <div
            className="new-match-dialog__subtitle link-to clickable"
            onClick={onSkip}
            tabIndex={-1}
            onKeyDown={onSkip}
            role="button"
          >
            {t('newMatch.skip')}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMatch;

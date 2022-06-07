import defaultProfile from 'assets/default-profile.png';
import Chat from 'components/common/Chat';
import EmptyTargets from 'components/common/EmptyTargets';
import Hamburger from 'components/navigation/Hamburger';
import useTranslation from 'hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, useLogoutMutation } from 'services/auth/auth';
import { useGetConversationsQuery } from 'services/model/conversations';
import { useGetTargetsQuery } from 'services/model/targets';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import Loader from 'components/common/Loader';
import './styles.scss';
import MapInputSwitch from 'components/common/MapInputSwitch';

const TargetProfileTab = () => {
  const t = useTranslation();
  const { user } = useSelector(selectAuth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const { data: targetsData, isLoading: areTargetsLoading } = useGetTargetsQuery();
  const targets = targetsData?.targets;
  const { data: conversations, isLoading: areConversationsLoading } = useGetConversationsQuery(
    user.id
  );
  const matches = conversations?.matches;
  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));

  const onEdit = () => dispatch(setHomeTab(tabsEnum.editProfile));

  const onKeyDown = callback => event => {
    if (event.charCode === 13) callback();
  };

  const EmptyConversations = () => (
    <div className="centered w-full h-full">
      <div className="w-8 text-center">{t('profile.noMatches')}</div>
    </div>
  );

  const getContent = () => {
    if (areTargetsLoading || areConversationsLoading) return <Loader />;
    if (!targets?.length) return <EmptyTargets />;
    if (!matches?.length) return <EmptyConversations />;
    return <Chat />;
  };

  return (
    <>
      <Hamburger tab />
      <MapInputSwitch black />
      <div className="header">
        <div className="create-title">{t('profile.title')}</div>
      </div>
      <div className="profile-picture">
        <img src={user?.avatar.url || defaultProfile} alt="profile" />
      </div>
      <div className="profile-name">{user?.username || user?.email}</div>
      <div className="profile-options">
        <div
          className="profile-options-edit inline clickable"
          onClick={onEdit}
          onKeyDown={onKeyDown(onEdit)}
          role="button"
          tabIndex={0}
        >
          {t('profile.edit')}
        </div>
        <div
          className="inline clickable"
          onClick={handleLogout}
          onKeyDown={onKeyDown(handleLogout)}
          role="button"
          tabIndex={-1}
        >
          {' / '}
          {t('profile.logout')}
        </div>
      </div>
      <div className="separator" />
      {getContent()}
    </>
  );
};

export default TargetProfileTab;

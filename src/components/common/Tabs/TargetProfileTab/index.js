import useTranslation from 'hooks/useTranslation';
import { useSelector } from 'react-redux';
import { selectAuth, useLogoutMutation } from 'services/auth/auth';
import './styles.scss';

const TargetProfileTab = () => {
  const t = useTranslation();
  const { user } = useSelector(selectAuth);
  const [logout] = useLogoutMutation();

  const handleLogout = () => logout().then(() => localStorage.removeItem('user'));

  const onEdit = () => {
    //TODO
  };

  const onKeyDown = callback => event => {
    if (event.charCode === 13) callback();
  };

  return (
    <>
      <div className="header">
        <div className="create-title">{t('profile.title')}</div>
      </div>
      <div className="profile-picture">
        <img src={user?.avatar.url || './default-profile.png'} alt="profile" />
      </div>
      <div className="profile-name">{user?.email}</div>
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
    </>
  );
};

export default TargetProfileTab;

import defaultProfile from 'assets/default-profile.png';
import Back from 'components/common/Back';
import Button from 'components/common/Button';
import EditProfileForm from 'components/common/EditProfileForm';
import useTranslation from 'hooks/useTranslation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from 'react-toastify-redux';
import { selectAuth, useChangePasswordMutation, useUpdateUserMutation } from 'services/auth/auth';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import './styles.scss';

const EditProfileTab = () => {
  const dispatch = useDispatch();
  const t = useTranslation();
  const { user } = useSelector(selectAuth);
  const [changePassword] = useChangePasswordMutation();
  const [updateUser] = useUpdateUserMutation();

  const onBack = () => {
    dispatch(setHomeTab(tabsEnum.profile));
  };

  const onKeyDown = callback => event => {
    if (event.charCode === 13) callback();
  };

  const onDeleteAccount = () => {
    dispatch(error(t('global.notImplemented')));
  };

  const defaultValues = {
    current_password: '',
    password: '',
    password_confirmation: '',
    email: user.email,
  };

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSaveChanges = async data => {
    try {
      await Promise.all([
        changePassword({
          current_password: data.current_password,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }),
        updateUser({ id: user.id, user: { ...user, email: data.email } }),
      ]);
      dispatch(success(t('profile.editSuccess')));
      dispatch(setHomeTab(tabsEnum.profile));
    } catch {
      dispatch(error(t('profile.editError')));
    }
  };

  return (
    <>
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('editProfile.title')}</div>
      </div>
      <div className="profile-picture">
        <img src={user?.avatar.url || defaultProfile} alt="profile" />
      </div>
      <div className="profile-name">{user?.email}</div>
      <div className="create-target">
        <form className="p-fluid grid formgrid" onSubmit={handleSubmit(onSaveChanges)} noValidate>
          <EditProfileForm errors={errors} getValues={getValues} control={control} />
          <div className="field col-12 centered">
            <Button className="w-6 edit-profile-label" type="submit">
              {t('editProfile.save').toLocaleUpperCase()}
            </Button>
          </div>
          <div className="field col-12 centered">
            <div
              className="inline clickable edit-profile-label"
              onClick={onDeleteAccount}
              onKeyDown={onKeyDown(onDeleteAccount)}
              role="button"
              tabIndex={-1}
            >
              {t('editProfile.delete')}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileTab;

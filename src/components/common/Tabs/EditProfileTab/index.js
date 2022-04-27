import Back from 'components/common/Back';
import Button from 'components/common/Button';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { error, success } from 'react-toastify-redux';
import { selectAuth, useChangePasswordMutation, useUpdateUserMutation } from 'services/auth/auth';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '..';
import { classNames } from 'primereact/utils';
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
    currentPassword: '',
    password: '',
    password_confirmation: '',
    email: user.email,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSaveChanges = data => {
    console.log('aca');
    return Promise.all([
      changePassword({
        current_password: data.current_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }),
      updateUser({ id: user.id, user: { ...user, email: data.email } }),
    ])
      .then(() => dispatch(success(t('profile.editSuccess'))))
      .catch(err => {
        console.log('he fallado');
        console.log(err);
        dispatch(error(t('profile.editError')));
      });
  };

  const getFormErrorMessage = name => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  return (
    <>
      <div className="header blue">
        <Back onBack={onBack} />
        <div className="create-title">{t('editProfile.title')}</div>
      </div>
      <div className="profile-picture">
        <img src={user?.avatar.url || './default-profile.png'} alt="profile" />
      </div>
      <div className="profile-name">{user?.email}</div>
      <div className="create-target">
        <form className="p-fluid grid formgrid" onSubmit={handleSubmit(onSaveChanges)} noValidate>
          <div className="field col-12 centered">
            <label htmlFor="email" className="uppercase edit-profile-label">
              {t('editProfile.email')}
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address. E.g. example@email.com',
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames('w-10 p-inputtext-sm', { 'p-invalid': fieldState.invalid })}
                />
              )}
            />
            {getFormErrorMessage('email')}
          </div>
          <div className="field col-12 centered">
            <label htmlFor="password" className="uppercase edit-profile-label">
              {t('editProfile.password')}
            </label>
            <Controller
              name="current_password"
              control={control}
              rules={{ required: 'Password is required.' }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  feedback={false}
                  className={classNames('w-10 p-inputtext-sm', { 'p-invalid': fieldState.invalid })}
                  placeholder={t('editProfile.min').toLocaleUpperCase()}
                />
              )}
            />
          </div>
          <div className="field col-12 centered">
            <label htmlFor="newPassword" className="uppercase edit-profile-label">
              {t('editProfile.newPassword')}
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required.' }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  feedback={false}
                  className={classNames('w-10 p-inputtext-sm', { 'p-invalid': fieldState.invalid })}
                  placeholder={t('editProfile.min').toLocaleUpperCase()}
                />
              )}
            />
          </div>
          <div className="field col-12 centered">
            <label htmlFor="confirmNewPassword" className="uppercase edit-profile-label">
              {t('editProfile.confirmNewPassword')}
            </label>
            <Controller
              name="password_confirmation"
              control={control}
              rules={{ required: 'Password is required.' }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  feedback={false}
                  className={classNames('w-10 p-inputtext-sm', { 'p-invalid': fieldState.invalid })}
                />
              )}
            />
          </div>
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

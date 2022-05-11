import classNames from 'classnames';
import useTranslation from 'hooks/useTranslation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Controller } from 'react-hook-form';

const EditProfileForm = ({ control, errors, getValues }) => {
  const t = useTranslation();

  const form = [
    {
      label: 'email',
      Component: InputText,
      placeholder: t('editProfile.min').toLocaleUpperCase(),
      rules: {
        required: 'Email is required.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address. E.g. example@email.com',
        },
      },
    },
    {
      label: 'current_password',
      Component: Password,
      rules: { required: 'Current Password is required.' },
      placeholder: t('editProfile.min').toLocaleUpperCase(),
    },
    {
      label: 'password',
      Component: Password,
      rules: { required: 'Password is required.' },
      placeholder: t('editProfile.min').toLocaleUpperCase(),
    },
    {
      label: 'password_confirmation',
      Component: Password,
      placeholder: t('editProfile.min').toLocaleUpperCase(),
      rules: {
        required: 'Password Confirmation is required.',
        validate: value => {
          const { password } = getValues();
          return password === value || 'Passwords should match!';
        },
      },
    },
  ];

  const getFormErrorMessage = name => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  return (
    <>
      {form.map(({ label, Component, rules, placeholder }) => (
        <div className="field col-12 centered">
          <label htmlFor={label} className="uppercase edit-profile-label">
            {t('editProfile.' + label)}
          </label>
          <Controller
            name={label}
            control={control}
            rules={rules || undefined}
            render={({ field, fieldState }) => (
              <Component
                id={field.name}
                {...field}
                toggleMask
                feedback={false}
                placeholder={placeholder}
                className={classNames('w-10 p-inputtext-sm', { 'p-invalid': fieldState.invalid })}
              />
            )}
          />
          {getFormErrorMessage(label)}
        </div>
      ))}
    </>
  );
};

export default EditProfileForm;

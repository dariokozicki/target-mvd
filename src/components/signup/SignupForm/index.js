import { Redirect } from 'react-router-dom';
import Input from 'components/form/Input';
import Button from 'components/common/Button';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';
import Select from 'components/form/Select';
import './styles.scss';
import { useSignup } from 'hooks/useSignup';

const SignupForm = () => {
  const t = useTranslation();
  const genders = ['male', 'female', 'other'];
  const { onSubmit, isLoading, handleFocus, register, authenticated, error, errors } = useSignup({
    genders,
  });

  if (authenticated) {
    return <Redirect to={routesPaths.index} />;
  }

  return (
    <div className="signup">
      <form onSubmit={onSubmit} noValidate>
        <div className="form-label uppercase">
          <label htmlFor="name">{t('signup.labels.name')}</label>
        </div>
        <Input
          register={register}
          type="name"
          name="name"
          error={errors.name}
          handleFocus={handleFocus}
        />
        <div className="form-label uppercase">
          <label htmlFor="email">{t('signup.labels.email')}</label>
        </div>
        <Input
          register={register}
          type="email"
          name="email"
          error={errors.email}
          handleFocus={handleFocus}
        />
        <div className="form-label uppercase">
          <label htmlFor="password">{t('signup.labels.password')}</label>
        </div>
        <Input
          register={register}
          type="password"
          name="password"
          error={errors.password}
          handleFocus={handleFocus}
          placeholder={t('signup.labels.passwordPlaceholder')}
        />
        <div className="form-label uppercase">
          <label htmlFor="password">{t('signup.labels.passwordConfirmation')}</label>
        </div>
        <Input
          register={register}
          type="password"
          name="passwordConfirmation"
          error={errors.passwordConfirmation}
          handleFocus={handleFocus}
        />
        <div className="form-label uppercase">
          <label htmlFor="gender">{t('signup.labels.gender')}</label>
        </div>
        <Select
          name="gender"
          options={genders}
          placeholder={t('signup.labels.genderSelect')}
          error={errors.gender}
          handleFocus={handleFocus}
          register={register}
        />

        {error && error.data && (
          <p className="error-message">{error.data.errors?.full_messages[0]}</p>
        )}

        <div className="button-container uppercase">
          <Button type="submit" disabled={isLoading}>
            {t('signup.title').toUpperCase()}
          </Button>
        </div>
        <div className="form-label">
          <div className="separator" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

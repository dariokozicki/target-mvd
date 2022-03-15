import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, useHistory } from 'react-router-dom';
import { z } from 'zod';
import Input from 'components/form/Input';
import Button from 'components/common/Button';
import routesPaths from 'routes/routesPaths';
import useTranslation from 'hooks/useTranslation';
import useAuth from 'hooks/useAuth';
import { api } from 'services/api';
import { useSignupMutation } from 'services/auth/auth';
import { setLoggedInUser } from 'utils/auth';
import { PASSWORD_REGEX } from 'constants/constants';
import Select from 'components/form/Select';
import './styles.scss';

const SignupForm = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { user, authenticated } = useAuth();
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();

  const schema = z
    .object({
      name: z.string(),
      gender: z.string(),
      email: z.string().email({ message: t('signup.errors.emailMsg') }),
      password: z.string().regex(PASSWORD_REGEX, { message: t('signup.errors.passwordMsg') }),
      passwordConfirmation: z
        .string()
        .regex(PASSWORD_REGEX, { message: t('signup.errors.passwordMsg') }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t('signup.errors.passwordConfirmationMsg'),
      path: ['passwordConfirmation'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = data => signup(data);

  const resetErrors = useCallback(() => dispatch(api.util.resetApiState()), [dispatch]);

  const handleFocus = () => error && resetErrors();

  useEffect(() => {
    if (isSuccess) {
      setLoggedInUser(user);
      push(routesPaths.index);
    }
  }, [isSuccess, user, push]);

  useEffect(() => resetErrors, [resetErrors]);

  if (authenticated) {
    return <Redirect to={routesPaths.index} />;
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-label">
          <label htmlFor="name">{t('signup.labels.name')}</label>
        </div>
        <Input
          register={register}
          type="name"
          name="name"
          error={errors.name}
          handleFocus={handleFocus}
        />
        <div className="form-label">
          <label htmlFor="email">{t('signup.labels.email')}</label>
        </div>
        <Input
          register={register}
          type="email"
          name="email"
          error={errors.email}
          handleFocus={handleFocus}
        />
        <div className="form-label">
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
        <div className="form-label">
          <label htmlFor="password">{t('signup.labels.passwordConfirmation')}</label>
        </div>
        <Input
          register={register}
          type="password"
          name="passwordConfirmation"
          error={errors.passwordConfirmation}
          handleFocus={handleFocus}
        />
        <div className="form-label">
          <label htmlFor="gender">{t('signup.labels.gender')}</label>
        </div>
        <Select
          name="gender"
          options={['MALE', 'FEMALE', 'OTHER']}
          placeholder={t('signup.labels.genderSelect')}
          handleFocus={handleFocus}
          register={register}
        />

        {error && error.data && (
          <p className="error-message">{error.data.errors?.full_messages[0]}</p>
        )}

        <div className="button-container">
          <Button type="submit" disabled={isLoading}>
            {t('signup.title')}
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
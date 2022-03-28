import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'components/common/Button';
import Input from 'components/form/Input';
import useTranslation from 'hooks/useTranslation';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import routesPaths from 'routes/routesPaths';
import { api } from 'services/api';
import { selectAuth, useLoginMutation } from 'services/auth/auth';
import { setLoggedInUser } from 'utils/auth';
import { z } from 'zod';
import './styles.scss';

const LoginForm = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const { authenticated, user } = useSelector(selectAuth);

  const schema = z.object({
    email: z.string().email({ message: t('login.errors.emailMsg') }),
    password: z.string().min(1, { message: t('login.errors.passwordMsg') }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = data => login(data);

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
    <div className="form-login">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-label uppercase">
          <label htmlFor="email">{t('login.labels.email')}</label>
        </div>
        <Input
          register={register}
          type="email"
          name="email"
          error={errors.email}
          handleFocus={handleFocus}
        />
        <div className="form-label uppercase">
          <label htmlFor="password">{t('login.labels.password')}</label>
        </div>
        <Input
          register={register}
          type="password"
          name="password"
          error={errors.password}
          handleFocus={handleFocus}
        />

        {error && error.data && <p className="error-message">{error.data.errors}</p>}

        <div className="button-container">
          <Button type="submit" disabled={isLoading}>
            {t('login.title').toUpperCase()}
          </Button>
        </div>
        <div className="clickable form-label">{t('login.forgot')}</div>
        <div className="clickable form-label uppercase">
          <h4 className="facebook">{t('login.facebook')}</h4>
        </div>
        <div className="form-label uppercase">
          <div className="separator" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

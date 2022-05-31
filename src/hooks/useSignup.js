import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from 'services/api';
import { setLoggedInUser } from 'utils/auth';
import routesPaths from 'routes/routesPaths';
import { z } from 'zod';
import { PASSWORD_REGEX } from 'constants/constants';
import useTranslation from './useTranslation';
import { selectAuth, useSignupMutation } from 'services/auth/auth';
import { useForm } from 'react-hook-form';

export const useSignup = ({ genders }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { user, authenticated } = useSelector(selectAuth);
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();

  const schema = z
    .object({
      username: z.string(),
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
    })
    .refine(data => genders.includes(data.gender), {
      message: t('signup.errors.genderMsg'),
      path: ['gender'],
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

  return {
    onSubmit: handleSubmit(onSubmit),
    handleFocus,
    register,
    isLoading,
    authenticated,
    errors,
    error,
  };
};

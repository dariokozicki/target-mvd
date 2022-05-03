import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'components/common/Button';
import Input from 'components/form/Input';
import LandingScreen from 'components/landing/LandingScreen';
import Hamburger from 'components/navigation/Hamburger';
import useTranslation from 'hooks/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { error } from 'react-toastify-redux';
import routesPaths from 'routes/routesPaths';
import { useSendResetPasswordMutation } from 'services/auth/auth';
import { z } from 'zod';
import './styles.scss';

const ResetPassword = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const schema = z.object({
    email: z.string().email({ message: t('login.errors.emailMsg') }),
    redirect_url: z.string().default('http://www.example.com'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(error(t('global.notImplemented')));
  };

  return (
    <>
      <Hamburger />
      <LandingScreen>
        <img src="/smilies.png" alt="smilies" className="smilies" />
        <div className="title">{t('resetPassword.title')}</div>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-label uppercase">
            <label htmlFor="email">{t('login.labels.email')}</label>
          </div>
          <Input register={register} type="email" name="email" error={errors.email} />
          {error && error.data && <p className="error-message">{error.data.errors}</p>}

          <div className="button-container">
            <Button type="submit" disabled={false}>
              {t('resetPassword.send').toUpperCase()}
            </Button>
          </div>
          <div className="form-label uppercase">
            <div className="separator" />
          </div>
          <Link to={routesPaths.login} className="link-to clickable">
            {t('signup.alreadyHaveAccount')}
          </Link>
        </form>
      </LandingScreen>
    </>
  );
};

export default ResetPassword;

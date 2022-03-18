import useAuth from 'hooks/useAuth';
import useTranslation from 'hooks/useTranslation';
import { useFacebookMutation } from 'services/auth/auth';
import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { setLoggedInUser } from 'utils/auth';
import routesPaths from 'routes/routesPaths';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './styles.scss';

const FacebookLoginButton = () => {
  const t = useTranslation();
  const { push } = useHistory();
  const [login, { isLoading, isSuccess }] = useFacebookMutation();
  const { authenticated, user } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      setLoggedInUser(user);
      push(routesPaths.index);
    }
  }, [isSuccess, user, push]);

  const onSubmit = data => {
    const loginData = { accessToken: data.accessToken };
    login(loginData);
  };

  if (authenticated) {
    return <Redirect to={routesPaths.index} />;
  }

  return (
    <>
      {!isLoading ? (
        <FacebookLogin
          appId="166925907359293"
          fields="name,email,picture"
          callback={onSubmit}
          render={renderProps => (
            <div
              className="clickable form-label uppercase"
              onClick={renderProps.onClick}
              onKeyPress={renderProps.onClick}
              role="button"
              tabIndex={-1}
            >
              <h4 className="facebook">{t('login.facebook')}</h4>
            </div>
          )}
        />
      ) : (
        <div className="form-label uppercase">
          <h4 className="facebook">{t('login.connecting')}</h4>
        </div>
      )}
    </>
  );
};

export default FacebookLoginButton;

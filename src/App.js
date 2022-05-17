import RouteFromPath from 'components/routes/RouteFromPath';
import useTranslation from 'hooks/useTranslation';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from 'routes';
import { selectAuth } from 'services/auth/auth';
import { setUser } from 'state/slices/authSlice';
import { getLoggedInUser } from 'utils/auth';
import { selectTargets } from 'services/model/targets';
import { setPosition } from 'state/slices/targetSlice';
import { ToastContainer } from 'react-toastify-redux';
import OneSignal from 'react-onesignal';

import 'App.scss';
import { ActionCableProvider } from 'react-actioncable-provider';

function App() {
  const t = useTranslation();
  const { authenticated, user } = useSelector(selectAuth);
  const { position } = useSelector(selectTargets);
  const dispatch = useDispatch();

  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL_APP_ID || '',
    });
  }, []);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
    }

    if (!position) {
      navigator.geolocation.getCurrentPosition(({ coords, timestamp }) =>
        dispatch(setPosition({ lat: coords.latitude, lng: coords.longitude, timestamp }))
      );
    }
  }, [dispatch, position]);

  const actionCableUrl = useMemo(() => {
    const url = new URL(process.env.REACT_APP_ACTIONCABLE_URL);
    if (authenticated) {
      url.search = new URLSearchParams({
        'access-token': user.token,
        uid: user.uid,
        client: user.client,
      });
    }
    return url;
  }, [user, authenticated]);

  return (
    <>
      <ActionCableProvider url={actionCableUrl.toString()}>
        <Helmet>
          <title>{t('global.pageTitle')}</title>
        </Helmet>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            {routes.map(route => (
              <RouteFromPath key={`route-${route.path}`} {...route} authenticated={authenticated} />
            ))}
          </Switch>
        </BrowserRouter>
      </ActionCableProvider>
    </>
  );
}

export default App;

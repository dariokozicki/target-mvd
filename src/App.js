import 'App.scss';
import OptionalHOC from 'components/common/OptionalHOC';
import RouteFromPath from 'components/routes/RouteFromPath';
import useTranslation from 'hooks/useTranslation';
import { useEffect, useMemo } from 'react';
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify-redux';
import routes from 'routes';
import { selectAuth } from 'services/auth/auth';
import { selectTargets } from 'services/model/targets';
import { setUser } from 'state/slices/authSlice';
import { setPosition } from 'state/slices/targetSlice';
import { getLoggedInUser } from 'utils/auth';

function App() {
  const t = useTranslation();
  const { authenticated, user } = useSelector(selectAuth);
  const { position } = useSelector(selectTargets);
  const dispatch = useDispatch();

  useEffect(() => {
    // OneSignal.init({
    //   appId: process.env.REACT_APP_ONESIGNAL_APP_ID || '',
    // });
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
    if (authenticated) {
      let url = process.env.REACT_APP_ACTIONCABLE_URL;
      url = `${url}?access-token=${user.token}&client=${user.client}&uid=${user.uid}`;
      return url;
    }
    return undefined;
  }, [user, authenticated]);

  console.log(actionCableUrl);

  return (
    <>
      <Helmet>
        <title>{t('global.pageTitle')}</title>
      </Helmet>
      <ToastContainer />
      <OptionalHOC Component={ActionCableProvider} url={actionCableUrl}>
        <BrowserRouter>
          <Switch>
            {routes.map(route => (
              <RouteFromPath key={`route-${route.path}`} {...route} authenticated={authenticated} />
            ))}
          </Switch>
        </BrowserRouter>
      </OptionalHOC>
    </>
  );
}

export default App;

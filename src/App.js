import RouteFromPath from 'components/routes/RouteFromPath';
import useTranslation from 'hooks/useTranslation';
import { useEffect } from 'react';
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

import 'App.scss';

function App() {
  const t = useTranslation();
  const { authenticated } = useSelector(selectAuth);
  const { position } = useSelector(selectTargets);
  const dispatch = useDispatch();

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

  return (
    <>
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
    </>
  );
}

export default App;

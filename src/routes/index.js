import routesPaths from './routesPaths';
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import About from 'pages/About';
import ResetPassword from 'pages/ResetPassword';

const routes = [
  {
    path: routesPaths.index,
    component: <Home />,
    exact: true,
    private: true,
  },
  {
    path: routesPaths.signup,
    component: <Signup />,
  },
  {
    path: routesPaths.login,
    component: <Login />,
  },
  {
    path: routesPaths.about,
    component: <About />,
  },
  {
    path: routesPaths.forgot,
    component: <ResetPassword />,
  },
];

export default routes;

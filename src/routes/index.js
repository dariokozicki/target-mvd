import routesPaths from './routesPaths';
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import About from 'pages/About';

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
];

export default routes;

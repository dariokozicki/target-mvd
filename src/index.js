import flatten from 'flat';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import store from 'state/store';
import App from './App';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './constants/constants';
import './index.scss';
import locales from './locales';

// Internationalization setup
const usersLocale = navigator.language.split('-')[0];
const supportedUserLocale = SUPPORTED_LANGUAGES.includes(usersLocale);
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE;
const messages = locales[locale];

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={flatten(messages)} locale={locale} defaultLocale={DEFAULT_LANGUAGE}>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

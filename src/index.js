import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { withRouter } from 'react-router'
import store, { history } from './store';
import App from './scenes/app';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { LicenseManager } from "ag-grid-enterprise/main";
import './global.css';

LicenseManager.setLicenseKey("Evaluation_License_Valid_Until__26_May_2018__MTUyNzI4OTIwMDAwMA==345b4a029e68391149aa2162aaa0807c");
const target = document.querySelector('#root');
const NonBlockApp = withRouter(App);
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <NonBlockApp />
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();

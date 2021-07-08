import React from 'react';
import ReactDOM from 'react-dom';
import {appData} from './appData/appData';
import {Provider} from 'react-redux';
import App from './components/App';

ReactDOM.render(
  <Provider store={appData}>
    <App />
  </Provider>,
  document.getElementById('root')
);

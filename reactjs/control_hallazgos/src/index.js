import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';

// Redux
import {store} from './redux/store'
import { Provider } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFacF5JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJjXX1ddXVXQ2ddWEQ=');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

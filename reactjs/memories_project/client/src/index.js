import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { legacy_createStore,applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from "./redux/reducers"

import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App'
import "./index.css"

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='402659570950-2fs7h6plgadecsa23g5ercjiegg735vh.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </Provider>, 
  document.getElementById('root')
)
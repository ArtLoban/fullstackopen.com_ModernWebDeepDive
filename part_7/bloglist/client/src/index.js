import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';

import './index.css'
import App from './App'

const reducers = combineReducers({
  notification: notificationReducer
});

const store = createStore(reducers);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App />
  </Provider>
)
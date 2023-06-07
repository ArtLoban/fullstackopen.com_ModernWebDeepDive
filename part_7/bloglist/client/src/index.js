import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.css'
import ErrorBoundary from './ErrorBoundary';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>
)

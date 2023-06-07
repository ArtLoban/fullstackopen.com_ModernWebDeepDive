import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.css'
import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App />
    </ErrorBoundary>
  </Provider>
)

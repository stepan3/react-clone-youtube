import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { YoutubeReducer } from './store/Reducer/youtube- reducer'
import App from './App'
import reportWebVitals from './reportWebVitals'

import 'semantic-ui-css/semantic.min.css'

const store = createStore(YoutubeReducer, compose(applyMiddleware(Thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()

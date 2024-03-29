import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ToastContainer} from 'react-toastify'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import Reduxstore from './components/Store/Reduxstore.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={Reduxstore}>
    <App />
    <ToastContainer/>
    </Provider>
    </BrowserRouter>

  </React.StrictMode>,
)

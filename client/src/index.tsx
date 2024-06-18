import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css'
import {Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
    <Toaster
  toastOptions={{
    success: {
      style: {
        background: 'green',
        padding: '16px',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}
/>
    <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

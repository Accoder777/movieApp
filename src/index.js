import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './pages/context/UserContext';
import AuthProvider from './providers/AuthProviders';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
      <AuthProvider>
        <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer/>
    </UserContext>
  </React.StrictMode>
);

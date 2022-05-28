import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Page from './containers';
import './Atomic/_settings/base.css'
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// <BrowserRouter basename='https://hungpham591.github.io/minimart/' >
//   <Routes>
//     <Route path='/*' element={<Client />} />
//   </Routes>
// </BrowserRouter>
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename='https://hungpham591.github.io/minimart/'>
          <Page />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRoutes from './routes/AppRoutes';
import "../src/styles/styles.css"
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </App>
    </Provider>
  </StrictMode>
);

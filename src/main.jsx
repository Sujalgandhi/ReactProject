import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App'; // Make sure to import App component

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import Loader from './components/Shared/Loader';
import SnackBar from './components/Snackbar';
import './fonts/AvenirFontsWebfontsKit.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { syze } from './theme/px';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={syze}>
        <Provider store={store}>
          <Loader />
          <GlobalStyle />
          <App />
          <SnackBar />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

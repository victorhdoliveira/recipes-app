import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

app.use(express.static(__dirname));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

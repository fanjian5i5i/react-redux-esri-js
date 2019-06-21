import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './components/Map';
// import Map from './components/MapLoader';
import AppBar from './components/AppBar';
import reduxStore from './redux';
import { Provider } from 'react-redux';
// import logo_sm from "./images/BPDAlogo_sm.jpg";


ReactDOM.render(
  <Provider store={reduxStore}>
    <div>
      <AppBar/>
      <Map/>
    </div>
  </Provider>,
  document.getElementById('app')
);

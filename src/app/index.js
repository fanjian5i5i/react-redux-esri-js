import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './components/Map';
// import Map from './components/MapLoader';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import SketchWidgetPaperPie from './components/SketchWidgetPaperPie';
import FloatingButton from './components/FloatingButton';

import reduxStore from './redux';
import { Provider } from 'react-redux';
// import logo_sm from "./images/BPDAlogo_sm.jpg";
//<FloatingButton/>

ReactDOM.render(
  <Provider store={reduxStore}>
    <div>
      <AppBar/>
      <Drawer/>

      <Map/>
      <SketchWidgetPaperPie/>
    </div>
  </Provider>,
  document.getElementById('app')
);

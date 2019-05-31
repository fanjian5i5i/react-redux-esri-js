import * as React from 'react';
import { Map,loadModules } from '@esri/react-arcgis';

import { connect } from 'react-redux';
import { updateView,updateMap } from '../redux/actions';



const styles = {
  legend:{
    display:"none"
  }
}
class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view:null,
        };
        this.handleMapLoad = this.handleMapLoad.bind(this)
    }
    handleMapLoad(map, view) {
      let that =  this;
        this.setState({ map,view });
        this.props.dispatch(updateView(view))
        this.props.dispatch(updateMap(map))
        loadModules(["esri/widgets/Home"]).then(([ Home]) => {

          var homeBtn = new Home({
              view: view
            });
            view.ui.add(homeBtn, "top-left");
        });
    }

    handleOnClick(e){
      var that = this;
      console.log(e.mapPoint);
    }
    componentDidMount() {

    }
    render() {
        return (
          <Map
              style={{ width: '100vw', height: window.innerHeight - 64}}
              mapProperties={{ basemap: 'topo' }}
              viewProperties={{

                  center: [-71.08499252929566, 42.326779376487536],
                  zoom: 13
              }}
              onClick = {this.handleOnClick.bind(this)}
              onLoad={this.handleMapLoad.bind(this)}
          >
          </Map>
        );
    }
}
const mapStateToProps = state => ({
  appBarState: state.appBar,
});
export default connect(mapStateToProps)(MapView);

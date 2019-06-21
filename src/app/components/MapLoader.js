import * as React from 'react';
import { loadModules } from 'esri-loader';
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

    }
    handleOnClick(e){
      var that = this;
      console.log(e.mapPoint);
    }
    componentDidMount() {
      loadModules(["esri/Map","esri/views/MapView","esri/layers/GeoJSONLayer"])
        .then(([Map, MapView, GeoJSONLayer]) => {
          // then we load a web map from an id
          let map = new Map({
            basemap: 'dark-gray'
          });
        //
          const geoJSONLayer = new GeoJSONLayer({
             url: "https://bpda.box.com/shared/static/xdqnl3uqrkbtsc4p78iho9i0e84e7dmn.json",
             copyright: "USGS Earthquakes",
          });
          map.add(geoJSONLayer);
        // //   // and we show that map in a container w/ id #viewDiv
          var view = new MapView({
            map: map,
            container: 'viewDiv',
            center: [-71.08499252929566, 42.326779376487536],
            zoom: 13
          });


        //
        // const map = new Map({ basemap: "streets" });
        // const view = new MapView({ container: "viewDiv", map: map, zoom: 11, center: [-89.8253, 35.2269] });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
    }
    render() {
        return (
           <div>
           <div id = 'viewDiv'  />
           </div>

         );
    }
}
const mapStateToProps = state => ({
  appBarState: state.appBar,
});
export default connect(mapStateToProps)(MapView);

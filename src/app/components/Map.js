import * as React from 'react';
import { Map,loadModules } from '@esri/react-arcgis';
import SketchWidget from './SketchWidget';
import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected } from '../redux/actions';



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
            layer:null
        };
        this.handleMapLoad = this.handleMapLoad.bind(this)
    }
    handleMapLoad(map, view) {
      let that =  this;
        this.setState({ map,view });
        this.props.dispatch(updateView(view))
        this.props.dispatch(updateMap(map))
        loadModules(["esri/widgets/Home","esri/layers/FeatureLayer","esri/layers/support/LabelClass"]).then(([ Home,FeatureLayer,LabelClass]) => {

          const layer = new FeatureLayer({
            // URL to the service
            id:"parcel",
            url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Census_2010_Tracts/FeatureServer/0"
          });

          layer.renderer = {
            type: "simple",  // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-fill",  // autocasts as new SimpleMarkerSymbol()

              color: [0,0,0,0.1],
              outline: {  // autocasts as new SimpleLineSymbol()
                width: 2,
                color: "grey",
                haloSize: 1.5,
                haloColor: "white"
              }
            }
          };


          const statesLabelClass = new LabelClass({
            labelExpressionInfo: { expression: "$feature.TRACTCE10" },
            symbol: {
              type: "text",  // autocasts as new TextSymbol()
              color: "black",
              haloSize: 1.5,
              haloColor: "white"
            }
          });

          layer.labelingInfo = [ statesLabelClass ];
          that.setState({layer:layer})
          map.add(layer);

          // view.on("click", function (event) {
          //   // Search for graphics at the clicked location. View events can be used
          //   // as screen locations as they expose an x,y coordinate that conforms
          //   // to the ScreenPoint definition.
          //   view.hitTest(event).then(function (response) {
          //     if (response.results.length) {
          //       // var graphic = response.results.filter(function (result) {
          //       //   // check if the graphic belongs to the layer of interest
          //       //   return result.graphic.layer === myLayer;
          //       // })[0].graphic;
          //       //
          //       // // do something with the result graphic
          //       // console.log(graphic.attributes);
          //       console.log(response.results)
          //     }
          //   });
          // });

          var homeBtn = new Home({
              view: view
            });
            view.ui.add(homeBtn, "top-left");
        });
    }

    handleOnClick(e){
      var that = this;
      console.log(e.mapPoint);
      that.state.view.graphics.removeAll();
      that.props.mapState.view.hitTest(e).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              // check if the graphic belongs to the layer of interest
              return result.graphic.layer === that.state.layer;



            })[0].graphic;
            //
            // // do something with the result graphic
            loadModules(["esri/Graphic"]).then(([ Graphic ]) => {
              const g = new Graphic({
                geometry: graphic.geometry,
                symbol: {
                    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                    color: [ 51,51, 204, 0.1 ],
                    style: "solid",
                    outline: {  // autocasts as new SimpleLineSymbol()
                      color: [ 51,51, 204, 0.9 ],
                      width: 1
                    }
                }
              });
              that.state.view.graphics.add(g);
            });
            console.log(graphic.attributes);
            that.props.dispatch(updateSelected([graphic.attributes.TRACTCE10]))
          }
        });
    }
    componentDidMount() {

    }
    render() {
        return (
          <Map
              style={{ width: '100vw', height: window.innerHeight - 64}}
              mapProperties={{ basemap: 'gray-vector' }}
              viewProperties={{

                  center: [-71.08499252929566, 42.326779376487536],
                  zoom: 15
              }}
              onClick = {this.handleOnClick.bind(this)}
              onLoad={this.handleMapLoad.bind(this)}
          >
          <SketchWidget/>
          </Map>
        );
    }
}
const mapStateToProps = state => ({
  mapState: state.map,
});
export default connect(mapStateToProps)(MapView);

import * as React from 'react';
import { Map,loadModules } from '@esri/react-arcgis';
// import SketchWidget from './SketchWidget';
import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected,updateNeighborhood } from '../redux/actions';



const styles = {
  legend:{
    display:"none"
  }
}


let Layer = (props) =>{
  React.useEffect(() => {
    
    loadModules(["esri/widgets/Home","esri/layers/FeatureLayer"]).then(([FeatureLayer]) =>{

      if(props.layer === "neighborhood"){
        console.log(props.map.findLayerById("tracts"))
        props.map.findLayerById("tracts").visible = false;
        props.map.findLayerById("neighborhood").visible = true;
        props.map.findLayerById("city").visible = false;
        // let l = props.map.findLayerById("tracts");
        // props.map.layers.remove(l)
        //   let fl = new FeatureLayer({
        //   // URL to the service
        //   id: "neighborhood",
        //   url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/Neighborhoods_tract/MapServer/0"
        // });
        
        // // props.map.add(fl);
        // console.log(fl);
        // console.log(props.map.add(fl))
      }else if(props.layer === "tracts"){
        console.log(props.map.findLayerById("neighborhood"))
        props.map.findLayerById("tracts").visible = true;
        props.map.findLayerById("neighborhood").visible = false;
        props.map.findLayerById("city").visible = false;
      //   console.log(props.map.findLayerById("neighborhood"))
      //   // props.map.layers.remove(props.map.findLayerById("neighborhood"))
      //   // let l = new FeatureLayer({
      //   //   // URL to the service
      //   //   id:"neighborhood",

      //   //   url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Census_2010_Tracts/FeatureServer/0"
      //   // });
      //   // props.map.layers.add(l)
      }
      else if(props.layer === "city"){
        props.map.findLayerById("city").visible = true;
        props.map.findLayerById("tracts").visible = false;
        props.map.findLayerById("neighborhood").visible = false;
      }

      

    })

  },[props.layer])

  return null
}
class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view:null,
            layer:null,
            layerName:"",
            neighborhood:null,
            graphics:[]
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
            id:"tracts",
            url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Census_2010_Tracts/FeatureServer/0"
          });

          const layer2 = new FeatureLayer({
            // URL to the service
            id: "neighborhood",
            url: "http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Maps/Neighborhoods_tract/MapServer/0",
            visible:false
          });

          const layer3 = new FeatureLayer({
            // URL to the service
            id: "city",
            url: "http://gis.cityofboston.gov/arcgis/rest/services/Planning/OpenData/MapServer/9",
            visible:false
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
          layer2.renderer = {
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
          layer3.renderer = {
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

          let statesLabelClass = new LabelClass({
            labelExpressionInfo: { expression: "$feature.TRACTCE10" },
            symbol: {
              type: "text",  // autocasts as new TextSymbol()
              color: "black",
              haloSize: 1.5,
              haloColor: "white"
            }
          });

          layer.labelingInfo = [ statesLabelClass ];

           statesLabelClass = new LabelClass({
            labelExpressionInfo: { expression: "$feature.Neighborhood" },
            symbol: {
              type: "text",  // autocasts as new TextSymbol()
              color: "black",
              haloSize: 1.5,
              haloColor: "white"
            }
          });

          layer2.labelingInfo = [ statesLabelClass ];

          that.setState({layer:layer})
          that.setState({neighborhood:layer2})
          map.addMany([layer,layer2,layer3]);

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

      if(this.props.mapState.layer === "neighborhood"){
      this.props.mapState.view.graphics.removeAll();
      this.props.dispatch(updateSelected([]))
      loadModules(["esri/views/layers/FeatureLayerView","esri/Graphic"]).then(([FeatureLayerView, Graphic]) => {

      var query = that.state.neighborhood.createQuery();
      query.geometry = e.mapPoint;
      query.spatialRelationship = "intersects";
      query.returnGeometry = true;
      query.outFields = [ "Neighborhood" ];
      that.state.neighborhood.queryFeatures(query).then(result=>{
        console.log(result);
        
        
        if(result.features.length > 0){
          // that.props.dispatch(updateSelected(result.features.attributes.Neighborhood))
          that.props.dispatch(updateNeighborhood(result.features[0].attributes.Neighborhood))


          const g = new Graphic({
            geometry: result.features[0].geometry,
            attributes:result.features[0].attributes.Neighborhood,
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
          this.props.mapState.view.graphics.add(g);
          var query = that.state.layer.createQuery();
          query.geometry = result.features[0].geometry;
          query.spatialRelationship = "intersects";
          query.returnGeometry = true;
          query.outFields = [ "*" ];
          that.state.layer.queryFeatures(query).then(result=>{
            console.log(result);
            if(result.features.length>0){
              let arr = [];
              result.features.forEach(feature=>{
                arr.push(feature.attributes.TRACTCE10)
              });

              that.props.dispatch(updateSelected(arr))
            }
          })
        }


      });});
      }else{

      
      // console.log(e.mapPoint);
      // that.state.view.graphics.removeAll();
      that.props.mapState.view.hitTest(e).then(function (response) {
          if (response.results.length) {
            var graphic = response.results.filter(function (result) {
              // check if the graphic belongs to the layer of interest
              return result.graphic.layer === that.state.layer || result.graphic.layer === that.state.neighborhood;
            })[0].graphic;
            //

            console.log(graphic)
            // // do something with the result graphic

            if(that.state.graphics.indexOf(graphic.attributes.TRACTCE10.toString())>=0){

              for(var i = 0; i < that.props.mapState.view.graphics.length; i++){
                console.log(that.props.mapState.view.graphics.getItemAt(i))
                if(that.props.mapState.view.graphics.getItemAt(i).attributes.TRACTCE10 == graphic.attributes.TRACTCE10){
          
                  that.props.mapState.view.graphics.remove(that.props.mapState.view.graphics.getItemAt(i));
                }
              
              }

              let graphicsTemp = that.state.graphics;
              let index = graphicsTemp.indexOf(graphic.attributes.TRACTCE10.toString());
              graphicsTemp.splice(index,1);
              that.props.dispatch(updateSelected(graphicsTemp))
              setState({graphics:graphicsTemp});
              
            }else{

              loadModules(["esri/Graphic"]).then(([ Graphic ]) => {
                const g = new Graphic({
                  geometry: graphic.geometry,
                  attributes:{TRACTCE10:graphic.attributes.TRACTCE10 ? graphic.attributes.TRACTCE10 :graphic.attributes.neighborhood },
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
              let graphicsTemp = that.state.graphics;
              graphicsTemp.push(graphic.attributes.TRACTCE10);
              that.props.dispatch(updateSelected(graphicsTemp))
              setState({graphics:graphicsTemp});
              
            }

            

            
            // console.log(graphic.attributes);

            // console.log(that.state.graphics);
            
            
          }
        });

      }
    }
    componentDidUpdate(prevProps,prevState){
      let that = this;
      // this.setState({layerName:this.props.mapState.layer})
      console.log(prevProps.mapState.layer)
      console.log(this.props.mapState.layer);
      if(prevProps.mapState.layer!==this.props.mapState.layer){
        this.setState({layerName:that.props.mapState.layer})
      }
    }
    componentWillReceiveProps(nextProps) {  
      let that = this;
      // console.log(nextProps.mapState.selected)
      // console.log(nextProps.mapState.layer);
      console.log(this.state.layerName);
      // let refresh = this.state.map.layers.filter(function(layer){
      //   console.log(layer)
      //   return layer.id == nextProps.mapState.layer && layer.visible 
      // })
      // if(refresh){
      //   // that.props.mapState.view.graphics.removeAll();
      //   console.log("refresh layer")
      // // }
      // let foundLayer = this.state.map.allLayers.find(function(layer) {
      //   return layer.id === nextProps.mapState.layer && ;
      //  });


      //  console.log("------------------")
      //  console.log(foundLayer)

      if(this.state.layerName !== "" && this.state.layerName !== nextProps.mapState.layer){
        that.props.mapState.view.graphics.removeAll();
        console.log("remove")
      }

      // if(foundLayer && foundLayer.visable){
      //   console.log("------------------")
      // }

      // console.log(this.state.layerName);
      // if(this.state.layerName != nextProps.mapState.layer){
      //   that.props.mapState.view.graphics.removeAll();
      // }
      if(nextProps.mapState.selected && nextProps.mapState.selected.length==0){
        this.setState({graphics:[]})
      }
      // console.log(this.props.mapState.selected)
      // if(this.props.mapState.selected){

      
      //   if(this.props.mapState.selected.length==0){
      //     // this.setState({graphics:[]})
      //     console.log(this.props.mapState.selected)
      //   }
      // }
    }
    render() {
    //  <SketchWidget/>
        return (
          <Map
              style={{ width: '100vw', height: window.innerHeight - 64}}
              mapProperties={{ basemap: 'gray-vector' }}
              viewProperties={{

                  center: [-71.08499252929566, 42.326779376487536],
                  zoom: 12
              }}
              onClick = {this.handleOnClick.bind(this)}
              onLoad={this.handleMapLoad.bind(this)}
          >
            <Layer layer={this.props.mapState.layer}/>
          </Map>
        );
    }
}
const mapStateToProps = state => ({
  mapState: state.map,
});
export default connect(mapStateToProps)(MapView);

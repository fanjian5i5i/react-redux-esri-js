import * as React from 'react';
import { loadModules } from '@esri/react-arcgis';

import { connect } from 'react-redux';
import { updateView,updateMap } from '../redux/actions';


class SketchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view:null,
            layer:null
        };

    }

    componentDidMount() {
      let that = this;
      loadModules(["esri/widgets/Sketch","esri/layers/GraphicsLayer","esri/Graphic"]).then(([ Sketch,GraphicsLayer,Graphic ]) => {

        const layer = new GraphicsLayer({
          id:"graphics"
        });
        var sketch = new Sketch({
          layer: layer,
          view: that.props.view
        });


        sketch.on("create", function(event) {
          // check if the create event's state has changed to complete indicating
          // the graphic create operation is completed.
          if (event.state === "complete") {
            // remove the graphic from the layer. Sketch adds
            // the completed graphic to the layer by default.
            // polygonGraphicsLayer.remove(event.graphic);
            console.log(event.graphic);
            that.props.view.graphics.removeAll();
            let featureLayer = that.props.map.findLayerById("parcel");
            let query = featureLayer.createQuery();
            query.geometry = event.graphic.geometry;
            query.spatialRelationship = "intersects";  // this is the default
            query.returnGeometry = true;
            query.outFields = [ "*" ];

            featureLayer.queryFeatures(query)
              .then(function(response){
                console.log(response);
                if(response.features.length > 0){
                  response.features.forEach((record) =>{
                    console.log(record)
                    const graphic = new Graphic({
                      geometry: record.geometry,
                      symbol: {
                          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                          color: [ 51,51, 204, 0.9 ],
                          style: "solid",
                          outline: {  // autocasts as new SimpleLineSymbol()
                            color: "white",
                            width: 1
                          }
                      }
                    });

                    that.props.view.graphics.add(graphic);
                  })
                }



                // returns a feature set with features containing the
                // POPULATION attribute and each feature's geometry
              });
            // use the graphic.geometry to query features that intersect it
            // selectFeatures(event.graphic.geometry);
          }
        });
        that.props.view.ui.add(sketch, "top-right");
        // that.props.map.add(layer);
      });
    }
    render() {
        return null
    }
}
const mapStateToProps = state => ({
  mapState: state.map,
});
export default connect(mapStateToProps)(SketchWidget);

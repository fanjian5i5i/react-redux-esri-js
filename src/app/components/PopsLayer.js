import * as React from 'react';
import { loadModules } from '@esri/react-arcgis';

export default class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layers: []
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/layers/FeatureLayer"]).then(([ FeatureLayer]) => {

            const pops = new FeatureLayer({
              // URL to the service
              id:"pops",
              objectIdField:"ObjectID",
              title:"Pops",
              popupEnabled:true,
              url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/POPS_confirmed_Collector/FeatureServer/0",
              outFields:["*"],
              renderer:{
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol: {
                  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                  size: 12,
                  color: "blue",
                  outline: {  // autocasts as new SimpleLineSymbol()
                    width: 1,
                    color: "white"
                  }
                }
              },
              popupTemplate: {
                  title: "{Name}",
                  content: [
                    {
                    type: "fields", // Autocasts as new FieldsContent()
                    fieldInfos: [
                      {
                        fieldName: 'Type_BPDA',
                        label: 'Type'
                      },{
                         fieldName: 'ADDRESS',
                         label: 'Address'
                       }]
                     }

                   ]

                }
            });
            this.setState({ layer: pops});

            this.props.map.add(this.state.layer);
          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.layers);
    }
}

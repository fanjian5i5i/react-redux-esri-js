import * as React from 'react';
import { Map,loadModules } from '@esri/react-arcgis';
import PopsLayer from './PopsLayer';
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
      loadModules(["esri/tasks/QueryTask"]).then(([ QueryTask]) => {
        this.state.view.hitTest(e)
          .then(function(response){

            if(response.results.length>0){
              console.log(response.results[0].graphic.attributes.OBJECTID_1);
              let objectIds = [];
              objectIds.push(response.results[0].graphic.attributes.OBJECTID_1)
              var attachmentQuery = {
                objectIds: objectIds,
                attachmentTypes: ["image/jpeg"]
              };
              // var url = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/POPS_confirmed_Collector/FeatureServer/0"; // Represents the REST endpoint for a layer of cities.
              //   var queryTask = new QueryTask({
              //     url: url
              //   });
              let mediaInfos = [];
              that.props.mapState.map.findLayerById("pops").
                queryAttachments(attachmentQuery).then(attachments =>{
                  console.log(attachments);

                  attachmentQuery.objectIds.forEach(function (objectId) {
                    if (attachments[objectId]) {
                      var attachment = attachments[objectId];
                      console.group("attachment for", objectId);
                      attachment.forEach(function (item) {
                        console.log("attachment id", item.id);
                        console.log("content type", item.contentType);
                        console.log("name", item.name);
                        console.log("size", item.size);
                        console.log("url", item.url);
                        console.groupEnd();
                        mediaInfos.push({
                                type: "image",
                                value: {
                                  sourceURL: item.url
                                }})
                      });
                    }
                  });

                  console.log(mediaInfos);

                  let popupTemplate =  {
                      title: "{Name}",
                      content: [
                        {
                               type: "media",
                               mediaInfos: mediaInfos
                         },
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

                    };

                    that.props.mapState.map.findLayerById("pops").popupTemplate = popupTemplate;
                })


              }
            });
          });
    }
    componentDidMount() {

    }
    render() {
        return (
          <Map
              style={{ width: '100vw', height: window.innerHeight - 64}}
              mapProperties={{ basemap: 'gray' }}
              viewProperties={{

                  center: [-71.0589, 42.3601],
                  zoom: 16
              }}
              onClick = {this.handleOnClick.bind(this)}
              onLoad={this.handleMapLoad.bind(this)}
          >
          <PopsLayer/>
          </Map>
        );
    }
}
const mapStateToProps = state => ({
  mapState: state.map,
});
export default connect(mapStateToProps)(MapView);

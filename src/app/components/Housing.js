import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import HousingChart from './HousingChart';
const census = require("citysdk");
import { connect } from 'react-redux';

  
class Housing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      data:null,
      houseOpen:true
    }
  }

  componentDidMount(){
    if(this.props.mapState.selected){
      this._loadAsyncData("group(B25003)")
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData("group(B25003)")
    }
  }
  processIncomeData (data){
    let temp1 = parseInt(data["B25003_002E"]);
    let temp2 = parseInt(data["B25003_003E"]);
    // let temp3 = parseInt(data["B19001_006E"]) +parseInt(data["B19001_007E"]);;

    return [{name:"Owner Occupied",y:temp1},{name:"Renter Occupied",y:temp2}];
  } 
  _loadAsyncData(values){
    let that = this;
    let center = { lat: 42.3601, lng: -71.0589 };
    let Args = this.props.mapState.layer !== "city" ? {
          "vintage": 2017,
          "geoHierarchy": {
            "county": center,
            "tract": this.props.mapState.selected
          },
          "sourcePath": ["acs", "acs5"],
          "values": [values],
          // "geoResolution": "500k",
        }:{
          "vintage": 2017,
          "geoHierarchy": {
            "county": center,
            "county subdivision":"07000"
          },
          "sourcePath": ["acs", "acs5"],
          "values": [values],
        }
        census(Args,
          (err, res) => {
            console.log(res);
            let keys = Object.keys(res[0]);
            // let keyLength = keys.length - 3;
            let tempObj = {}
            keys.forEach(key =>{

              let temp = 0;
              for(var i = 0; i< res.length ; i++ ){

                temp += parseInt(res[i][key]);
              }
              tempObj[key]  = temp;

            });
              that.setState({data:that.processIncomeData(tempObj)})



          });

  }
  
  render(){
  return (
    <div>
      <ListItem >
          <ListItemText inset primary="Household Tenure"/>
            {this.state.houseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.houseOpen} timeout="auto">

          <HousingChart data={this.state.data}/>

          </Collapse>
    </div>
  )}
}

const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Housing);
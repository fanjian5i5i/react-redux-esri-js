import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DownloadCSV from './DownloadCSV';
import LoadingBlock from './LoadingBlock'
import PieChart from './PieChart';
const census = require("citysdk");
import { connect } from 'react-redux';

  
class Education extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      data:null,
      educationOpen:true
    }
  }

  componentDidMount(){
    if(this.props.mapState.selected){
      this._loadAsyncData("group(B15003)")
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData("group(B15003)")
    }
  }
  processEducationData (data){
    console.log(data);
    //Less than high school
    //B15003_002E + B15003_003E + … + B15003_016E
    let temp1 = parseInt(data["B15003_002E"]) + parseInt(data["B15003_003E"]) +
    parseInt(data["B15003_004E"]) + parseInt(data["B15003_005E"]) +
    parseInt(data["B15003_006E"]) + parseInt(data["B15003_007E"]) +
    parseInt(data["B15003_008E"]) + parseInt(data["B15003_009E"]) +
    parseInt(data["B15003_010E"]) + parseInt(data["B15003_011E"]) +
    parseInt(data["B15003_012E"]) + parseInt(data["B15003_013E"]) +
    parseInt(data["B15003_014E"]) + parseInt(data["B15003_015E"]) +
    parseInt(data["B15003_016E"]) 

    //High school graduate//

    //B15003_017E + B15003_018E
    let temp2 = parseInt(data["B15003_017E"]) + parseInt(data["B15003_018E"])
    //Some colleges or associate's degree
    //B15003_019E + B15003_020E + B15003_021E
    let temp3 = parseInt(data["B15003_019E"]) + parseInt(data["B15003_020E"])+ parseInt(data["B15003_021E"])
    
    //Bachelor's degree
    //B15003_022E
    let temp4 = parseInt(data["B15003_022E"])
    
    //Graduate or professional degree
    //B15003_023E + B15003_024E + B15003_025E
    let temp5 = parseInt(data["B15003_023E"]) + parseInt(data["B15003_024E"])+ parseInt(data["B15003_025E"])



    return [["Less than high school",temp1],["High school graduate",temp2],
    ["Some colleges or associate's degree",temp3],["Bachelor's degree",temp4],
    ["Graduate or professional degree",temp5]];
  } 
  _loadAsyncData(values){
    this.setState({loading:true})
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
              that.setState({data:that.processEducationData(tempObj)})
              that.setState({loading:false})


          });

  }
  
  render(){
  return (
    <div>
      <ListItem >
          <ListItemText inset primary="Educational Attainment"/>
            {this.state.educationOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.educationOpen} timeout="auto">
          {!this.state.loading? 
          <div>
          <PieChart data={this.state.data} title={"Educational Attainment"}/>
          <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.data} title={"Educational Attainment"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
          </div>
          :
          <LoadingBlock/>}
          </Collapse>
    </div>
  )}
}

const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Education);
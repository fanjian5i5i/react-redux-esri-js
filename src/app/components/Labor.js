import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import HousingChart from './HousingChart';
const census = require("citysdk");
import { connect } from 'react-redux';
// const useStyles = makeStyles(theme => ({
//   title:{
//     color:"#003c50"
//   },
// }));
const styles = {
  title:{
    color:"#003c50"
  },
}

class Labor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      transData:null,
      selected:props.mapState.selected,
      TransOpen:true,
      occupationOpen:false
    }
  }
  processCensusData(selected){
    console.log(selected)
  }
  static getDerivedStateFromProps(props,state){
    console.log(props.mapState);
    // console.log(this.props.mapState)
    // console.log(state);
    let that = this;
    // if(props.id != state.id){
    //   // that.setState({selected:props.mapState.selected})
    //   return {
    //     // selected:props.mapState.selected
    //     externalData:null,
    //     prevId:nextProps.id
    //   }
    // }
    return null;
  }
  processTransData (data){

    //Car, truck, or van
    let temp1 = parseInt(data["B08301_002E"])
//Public transportation
    let temp2 = parseInt(data["B08301_010E"])
//Bicycle
    let temp3 = parseInt(data["B08301_018E"]) 
//Walked
    let temp4 = parseInt(data["B08301_019E"])
//Other, or Work at Home
//B08301_016E + B08301_017E + B08301_020E + B08301_021E
    let temp5 = parseInt(data["B08301_016E"]) +parseInt(data["B08301_017E"])+parseInt(data["B08301_020E"])+parseInt(data["B08301_021E"]);

    return [["Car, truck, or van",temp1],["Public transportation",temp2],["Bicycle",temp3],["Walked",temp4],["Other, or Work at Home",temp5]];
  }
  processOccupationData (data){

    let result = []
    let les14999 = parseInt(data["B19001_002E"]) +parseInt(data["B19001_003E"]);
    let les24999 = parseInt(data["B19001_004E"]) +parseInt(data["B19001_005E"]);
    let les34999 = parseInt(data["B19001_006E"]) +parseInt(data["B19001_007E"]);;
    let les49999 = parseInt(data["B19001_008E"]) +parseInt(data["B19001_009E"])+parseInt(data["B19001_010E"]);
    let les74999 = parseInt(data["B19001_011E"]) +parseInt(data["B19001_012E"]);
    let les99999 = parseInt(data["B19001_013E"])
    let les149999 = parseInt(data["B19001_014E"]) +parseInt(data["B19001_015E"]);
    let other = parseInt(data["B19001_016E"]) +parseInt(data["B19001_017E"]);;

    console.log(other)
    return [["0-14,999",les14999],["15,000-24,999",les24999],["25,000-34,999",les34999],["35,000-49,999",les49999],["50,000-74,999",les74999],["75,000-99,999",les99999],["99,999-149,999",les149999],[">150,000",other]];
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.state);
    // console.log(nextState);
    return true
  }
  componentDidMount(){
    if(this.props.mapState.selected){
      this._loadAsyncData("group(B08301)","trans")
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData("group(B08301)","trans")
    }
  }

  _loadAsyncData(values,category){
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
              // that.setState({transData:that.processtransData(tempObj)})
              switch(category){
                case 'trans':
                  that.setState({transData:that.processTransData(tempObj)})
                  break;
                case 'occupation':
                  that.setState({occupationData:that.processOccupationData(tempObj)})
                  break;
                // default:
                  

              }

              



          });

  }

  handleClickCode(code) {
    let that = this;
    switch (code) {
      case "house":
        // setNativityOpen(!nativityOpen);
        this.setState({TransOpen:!this.state.TransOpen})
        break;
      case "poverty":
        // setAgeOpen(!ageOpen);
        this.setState({occupationOpen:!this.state.occupationOpen})
        break;
      default:

    }

  }
  render(){

    return(
    <div>
      <ListItem button onClick={()=>{this.handleClickCode("transportation")}}>
          <ListItemText inset primary="Means of Transportation to Work"/>
            {this.state.TransOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.TransOpen} timeout="auto">

          <HousingChart data={this.state.transData}/>

          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("occupation")}}>

          <ListItemText inset primary="Occupation"/>
            {this.state.occupationOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.occupationOpen} timeout="auto">



          </Collapse>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Labor);

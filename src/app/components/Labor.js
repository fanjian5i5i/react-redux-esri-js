import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TransportationChart from './TransportationChart';
import OccupationChart from './OccupationChart';
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
      occupationData:null,
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

    //Management
    //C24010_005E + C24010_041E
    let temp1 = parseInt(data["C24010_005E"]) +parseInt(data["C24010_041E"]);

    //Business and financial operations, legal
    //C24010_006E + C24010_042E + C24010_013E + C24010_049E
    let temp2 = parseInt(data["C24010_006E"]) +parseInt(data["C24010_042E"])+parseInt(data["C24010_013E"])+parseInt(data["C24010_049E"])
    //Computer, engineering, and science
    //C24010_007E + C24010_043E
    let temp3 = parseInt(data["C24010_007E"]) +parseInt(data["C24010_043E"]);
    //Community and social service, arts, design, entertainment, sports, and media
    //C24010_012E + C24010_048E + C24010_015E + C24010_051E
    let temp4 = parseInt(data["C24010_012E"]) +parseInt(data["C24010_048E"])+parseInt(data["C24010_015E"])+parseInt(data["C24010_051E"])

    //Education, training, and library
    //C24010_014E + C24010_050E
    let temp5 = parseInt(data["C24010_014E"]) +parseInt(data["C24010_050E"]);

    //Healthcare practitioners and technical
    //C24010_016E + C24010_052E
    let temp6 = parseInt(data["C24010_016E"]) +parseInt(data["C24010_052E"]);

    //Healthcare support, personal care and service
    //C24010_020E + C24010_056E + C24010_026E + C24010_062E
    let temp7 = parseInt(data["C24010_020E"]) +parseInt(data["C24010_056E"])+parseInt(data["C24010_026E"])+parseInt(data["C24010_062E"])

    //Protective service
    //C24010_021E + C24010_057E
    
    let temp8 = parseInt(data["C24010_021E"]) +parseInt(data["C24010_057E"]);

    //Food preparation and serving
    // C24010_024E + C24010_060E
    let temp9 = parseInt(data["C24010_024E"]) +parseInt(data["C24010_060E"]);
    //Building and grounds cleaning and maintenance
    //C24010_025E + C24010_061E
    let temp10 = parseInt(data["C24010_025E"]) +parseInt(data["C24010_061E"]);
    //Sales, office and administrative support
    //C24010_027E + C24010_063E
    let temp11 = parseInt(data["C24010_027E"]) +parseInt(data["C24010_063E"]);
    //Natural resources, construction, and maintenance
    //C24010_030E + C24010_066E
    let temp12 = parseInt(data["C24010_030E"]) +parseInt(data["C24010_066E"]);
    //Production, transportation, and material moving
    //C24010_034E + C24010_070E
    let temp13 = parseInt(data["C24010_034E"]) +parseInt(data["C24010_070E"]);





    return [
      ["Management",temp1],
      ["Business and financial operations, legal",temp2],
      ["Computer, engineering, and science",temp3],
      ["Community and social service, arts, design, entertainment, sports, and media",temp4],
      ["Education, training, and library",temp5],
      ["Healthcare practitioners and technical",temp6],
      ["Healthcare support, personal care and service",temp7],
      ["Protective service",temp8],
      ["Food preparation and serving",temp9],
      ["Building and grounds cleaning and maintenance",temp10],
      ["Sales, office and administrative support",temp11],
      ["Natural resources, construction, and maintenance",temp12],
      ["Production, transportation, and material moving",temp13]
  ];
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.state);
    // console.log(nextState);
    return true
  }
  componentDidMount(){
    if(this.props.mapState.selected){
      this._loadAsyncData("group(B08301)","trans")
      this._loadAsyncData("group(C24010)","occupation")
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData("group(B08301)","trans");
      this._loadAsyncData("group(C24010)","occupation")

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
      case "transportation":
        // setNativityOpen(!nativityOpen);
        this.setState({TransOpen:!this.state.TransOpen})
        break;
      case "occupation":
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

          <TransportationChart data={this.state.transData}/>

          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("occupation")}}>

          <ListItemText inset primary="Occupation"/>
            {this.state.occupationOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.occupationOpen} timeout="auto">

          <OccupationChart data={this.state.occupationData}/>

          </Collapse>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Labor);

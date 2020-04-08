import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IncomeChart from './IncomeChart';
import PovertyChart from './PovertyChart';


import ListItemIcon from '@material-ui/core/ListItemIcon';
import DownloadCSV from './DownloadCSV';
import LoadingBlock from './LoadingBlock';
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

class Income extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      incomeData:null,
      povertyDat:null,
      selected:props.mapState.selected,
      houseOpen:true,
      povertyOpen:false
    }
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
  processIncomeData (data){

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
  processPovertyData(data){
    //Under 18 years
    //((B17001_004E + B17001_018E) + (B17001_005E + B17001_019E) + (B17001_006E + B17001_020E) + (B17001_007E + B17001_021E) + (B17001_008E + B17001_022E) + (B17001_009E + B17001_023E)) / 
    //((B17001_004E + B17001_018E + B17001_033E + B17001_047E) + (B17001_005E + B17001_019E + B17001_034E + B17001_048E) + (B17001_006E + B17001_020E + B17001_035E + B17001_049E) + 
    //(B17001_007E + B17001_021E + B17001_036E + B17001_050E) + (B17001_008E + B17001_022E + B17001_037E + B17001_051E) + (B17001_009E + B17001_023E + B17001_038E + B17001_052E))
    let temp1 = (parseInt(data["B17001_004E"]) +parseInt(data["B17001_018E"])+
    parseInt(data["B17001_005E"]) +parseInt(data["B17001_019E"])+
    parseInt(data["B17001_006E"]) +parseInt(data["B17001_020E"])+
    parseInt(data["B17001_007E"]) +parseInt(data["B17001_021E"])+
    parseInt(data["B17001_008E"]) +parseInt(data["B17001_022E"])+
    parseInt(data["B17001_009E"]) +parseInt(data["B17001_023E"]))/
    (parseInt(data["B17001_004E"]) +parseInt(data["B17001_018E"])+parseInt(data["B17001_033E"]) +parseInt(data["B17001_047E"])+
    parseInt(data["B17001_005E"]) +parseInt(data["B17001_019E"])+parseInt(data["B17001_034E"]) +parseInt(data["B17001_048E"])+
    parseInt(data["B17001_006E"]) +parseInt(data["B17001_020E"])+parseInt(data["B17001_035E"]) +parseInt(data["B17001_049E"])+
    parseInt(data["B17001_007E"]) +parseInt(data["B17001_021E"])+parseInt(data["B17001_036E"]) +parseInt(data["B17001_050E"])+
    parseInt(data["B17001_008E"]) +parseInt(data["B17001_022E"])+parseInt(data["B17001_037E"]) +parseInt(data["B17001_051E"])+
    parseInt(data["B17001_009E"]) +parseInt(data["B17001_023E"])+parseInt(data["B17001_038E"]) +parseInt(data["B17001_052E"]));

    //18 to 64 years
    //((B17001_010E + B17001_024E) + (B17001_011E + B17001_025E) + (B17001_012E + B17001_026E) + (B17001_013E + B17001_027E) + (B17001_014E + B17001_028E)) / 
    //((B17001_010E + B17001_024E + B17001_039E + B17001_053E) + (B17001_011E + B17001_025E + B17001_040E + B17001_054E) + (B17001_012E + B17001_026E + B17001_041E + B17001_055E) + 
    //(B17001_013E + B17001_027E + B17001_042E + B17001_056E) + (B17001_014E + B17001_028E + B17001_043E + B17001_057E))
    let temp2 = (parseInt(data["B17001_010E"]) +parseInt(data["B17001_024E"])+
    parseInt(data["B17001_011E"]) +parseInt(data["B17001_025E"])+
    parseInt(data["B17001_012E"]) +parseInt(data["B17001_026E"])+
    parseInt(data["B17001_013E"]) +parseInt(data["B17001_027E"])+
    parseInt(data["B17001_014E"]) +parseInt(data["B17001_028E"]))/
    (parseInt(data["B17001_010E"]) +parseInt(data["B17001_024E"])+parseInt(data["B17001_039E"]) +parseInt(data["B17001_053E"])+
    parseInt(data["B17001_011E"]) +parseInt(data["B17001_025E"])+parseInt(data["B17001_040E"]) +parseInt(data["B17001_054E"])+
    parseInt(data["B17001_012E"]) +parseInt(data["B17001_026E"])+parseInt(data["B17001_041E"]) +parseInt(data["B17001_055E"])+
    parseInt(data["B17001_013E"]) +parseInt(data["B17001_027E"])+parseInt(data["B17001_042E"]) +parseInt(data["B17001_056E"])+
    parseInt(data["B17001_014E"]) +parseInt(data["B17001_028E"])+parseInt(data["B17001_043E"]) +parseInt(data["B17001_057E"]));
    //65 years and over
    //((B17001_015E + B17001_029E) + (B17001_016E + B17001_030E)) / 
    //((B17001_015E + B17001_029E + B17001_044E + B17001_058E) + (B17001_016E + B17001_030E + B17001_045E + B17001_059E))
    let temp3 = (parseInt(data["B17001_015E"]) +parseInt(data["B17001_029E"])+
    parseInt(data["B17001_016E"]) +parseInt(data["B17001_030E"]))/
    (parseInt(data["B17001_015E"]) +parseInt(data["B17001_029E"])+parseInt(data["B17001_044E"]) +parseInt(data["B17001_058E"])+
    parseInt(data["B17001_016E"]) +parseInt(data["B17001_030E"])+parseInt(data["B17001_045E"]) +parseInt(data["B17001_059E"]));


    return [["Under 18 years",parseFloat((temp1*100).toString().substring(0,5))],["18 to 64 years",parseFloat((temp2*100).toString().substring(0,5))],["65 years and over",parseFloat((temp3*100).toString().substring(0,5))]];
  
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.state);
    // console.log(nextState);
    return true
  }
  componentDidMount(){
    if(this.props.mapState.selected){
      this._loadAsyncData("group(B19001)","income")
      this._loadAsyncData("group(B17001)","poverty")
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData("group(B19001)","income")
      this._loadAsyncData("group(B17001)","poverty")
      
    }
  }

  _loadAsyncData(values,category){
    let that = this;
    that.setState({loading:true})
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

              switch(category){
                case 'income':
                  that.setState({incomeData:that.processIncomeData(tempObj)})
                  break;
                case 'poverty':
                  that.setState({povertyData:that.processPovertyData(tempObj)})
                  break;
                // default:
                  

              }

              that.setState({loading:false})

          });

  }

  handleClickCode(code) {
    let that = this;
    switch (code) {
      case "house":
        // setNativityOpen(!nativityOpen);
        this.setState({houseOpen:!this.state.houseOpen})
        break;
      case "poverty":
        // setAgeOpen(!ageOpen);
        this.setState({povertyOpen:!this.state.povertyOpen})
        break;
      default:

    }

  }
  render(){

    return(
    <div>
      <ListItem button onClick={()=>{this.handleClickCode("house")}}>
          <ListItemText inset primary="Household Income"/>
            {this.state.houseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.houseOpen} timeout="auto">
          {!this.state.loading? 
          <div>
            <IncomeChart data={this.state.incomeData} title={"Household Income"}/>
              
              <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.incomeData} title={"Household Income"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
              </div>
          :
          <LoadingBlock/>}
          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("poverty")}}>

          <ListItemText inset primary="Poverty Rate"/>
            {this.state.povertyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.povertyOpen} timeout="auto">                       
          {!this.state.loading? 
          <div>
            <PovertyChart data={this.state.povertyData} title={"Poverty Rate"}/>
              
              <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.incomeData} title={"Poverty Rate"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
              </div>
          :
          <LoadingBlock/>}
          </Collapse>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Income);

import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PieChart from './PieChart';
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

class Labor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      raceData:null,
      selected:props.mapState.selected,
      genderData:null,
      genderOpen:false,
      ageOpen:true,
      loading:false
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
  processRaceData =(data) =>{

    //White alone
    let temp1 = parseInt(data["B03002_003E"])
//Black or African American alone
    let temp2 = parseInt(data["B03002_004E"])
//Asian, Native Hawaiian and Pacific Islander alone
//B03002_006E + B03002_007E
    let temp3 = parseInt(data["B03002_006E"]) +parseInt(data["B03002_007E"]) 
//Hispanic or Latino
//B03002_012E
  let temp4 = parseInt(data["B03002_012E"]) 
//Others
//B08301_016E + B08301_017E + B08301_020E + B08301_021E
    let temp5 = parseInt(data["B03002_005E"]) +parseInt(data["B03002_008E"]) + parseInt(data["B03002_010E"]) +parseInt(data["B03002_011E"]) 


    return [["White alone",temp1],["Black or African American alone",temp2],["Asian, Native Hawaiian and Pacific Islander alone",temp3],["Hispanic or Latino",temp4],["Others",temp5]];
  }
  processGenderData =(data) =>{

    //Male
    let temp1 = parseInt(data["B01001_002E"])
///Female
    let temp2 = parseInt(data["B01001_026E"])



    return [["Male",temp1],["Female",temp2]];
  }
  processNativityData =(data) =>{

    //Male
    let temp1 = parseInt(data["B05002_002E"])
///Female
    let temp2 = parseInt(data["B05002_014E"])

    let temp3 = parseInt(data["B05002_021E"])

    return [["Native",temp1],["Naturalized citizen",temp2],["Not a citizen",temp3]];
  }


  

  processAgeData (data){

    //0-4
    //B01001_003E + B01001_027E
    let temp1 = parseInt(data["B01001_003E"]) +parseInt(data["B01001_027E"]);

    //5-17
    //(B01001_004E + B01001_028E) + (B01001_005E + B01001_029E) + (B01001_006E + B01001_030E)
    let temp2 = parseInt(data["B01001_004E"]) +parseInt(data["B01001_028E"])+parseInt(data["B01001_005E"])+parseInt(data["B01001_029E"])+parseInt(data["B01001_006E"])+parseInt(data["B01001_030E"])
    //18-24
    //(B01001_007E + B01001_031E) + (B01001_008E + B01001_032E) + (B01001_009E + B01001_033E) + (B01001_010E + B01001_034E) 
    let temp3 = parseInt(data["B01001_007E"]) +parseInt(data["B01001_031E"]) +parseInt(data["B01001_008E"]) +parseInt(data["B01001_032E"])
    +parseInt(data["B01001_009E"]) +parseInt(data["B01001_033E"]) +parseInt(data["B01001_010E"]) +parseInt(data["B01001_034E"]);
    //25-34
    //(B01001_011E + B01001_035E) + (B01001_012E + B01001_036E)
    let temp4 = parseInt(data["B01001_011E"]) +parseInt(data["B01001_035E"])+parseInt(data["B01001_012E"])+parseInt(data["B01001_036E"])

    //35-44
    //(B01001_013E + B01001_037E) + (B01001_014E + B01001_038E)
    let temp5 = parseInt(data["B01001_013E"]) +parseInt(data["B01001_037E"]) +  parseInt(data["B01001_014E"]) +parseInt(data["B01001_038E"]);

    //45-54
    //(B01001_015E + B01001_039E) + (B01001_016E + B01001_040E)
    let temp6 = parseInt(data["B01001_015E"]) +parseInt(data["B01001_039E"]) + parseInt(data["B01001_016E"]) +parseInt(data["B01001_040E"])

    //55-64
    //(B01001_017E + B01001_041E) + (B01001_018E + B01001_042E) + (B01001_019E + B01001_043E)
    let temp7 = parseInt(data["B01001_017E"]) +parseInt(data["B01001_041E"])+parseInt(data["B01001_018E"])+parseInt(data["B01001_042E"])
    +parseInt(data["B01001_019E"])+parseInt(data["B01001_043E"])

    //65+
    //(B01001_020E + B01001_044E) + (B01001_021E + B01001_045E) + (B01001_022E + B01001_046E) + (B01001_023E + B01001_047E) + (B01001_024E + B01001_048E) + (B01001_025E + B01001_049E)
    
    let temp8 = parseInt(data["B01001_020E"]) +parseInt(data["B01001_044E"]) + parseInt(data["B01001_021E"]) +parseInt(data["B01001_045E"])
    +parseInt(data["B01001_022E"])+parseInt(data["B01001_046E"])+parseInt(data["B01001_023E"])+parseInt(data["B01001_047E"])
    +parseInt(data["B01001_024E"])+parseInt(data["B01001_048E"])+parseInt(data["B01001_025E"])+parseInt(data["B01001_049E"])

    return [
      ["0-4",temp1],
      ["5-17",temp2],
      ["18-24",temp3],
      ["25-34",temp4],
      ["35-44",temp5],
      ["45-54",temp6],
      ["55-64",temp7],
      ["65+",temp8]
  ];
  }
  shouldComponentUpdate(nextProps, nextState){
    // console.log(this.state);
    // console.log(nextState);
    return true
  }
  componentDidMount(){
    if(this.props.mapState.selected && this.props.mapState.selected.length!=0){
      this._loadAsyncData("group(B03002)","race");
      this._loadAsyncData("group(B01001)","gender");
      this._loadAsyncData("group(B05002)","nativity");
      this._loadAsyncData("group(B01001)","age");
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      if(this.props.mapState.selected.length!=0){
      this._loadAsyncData("group(B03002)","race");
      this._loadAsyncData("group(B01001)","gender");
      this._loadAsyncData("group(B05002)","nativity");
      this._loadAsyncData("group(B01001)","age");
      }else if(this.props.mapState.layer == "city"){
        this._loadAsyncData("group(B03002)","race");
      this._loadAsyncData("group(B01001)","gender");
      this._loadAsyncData("group(B05002)","nativity");
      this._loadAsyncData("group(B01001)","age");
      }
    }
  }

  _loadAsyncData(values,category){
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
              // that.setState({raceData:that.processraceData(tempObj)})
              switch(category){
                case 'race':
                  that.setState({raceData:that.processRaceData(tempObj)})
                  break;
                case 'gender':
                  that.setState({genderData:that.processGenderData(tempObj)})
                  break;
                  case 'nativity':
                  that.setState({nativityData:that.processNativityData(tempObj)})
                  break;
                  case 'age':
                    that.setState({ageData:that.processAgeData(tempObj)})
                    break;
                  
                // default:
                  

              }

              that.setState({loading:false})

              



          });

  }

  handleClickCode(code) {
    let that = this;
    switch (code) {
      case "race":
        // setNativityOpen(!nativityOpen);
        this.setState({raceOpen:!this.state.raceOpen})
        break;
      case "gender":
        // setAgeOpen(!ageOpen);
        this.setState({genderOpen:!this.state.genderOpen})
        break;
        case "nativity":
          // setAgeOpen(!ageOpen);
          this.setState({nativityOpen:!this.state.nativityOpen})
          break;
          case "age":
          // setAgeOpen(!ageOpen);
          this.setState({ageOpen:!this.state.ageOpen})
          break;
      default:

    }

  }
  render(){

    return(
    <div>
        <ListItem button onClick={()=>{this.handleClickCode("age")}}>

        <ListItemText inset primary="Population by Age"/>
          {this.state.ageOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={this.state.ageOpen} timeout="auto">
          {!this.state.loading? 
          <div>
            <PieChart data={this.state.ageData} title={"Age"}/>
              
              <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.ageData} title={"Population By Age"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
              </div>
          :
          <LoadingBlock/>}

        
        
        </Collapse>
        <Divider />
        <ListItem button onClick={()=>{this.handleClickCode("race")}}>
        
          <ListItemText inset primary="Race/Ethnicity"/>
            {this.state.raceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.raceOpen} timeout="auto">
          {!this.state.loading? 
          <div>
          <PieChart data={this.state.raceData} title={"Race/Ethnicity"}/>
          <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.raceData} title={"Race/Ethnicity"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
          </div>
          :
          <LoadingBlock/>}
          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("gender")}}>

          <ListItemText inset primary="Gender"/>
            {this.state.genderOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          
          <Collapse in={this.state.genderOpen} timeout="auto">
          {!this.state.loading? 
          <div>
          <PieChart data={this.state.genderData} title={"Gender"}/>
          <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.genderData} title={"Gender"} selected={this.props.mapState.selected}/>
                </ListItemIcon>
                <ListItemText primary="doanload csv" />
              </ListItem>
          </div>
          :
          <LoadingBlock/>}
          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("nativity")}}>

          <ListItemText inset primary="Nativity"/>
            {this.state.nativityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.nativityOpen} timeout="auto">
          {!this.state.loading? 
          <div>
          <PieChart data={this.state.nativityData} title={"Nativity"}/>
          <ListItem>
                <ListItemIcon>
                <DownloadCSV data={this.state.nativityData} title={"Nativity"} selected={this.props.mapState.selected}/>
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

export default connect(mapStateToProps)(Labor);

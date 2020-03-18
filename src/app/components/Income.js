import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
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
      externalData:null,
      selected:props.mapState.selected,
      houseOpen:true,
      povertyOpen:false
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
  processIncomeData (data){

    let result = []
    // for (var key in data) {
    //     if (data.hasOwnProperty(key)) {

    //           if(key.indexOf("M")<0&& key.indexOf("A")<0){
    //             result.push(data[key]);
    //           }


    //     }
    // }
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
      this._loadAsyncData(this.props.mapState.selected)
    }
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(prevProps.mapState.selected)
    // console.log(this.props.mapState.selected)
    if(prevProps.mapState.selected !== this.props.mapState.selected){
      this._loadAsyncData(this.props.mapState.selected)
    }
  }

  _loadAsyncData(selected){
    let that = this;
    let tract = this.props.mapState.selected;
    let center = { lat: 42.3601, lng: -71.0589 };
    let values = ["group(B19001)"];
    let Args = {
          "vintage": 2017,
          "geoHierarchy": {
            "county": center,
            "tract": tract
          },
          "sourcePath": ["acs", "acs5"],
          "values": values,
          // "geoResolution": "500k",
        };
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
              that.setState({externalData:that.processIncomeData(tempObj)})
            
            
    
          });
        
  }
  //   console.log(prevState.data)
  //   if(this.state.data.length!==prevState.data.length){

    
  //   let that = this;
  //   let tract = this.props.mapState.selected;
  //   let center = { lat: 42.3601, lng: -71.0589 };
  //   let values = ["group(B19001)"];
  //   console.log(prevProps.mapState.selected);
  //   let Args = {
  //     "vintage": 2017,
  //     "geoHierarchy": {
  //       "county": center,
  //       "tract": tract.length==0 ? tract : tract.join(',')
  //     },
  //     "sourcePath": ["acs", "acs5"],
  //     "values": values,
  //     // "geoResolution": "500k",
  //   };
  //   census(Args,
  //     (err, res) => {
  //       console.log(res);
  //       that.setState({data:that.processIncomeData(res[0])})

  //     });
  //   }
  //   // console.log(prevProps.mapState.selected);
  //   // console.log(this.props.mapState.selected);

  //   // let selected = this.props.mapState.selected;
  //   // let preSelected = prevProps.mapState.selected;
  //   // if(selected!==prevProps.mapState.selected){
  //   // console.log(prevState)
  //   // let preSelected = prevProps.mapState.selected;
  //   // if(selected && selected != '' && this.state.selected !== preSelected) this.processCensusData(selected);
  //     // this.processCensusData(preSelected)
  //   // }
  // }

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
    let that = this;
    const options = {
      title: {
        text: 'Household Income'
      },
      xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
      chart: {
        type: 'column'
      },
      series: [{
        name:"Household Income",
        data: that.state.externalData
      }],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
      }
    }
    return(
    <div>
      <ListItem button onClick={()=>{this.handleClickCode("house")}}>
          <ListItemText inset primary="Household Income"/>
            {this.state.houseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.houseOpen} timeout="auto">

          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />

          </Collapse>
          <Divider/>
          <ListItem button onClick={()=>{this.handleClickCode("poverty")}}>

          <ListItemText inset primary="Poverty Rate"/>
            {this.state.povertyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.povertyOpen} timeout="auto">

          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />

          </Collapse>
    </div>
    )
  }
}


const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Income);

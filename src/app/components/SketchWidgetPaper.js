import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected } from '../redux/actions';

import {HorizontalBar} from 'react-chartjs-2';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import census from 'citysdk';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    top: 140,
    right: 14
  },
}));



function SketchWidgetPaper(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const [ageData, setAgeData] = useState("");




  React.useEffect(() => {

    setSelected(props.mapState.selected);
  });

  let censusPromise = function(args) {
    return new Promise(function(resolve, reject) {
      census(args, function(err, json) {
        if (!err) {

          resolve(json);
        } else {

          reject(err);
        }
      });
    });
  };

  // let getCensusData = async function(args) {
  //   let censusGeoJSON = await censusPromise(args);
  //   return { data: censusGeoJSON};
  // };

  let processAgeData = (data) =>{
    console.log(data)
    let result = [];
    // data.forEach(variable=>{
    //   result.push(variable);
    // });
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if(key!='county'&&key!='state'&&key!='tract'){
              result.push(data[key])
            }
        }
    }
    console.log(result)
    return result
  }


  let center = { lat: 42.3601, lng: -71.0589 };
  let values = ["B01001_003E", "B01001_004E", "B01001_005E","B01001_006E", "B01001_007E", "B01001_008E","B01001_009E", "B01001_010E",
"B01001_011E", "B01001_012E", "B01001_013E","B01001_014E", "B01001_015E", "B01001_016E","B01001_017E", "B01001_018E",
"B01001_019E", "B01001_020E", "B01001_021E","B01001_022E", "B01001_023E", "B01001_024E","B01001_025E"];
  let Args = {
      "vintage": 2016,
      "geoHierarchy": {
        "county": center,
        "tract": selected ? selected.toString() : "*"
      },
      "sourcePath": ["acs", "acs5"],
      "values": values,
      // "geoResolution": "500k",
    };
  let handleClear =()=> {
      props.mapState.view.graphics.removeAll();
      props.dispatch(updateSelected(""))

    }
  let handleGetCensus =()=> {
      // getCensusData(Args).then(function(res) {
      //   console.log(res)
      // });
      census(Args,
        (err, res) => {
          console.log(res);

          const data = {
            labels: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30', '35-40','45-50','50-55','55-60','60-65','65-70','70-75','75-80','80-85','>85'],
            datasets: [
              {
                label: 'Male',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: processAgeData(res[0])
              }
            ]
          };

          setAgeData(data)
        })
    }


  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          Selected track(s) : {selected != null && selected.length>1 ?selected.join(", "):selected}
        </Typography>
        <br/>


        <Grid item xs={12} md={12}>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item>
            <ButtonGroup size="small" aria-label="Small outlined button group">
              <Button onClick={handleGetCensus}>
                View Selected Tract(s)
              </Button>
              <Button onClick={handleClear}>
                Clear Selection
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>


      <div>
        <h2>Age/Sex Distribution</h2>
        <HorizontalBar
          data={ageData != ""?ageData:[]}
          width={100}
          height={150}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  mapState: state.map,
});

export default connect(mapStateToProps)(SketchWidgetPaper);

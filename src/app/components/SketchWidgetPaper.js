import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected } from '../redux/actions';

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


  let center = { lat: 42.3601, lng: -71.0589 };
  let values = ["B00001_001E", "B01001_001E", "B08303_001E"];
  let Args = {
      "vintage": 2016,
      "geoHierarchy": {
        "county": center,
        "tract": selected ? selected.toString() : "*"
      },
      "sourcePath": ["acs", "acs5"],
      "values": values,
      "geoResolution": "500k",
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
        (err, res) => console.log(res)
      )
    }


  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          Selected track(s) : {selected != null && selected.length>1 ?selected.join(", "):selected}
        </Typography>
        <br/>


        <Grid item xs={12} md={6}>
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
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  mapState: state.map,
});

export default connect(mapStateToProps)(SketchWidgetPaper);

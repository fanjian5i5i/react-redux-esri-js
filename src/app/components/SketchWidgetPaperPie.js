import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected,updateDrawer,updateLayer } from '../redux/actions';


import census from 'citysdk';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    top: 80,
    left: 55,
    borderRadius: 0,
  },
  foot:{
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    height: window.innerHeight/3,
    padding: theme.spacing(3, 2),
  }
}));



function SketchWidgetPaper(props) {
  const classes = useStyles();
  const [selection, setSelection] = useState('tracts');
  const handleToggle = (event, newSelection) => {
    console.log(newSelection)
    setSelection(newSelection);
    props.dispatch(updateLayer(newSelection))
    props.mapState.view.graphics.removeAll();
    props.dispatch(updateSelected([]))
  };


  let handleClear =()=> {
      props.mapState.view.graphics.removeAll();
      props.dispatch(updateSelected([]))

    }
  let handleGetCensus =()=> {

        props.dispatch(updateDrawer(true))
  }

  let handleTracts =() =>{
    props.dispatch(updateLayer("tracts"))
    props.mapState.view.graphics.removeAll();
    props.dispatch(updateSelected([]))
  }
  let handleNeighborhood =() =>{
    props.dispatch(updateLayer("neighborhood"));
    props.mapState.view.graphics.removeAll();
    props.dispatch(updateSelected([]))
  }
  let handleCity =() =>{
    props.dispatch(updateLayer("city"));
    props.mapState.view.graphics.removeAll();
    props.dispatch(updateSelected([]))
  }



  // let Selected = (props) => (
  //   {
  //   if(props.mapState.layer == "neighborhood"){
  //     return (
  //       <Typography component="p">
  //         Selected Neighborhood:
  //         {/* Selected Tract(s) : {selected != null && selected.length>1 ?selected.join(", "):selected} */
  //          props.mapState.neighborhood
  //         }
  //       </Typography>
  //     )
  //   }else if (props.mapState.layer  === "tracts"){

  //     return (
  //       <Typography component="p">
  //       Selected Tracts:
  //       {props.mapState.selected != null ? props.mapState.selected.join(", "): ""}
  //       </Typography>
  //     )
  //   }else{
  //     return(
  //       ""
  //     )
  //   }
  // }
  // )

  return (
    <div>
      <Paper className={window.innerWidth <= 760 ? classes.foot : classes.root }>
      <ToggleButtonGroup
            value={selection}
            exclusive
            onChange={handleToggle}
            aria-label="layer selection"
            size="small"

          >
        
          <ToggleButton value="tracts" aria-label="left aligned">
              tract
            </ToggleButton>
            <ToggleButton value="neighborhood" aria-label="centered">
              neighborhood
            </ToggleButton>
            <ToggleButton value="city" aria-label="right aligned">
               city
            </ToggleButton>
            </ToggleButtonGroup>
            <br/>
            <br/>
        {
          props.mapState.layer == "neighborhood" ? <Typography component="p">
            Selected Neighborhood:
            {
              props.mapState.neighborhood
            }
          </Typography>
          :""
        }
        {
          props.mapState.layer == "tracts" ? <Typography component="p">
            Selected Tracts:
            {
              props.mapState.selected != null ? props.mapState.selected: ""
            }
          </Typography>
          :""
        }
        {
          props.mapState.layer == "city" ? <Typography component="p">
            Citywide
          </Typography>
          :""
        }
        <br/>


        <Grid item xs={12} md={12}>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item spacing={2}>

              <Button onClick={handleGetCensus} variant={(props.mapState.selected && props.mapState.selected.length !=0) || props.mapState.layer == "city"? "contained":"outlined"} color="primary">
                View Selected
              </Button>
              <Button variant="outlined" onClick={handleClear} style={{marginLeft:10}}>
                Clear Selection
              </Button>
            <div><br/></div>
            <Typography component="p">
            Source: U.S. Census Bureau, <br/> 2013 - 2017 American Community Survey (ACS)
            </Typography>
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

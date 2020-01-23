import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected,updateDrawer,updateLayer } from '../redux/actions';

import {Pie} from 'react-chartjs-2';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


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
  const [data, setData] = useState("");


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
        <ButtonGroup size="small" aria-label="Small outlined button group">
              <Button onClick={handleTracts}>
                Tracts
              </Button>
              <Button onClick={handleNeighborhood}>
                Neighborhood
              </Button>

            </ButtonGroup>
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
              props.mapState.selected != null ? props.mapState.selected.join(", "): ""
            }
          </Typography>
          :""
        }
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

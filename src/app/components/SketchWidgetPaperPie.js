import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected,updateDrawer } from '../redux/actions';

import {Pie} from 'react-chartjs-2';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


import census from 'citysdk';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    top: 160,
    left: 14
  },
}));



function SketchWidgetPaper(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState("");




  React.useEffect(() => {

    setSelected(props.mapState.selected);
  });


  let handleClear =()=> {
      props.mapState.view.graphics.removeAll();
      props.dispatch(updateSelected(""))

    }
  let handleGetCensus =()=> {


        props.dispatch(updateDrawer(true))
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

      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  mapState: state.map,
});

export default connect(mapStateToProps)(SketchWidgetPaper);

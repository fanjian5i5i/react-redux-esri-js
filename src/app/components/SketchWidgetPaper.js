import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { updateView,updateMap } from '../redux/actions';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    top: 78,
    right: 14
  },
}));



function SketchWidgetPaper() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          Select geometry or draw multiple
        </Typography>
        <IconButton color="secondary" aria-label="Add an alarm">
        <Icon>alarm</Icon>
      </IconButton>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  appBarState: state.appBar,
});

export default connect(mapStateToProps)(SketchWidgetPaper);

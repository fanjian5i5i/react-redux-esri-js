import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';
import { updateDrawer } from '../redux/actions';

const drawerWidth = 360;


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBarDrawer(props) {
  const classes = useStyles();

  const handleOpen = () =>{

    props.dispatch(updateDrawer(!props.generalState.drawerOpen))
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Demographic Viewer
        </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = state => ({
  generalState: state.general,
});

export default connect(mapStateToProps)(AppBarDrawer);

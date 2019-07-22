import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Close from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateDrawer } from '../redux/actions';

import NativityChart from './NativityChart';
import AgeChart from './AgeChart'


const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  root:{
    width:window.innerWidth<=414? window.innerWidth: 414,
    paddingTop:0
    // maxHeight:window.innerWidth<=414?300:"",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerHeader: {
  color:"white",
  top:0,
  zIndex:7,
  position: '-webkit-sticky',
  position: 'sticky',
  backgroundColor:"#00a6b4",
},
  paperAnchorRight:{
    top:64,
    width:414
  },
  fullList: {
    width: 'auto',
    overflowX :"hidden",
    // paddingBottom:window.innerWidth<=414?122:0
    maxHeight:window.innerWidth<=414?400:window.innerHeight-64,

  },
  drawerPaper: {
    width: drawerWidth,
  },
  title:{
    color:"#003c50"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState('one');
  const [nativityOpen, setNativityOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(true);
  const [innerWidth]= React.useState(window.innerWidth);
  const handleOpen = () =>{
    props.dispatch(updateDrawer(!props.generalState.drawerOpen))
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const handleClickCode = (code) => () => {
    let that = this;
    switch (code) {
      case "nativity":
        setNativityOpen(!nativityOpen);
        break;
      case "age":
        setAgeOpen(!ageOpen);
        break;
      default:

    }

  };


  const drawer = (
    <div className={classes.fullList}>
      <List
        component="nav"
        className={classes.root}
        >
        <ListItem style={{fontWeight:"bold",backgroundColor:"white !important"}} className={classes.drawerHeader}>
          {props.mapState.selected}
        <ListItemText />
          <Close onClick={handleOpen}
          onKeyDown={handleOpen}/>
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClickCode("nativity")} className={classes.title}>
          <ListItemText inset primary="Nativity" className={classes.title}/>
            {nativityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={nativityOpen} timeout="auto">

              <NativityChart id={props.mapState.selected}/>


          </Collapse>
          <Divider/>
          <ListItem button onClick={handleClickCode("age")} className={classes.title}>
            <ListItemText inset primary="Age by sex" className={classes.title}/>
              {ageOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse in={ageOpen} timeout="auto">

                <AgeChart id={props.mapState.selected}/>


            </Collapse>
            <Divider/>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>

        <Drawer
          anchor={innerWidth<=414?"bottom":"right"}
          open={props.generalState.drawerOpen}
          variant="persistent"
          classes={{
            root:classes.root,
            paperAnchorRight:classes.paperAnchorRight
          }}
        >


            {drawer}

        </Drawer>

    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
const mapStateToProps = state => ({
  generalState: state.general,
  mapState:state.map
});

export default connect(mapStateToProps)(ResponsiveDrawer);

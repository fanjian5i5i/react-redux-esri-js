import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles,createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux';
import { updateDrawer, changeCategory} from '../redux/actions';

const drawerWidth = 360;

const theme = createMuiTheme({
  palette: {
    primary: {
        main:"#003c50"
    },
    secondary:{
        main:"#00a6b4"
    }
  },
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    
  },
  toolbar:{
    backgroundColor:"#003c50"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color:"white"
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    // display: 'flex',
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  category:{
    color:"white"
  }
}));

function Appbar1(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    let indexArr = ["population","xxx","income","housing"];
    dispatch(changeCategory(indexArr[newValue]))
    
  };
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleOpen = () =>{

    props.dispatch(updateDrawer(!props.generalState.drawerOpen))
  }

  // //          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleOpen}>
  // <MenuIcon />
  // </IconButton>


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>handleChange(null,0)}>
        <p>Population</p>
      </MenuItem>
      <MenuItem onClick={()=>handleChange(null,1)}>
        <p>xxx</p>
      </MenuItem>
      <MenuItem onClick={()=>handleChange(null,2)}>
        <p>Income</p>
      </MenuItem>
      <MenuItem onClick={()=>handleChange(null,3)}>
        <p>Housing</p>
      </MenuItem>
    </Menu>
  );
  const appbar = (
    
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Demographic Viewer
        </Typography>

            <div className={classes.sectionMobile}>
                      <IconButton aria-label="add" color="secondary"  className={classes.menuButton} onClick={handleMobileMenuOpen}> 
                        <MenuIcon />
                      </IconButton>
            </div>
            <div className={classes.sectionDesktop}>
            <Button className={classes.category} onClick={()=>handleChange(null,0)}>
              Population
            </Button>
            <Button className={classes.category} onClick={()=>handleChange(null,1)}>
              XXX
            </Button>
            <Button className={classes.category} onClick={()=>handleChange(null,2)}>
              Income
            </Button>
            <Button className={classes.category} onClick={()=>handleChange(null,3)}>
              Housing
            </Button>
            
               
            </div>


        </Toolbar>
      </AppBar>
      {renderMobileMenu}

    </div>

  );

  return appbar;
}


const mapStateToProps = state => ({
  generalState: state.general,
});

export default connect(mapStateToProps)(Appbar1);

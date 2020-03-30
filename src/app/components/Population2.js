import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import NativityChart from './NativityChart';
import AgeChart from './AgeChart'

import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
  title:{
    color:"#003c50"
  },
}));

function Populatoin(props) {
  const classes = useStyles();
  const [nativityOpen, setNativityOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [raceOpen, setRaceOpen] = React.useState(true);
  
  const handleClickCode = (code) => () => {
    let that = this;
    switch (code) {
      case "nativity":
        setNativityOpen(!nativityOpen);
        break;
      case "age":
        setAgeOpen(!ageOpen);
        break;
        case "race":
          setRaceOpen(!raceOpen);
        break;
      default:

    }

  };
  return (
    <div>
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
          <ListItem button onClick={handleClickCode("race")} className={classes.title}>
            <ListItemText inset primary="Race/Ethnicity" className={classes.title}/>
              {raceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse in={raceOpen} timeout="auto">

                <AgeChart id={props.mapState.selected}/>


            </Collapse>
    </div>
  );
}

const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(Populatoin);
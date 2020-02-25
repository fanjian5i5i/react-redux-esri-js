import React, { useEffect } from 'react';
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

function XXX(props) {
  const classes = useStyles();
  const [nativityOpen, setNativityOpen] = React.useState(false);
  const [value, setValue] =React.useState(1);
  const [ageOpen, setAgeOpen] = React.useState(true);
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
  useEffect(()=>{

  },[])
  return (
    <div>
              {value}
    </div>
  );
}

const mapStateToProps = state => ({
  mapState:state.map
});

export default connect(mapStateToProps)(XXX);
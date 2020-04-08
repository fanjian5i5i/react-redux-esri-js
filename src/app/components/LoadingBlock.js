import React,{useState} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


let LoadingBlock = () =>{
    return (
        <div style={{padding:40}}>
              <Skeleton variant="text" animation="wave"/>
              <Skeleton variant="text" animation="wave"/>
              <Skeleton variant="text" animation="wave"/>

              <Skeleton variant="text" animation="wave"/>
              <Skeleton variant="text" animation="wave"/>
              <br/>
              <Skeleton variant="rect" width={"100%"} height={150} animation="wave"/>
              <br/>
              <Skeleton  animation="wave"/>
            </div>
    )
}
export default LoadingBlock;
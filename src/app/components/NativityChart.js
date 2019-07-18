import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { connect } from 'react-redux';
import { updateView,updateMap,updateSelected } from '../redux/actions';

import {Pie} from 'react-chartjs-2';

import census from 'citysdk';

class NativityChart extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
              data:[]
          };
      }
      handleGetCensus(id){
        let that = this;
        let center = { lat: 42.3601, lng: -71.0589 };
        let values = ["B05002_002E","B05002_014E","B05002_021E"];
        let Args = {
            "vintage": 2017,
            "geoHierarchy": {
              "county": center,
              "tract": id
            },
            "sourcePath": ["acs", "acs5"],
            "values": values,
            // "geoResolution": "500k",
          };
          census(Args,
            (err, res) => {
              console.log(res);

              const data = {
                labels: ['Native','Naturalized citizen','Not a citizen'],
                datasets: [
                  {
                    label: 'Nativity',
                    backgroundColor: [
                  		'#FF6384',
                  		'#36A2EB',
                  		'#FFCE56'
                  		],
                    hoverBackgroundColor: [
                		'#FF6384',
                		'#36A2EB',
                		'#FFCE56'
                  ],
                    data: that.processAgeData(res[0])
                  }
                ]
              };

              this.setState({data:data})
            })
        }
      componentDidUpdate(prevProps, prevState){
        let that = this;
        if (prevProps.id !== this.props.id) {
          if(this.props.id[0]){
            that.handleGetCensus(this.props.id[0])
          }else{
            this.setState({data:[]})
          }

        }

      }
      censusPromise(args) {
        return new Promise(function(resolve, reject) {
          census(args, function(err, json) {
            if (!err) {

              resolve(json);
            } else {

              reject(err);
            }
          });
        });
      }
      processAgeData (data){
        console.log(data)
        let result = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(key!='county'&&key!='state'&&key!='tract'){
                  result.push(data[key])
                }
            }
        }
        console.log(result)
        return result
      }
      handleClear (){
          props.mapState.view.graphics.removeAll();
          props.dispatch(updateSelected(""))

      }

        render() {
          let data = this.state.data;
          function getSum(total,num) {
            return total + num;
          }
          let sum = data.datasets?data.datasets[0].data.reduce(getSum):0;
          return (
            <div>
              <Paper>
              <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Total Population</TableCell>
                    <TableCell align="right">Native</TableCell>
                    <TableCell align="right">Naturalized Citizen</TableCell>
                    <TableCell align="right">Not a Citizen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell align="right">{sum}</TableCell>
                      <TableCell align="right">{data.datasets?data.datasets[0].data[0]:0}</TableCell>
                      <TableCell align="right">{data.datasets?data.datasets[0].data[1]:0}</TableCell>
                      <TableCell align="right">{data.datasets?data.datasets[0].data[2]:0}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={4}>
                    <Pie
                      data={this.state.data != ""?this.state.data:[]}
                      width={80}
                      height={80}
                      options={{
                        maintainAspectRatio: true
                      }}
                    /></TableCell>

                    </TableRow>

                </TableBody>
              </Table>

              </div>
              </Paper>
            </div>
          )
        }

}














const mapStateToProps = state => ({
  mapState: state.map,
});

export default connect(mapStateToProps)(NativityChart);

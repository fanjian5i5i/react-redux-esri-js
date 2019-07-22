import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAlt';
import { connect } from 'react-redux';


import { updateView,updateMap,updateSelected } from '../redux/actions';

import {HorizontalBar} from 'react-chartjs-2';

import census from 'citysdk';
import { ExportToCsv } from 'export-to-csv';

class AgeChart extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
              data:[]
          };
      }
      handleGetCensus(id){
        let that = this;
        let center = { lat: 42.3601, lng: -71.0589 };
        let values = ["group(B01001)"];
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
                labels: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30', '35-40','45-50','50-55','55-60','60-65','65-70','70-75','75-80','80-85','>85'],
                datasets: [
                  {
                    label: 'Female',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: that.processFemaleAgeData(res[0])
                  },
                  {
                    label: 'Male',
                    backgroundColor: 'rgba(99,132,255,0.2)',
                    borderColor: 'rgba(99,132,255,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(99,132,255,0.4)',
                    hoverBorderColor: 'rgba(99,132,255,1)',
                    data: that.processMaleAgeData(res[0])
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
      processMaleAgeData (data){

        let result = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                  if(key.substring(8,10)<26&& key.substring(8,10) > 2&& key.indexOf("M")<0 && key.indexOf("A")<0){
                    result.push(data[key]);
                  }

            }
        }
        return result
      }
      processFemaleAgeData (data){

        let result = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {

                  if(key.substring(8,10)>26&& key.indexOf("M")<0&& key.indexOf("A")<0){
                    result.push(-data[key]);
                  }


            }
        }
        return result
      }
      handleClear (){
          props.mapState.view.graphics.removeAll();
          props.dispatch(updateSelected(""))

      }
      handleDownload(){
        let that = this;
        const options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'Nativity',
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
          // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };
        let data = {"tract_id":that.props.id[0]};
        for(var i = 0; i<this.state.data.datasets[0].data.length;i++){
          // let record = {this.state.data.labels[i]:this.state.data.datasets[0].data[i]};

          data[that.state.data.labels[i]] = that.state.data.datasets[0].data[i]
        };
        console.log(data);
        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv([data]);
      }

        render() {
          let data = this.state.data;
          function getSum(total,num) {
            return total + num;
          }
          // let sum = data.datasets?data.datasets[0].data.reduce(getSum):0;
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

                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={4} >
                    <HorizontalBar
                      data={this.state.data != ""?this.state.data:[]}
                      width={100}
                      height={150}
                      options={{
                        responsive: true,
                      }}
                    /></TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={3}>
                      Download as CSV
                    </TableCell>
                    <TableCell >
                      <IconButton aria-label="Delete" onClick={()=>this.handleDownload()}>
                        <SaveIcon />
                      </IconButton>
                    </TableCell>
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

export default connect(mapStateToProps)(AgeChart);

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


import Chart from 'react-apexcharts'

import census from 'citysdk';
import { ExportToCsv } from 'export-to-csv';

class AgeChart extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
              data:[],
              series: [{
                  name: 'Males',
                  data: []
              },
              {
                  name: 'Females',
                  data: []
              }],
              options: {
                chart: {
                  height: 440,
                  type: 'bar',
                  stacked: true
                },
                colors: ['#008FFB','#FF4560'],
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%',

                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },

                grid: {
                    xaxis: {
                        showLines: false
                    }
                },
                yaxis: {

                    title: {
                       // text: 'Age',
                    },
                },
                tooltip: {
                  shared: false,
                    x: {
                        formatter: function(val) {
                            return val
                        }
                    },
                    y: {
                        formatter: function(val) {
                            return Math.abs(val)
                        }
                    }
                },
                title: {
                    text: ''
                },
                xaxis: {
                  categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'],
                  title: {
                    text:"Population"
                  },
                  labels: {
                    formatter: function(val) {
                      return Math.abs(val)
                    }
                  }
                },
              },

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
              let series =  [{
                  name: 'Males',
                  data: that.processMaleAgeData(res[0])
              },
              {
                  name: 'Females',
                  data: that.processFemaleAgeData(res[0])
              }];
              // const data = {
              //   labels: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30', '35-40','45-50','50-55','55-60','60-65','65-70','70-75','75-80','80-85','>85'],
              //   datasets: [
              //     {
              //       label: 'Female',
              //       backgroundColor: 'rgba(255,99,132,0.2)',
              //       borderColor: 'rgba(255,99,132,1)',
              //       borderWidth: 1,
              //       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              //       hoverBorderColor: 'rgba(255,99,132,1)',
              //       data: that.processFemaleAgeData(res[0])
              //     },
              //     {
              //       label: 'Male',
              //       backgroundColor: 'rgba(99,132,255,0.2)',
              //       borderColor: 'rgba(99,132,255,1)',
              //       borderWidth: 1,
              //       hoverBackgroundColor: 'rgba(99,132,255,0.4)',
              //       hoverBorderColor: 'rgba(99,132,255,1)',
              //       data: that.processMaleAgeData(res[0])
              //     }
              //   ]
              // };



              this.setState({series:series})
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
      processMaleAgeData (data){

        let result = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                  if(key.substring(8,10)<26&& key.substring(8,10) > 2&& key.indexOf("M")<0 && key.indexOf("A")<0){
                    result.push(data[key]);
                  }

            }
        };
        let age04 = result[0];
        let age59 = result[1];
        let age1014 = result[2];
        let age2529 = result[8];
        let age3034 = result[9];
        let age3539 = result[10];
        let age4044 = result[11];
        let age4549 = result[12];
        let age5054 = result[13];
        let age5559 = result[14];
        let age7074 = result[19];
        let age7579 = result[20];
        let age8084 = result[21];
        let age85 = result[22];
        let age1519 = parseInt(result[3])+ parseInt(result[4]);
        let age2024 = parseInt(result[5])+ parseInt(result[6])+ parseInt(result[7]);
        let age6064 = parseInt(result[15])+ parseInt(result[16]);
        let age6569 = parseInt(result[17])+ parseInt(result[18]);


        return [age04,age59,age1014,age1519,age2024,age2529,age3034,age3539,age4044,age4549,age5054,age5559,age6064,age6569,age7074,age7579,age8084,age85];
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
        let age04 = result[0];
        let age59 = result[1];
        let age1014 = result[2];
        let age2529 = result[8];
        let age3034 = result[9];
        let age3539 = result[10];
        let age4044 = result[11];
        let age4549 = result[12];
        let age5054 = result[13];
        let age5559 = result[14];
        let age7074 = result[19];
        let age7579 = result[20];
        let age8084 = result[21];
        let age85 = result[22];
        let age1519 = parseInt(result[3])+ parseInt(result[4]);
        let age2024 = parseInt(result[5])+ parseInt(result[6])+ parseInt(result[7]);
        let age6064 = parseInt(result[15])+ parseInt(result[16]);
        let age6569 = parseInt(result[17])+ parseInt(result[18]);


        return [age04,age59,age1014,age1519,age2024,age2529,age3034,age3539,age4044,age4549,age5054,age5559,age6064,age6569,age7074,age7579,age8084,age85];
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
          title: 'Age by sex',
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
          // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };
        // let data = {"tract_id":that.props.id[0]};
        let data = [];
        let label = ['0-04','05-09','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80-84','85+']
        for(var i = 0; i<this.state.series[0].data.length;i++){
          // data[label[i]] = that.state.series[0].data[i];
          let record = {
            "age":label[i],
            "male":that.state.series[0].data[i],
            "female":Math.abs(that.state.series[1].data[i])
          }
          // data.age = label[i];
          // data.male = that.state.series[0].data[i];
          // data.female = that.state.series[1].data[i];
          data.push(record);
        };
        console.log(data);
        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(data);
      }

        render() {
          let that = this;
          let data = this.state.data;
          let label = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80-84','85+']
          function getSum(total,num) {
            return total + num;
          }
          // let sum = data.datasets?data.datasets[0].data.reduce(getSum):0;
          return (
            <div>
              <Paper>
              <div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Age</TableCell>
                    <TableCell align="right">Male</TableCell>
                    <TableCell align="right">Female</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                      {
                        this.state.series[0].data.map((item, key)=>(
                          <TableRow key={key}>
                            <TableCell >{label[key]}</TableCell>
                            <TableCell align="right">{item}</TableCell>
                            <TableCell align="right">{Math.abs(that.state.series[1].data[key])}</TableCell>
                          </TableRow>
                          )
                        )
                      }
                      <TableRow>
                      <TableCell colSpan={2}>
                        Download as CSV
                      </TableCell>
                      <TableCell >
                        <IconButton aria-label="Delete" onClick={()=>this.handleDownload()}>
                          <SaveIcon />
                        </IconButton>
                      </TableCell>
                      </TableRow>
                    <TableRow>
                    <TableCell colSpan={3} >
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={380} height={400} /></TableCell>
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

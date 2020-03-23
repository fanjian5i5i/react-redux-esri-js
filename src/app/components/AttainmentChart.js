import React, { useEffect , useState} from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
let AttainmentChart = (props) =>{
  const [data,setData] = useState([]);
  useEffect(()=>{
    console.log(props.data);
    setData(props.data)
  },[props.data])
  const options = {
    title: {
      text: 'Educational Attainment'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
        valueSuffix: '%'
    }
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
    },
    chart: {
      type: 'pie'
    },
    series: [{
      name:"Educational Attainment",
      colorByPoint: true,
      data: props.data
    }],
    // dataLabels: {
    //   enabled: true,
    //   rotation: -90,
    //   color: '#FFFFFF',
    //   align: 'right',
    //   format: '{point.y:.1f}', // one decimal
    //   y: 10, // 10 pixels down from the top
    //   style: {
    //       fontSize: '13px',
    //       fontFamily: 'Verdana, sans-serif'
    //   }
    // }
  }
  return (
    <div>
      
      <Paper style={{paddingLeft:80,paddingRight:80}}>
        <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">
                      Educational Attainment
                    </TableCell>
                    <TableCell>
                      Counts
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    props.data?
                    props.data.map(record=>(
                      <TableRow key={record.name}>
                            <TableCell align="right">{record.name}</TableCell>
                            <TableCell>{record.y}</TableCell>
                          </TableRow>
                    ))
                    :""
                  }
                </TableBody>
        </Table>
      </Paper>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
    </div>
  )
}


export default AttainmentChart

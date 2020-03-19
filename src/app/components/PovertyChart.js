import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const PovertyChart = (props) =>{
    // let data = props.data;
    const options = {
        title: {
          text: ''
        },
        xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
        chart: {
          type: 'column'
        },
        series: [{
          name:"Poverty",
          data: props.data
        }],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
      }
    return (
<HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
    )
}
export default PovertyChart;
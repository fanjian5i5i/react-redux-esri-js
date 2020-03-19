import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

let IncomeChart = (props) =>{

  const options = {
    title: {
      text: 'Household Income'
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
      name:"Household Income",
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


export default IncomeChart

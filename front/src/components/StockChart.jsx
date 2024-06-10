import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const StockChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'D-0'],
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
export default StockChart;

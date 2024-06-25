import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const StockChart = () => {
    /*
  // 차트 데이터 예시
  // name: 데이터 값의 이름
  // data: 데이터 값 입력해주세용
  series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]



  // X축 데이터 예시 ex) D-7, D-6, D-5... 1주일 데이터 넣을 예정
  categories: [],

  */
    const prices = useSelector((state) => state.stock.prices);
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: "Desktops",
                data: [],
            },
        ],
        options: {
            chart: {
                toolbar: { show: false },
                height: "auto",
                type: "line",
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            grid: {
                row: {
                    colors: ["#FEED9F", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.3,
                },
            },
            xaxis: {
                labels: { show: false },
            },
            colors: ["#88C9A1"],
        },
    });

    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            series: [
                {
                    ...prevOptions.series[0],
                    data: prices.slice().reverse(),
                },
            ],
        }));
    }, [prices]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="line"
                    height={300}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};
export default StockChart;

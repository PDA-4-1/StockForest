import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const StockChart = () => {
    const prices = useSelector((state) => state.stock.prices);

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

    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: "가격",
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
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            grid: {
                row: {
                    colors: ["#FEED9F", "transparent"], // takes an array which will be repeated on rows
                    opacity: 0.3,
                },
            },
            tooltip: {
                x: {
                    show: false, // x축 정보 비활성화
                },
                y: {
                    formatter: (value) => `${value.toFixed(2)}프디`,
                },
            },
            xaxis: {
                labels: { show: false },
            },
        },
    });

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

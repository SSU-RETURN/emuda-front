/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import colors from '../../Colors/Colors';

const ChartContainer = styled('div')`
  width: 100%;
  max-width: 600px;
  margin: auto;
  height: 100%; // 부모 컨테이너 높이를 100%로 설정
  /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  border-radius: 8px;*/
`;

const ChartWrapper = styled('div')`
  width: 100%;
  height: 100%;
`;

function EmotionChart({ data }) {
  const chartRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(0);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Inflation',
        data: data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: [
        colors.lightBlue,
        colors.lightYellow,
        colors.lightPurple,
        colors.lightRed,
        colors.lightPink,
      ],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 5, // 모든 막대에 적용되는 반경
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: colors.black,
        },
      },
      xaxis: {
        categories: ['슬픔', '기쁨', '불안', '분노', '놀람'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {},
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + '%';
          },
        },
        min: 0,
        max: 100,
      },
      legend: {
        show: false,
      },
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      setChartHeight(chartRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    setChartData((current) => ({
      ...current,
      series: [{ ...current.series[0], data: data }],
    }));
  }, [data]);

  return (
    <ChartContainer ref={chartRef}>
      <ChartWrapper>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={chartHeight}
        />
      </ChartWrapper>
    </ChartContainer>
  );
}

export default EmotionChart;

// 사용법
// let data = [20, 17, 22, 40, 0];
// <EmotionChart data={data} />

import React, { useEffect, useState, useRef } from "react";
import GraphStyles from "./GraphStyles.jsx";
import CanvasJSReact from "./canvasjs/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  height: 600,
  animationEnabled: false,
  axisY: {
    title: "Angle",
    includeZero: false,
    minimum: -50,
    maximum: 50
  },
  axisX: {
    minimum: 0,
    maximum: 1000
  },
  legend: {
    horizontalAlign: "center", // "center" , "right"
    verticalAlign: "bottom", // "top" , "bottom"
    fontSize: 15
  },
  data: [
    {
      markerType: "none",
      showInLegend: true,
      name: "X Axis",
      type: "line",
      dataPoints: []
    },
    {
      markerType: "none",
      showInLegend: true,
      name: "Y Axis",
      type: "line",
      dataPoints: []
    },
    {
      markerType: "none",
      showInLegend: true,
      name: "Z Axis",
      type: "line",
      dataPoints: []
    }
  ]
};

const Graph = ({ count = 0, x, y, z }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current && x + y + z !== 0) {
      chartRef.current.chart.data[0].addTo("dataPoints", {
        x: count,
        y: parseFloat(x)
      });
      chartRef.current.chart.data[1].addTo("dataPoints", {
        x: count,
        y: parseFloat(y)
      });
      chartRef.current.chart.data[2].addTo("dataPoints", {
        x: count,
        y: parseFloat(z)
      });
    }
  }, [x, y, z, count]);

  return (
    <>
      <GraphStyles>
        <CanvasJSChart options={options} ref={chartRef} />
      </GraphStyles>
    </>
  );
};

export default Graph;

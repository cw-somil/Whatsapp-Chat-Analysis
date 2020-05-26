import React from "react"
import { Bar } from "react-chartjs-2"
import pattern from "patternomaly"

const VerticalChart = ({ apiData }) => {
  const patterns = [
    "plus",
    "cross",
    "dash",
    "cross-dash",
    "dot",
    "dot-dash",
    "disc",
    "ring",
    "line",
    "line-vertical",
    "weave",
    "zigzag",
    "zigzag-vertical",
    "diagonal",
    "diagonal-right-left",
    "square",
    "box",
    "triangle",
    "triangle-inverted",
    "diamond",
    "diamond-box",
    "plus",
    "cross",
    "dash",
    "cross-dash",
    "dot",
    "dot-dash",
    "disc",
    "ring",
    "line",
    "line-vertical",
  ]
  const colors = [
    "rgb(104,175,252)",
    "rgb(38,85,130)",
    "rgb(82,239,153)",
    "rgb(21,81,38)",
    "rgb(181,224,164)",
    "rgb(108,142,69)",
    "rgb(32,216,253)",
    "rgb(91,8,145)",
    "rgb(115,99,231)",
    "rgb(107,27,75)",
    "rgb(235,94,155)",
    "rgb(233,180,245)",
    "rgb(153,101,153)",
    "rgb(190,58,205)",
    "rgb(188,227,51)",
    "rgb(115,53,14)",
    "rgb(230,191,162)",
    "rgb(165,20,9)",
    "rgb(249,121,59)",
    "rgb(18,152,45)",
    "rgb(52,245,14)",
    "rgb(22,146,148)",
    "rgb(233,195,56)",
    "rgb(171,121,80)",
    "rgb(37,36,249)",
    "rgb(104,175,252)",
    "rgb(38,85,130)",
    "rgb(82,239,153)",
    "rgb(21,81,38)",
    "rgb(181,224,164)",
    "rgb(108,142,69)",
  ]
  const data = {
    labels: apiData.labels,
    datasets: [
      {
        label: "No of Words",
        data: apiData.data,
        backgroundColor: patterns.map((ptn, index) =>
          pattern.draw(ptn, colors[index])
        ),
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    showScale: true,
    pointDot: true,
    showLines: false,

    title: {
      display: true,
      text: "Word Frequency",
    },

    legend: {
      display: false,
      labels: {
        boxWidth: 50,
        fontSize: 10,
        fontColor: "#bbb",
        padding: 5,
      },
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: apiData.maxval,
          },
        },
      ],
      xAxes: [
        {
          categoryPercentage: 1.0,
          barPercentage: 0.8,
        },
      ],
    },
  }
  return (
    <div>
      <Bar data={data} options={chartOptions} />
    </div>
  )
}

export default VerticalChart

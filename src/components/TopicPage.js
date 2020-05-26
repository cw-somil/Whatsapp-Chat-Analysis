import React, { Fragment } from "react"
import ReactWordcloud from "react-wordcloud"

const TopicPage = ({ location }) => {
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 1,
    rotationAngles: [0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  }

  return (
    <Fragment>
      {/* <div>{JSON.stringify(location.state)}</div> */}
      <div style={{ height: 400, width: "100%" }}>
        <ReactWordcloud options={options} words={location.state} />
      </div>
    </Fragment>
  )
}

export default TopicPage

import React, { Fragment } from "react"
import ReactWordcloud from "react-wordcloud"

const TopicPage = ({ location }) => {
  const options = {
    colors: [
      "rgb(33,240,182)",
      "rgb(141,210,216)",
      "rgb(198,240,138)",
      "rgb(103,240,89)",
      "rgb(244,187,143)",
      "rgb(242,192,41)",
      "rgb(232,253,24)",
    ],
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
